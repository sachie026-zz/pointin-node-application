var express = require("express");
const path = require("path");

const app = express();
var place = require("./routes/place");

app.use(place);
// app.use(function(err, req, res, next) {
//   console.log("error");
//   //  res.sendFile(path.join(__dirname, "./public/error.html"));
// });

//const app = express();
// app.get("/:id", function(req, res) {
//   let url = req.url;
//   let params = req.params;
//   res.status(400).send("hello world");
//   //   res.send(params);
//   //   res.write(url + JSON.stringify(params));
//   //   res.end();
// });

// app.listen(3000, function() {
//   console.log("listening on port 3000");
// });
