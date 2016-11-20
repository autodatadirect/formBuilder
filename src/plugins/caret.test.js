import '../util/jsdomSetup';
import expect from 'expect';
import $ from 'jquery';
import './caret';

describe('Plugin caret.js', function(){
	let input;

	before(() => {
		input = $('<input value="test" type="text"/>').appendTo($('body'));
	});

	after(() => {
		input.remove();
	});

	it('has a browser that supports setSelectionRange', () => {
		expect(input[0].setSelectionRange).toExist();
		expect(input.val()).toBe('test');
		input[0].setSelectionRange(0,100);
		expect(input[0].selectionStart).toBe(0);
		expect(input[0].selectionEnd).toBe(4);
		input[0].setSelectionRange(100,100);
		expect(input[0].selectionStart).toBe(4);
		expect(input[0].selectionEnd).toBe(4);
	});

	it('can check the length of a set string', () => {
		input[0].setSelectionRange(100,100);
		expect(input.caret()).toEqual({begin: 4, end: 4});
	});

	it('can check the length of an empty string', () => {
		input.val(''); 
		input[0].setSelectionRange(100,100);
		expect(input.caret()).toEqual({begin: 0, end: 0});
	});

	it('can get the selection range', () => {
		input.val('123456789');
		input[0].setSelectionRange(100,100);
		expect(input.caret()).toEqual({begin: 9, end: 9});

		input[0].setSelectionRange(1, 1); 
		expect(input.caret()).toEqual({begin: 1, end: 1});
	});

	it('can select and highlight sections of input', () => {
		input.val('123456789'); 
		input[0].setSelectionRange(1, 4); 
		expect(input.caret()).toEqual({begin: 1, end: 4});
	});

	it('can set the select range', () => {
		input.val('123456789'); 
		input.caret(2, 3);
		expect(input[0].selectionStart).toBe(2);
		expect(input[0].selectionEnd).toBe(3);
		input.caret(0, 10000);
		expect(input[0].selectionStart).toBe(0);
		expect(input[0].selectionEnd).toBe(9);
	});

});