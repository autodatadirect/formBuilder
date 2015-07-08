/**
 * Testing date data-type
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('The date data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'date';

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance;

		expect($.add123.inputField.types[typeName]).toBeDefined();

		ifw.setType(typeName);
		
		// Should have these
		typeInstance = ifw.getType();
		expect(typeInstance.startDate).toBeDefined();
		expect(typeInstance.endDate).toBeDefined();
	});

	it('is created with a placeholder', function(){
		var input = $('<input type="text" data-type="date"/>').inputField();	

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('MM/DD/YYYY');
	});

	describe('has a datepicker', function(){
		it('that opens on focus', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var datepicker;

			datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
			expect(datepicker.length).toBe(0);
			expect(datepicker.is(':visible')).toBe(false);

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);

				testContainer.empty();

				done();
			});	 
		});

		it('that can select a date', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var datepicker;

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);

				var day = datepicker.children().eq(0).children().eq(0).children().eq(1).children().eq(1).children().eq(2);

				day.click(); 
				return pause(triggerWaitTime);
			})
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(0);
				expect(ifw.get()).not.toBe('');

				testContainer.empty();

				done();
			});		
		}); 

		it('and can be torn down', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var datepicker;

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);

				ifw.getType().tearDown(ifw);

				return pause(triggerWaitTime);
			})
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(0);

				testContainer.empty();

				done(); 
			});
		});
	});
	

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i){
				filter._type(str[i]);
			}

			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('/');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'02/02/2222', 
			'01/31/1234', 
			'12/31/9999'
		];

		invalids = [
			'00/02/2222',
			'13/02/2222',
			'02/32/2222',
			'0222/33/222222',
			'55555555555555' // too many characters, max allowed is ten
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	it('can enforce the startDate', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-minyear="2000" data-enforce-min="true"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance = ifw.getType();

		// Valid
		input.val('02/02/2000');
		expect(typeInstance.validate(ifw)).toBeUndefined();
		input.val('02/02/2001');
		expect(typeInstance.validate(ifw)).toBeUndefined();

		// Invalid
		input.val('02/02/1999');
		expect(typeInstance.validate(ifw)).toBeDefined();
	});

	it('can enforce the endDate', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-maxyear="2017" data-enforce-max="true"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance = ifw.getType();

		// Valid
		input.val('02/02/2016');
		expect(typeInstance.validate(ifw)).toBeUndefined();
		input.val('02/02/2017');
		expect(typeInstance.validate(ifw)).toBeUndefined();

		// Invalid
		input.val('02/02/2018');
		expect(typeInstance.validate(ifw)).toBeDefined();
	});

	describe('can handle conversion', function(){
		it('using its toField', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');

			// With correct input 
			var result = ifw.getType().converter.toField('1988-07-23');

			expect(result).toBe('07/23/1988');

			// With incorrect input 
			var result2 = ifw.getType().converter.toField('18-07-23');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.toField();

			expect(result3).toBe('');
		});

		it('and fromField functions', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');

			// With correct input 
			var result = ifw.getType().converter.fromField('07/23/1988');

			expect(result).toBe('1988-07-23');

			// With incorrect input 
			var result2 = ifw.getType().converter.fromField('07/23/88');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.fromField();

			expect(result3).toBe('');
		});
	});

	it('stores as local date, rather than utc date', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-store-utc="false"/>').inputField();
		var ifw = input.data('add123InputField');

		ifw.set('2015-06-14');
		expect(ifw.get()).toBe('2015-06-14');
		expect(input.val()).toBe('06/14/2015');
	});

	it('can be torn down', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance = ifw.getType();

		spyOn(ifw.element, 'datepicker').and.callThrough();

		typeInstance.tearDown(ifw);
		expect(ifw.element.datepicker).toHaveBeenCalled();
		expect(ifw.element.datepicker).toHaveBeenCalledWith('remove');
	});

});