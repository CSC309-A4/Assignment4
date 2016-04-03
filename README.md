# Assignment4
# This will be the readme.pdf that we eventually hand in
Food Share Application

How To Use:
- navigate to the a4p2 directory
- npm install (this should install the required dependencies in package.json)
- mongod (start the database - should listen on the default port 27017)
- node server.js (start the server process)
- open browser, localhost:3000

- The database name is "foodshare", so if you want to do quick queries in the mongo shell type, mongo foodshare or do "use foodshare"

Notes: 
- I force user and deliverer names to be unique.
- After signing up, I just redirect the user to the login page (not a great design choice but whatever, other
option is to just clear the form fields and display a message telling user to go to login page)
- Cookies are what drives the app. When you log in the server sends you a cookie that identifies the user / deliverer, so
when you want to make subsequent requests you send the cookie and the server parses it and sends back the appropriate information

To Do:
- Orders - User makes order from their profile page, deliverers can confirm orders on their profile page
- Commenting / Rating system
- Admin stuff

- Code cleanup. Notice the parallels between user and deliverer sign up / login code in server.js. Some of this is repeated code,
and can be optimized with functions / callback functions
- Testing
- Performance
- Writeups

