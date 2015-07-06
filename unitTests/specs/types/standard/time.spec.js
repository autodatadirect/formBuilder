/**
 * Testing time data-type
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true, moment:true*/
'use strict';
describe('The time data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'time';

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance;

		expect($.add123.inputField.types[typeName]).toBeDefined();

		ifw.setType(typeName);
		
		// Should have these
		typeInstance = ifw.getType();
		expect(typeInstance.military).toBeDefined();
	});

	it('is created with a placeholder (regular by default)', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();	
		var ifw = input.data('add123InputField');

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('H:MMam/pm');
	});

	it('is created with a placeholder (military)', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();	
		var ifw = input.data('add123InputField');

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('HH:MM');
	});

	describe('has a timepicker', function(){
		it('that opens on focus', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var field = ifw.getField();

			expect(field.children().length).toBe(1);

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(field.children().length).toBe(2);
				expect(field.children().eq(1).is('.ui-timepicker-wrapper')).toBe(true);

				testContainer.empty();

				done();
			});	 
		});

		it('that has a twelve hour selection with am/pm', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var field = ifw.getField();

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(field.children('.ui-timepicker-wrapper').children().children().eq(0).text()).toBe('12:00am');

				testContainer.empty();

				done();
			});	 
		});

		it('that can have a twenty-four hour selection without am/pm', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"data-military="true"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var field = ifw.getField();

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(field.children('.ui-timepicker-wrapper').children().children().eq(47).text()).toBe('23:30');

				testContainer.empty();

				done();
			});	 
		});

		it('that can select a time', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var field = ifw.getField();
			var timepicker;

			expect(ifw.get()).toBe('');

			// Open the dropdown menu 
			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				timepicker = field.children('.ui-timepicker-wrapper');
				var time = timepicker.children().children().eq(3);
			
				time.mousedown();
				time.mouseup();
		
				expect(timepicker.is(':visible')).not.toBe(true);
			 	expect(ifw.get()).not.toBe('');
			 	expect(time.is('.ui-timepicker-selected')).toBe(true);

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
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('amp');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual('1234567'); // Allows a max of seven digits
		expect(typeNewString('890')).toEqual('890'); // Confirming it allows all digits
		expect(typeNewString(chars.symbols)).toEqual(':');
	});

	it('has filter support (military)', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual('12345'); // Allows a max of five digits
		expect(typeNewString('67890')).toEqual('67890'); // Confirming it allows all digits
		expect(typeNewString(chars.symbols)).toEqual(':');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'1:00pm',
			'11:00am',
			'3:30pm'
		];

		invalids = [
			'13:00am',
			'12:88am',
			'99:00am',
			'199:00am',
			':00am',
			'12:000am'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};


		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	describe('has simple regex validation (military)', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'1:00', 
			'11:00',
			'17:30',
			'23:49'
		];

		invalids = [
			'12:00am',
			'12:00pm',
			'99:00',
			'199:00',
			':00',
			'12:000'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	describe('can handle conversion', function(){
		it('using its toField', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');

			// With correct input 
			var result = ifw.getType().converter.toField.call(ifw.getType(), '17:34');

			expect(result).toBe('1:34pm'); // Returns moment which has been modified four hours 

			// With incorrect input 
			var result2 = ifw.getType().converter.toField.call(ifw.getType(), '222:44');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.toField.call(ifw.getType());

			expect(result3).toBe('');
		});

		it('using its toField (military)', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
			var ifw = input.data('add123InputField');

			// With correct input 
			var result = ifw.getType().converter.toField.call(ifw.getType(), '17:34');

			expect(result).toBe('13:34'); // Returns moment which has been modified four hours 

			// With incorrect input 
			var result2 = ifw.getType().converter.toField.call(ifw.getType(), '222:44');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.toField.call(ifw.getType());

			expect(result3).toBe('');
		});

		it('and fromField functions', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');

			//With correct input 
			var result = ifw.getType().converter.fromField.call(ifw.getType(), '12:34am', ifw);

			expect(result).toBe('04:34'); // Returns moment which has been modified four hours 

			//With incorrect input 
			var result2 = ifw.getType().converter.fromField.call(ifw.getType(), '2??34', ifw);

			expect(result2).toBe('');

			//With no input 
			var result3 = ifw.getType().converter.fromField.call(ifw.getType());

			expect(result3).toBe('');
		});

		it('and fromField functions (military)', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
			var ifw = input.data('add123InputField');

			//With correct input 
			var result = ifw.getType().converter.fromField.call(ifw.getType(), '12:34', ifw);

			expect(result).toBe('16:34'); // Returns moment which has been modified four hours 

			//With incorrect input 
			var result2 = ifw.getType().converter.fromField.call(ifw.getType(), '2??34', ifw);

			expect(result2).toBe('');

			var result3 = ifw.getType().converter.fromField.call(ifw.getType(), '12:34am', ifw);

			expect(result3).toBe(''); // Returns moment which has been modified four hours 

			//With no input 
			var result4 = ifw.getType().converter.fromField.call(ifw.getType());

			expect(result4).toBe('');
		});
	});


	it('can handle UTC vs local time when setting/getting', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var utcOffset = -240,
			utcTime;
		
		utcTime = '04:00';
		ifw.set(utcTime);
		// expect(input.val()).toBe('12:00am');
		expect(input.val()).toBe(moment.utc('2000-6-1T'+utcTime,'YYYY-M-DTHH:mm').utcOffset(utcOffset).format('h:mma'));
		expect(ifw.get()).toBe(utcTime);

		utcTime = '02:00';
		ifw.set(utcTime);
		// expect(input.val()).toBe('10:00pm');
		expect(input.val()).toBe(moment.utc('2000-6-1T'+utcTime,'YYYY-M-DTHH:mm').utcOffset(utcOffset).format('h:mma'));
		expect(ifw.get()).toBe(utcTime);

		utcTime = '22:00';
		ifw.set(utcTime);
		// expect(input.val()).toBe('6:00pm');
		expect(input.val()).toBe(moment.utc('2000-6-1T'+utcTime,'YYYY-M-DTHH:mm').utcOffset(utcOffset).format('h:mma'));
		expect(ifw.get()).toBe(utcTime);
	
	});


	it('can be set to store as local', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-store-utc="false"/>').inputField();
		var ifw = input.data('add123InputField');
		var localTime;
		
		localTime = '04:00';
		ifw.set(localTime);
		expect(input.val()).toBe(moment(localTime,'HH:mm').format('h:mma'));
		expect(ifw.get()).toBe(localTime);

		localTime = '02:00';
		ifw.set(localTime);
		expect(input.val()).toBe(moment(localTime,'HH:mm').format('h:mma'));
		expect(ifw.get()).toBe(localTime);

		localTime = '22:00';
		ifw.set(localTime);
		expect(input.val()).toBe(moment(localTime,'HH:mm').format('h:mma'));
		expect(ifw.get()).toBe(localTime);
	});

	it('can be torn down', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var typeInstance = ifw.getType();

		var spy_time = spyOn(ifw.element, 'timepicker').and.callThrough();

		typeInstance.tearDown(ifw);
		expect(spy_time).toHaveBeenCalled();
		expect(spy_time ).toHaveBeenCalledWith('remove');
	});

});