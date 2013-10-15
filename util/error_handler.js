var graylogger = require('./graylogger.js');

exports.handle_error = function(err, req, res, next) {
  graylogger.error_message(req, "General Error Handler", "Non-search related error occured in node js", err);
  res.send(500, err.stack);
};
