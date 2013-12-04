var env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
var fileToLoad = './configuration/'+env+'.json';
var cfg = require(fileToLoad);
console.log("Loading env from: %s", fileToLoad);
module.exports = cfg;
