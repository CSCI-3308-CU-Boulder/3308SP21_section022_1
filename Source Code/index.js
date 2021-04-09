const express = require("express");
const mysql = require("mysql");

const app = express();

var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({

  host: "localhost",
  user: "root",
  password: "AZza2163$",
  database: "mydb",
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));



app.get("/", (req, res) => {
  db.query('select * from games', function(err, rows, fields){
    if (err){
      console.log('error', err);
      res.render('pages/collection',{
        my_title: 'Collection Page',
        data: ''
      })
    }
    else{
      res.render('pages/collection',{
        my_title: 'Collection Page',
        data: rows
      })
    }
  });
});

app.post("/addgame", (req, res) => {
  var game_name = req.body.gamename;
	var game_year = req.body.yearpublished;
  var game_descrip = req.body.description;
  console.log(game_name);
  var sql = "INSERT INTO `games` (Title, DateReleased, Description) VALUES ('"+game_name+"', '"+game_year+"', '"+ game_descrip+"')";
  var sel = "SELECT * from games";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/");
});

app.get("/pages/friends", (req, res) => {
  db.query('select * from friends', function(err, rows, fields){
    if (err){
      console.log('error', err);
      res.render('pages/friends',{
        my_title: 'Friends Page',
        data: ''
      })
    }
    else{
      res.render('pages/friends',{
        my_title: 'Friends',
        data: rows
      })
    }
  });
});



app.listen("3000", () => {
  console.log("Server started on port 3000");
});
