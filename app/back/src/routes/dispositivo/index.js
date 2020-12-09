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
var routerDispositivo = express.Router();
// Importamos MySQL.
var mysql = require('../../mysql');

//=======[ Main module code ]==================================================

// En la ruta raíz devuelve el listado de todos los dispositivos.
routerDispositivo.get('/', function(req, res) {
    mysql.query("SELECT * FROM Dispositivos", function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Recibe por parámetro un "id" de dispositivo y devuelve todos sus datos.
routerDispositivo.get('/:id', function(req, res) {
    mysql.query("SELECT * FROM Dispositivos WHERE dispositivoId = ?", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result[0]);
    });
});

// Recibe por parámetro un "id" de dispositivo y devuelve el "id" de la electroválvula asociada.
routerDispositivo.get('/:id/ev', function(req, res) {
    mysql.query("SELECT * FROM Electrovalvulas INNER JOIN Dispositivos ON Electrovalvulas.nombre = Dispositivos.ubicacion WHERE Dispositivos.dispositivoId = ?", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result[0]);
    });
});

// Exportamos el módulo para que sea accedido por cualquier parte de la aplicación.
module.exports = routerDispositivo;

//=======[ End of file ]=======================================================