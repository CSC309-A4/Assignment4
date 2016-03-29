// As soon as the profile page is loaded, I can display information about them using
// their cookie
var userInfo = $("#user-info");
var logout = $("#logout");

var cookie = document.cookie;
console.log(cookie);

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
	}
});

logout.click(function (e) {
	delete_cookie("loginUser");
	window.location = "index.html";
});

// Function that deletes a cookie. Here just for reference / in case I need it for something later on
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

