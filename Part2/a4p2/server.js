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
	var id = req.cookies.loginDeliverer;
	Deliverer.findById(id, function (err, data) {
		if (!data || data.name != "Admin Bob") {
			// No match
			res.status(400);
			res.send("You cannot access this page");
			return;
		}

		// Entry exists in db, authorized
		res.sendFile(__dirname + "/admin.html");
		console.log("Sent admin.html");
	});

});

app.get("/deliveryProfile.html", function (req, res) {
	// if user not logged in don't send file	
	var id = req.cookies.loginDeliverer;
	console.log(id);
	Deliverer.findById(id, function (err, data) {
		if (!data) {
			// No match
			res.status(400);
			res.send("You cannot access this page");
			return;
		}

		// Entry exists in db, authorized
		res.sendFile(__dirname + "/deliveryProfile.html");
		console.log("Sent deliveryProfile.html");
	});
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
	// incomplete

	res.sendFile(__dirname + "/userProfile.html");
	console.log("Sent userProfile.html");
});



//---------------------------
/* Other HTTP Requests */
//---------------------------

/* Function that checks if a name exists in a particular collection with name dbname. 
For example if the username "Bob" exists in the users collection then don't allow
any new users named "Bob" from signing up. */
function checkNameExists (name, dbname) {
	var query = {"name": name};
	if (dbname == "deliverer") {
		Deliverer.findOne(query, function (err, data) {
			console.log(data);
			if (err) {
				console.log("error");
				return true;
			}
			if (!data) {
				return false;
			}
			return true;

		});
	}
	else if (dbname == "user") {
		User.findOne(query, function (err, data) {
			if (err) {
				console.log("error");
				return true;
			}
			if (!data) {
				return false;
			}
			return true;
		});
	}
}


// User POSTs (submits) delivery sign up form (deliverySignUp.html)
app.post("/submit_delivery_form", function (req, res) {

	console.log("Request fields:"); console.log(req.body);
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

	var fields = req.body;
	/* Problem: Have to make the rest of the code a callback since this returns prematurely (???)
	// Does user exist already?
	if (checkNameExists(fields.name, "deliverer")) {
		console.log("Deliverer name exists already");
		res.status(400);
		res.send("Deliverer name exists already, try again");
		return;
	}
	*/

	// Now we can create the new deliverer, add them to the database
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
		res.end();
		console.log("Deliverer sign up successful");
	});

});




// User POSTs (submits) user sign up form (userSignUp.html)
app.post("/submit_user_form", function (req, res) {
	console.log("Request fields:"); console.log(req.body);
	// Validation for form fields
	var regex = /[a-z\d\-_\s]+/i;  // only alphanumeric and space
	req.checkBody("name", "Enter a valid name!").matches(regex); 
	req.checkBody("password", 'Password: 6 to 20 characters required').len(6, 20);
	req.checkBody("password", "Passwords do not match").equals(req.body.password_repeat);
	req.checkBody("email", "Enter a valid email!").isEmail();
	req.checkBody("phone", "Enter a valid phone number").notEmpty(); // not sure how to validate phone
	req.checkBody("address", "Enter a valid address").matches(regex); // only alphanumeric and space
	req.checkBody("city", "Enter a valid city").matches(regex);
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
	var user = new User({
		name: fields.name,
		password: fields.password,
		email: fields.email,
		phone: fields.phone,
		address: fields.address,
		city: fields.city,
		credit: fields.credit,
		feedback: [],
		savedFood: [],
		orderHistory: []
	});

	user.save(function (err, data) {
		if (err) {
			console.log(err);
			res.status(400);
			res.send("saving to database error");
			return;
		}
		
		// Everything was successful	
		res.status(200);
		res.end();
		console.log("User sign up successful");
	});

});


// Handle the login form
app.post("/login", function (req, res) {
	console.log("Login Request");

	// Get form fields
	var name = req.body.name;
	var password = req.body.password;
	var isDeliverer = req.body.isDeliverer;

	// Check if name and password are in the database
	// Look in deliverers collection or the users collection depending on isDeliverer
	if (isDeliverer == "true") {
		var query = {"name": name, "password": password};
		Deliverer.findOne(query, function (err, data) {
			if (err || !data) {
				res.status(400);
				res.send("Error: Incorrect name / password");
				return;
			}
			// Entry found in database, return successful result
			res.status(200);
			res.cookie("loginDeliverer", data._id, { expires: new Date(Date.now() + 600000)});
			res.send("Deliverer Success");
		});
	}
	else {
		var query = {"name": name, "password": password};

		User.findOne(query, function (err, data) {
			if (err || !data) {
				res.status(400);
				res.send("Error: Incorrect name / password");
				return;
			}
			// Entry found in database, return successful result
			res.status(200);
			res.cookie("loginUser", data._id, { expires: new Date(Date.now() + 600000)});
			res.send("Successful Login");
		});
	}	
});


// User requests for deliverer info. Return document object.
app.get("/get_deliverer_info", function (req, res) {
	var id = req.cookies.loginDeliverer;
	Deliverer.findById(id, function (err, data) {
		if (err || !data) {
			console.log(err);
			res.status(400);
			res.send("Error in retrieving deliverer data");
			return;
		}
		res.status(200);
		res.send(data);
	});
});

// User requests for user info. Return document object.
app.get("/get_user_info", function (req, res) {
	var id = req.cookies.loginUser;
	User.findById(id, function (err, data) {
		if (err || !data) {
			console.log(err);
			res.status(400);
			res.send("Error in retrieving deliverer data");
			return;
		}		
		res.status(200);
		res.send(data);
	});
});


