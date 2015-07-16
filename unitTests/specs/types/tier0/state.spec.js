/**
 * Testing state data-type
 *
 * Regex type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/
'use strict';
describe('The state data-type', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'state';
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

		expect(typeNewString(chars.alphas)).toEqual('AB');
		expect(typeNewString(chars.ALPHAS)).toEqual('AB');
		expect(typeNewString(chars.digits)).toEqual('');
		expect(typeNewString(chars.symbols)).toEqual('');
		expect(typeNewString('FL')).toEqual('FL');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var valids, invalids;

		valids = [
			'KA',
			'NY',
			'WA'
		];

		invalids = [
			'cat',
			'A',
			'ASDS',
			'ab'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	it('can set and get its values', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');

		ifw.set('KA'); 

		expect(ifw.get()).toBe('KA');

		testContainer.empty();
	});
});