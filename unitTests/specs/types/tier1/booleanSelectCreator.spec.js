/** 
 * Testing the booleanSelectCreator
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/
'use strict';
describe('the boolean select creator type', function(){
	var testContainer = window.formBuilderTesting.testContainer;

	it('will display two true/false options in its dropdown menus', function(){
		var input = $('<input type="text" data-type="tmsYesNo"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');

		var drop = $(document).find('.tms-select-dropdown-content');

		expect(drop.children().eq(1).children().children().eq(0).text()).toBe('No');
		expect(drop.children().eq(1).children().children().eq(1).text()).toBe('Yes');

		testContainer.empty(); 
	});

	it('can create new boolean types', function(){
		var types = $.formBuilder.inputField.types;

		types.tmsTestThis = $.formBuilder.inputField.booleanSelectCreator('Test', 'This');

		var input = $('<input type="text" data-type="tmsTestThis"/>').appendTo(testContainer).inputField();
	
		var drop = $(document).find('.tms-select-dropdown-content');

		expect(drop.children().eq(1).children().children().eq(0).text()).toBe('Test');
		expect(drop.children().eq(1).children().children().eq(1).text()).toBe('This');

		types.tmsTestThis = undefined;

		testContainer.empty(); 
	});
});