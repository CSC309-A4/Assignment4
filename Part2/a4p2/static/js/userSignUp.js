var form = $("#main-content form");
var output = $("#output");

form.submit(function(e) {
	var inputs = $("#main-content form input");

	var formData = {
		name: inputs[0].value,
		password: inputs[1].value,
		password_repeat: inputs[2].value,
		email: inputs[3].value,
		phone: inputs[4].value,
		address: inputs[5].value,
		city: inputs[6].value,
		credit: inputs[7].value,
	}

	// AJAX HTTP POST request
	$.ajax({
		type: "POST",
		url: "submit_user_form",
		data: formData,
		success: function(data, textStatus, jqXHR) {
			// I'm just going to force the user to go to the login page...
			output.html("Successfully signed up. To log in, go to the login page.");
			console.log(document.cookie);
			window.location = "login.html";
		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html(jqXHR.responseText);
    }
	});


	// Prevent page change
	return false;
});









