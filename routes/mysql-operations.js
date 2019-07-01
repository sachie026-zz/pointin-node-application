var mysql = require("mysql");
var con = null;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pointin"
});

function mysqlAction(action, body, callback) {
  // con.connect(function(err) {
  // if (err) throw err;
  console.log("Connected!");

  if (action == "addPlace") {
    var sqlq =
      "INSERT INTO places(name, tags) VALUES ('" +
      body.pname +
      "', '" +
      body.tags +
      "')";
    con.query(sqlq, function(err, result) {
      if (result) {
        callback("Place added successfully");
      }
      if (err) callback(err);

      console.log("1 record inserted");
    });
  } else if (action == "getPlaces") {
    var sqlq = "SELECT * FROM places";
    con.query(sqlq, function(err, result) {
      if (result) {
        callback(result);
      }
      if (err) callback(err);
    });
  }
  // });

  // con.end();
}

module.exports.mysqlAction = mysqlAction;
