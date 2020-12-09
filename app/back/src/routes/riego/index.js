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
var routerRiego = express.Router();
// Importamos MySQL.
var mysql = require('../../mysql');

//=======[ Main module code ]==================================================

// Recibe por parámetro un "id" de dispositivo y devuelve su última medición.
routerRiego.get('/:id', function(req, res) 
{
    mysql.query("SELECT * FROM Log_Riegos WHERE electrovalvulaId = ? ORDER BY fecha DESC", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result[0]);
    });
});

// Recibe por parámetro un "id" de dispositivo y devuelve todas sus mediciones.
routerRiego.get('/:id/all', function(req, res) 
{
    mysql.query("SELECT * FROM Log_Riegos WHERE electrovalvulaId = ? ORDER BY fecha ASC", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Recibe un JSON en el "body" de la solicitud e inserta nuevos valores en la tabla Mediciones.
routerRiego.post('/add', function(req, res) 
{
    mysql.query("INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, ?, ?)", [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Exportamos el módulo para que sea accedido por cualquier parte de la aplicación.
module.exports = routerRiego;

//=======[ End of file ]=======================================================