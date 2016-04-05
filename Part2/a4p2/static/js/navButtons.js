// Check if user is logged in. If so, don't display (disable) signup / login panels
if (document.cookie != "") {
  $('.maybe').each(function() {
    $(this).detach();
  });

}
else {
	$("#maybeProfile").detach();
}

$("#maybeProfile").click(function (e) {
	if (document.cookie.indexOf("loginUser") >= 0) {
		location.href = "userProfile.html";
	}
	else if (document.cookie.indexOf("loginDeliverer") >= 0) {
		location.href = "deliveryProfile.html";
	}
	else {
		// pass
	}

});
