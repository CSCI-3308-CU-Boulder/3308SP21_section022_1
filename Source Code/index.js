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

app.get("/register", (req, res) => { //Spencer
  res.render('register.ejs');
});

app.post('/register', (req, res) => { //Spencer
  var un = req.body.username;  //not null
  var pw = req.body.password; //not null
  var fn = req.body.firstname; //not null
  var ln = req.body.lastname; //not null
  var em = req.body.email; //not null
  var dob = req.body.dob; //not null
  var pn = req.body.phonenumber; //can be empty
  var city = req.body.city; //can be empty
  var state = req.body.state; //can be empty
  var zip = req.body.zip; //can be empty
  var country = req.body.country; //can be empty
  var acd = req.body.accountcreationdate; //rest nn
  var sq1 = req.body.securityq1;
  var sa1 = req.body.securitya1;
  var sq2 = req.body.securityq2;
  var sa2 = req.body.securitya2;
  var sq3 = req.body.securityq3;
  var sa3 = req.body.securitya3;
  var sql = "insert into `User` (UserName, password, FirstName, LastName, Email, DOB, PhoneNumber, City, State, Zip, Country, AccountCreationDate, SecurityQuestion1, Answer1, SecurityQuestion2, Answer2, SecurityQuestion3, Answer3) VALUES ('"+un+"','"+pw+"','"+fn+"','"+ln+"','"+em+"','"+dob+"','"+pn+"','"+city+"', '"+state+"', '"+zip+"','"+country+"','"+acd+"','"+sq1+"','"+sa1+"','"+sq2+"','"+sa2+"','"+sq3+"','"+sa3+"');";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/home");
});

app.get("/account", (req, res) => { //spencer
  res.render('account.ejs');
});

app.post('/account:username', (req, res) => { //spencer
  var uncur = req.body.username; 
  var unnew = req.body.newusername;
  var sql = "update `User` set UserName = '"unnew"' where UserName = '"uncur"';";
  db.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Username changed from " + uncur + " to " + unnew);
  });
  res.redirect('/account');
});

app.post('/account:password', (req, res) => { //spencer
  var pcur = req.body.password;
  var pnew = req.body.newpassword;
  var sql = "update `User` set password = '"pnew"' where password = '"pcur"';";
  db.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Password changed from " + pcur + " to " + pnew);
  });
  res.redirect('/account');
});



app.listen("3000", () => {
  console.log("Server started on port 3000");
});
