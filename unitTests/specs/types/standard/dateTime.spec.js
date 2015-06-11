/**
 * Testing dateTime data-type
 */

 describe('The dateTime data-type', function(){
	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can be created with a placeholder and a calendar addon', function(){
		var input = $('<input type="text" data-type="dateTime"/>').wrap('<div/>').inputField();	

		expect(input.parent().siblings('.addon').length).toBe(1);
		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('MM/DD/YYYY HH:MM AM/PM');
		expect(input.parent().siblings('.addon').attr('class')).toBe('field-item addon clickable');
		expect(input.parent().siblings('.addon').children().length).toBe(1);
		expect(input.parent().siblings('.addon').children().attr('class')).toBe('calendar-icon');
	});

	xit('has a calender addon that can be manipulated', function(done){
		var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();	
		var ifw = input.data('add123InputField');

		expect(ifw.get()).toBe('');

		$('span.addon').click();
		pause(triggerWaitTime)
		.then(function(){
			expect($('#ui-datepicker-div').length).toBe(1); // There should be one datepicker
			expect($('#ui-datepicker-div:visible').length).toBe(1); // The datepicker should be visible after a click 

			$('td[data-handler="selectDay"]').click(); // Choose a day
			pause(500); // Wait for fade out 
		})
		.then(function(){
			expect($('#ui-datepicker-div:visible').length).toBe(0); // The datepicker should not be visible after selecting a day 
			expect(ifw.get()).toBe([0]); // Expect the value of the input field to be equal to the last date on the calender icon
			testContainer.empty();
			done();
		});
	});
	
	describe('has filter support', function(){
		// Check validation here 
	}); 

	describe('can be converted', function(){
		xit('by changing the values when they are entered into the field', function(){
			// toField
		});

		xit('by changing the values when they are taken from the field', function(){
			// fromField
		});
	});

	xit('can select a date from the datepicker widget', function(){

	}); 
	

}); // End of the first describe 