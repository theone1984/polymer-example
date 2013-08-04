/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs');

var app = express();

var config = {
    allowedDomains: '*'
};

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    next();
};

app.configure(function() {
    app.set('port', 8080);
    app.set('views', __dirname + '/views');
    app.engine('html', ejs.renderFile);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.post('/login', function(req, res) {
    var loginData = req.body;

    if (loginData.loginName === 'admin' && loginData.loginPassword === 'admin') {
        console.log('Login successful');
        res.send({success: true}, 200);
    } else {
        console.log('Login unsuccessful');
        res.send({success: false}, 403);
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});