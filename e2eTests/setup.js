/**
 * For the initial setup of selenium and browser drivers
 */

var selenium = require('selenium-standalone');

selenium.install({
  // check for more recent versions of selenium here: 
  // http://selenium-release.storage.googleapis.com/index.html 
  version: '2.45.0',
  baseURL: 'http://selenium-release.storage.googleapis.com',
  drivers: {
    chrome: {
      // check for more recent versions of chrome driver here: 
      // http://chromedriver.storage.googleapis.com/index.html 
      version: '2.15',
      arch: process.arch,
      baseURL: 'http://chromedriver.storage.googleapis.com'
    },
    ie: {
      // check for more recent versions of internet explorer driver here: 
      // http://selenium-release.storage.googleapis.com/index.html 
      version: '2.45',
      arch: process.arch,
      baseURL: 'http://selenium-release.storage.googleapis.com'
    }
  },
  logger: function(message) {
 	console.log(message);
  },
  progressCb: function(totalLength, progressLength, chunkLength) {
 
  }
}, null);