import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Medicion } from '../model/Medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
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
    // Atributo necesario para almacenar el estado del dispositivo.
	public dispositivo: Dispositivo;

	// Objeto del tipo Medicion para almacenar la respuesta desde el backend.
	private _lastMeasurement: Medicion;
	
    // Atributo necesario para almacenar el identificador del dispositivo.
	public idDispositivo: string;

	// Atributo para guardar el identificador de la electroválvula.
	public idElectrovalvula: number;

	// Atributo para almacenar la medición actual del sensor.
	private _valorObtenido: number = 0;

	public myChart;
	private _chartOptions;
      
    constructor(private router: ActivatedRoute, public measurementService: MedicionService, public deviceService: DispositivoService)
    { 
		// Obtenemos el "id" del sensor en el cual se hizo "click".
		this.idDispositivo = this.router.snapshot.paramMap.get('id');

		// Llamamos al servicio para obtener la electroválvula del dispositivo.
		this.deviceService.getElectrovalvula(this.idDispositivo).then((valve) => {
			// Guardamos el objeto.
			this.dispositivo = valve;
			
			// Y obtenemos el "id" de la electroválvula en cuestión.
			this.idElectrovalvula = this.dispositivo.electrovalvulaId;
		});
		
		// Llamamos al servicio para obtener la última medición. Cuando se cumple la promesa, se actualiza el gráfico.
		this.measurementService.getMedicion(this.idDispositivo).then((measurement) => {
			// Guardamos el objeto.
			this._lastMeasurement = measurement;
			
			// Obtenemos la medición correspondiente.
			this._valorObtenido = Number(this._lastMeasurement.valor);
			
			// Actualizamos el chart. Utilizamos el elvis operand para que no arroje un error.
			this.myChart?.update({series: [{
				name: 'kPA',
				data: [this._valorObtenido],
				tooltip: {
					valueSuffix: ' kPA'
				}
			}]});
		});
    }

	ngOnInit() 
	{

    }

	ionViewWillEnter() 
	{
        this.generarChart();
	}
	
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
		
		this.myChart = Highcharts.chart('highcharts', this._chartOptions );
	}
}