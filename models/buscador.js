//modelos
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'xdslxdsl88998899',
  database : 'productos'
});
module.exports = connection;