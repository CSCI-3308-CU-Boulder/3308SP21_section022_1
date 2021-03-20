/*

var express = require('express');
var mysql = require('mysql');
var app = express();


var connect = mysql.createConnection({
  //properties
  host: 'localhost',
  user: 'root',
  port: 5432,
  password: '',
  database: 'LibrarioDataBase'
});

connect.connect(function(error){
  if(!!error){
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

app.get('/', function(req, res){
  connect.query("SELECT * FROM LibrarioDataBase", function(error, rows, fields){
    if(!!error){
      console.log('Error in Query');
    } else {
      console.log('Successful Query');
    }
  }); //SQL Query
})

app.listen(1337);


const {createPool} = require('mysql');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'LibrarioDataBase',
  connectionLimit: 10
})

pool.query(`select * from user`, (err, result, fields) => {
  if(err){
    return console.log(err);
  } else {
    return console.log(result);
  }
})

*/

const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'tactic17',
  database: 'mydb'
});

//connect
db.connect((err) => {
  if(err){
    throw err;
  } else {
    console.log('MySql Connected');
  }
});

const app = express();

console.log('80');

app.get('/', function(req, res){
  console.log('83');
  connect.query("SELECT * FROM User", function(error, rows, fields){
    if(!!error){
      console.log('Error in Query');
    } else {
      console.log('Successful Query');
    }
  }) //SQL Query
});

app.listen('3000', () => {
  console.log('Server started on port 3306');
});
