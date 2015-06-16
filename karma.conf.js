// Karma configuration
// Generated on Tue Jun 16 2015 11:20:54 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        {pattern:'./node_modules/karma/static/favicon.ico',watched:false,included:false,serverd:true},
        // './bower_components/normalize.css/normalize.css',
        './bower_components/jquery/dist/jquery.min.js',
        // './bower_components/jquery/dist/jquery.min.map',
        './bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
        './bower_components/moment/min/moment.min.js',
        // './bower_components/jasmine/lib/jasmine-core/jasmine.css',
        // './bower_components/jasmine/lib/jasmine-core/jasmine.js',
        // './bower_components/jasmine/lib/jasmine-core/jasmine-html.js',
        // './bower_components/jasmine/lib/jasmine-core/boot.js',
        // './bower_components/requirejs/require.js',
        './bower_components/spinjs/spin.min.js',
        './build/jquery.formBuilder.min.js',
        
        './unitTests/testRunner.html',

        './unitTests/formBuilderTesting.js',
        './unitTests/specs/**/*.spec.js',
        // {pattern:'./unitTests/testRunner.html',watched:false,included:false,serverd:true}
       
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
        '**/*.html':[]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
        'Chrome', 
        // 'Firefox', 
        // 'PhantomJS'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
