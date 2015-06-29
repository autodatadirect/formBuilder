/**
 * Testing caret plugin
 */

/*global describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
describe('A caret', function(){
	'use strict';

	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can check the length of the object', function(){
		var input = $('<input type="text"/>');
		var spy = spyOn(input, 'caret').and.callThrough();
		var compareTo = input.caret(); 
		var result = { begin: 0, end: 0};
		var result2 = { begin: 3, end: 3};

		var answer = util.equals(compareTo, result);

		expect(answer).toBeTruthy(); // Since nothing has been typed the object should contain zero for begin and end 

		testContainer.empty();
		input.appendTo(testContainer);

		input.val('123'); // Enter text into input field 

		var compareTo2 = input.caret(); 
		var answer2 = util.equals(compareTo2, result2);

		expect(answer2).toBeTruthy(); // Since three characters have been typed the values in the object are now equal to 3

		input.val(''); // Remove all text from input field 

		var compareTo3 = input.caret(); 
		var answer3 = util.equals(compareTo3, result);

		expect(answer3).toBeTruthy(); // When text is deleted, values go back to zero 

		testContainer.empty();
	});

	it('can set and get the selection range', function(){
		var input = $('<input type="text"/>');
		var result = { begin: 9, end: 9};
		var result2 = { begin: 1, end: 1};
		var result3 = { begin: 1, end: 4};

		var spy = spyOn(input, 'caret').and.callThrough();
			
		// Type something into the input field
		input.appendTo(testContainer);
		input.focus();
		input.val('123456789'); 

		var compareTo = input.caret();
		var answer = util.equals(compareTo, result);

		expect(answer).toBeTruthy(); 

		input[0].setSelectionRange(1, 1); // Testing the setter here 

		var compareTo2 = input.caret(); // Testing the getter here 
		var answer2 = util.equals(compareTo2, result2);

		expect(answer2).toBeTruthy(); 

		input[0].setSelectionRange(1, 4); // Testing the highlighting here 

		var compareTo3 = input.caret(); // Testing the getter here 
		var answer3 = util.equals(compareTo3, result3);

		expect(answer3).toBeTruthy(); 

		testContainer.empty();
	});


	it('can select and highlight sections of input', function(){
		var input = $('<input type="text"/>');
		var result = { begin: 1, end: 4};

		var spy = spyOn(input, 'caret').and.callThrough();
			
		// Type something into the input field
		input.appendTo(testContainer);
		input.focus();
		input.val('123456789'); 

		input[0].setSelectionRange(1, 4); // Testing the highlighting here 

		var compareTo = input.caret(); // Testing the getter here 
		var answer = util.equals(compareTo, result);

		expect(answer).toBeTruthy(); 

		testContainer.empty();
	});
}); // End of the first describe