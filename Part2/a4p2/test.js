/* Some tests with mocha 
I also use the superagent middleware for making http requests. 
Requires: mocha and superagent (should be listed in package.json already)

It is kinda hard to test every possible http request / situation, so I only provide 
a subset of tests, mostly relating to signup / login functions.

INSTRUCTIONS:
- Start server process, node server.js
- Run this file, mocha test.js (Need to have mocha installed)

NOTE:
Running this test file will change the db state. In particular, it will:
- add "AlbertGO" to the users collection
- add "MaryMaryMary" to the deliverers collection
Just a heads up. You can get rid of these users after running this test file by doing the following:
- Go to mongo shell -> mongo ds015740.mlab.com:15740/foodshare -u deliverer -p hungry
- db.users.remove({"name": "AlbertGO"})
- db.deliverers.remove({"name": "MaryMaryMary"})

If you don't do this some of the tests will fail if you try to run it again
*/


var assert = require('assert');
var superagent = require("superagent");

/*--------------------
// START OF TESTS
----------------------*/

describe("CSC309 A4 App Tests", function() {

	describe("Testing adding a user", function() {
		var formData = {
			name: "AlbertGO",
			password: "123456",
			password_repeat: "123456",
			email: "albert232@gmail.com",
			phone: "123-231-1231",
			address: "123 Cauld St.",
			city: "Toronto",
			credit: "123123123123"
		};

		it("should add a user successfully", function (done) {
			superagent.post('http://localhost:3000/submit_user_form').send(formData).end(function (err, res) {
		    assert.equal(res.statusCode, 200);
		    assert.equal(err, null);
		    done();
		  });
		});

		it("should not add the same user twice", function (done) {
			superagent.post('http://localhost:3000/submit_user_form').send(formData).end(function (err, res) {
		    assert.equal(res.statusCode, 400);
		    var expectedMsg = "Name already exists!";
		    assert.equal(res.text, expectedMsg);
		    done();
		  });
		});

	});


	describe("Testing adding a deliverer", function() {
		var formData = {
			name: "MaryMaryMary",
			password: "asdfasdf",
			password_repeat: "asdfasdf",
			email: "mary5@gmail.com",
			phone: "109-731-1331",
			address: "250 Front St.",
			city: "Toronto",
			transportation: "Car",
			credit: "298315464543"
		};
		var formDataBad = {
			name: "BOBbopBOpbobbop",
			password: "asdfasdf",
			password_repeat: "INCORRECT",
			email: "mary5@gmail.com",
			phone: "109-731-1331",
			address: "250 Front St.",
			city: "Toronto",
			transportation: "Car",
			credit: "298315464543"
		};

		it("should add a deliverer successfully", function (done) {
			superagent.post('http://localhost:3000/submit_delivery_form').send(formData).end(function (err, res) {
		    assert.equal(res.statusCode, 200);
		    assert.equal(err, null);
		    done();
		  });
		});

		// EXAMPLE: Server Side Validation
		// now try to post an invalid request
		it("should not add this deliverer successfully due to invalid form fields", function (done) {
			superagent.post('http://localhost:3000/submit_delivery_form').send(formDataBad).end(function (err, res) {
		    assert.equal(res.statusCode, 400);
		    done();
		  });
		});

	});

	// Here since MaryMaryMary is in the db from the previous test suite, I will login w/ her account
	describe("Testing a login", function() {
		var loginDataBad = {
			name: "asdhuasi (UADhusd a(Hasdu JID91212",
			password: "POOP_IN_YOUR_MOUTH",
			isDeliverer: "true"
		}

		it("should not login properly due to name not being in db", function (done) {
			superagent.post('http://localhost:3000/login').send(loginDataBad).end(function (err, res) {
		    assert.equal(res.statusCode, 400);
		    done();
		  });
		});

		// Now try to login properly (fail case)
		var loginDataBadAgain = {
			name: "MaryMaryMary",
			password: "asdfasdf",
			isDeliverer: "false"
		};
		it("should not be able to login since MaryMaryMary is a deliverer, not a user", function (done) {
			superagent.post('http://localhost:3000/login').send(loginDataBadAgain).end(function (err, res) {
		    assert.equal(res.statusCode, 400);
		    done();
		  });
		});
		
		// Now to try to login properly (success case)
		var loginDataGood = {
			name: "MaryMaryMary",
			password: "asdfasdf",
			isDeliverer: "true"
		};
		it("should be able to login properly as MaryMaryMary", function (done) {
			superagent.post('http://localhost:3000/login').send(loginDataGood).end(function (err, res) {
		    assert.equal(res.statusCode, 200);
		    var expectedMsg = "Successful Login Deliverer";
		    assert.equal(res.text, expectedMsg);
		    done();
		  });
		});
	});


});