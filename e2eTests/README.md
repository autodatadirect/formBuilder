Unit Tests
==========

#Setup
Install global dependencies if not already installed
```console
npm install -g phantomjs
npm install -g jasmine
npm install -g grunt-cli
```

Install local dependencies using npm and bower. Run these in the root directory. If you do not have bower, run `npm install -g bower` first.
```console
npm install
bower install
```

Download selenium standalone jar [here](http://docs.seleniumhq.org/download/). Place it somewhere on your computer and update the path inside of `/Gruntfile.js`. Default:
```javascript
var seleniumJarPath = '~/selenium/selenium-server-standalone-*.jar';
```

Make sure you have java installed to run selenium.

#Running Existing Unit Tests
You must first turn on the selenium server.
```console
grunt selenStart
```

Then run the grunt command to preform any enable jasmine tests. Tests results may be seen in the console output.
```console
grunt jTest
```

All tests are located in `/tests/testScripts/`.

By default, the tests are run with the phantomjs headless browser. If you want to run them on a different browser, modify the `/tests/boot/index.js` client setup. You will need to have the browser installed and any selenium driver if required (like chrome's for example).
```javascript
app.clientSetup = {
        desiredCapabilities: {
            browserName: 'phantomjs'  /* Requires phantomjs  */
            // browserName: 'firefox' /* Requires firefox */
            // browserName: 'chrome' /* Requires chrome + chromedriver  */
            // browserName: 'opera' /* Requires opera */
            // browserName: 'safari' /* Requires safari */
        },
        logLevel:'silent'
    };
```

#Adding New Unit Tests
Our unit tests use the javascript selenium wrapper webdriver [(docs)](http://webdriver.io/) to run web clients and the assertion library Jasmine [(docs)](http://jasmine.github.io/).  See their documentation for specifics.

Since each test opens/closes a browser client, it may take a second or two for each one. It is recommended to only enable tests you want to test. To disable them, just change `describe` or `it` to `xdescribe` or `xit`.

Place your new tests in the `/tests/testScripts/` directory. Any added directories added to this folder will not automatically be run. To run them, add the folder to the list in `/tests/boot/index.js`. If you prepend your testscript file with an underscore, it will be added to the priority test list. When there are priorty tests found, all other test files will be ignored.
```javascript
// Run all the test scripts, passing app along
describe("jquery.formBuilder", function(){
    var root = './../testScripts';
    //root scripts
    app.requireFolder(root);

    //folder scripts
    describe('Standard Data Types', function(){
        app.requireFolder(root+'/dataTypes/standard');
    });

    describe('Other Data Types', function(){
        app.requireFolder(root+'/dataTypes');
    });

    describe ('Field Enhancements', function(){
        app.requireFolder(root+'/fieldEnhancements');
    });

    /**************** Add yours here ****************/

});
```


Basic Test Example:
```javascript
/**
 * Example unit test
 */

module.exports = function(app) {
    xdescribe('Example Unit Test Group (disabled)', function() {
        beforeEach(function(done){
            // Setup client
            this.client = app.webdriver.remote(app.clientSetup)
                .init()
                .url(app.urls.index) // app.urls.yourHtmlFile
                .execute(function(){
                    // any base setup client JS goes here
                    a = 20;
                }, done);
        });
        afterEach(function(){
            // close client
            this.client.end();
        });

        /* Your tests go below here */

        it("Example test", function(done){
            this.client
                .moveToObject('body') //moving the mouse
                .buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //basic click
                .execute(function(){ //run client JS and return a value
                    return [
                        {val: (1+1), equal: 2, because: "Checking basic math"},
                        {val: (a / 2), equal: 10, because: "Checking setup value"}
                    ];
                }, function(err,ret){
                    app.batchExpect(ret.value);
                    done(); //finish the test
                });
        });

        xit("Example pending test", function(done){
            this.client
                .execute(function(){
                    return [
                        {val: (1+1), equal: 2, because: "Checking basic math"},
                        {val: (a / 2), equal: 10, because: "Checking setup value"}
                    ];
                }, function(err,ret){
                    app.batchExpect(ret.value);
                    done();
                });
        });
    });
};
```
