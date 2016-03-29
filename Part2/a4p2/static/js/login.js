var form = $("#loginForm");
var output = $("#output");

form.submit(function(e) {
	var inputs = $("#loginForm input");

	var loginData = {
		name: inputs[0].value,
		password: inputs[1].value,
		isDeliverer: inputs[2].checked
	}

	$.ajax({
		type: "POST",
		url: "login",
		data: loginData,
		success: function(data, textStatus, jqXHR) {
			var option = data;
			var cookie = document.cookie;

			// Successful login. Get Request to appropriate profile page with cookie
			if (option == "Deliverer Success") {
				// request for delivery page
				$.ajax({
					type: "GET",
					url: "deliveryProfile.html",
					data: cookie,
					success: function(data, textStatus, jqXHR) {
						window.location = "deliveryProfile.html";
					}
				});
			} 
			else {
				// request for profile page
			}

		},
		
		error: function(jqXHR, textStatus, errorThrown) {
			output.html(jqXHR.responseText);
    }

	});

	// Prevent page change
	return false;
});







// Function that deletes a cookie. Here just for reference / in case I need it for something later on
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};