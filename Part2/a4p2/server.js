/* This file contains all the main server / database code. 
Sets up a connection the database, listens for incoming connections, etc.

*/


//---------------
/* Setup Code */
//---------------

// Express dependencies
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
var delivererSchema = new mongoose.Schema({
	name: String,
	password: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	transportation: String,
	creditCardNum: String,
	feedback: [
		{
			rating: Number,
			madeBy: String,
			msg: String
		}
	],
	acceptedOrders: [
		mongoose.Types.ObjectId
	]
}, 
{
	collection: "deliverers"
});

var userSchema = new mongoose.Schema({
	name: String,
	password: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	creditCardNum: String,
	feedback: [
		{
			rating: Number,
			madeBy: String,
			msg: String
		}
	],
	savedFood: [
		String
	],
	orderHistory: [
		mongoose.Types.ObjectId
	]
},
{
	collection: "users"
});

var orderSchema = new mongoose.Schema({
	orderStatus: String,
	foodStatus: String,
	delivererID: mongoose.Schema.ObjectId, 
	userID: mongoose.Schema.ObjectId,
	store: String,
	food: String,
	date: Date,
	userLocation: String,
	amount: Number
},
{
	collection: "orders"
});

// Models
var Deliverer = mongoose.model("Deliverer", delivererSchema);
var User = mongoose.model("User", userSchema);
var Order = mongoose.model("Order", orderSchema);

//----------------------------------------------------------
/* HTTP Requests for the static html, css, js, image files */
//----------------------------------------------------------

// Serving static content (everything in the /static directory)
app.use('/static', express.static('static'));

// Main entry page
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
	console.log("Sent index.html");
});

app.get("/index.html", function (req, res) {
	res.sendFile(__dirname + "/index.html");
	console.log("Sent index.html");
});

app.get("/admin.html", function (req, res) {
	// only send file back if user is authorized to access this page
	// incomplete

	res.sendFile(__dirname + "/admin.html");
	console.log("Sent admin.html");
});

app.get("/deliveryProfile.html", function (req, res) {
	// if user not logged in don't send file

	res.sendFile(__dirname + "/deliveryProfile.html");
	console.log("Sent deliveryProfile.html");
});

app.get("/deliverySignUp.html", function (req, res) {
	res.sendFile(__dirname + "/deliverySignUp.html");
	console.log("Sent deliverySignUp.html");
});

app.get("/help.html", function (req, res) {
	res.sendFile(__dirname + "/help.html");
	console.log("Sent help.html");
});

app.get("/login.html", function (req, res) {
	res.sendFile(__dirname + "/login.html");
	console.log("Sent login.html");
});

app.get("/order.html", function (req, res) {
	res.sendFile(__dirname + "/order.html");
	console.log("Sent order.html");
});

app.get("/orderConfirmation.html", function (req, res) {
	res.sendFile(__dirname + "/orderConfirmation.html");
	console.log("Sent order.html");
});

app.get("/orderForm.html", function (req, res) {
	res.sendFile(__dirname + "/orderForm.html");
	console.log("Sent orderForm.html");
});

app.get("/userSignUp.html", function (req, res) {
	res.sendFile(__dirname + "/userSignUp.html");
	console.log("Sent userSignUp.html");
});

app.get("/userProfile.html", function (req, res) {
	// if user not logged in don't send file


	res.sendFile(__dirname + "/userProfile.html");
	console.log("Sent userProfile.html");
});


//-------------------
/* Other HTTP Requests */
//-------------------

// User POSTs (submits) delivery sign up form (deliverySignUp.html)
app.post("/submit_delivery_form", function (req, res) {

	console.log(req.body);
	// Validation for form fields
	var regex = /[a-z\d\-_\s]+/i;  // only alphanumeric and space
	req.checkBody("name", "Enter a valid name!").matches(regex); 
	req.checkBody("password", 'Password: 6 to 20 characters required').len(6, 20);
	req.checkBody("password", "Passwords do not match").equals(req.body.password_repeat);
	req.checkBody("email", "Enter a valid email!").isEmail();
	req.checkBody("phone", "Enter a valid phone number").notEmpty(); // not sure how to validate phone
	req.checkBody("address", "Enter a valid address").matches(regex); // only alphanumeric and space
	req.checkBody("city", "Enter a valid city").matches(regex);
	req.checkBody("transportation", "Enter a valid form of transportation").matches(regex);
	req.checkBody("credit", "Enter a valid credit card number").isInt();
	

	// Check for any errors. If so, inform requester and stop execution
	var errors = req.validationErrors();
	if (errors) {
		// errors is a list of objects, or null if no errors found
		console.log("Errors:");
		console.log(errors);
		// Send error and message to client
		res.status(400);
		var toSend = "<p>Errors:</p>";
		for (var i = 0; i < errors.length; i++) {
			toSend += "<p>" + errors[i].msg + "</p>";
		}
		res.send(toSend);
		return;
	} 

	// Now we can create the new deliverer, add them to the database
	var fields = req.body;
	var deliverer = new Deliverer({
		name: fields.name,
		password: fields.password,
		email: fields.email,
		phone: fields.phone,
		address: fields.address,
		city: fields.city,
		transportation: fields.transportation,
		credit: fields.credit,
		feedback: []
	});

	deliverer.save(function (err, data) {
		if (err) {
			console.log(err);
			res.status(400);
			res.send("saving to database error");
			return;
		}
		
		// Everything was successful	
		res.status(200);
		// Sends the object id of the database entry of this new delivery person back to client
		res.send(data._id);
		console.log("Deliverer sign up successful");
	});

});



