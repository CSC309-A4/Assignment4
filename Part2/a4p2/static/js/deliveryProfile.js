// As soon as the profile page is loaded, I can display information about them using
// their cookie
var delivererInfo = $("#deliverer-info");
var displayOrders = $("#display-orders"); 
var logout = $("#logout");

var cookie = document.cookie;
// Keep this user's data in a global so we can reference it from anywhere
var thisUser = null;

$.ajax({
	type: "GET",
	url: "get_deliverer_info",
	data: cookie,
	success: function(data, textStatus, jqXHR) {
		// Data is an object, get its fields and output to html
		console.log(data);
		var html = "";
		html += "<h1>User: " + data.name + "</h1>";
		html += "<p>Email: " + data.email + ", Phone: " + data.phone + "</p>";
		html += "<p>Address: " + data.address + ", City: " + data.email + "</p>";
		html += "<p>Transportation: " + data.transportation + "</p>";
		// still need feedback stuff here

		delivererInfo.html(html);
		thisUser = data;
	}
});

logout.click(function (e) {
	delete_cookie("loginDeliverer");
	window.location = "index.html";
});

// Function that deletes a cookie.
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

