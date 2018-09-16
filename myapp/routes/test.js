var express = require('express');
var router = express.Router();
var path = require('path');

let mysql  = require('mysql');
let config = require('../config/mysql_config.js');
let connection = mysql.createConnection(config);
 
// insert statment



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/skeleton', function(req, res, next) {
  res.sendFile('/static/html/skeleton.html');
});

router.get('/crud', function(req, res, next) {
  res.sendFile(__dirname + '/../public/html/skeleton.html');
});

router.post('/postUser', function(req, res, next){

	console.log('req is ', req.body);
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	
	let stmt = `INSERT INTO test1(first_name,last_name)
            VALUES(?,?)`;
	let todo = [first_name, last_name];
 
// execute the insert statment
	connection.query(stmt, todo, (err, results, fields) => {
  		if (err) {
   			 return console.error(err.message);
  		}
  // get inserted id
  		console.log('new User ID:' + results.insertId);
  		res.send('user created succesfully with id = ' + results.insertId);
	});


});

router.get('/getUsers', function(req,res,next){

	console.log('req is ', req.body);

	let stmt = 	`SELECT * FROM test1;`;

 
// execute the insert statment
	connection.query(stmt, (err, results, fields) => {
  		if (err) {
   			 return console.error(err.message);
  		}
  // get inserted id
  		console.log(results);
  		res.send(results);
	});

});

/*
INSERT INTO 
tasks(title,priority)
VALUES
('Learn MySQL INSERT Statement',1);


*/



module.exports = router;
