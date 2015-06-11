/**
 * Testing data-type "money"
 */

module.exports = function(app) {
	describe('"money"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'money';
					tf = $('form#testForm');

					checkValid = function(){
						if(field.find('.error-overlay').length > 0)
							return !field.find('.error-overlay').is(':visible');
						else
							return true;
					};

				}, done);
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Field construction with default symbol", function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="money">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.children('.field-items').children('.first').is('.addon'), equal: true, because: "Checking for currency addon"},
						{val: field.children('.field-items').children('.addon').text(), equal: '$', because: "Checking contents of currency addon"}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Field construction with user-defined symbol", function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="money" data-currency-symbol="&pound;">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.children('.field-items').children('.first').is('.addon'), equal: true, because: "Checking for currency addon"},
						{val: field.children('.field-items').children('.addon').text(), equal: "£", because: "Checking contents of currency addon"}
					];
				}, function(err,ret){
					app.printError(err);
					app.batchExpect(ret.value);
					done();
				});
		});


	

		it("Filter support", function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="money">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
				}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys(app.testChars)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('1234567890.');
					done();
				});
		});

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="money">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
				}, null)
				.execute(function(testChars){
					ifw.inputField('set', testChars);
					return [
						{val: ifw.val(), equal: '1234567890.00', because: "Should be set and converted"},
						{val: ifw.inputField('get').toFixed(2), equal: ifw.val(), because: "Should be retrieved without any conversion"}
					];
				}, app.chars.digits, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		// Filter based. No vaidation checking. 
	});
};