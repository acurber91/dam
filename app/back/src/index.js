/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAM - CEIoT - Project Structure
 * Brief: Main backend file.
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

// Importamos ExpressJS.
var express = require('express');
var app = express();
// Asignamos el puerto 3000.
var puerto = 3000;
// Importamos CORS.
var cors = require('cors');
// Importamos el archivo encargado de manejar las rutas de "dispositivo".
var dispositivoRoute = require('./routes/dispositivo');
// Importamos el archivo encargado de manejar las rutas de "medicion".
var meidicionRoute = require('./routes/medicion');
// Importamos el archivo encargado de manejar las rutas de "riego".
var riegoRoute = require('./routes/riego');
// Importamos el archivo encargado de manejar las rutas de "electrovalvula".
var valvulaRoute = require('./routes/electrovalvula');
// Importamos el módulo de JSON para que ExpressJS pueda parsear ese tipo de archivo.
app.use(express.json());

//=======[ Main module code ]==================================================

// Permito conexiones desde cualquier dominio en CORS.
var corsOptions = {origin: '*', optionSuccessStatus: "200"};

// Definimos el "middleware" para la gestión de CORS, configurándolo con las
// opciones que se han definido.
app.use(cors(corsOptions));

// Definimos el "middleware" a nivel direccionador para mapear las rutas con código generado.
// Para ello, se necesita inspeccionar el "request" y redireccionarlos al archivo correspondiente.
// Así, para la ruta "/api/dispositivo", utilizar el archivo que está en dispositivo.
app.use('/api/dispositivo', dispositivoRoute);

// Para la ruta "/api/medicion", utilizar el archivo que está en medicion.
app.use('/api/medicion', meidicionRoute);

// Para la ruta "/api/ev", utilizar el archivo que está en electroválvula.
app.use('/api/ev', valvulaRoute);

// Y por último, para la ruta "/api/riego", utilizar el archivo que está en riego.
app.use('/api/riego', riegoRoute);

// Levantamos la API en el puerto especificado.
app.listen(puerto, function(req, res) {
    console.log("API funcionando de verdad.");
});

//=======[ End of file ]=======================================================
