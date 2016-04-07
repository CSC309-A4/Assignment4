/* Code for the admin page */

// jQuery selectors

//search functions buttons
var searchAllUsersButton = $("#searchAllUsers");
var searchAllDeliverersButton = $("#searchAllDeliverers");
var searchAllOrdersButton = $("#searchAllOrders");
var searchByUsernameButton = $("#button-searchByUsername");
var searchByDelivererNameButton = $("#button-searchByDelivererName");
var searchOrderByUserButton = $("#button-searchOrderByUser");
var searchOrderByDelivererButton = $("#button-searchOrderByDelivery");

//update functions buttons & variables
var updateByUsernameButton = $("#button-updateByUsername");
var updateUserInfoButton = $("#button-updateUserInfo");
var updateByDelivererNameButton = $("#button-updateByDelivererName");
var updateDelivererInfoButton = $("button-updateDelivererInfo");

var user; //store the user info when updating
var deliverer; //store the deliverer info when updating

//delete functions buffer.Buffer(arg);uttons
var deleteByUsernameButton = $("#button-deleteByUsername");
var deleteByDelivererNameButton = $("#button-deleteByDelivererName");

//misc functions buttons
var initUserButton = $("#button-initUser");
var submitUserButton = $("#button-submitUser");
var createUserDBButton = $("#button-createUserDB");

var initDelivererButton = $("#button-initDeliverer");
var submitDelivererButton = $("#button-submitDeliverer");
var createDelivererDBButton = $("#button-createDelivererDB");

var initOrderButton = $("#button-initOrder");
var submitOrderButton = $("#button-submitOrder");
var createOrderDBButton = $("#button-createOrderDB");

var emptyUserDBButton = $("#button-emptyUserDB");
var emptyDelivererDBButton = $("#button-emptyDelivererDB");
var emptyOrderDBButton = $("#button-emptyOrderDB");

