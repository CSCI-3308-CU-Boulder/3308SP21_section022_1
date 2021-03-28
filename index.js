var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


var mysql = require('mysql');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "AZza2163$",
  database: "mydb"
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


app.use(express.static('./public'));


app.get('/', function(req, res) {
	var query = 'select * from games;';
	db.any(query)
        .then(function (rows) {
            res.render('pages/collection',{
				data: rows
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/collection', {
                data: ''
            })
        })
});
app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));
