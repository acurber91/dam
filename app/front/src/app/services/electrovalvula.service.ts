import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';

@Injectable({
  providedIn: 'root'
})

export class ElectrovalvulaService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    // Método que devolverá el "id" de la electrovalvula asociada al dispositivo con "nombre".
    getRiego(nombreDisp): Promise <Electrovalvula>
    {     
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "ev/" + nombreDisp).toPromise().then((valve: Electrovalvula) => {
            return valve;
        });
    }
}