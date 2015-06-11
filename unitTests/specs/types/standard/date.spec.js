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
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});

	it('can be created with a placeholder and a calendar addon', function(){
		var input = $('<input type="text" data-type="date"/>').wrap('<div/>').inputField();	

		expect(input.parent().siblings('.addon').length).toBe(1);
		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('MM/DD/YYYY');
		expect(input.parent().siblings('.addon').attr('class')).toBe('field-item addon clickable');
		expect(input.parent().siblings('.addon').children().length).toBe(1);
		expect(input.parent().siblings('.addon').children().attr('class')).toBe('calendar-icon');
	});

	it('has a calender addon that can be manipulated', function(done){
		var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();	
		var ifw = input.data('add123InputField');

		expect(ifw.get()).toBe('');

		$('span.addon').click();
		pause(triggerWaitTime)
		.then(function(){
			expect($('#ui-datepicker-div').length).toBe(1); // There should be one datepicker
			expect($('#ui-datepicker-div:visible').length).toBe(1); // The datepicker should be visible after a click 
 

			$('td[data-handler="selectDay"]').click(); // Choose a day
			return pause(500);
		})
		.then(function(){
			expect($('#ui-datepicker-div:visible').length).toBe(0); // The datepicker should not be visible after selecting a day 
			expect(ifw.get()).not.toBe(''); // Expect the value of the input field to be equal to the last date on the calender icon
			
			testContainer.empty();
			done();
		});
	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
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
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'02/02/2222', 
			'01/31/1234', 
			'12/31/9999',
		];

		invalids = [
			'2/02/2222', 
			'02/2/2222', 
			'02/02/22',
			'00/02/2222',
			'02/00/2222',
			'13/02/2222',
			'02/32/2222'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(type.validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	xdescribe('can be converted', function(){
		it('by changing the values when they are entered into the field', function(){
			// toField
			var input = $('<input type="text" data-type="date"/>').wrap('<div/>').inputField();
			var ifw;

			//var spy = spyOn(input, 'toField').and.callThrough(); 

			testContainer.empty();

			input.appendTo(window.testContainer).inputField();
			ifw = input.data('add123InputField');


			ifw.set('12/23/2000'); // Trying to test fromField

			expect(input.val()).toBe('12/23/2000'); // This is returning rwar which means it thinks the data is invalid
			expect(ifw.get()).toBe('2000-12-23'); // This is returning rwar which means it thinks the data is invalid
		});

		xit('by changing the values when they are taken from the field', function(){
			// fromField
		});
	});

}); // End of the first describe 