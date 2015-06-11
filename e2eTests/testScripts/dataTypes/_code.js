/**
 * Testing code autocomplete
 *
 * This is based on the jquery ui autocomplete. It is enough to test to see if the autocomplete options are valid.
 */

module.exports = function(app) {
	describe('Code autocomplete', function() {

		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'code';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'" data-codes="testCodes">');

					testCodes = [ 
							{"value":"submitted to form", "label":"Searched Item"},
							{"value":"true", "label":"Some Yes"},
							{"value":"false", "label":"No"},
							{"value":"5", "label":"option 1"},
							{"value":"2", "label":"option 2"},
							{"value":"3", "label":"option 3"},
							{"value":"4", "label":"option 4"},
							{"value":"5", "label":"option 5"},
							{"value":"100",  "label":"Some label"},
							{"value":"AAA",  "label":"123 Some St."},
							{"value":"BBB",  "label":"Some Business Name Inc."},
							{"value":"Hodor",  "label":"Bran"}
					];

					tf.formBuilder();
					
					field = tf.find('.input-field-group').children('.input-field'); //outer field
					ifw = field.find('input');
					acw = $('.ui-autocomplete-input');	// autocomplete widget

					checkValid = function(){
						if(field.find('.error-overlay').length > 0)
							return !field.find('.error-overlay').is(':visible');
						else
							return true;
					};

				}, function(err){
					app.printError(err);
					done();
				});
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Field construction", function(done){
			this.client
				.execute(function(){
					return [
						// Basic input
						{val: field.children('.field-items').children().length, equal: 1, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						
						// Button creation
						{val: field.find('.field-items').children().eq(0).children().length, equal: 2, because: 'Checking number of field-items for regular input'},
						{val: field.find('.field-items').children().eq(0).children().eq(0).is('input'), equal: true, because: 'The first regular field item should be the input field'},
						{val: field.find('.field-items').children().eq(0).children().eq(1).is('span[role="status"]'), equal: true, because: 'The second regular field item should be the status'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});
	

		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(testChars){
					ifw.inputField('set', testChars);
					return [
						{val: ifw.val(), equal: 'AAA', because: "Should be set and converted"},
						{val: ifw.inputField('get'), equal: ifw.val(), because: "Should be retrieved without any conversion"}
					];
				}, 'AAA', function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Checking for jquery ui autocomplete", function(done){
			this.client
				.execute(function(){
					return [
						{val: $('.ui-autocomplete').length, equal: 1, because: 'Checking for the jquery ui autocomplete dropdown'},
						{val: $('.ui-autocomplete').is(':visible'), equal: false, because: 'Dropdown should not be visible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
				})
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('Some')
				.pause(1000) //wait for dropdown
				.execute(function(){
					return [
						{val: $('.ui-autocomplete').is(':visible'), equal: true, because: 'Dropdown should now be visible'},
						{val: $('.ui-autocomplete').find('.ui-menu-item .ui-corner-all').length, equal: 3, because: 'Checking dropdown matches'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Checking dropdown selection", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('Some')
				.pause(1000) //wait for dropdown
				.moveToObject('li.ui-menu-item')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return [
						{val: $('.ui-autocomplete').is(':visible'), equal: false, because: 'Dropdown should now be hidden'},
						{val: ifw.inputField('get'), equal: '100', because: "Checking new set option value"},
						{val: checkValid(), equal: true, because: 'Input should be valid'}
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});
		
		it("Validation - initial flagging", function(done){
			this.client
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('AA')
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
				.keys('AA')
				.moveToObject('div#outside') //unfocusing
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('input')	//refocusing, now at invalid state
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('A')
				.execute(function(){
					return checkValid();
				}, function(err,ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		});

		// Preform validity tests
		var correctInputs = ['submitted to form', 'true', 'false', '1','2', '3', '4', '5', '100','AAA', 'BBB','Hodor'];
		var invalidInputs = ['Bran', 'rasdas', 'asdd'];
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

	
