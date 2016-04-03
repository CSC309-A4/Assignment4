// As soon as the page loads, make a request for all users in the system
// Known problem: this is not asynchronous, and if user signs up in the meantime, changes wont show here
var allUsers = [];
var allDeliverers = [];

var getAllUsers = $("#getUsers");
var getAllDeliverers = $("#getDeliverers");
var feedbackForm = $("#feedbackForm");

var formOutput = $("#formOutput");
var feedbackOutput = $("#feedbackOutput");
var usersOutput = $("#usersOutput");


$.ajax({
	type: "GET",
	url: "get_all_users",
	data: null,
	success: function(data, textStatus, jqXHR) {
		allUsers = data;
	}
});

$.ajax({
	type: "GET",
	url: "get_all_deliverers",
	data: null,
	success: function(data, textStatus, jqXHR) {
		allDeliverers = data;
	}
});


getAllUsers.click(function (e) {
	if (allUsers.length < 1) {
		usersOutput.html("No users");	
		return;
	}

	var html = "";
	html += "<ul>";
	for (var i = 0; i < allUsers.length; i++) {
		html += "<li>" + allUsers[i].name + "</li>";
	}
	html += "</ul>";

	usersOutput.html(html);
});

getAllDeliverers.click(function (e) {
	if (allDeliverers.length < 1) {
		usersOutput.html("No deliverers");
		return;
	}

	var html = "";
	html += "<ul>";
	for (var i = 0; i < allDeliverers.length; i++) {
		html += "<li>" + allDeliverers[i].name + "</li>";
	}
	html += "</ul>";

	usersOutput.html(html);
});


// Code for handling the feedback order form submit
feedbackForm.submit(function (e) {
	// Check cookie to see if logged in (?? - can put anonymous if not logged in maybe)
	if (document.cookie == "") {
		formOutput.html("Whoops, you need to be logged in to post a comment!");
		return false;
	}

	var formData = {
		msg: $("#msgInput")[0].value,
		rating: $("#rating")[0].value,
		username: $("#username")[0].value,
		isDeliverer: $("#isDeliverer")[0].checked,
		cookie: document.cookie
	}
	console.log(formData);

	// Make AJAX post request to submit form data
	$.ajax({
		type: "POST",
		url: "make_comment",
		data: formData,
		success: function(data, textStatus, jqXHR) {
			console.log(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
    }
	});

	// prevent page change
	return false;
});







