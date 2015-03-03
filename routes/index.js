var _ = require("lodash");
var cfg = require('../config');
var graylogger = require('../util/graylogger.js');
var util = require("util");

exports.ping = function(req, res) {
  res.send("pong");
};

//Test echo for posting
exports.echo = function(req, res) {
  var return_data = req.body.moshe;
      res.send(return_data);
};
