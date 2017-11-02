// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "password",
  database : "MMNTeam"
});
// connection.connect();
var sql = "INSERT INTO Users (name, surname, username, password, email, state) VALUES ?"
var Users =[
  ["Elisia", "Chessel", "EC-1", "123", "chessel@gmail.com", "Online"],
  ["Gilbert", "Leistner ", "GL-2", "123", "leistner@mail.com", "Online"],
  ["Keith", "Safian", "KS-3", "123", "safiain@mail.com", "Online"],
  ["Lolito", "Mafanga", "LM-4", "123", "mafanga@mail.com", "Offline"]
];
//Insert Query ---
connection.query(sql, [Users], function(err){
  if(err) throw err;
});

connection.query("SELECT * FROM Users", function(err, result){
  if(err){
    console.log(err);
    return;
  }
  // console.log(result);
});
connection.end();
