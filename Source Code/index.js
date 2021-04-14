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
  multipleStatements: true,//nec app.get/friends
  database: "mydb",
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get("/home", (req, res) => {
  res.render('pages/home', {
    my_title: 'Home Page'//renders home page
  });
})

app.get("/", (req, res) => { //spencer
  res.render('pages/login', {
    my_title: 'Login Page'
  });
});

app.post("/login", (req, res) => { //spencer
  const un = req.body.username;
  const pas = req.body.password;

  const searchun = "select UserName from `User` where password = '"+pas+"';";

  db.query(searchun, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      if(result == un) {
        res.render("/pages/home");
      } else {
        res.send("Incorrect Username or Password!")
      }
    }
  });
});

app.get("/collection", (req, res) => {
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
  res.redirect("/collection");
});
app.get("/friends", (req, res) => {
  db.query('select * from friendlist; select * from user', function(err, rows, fields){
    if (err){
      console.log('error', err);
      res.render('pages/friends',{
        my_title: 'Friends Page',
        data: '',
        users: ''
      })
    }
    else{
      res.render('pages/friends',{
        my_title: 'Friends',
        data: rows[0],
        users: rows[1]
      })
    }
  });
});

app.get("/register", (req, res) => { //Spencer
  res.render('/pages/login');
});

app.post('/register', (req, res) => { //Spencer
  var un = req.body.username;  //not null
  var pw = req.body.password; //not null
  var fn = req.body.firstname; //not null
  var ln = req.body.lastname; //not null
  var em = req.body.email; //not null
  var dob = req.body.dob; //not null

  var nul = "null";
  
  //var pn = req.body.phonenumber; //can be empty
  //var city = req.body.city; //can be empty
  //var state = req.body.state; //can be empty
  //var zip = req.body.zip; //can be empty
  //var country = req.body.country; //can be empty
  
  //var acd = req.body.accountcreationdate; //rest nn
  
  var sq1 = req.body.securityq1;
  var sa1 = req.body.securitya1;
  
  //var sq2 = req.body.securityq2;
  //var sa2 = req.body.securitya2;
  //var sq3 = req.body.securityq3;
  //var sa3 = req.body.securitya3;
  
  var sql = "insert into `User` (UserName, password, FirstName, LastName, Email, DOB, PhoneNumber, City, State, Zip, Country, AccountCreationDate, SecurityQuestion1, Answer1, SecurityQuestion2, Answer2, SecurityQuestion3, Answer3) VALUES ('"+un+"','"+pw+"','"+fn+"','"+ln+"','"+em+"','"+dob+"','"+nul+"','"+nul+"', '"+nul+"', '"+nul+"','"+nul+"','"+nul+"','"+sq1+"','"+sa1+"','"+nul+"','"+nul+"','"+nul+"','"+nul+"');";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/login");
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});

