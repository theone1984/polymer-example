
# Initial structure

Start with empty example:
* Folder public:
** html folder for index and custom elements (subfolder elements)
** html/elements for custom elements
** js/vendor for polymer and web animations
** css for styles

Explain why a web server is needed (same origin browser policy).

Explain app.js in short:
* CORS header for loading Google fonts
* Port
* Express body parser for getting body JSON data
* Static directory
* Login handler:
** status code 200 when passing admin/admin
** 403 otherwise

Explain package.json in short:
* Meta data
* Dependency express + ejs
* npm install

Show empty index.html

Start server:
* node app.js
* Navigate to localhost:8080/html/index.html

# Custom elements