var output = $("#output");


 /*-------------------
// Search Functions //
-------------------*/
searchAllUsersButton.click(function (e) {
	$.ajax({
		type: "GET",
		url: "admin/search_all_users",
		data: null,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No users found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>All Users</h2>";
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<h3><li>" + data[i].name + "</li></h3>";
				html += "<ul>";	// Start of properties list
				html += "<li>_id: " + data[i]._id + "</li>";
    			html += "<li>Username: " + data[0].name + "</li>";
				html += "<li>Password: " + data[i].password + "</li>";
				html += "<li>Email: " + data[i].email + "</li>";
				html += "<li>Phone: " + data[i].phone + "</li>";
				html += "<li>Address: " + data[i].address + "</li>";
				html += "<li>City: " + data[i].city + "</li>";
				html += "<li>Credit Card Number: " + data[i].creditCardNum + "</li>";

				//feedback list
				if (data[i].feedback.length > 0) {
					html += "<ul><h4>Feedback made for this user:</h4>";
					for (var j = 0; j < data[i].feedback.length; j++) {
						html += "<h4>Entry " + (j+1).toString() + ":</h4>";		
						html += "<li>Made By: " + data[i].feedback[j].madeBy + "</li>";
						html += "<li>Rating: " + data[i].feedback[j].rating + "</li>";
						html += "<li>Message: " + data[i].feedback[j].msg + "</li>";
					}
					html += "</ul>"; // close feedback list
				}
				else {
					html += "<p>No feedback made for this user</p>";
				}

				//saved foods list
				if (data[i].savedFood.length > 0) {
					html += "<li>Saved food(s): ";
					for (var j = 0; j < data[i].savedFood.length; j++) {
						html +=  data[i].savedFood[j] + (j == data[i].savedFood.length - 1) ? "</li>" : ", ";
					}
				} else {
					html += "<p>User does not have any saved food(s).</p>";
				}

				//order history list
				if (data[i].orderHistory.length > 0) {
					html += "<ul><h4>Order history:</h4>";
					for (var j = 0; j < data[i].orderHistory.length; j++) {
						html += "<li>" + data[i].orderHistory[j] + "</li>";
					}
					html += "</ul>"; //close order history list
				} else {
					html += "<p>User does not have an order history.</p>";
				}

				html += "</ul><br>"; // close properties list
			}
			html += "</ol>";	// close ordered list

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

searchAllDeliverersButton.click(function (e) {
	$.ajax({
		type: "GET",
		url: "admin/search_all_deliverers",
		data: null,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No deliverers found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>All Deliverers</h2>";
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<h3><li>" + data[i].name + "</li></h3>";
				html += "<ul>";	// Start of properties list
				html += "<li>_id: " + data[i]._id + "</li>";
				html += "<li>Deliverer name: " + data[i].name + "</li>";
				html += "<li>Password: " + data[i].password + "</li>";
				html += "<li>Email: " + data[i].email + "</li>";
				html += "<li>Phone: " + data[i].phone + "</li>";
				html += "<li>Address: " + data[i].address + "</li>";				
				html += "<li>City: " + data[i].city + "</li>";
				html += "<li>Credit Card Number: " + data[i].creditCardNum + "</li>";
				html += "<li>Preferred transportation: " + data[i].transportation + "</li>";

				if (data[i].feedback.length > 0) {
					html += "<ul><h4>Feedback made for this deliverer:</h4>";
					for (var j = 0; j < data[i].feedback.length; j++) {
						html += "<h4>Entry " + (j+1).toString() + ":</h4>";	
						html += "<li>Made By: " + data[i].feedback[j].madeBy + "</li>";
						html += "<li>Rating: " + data[i].feedback[j].rating + "</li>";
						html += "<li>Message: " + data[i].feedback[j].msg + "</li>";
					}
					html += "</ul>"; // close feedback list
				}
				else {
					html += "<p>No feedback made for this deliverer</p>";
				}

				html += "</ul><br>"; // close properties list
			}
			html += "</ol>"; // close ordered list

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call

});


searchAllOrdersButton.click(function (e) {
	$.ajax({
		type: "GET",
		url: "admin/search_all_orders",
		data: null,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No orders found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>All Orders</h2>";
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<li><h3>Order</h3></li>";
				html += "<ul>" // start of properties list
				html += "<li>_id: " + data[i]._id + "</li>";
				html += "<li>Food Item: " + data[i].food + "</li>";
				html += "<li>Store: " + data[i].store + "</li>";
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul><br>"; // end of properties list
			}
			html += "</ol>";

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});


searchByUsernameButton.click(function (e) {
	//console.log($('#searchByUsername').val());
	var $username = $('#searchByUsername').val();
	//console.log(JSON.stringify($username));
	$.ajax({
		type: "POST",
		url: "admin/update_user_info",
		data: $username,
		success: function(data, textStatus, jqXHR) {
			//an array of 1 user
			//console.log(data[0])

			// If empty
			if (data[0].length <= 0) {
				output.html("<p>User not found</p>");
				return;
			}

			// Otherwise 
			var html = "<h2>" + data[0].name + "'s Info</h2>";
			html += "<ul>";	// Start of properties list
			html += "<li>Username: " + data[0].name + "</li>";			
			html += "<li>_id: " + data[0]._id + "</li>";
			html += "<li>Password: " + data[0].password + "</li>";
			html += "<li>Email: " + data[0].email + "</li>";
			html += "<li>Phone: " + data[0].phone + "</li>";
			html += "<li>City: " + data[0].city + "</li>";
			html += "<li>Credit Card Number: " + data[0].creditCardNum + "</li>";
			html += "<li>Address: " + data[0].address + "</li>";

			//feedback list
			if (data[0].feedback.length > 0) {
				html += "<ul><h4>Feedback made for this user:</h4>";
				for (var j = 0; j < data[0].feedback.length; j++) {
					html += "<h4>Entry " + (j+1).toString() + ":</h4>";	
					html += "<li>Made By: " + data[0].feedback[j].madeBy + "</li>";
					html += "<li>Rating: " + data[0].feedback[j].rating + "</li>";
					html += "<li>Message: " + data[0].feedback[j].msg + "</li>";
				}
				html += "</ul>"; // close feedback list
			}
			else {
				html += "<p>No feedback made for this user</p>";
			}

			//saved foods list
			if (data[0].savedFood.length > 0) {
				html += "<li>Saved food(s): ";
				for (var j = 0; j < data[0].savedFood.length; j++) {
					html +=  data[0].savedFood[j] + (j == data[0].savedFood.length - 1) ? "</li>" : ", ";
				}
			} else {
				html += "<p>User does not have any saved food(s).</p>";
			}

			//order history list
			if (data[0].orderHistory.length > 0) {
				html += "<ul><h4>Order history:</h4>";
				for (var j = 0; j < data[0].orderHistory.length; j++) {
					html += "<li>" + data[0].orderHistory[j] + "</li>";
				}
				html += "</ul>"; //close order history list
			} else {
				html += "<p>User does not have an order history.</p>";
			}

			html += "</ul>"; // close properties list

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

searchByDelivererNameButton.click(function (e) {
	var $delivererName = $('#searchByDelivererName').val();
	$.ajax({
		type: "POST",
		url: "admin/search_deliverer_info",
		data: $delivererName,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No deliverers found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>" + data[0].name + "'s Info</h2>";
			html += "<ul>";	// Start of properties list				
			html += "<li>Deliverer name: " + data[0].name + "</li>";
			html += "<li>_id: " + data[0]._id + "</li>";
			html += "<li>Password: " + data[0].password + "</li>";
			html += "<li>Email: " + data[0].email + "</li>";
			html += "<li>Phone: " + data[0].phone + "</li>";
			html += "<li>Address: " + data[0].address + "</li>";
			html += "<li>City: " + data[0].city + "</li>";
			html += "<li>Credit Card Number: " + data[0].creditCardNum + "</li>";
			html += "<li>Preferred transportation: " + data[0].transportation + "</li>";

			if (data[0].feedback.length > 0) {
				html += "<ul><h4>Feedback made for this deliverer:</h4>";
				for (var j = 0; j < data[0].feedback.length; j++) {
					html += "<h4>Entry " + (j+1).toString() + ":</h4>";	
					html += "<li>Made By: " + data[0].feedback[j].madeBy + "</li>";
					html += "<li>Rating: " + data[0].feedback[j].rating + "</li>";
					html += "<li>Message: " + data[0].feedback[j].msg + "</li>";
				}
				html += "</ul>"; // close feedback list
			} else {
				html += "<p>No feedback made for this deliverer</p>";
			}

			html += "</ul>"; // close properties list
			
			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call

});

searchOrderByUserButton.click(function (e) {
	var $userID = $('#searchOrderByUser').val();
	$.ajax({
		type: "POST",
		url: "admin/search_user_orders",
		data: $userID,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No orders found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>Orders from userID: " + data[0].userID + "</h2>"; //figure out how we're gonna implement order name
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<li><ul>" // start of properties list
				html += "<li>Order ID: " + data[i]._id + "</li>";
				html += "<li>Food Item: " + data[i].food + "</li>";
				html += "<li>Store: " + data[i].store + "</li>";
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += (data[i].delivererID == '') ? "<li>delivererID: Order still pending, no deliverer.</li>" : "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul></li>"; // end of properties list
			}
			html += "</ol>";

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

searchOrderByDelivererButton.click(function (e) {
	var $delivererID = $('#searchOrderByDelivery').val();
	$.ajax({
		type: "POST",
		url: "admin/search_deliverer_orders",
		data: $delivererID,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No orders found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>Orders from delivererID: " + data[0].userID + "</h2>"; //figure out how we're gonna implement order name
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<li><ul>" // start of properties list
				html += "<li>Order ID: " + data[i]._id + "</li>";
				html += "<li>Food Item: " + data[i].food + "</li>";
				html += "<li>Store: " + data[i].store + "</li>";
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul></li>"; // end of properties list
			}
			html += "</ol>";

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});


 /*-------------------
// Update Functions //
-------------------*/

/*Create text fields that allows an admin to update user info*/
updateByUsernameButton.click(function (e) { 

	var $username = $('#updateByUsername').val();

	$.ajax({
		type: "POST",
		url: "admin/update_user_info",
		data: $username,
		success: function(data, textStatus, jqXHR) {
			//console.log(data[0])
			user = data[0]; //store for when updating the database

			// If empty
			if (data[0].length <= 0) {
				output.html("<p>User not found</p>");
				return;
			}

			// Otherwise create html for text input fields
			var html = "<h4>Enter info into the form to update. Leave the field blank to leave the data unchanged.</h4>";

			html += "<label for=\'updateUserName\' >User Name</label><br>";
			html += "<input id=\'updateUserName\' type=\'text\' placeholder=\'" + data[0].name + "\' name=\'updateUserName\'></input><br>";

			html += "<label for=\'updateUserPassword\' >Password</label><br>";
			html += "<input id=\'updateUserPassword\' type=\'text\' placeholder=\'" + data[0].password + "\' name=\'updateUserPassword\'></input><br>";

			html += "<label for=\'updateUserEmail\' >Email</label><br>";
			html += "<input id=\'updateUserEmail\' type=\'text\' placeholder=\'" + data[0].email + "\' name=\'updateUserEmail\'></input><br>";

			html += "<label for=\'updateUserPhone\' >Phone Number</label><br>";
			html += "<input id=\'updateUserPhone\' type=\'text\' placeholder=\'" + data[0].phone + "\' name=\'updateUserPhone\'></input><br>";

			html += "<label for=\'updateUserAddress\' >Address</label><br>";
			html += "<input id=\'updateUserAddress\' type=\'text\' placeholder=\'" + data[0].city + "\' name=\'updateUserAddress\'></input><br>";

			html += "<label for=\'updateUserCity\' >City</label><br>";
			html += "<input id=\'updateUserCity\' type=\'text\' placeholder=\'" + data[0].address + "\' name=\'updateUserCity\'></input><br>";

			html += "<label for=\'updateUserCCN\' >Credit Card Number</label><br>";
			html += "<input id=\'updateUserCCN\' type=\'text\' placeholder=\'" + data[0].creditCardNum + "\' name=\'updateUserCCN\'></input><br>";

			if (data[0].feedback.length <= 0) { //User has no feedback
				html += "<label for=\'updateUserFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateUserFeedbackRating\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackRating\'></input><br>";

				html += "<label for=\'updateUserFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateUserFeedbackAuthor\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateUserFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateUserFeedbackMsg\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackMsg\'></input><br>";
			} else if (data[0].feedback[0].madeBy == "" && data[0].feedback[0].rating == "" ) { //User has feed with empty fields
				html += "<label for=\'updateUserFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateUserFeedbackRating\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackRating\'></input><br>";

				html += "<label for=\'updateUserFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateUserFeedbackAuthor\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateUserFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateUserFeedbackMsg\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackMsg\'></input><br>";
			} else { //user has feedback
				html += "<label for=\'updateUserFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateUserFeedbackRating\' type=\'text\' placeholder=\'" + data[0].feedback[0].rating + "\' name=\'updateUserFeedbackRating\'></input><br>";

				html += "<label for=\'updateUserFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateUserFeedbackAuthor\' type=\'text\' placeholder=\'" + data[0].feedback[0].madeBy + "\' name=\'updateUserFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateUserFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateUserFeedbackMsg\' type=\'text\' placeholder=\'" + data[0].feedback[0].msg + "\' name=\'updateUserFeedbackMsg\'></input><br>";

			}

			html += "<label for=\'updateSavedFood\' >Saved Food (Sample format: \"Pizza,Spaghetti,Ice Cream\" (Without quotes, no spaces between commas))</label><br>";
			if (data[0].savedFood.length > 0) { //user has saved foods
				html += "<input id=\'updateSavedFood\' type=\'text\' placeholder=\'" + data[0].savedFood + "\' name=\'updateSavedFood\'></input><br>";
			} else { //user has no saved foods
				html += "<input id=\'updateSavedFood\' type=\'text\' placeholder=\'No data found.\' name=\'updateSavedFood\'></input><br>";
			}


			html += "<label for=\'updateOrderHistory\' >orderHistory (Enter strings separate by commas (no space))</label><br>";
			if (data[0].savedFood.length > 0) {			
				html += "<input id=\'updateOrderHistory\' type=\'text\' placeholder=\'" + data[0].orderHistory + "\' name=\'updateOrderHistory\'></input><br>";
			} else {
				html += "<input id=\'updateOrderHistory\' type=\'text\' placeholder=\'No data found.\' name=\'updateOrderHistory\'></input><br><br>";
			}

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

updateUserInfoButton.click(function (e) { //when the user clicks update on the right
	//console.log(user);

	var $username = ($('#updateUserName').val() == '') ? user.name : $('#updateUserName').val();
	var $password = ($('#updateUserPassword').val() == '') ? user.password : $('#updateUserPassword').val();
	var $email = ($('#updateUserEmail').val() == '') ? user.email : $('#updateUserEmail').val();
	var $phone = ($('#updateUserPhone').val() == '') ? user.phone : $('#updateUserPhone').val();
	var $address = ($('#updateUserAddress').val() == '') ? user.address : $('#updateUserAddress').val();
	var $city = ($('#updateUserCity').val() == '') ? user.city : $('#updateUserCity').val();
	var $creditCardNum = ($('#updateUserCCN').val() == '') ? user.creditCardNum : $('#updateUserCCN').val();
	var $feedbackRating = ($('#updateUserFeedbackRating').val() == '') ? '' : $('#updateUserFeedbackRating').val();
	var $feedbackAuthor = ($('#updateUserFeedbackAuthor').val() == '') ? '' : $('#updateUserFeedbackAuthor').val();
	var $feedbackMsg = ($('#updateUserFeedbackMsg').val() == '') ? '' : $('#updateUserFeedbackMsg').val();
	var $savedFood = ($('#updateSavedFood').val() == '') ? [] : $('#updateSavedFood').val().split(",");
	var $orderHistory = ($('#updateOrderHistory').val() == '') ? [] : $('#updateOrderHistory').val();

	userInfo = {"name": $username,
				"password": $password,
				"email": $email,
				"phone": $phone,
				"address": $address,
				"city": $city,
				"creditCardNum": $creditCardNum,
				"feedback": [
					{
						"rating": $feedbackRating,
						"madeBy": $feedbackAuthor,
						"msg": $feedbackMsg
					}
				],
				"savedFood": $savedFood,
				"orderHistory": $orderHistory
			   }
	
	$.ajax({
		type: "POST",
		url: "admin/updating_user_info",
		data: userInfo,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});


updateByDelivererNameButton.click(function (e) {

	var $delivererName = $('#updateByDelivererName').val(); //name that is passed to server

	$.ajax({
		type: "POST",
		url: "admin/update_deliverer_info",
		data: $delivererName, //pass to server and get document for deliverer
		success: function(data, textStatus, jqXHR) {
			//console.log(data[0])
			deliverer = data[0]; //store for when updating the database

			// If empty
			if (data[0].length <= 0) {
				output.html("<p>User not found</p>");
				return;
			}

			// Otherwise  create html for text input fields
			var html = "<h4>Enter info into the form to update. Leave the field blank to leave the data unchanged.</h4>";

			html += "<label for=\'updateDelivererName\' >User Name</label><br>";
			html += "<input id=\'updateDelivererName\' type=\'text\' placeholder=\'" + data[0].name + "\' name=\'updateDelivererName\'></input><br>";

			html += "<label for=\'updateDelivererPassword\' >Password</label><br>";
			html += "<input id=\'updateDelivererPassword\' type=\'text\' placeholder=\'" + data[0].password + "\' name=\'updateDelivererPassword\'></input><br>";

			html += "<label for=\'updateDelivererEmail\' >Email</label><br>";
			html += "<input id=\'updateDelivererEmail\' type=\'text\' placeholder=\'" + data[0].email + "\' name=\'updateDelivererEmail\'></input><br>";

			html += "<label for=\'updateDelivererPhone\' >Phone Number</label><br>";
			html += "<input id=\'updateDelivererPhone\' type=\'text\' placeholder=\'" + data[0].phone + "\' name=\'updateDelivererPhone\'></input><br>";

			html += "<label for=\'updateDelivererAddress\' >Address</label><br>";
			html += "<input id=\'updateDelivererAddress\' type=\'text\' placeholder=\'" + data[0].city + "\' name=\'updateDelivererAddress\'></input><br>";

			html += "<label for=\'updateDelivererCity\' >City</label><br>";
			html += "<input id=\'updateDelivererCity\' type=\'text\' placeholder=\'" + data[0].address + "\' name=\'updateDelivererCity\'></input><br>";

			html += "<label for=\'updateDelivererCCN\' >Credit Card Number</label><br>";
			html += "<input id=\'updateDelivererCCN\' type=\'text\' placeholder=\'" + data[0].creditCardNum + "\' name=\'updateDelivererCCN\'></input><br>";


			if (data[0].feedback.length <= 0) { //User has no feedback
				html += "<label for=\'updateDelivererFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateDelivererFeedbackRating\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackRating\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateDelivererFeedbackAuthor\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateDelivererFeedbackMsg\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackMsg\'></input><br>";
			} else if (data[0].feedback[0].madeBy == "" && data[0].feedback[0].rating == "" ) { //User has feedback
				html += "<label for=\'updateDelivererFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateDelivererFeedbackRating\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackRating\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateDelivererFeedbackAuthor\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateDelivererFeedbackMsg\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererFeedbackMsg\'></input><br>";
			} else {
				html += "<label for=\'updateDelivererFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateDelivererFeedbackRating\' type=\'text\' placeholder=\'" + data[0].feedback[0].rating + "\' name=\'updateDelivererFeedbackRating\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateDelivererFeedbackAuthor\' type=\'text\' placeholder=\'" + data[0].feedback[0].madeBy + "\' name=\'updateDelivererFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateDelivererFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateDelivererFeedbackMsg\' type=\'text\' placeholder=\'" + data[0].feedback[0].msg + "\' name=\'updateUserFeedbackMsg\'></input><br>";

			}

			html += "<label for=\'updateDelivererAcceptedOrderss\' >Accepted orders (Enter strings separate by commas (no space))</label><br>";
			if (data[0].acceptedOrders.length > 0) {
				html += "<input id=\'updateDelivererAcceptedOrders\' type=\'text\' placeholder=\'" + data[0].acceptedOrders + "\' name=\'updateDelivererAcceptedOrderss\'></input><br>";
			} else {
				html += "<input id=\'updateDelivererAcceptedOrderss\' type=\'text\' placeholder=\'No data found.\' name=\'updateDelivererAcceptedOrderss\'></input><br>";
			}

			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

updateDelivererInfoButton.click(function (e) { //when the user clicks update on the right
	//console.log(user);

	var $username = ($('#updateDelivererName').val() == '') ? deliverer.name : $('#updateDelivererName').val();
	var $password = ($('#updateDelivererPassword').val() == '') ? deliverer.password : $('#updateDelivererPassword').val();
	var $email = ($('#updateDelivererEmail').val() == '') ? deliverer.email : $('#updateDelivererEmail').val();
	var $phone = ($('#updateDelivererPhone').val() == '') ? deliverer.phone : $('#updateDelivererPhone').val();
	var $address = ($('#updateDelivererAddress').val() == '') ? deliverer.address : $('#updateDelivererAddress').val();
	var $city = ($('#updateDelivererCity').val() == '') ? deliverer.city : $('#updateDelivererCity').val();
	var $creditCardNum = ($('#updateDelivererCCN').val() == '') ? deliverer.creditCardNum : $('#updateDelivererCCN').val();
	var $feedbackRating = ($('#updateUserFeedbackRating').val() == '') ? '' : $('#updateUserFeedbackRating').val();
	var $feedbackAuthor = ($('#updateUserFeedbackAuthor').val() == '') ? '' : $('#updateUserFeedbackAuthor').val();
	var $feedbackMsg = ($('#updateUserFeedbackMsg').val() == '') ? '' : $('#updateUserFeedbackMsg').val();
	var $acceptedOrders = ($('#updateAcceptedOrders').val() == '') ? [] : $('#updateAcceptedOrders').val().split(",");


	delivererInfo = {"name": $username,
				"password": $password,
				"email": $email,
				"phone": $phone,
				"address": $address,
				"city": $city,
				"creditCardNum": $creditCardNum,
				"feedback": [
					{
						"rating": $feedbackRating,
						"madeBy": $feedbackAuthor,
						"msg": $feedbackMsg
					}
				],
				"acceptedOrders": $savedFood,
			   }
	
	$.ajax({
		type: "POST",
		url: "admin/updating_deliverer_info",
		data: delivererInfo,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

 /*-------------------
// Delete Functions //
-------------------*/

deleteByUsernameButton.click(function (e) {
	//console.log($('#searchByUsername').val());
	var $username = $('#deleteByUsername').val();
	//console.log($('#deleteByUsername').val());
	//console.log(JSON.stringify($username));
	$.ajax({
		type: "POST",
		url: "admin/delete_user_info",
		data: $username,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

deleteByDelivererNameButton.click(function (e) {
	//console.log($('#searchByUsername').val());
	var $delivererName = $('#deleteByDelivererName').val();
	//console.log($('#deleteByDelivererName').val());
	//console.log(JSON.stringify($username));
	$.ajax({
		type: "POST",
		url: "admin/delete_deliverer_info",
		data: $delivererName,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

 /*-----------------
// Misc Functions //
-----------------*/

initUserButton.click(function (e) { 

	// Otherwise create html for text input fields
	var html = "<h4>To initialize the database, it must have a least one document. Enter info into the form below. Press submit user button to create the database.</h4>";

	html += "<label for=\'createUserName\' >User Name</label><br>";
	html += "<input id=\'createUserName\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserName\'></input><br>";

	html += "<label for=\'createUserPassword\' >Password</label><br>";
	html += "<input id=\'createUserPassword\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserPassword\'></input><br>";

	html += "<label for=\'createUserEmail\' >Email</label><br>";
	html += "<input id=\'createUserEmail\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserEmail\'></input><br>";

	html += "<label for=\'createUserPhone\' >Phone Number</label><br>";
	html += "<input id=\'createUserPhone\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserPhone\'></input><br>";

	html += "<label for=\'createUserAddress\' >Address</label><br>";
	html += "<input id=\'createUserAddress\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserAddress\'></input><br>";

	html += "<label for=\'createUserCity\' >City</label><br>";
	html += "<input id=\'createUserCity\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserCity\'></input><br>";

	html += "<label for=\'createUserCCN\' >Credit Card Number</label><br>";
	html += "<input id=\'createUserCCN\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createUserCCN\'></input><br>";

	html += "<label for=\'createUserFeedbackRating\' >Feedback Rating</label><br>";
	html += "<input id=\'createUserFeedbackRating\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createUserFeedbackRating\'></input><br>";

	html += "<label for=\'createUserFeedbackAuthor\' >Feedback Author</label><br>";
	html += "<input id=\'createUserFeedbackAuthor\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createUserFeedbackAuthor\'></input><br>";

	html += "<label for=\'createUserFeedbackMsg\' >Feedback Message</label><br>";
	html += "<input id=\'createUserFeedbackMsg\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createUserFeedbackMsg\'></input><br>";

	html += "<label for=\'createSavedFood\'>Saved Food (Sample format: \"Pizza,Spaghetti,Ice Cream\" (Without quotes, no spaces between commas))</label><br>";
	html += "<input id=\'createSavedFood\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createSavedFood\'></input><br>";
	
	html += "<label for=\'createOrderHistory\' >orderHistory (Enter strings separate by commas. No spaces between commas)</label><br>";
	html += "<input id=\'createOrderHistory\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createOrderHistory\'></input><br><br>";

			output.html(html);
});

createUserDBButton.click(function (e) { //when the user clicks create on the right
	//console.log(user);

	var $username = $('#createUserName').val();
	var $password = $('#createUserPassword').val();
	var $email = $('#createUserEmail').val();
	var $phone = $('#createUserPhone').val();
	var $address =  $('#createUserAddress').val();
	var $city = $('#createUserCity').val();
	var $creditCardNum = $('#createUserCCN').val();
	var $feedbackRating = ($('#createUserFeedbackRating').val() == '') ? '' : $('#createUserFeedbackRating').val();
	var $feedbackAuthor = ($('#createUserFeedbackAuthor').val() == '') ? '' : $('#createUserFeedbackAuthor').val();
	var $feedbackMsg = ($('#createUserFeedbackMsg').val() == '') ? '' : $('#createUserFeedbackMsg').val();
	var $savedFood = ($('#createSavedFood').val() == '') ? [] : $('#createSavedFood').val().split(",");
	var $orderHistory = ($('#createOrderHistory').val() == '') ? [] : $('#updateOrderHistory').val().split(",");

	userInfo = {"name": $username,
				"password": $password,
				"email": $email,
				"phone": $phone,
				"address": $address,
				"city": $city,
				"creditCardNum": $creditCardNum,
				"feedback": ($feedbackRating == null) ? [] : [{
															   "rating": $feedbackRating,
															   "madeBy": $feedbackAuthor,
															   "msg": $feedbackMsg
															  }],
				"savedFood": $savedFood,
				"orderHistory": $orderHistory
			   }
	
	$.ajax({
		type: "POST",
		url: "admin/create_user_database",
		data: userInfo,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});



initDelivererButton.click(function (e) {

	// Otherwise  create html for text input fields
	var html = "<h4>To initialize the database, it must have a least one document. Enter info into the form below. Press submit user button to create the database.</h4>";

	html += "<label for=\'createDelivererName\' >User Name</label><br>";
	html += "<input id=\'createDelivererName\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererName\'></input><br>";

	html += "<label for=\'createDelivererPassword\' >Password</label><br>";
	html += "<input id=\'createDelivererPassword\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererPassword\'></input><br>";

	html += "<label for=\'createDelivererEmail\' >Email</label><br>";
	html += "<input id=\'createDelivererEmail\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererEmail\'></input><br>";

	html += "<label for=\'createDelivererPhone\' >Phone Number</label><br>";
	html += "<input id=\'createDelivererPhone\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererPhone\'></input><br>";

	html += "<label for=\'createDelivererAddress\' >Address</label><br>";
	html += "<input id=\'createDelivererAddress\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererAddress\'></input><br>";

	html += "<label for=\'createDelivererCity\' >City</label><br>";
	html += "<input id=\'createDelivererCity\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererCity\'></input><br>";

	html += "<label for=\'createDelivererCCN\' >Credit Card Number</label><br>";
	html += "<input id=\'createDelivererCCN\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createDelivererCCN\'></input><br>";

	html += "<label for=\'createDelivererFeedbackRating\' >Feedback Rating</label><br>";
	html += "<input id=\'createDelivererFeedbackRating\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createDelivererFeedbackRating\'></input><br>";

	html += "<label for=\'createDelivererFeedbackAuthor\' >Feedback Author</label><br>";
	html += "<input id=\'createDelivererFeedbackAuthor\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createDelivererFeedbackAuthor\'></input><br>";

	html += "<label for=\'createDelivererFeedbackMsg\' >Feedback Message</label><br>";
	html += "<input id=\'createDelivererFeedbackMsg\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createDelivererFeedbackMsg\'></input><br>";

	html += "<label for=\'createDelivererAcceptedOrders\' >Accepted orders (Enter strings separate by commas (no space))</label><br>";
	html += "<input id=\'createDelivererAcceptedOrders\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createDelivererAcceptedOrders\'></input><br>";
	

	output.html(html);

});

createDelivererDBButton.click(function (e) { //when the user clicks update on the right
	//console.log(user);

	var $username = $('#createDelivererName').val();
	var $password = $('#createDelivererPassword').val();
	var $email = $('#createDelivererEmail').val();
	var $phone = $('#createDelivererPhone').val();
	var $address = $('#createDelivererAddress').val();
	var $city = $('#createDelivererCity').val();
	var $creditCardNum = $('#createDelivererCCN').val();
	var $feedbackRating = ($('#createUserFeedbackRating').val() == '') ? '' : $('#createUserFeedbackRating').val();
	var $feedbackAuthor = ($('#createUserFeedbackAuthor').val() == '') ? '' : $('#createUserFeedbackAuthor').val();
	var $feedbackMsg = ($('#createUserFeedbackMsg').val() == '') ? '' : $('#createUserFeedbackMsg').val();
	var $acceptedOrders = ($('#createDelivererAcceptedOrders').val() == '') ? [] : $('#createDelivererAcceptedOrders').val().split(",");


	delivererInfo = {"name": $username,
				"password": $password,
				"email": $email,
				"phone": $phone,
				"address": $address,
				"city": $city,
				"creditCardNum": $creditCardNum,
				"feedback": ($feedbackRating == null) ? [] : [{
															   "rating": $feedbackRating,
															   "madeBy": $feedbackAuthor,
															   "msg": $feedbackMsg
															  }],
				"acceptedOrders": $savedFood,
			   }
	
	$.ajax({
		type: "POST",
		url: "admin/create_deliverer_database",
		data: delivererInfo,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});



initOrderButton.click(function (e) {

	// Otherwise  create html for text input fields
	var html = "<h4>To initialize the database, it must have a least one document. Enter info into the form below. Press submit user button to create the database.</h4>";

	html += "<label for=\'createOrderFoodItem\' >Food Item</label><br>";
	html += "<input id=\'createOrderFoodItem\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderFoodItem\'></input><br>";

	html += "<label for=\'createOrderStore\' >Store</label><br>";
	html += "<input id=\'createOrderStore\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderStore\'></input><br>";

	html += "<label for=\'createOrderFoodStatus\' >Food Status</label><br>";
	html += "<input id=\'createOrderFoodStatus\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderFoodStatus\'></input><br>";

	html += "<label for=\'createOrderStatus\' >Order Status</label><br>";
	html += "<input id=\'createOrderStatus\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderStatus\'></input><br>";

	html += "<label for=\'createOrderUserID\' >User ID</label><br>";
	html += "<input id=\'createOrderUserID\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderUserID\'></input><br>";

	html += "<label for=\'createOrderDelivererID\' >Deliverer ID (Can be left blank if order status is pending)</label><br>";
	html += "<input id=\'createOrderDelivererID\' type=\'text\' placeholder=\'This field can be left blank.\' name=\'createOrderDelivererID\'></input><br>";

	html += "<label for=\'createOrderLocation\' >Location</label><br>";
	html += "<input id=\'createOrderLocation\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderLocation\'></input><br>";

	html += "<label for=\'createOrderDate\' >Date Order Was Placed</label><br>";
	html += "<input id=\'createOrderDate\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderDate\'></input><br>";

	html += "<label for=\'createOrderAmount\' >Amount of Money Exchanged</label><br>";
	html += "<input id=\'createOrderAmount\' type=\'text\' placeholder=\'This field must be filled in.\' name=\'createOrderAmount\'></input><br>";

	output.html(html);

});

createOrderDBButton.click(function (e) { //when the user clicks update on the right

	var $food = $('#createOrderFoodItem').val();
	var $store = $('#createOrderStore').val();
	var $foodStatus = $('#createOrderFoodStatus').val();	
	var $orderStatus = $('#createOrderStatus').val();
	var $userID = $('#createOrderUserID').val();
	var $delivererID = ($('#createOrderDelivererID').val() == '') ? "Order still pending." : $('#createUserFeedbackAuthor').val();
	var $userLocation = $('#createOrderLocation').val();
	var $date = $('#createOrderDate').val();	
	var $amount = $('#createOrderAmount').val();

	orderInfo = {"food": $food,
				 "store": $store,
				 "foodStatus": $foodStatus,
				 "orderStatus": $orderStatus,
				 "userID": $userID,
				 "delivererID": $delivererID,
				 "userLocation": $userLocation,
				 "date": $date,
				 "amount": $amount,
			    }
	
	$.ajax({
		type: "POST",
		url: "admin/create_order_database",
		data: orderInfo,
		success: function(data, textStatus, jqXHR) {
			output.html(data);
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});