/** 
 * Testing the Quantity unit type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';

describe('The Quantity Unit data type',function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
 	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('allows a search', function(done){
		var input = $('<input type="text" data-type="tmsQuantityUnit"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var items; 

		var drop = ifw.getField().children('ul.ui-autocomplete.ui-menu.ui-widget');

		input.trigger('keydown');
		pause(triggerWaitTime*300)
		.then(function(){
			
			items = drop.find('li a.ui-corner-all');

			// All options will display
			expect(items.text()).toBe('MIKMHRMINDAYSPKGS'); 

			ifw.set('MI');
			input.trigger('keydown');

			return pause(triggerWaitTime*300);
		})
		.then(function(){
			items = drop.find('li a.ui-corner-all');

			// Some options will display
			expect(items.text()).toBe('MIMIN'); 

			// Can select an option
			items.click();

			return pause(triggerWaitTime*300);
		})
		.then(function(){
			// Only one option is selected 
			expect(ifw.get()).toBe('MIN');

			testContainer.empty();
			done();
		});
	});

	it('converts all input to upper case', function(done){
		var input = $('<input type="text" data-type="tmsQuantityUnit"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var items; 

		var drop = ifw.getField().children('ul.ui-autocomplete.ui-menu.ui-widget');

		ifw.set('cat'); 
		input.trigger('keydown');
		pause(triggerWaitTime*300)
		.then(function(){
			expect(ifw.get()).toBe('CAT');

			testContainer.empty();
			done(); 
		});
	});
});