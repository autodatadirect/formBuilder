/**
 * Testing data-type "zip"
 */

module.exports = function(app) {
	describe('"zip"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'zip';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');

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
				.keys(app.chars.alpha)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('ABCDEFGHIJ');
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.alpha.toUpperCase())
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('ABCDEFGHIJ');
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.digits)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual(app.chars.digits);
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.symbols)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('- ');
					done();
				});
		});

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(testChars){
					ifw.inputField('set', testChars);
					return [
						{val: ifw.val(), equal: testChars, because: "Should be set without any conversion"},
						{val: ifw.inputField('get'), equal: ifw.val(), because: "Should be retrieved without any conversion"}
					];
				}, '12345-123A', function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Validation - initial flagging", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('1234') //not enough numbers, need 1 more
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeFalsy();
					done();
				});
		});


		it("Validation - restoring validity", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('1234')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('input')	//refocusing, now at invalid state
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('5')
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		});

		// Preform validity tests
		var correctInputs = ['12345','12345-1234','123451234'];
		var invalidInputs = ['12345-','1234','12345-123','12345--1234','1234-51234'];
		var i, makeIt = function(i, expected) {
			var val = expected? correctInputs[i] : invalidInputs[i];
			it('Validation - '+(expected?'correct':'invalid')+'Inputs - ' + val, function(done){
				app.tests.validate(val, expected, this.client)
				.then(done);
			});
		};
		for(i = 0; i < correctInputs.length; ++i)
			makeIt(i,true);
		for(i = 0; i < invalidInputs.length; ++i)
			makeIt(i,false);
	});

};