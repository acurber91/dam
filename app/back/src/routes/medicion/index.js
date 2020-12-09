/*=============================================================================
 * Authors: Brian Ducca
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAM - CEIoT - Project Structure
 * Brief: Backend routes file.
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

// Importamos ExpressJS.
var express = require('express');
// Importamos el manejador de rutas de ExpressJS.
var routerMedicion = express.Router();
// Importamos MySQL.
var mysql = require('../../mysql');

//=======[ Main module code ]==================================================

// Recibe por parámetro un "id" de dispositivo y devuelve su última medición.
routerMedicion.get('/:id', function(req, res) 
{
    mysql.query("SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result[0]);
    });
});

// Recibe por parámetro un "id" de dispositivo y devuelve todas sus mediciones.
routerMedicion.get('/:id/all', function(req, res) 
{
    mysql.query("SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha ASC", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Recibe un JSON en el "body" de la solicitud e inserta nuevos valores en la tabla Mediciones.
routerMedicion.post('/add', function(req, res) 
{
    mysql.query("INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)", [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Exportamos el módulo para que sea accedido por cualquier parte de la aplicación.
module.exports = routerMedicion;

//=======[ End of file ]=======================================================