/**
 * Testing default data-type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
 describe('The default type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	it('should not have filter support', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(filter).toBeUndefined();
	});
});