var fs = require('fs'),
    path = require('path'),
    hostname = require('os').hostname(),
    cfg = require('./config'),
    errorHandler = require('./util/error_handler'),
    logger = require('./util/graylogger'),
    routes = require('./routes'),
    express = require('express'),
    expressRouter = express.Router(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override');

var SDC = require('statsd-client');

var app = express();
var sdc = new SDC(cfg.statsd);
cfg.statsd['prefix'] += hostname;


var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
logger.info("Initiating process with pid: " + process.pid);

var port = process.env.PORT || cfg.port || 7001;

app.set('port', port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sdc.helpers.getExpressMiddleware());

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

expressRouter.get('/ping', routes.ping);
expressRouter.post('/echo', routes.echo);

app.use('/', expressRouter);

app.listen(app.get('port'), function(){
  logger.info("Listening ............... on ................... %d", app.get('port'));
  if (process.send) {
    logger.info("Send online notification for:  %s", process.pid);
    process.send('online');
  }
});

process.on('message', function(message) {
 if (message === 'shutdown') {
    logger.info("Got a shutdown message for %s", process.pid);
   process.exit(0);
 }
});
