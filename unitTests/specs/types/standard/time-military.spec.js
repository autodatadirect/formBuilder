/**
 * Testing military time data-type
 */

describe('The military time data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'time';
	var type = $.add123.inputField.types[typeName];

	it('is created with a placeholder', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();	
		var ifw = input.data('add123InputField');

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('HH:MM');
	});

	describe('has a timepicker', function(){
		it('that has a twenty-four hour selection without am/pm', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"data-military="true"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			input.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(input.parent().children().eq(2).children().children().eq(47).text()).toBe('23:30');

				testContainer.empty();

				done();
			});	 
		});
	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
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
		expect(typeNewString(chars.digits)).toEqual('12345'); // Allows a max of five digits
		expect(typeNewString('67890')).toEqual('67890'); // Confirming it allows all digits
		expect(typeNewString(chars.symbols)).toEqual(':');
	});

	describe('has simple regex validation', function(){
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
			'12:000',
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(type.validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	describe('can handle conversion', function(){
		it('using its toField', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
			var ifw = input.data('add123InputField');

			var spy_to = spyOn(ifw.getType().converter, 'toField').and.callThrough();

			// With correct input 
			var result = ifw.getType().converter.toField('09:34');

			expect(result).toBe('5:34'); // Returns moment which has been modified four hours 

			// With incorrect input 
			var result2 = ifw.getType().converter.toField('222:44');

			expect(result2).toBe('');

			// With no input 
			var result3 = ifw.getType().converter.toField();

			expect(result3).toBe('');
		});

		it('and fromField functions', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-military="true"/>').inputField();
			var ifw = input.data('add123InputField');

			var spy_from = spyOn(ifw.getType().converter, 'fromField').and.callThrough();

			//With correct input 
			var result = ifw.getType().converter.fromField('12:34', ifw);

			expect(result).toBe('16:34'); // Returns moment which has been modified four hours 

			//With incorrect input 
			var result2 = ifw.getType().converter.fromField('2??34', ifw);

			expect(result2).toBe('');

			var result3 = ifw.getType().converter.fromField('12:34am', ifw);

			expect(result3).toBe(''); // Returns moment which has been modified four hours 

			//With no input 
			var result4 = ifw.getType().converter.fromField();

			expect(result4).toBe('');
		});
	});
});