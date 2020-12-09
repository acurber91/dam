import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';

@Injectable({
    providedIn: 'root'
})

export class DispositivoService
{
	urlBackend = "http://localhost:8000/api/";
    
    constructor(private _http: HttpClient) 
    {
        
    }
	
	// Método que devolverá todos los dispositivos.
    getDispositivos(): Promise <Dispositivo[]> 
    {
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "dispositivo").toPromise().then((listado: Dispositivo[]) => {
            return listado;
        });
    }

	// Método que devolverá el dispositivo especificado a través de su "id".
    getDispositivo(id): Promise <Dispositivo>
    {         
		// Convertimos el "request" HTTP de observable a promesa.
		return this._http.get(this.urlBackend + "dispositivo/" + id).toPromise().then((listado: Dispositivo) => {
            return listado;
        });
    }

    // Método que devolverá la válvula asociada al dispositivo especificado a través de su "id".
    getElectrovalvula(id): Promise <Dispositivo>
    {         
        // Convertimos el "request" HTTP de observable a promesa.
        return this._http.get(this.urlBackend + "dispositivo/" + id + "/ev").toPromise().then((listado: Dispositivo) => {
            return listado;
        });
    }

}