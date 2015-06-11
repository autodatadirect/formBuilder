/**
 * Testing data-type "utext"
 */

module.exports = function(app) {
	describe('"utext"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'utext';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
				}, done);
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Field construction", function(done){
			this.client
				.execute(function(){
					return [
						{val: field.children('.field-items').children().length, equal: 1, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Filter support", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys(app.testChars)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					// No chars should be filtered out
					expect(ret.value).toEqual(app.testChars.toUpperCase());
					done();
				});
		});

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(testChars){
					ifw.inputField('set', testChars);
					return [
						{val: ifw.val(), equal: testChars.toUpperCase(), because: "Should be set and converted"},
						{val: ifw.inputField('get'), equal: ifw.val(), because: "Should be retrieved without any conversion"}
					];
				}, app.testChars, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

	});
};