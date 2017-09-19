
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;


var app = express();

var routes = require("./routes/routes.js");
app.use("/", routes);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));


mongoose.connect("");
var db = mongoose.connection;


db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


db.once("open", function() {
  console.log("Mongoose connection successful.");
});







// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});