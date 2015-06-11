/**
 * Set up tests
 *
 * See http://code.tutsplus.com/tutorials/headless-functional-testing-with-selenium-and-phantomjs--net-30545
 *
 * To switch between different globally installed browsers, toggle the browserName
 */

var selenium = require('selenium-standalone');
var webdriverio = require('webdriverjs');
var fs = require('fs');
var path = require('path');
var Q = require('q');
var moment = require('moment');

module.exports = function(){
	var app = {};
	app.testScriptDir = './../testScripts'; 
	app.Q = Q;
	app.webdriver = webdriverio;
	app.fs = fs;
	app.path = path;
	app.selenium = selenium;
	
	app.moment = moment;
	app.clientSetup = {
		desiredCapabilities: {
			browserName: 'phantomjs'  /* Requires phantomjs (npm install -g phantomjs) */
			// browserName: 'firefox' /* Requires firefox */
			// browserName: 'chrome' /* Requires chrome + driver */
			// browserName: 'opera'	/* Requires opera */
			// browserName: 'safari' /* Requires safari */
		},
		logLevel:'silent'
	};

	// Define helpers
	app.batchExpect = function(returnValue, verbose) {
		if(verbose === true){
			console.log('\nBATCH EXPECT VALUES:');
			console.log(returnValue);
		}
		for(var i = 0; i < returnValue.length; ++i) {
			if(returnValue[i].equal === null) {
				switch(returnValue[i].funct){
					case 'ok':

						break;
				}
			} else {
				expect(returnValue[i].val).toEqual(returnValue[i].equal);
			}
		}
	};
	app.printError = function(err) {
		if(err)
			console.log('CLIENT ERROR: ' + JSON.parse(err.orgStatusMessage.split('Build info')[0]).errorMessage);
	};

	// Common characters to test
	app.chars = {
		alpha: 'abcdefghijklmnopqrstuvwxyz',
		digits: '1234567890',
		symbols: "!@#$%^&*()_-=+,<.>/?;:'\"[{]}\\|`~ ",
	};
	app.testChars = app.chars.alpha + app.chars.alpha.toUpperCase() + app.chars.digits + app.chars.symbols;

	// Load common tests
	require('./commonTests')(app);

	// Load constants
	require('./seleniumConstants')(app);


	// Test script loader
	app.requireFolder = function(dir) {
		if(!dir)
			dir = '';
		var dirPath = app.path.join(__dirname, app.testScriptDir + dir);
		app.fs.readdirSync(dirPath).forEach(function(file) {
			if(app.fs.lstatSync(dirPath+'/'+file).isFile() && file[0] != '_') {
				require(dirPath +'/'+ file)(app);
				console.log('LOADED TESTSCRIPT "'+file+'"');
			}
		});
	};

	// Priority test script loader
	app.priortyTests = 0;
	app.requirePriority = function(dir) {
		if(!dir)
			dir = '';
		var stat, dirPath = app.path.join(__dirname, app.testScriptDir + dir);
		app.fs.readdirSync(dirPath).forEach(function(file) {
			stat = app.fs.lstatSync(dirPath+'/'+file);
			if(stat.isFile() && file[0] == '_') {
				++app.priortyTests;
				require(dirPath +'/'+ file)(app);
				console.log('LOADED PRIORITY TESTSCRIPT "'+dir+'/'+file+'"');
			} else if(stat.isDirectory()) {
				app.requirePriority(dir+'/'+file);
			}
		});
	};

	// Grab all html urls (even those not compiled from jade)
	app.urls = {};
	var dirPath = app.path.resolve(app.path.join(__dirname, './../html'));
	app.fs.readdirSync(dirPath).forEach(function(file) {
		app.urls[file.split('.html')[0]] = 'file://' + dirPath + '/' + file;
		console.log('LOADED URL "'+app.urls[file.split('.html')[0]]+'"');
	});

	describe("jquery.formBuilder", function(){
		beforeAll(function(done){
			// Turn on selenium server
			app.selenium.start({}, function(err, child){
				app.selenChild = child;
				done();
			});
		});
		afterAll(function(){
			// Turn off selenium server
			app.selenChild.kill();
		});

		// Run all priorty tests
		describe('Prioriy Tests', function(){
			app.requirePriority();
		});
		
		if(app.priortyTests === 0) {
			//Root scripts
			describe('Root Tests', function(){
				app.requireFolder();
			});

			//folder scripts
			describe('Standard Data Types', function(){
				app.requireFolder('/dataTypes/standard');
			});

			describe('ADD Data Types', function(){
				app.requireFolder('/dataTypes/AutoDataDirect');
			});

			describe('Other Data Types', function(){
				app.requireFolder('/dataTypes');
			});

			describe('Field Enhancements', function(){
				app.requireFolder('/fieldEnhancements');
			});

			/* Add new test directories here */
		}
	});	
	
};

