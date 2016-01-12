/**
 * Testing zip data-type
 *
 * Regex type
 */
'use strict';
describe('The zip data-type', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'zip';
	var type = $.formBuilder.inputField.types[typeName];
	var util = $.formBuilder.util;

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var filter = input.data('formBuilderInputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('ABCDEFGHIJ');
		expect(typeNewString(chars.ALPHAS)).toEqual('ABCDEFGHIJ');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('- ');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var valids, invalids;

		valids = [
			'12345',
			'12345-1234',
			'123451234'
		];

		invalids = [
			'12345-',
			'1234',
			'12345-123',
			'12345--1234',
			'1234-51234'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(type.validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	it('can set and get its values', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');

		ifw.set('12345-1234'); 

		expect(ifw.get()).toBe('12345-1234');

		testContainer.empty();
	});
});