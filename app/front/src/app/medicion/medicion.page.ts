import { Component, OnInit } from '@angular/core';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})

export class MedicionPage implements OnInit 
{
	// Atributo necesario para almacenar el identificador del dispositivo.
	public idDispositivo: string;
	
	// Objeto del tipo Medicion para almacenar la respuesta desde el backend.
	public listadoMedicion: Medicion[];

	// Atributo utilizado como bandera para el *ngIf.
	public noData: boolean = true;
	
	constructor(private router: ActivatedRoute, public medicionServ: MedicionService)
	{
		// Obtenemos el "id" del sensor en el cual se hizo "click".
		this.idDispositivo = this.router.snapshot.paramMap.get('id');
		
		this.medicionServ.getMediciones(this.idDispositivo).then((listado) => {
			this.noData = false;
			this.listadoMedicion = listado;
		});
	}

	ngOnInit(): void 
	{

	}
}
