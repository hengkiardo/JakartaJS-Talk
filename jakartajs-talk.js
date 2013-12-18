var express = require('express')
var gzippo = require('gzippo')
var fs = require('fs')

var SET_PORT = 3000;

var app = express()

app.use(express.compress())

app.configure(function(){
    app.use(gzippo.staticGzip(__dirname, { maxAge: 3600000 }));
    app.set("view options", {layout: false});

    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:'+SET_PORT);

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // app.use(express.favicon(__dirname + '/favicon.png'))

    app.use(express.compress());
    app.use(express.methodOverride());

    // -- Parses x-www-form-urlencoded request bodies (and json)
    app.use(express.bodyParser( { keepExtensions: true } ));

});

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/slides', function(req, res){

    fs.readFile(__dirname + '/slides/index.html', 'utf8', function(err, text){
        res.send(text);
    });

});

app.listen(process.env.PORT || SET_PORT)
console.log("Connect server listening on " + SET_PORT)

