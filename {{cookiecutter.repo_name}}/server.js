var express         = require('express');
var compression     = require('compression');
var app             = express();
var morgan          = require('morgan');
var logger          = morgan('combined');
var fs              = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
