//Controladores

var sqlModel = require('../models/buscador.js');
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
exports.findById = function(req, res){
	//sqlModel.connect();	
	sqlModel.query('SELECT * FROM people WHERE Folio =' + req.params.id, function(err, rows, fields) 
	{
  		if (err) throw err;
  		console.log('GET /people/:id');
  		console.log(rows);
	 	res.status(200).jsonp(rows);
	});
};



exports.stat = function(req, res){
	//sqlModel.connect();	
	let query = "SELECT * FROM bitacora_buscador order by contador desc limit 20;"
	sqlModel.query(query, function(err, rows, fields) 
	{
  		if (err) throw err;
	 	res.status(200).jsonp(rows);
	});
};




function acctionBitacora(dat,keyword,ids_productos){

    let query = "";
    let count = 0;
    let fdat = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (dat == 0){
    		
    		query = `INSERT INTO bitacora_buscador (id, tabs, contador, fecha_registro, fecha_update, ids_productos)
			VALUES (null, '` + keyword + `', '1', '`+ fdat +`','`+ fdat +`','` + ids_productos +`');`
    }
    else
    {
    	    count = dat[0].contador + 1;
    		query = "UPDATE  bitacora_buscador set contador = " + count + " ,fecha_update = '" + fdat + "' where id = "+ dat[0].id;
			
	}
	sqlModel.query(query, function(err, rows, fields) 
	{
	  	if (err) throw err;
	});
	
};	

function compruebaBitacora(dat,keyword){

   let query = "SELECT * FROM bitacora_buscador WHERE ids_productos = '" + dat + "'"
   let idsProd = [];
   
   sqlModel.query(query, function(err, rows, fields) 
   {
	  	if (err) throw err;
	  	if (rows.length > 0){ 

	  		 console.log("actualizara");
	  		 acctionBitacora(rows,keyword,dat);
	  	} 
	  	else{

	  	 	 idsProd.id = null;
	  	 	 idsProd.contador = 1;
	  	     console.log("Insertara");
	  	     acctionBitacora(idsProd,keyword,dat);
        }
   });

};

exports.find = function(req, res){
	
  	let query;
    let idsProd = [];
    let frows = [];
    let keyword = req.body.keyword;
    let i = 1;
    let keys = keyword.split(",");
    
    keys.forEach( function(valor, indice, array) {
        
        query = `SELECT * FROM cargabuscador_cvs where titulo like '%` + valor + `%' or 
	    titulo like '` + valor + `%' or titulo like '%` + valor + `' limit 20;`
        //console.log(query)
       	sqlModel.query(query, function(err, rows, fields) 
		{
				if (err) throw err;
	            if (rows.length > 0){ 

	            	frows.push(rows[0]);
                    idsProd.push(rows[0].id); 

					/*
					let frst = frows.id.filter((item,index)=>{
					    return frows.indexOf(item) === index;
					})
					*/

					frst = idsProd.filter((item,index)=>{
					    return idsProd.indexOf(item) === index;
					})					
					
                };

		        if (i == keys.length ){
		        	 console.log("llama a modificar reg")
		        	 if (req.body.keyword.length > 0) compruebaBitacora(idsProd,req.body.keyword.trim());
		          	 res.status(200).jsonp(rows);

		        }
		                        
                i++;
                
		});


		
        

	});	
	
	
};