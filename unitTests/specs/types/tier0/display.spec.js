/**
 * Testing display data-type
 *
 * Regex type
 */

/*global describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
describe('The display data-type', function(){
	'use strict';
	
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'display';
	var type = $.formBuilder.inputField.types[typeName];

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});
}); // There is no input or filter for the display type 