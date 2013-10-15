var graylog2 = require("graylog2");
var util = require('util');
var os = require("os");
var cfg = require("../config");

var logger = new graylog2.graylog(get_config());

exports.error_message = function(request, class_name, message, err){
  remote_ip_address = request.headers['X-Forwarded-For'];
  if (remote_ip_address === undefined) {
    remote_ip_address = request.connection.remoteAddress;
  }
  short_message = util.format('Class: %s  Message: %s', class_name, message);
  fields  = {
    Remote_ip_address : remote_ip_address,
    URI : request.url,
    User_agent : request.headers['user-agent'],
    Content_type : request.headers['Content-Type'],
    Referer : request.headers['Referer']
  };
  env = process.env.NODE_ENV;
  logger.error(short_message, err.stack, fields);
};


function get_config () {
  config = cfg.logger;
  config.hostname = os.hostname();

  return config;
}
