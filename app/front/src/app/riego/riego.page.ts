import { Component, OnInit } from '@angular/core';
import { Riego } from '../model/Riego';
import { RiegoService } from '../services/riego.service'
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-riego',
    templateUrl: './riego.page.html',
    styleUrls: ['./riego.page.scss'],
})

export class RiegoPage implements OnInit 
{
  	// Atributo necesario para almacenar el identificador del dispositivo.
	public idDispositivo: string;
	
	// Objeto del tipo Riego para almacenar la respuesta desde el backend.
	public listadoRiego: Riego[];

	// Atributo utilizado como bandera para el *ngIf.
	public noData: boolean = true;
	
	constructor(private router: ActivatedRoute, public riegoServ: RiegoService)
	{
		// Obtenemos el "id" del sensor en el cual se hizo "click".
		this.idDispositivo = this.router.snapshot.paramMap.get('id');
		
		this.riegoServ.getRiegos(this.idDispositivo).then((listado) => {
			this.noData = false;
			this.listadoRiego = listado;
		});
	}

	ngOnInit(): void 
	{

	}
}
