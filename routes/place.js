var express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const mysqlOperations = require("./mysql-operations");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const placeApp = express();
placeApp.use(express.static("public"));
placeApp.use(bodyParser.json());

//start - get methods

placeApp.get("/index.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

placeApp.get("/add-place.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

placeApp.get("/get-places.html", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

placeApp.get("/places", function(req, res) {
  res.send("No places added");
});

placeApp.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/error.html"));
});

//start - post methods

placeApp.post("/places", function(req, res) {
  var result;
  mysqlOperations.mysqlAction("addPlace", req.body, function(cres) {
    console.log("res :", cres);
    result = cres;
    res.send(result);
  });
});

placeApp.listen(3000, function() {
  console.log("listening on port 3000");
});

module.exports = placeApp;
