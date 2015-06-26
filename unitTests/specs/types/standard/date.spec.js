/**
 * Testing date data-type
 */

describe('The date data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'date';
	var type = $.add123.inputField.types[typeName];

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').inputField();
		var ifw = input.data('add123InputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
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

			expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
			expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);

				testContainer.empty();

				done();
			});	 
		});

		it('that can select a date', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);

				var day = testContainer.siblings().eq(26).children().eq(0).children().eq(0).children().eq(1).children().eq(1).children().eq(2);

				day.click(); 
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);
				expect(ifw.get()).not.toBe('');

				testContainer.empty();

				done();
			});		
		}); 

		it('and can be torn down', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);

				ifw.getType().tearDown(ifw);

				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);

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
			for(var i = 0; i < str.length; ++i)
				filter._type(str[i]);
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('/');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'02/02/2222', 
			'01/31/1234', 
			'12/31/9999',
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
			return (typeof(type.validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);

		testContainer.empty();
	});

	describe('can handle conversion', function(){
		it('using its toField', function(){
			var input = $('<input type="text" data-type="date"/>').inputField();
			var ifw = input.data('add123InputField');

			var spy_to = spyOn(ifw.getType().converter, 'toField').and.callThrough();

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
			var input = $('<input type="text" data-type="date"/>').inputField();
			var ifw = input.data('add123InputField');

			var spy_from = spyOn(ifw.getType().converter, 'fromField').and.callThrough();

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

}); // End of the first describe 