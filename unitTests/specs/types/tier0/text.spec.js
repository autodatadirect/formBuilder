/**
 * Testing text data-type
 *
 * Regex type
 */
'use strict';
describe('The text data-type', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'text';
	var type = $.formBuilder.inputField.types[typeName];
	var util = $.formBuilder.util;

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});

	it('is the default data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});

	it('does not have filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var filter = input.data('formBuilderInputFilter');

		//I think that this doesn't work b/c text doesnt need a filter 
		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(filter).toBeUndefined();
	});

	it('can set and get its values', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');

		ifw.set('any text is allowed'); 

		expect(ifw.get()).toBe('any text is allowed');

		testContainer.empty();
	});
});