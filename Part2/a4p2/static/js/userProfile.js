// As soon as the profile page is loaded, I can display information about them using
// their cookie
var userInfo = $("#user-info");
var logout = $("#logout");
var output = $("#output");
var orderForm = $("#order-form");

var cookie = document.cookie;
// Keep this user's data as a global so we don't have to refetch it
var thisUser = null;

$.ajax({
	type: "GET",
	url: "get_user_info",
	data: cookie,
	success: function(data, textStatus, jqXHR) {
		// Data is an object, get its fields and output to html
		console.log(data);
		var html = "";
		html += "<h2>User: " + data.name + "</h2>";
		html += "<p>Email: " + data.email + ", Phone: " + data.phone + "</p>";
		html += "<p>Address: " + data.address + ", City: " + data.city + "</p>";
		// still need feedback stuff here
		// also need order history, saved food

		userInfo.html(html);
		thisUser = data;
	}
});

logout.click(function (e) {
	delete_cookie("loginUser");
	window.location = "index.html";
});

// Function that deletes a cookie. 
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


/* Handlers */

// Handle order form submission
orderForm.submit(function (e) {
	// If user is currently logged out (for whatever reason) don't continue
	if (document.cookie.indexOf("loginUser") < 0) {
		console.log("No");
		return false;
	}

	// Otherwise submit the order form

	// Get form fields (all input fields except the submit)
  var inputs = $("#order-form input").not(":input[type=submit]");
  var orderFields = {};
  inputs.each(function() {
  	orderFields[this.name] = $(this).val();
	console.log(new Date().toJSON().slice(0,10));
	console.log($(this).val());
  });
  var x = "";
  if (confirm("Food = " + orderFields['food'] + "\nStore = " + orderFields['store'] + "\nLocation = " + orderFields['userLocation']) == true){
	  var order = {
		  stat: 'Pending',
		  food_status: 'Pending',
		  deliverer_id: "",
		  user_id: cookie,
		  store: orderFields['store'],
		  food: orderFields['food'],
		  date: new Date().toJSON().slice(0,10),
		  location: orderFields['userLocation'],
		  amount: 0,
	  }
	  $.ajax({
		type: "POST",
		url: "make_order",
		data: order,
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			output.html("Sucessfully placed order");
			orderForm[0].reset();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			output.html(jqXHR.responseText);
	  }
	  });
  }else{
	  alert("The order is not placed")
  }

	// Prevent page change
	return false;
});



