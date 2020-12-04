/*



*/
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require("method-override");
var app = express();
var sqlModel = require('./models/buscador.js');
var buscadorControlador = require ('./controllers/buscador.js');
var methodOverride = require("method-override");
// Middlewares


	// Configurar cabeceras y cors
	app.use((req, res, next) => {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	    next();
	});

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	var router = express.Router();
	// Index

	app.use(router);
	// API routes GET
	app.route('/people')
		.get(buscadorControlador.findAllPeople);

	app.route('/people/:id')
		.get(buscadorControlador.findById);
	// API routes POST
	app.post('/say',(req,res) =>{
		res.send("Saluton");
	});
	///Another way

	app.route('/statistics') 
		.get(buscadorControlador.stat);

	app.route('/search')
		.post(buscadorControlador.find);
	// Start server
	app.listen(3001, function() {
 		console.log("Servidor Node Js Corriendo en : http://localhost:3001");
	});	