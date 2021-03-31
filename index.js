const express = require("express");
const mysql = require("mysql");

const app = express();

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
    if (err) throw err;
    res.render('pages/home');
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
