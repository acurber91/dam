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
var routerValvula = express.Router();
// Importamos MySQL.
var mysql = require('../../mysql');

//=======[ Main module code ]==================================================

// Recibe por parámetro un "id" de dispositivo y devuelve su última medición.
routerValvula.get('/:id', function(req, res) 
{
    mysql.query("SELECT electrovalvulaid FROM Electrovalvulas WHERE nombre = ?", [req.params.id], function(err, result) {
        if(err)
        {
            res.send(err).status(400);
        }
        res.send(result);
    });
});

// Exportamos el módulo para que sea accedido por cualquier parte de la aplicación.
module.exports = routerValvula;

//=======[ End of file ]=======================================================