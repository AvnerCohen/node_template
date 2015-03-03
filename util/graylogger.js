var winston = require('winston');
var WinstonGraylog2 = require('winston-graylog2');
var cfg = require('../config');

var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

var grayLogOptions = {
  name: 'GraylogDeNode',
  level: 'error',
  silent: false,
  handleExceptions: false,
  graylog: {
    servers: [{host: cfg.logger.servers[0]['host'], port: cfg.logger.servers[0]['port']}],
    hostname: 'myServer',
    facility: cfg.logger.facility,
    bufferSize: 1400
  }
};

var logger = new(winston.Logger)({
  transports: [
              new (winston.transports.Console)({timestamp: true, level: cfg.logger.log_level }),
              new(WinstonGraylog2)(grayLogOptions)
              ]
      });

module.exports = logger;