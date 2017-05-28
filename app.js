/*



*/
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require("method-override");
var app = express();
var sqlModel = require('./models/people.js');
var peopleControlador = require ('./controllers/people.js');
var methodOverride = require("method-override");
// Middlewares
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	var router = express.Router();
	// Index
	router.get('/', function(req, res) {
		res.send("Bienvenido a mi api REST, nodejs&Mysql");
	});
	app.use(router);
	// API routes GET
	app.route('/people')
		.get(peopleControlador.findAllPeople);

	app.route('/people/:id')
		.get(peopleControlador.findById);
	// API routes POST
	app.post('/say',(req,res) =>{
		res.send("Saluton");
	});
	///Another way
	app.route('/saluton')
		.post(peopleControlador.say);
	// Start server
	app.listen(3000, function() {
 		console.log("Node server running on http://localhost:3000");
	});
