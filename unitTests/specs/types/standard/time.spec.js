/**
 * Testing time data-type
 */

describe('The time data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'time';
	var type = $.add123.inputField.types[typeName];

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);

		testContainer.empty();
	});

	it('is created with a placeholder', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();	

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('H:MMam/pm');

		testContainer.empty();
	});

	describe('has a timepicker', function(){
		it('that opens on focus', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			expect(input.parent().children().length).toBe(2);

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(input.parent().children().length).toBe(3);
				expect(input.parent().children().eq(2).is('.ui-timepicker-wrapper')).toBe(true);

				testContainer.empty();

				done();
			});	 
		});

		it('that can select a time', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			expect(ifw.get()).toBe('');

			// Open the dropdown menu 
			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(input.parent().children().length).toBe(3);
				expect(input.parent().children().eq(2).is('.ui-timepicker-wrapper')).toBe(true);

				var time = input.parent().children().eq(2).children().children().eq(3);
			
				time.mousedown();
				time.mouseup();
		
				expect(input.parent().children().eq(2).is(':visible')).not.toBe(true);
			 	expect(ifw.get()).not.toBe('');
			 	expect(time.is('.ui-timepicker-selected')).toBe(true);

			 	testContainer.empty();
				done();
			});

			it('and can be torn down', function(done){
				var input = $('<input type="text" data-type="time"/>').appendTo(testContainer).inputField();
				var ifw = input.data('add123InputField');

				expect(ifw.get()).toBe('');

				input.focus();
				pause(triggerWaitTime)
				.then(function(){
					expect(input.parent().children().length).toBe(3);
					expect(input.parent().children().eq(2).is('.ui-timepicker-wrapper')).toBe(true);

					ifw.getType().tearDown(ifw);

					return pause(triggerWaitTime);
				})
				.then(function(){
					expect(input.parent().children().eq(2).is(':visible')).not.toBe(true);

					done(); 
				});
			});
		});

	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i)
				filter._type(str[i]);
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('amp');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual('1234567'); // Allows a max of seven digits
		expect(typeNewString('890')).toEqual('890'); // Confirming it allows all digits
		expect(typeNewString(chars.symbols)).toEqual(':');

		testContainer.empty();
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
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
			'12:000am',
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(type.validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);

		testContainer.empty();
	});

	describe('can handle conversion', function(){
		it('using its toField', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			var spy_to = spyOn(ifw.getType().converter, 'toField').and.callThrough();

			// With correct input 
			var result = ifw.getType().converter.toField('09:34');

			expect(result).toBe('5:34am'); // Returns moment which has been modified four hours 

			// With incorrect input 
			var result2 = ifw.getType().converter.toField('222:44');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.toField();

			expect(result3).toBe('');

			testContainer.empty();
		});

		it('and fromField functions', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			var spy_from = spyOn(ifw.getType().converter, 'fromField').and.callThrough();

			//With correct input 
			var result = ifw.getType().converter.fromField('12:34am');

			expect(result).toBe('04:34'); // Returns moment which has been modified four hours 

			//With incorrect input 
			var result2 = ifw.getType().converter.fromField('2??34');

			expect(result2).toBe('');

			//With no input 
			var result3 = ifw.getType().converter.fromField();

			expect(result3).toBe('');

			testContainer.empty();
		});
	});
});