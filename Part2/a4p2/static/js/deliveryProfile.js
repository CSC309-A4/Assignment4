/* Client side code for the delivery profile page. */

// As soon as the profile page is loaded, I can display information about them using
// their cookie
var delivererInfo = $("#deliverer-info");
var displayOrders = $("#display-orders"); 
var logout = $("#logout");
var search = $("#search-orders");
var display = $("#display-orders")

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
		html += "<p>Address: " + data.address + ", City: " + data.city + "</p>";
		html += "<p>Transportation: " + data.transportation + "</p>";
		// still need feedback stuff here

		delivererInfo.html(html);
		thisUser = data;
	}
});

search.click(function (e){
	var search_orders = $("#order-selection option:selected").text();
	if (search_orders == "Store Name"){
		$.ajax({
		type: "GET",
		url: "search_store",
		data: search_orders,
		success: function(data, textStatus, jqXHR) {
			var html = "";
			// console.log(data);
			for (i = 0; i < data.length; i++){
				if (data[i].orderStatus == "Pending"){
					html += "<div class='orderEntry'>";
					html += "<form>";
					html += "<label for='orderID'>Order ID:</label>" 
					        + "<input type='text' readonly='readonly' value='" + data[i]._id + "'><br>";

					html += "<label for='deliveryLocation'>Delivery Location:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].userLocation + "'><br>";

					html += "<label for='store'>Store requested from:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].store + "'><br>";

					html += "<label for='food'>Food requested:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].food + "'><br>";

					html += "<label for='date'>Date made:</label>"
						 	+ "<input type='text' readonly='readonly' value='" + data[i].date + "'><br>";

					html += "<button type='submit' class='button button-block'>Accept Order</button><br><br><br>";
					html += "</form>";
					html += "</div>";
				}
			}
			displayOrders.html(html);
			},
		});
	}
	else if (search_orders == "Near Me"){
		var cur_location = thisUser.city;
		$.ajax({
		type: "GET",
		url: "search_all",
		data: search_orders,
		success: function(data, textStatus, jqXHR) {
			var html = "";
			// console.log(data);
			for (i = 0; i < data.length; i++){
				if (data[i].orderStatus == "Pending"){
					if (data[i].city == cur_location){
						html += "<div class='orderEntry'>";
						html += "<form>";
						html += "<label for='orderID'>Order ID:</label>" 
						        + "<input type='text' readonly='readonly' value='" + data[i]._id + "'><br>";

						html += "<label for='deliveryLocation'>Delivery Location:</label>"
								+ "<input type='text' readonly='readonly' value='" + data[i].userLocation + "'><br>";

						html += "<label for='store'>Store requested from:</label>"
								+ "<input type='text' readonly='readonly' value='" + data[i].store + "'><br>";

						html += "<label for='food'>Food requested:</label>"
								+ "<input type='text' readonly='readonly' value='" + data[i].food + "'><br>";

						html += "<label for='date'>Date made:</label>"
							 	+ "<input type='text' readonly='readonly' value='" + data[i].date + "'><br>";

						html += "<button type='submit' class='button button-block'>Accept Order</button><br><br><br>";
						html += "</form>";
						html += "</div>";
					}
				}
			}
			displayOrders.html(html);
			},
		});
	}
	else if (search_orders == "List All"){
		$.ajax({
		type: "GET",
		url: "search_all",
		data: search_orders,
		success: function(data, textStatus, jqXHR) {
			var html = "";
			// console.log(data);
			for (i = 0; i < data.length; i++){
				if (data[i].orderStatus == "Pending"){
					html += "<div class='orderEntry'>";
					html += "<form>";
					console.log(data);
					html += "<label for='orderID'>Order ID:</label>" 
					        + "<input type='text' readonly='readonly' value='" + data[i]._id + "'><br>";

					html += "<label for='deliveryLocation'>Delivery Location:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].userLocation + "'><br>";

					html += "<label for='store'>Store requested from:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].store + "'><br>";

					html += "<label for='food'>Food requested:</label>"
							+ "<input type='text' readonly='readonly' value='" + data[i].food + "'><br>";

					html += "<label for='date'>Date made:</label>"
						 	+ "<input type='text' readonly='readonly' value='" + data[i].date + "'><br>";

					html += "<button type='submit' class='button button-block'>Accept Order</button><br><br><br>";
					html += "</form>";
					html += "</div>";
				}
			}
			displayOrders.html(html);
			},
		});
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

