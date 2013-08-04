
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

## Insertion points (example i18n)

Change login name, login password and login button to in login-field.html to:

```html
<p>
    <label for="login-name">
        <content select=".name"></content>:
    </label>
    <input type="text" name="login-name" id="login-name" placeholder="{{placeholder}}"/>
</p>
<p>
    <label for="login-password">
        <content select=".password"></content>:
    </label>
    <input type="password" name="login-password" id="login-password" placeholder="{{placeholder}}"/>
</p>
<p>
    <button id="login-button">
        <content select=".submit"></content>
    </button>
</p>
```

(Insert "<content select="selector"></content>" for login name, password and login button)

Insert the content elements in index.html (don't forget the placeholder):

```
<login-field id="login" placeholder="Bitte hier tippen ...">
    <span class="name">Login-Name</span>
    <span class="password">Passwort</span>
    <span class="submit">Abschicken</span>
</login-field>
```

The **elements** using the selector are inserted into the DOM.

Insertion points (content elements) are limited to:

* A type selector or a universal selector
* class selector(s)
* An ID selector
* attribute selector(s)

** Show the page **

## Basic event handlers

Explain this.$ (only useful when dealing with IDs)

Add scoped callback helper function:

```javascript
scopedCallback = function(scope, callback) {
    return function() {
        callback.apply(scope, arguments);
    };
};
```

(Calls the function within the given scope)

Add an event listener for the login button in login-field.html:

```
this.$['login-button'].addEventListener('click', scopedCallback(this, this.buttonClickEventHandler));
```

Add the callback function:

```
buttonClickEventHandler: function() {
    alert("Button clicked");
}
```

**Show the page, click on the "Abschicken" button**

Within the button clicked event handler, determine the login name and login password and output them:

```javascript
var loginName, loginPassword;
loginName = this.$['login-name'].value;
loginPassword = this.$['login-password'].value;
alert("Button clicked with values " + loginName + "/" + loginPassword);
```

**Show the page, enter user/password into the fields and press the button**

## Advanced event handlers part I

Integrate a method for dispatching events on the element itself into login-field.html:

```javascript
dispatchGlobalEvent: function(eventType, eventArgs) {
    var event = new CustomEvent(eventType, {
        detail: eventArgs,
        bubbles: true,
        cancelable: true
    });
    this.dispatchEvent(event);
}
```

Instead of sending an alert, dispatch the button click event:

```javascript
this.dispatchGlobalEvent('login-attempt', { loginName: loginName, loginPassword: loginPassword });
```

Catch the event in index.html (within the <scripts> element) and log the details:

```javascript
document.getElementById('login').addEventListener('login-attempt', function(eventArgs) {
    console.log(eventArgs.detail);
});
```

Create a function tryLogin() to communicate with the server:

```
tryLogin = function(loginData, callback) {
    var request = $.post('/login', loginData);

    request.done(function(eventArgs) {
        callback.call(window, {success: true, data: eventArgs });
    });
    request.fail(function(eventArgs) {
        callback.call(window, {success: false, error: eventArgs });
    });
};
```

(Explain the jQuery post funtion() and its callbacks in short)

Call the tryLogin() function when getting user data:

```
document.getElementById('login').addEventListener('login-attempt', function(eventArgs) {
    tryLogin(eventArgs.detail, function(result) {
        alert(result.success ? "Login successful" : "Login not successful");
    });
});
```

**Show the page, enter wrong credentials, show the result, enter correct credential, show the result**



