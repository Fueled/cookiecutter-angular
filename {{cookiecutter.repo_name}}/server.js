var express         = require('express');
var compression     = require('compression');
var app             = express();
var morgan          = require('morgan');
var logger          = morgan('combined');
var fs              = require('fs');
var hsts            = require('hsts');
var helmet          = require('helmet');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

var auth = require('http-auth');
var basic = auth.basic({
    realm: "Private Area.",
    file: __dirname + "/users.htpasswd"
});

app.use(helmet());
app.use(hsts({
  maxAge: 15552000,
  force: true,
  preload: true
}));

app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(auth.connect(basic));
app.use(express.static("" + __dirname + "/dist"));

// Setup route.
app.get('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8000);
console.log("Node server up at http://localhost:" + (process.env.PORT || 8000));