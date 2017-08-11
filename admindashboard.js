const http = require("http");
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session =  require('express-session');




// create express app 
var app = express();

// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views

app.set("view engine", "ejs"); // specify our view engine

// specify various resources and apply them to our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.static('admindashboard/admindashboard_assets'));  // works for views in root view folder
//app.use(express.static('/storage/'));

app.use(express.static(__dirname + '/storage/'));
app.use(express.static(__dirname + '/admindashboard_assets/'));  // works for views in root view folder
//app.use(express.static(__dirname + '/storage/'));



// Request to this URI will be handled by this CONTROLLER..........
//app.use('/', require('./controllers/authenticate'));
app.use('/admindashboard', require('./controllers/request'));



// handle page not found errors
//app.use(function (request, response) {
//response.status(404).render("404.ejs");
//});

// set port 
app.set('port',(process.env.PORT || 4003));
app.listen(app.set('port'), function(){
  console.log('Server started art port: ' + app.get('port'));
});