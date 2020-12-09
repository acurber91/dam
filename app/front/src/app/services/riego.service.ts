import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';

@Injectable({
  providedIn: 'root'
})

export class RiegoService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    // Método que devolverá todas las mediciones de un dispositivo determinado.
    getRiegos(id): Promise <Riego[]> 
    {
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "riego/" + id + "/all").toPromise().then((sprinkle: Riego[]) => {
            return sprinkle;
        });
    }

    // Método que devolverá todas la medición más reciente de un dispositivo determinado.
    getRiego(id): Promise <Riego>
    {     
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "riego/" + id).toPromise().then((sprinkle: Riego) => {
            return sprinkle;
        });
    }

    // Método para insertar una nueva medición.
    postRiego(sprinkle: Riego)
    {
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.post(this.urlBackend + "riego/add", {apertura: sprinkle.apertura, fecha: sprinkle.fecha, electrovalvulaId: sprinkle.electrovalvulaId}).toPromise().then((result) => {
            return result;
        });
    }
}