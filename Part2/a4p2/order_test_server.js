var express = require("express");
var app = express();

// For parsing cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// Need for populating req.body in POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Other Dependencies
var assert = require("assert");

// Express validator (needs to be after express and body parser dependencies)
var validator = require("express-validator");
app.use(validator());

// Specify database details (database name is foodshare)
var url = "mongodb://localhost:27017/foodshare";
var db;

// Mongoose Setup and Database Connection
var mongoose = require('mongoose');
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Connect to the database, and listen for connections
db.once('open', function() {
  console.log("Connected to database");

	app.listen(3000, function() {
		console.log("Listening on port 3000, localhost");
	});
});

//--------------------------------------------
/* Mongoose: Schema and model definitions */
//--------------------------------------------
var orders = new mongoose.Schema({
	address: String,
	store: String,
	details: String,
	email: String,
	phone: String,
	credit_card: Number,
	cvv: Number,
	creditCardNum: String
}, 
{
	collection: "deliverers"
});
//----------------------------------------------------------
/* HTTP Requests for the static html, css, js, image files */
//----------------------------------------------------------

app.use('/static', express.static('static'));

app.get("/order.html", function (req, res) {
	res.sendFile(__dirname + "/order.html");
	console.log("Sent order.html");
});

app.post("/order", function (req, res) {