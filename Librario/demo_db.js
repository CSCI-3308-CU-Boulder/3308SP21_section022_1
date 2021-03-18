var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "AZza2163$",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM games", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
