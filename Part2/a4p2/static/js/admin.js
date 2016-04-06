/* Code for the admin page */

// jQuery selectors
var searchAllUsersButton = $("#searchAllUsers");
var searchAllDeliverersButton = $("#searchAllDeliverers");
var searchAllOrdersButton = $("#searchAllOrders");
var searchByUsernameButton = $("#button-searchByUsername");
var searchByDelivererNameButton = $("#button-searchByDelivererName");
var searchOrderByUserButton = $("#button-searchOrderByUser");
var searchOrderByDelivererButton = $("#button-searchOrderByDelivery");

var updateByUsernameButton = $("#button-updateByUsername");
var updateUserInfoButton= $("button-updateUserInfo");

var updateByDelivererNameButton = $("button-updateByDelivererName");

//var updateByUsernameButton = $("updateByUsername");
//var updateByDelivererNameButton = $("updateByDelivererName");

var user; //store the user info when updating

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
			console.log(data);

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
				html += "<li>Password: " + data[i].password + "</li>";
				html += "<li>Email: " + data[i].email + "</li>";
				html += "<li>Phone: " + data[i].phone + "</li>";
				html += "<li>City: " + data[i].city + "</li>";
				html += "<li>Address: " + data[i].address + "</li>";

				if (data[i].feedback.length > 0) {
					html += "<ul><h4>Feedback made for this user:</h4>";
					for (var j = 0; j < data[i].feedback.length; j++) {
						html += "<h4>Entry: </h4>";	
						html += "<li>Made By: " + data[i].feedback[j].madeBy + "</li>";
						html += "<li>Rating: " + data[i].feedback[j].rating + "</li>";
						html += "<li>Message: " + data[i].feedback[j].msg + "</li>";
					}
					html += "</ul>"; // close feedback list
				}
				else {
					html += "<p>No feedback made for this user</p>";
				}

				html += "</ul>"; // close properties list
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
				html += "<li>Password: " + data[i].password + "</li>";
				html += "<li>Email: " + data[i].email + "</li>";
				html += "<li>Phone: " + data[i].phone + "</li>";
				html += "<li>City: " + data[i].city + "</li>";
				html += "<li>Address: " + data[i].address + "</li>";
				html += "<li>Preferred transportation: " + data[i].transportation + "</li>";

				if (data[i].feedback.length > 0) {
					html += "<ul><h4>Feedback made for this deliverer:</h4>";
					for (var j = 0; j < data[i].feedback.length; j++) {
						html += "<h4>Entry: </h4>";	
						html += "<li>Made By: " + data[i].feedback[j].madeBy + "</li>";
						html += "<li>Rating: " + data[i].feedback[j].rating + "</li>";
						html += "<li>Message: " + data[i].feedback[j].msg + "</li>";
					}
					html += "</ul>"; // close feedback list
				}
				else {
					html += "<p>No feedback made for this deliverer</p>";
				}

				html += "</ul>"; // close properties list
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
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul>"; // end of properties list
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
			html += "<li>Address: " + data[0].address + "</li>";

				if (data[0].feedback.length > 0) {
					html += "<ul><h4>Feedback made for this user:</h4>";
					for (var j = 0; j < data[0].feedback.length; j++) {
						html += "<h4>Entry: </h4>";	
						html += "<li>Made By: " + data[0].feedback[j].madeBy + "</li>";
						html += "<li>Rating: " + data[0].feedback[j].rating + "</li>";
						html += "<li>Message: " + data[0].feedback[j].msg + "</li>";
					}
					html += "</ul>"; // close feedback list
				}
				else {
					html += "<p>No feedback made for this user</p>";
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
			console.log(data);

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
			html += "<li>City: " + data[0].city + "</li>";
			html += "<li>Address: " + data[0].address + "</li>";
			html += "<li>Preferred transportation: " + data[0].transportation + "</li>";

			if (data[0].feedback.length > 0) {
				html += "<ul><h4>Feedback made for this deliverer:</h4>";
				for (var j = 0; j < data[0].feedback.length; j++) {
					html += "<h4>Entry: </h4>";	
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
			//console.log(data);

			// If empty
			if (data.length <= 0) {
				output.html("<p>No orders found</p>");
				return;
			}	

			// Otherwise 
			var html = "<h2>Orders</h2>"; //figure out how we're gonna implement order name
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<li><h3>Order</h3></li>";
				html += "<ul>" // start of properties list
				html += "<li>_id: " + data[i]._id + "</li>";
				html += "<li>Food Item: " + data[i].food + "</li>";
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul>"; // end of properties list
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
			var html = "<h2>Orders</h2>"; //figure out how we're gonna implement order name
			html += "<ol>";
			for (var i = 0; i < data.length; i++) {
				html += "<li><h3>Order</h3></li>";
				html += "<ul>" // start of properties list
				html += "<li>_id: " + data[i]._id + "</li>";
				html += "<li>Food Item: " + data[i].food + "</li>";
				html += "<li>Food Status: " + data[i].foodStatus + "</li>";
				html += "<li>Order Status: " + data[i].orderStatus + "</li>";
				html += "<li>userID: " + data[i].userID + "</li>";
				html += "<li>delivererID: " + data[i].delivererID + "</li>";
				html += "<li>Location: " + data[i].userLocation + "</li>";
				html += "<li>Date made: " + data[i].date + "</li>";
				html += "<li>Amount of money exchanged: " + data[i].amount + "</li>";
				html += "</ul>"; // end of properties list
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


updateByUsernameButton.click(function (e) {
	//console.log($('#searchByUsername').val());
	var $username = $('#updateByUsername').val();
	//console.log(JSON.stringify($username));
	$.ajax({
		type: "POST",
		url: "admin/update_user_info",
		data: $username,
		success: function(data, textStatus, jqXHR) {
			//console.log(data[0])
			user = data; //store for when updating the database

			// If empty
			if (data[0].length <= 0) {
				output.html("<p>User not found</p>");
				return;
			}

			// Otherwise 
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
			html += "<input id=\'updateUserCCN\' type=\'text\' placeholder=\'" + data[0].password + "\' name=\'updateUserCCN\'></input><br>";

			html += "<label>Feedback</label>";

			if (data[0].feedback.length <= 0) { //User has no feedback
				html += "<label for=\'updateUserFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateUserFeedbackRating\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackRating\'></input><br>";

				html += "<label for=\'updateUserFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateUserFeedbackAuthor\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateUserFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateUserFeedbackMsg\' type=\'text\' placeholder=\'No data found.\' name=\'updateUserFeedbackMsg\'></input><br>";
			} else { //User has feedback
				html += "<label for=\'updateUserFeedbackRating\' >Feedback Rating</label><br>";
				html += "<input id=\'updateUserFeedbackRating\' type=\'text\' placeholder=\'" + data[0].feedback[0].rating + "\' name=\'updateUserFeedbackRating\'></input><br>";

				html += "<label for=\'updateUserFeedbackAuthor\' >Feedback Author</label><br>";
				html += "<input id=\'updateUserFeedbackAuthor\' type=\'text\' placeholder=\'" + data[0].feedback[0].madeBy + "\' name=\'updateUserFeedbackAuthor\'></input><br>";

				html += "<label for=\'updateUserFeedbackMsg\' >Feedback Message</label><br>";
				html += "<input id=\'updateUserFeedbackMsg\' type=\'text\' placeholder=\'" + data[0].feedback[0].msg + "\' name=\'updateUserFeedbackMsg\'></input><br>";
			}

			html += "<label for=\'updateSavedFood\' >Saved Food (Enter as a list of string)</label><br>";
			if (data[0].savedFood.length > 0) {
				html += "<input id=\'updateSavedFood\' type=\'text\' placeholder=\'" + data[0].savedFood + "\' name=\'updateSavedFood\'></input><br>";
			} else {
				html += "<input id=\'updateSavedFood\' type=\'text\' placeholder=\'No data found.\' name=\'updateSavedFood\'></input><br>";
			}


			html += "<label for=\'updateOrderHistory\' >orderHistory (Enter as a list of string)</label><br>";
			if (data[0].savedFood.length > 0) {			
				html += "<input id=\'updateOrderHistory\' type=\'text\' placeholder=\'" + data[0].orderHistory + "\' name=\'updateOrderHistory\'></input><br>";
			} else {
				html += "<input id=\'updateOrderHistory\' type=\'text\' placeholder=\'No data found.\' name=\'updateOrderHistory\'></input><br><br>";
			}
			html += "<button id=\"button-updateUserInfo\">UPDATE      <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>";


			output.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html("Error");
    }
	}); // end of ajax call
});

updateUserInfoButton.click(function (e) { //when the user clicks update on the right
	console.log(user[0]);

	var $username = ($('#updateUserName').val() == '') ? user[0].name : $('#updateUserName').val();

	var $password = ($('#updateUserPassword').val() == '') ? user[0].password : $('#updateUserPassword').val();

	var $email = ($('#updateUserEmail').val() == '') ? user[0].email : $('#updateUserEmail').val();

	var $phone = ($('#updateUserPhone').val() == '') ? user[0].phone : $('#updateUserPhone').val();

	var $address = ($('#updateUserAddress').val() == '') ? user[0].address : $('#updateUserAddress').val();

	var $city = ($('#updateUserCity').val() == '') ? user[0].city : $('#updateUserCity').val();

	var $creditCardNum = ($('#updateUserCCN').val() == '') ? user[0].creditCardNum : $('#updateUserCCN').val();

	var $feedbackRating = ($('#updateUserFeedbackRating').val() == '') ? '' : $('#updateUserFeedbackRating').val();

	var $feedbackAuthor = ($('#updateUserFeedbackAuthor').val() == '') ? '' : $('#updateUserFeedbackAuthor').val();

	var $feedbackMsg = ($('#updateUserFeedbackMsg').val() == '') ? '' : $('#updateUserFeedbackMsg').val();

	var $savedFood = ($('#updateSavedFood').val() == '') ? [] : $('#updateSavedFood').val();

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
