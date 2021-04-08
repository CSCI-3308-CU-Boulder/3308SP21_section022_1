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

// Connect to MySQL


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




// app.get("/", (req, res) => {
//   let sql = "select * from games";
//   db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.render("pages/home");
//   });
// });

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
