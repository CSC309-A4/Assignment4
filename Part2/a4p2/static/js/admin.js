/* Code for the admin page */

// jQuery selectors
var searchAllUsersButton = $("#searchAllUsers");
var searchAllDeliverersButton = $("#searchAllDeliverers");
var searchAllOrdersButton = $("#searchAllOrders");

var output = $("#output");


/*----------
// Events
-----------*/
searchAllUsersButton.click(function (e) {
	$.ajax({
		type: "GET",
		url: "admin/search_all_users",
		data: null,
		success: function(data, textStatus, jqXHR) {
			// Expects an array of data objects
			// console.log(data);

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
			// console.log(data);

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
			console.log(data);

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













