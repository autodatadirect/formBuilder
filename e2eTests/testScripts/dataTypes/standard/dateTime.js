/**
 * Testing data-type "dateTime"
 */

module.exports = function(app) {
	describe('"dateTime"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){

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
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
					return [
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.children('.field-items').children().eq(1).is('.addon'), equal: true, because: "Checking for addon"},
						{val: field.children('.field-items').children('.addon').children().eq(0).is('.calendar-icon'), equal: true, because: "Checking contents of addon"},
						{val: field.find('.field-item-input').children().length, equal: 2, because: 'Checking for input + placeholder'},
						{val: field.find('.field-item-input').children('.placeholder').text(), equal: 'MM/DD/YYYY HH:MM AM/PM', because: 'Checking contents of placeholder'}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Field construction With Military time", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
					return [
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.children('.field-items').children().eq(1).is('.addon'), equal: true, because: "Checking for addon"},
						{val: field.children('.field-items').children('.addon').children().eq(0).is('.calendar-icon'), equal: true, because: "Checking contents of addon"},
						{val: field.find('.field-item-input').children().length, equal: 2, because: 'Checking for input + placeholder'},
						{val: field.find('.field-item-input').children('.placeholder').text(), equal: 'MM/DD/YYYY HH:MM', because: 'Checking contents of placeholder'}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Filter support", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys(app.chars.alpha)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('AMP'); // Filter only allows the letters AMP in the field 
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.digits)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual(app.chars.digits); // Filter allows all digits 
				})
				.execute(function(){
					return ifw.val('');
				}, null)
				.keys(app.chars.symbols)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('/: '); // These are the only symbols the filter will allow 
					done();
				});
		});

		
		it("Filter support with military time", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys(app.chars.alpha)
				.execute(function(){
					return ifw.val();
				}, function(err,ret){
					expect(ret.value).toEqual('AMP');
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
					expect(ret.value).toEqual('/: ');
					done();
				});
		});

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
					ifw.inputField('set', '2000-09-23T05:32:14Z');
					return [
						{val: ifw.val(), equal: '09/23/2000 1:32 AM', because: "Should be set and converted"},
						{val: ifw.inputField('get'), equal: '2000-09-23T05:32:00Z', because: "Should be retrieved in a different format"}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Checking toField & fromField converters with military time", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
					ifw.inputField('set', '2000-09-23T05:32:14Z');
					return [
						{val: ifw.val(), equal: '09/23/2000 1:32', because: "Should be set and converted"},
						{val: ifw.inputField('get'), equal: '2000-09-23T05:32:00Z', because: "Should be retrieved in a different format"}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Validation - initial flagging", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('01/01/000')	//need one more digit and time
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeFalsy();
					done();
				});
		});

		it("Validation - initial flagging with military time", function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('01/01/2000 12:00 AM')	// Should not have the AM 
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
				.execute(function(){
						type = 'dateTime';
						tf = $('form#testForm');
						tf.append('<input type="text" data-type="'+type+'">');
						tf.formBuilder();
						field = tf.find('.input-field');
						ifw = field.find('input').inputField('instance');
					}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('01/01/222')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('input')	//refocusing, now at invalid state
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('0 1:00 PM')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		});

		it("Validation - restoring validity with military time", function(done){
			this.client
				.execute(function(){
						type = 'dateTime';
						tf = $('form#testForm');
						tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
						tf.formBuilder();
						field = tf.find('.input-field');
						ifw = field.find('input').inputField('instance');
					}, null)
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('01/01/222')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('input')	//refocusing, now at invalid state
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('0 1:00')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		});

		// Preform validity tests
		var correctInputs = ['12/12/2222 12:12 AM', '12/12/2222 12:12 PM'];
		var invalidInputs = ['12/12/2222', '12/12/2222 1:1 AM','12/12/2222 1:10 AA','12/12/2222 1:90 AM','12/12/2222 25:10 PM'];
		var i, makeIt = function(i, expected) {
			var val = expected? correctInputs[i] : invalidInputs[i];
			it('Validation - '+(expected?'correct':'invalid')+'Inputs - ' + val, function(done){
				this.client
					.execute(function(){
						type = 'dateTime';
						tf = $('form#testForm');
						tf.append('<input type="text" data-type="'+type+'">');
						tf.formBuilder();
						field = tf.find('.input-field');
						ifw = field.find('input').inputField('instance');
					}, null)
					.moveToObject('input')
					.leftClick()
					.keys(val)
					.moveToObject('div#outside') //unfocusing
					.leftClick()
					.execute(function(){
						if($('.error-overlay').length > 0)
							return !$('.error-overlay').is(':visible');
						else
							return true;
					}, function(err,ret){
						app.printError(err);
						expect(ret.value).toEqual(!!expected);
						done();
					});
			});
		};
		for(i = 0; i < correctInputs.length; ++i)
			makeIt(i,true);
		for(i = 0; i < invalidInputs.length; ++i)
			makeIt(i,false);

		var military_correctInputs = ['12/12/2222 12:12', '12/12/2222 23:12'];
		var military_invalidInputs = ['12/12/2222', '12/12/2222 1:1','12/12/2222 1:10 AM', '12/12/2222 1:10 PM','12/12/2222 1:90','12/12/2222 25:10'];
		var imilitary, military_makeIt = function(imilitary, expected) {
			var val = expected? military_correctInputs[i] : military_invalidInputs[i];
			it('Validation - '+(expected?'military correct':'military invalid')+'Inputs - ' + val, function(done){
				this.client
					.execute(function(){
						type = 'dateTime';
						tf = $('form#testForm');
						tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
						tf.formBuilder();
						field = tf.find('.input-field');
						ifw = field.find('input').inputField('instance');
					}, null)
					.moveToObject('input')
					.leftClick()
					.keys(val)
					.moveToObject('div#outside') //unfocusing
					.leftClick()
					.execute(function(){
						if($('.error-overlay').length > 0)
							return !$('.error-overlay').is(':visible');
						else
							return true;
					}, function(err,ret){
						app.printError(err);
						expect(ret.value).toEqual(!!expected);
						done();
					});
			});
		};
		for(i = 0; i < military_correctInputs.length; ++i)
			military_makeIt(i,true);
		for(i = 0; i < military_invalidInputs.length; ++i)
			military_makeIt(i,false);

		it('Datepicker widget', function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
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

		it('Datepicker widget with military time', function(done){
			this.client
				.execute(function(){
					type = 'dateTime';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-hours="true">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input').inputField('instance');
				}, null)
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