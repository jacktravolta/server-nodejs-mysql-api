//Controladores

var sqlModel = require('../models/people.js');
//GET - Return all registers
exports.findAllPeople = function(req, res) {
	sqlModel.query('SELECT * FROM people LIMIT 20', function(err, rows, fields) 
	{
  		if (err) throw err;
  		console.log('GET /people');
  		console.log(rows);
	 	res.status(200).jsonp(rows);
	});
};
//GET - Return a register with specified ID
exports.findById = function(req, res) {
	//sqlModel.connect();	
	sqlModel.query('SELECT * FROM people WHERE Folio =' + req.params.id, function(err, rows, fields) 
	{
  		if (err) throw err;
  		console.log('GET /clients/:Folio');
  		console.log(rows);
	 	res.status(200).jsonp(rows);
	});
};