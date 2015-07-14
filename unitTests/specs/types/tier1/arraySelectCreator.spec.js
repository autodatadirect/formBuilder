/** 
 * Testing the arraySelectCreator
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('the array select creator', function(){
	var testContainer = window.formBuilderTesting.testContainer;

	it('creates an array of options where the label is equal to the value', function(){
		var input = $('<input type="text" data-type="tmsExpYear"/>').appendTo(testContainer).inputField();
		var drop = $(document).find('.tms-select-dropdown-content');
		var date = new Date();
		var i, x; 

		x = date.getFullYear();

		for(i = 0; i < 10; i++){
			var x2 = String(x);

			expect(drop.children().eq(1).children().children().eq(i).text()).toBe(x2);

			x++; 
		}

		testContainer.empty(); 
	});

	it('can create new array dropdown menus, and alpabetize them', function(){
		var types = $.formBuilder.inputField.types;
		var testArray = ['Cat', 'Dog', 'Armadillo', 'Gator', 'Horse', 'Panda', 'Koalla', "Mamma Bear"];
		var alphabetical = ['Armadillo', 'Cat', 'Dog', 'Gator', 'Horse', 'Koalla',  "Mamma Bear",'Panda'];
		var i; 

		types.tmsTestArray = $.formBuilder.inputField.arraySelectCreator(testArray);

		var input = $('<input type="text" data-type="tmsTestArray"/>').appendTo(testContainer).inputField();
		var drop = $(document).find('.tms-select-dropdown-content');

		for(i =0; i < 8; i++){
			expect(drop.children().eq(1).children().children().eq(i).text()).toBe(alphabetical[i]);
		}

		types.tmsTestArray = undefined;

		testContainer.empty(); 
	});
});