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
					html += "<form id='" + data[i]._id + "''>";
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
						html += "<form id='" + data[i]._id + "''>";
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
					// html += "<div class='orderEntry'>";
					html += "<form id='" + data[i]._id + "''>";
					// html += "<form>"
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

					html += "<button type='submit' class='button button-block'>Accept Order</button><br><br><br>";
					html += "</form>";
					// html += "</div>";
				}
			}
			displayOrders.html(html);
			

			// Deliverer accepted an order
			$(function () {
			    $('form').on('submit', function (e) {

			    	console.log($(this).find('input[name=id]').val());

					var formData = {
						orderID: $(this).find('input[name=id]').val(),
					}

			        $.ajax({
			            type: 'post',
			            url: 'update_order',
			            data: formData,
			            success: function () {
			            	alert("Order accepted!");
			            }
			        });
			        e.preventDefault();
			    });
			});


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



// $('#5704d62cea24ed1100e1a863').submit(function (e) {
//     // $.ajax({
//     //     type: 'POST',
//     //     url: 'index.html',
//     //     data: $(this).serialize(),
//     //     success: function () {
//     //         location.reload();
//     //     }
//     // });
//     e.preventDefault();
// 	console.log('working');
// });


// $('#main-content container-fluid well span6 display-orders form').submit(function (e) {
//     // $.ajax({
//     //     type: 'POST',
//     //     url: 'index.html',
//     //     data: $(this).serialize(),
//     //     success: function () {
//     //         location.reload();
//     //     }
//     // });
//     e.preventDefault();
// 	console.log('working');
// });



// $(function () {
//     $('#5704d62cea24ed1100e1a863').on('submit', function (e) {
//         $.ajax({
//             type: 'post',
//             url: 'addfr.jsp',
//             data: $(this).serialize(),
//             success: function () {
//                 location.reload();
//             }
//         });
//         e.preventDefault();
//     });
// });



// Deliverer accept an order: Update order status
var forms = [];


// for (i = 0; i < forms.length; i++) { 
// 	forms[i].submit(function(e) {

// 		console.log('works' + forms[i].input);

// 		// var inputs = $("#display-orders orderEntry input");

// 		// var formData = {
// 		// 	orderID: inputs[0].value,
// 		// }

// 		// // AJAX HTTP POST request
// 		// $.ajax({
// 		// 	type: "POST",
// 		// 	url: "update_order",
// 		// 	data: formData,
// 		// 	success: function(data, textStatus, jqXHR) {
// 		// 		console.log(data);
// 		// 		// change button to say Drop Order
// 		// 		// $().html('Drop Order'); - need to figure out how to reference button
// 		// 		alert("Order Accepted");
// 		// 	},
			
// 		// 	error: function(jqXHR, textStatus, errorThrown) {
// 		// 		// Display error
// 		// 		alert(jqXHR.responseText);
// 	 //    }
// 		// });


// 		// // Prevent page change
// 		// return false;
// 	});
// }