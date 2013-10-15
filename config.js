var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
var file_to_load = './configuration/'+env+'.json';
var cfg = require(file_to_load);
console.log("Loading env from:", file_to_load);
module.exports = cfg;
