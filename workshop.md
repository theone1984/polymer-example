
# Initial structure

Start with empty example:

* Folder public:
  * html folder for index and custom elements (subfolder elements)
  * html/elements for custom elements
  * js/vendor for polymer and web animations
  * css for styles

Explain why a web server is needed (same origin browser policy).

Explain app.js in short:

* CORS header for loading Google fonts
* Port
* Express body parser for getting body JSON data
* Static directory
* Login handler:
  * status code 200 when passing admin/admin
  * 403 otherwise

Explain package.json in short:

* Meta data
* Dependency express + ejs
* npm install

Show empty index.html

Start server:

* node app.js
* Navigate to localhost:8080/html/index.html

# Custom elements

Explain custom elements

## Integrate basic element

Link to the element in index.html:

``<link rel="import" href="/html/elements/login-field.html">``

Create basic structure in login-field.html:

```html
<element name="login-field">
    <template>
    </template>
    <script>
        Polymer.register(this, {
            root: this,
            ready: function() {
            }
        });
    </script>
</element>```

Create a login field in index.html:

``<login-field id="login"></login-field>``

Create hello world text in the element template:

``<p>Hello world</p>``

**Show the page**

