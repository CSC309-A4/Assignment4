/* Some tests with mocha 
I also use the superagent middleware for making http requests. 
Requires: mocha and superagent (should be listed in package.json already)
*/



var assert = require('assert');
var superagent = require("superagent");


/*--------------------
// START OF TESTS
----------------------*/

describe("CSC309 A4 App Tests", function() {

	describe("Testing adding a user", function() {
		var formData = {
			name: "Albert",
			password: "123456",
			password_repeat: "123456",
			email: "albert232@gmail.com",
			phone: "123-231-1231",
			address: "123 Cauld St.",
			city: "Toronto",
			credit: "123123123123"
		};

		it("should add a user successfully", function(done) {
			superagent.post('http://localhost:3000/submit_user_form').send(formData).end(function (err, res) {
		    // Calling the end function will send the request
		    assert.equal(res.statusCode, 200);
		    console.log(err);
		    console.log(res);
		    done();
		  });
		});

		it("should not add the same user twice", function(done) {

		})


	});
});