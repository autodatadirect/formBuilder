// Karma configuration


'use strict';

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './../',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			// Loaded files
			{pattern:'node_modules/karma/static/favicon.ico',watched:false,included:false,served:true},
			{pattern:'build/fonts/**',watched:false,included:false,served:true},
			{pattern:'build/img/**',watched:false,included:false,served:true},

			// Dynamically added CSS
			{pattern:'bower_components/Aristo-jQuery-UI-Theme/css/Aristo/Aristo.css',watched:false,included:false,served:true},
			{pattern:'bower_components/normalize.css/normalize.css',watched:false,included:false,served:true},
			{pattern:'build/css/formBuilder.css',watched:false,included:false,served:true},
			{pattern:'bower_components/jquery-timepicker-jt/jquery.timepicker.css',watched:false,included:false,served:true},
			{pattern:'bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css',watched:false,included:false,served:true},
			
			'bower_components/jquery/dist/jquery.min.js',
			'unitTests/karmaSetup.js',

			// Executed Javascript
			'bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
			'bower_components/moment/min/moment.min.js',
			'bower_components/spinjs/spin.min.js',
			'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
			'bower_components/jquery-timepicker-jt/jquery.timepicker.min.js',
			'build/formBuilder.min.js',
			'unitTests/formBuilderTesting.js',

			// Executed tests
			'unitTests/specs/**/*.spec.js'
		],

		proxies: {
			'/favicon.ico': '/base/node_modules/karma/static/favicon.ico'
		},


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [
			'progress'
			// 'spec',
			// 'html'
		],

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			// 'Chrome'
			// 'Firefox' 
			'PhantomJS'
		],

		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};
