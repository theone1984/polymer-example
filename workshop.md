
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

Explain why you need a web server to do this

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

## Integrate basic login form

### Login form

Create login form template:

```html
<div id="login-box">
    <p>
        <label for="login-name">Login name:</label>
        <input type="text" name="login-name" id="login-name" />
    </p>
    <p>
        <label for="login-password">Password:</label>
        <input type="password" name="login-password" id="login-password" />
    </p>
    <p>
        <button id="login-button">Submit</button>
    </p>
</div>
```

** Show the page **

### Basic stylesheets

Add stylesheet to element (directly after the element declaration):

``<link rel="stylesheet" href="/css/elements/login-field.css" type="text/css" charset="utf-8"/>``

Explain why you need a web server to do this

Create styles for the login form:

``label {
    display: inline-block;
    width: 100px;
}``

** Show the page **

### Web fonts

Add link to font stylesheet:

```html
<style>
    @import url(http://fonts.googleapis.com/css?family=Muli);
</style>
```

CORS stylesheet lookup only works when using CSS @import directives inline.

Use font in stylesheet:

```css
@host {
    login-field {
        font-family: 'Muli', sans-serif;
        font-size: 11pt;
    }
}
```

The @host at-rule allows you to select and style the element hosting a shadow tree.

** Show the page **

## Attributes and data binding

Add attribute to element tag in login-field.html:

`<element name="login-field" attributes="placeholder">`

Assign a default value for the attribute in the script section:

```javascript
Polymer.register(this, {
    root: this,
    placeholder: "...",
    ready: function() {
    }
});
```

Use the attrbute in the template:

```html
<input type="text" name="login-name" id="login-name" placeholder="{{placeholder}}"/>
<input type="password" name="login-password" id="login-password" placeholder="{{placeholder}}"/>
```

** Show the page (default attribute) **

Assign an attribute value in index.html:

```html
<login-field id="login" placeholder="Type here..."></login-field>
```

** Show the page (assigned attribute) **

Explain that when the value of placeholder changes (either in the DOM or in JavaScript), both values are synchronized.



