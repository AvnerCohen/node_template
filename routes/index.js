var _ = require("lodash");
var cfg = require('../config');
var graylogger = require('../util/graylogger.js');
var util = require("util");


exports.ping = function(req, res) {
  res.send("pong");
};
