/**
 * Testing caret plugin
 */

/*global describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
describe('A caret', function(){
	'use strict';

	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can check the length of the object', function(done){
		var input = $('<input type="text"/>').appendTo(testContainer);

		input.focus();
		pause(triggerWaitTime)
		.then(function(){
			// Since nothing has been typed the object should contain zero for begin and end 
			input.val('123'); // Enter text into input field 

			// Since three characters have been typed the values in the object are now equal to 3
			expect(input.caret()).toEqual({begin: 3, end: 3});

			// Remove all text from input field 
			input.val(''); 

			// When text is deleted, values go back to zero 
			expect(input.caret()).toEqual({begin: 0, end: 0});

			testContainer.empty();
			done();
		});
		
	});

	it('can get the selection range', function(done){
		var input = $('<input type="text"/>').appendTo(testContainer);

		input.focus();
		pause(triggerWaitTime)
		.then(function(){
			// Type something into the input field
			input.val('123456789'); 
			expect(input.caret()).toEqual({begin: 9, end: 9});

			// Testing the setter here 
			input[0].setSelectionRange(1, 1); 
			expect(input.caret()).toEqual({begin: 1, end: 1});

			testContainer.empty();
			done();
		});
	});


	it('can select and highlight sections of input', function(done){
		var input = $('<input type="text"/>').appendTo(testContainer);

		input.focus();
		pause(triggerWaitTime)
		.then(function(){
			// Type something into the input field
			input.val('123456789'); 

			// Testing the highlighting here 
			input[0].setSelectionRange(1, 4); 

			expect(input.caret()).toEqual({begin: 1, end: 4});

			testContainer.empty();
			done();
		});
	});

	it('can set caret position as a highlight', function(done){
		var input = $('<input type="text"/>').appendTo(testContainer);

		input.focus();
		pause(triggerWaitTime)
		.then(function(){
			// Type something into the input field
			input.val('123456789'); 

			// Testing the highlighting here 
			input.caret(1,4);

			expect(input.caret()).toEqual({begin: 1, end: 4});

			testContainer.empty();
			done();
		});
	});

	it('can set caret position', function(done){
		var input = $('<input type="text"/>').appendTo(testContainer);

		input.focus();
		pause(triggerWaitTime)
		.then(function(){
			// Type something into the input field
			input.val('123456789'); 

			// Testing the caret position here 
			input.caret(5,5);

			expect(input.caret()).toEqual({begin: 5, end: 5});

			testContainer.empty();
			done();
		});
	});

});