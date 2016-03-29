console.log(1);

// As soon as the profile page is loaded, I can display information about them using
// their cookie
var delivererInfo = $("#deliverer-info");
var displayOrders = $("#display-orders"); 
var logout = $("#logout");

var cookie = document.cookie;
console.log(cookie);

$.ajax({
	type: "GET",
	url: "get_deliverer_info",
	data: cookie,
	success: function(data, textStatus, jqXHR) {
		delivererInfo.html(data);
	}
});


logout.click(function (e) {
	delete_cookie("loginDeliverer");
	window.location = "index.html";
});

// Function that deletes a cookie. Here just for reference / in case I need it for something later on
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

