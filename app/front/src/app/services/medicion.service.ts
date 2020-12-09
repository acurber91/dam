import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';

@Injectable({
  providedIn: 'root'
})

export class MedicionService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    // Método que devolverá todas las mediciones de un dispositivo determinado.
    getMediciones(id): Promise <Medicion[]> 
    {
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "medicion/" + id + "/all").toPromise().then((measurement: Medicion[]) => {
            return measurement;
        });
    }

    // Método que devolverá todas la medición más reciente de un dispositivo determinado.
    getMedicion(id): Promise <Medicion>
    {     
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "medicion/" + id).toPromise().then((measurement: Medicion) => {
            return measurement;
        });
    }

    // Método para insertar una nueva medición.
    postMedicion(measurement: Medicion)
    {
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.post(this.urlBackend + "medicion/add", {fecha: measurement.fecha, valor: measurement.valor, dispositivoId: measurement.dispositivoId}).toPromise().then((result) => {
            return result;
        });
    }
}