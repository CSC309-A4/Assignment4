// As soon as the page loads, make a request for all users in the system
// Known problem: this is not asynchronous, and if user signs up in the meantime, changes wont show here
var allUsers = null;
var allDeliverers = null;

var getAllUsers = $("#getUsers");
var getAllDeliverers = $("#getDeliverers");
var output = $("#output");
var feedbackForm = $("#feedbackForm");

$.ajax({
	type: "GET",
	url: "get_all_users",
	data: null,
	success: function(data, textStatus, jqXHR) {
		console.log(data);
		allUsers = data;
	}
});

$.ajax({
	type: "GET",
	url: "get_all_deliverers",
	data: null,
	success: function(data, textStatus, jqXHR) {
		console.log(data);
		allDeliverers = data;
	}
});


getAllUsers.click(function (e) {
	var html = "";
	html += "<ul>";
	for (var i = 0; i < allUsers.length; i++) {
		html += "<li>" + allUsers[i].name + "</li>";
	}
	html += "</ul>";

	output.html(html);
});

getAllDeliverers.click(function (e) {
	var html = "";
	html += "<ul>";
	for (var i = 0; i < allDeliverers.length; i++) {
		html += "<li>" + allDeliverers[i].name + "</li>";
	}
	html += "</ul>";

	output.html(html);
});


// Code for handling the feedback order form submit
feedbackForm.submit(function (e) {
	// Check cookie to see if logged in (?? - can put anonymous if not logged in maybe)

	// Make AJAX post request to submit form data

	// prevent page change
	return false;
});







