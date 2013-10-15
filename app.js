var fs = require('fs'),
    path = require('path'),
    numCPUs = require('os').cpus().length,
    hostname = require('os').hostname();
var cfg = require('./config');
var error_handler = require('./util/error_handler');
var express = require('express');
var routes = require('./routes');
var app = express();
var SDC = require('statsd-client');
    cfg.statsd['prefix'] += hostname;
var sdc = new SDC(cfg.statsd);

var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
console.log("Initiating process with pid: " + process.pid);

var port = process.env.PORT || cfg.port || 7001;

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(sdc.helpers.getExpressMiddleware());
  app.use(error_handler.handle_error);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/v1/ping', routes.ping);


app.listen(port, function(){
  console.log("Listening ............... on ................... %d", port);
  if (process.send) {
    console.log("Send online notification for:  %s", process.pid);
    process.send('online');
  }
});

process.on('message', function(message) {
 if (message === 'shutdown') {
    console.log("Got a shutdown message for %s", process.pid);
   process.exit(0);
 }
});
