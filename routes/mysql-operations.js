var mysql = require("mysql");
var con = null;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pointin"
});

function mysqlAction(action, body, callback) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

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
  });

  con.end();
}

module.exports.mysqlAction = mysqlAction;
