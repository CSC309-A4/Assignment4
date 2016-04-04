// Feedback form code

var getAllUsers = $("#getUsers");
var getAllDeliverers = $("#getDeliverers");
var feedbackForm = $("#feedbackForm");
var getFeedbackButton = $("#getFeedback");
var getFeedbackInput = $("#getFeedbackUser");

var formOutput = $("#formOutput");
var feedbackOutput = $("#feedbackOutput");
var usersOutput = $("#usersOutput");


getAllUsers.click(function (e) {
	$.ajax({
		type: "GET",
		url: "get_all_users",
		data: null,
		success: function(data, textStatus, jqXHR) {
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html += "<li>" + data[i].name + "</li>";
			}
			html += "</ul>";
			usersOutput.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			usersOutput.html("Error in retrieving users");
    }
	});

});

getAllDeliverers.click(function (e) {
	$.ajax({
		type: "GET",
		url: "get_all_deliverers",
		data: null,
		success: function(data, textStatus, jqXHR) {
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html += "<li>" + data[i].name + "</li>";
			}
			html += "</ul>";
			usersOutput.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			usersOutput.html("Error in retrieving users");
    }
	});

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

	// Make AJAX post request to submit form data
	$.ajax({
		type: "POST",
		url: "make_comment",
		data: formData,
		success: function(data, textStatus, jqXHR) {
			formOutput.html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			formOutput.html(jqXHR.responseText);
    }
	});

	// prevent page change
	return false;
});

// Get feedback associated with a user
getFeedbackButton.click(function (e) {
	var username = getFeedbackInput[0].value;
	var userType;
	if ($("input[type='radio']")[0].checked) {
		userType = "user";
	} else {
		userType = "deliverer";
	}
	var data = {
		username: username,
		userType: userType
	}

	$.ajax({
		type: "GET",
		url: "get_feedback",
		data: data,
		success: function(data, textStatus, jqXHR) {
			if (data.feedback.length <= 0) {
				feedbackOutput.html("<h3>No feedback to display</h3>");
				return;
			}
			var html = "";
			html += "<h3>Feedback for user:</h3>";
			for (var i = 0; i < data.feedback.length; i++) {
				html += "<div class=feedbackEntry>";
				html += "<p>Made by: " + data.feedback[i].madeBy + "</p>";
				html += "<p>Rating (out of 10): " + data.feedback[i].rating + "</p>";
				html += "<p>Message:";
				html += data.feedback[i].msg;
				html += "</p></div>";
			}
			feedbackOutput.html(html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			feedbackOutput.html(jqXHR.responseText);
    }
	});

});






