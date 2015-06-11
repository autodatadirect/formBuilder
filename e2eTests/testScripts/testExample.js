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