/* Client side code for the delivery profile page. */

// As soon as the profile page is loaded, I can display information about them using
// their cookie
var delivererInfo = $("#deliverer-info");
var displayOrders = $("#display-orders"); 
var logout = $("#logout");
var search = $("#search-orders");
var display = $("#display-orders");
var myOrders = $("#my-orders")

var cookie = document.cookie;
// Keep this user's data in a global so we can reference it from anywhere
var thisUser = null;

$.ajax({
	type: "GET",
	url: "get_deliverer_info",
	data: cookie,
	success: function(data, textStatus, jqXHR) {
		// Data is an object, get its fields and output to html
		var html = "";
		html += "<h1>User: " + data.name + "</h1>";
		html += "<p>Email: " + data.email + ", Phone: " + data.phone + "</p>";
		html += "<p>Address: " + data.address + ", City: " + data.city + "</p>";
		html += "<p>Transportation: " + data.transportation + "</p>";
		// still need feedback stuff here

		delivererInfo.html(html);
		thisUser = data;
		updateOrderHistory();
		
	}
});


search.click(function (e){
	var search_orders = $("#order-selection option:selected").text();
	// filter by store name
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
					html += orderLayout(data[i]);
				}
			}
			displayOrders.html(html);

			// Deliverer accepted an order
			acceptOrder();

			},
		});
	}
	// filter order list according to city
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
						html += orderLayout(data[i]);
					}
				}
			}
			displayOrders.html(html);

			// Deliverer accepted an order
			acceptOrder();

			},
		});
	}
	// display all existing orders that are pending a deliverer
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
					html += orderLayout(data[i]);
				}
			}
			displayOrders.html(html);
			
			// Deliverer accepted an order
			acceptOrder();

			},
		});
	}
});

// logout of profile
logout.click(function (e) {
	delete_cookie("loginDeliverer");
	window.location = "index.html";
});

// Function that deletes a cookie.
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


/* --------------------------------------------
	        HELPER FUNCTIONS 
------------------------------------------*/

function updateOrderHistory() {
	$.ajax({
		type: "GET",
		url: "get_order_deliverer",
		data: thisUser,
		success: function(data, textStatus, jqXHR){
			var html = "";
			// When the list from the query is returned, iterate through them all and change the corresponding html field
			for (i = 0; i < data.length; i++){
				html += "<form id='" + data[i]._id + "''>";
				html += "<label for='orderID'>Order ID:</label>" 
				        + "<input type='text' name='id' readonly='readonly' value='" + data[i]._id + "'><br>";

				html += "<label for='deliveryLocation'>Delivery Location:</label>"
						+ "<input type='text' name='location' readonly='readonly' value='" + data[i].userLocation + "'><br>";

				html += "<label for='store'>Store requested from:</label>"
						+ "<input type='text' name='store' readonly='readonly' value='" + data[i].store + "'><br>";

				html += "<label for='food'>Food requested:</label>"
						+ "<input type='text' name='food' readonly='readonly' value='" + data[i].food + "'><br>";

				html += "<label for='date'>Date made:</label>"
					 	+ "<input type='text' name='date' readonly='readonly' value='" + data[i].date + "'><br>";

				html += "<button type='submit' class='button button-block'>Cancel Order</button><br><br><br>";
				html += "</form>";
			}
			myOrders.html(html);
			// Use the submit button to cancel the order the button is linked to
			$(function () {
			    $('form').on('submit', function (e) {

			    	console.log($(this).find('input[name=id]').val());
					console.log(thisUser);
					var formData = {
						orderID: $(this).find('input[name=id]').val(),
					}

					$(this).remove();

			        $.ajax({
			            type: 'post',
			            url: 'cancel_order',
			            data: formData,
			            success: function () {
			            	alert("Order canceled!");
			            }
			        });
			        e.preventDefault();
			    });
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			myOrders.html("Fetching failed");
	  }
	});
	return false;
}

function acceptOrder() {
	// Deliverer accepted an order
	$(function () {
	    $('form').on('submit', function (e) {

	    	console.log($(this).find('input[name=id]').val());
			console.log(thisUser);
			var formData = {
				orderID: $(this).find('input[name=id]').val(),
				deliverer: thisUser._id,
			}

			$(this).remove();

	        $.ajax({
	            type: 'post',
	            url: 'update_order',
	            data: formData,
	            success: function () {
	            	alert("Order accepted! Refresh the page to see the orders you accepted");
	            	// return updateOrderHistory();
	            }
	        });
	        e.preventDefault();
	    });
	});
}

function orderLayout(data) {
	html = '';
	html += "<form id='" + data._id + "''>";
	html += "<label for='orderID'>Order ID:</label>" 
	        + "<input type='text' name='id' readonly='readonly' value='" + data._id + "'><br>";

	html += "<label for='deliveryLocation'>Delivery Location:</label>"
			+ "<input type='text' name='location' readonly='readonly' value='" + data.userLocation + "'><br>";

	html += "<label for='store'>Store requested from:</label>"
			+ "<input type='text' name='store' readonly='readonly' value='" + data.store + "'><br>";

	html += "<label for='food'>Food requested:</label>"
			+ "<input type='text' name='food' readonly='readonly' value='" + data.food + "'><br>";

	html += "<label for='date'>Date made:</label>"
		 	+ "<input type='text' name='date' readonly='readonly' value='" + data.date + "'><br>";

	html += "<button type='submit' class='button button-block'>Accept Order</button><br><br><br>";
	html += "</form>";
	return html;
}
