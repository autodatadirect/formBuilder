/**
 * Testing data-type "date"
 */

module.exports = function(app) {
	describe('"date"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'date';
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
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.children('.field-items').children().eq(1).is('.addon'), equal: true, because: "Checking for addon"},
						{val: field.children('.field-items').children('.addon').children().eq(0).is('.calendar-icon'), equal: true, because: "Checking contents of addon"},
						{val: field.find('.field-item-input').children().length, equal: 2, because: 'Checking for input + placeholder'},
						{val: field.find('.field-item-input').children('.placeholder').text(), equal: 'MM/DD/YYYY', because: 'Checking contents of placeholder'}
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
					expect(ret.value).toEqual(app.chars.digits);
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.symbols)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('/');
					done();
				});
		});

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(testChars){
					ifw.inputField('set', testChars);
					return [
						{val: ifw.val(), equal: '12/23/2000', because: "Should be set and converted"},
						{val: ifw.inputField('get'), equal: '2000-12-23', because: "Should be retrieved in a different format"}
					];
				}, '2000-12-23', function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Validation - initial flagging", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('01/01/000')	//need one more digit
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
				.keys('01/01/000')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('input')	//refocusing, now at invalid state
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('0')
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		});

		// Preform validity tests
		var correctInputs = ['02/02/2222', '01/31/1234', '12/31/9999', app.moment().format('MM/DD/YYYY')];
		var invalidInputs = ['2/02/2222', '02/2/2222', '02/02/22','00/02/2222','02/00/2222','13/02/2222','02/32/2222'];
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


		it('Datepicker widget', function(done){
			this.client
				.moveToObject('span.addon')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return [
						{val: $('#ui-datepicker-div').length, equal: 1, because: "Datepicker should exist"},
						{val: $('#ui-datepicker-div').is(':visible'), equal: true, because: "Datepicker should be visible"}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
				})
				.moveToObject('td[data-handler="selectDay"]') //choose a day
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.pause(500) //wait for fade out
				.execute(function(){
					return [
						[{val: $('#ui-datepicker-div').is(':visible'), equal: false, because: "Datepicker should not be visible"}], 
						ifw.inputField('get')
					];
				}, function(err,ret){
					app.batchExpect(ret.value[0]);
					expect(app.moment(ret.value[1]).isValid()).toBeTruthy(); //should be a valid date
					done();
				});
		});
	});
};