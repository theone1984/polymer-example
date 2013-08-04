
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

```javascript
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

```javascript
document.getElementById('login').addEventListener('login-attempt', function(eventArgs) {
    tryLogin(eventArgs.detail, function(result) {
        alert(result.success ? "Login successful" : "Login not successful");
    });
});
```

**Show the page, enter wrong credentials, show the result, enter correct credential, show the result**

## Advanced event handlers, part II

### Creating the callbacks

Create a method in index.html to send back the login status to the login field:

```javascript
dispatchEvent = function(dispatcherElement, eventType, eventArgs) {
    var event = new CustomEvent(eventType, {
        detail: eventArgs,
        bubbles: true,
        cancelable: true
    });

    dispatcherElement.dispatchEvent(event);
};
```

Send back the login result after a login attempt:

```javascript
tryLogin(eventArgs.detail, function(result) {
    dispatchEvent(document.getElementById('login'), 'loginResult', result);
});
```

In login-field.xml, create a global event listener for the login result event within the ready() method:

```javascript
this.addEventListener('loginResult', scopedCallback(this, this.loginResultEventHandler));
```

Within the event handler, log the result:

```javascript
lognResultEventHandler: function(eventArgs) {
    var data = eventArgs.detail;
    console.log(data);
}
```

**Show the page, enter wrong credentials, show the result, enter correct credential, show the result**

### Create UI for answer

Add another box to the template in login-field.html:

```html
<div id="login-box">
    [like before]
</div>
<div id="loggedin-box" style="display: none;">
    <content select=".loggedin"></content>
</div>
```

Add a style rule for failed login attempts (outside of the 'hosts' element):

```css
.login-not-successful p {
    color: darkred;
}
```

Now, react according to the different outcomes:

```javascript
if (data.success) {
    this.$['login-box'].style.display = 'none';
    this.$['loggedin-box'].style.display = 'block';
} else {
    this.$['login-box'].setAttribute('class', 'login-not-successful');
}
```

Create the content element for the logged in box in index.html:

```html
<span class="loggedin">You are now logged in</span>
```

**Show the page, enter wrong credentials, show the result, enter correct credential, show the result**

## Inheritance and web animations

Create a new element 'animated-login-field.html' inherited from login form:

```html
<element name="animated-login-field" extends="login-field">
    <script>
        Polymer.register(this, {
        });
    </script>
</element>
```

In index.html, load both login forms and use the animated login form instead of the 'normal' login form:

```html
<link rel="import" href="/html/elements/login-field.html">
<link rel="import" href="/html/elements/animated-login-field.html">
...
<animated-login-field id="login" placeholder="Bitte hier tippen ...">
   ...
</animated-login-field>
```

Change the style definition to include the animated login field:

```css
login-field, animated-login-field {
    position: absolute;
    left: 0px;
    display: inline-block;

    font-family: 'Muli', sans-serif;
    font-size: 11pt;
}
```

(positional attributes are needed for the animations later)

**Show the page (nothing should have changed)**

Add an animation method:

```javacript
animateBox: function() {
    var targetElement = this.$['login-box'];

    document.timeline.play(new Animation(targetElement, {
        transform: ["scale(1.0f)", "scale(0.0f)"]
    }, {
        direction: "alternate", duration: 0.5
    }));
}
```

Overwrite the login result event handler and animate the box on success:

```javascript
loginResultEventHandler: function(eventArgs) {
    var data = eventArgs.detail;
     if (!data.success) {
        this.super([eventArgs]);
     } else {
        this.animateBox();
     }
}
```

Explain that super must be called with an array argument by now.

Drawbacks by now:

* No suitable way to separate HTML and JavaScript by now
* Web animations do not support chaining
* Yet another animation framework
* Some smaller issues