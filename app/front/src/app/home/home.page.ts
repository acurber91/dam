import { Component } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage 
{
    listadoDisp: Dispositivo[];

    constructor(public dispositivoServ: DispositivoService)
    { 
        this.dispositivoServ.getDispositivos().then((listado) => {
                this.listadoDisp = listado;
        });
    }

    ngOnInit(): void 
    {

    }
}
