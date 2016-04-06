/* Client side script for a user when they are on their profile page */

var userInfo = $("#user-info");
var logout = $("#logout");
var output = $("#output");
var orderForm = $("#order-form");
var orderHistory = $("#order-history");

var cookie = document.cookie;
// Keep this user's data as a global so we don't have to refetch it
var thisUser = null;

// As soon as the profile page is loaded, I can display information about them using
// their cookie
$.ajax({
	type: "GET",
	url: "get_user_info",
	data: cookie,
	success: function(data, textStatus, jqXHR) {
		// Data is an object, get its fields and output to html
		// console.log(data);
		var html = "";
		html += "<h2>User: " + data.name + "</h2>";
		html += "<p>Email: " + data.email + ", Phone: " + data.phone + "</p>";
		html += "<p>Address: " + data.address + ", City: " + data.city + "</p>";

		userInfo.html(html);
		thisUser = data;

		updateOrderHistory();
	}
});


// Function that updates order history for a user. Fetches their order history array and sisplays it in the view
function updateOrderHistory() {
	$.ajax({
		type: "GET",
		url: "get_order",
		data: thisUser,
		success: function(data, textStatus, jqXHR){
			var html = "";
			// console.log(data);
			for (i = 0; i < data.length; i++){
				html += "<div class='orderEntry'>";
				html += "<p>Status of order: " + data[i].orderStatus + "</p>";
				html += "<p>Status of delivery: " + data[i].foodStatus + "</p>";
				html += "<p>Delivery Location: " + data[i].userLocation + "</p>";
				html += "<p>Store requested from: " + data[i].store + "</p>";
				html += "<p>Food requested: " + data[i].food + "</p>";
				if (data[i].amount != 0){
					html += "<p>" + data[i].amount + "</p>";
				}
				if (data[i].delivererID != ""){
					html += "<p>" + data[i].delivererID + "</p>";
				}
				html += "<p>Date made: " + data[i].date + "</p>";
				html += "</div>";
			}
			orderHistory.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			orderHistory.html("Fetching failed");
	  }
	});
}


// Handle order form submission
orderForm.submit(function (e) {
	// If user is currently logged out (for whatever reason) don't continue
	if (document.cookie.indexOf("loginUser") < 0) {
		console.log("Bad order form submission");
		return false;
	}

	// Otherwise submit the order form
	// Get form fields (all input fields except the submit)
  var inputs = $("#order-form input").not(":input[type=submit]");
  var orderFields = {};
  inputs.each(function() {
  	orderFields[this.name] = $(this).val();
  });
  var x = "";
  if (confirm("Food = " + orderFields['food'] + "\nStore = " + orderFields['store'] + "\nLocation = " + orderFields['userLocation']) == true){
	  var order = {
		  stat: 'Pending',
		  food_status: 'Pending',
		  deliverer_id: "",
		  user_id: thisUser,
		  store: orderFields['store'],
		  food: orderFields['food'],
		  date: new Date().toJSON().slice(0,10),
		  location: orderFields['userLocation'],
		  amount: 0,
		  city: thisUser.city,
	  }
	  $.ajax({
		type: "POST",
		url: "make_order",
		data: order,
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			output.html("Sucessfully placed order");
			orderForm[0].reset();

			updateOrderHistory();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html(jqXHR.responseText);
	  }
	  });
  } 
  else {
	  alert("The order is not placed");
  }

	// Prevent page change
	return false;
});



logout.click(function (e) {
	delete_cookie("loginUser");
	window.location = "index.html";
});

// Function that deletes a cookie. 
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
