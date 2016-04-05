// Effects
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    }

});


// Server Interaction
var form = $("#main-content form");
var output = $("#output");

form.submit(function(e) {

	e.preventDefault();

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
			alert("Successfully signed up!");
			location.href = "login.html"
		},
		
		error: function(jqXHR, textStatus, errorThrown) {

			// Clear invalid fields on return
			var keywords = ["name", "password", "passwords", "email", "phone", "address", "city", "credit"]
			var keyword_id = ["#name", "#pass1", "#pass2", "#email", "#phone", "#address", "#city", "#credit"]
			var split = jqXHR.responseText.split(" ");
			for (var i = 0; i < split.length; i++) {
				for (var j = 0; j < keywords.length; j++) {
					if (split[i].toLowerCase() == keywords[j]) {
						if (j == 1 || j == 2) {
							$(keyword_id[1]).val('');
							$(keyword_id[2]).val('');
						} else {
							$(keyword_id[j]).val('');
						}
					}
				}
			}
			// Display error
			alert(jqXHR.responseText);
    }
	});


	// Prevent page change
	return false;
});









