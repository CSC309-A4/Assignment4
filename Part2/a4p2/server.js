/* This file contains all the main server / database code. 
Sets up a connection the database, listens for incoming connections, etc. */


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
//var configDB = require('./config/database.js');
//mongoose.connect(configDB.url);
//make database.js
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
		String
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
		String
	]
},
{
	collection: "users"
});

var orderSchema = new mongoose.Schema({
	store: String,
	food: String,
	userLocation: String,
	amount: Number,

	date: Date,
	orderStatus: String,
	foodStatus: String,

	delivererID: String,
	userID: String
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

// Main entry page (route is regex for either / or /index.html)
app.get(/^(?:\/(index.html))?(?:\/(?=$))?$/i, function (req, res) {
	res.sendFile(__dirname + "/index.html");
	console.log("Sent index.html");
});

app.get("/admin", function (req, res) {
	res.sendFile(__dirname + "/admin.html");
	console.log("Sent admin.html");
});

app.get("/deliveryProfile.html", function (req, res) {
	// if user not logged in don't send file	
	var id = req.cookies.loginDeliverer;
	// console.log(id);
	Deliverer.findById(id, function (err, data) {
		if (err || !data) {
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

app.get("/feedback.html", function (req, res) {
	res.sendFile(__dirname + "/feedback.html");
	console.log("Sent feedback.html");
});

app.get("/help.html", function (req, res) {
	res.sendFile(__dirname + "/help.html");
	console.log("Sent help.html");
});

app.get("/login.html", function (req, res) {
	res.sendFile(__dirname + "/login.html");
	console.log("Sent login.html");
});

app.get("/userSignUp.html", function (req, res) {
	res.sendFile(__dirname + "/userSignUp.html");
	console.log("Sent userSignUp.html");
});

app.get("/userProfile.html", function (req, res) {
	var id = req.cookies.loginUser;
	// console.log(id);
	User.findById(id, function (err, data) {
		if (err || !data) {
			// No match
			res.status(400);
			res.send("You cannot access this page");
			return;
		}
		// Entry exists in db, authorized
		res.sendFile(__dirname + "/userProfile.html");
		console.log("Sent userProfile.html");
	});
});



//---------------------------
/* Other HTTP Requests */
//---------------------------

// User POSTs (submits) delivery sign up form (deliverySignUp.html)
app.post("/submit_delivery_form", function (req, res) {

	console.log("Request fields:"); console.log(req.body);
	// Validation for form fields
	var regex = /[a-z\d\-_\s]+/i;  // only alphanumeric and space
	var transportation = ["Car", "Foot", "Bicycle", "Public Transportation"];
	req.checkBody("name", "Enter a valid name!").matches(regex); 
	req.checkBody("password", 'Password: 6 to 20 characters required').len(6, 20);
	req.checkBody("password", "Passwords do not match").equals(req.body.password_repeat);
	req.checkBody("email", "Enter a valid email!").isEmail();
	req.checkBody("phone", "Enter a valid phone number").notEmpty(); // not sure how to validate phone
	req.checkBody("address", "Enter a valid address").matches(regex); // only alphanumeric and space
	req.checkBody("city", "Enter a valid city").matches(regex);
	req.checkBody("transportation", "Choose a preferred transportation method").notEmpty();
	req.checkBody("credit", "Enter a valid credit card number").isInt();
	
	// Check for any errors. If so, inform requester and stop execution
	var errors = req.validationErrors();
	if (errors) {
		// errors is a list of objects, or null if no errors found
		console.log("Errors:");
		console.log(errors);
		// Send error and message to client
		res.status(400);
		var toSend = '';
		for (var i = 0; i < errors.length; i++) {
			toSend += errors[i].msg + '\n';
		}
		res.send(toSend);
		return;
	} 

	var fields = req.body;
	// first check if someone with this username already exists, otherwise run callback
	Deliverer.findOne({"name": fields.name}, function (err, data) {
		if (err || data) {
			console.log("Name already exists!");
			res.status(400);
			res.send("Name already exists!");
			return;
		}

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
		var toSend = '';
		for (var i = 0; i < errors.length; i++) {
			toSend += errors[i].msg + "\n";
		}
		res.send(toSend);
		return;
	} 

	var fields = req.body;
	// first check if someone with this username already exists, otherwise run callback
	User.findOne({"name": fields.name}, function (err, data) {
		if (err || data) {
			console.log("Name already exists!");
			res.status(400);
			res.send("Name already exists!");
			return;
		}

		// Now we can create the new deliverer, add them to the database
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
			// orderHistory: []
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
});


// Handle the login form
app.post("/login", function (req, res) {
	console.log("Login Request");

	// Get form fields
	var name = req.body.name;
	var password = req.body.password;
	var isDeliverer = req.body.isDeliverer;
	console.log(req.body);

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
			res.cookie("loginDeliverer", data._id, { expires: new Date(Date.now() + 6000000)});
			res.send("Successful Login Deliverer");
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
			res.cookie("loginUser", data._id, { expires: new Date(Date.now() + 6000000)});
			res.send("Successful Login User");
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
	console.log(id);
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

app.get("/get_order", function (req, res) {
	
	var id = req.cookies.loginUser;
	Order.find({userID: id}, function (err, data){
		console.log(data);
		if (err || !data) {
			console.log(err);
			res.status(400);
			res.send("Error in retrieving deliverer data");
			return;
		}
		if (!data.length){
			data = {};
		}
		res.status(200);
		res.send(data);
	});
});

// A user submits the order form
app.post("/make_order", function (req, res) {

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
	var order = new Order({
		store: fields.store,
		food: fields.food,
		userLocation: fields.location,
		amount: fields.amount,
		date: fields.date,
		orderStatus: fields.stat,
		foodStatus: fields.food_status,
		delivererID: fields.deliverer_id,
		userID: fields.user_id
	});
	
	order.save(function (err, data) {
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






/* These requests below are from feedback.html */
app.get("/get_all_users", function (req, res) {
	var query = {};
	var projection = {"name": 1, "_id": 0};
	User.find(query, projection, function (err, data) {
		if (err || !data) {
			console.log(err);
			res.status(400);
			res.send("No user found");
			return;
		}
		res.status(200);
		res.send(data);
	});
});

app.get("/get_all_deliverers", function (req, res) {
	var query = {};
	var projection = {"name": 1, "_id": 0};
	Deliverer.find(query, projection, function (err, data) {
		if (err || !data) {
			console.log(err);
			res.status(400);
			res.send("No user found");
			return;
		}
		res.status(200);
		res.send(data);
	});
});

// Handling case where someone wants to enter feedback about someone
app.post("/make_comment", function (req, res) {
	console.log("Make Comment");
	// Check if logged in
	if (Object.keys(req.cookies).length != 1) {
		res.status(400);
		res.send("You have to be logged in to make a comment");
	}
	// So at this point there should be exactly 1 entry in req.cookies...

	// Why do we need to do this? Because I dont have the current user's name,
	// and for comments I need to associate the commenter's name with each piece of feedback
	var commenterIsDeliverer = false;
	var commenter = req.cookies.loginUser;
	if (!commenter) {
		commenterIsDeliverer = true;
		commenter = req.cookies.loginDeliverer;
	}

	var feedbackObj = {
		rating: req.body.rating,
		madeBy: null,
		msg: req.body.msg,
	}
	console.log(req.body.isDeliverer);
	console.log(commenterIsDeliverer);
	
	// brute force code but someone else can clean it up maybe
	if (commenterIsDeliverer) {
		Deliverer.findById(commenter, function (err, data) {
			feedbackObj.madeBy = data.name;
			var query = {"name": req.body.username};

			if (req.body.isDeliverer == "true") {
				Deliverer.findOneAndUpdate(query, {$push: {"feedback": feedbackObj}}, function (err, data) {
					if (err || !data) {
						res.status(400);
						res.send("Not found, couldn't make comment");
						return;
					}
					res.status(200);
					res.send("Success");
				});
			}
			else {
				User.findOneAndUpdate(query, {$push: {"feedback": feedbackObj}}, function (err, data) {
					if (err || !data) {
						res.status(400);
						res.send("Not found, could not make comment");
						return;
					}
					res.status(200);
					res.send("success");

				});
			}


		});
	}
	else { // commenterIsDeliverer == false
		User.findById(commenter, function (err, data) {
			feedbackObj.madeBy = data.name;
			var query = {"name": req.body.username};

			if (req.body.isDeliverer == "true") {
				Deliverer.findOneAndUpdate(query, {$push: {"feedback": feedbackObj}}, function (err, data) {
					if (err || !data) {
						res.status(400);
						res.send("not found, couldn't make comment");
						return;
					}
					res.status(200);
					res.send("Success");
				});
			}
			else {
				User.findOneAndUpdate(query, {$push: {"feedback": feedbackObj}}, function (err, data) {
					if (err || !data) {
						res.status(400);
						res.send("not found, could not make comment");
						return;
					}
					res.status(200);
					res.send("success");
				});
			}

		});
	}

});

// Return all feedback for a given user
app.get("/get_feedback", function (req, res) {
	console.log("Get Feedback");
	
	var query = {"name": req.query.username};
	var projection = {"feedback": 1, "_id": 0};
	if (req.query.userType == "user") {
		User.findOne(query, projection, function (err, data) {
			if (err || !data) {
				res.status(400);
				res.send("User not found");
				return;
			}
			res.status(200);
			res.send(data);
		});
	}
	else {
		Deliverer.findOne(query, projection, function (err, data) {
			if (err || !data) {
				res.status(400);
				res.send("Deliverer not found");
				return;
			}
			res.status(200);
			res.send(data);
		});
	}

});



/* ADMIN ROUTES */
app.get("/admin/search_all_users", function (req, res) {
	console.log("Admin: Search All Users");
	User.find({}, function (err, data) {
		if (err) {
			res.send("Error");
		}
		res.send(data);
	});
});

app.get("/admin/search_all_deliverers", function (req, res) {
	console.log("Admin: Search All Deliverers");
	Deliverer.find({}, function (err, data) {
		if (err) {
			res.send("Error");
		}
		res.send(data);
	});
});

app.get("/admin/search_all_orders", function (req, res) {
	console.log("Admin: Search All Orders");
	Order.find({}, function (err, data) {
		if (err) {
			res.send("Error");
		}
		res.send(data);
	});
});



