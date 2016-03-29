# Assignment4
Food Share Application

How To Use:
- npm install (this should install the required dependencies, like express, mongodb, etc.)
- mongod (start the database - should listen on the default port 27017)
- node server.js (start the server)
- open browser, localhost:3000

- The database name is "foodshare", so if you want to do quick queries in the mongo shell type, mongo foodshare or do "use foodshare"

Notes: 
- The project is not complete yet.
- I force user and deliverer names to be unique.
- After signing up, I just redirect the user to the login page (not a great design choice but whatever)
- Cookies are what drives the app. When you log in the server sends you a cookie that identifies the user / deliverer, so
when you want to make subsequent requests you send the cookie and the server parses it and sends back the appropriate information
- To get to the admin page which is restricted to pleb users, 
log in as a deliverer with name = Admin Bob and password = 123456. Then do to admin.html

Known Issues
- After logout, you can press back and get back to profile pages. However if you try to go back there manually (via URL) authorization works properly
- While on a profile page, if you navigate anywhere else in site you don't have any way of knowing if you are logged in
(unless you check document.cookie), but you are still logged in until you press logout on your profile page
- 

To Do:
- Orders - User makes order from their profile page, deliverers can confirm orders on their profile page
- Commenting / Rating system
- Admin stuff (easy)


