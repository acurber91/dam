import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Medicion } from '../model/Medicion';
import { Riego } from '../model/Riego';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { RiegoService } from '../services/riego.service'
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage 
{
    // Objeto del tipo Dispositivo para almacenar la respuesta desde el backend.
	public dispositivo: Dispositivo;

	// Objeto del tipo Medicion para almacenar la respuesta desde el backend.
	private _lastMeasurement: Medicion;

	// Objeto del tipo Medicion para almacenar la respuesta desde el backend.
	private _lastSprinkle: Riego;
	
    // Atributo necesario para almacenar el identificador del dispositivo.
	public idDispositivo: string;

	// Atributo para guardar el identificador de la electroválvula.
	public idElectrovalvula: number;

	// Atributo para almacenar la medición actual del sensor.
	private _valorObtenido: number = 0;

	// Atributo para almacenar el estado de la electroválvula. 
	// - False: válvula cerrada => botón debe abrirla.
	// - True: válvula abierta => botón debe cerrarla.
	public valveState: boolean = false;

	// Declaración del objeto para crear el gráfico.
	public myChart;
	
	// Atributo para configurar las opciones del gráfico.
	private _chartOptions;
      
    constructor(private router: ActivatedRoute, public measurementService: MedicionService, public deviceService: DispositivoService, public riegoService: RiegoService)
    { 
		// Obtenemos el "id" del sensor en el cual se hizo "click".
		this.idDispositivo = this.router.snapshot.paramMap.get('id');

		// Llamamos al método encargado de obtener el "id" de la electroválvula asociada al sensor.
		this.getValveId();

		// Llamamos al método encargado de obtener el estado de la electroválvula.
		this.getValveState();
		
		// Llamamos al método encargado de obtener la medición actual del sensor y mostrarla en el gráfico.
		this.getSensorMeasurement();
    }

	ngOnInit() 
	{

    }

	ionViewWillEnter() 
	{
        this.generarChart();
	}

	// Método utilizado para obtener el "id" de la electroválvula asociada al sensor.
	async getValveId()
	{
		// Llamamos al servicio para obtener la electroválvula asociada al dispositivo.
		await this.deviceService.getElectrovalvula(this.idDispositivo).then((valve) => {
			// Guardamos el objeto.
			this.dispositivo = valve;
			
			// Y obtenemos el "id" de la electroválvula en cuestión.
			this.idElectrovalvula = this.dispositivo.electrovalvulaId;
		});
	}

	// Método utilizado para obtener el estado actual de la electroválvula.
	async getValveState()
	{
		// Llamamos al servicio para obtener el estado actual de la electroválvula asociada al dispositivo.
		await this.riegoService.getRiego(this.idDispositivo).then((state) => {
			// Guardamos el objeto.
			this._lastSprinkle = state;
			
			// Y obtenemos el estado de de la electroválvula en cuestión.
			this.valveState = Boolean(this._lastSprinkle.apertura);
		});
	}

	// Método utilizado para obtener la última medición del sensor.
	async getSensorMeasurement()
	{
		// Llamamos al servicio para obtener la última medición. Cuando se cumple la promesa, se actualiza el gráfico.
		await this.measurementService.getMedicion(this.idDispositivo).then((measurement) => {
			// Guardamos el objeto.
			this._lastMeasurement = measurement;
			
			// Obtenemos la medición correspondiente.
			this._valorObtenido = Number(this._lastMeasurement.valor);

			// Llamamos al método encargado de actualizar el gráfico.
			this.updateChart();
		});
	}

	// Método utilizado para abrir la electroválvula.
	public actionOpenValve()
	{
		this.valveState = false;

		// Armamos el objeto de tipo Riego para enviarlo al backend a través de un POST.
		let newSprinkle: Riego = new Riego(1, 1, this.getTimeStamp(), this.idElectrovalvula)
		
		// Enviamos el POST al backend para que actualice la tabla Riego.
		this.riegoService.postRiego(newSprinkle);
	}

	// Método utilizado para cerrar la electroválvula.
	public actionCloseValve()
	{
		this.valveState = true;
		
		// Generamos un valor de medición aleatorio. Se supone que al haber estado abierta la electroválvula, 
		// el suelo estará húmedo, por lo que el valor máximo que puede tomar el valor aleatorio es la última medición
		// y el mínimo será el máximo menos 5. Como el método .random() arroja un número decimal, lo redondeamos a uno 
		// entero utilizando la función .round().
		let randomSensorValue = Math.round(Math.random() * (this._valorObtenido - (this._valorObtenido - 5)) + (this._valorObtenido - 5));

		// Armamos el objeto de tipo Medicion para enviarlo al backend a través de un POST.
		let newMeasurement: Medicion = new Medicion(1, this.getTimeStamp(), randomSensorValue, this.idElectrovalvula);

		// Enviamos el POST al backend para que actualice la tabla Medición.
		this.measurementService.postMedicion(newMeasurement);
		
		// Armamos el objeto de tipo Riego para enviarlo al backend a través de un POST.
		let newSprinkle: Riego = new Riego(1, 0, this.getTimeStamp(), this.idElectrovalvula)

		// Enviamos el POST al backend para que actualice la tabla Riego.
		this.riegoService.postRiego(newSprinkle);

		// Actualizamos el gráfico, llamando de nuevo al método que busca el dato más reciente en el backend 
		// y actualiza el valor del chart.
		this.getSensorMeasurement();
		
	}

	// Método privado para obtener la fecha y hora actual.
	private getTimeStamp(): string
	{
		// Instanciamos el objeto del tipo Date.
		let date: Date = new Date;

		// Obtenemos el día del mes.
		let day: string = String(date.getDate());

		// Obtenemos el mes del año (enero es el mes cero).
		let month: string = String(date.getMonth() + 1);

		// Obtenemos el año.
		let year: string = String(date.getFullYear());

		// Obtenemos las horas.
		let hours: string = String(date.getHours());

		// Obtenemos los minutos
		let minutes: string = String(date.getMinutes());

		// Obtenemos los segundos.
		let seconds: string = String(date.getSeconds());

		// Concatenamos los "strings" en uno solo.
		let timeStamp: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		// Y lo retornamos.
		return(timeStamp);
	}

	updateChart()
	{
		// Actualizamos el chart. Utilizamos el elvis operand para que no arroje un error, ya que 
		// Angular intenta crear la vista del gráfico antes de que se encuentren disponibles los datos
		// del mismo.
		this.myChart?.update({series: [{
			name: 'kPA',
			data: [this._valorObtenido],
			tooltip: {
				valueSuffix: ' kPA'
			}
		}]});
	}

	// Función para generar el gráfico de Highcharts.
	generarChart()
	{
		this._chartOptions = {
			chart: 
			{
				type: 'gauge',
				plotBackgroundColor: null,
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			}
			,title: 
			{
				text: ''
			}
			,credits:
			{
				enabled:false
			}
			,pane: 
			{
				startAngle: -150,
				endAngle: 150
			} 
			,yAxis: 
			{
				min: 0,
				max: 100,
				minorTickInterval: 'auto',
				minorTickWidth: 1,
				minorTickLength: 10,
				minorTickPosition: 'inside',
				minorTickColor: '#666',
				tickPixelInterval: 30,
				tickWidth: 2,
				tickPosition: 'inside',
				tickLength: 10,
				tickColor: '#666',
				labels: 
				{
					step: 2,
					rotation: 'auto'
				},
				title: 
				{
					text: 'kPA'
				},
				plotBands: [{
					from: 0,
					to: 10,
					color: '#b2ff59' // green 55BF3B
				}, 
				{
					from: 10,
					to: 30,
					color: '#ffff00' // yellow DDDF0D
				}, 
				{
					from: 30,
					to: 100,
					color: '#ff5252' // red DF5353
				}]
			}
			,series: [{
				name: 'kPA',
				data: [this._valorObtenido],
				tooltip: 
				{
					valueSuffix: ' kPA'
				}
			}]
		};
		
		Highcharts.setOptions({
			chart: {
				style: {
					fontFamily: 'roboto'
				}
			}
		});
		
		// Generar el gráfico.
		this.myChart = Highcharts.chart('highcharts', this._chartOptions );
	}
}