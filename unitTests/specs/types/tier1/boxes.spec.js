/** 
 * Testing the arraySelectCreator
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/

describe('the checkbox and radio box types', function(){
'use strict';

	var testContainer = window.formBuilderTesting.testContainer;

	it('can be created', function(){
		var input = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option1"/>').inputField();

		expect(input.siblings().is('.input-field-group')).toBe(true);
		expect(input.siblings().children().is('.input-field.undefined')).toBe(true);
		expect(input.siblings().children().children().is('.field-items')).toBe(true);
	});

	describe('can get and set its data', function(){
		describe('for checkboxes', function(){
			it('get will return an error if nothing is selected', function(){
				var input = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option1"/>').inputField();
				var bfw = input.data('formBuilderInputField');

				expect(bfw.get()).toBe('please make at least one selection');
			});

			it('can get its data', function(){
				var input = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option1"/>').appendTo(testContainer).inputField();
				var input2 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option2"/>').appendTo(testContainer).inputField();
				var input3 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option3"/>').appendTo(testContainer).inputField();
				var bfw = input.data('formBuilderInputField');

				input.click();
				input3.click();

				expect(bfw.get()).toEqual(['option1', 'option3']);

				testContainer.empty();
			});

			it('can set its data', function(){
				var input = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option1"/>').appendTo(testContainer).inputField();
				var input2 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option2"/>').appendTo(testContainer).inputField();
				var input3 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option3"/>').appendTo(testContainer).inputField();
				var bfw = input.data('formBuilderInputField');

				expect(bfw.get()).toBe('please make at least one selection');

				bfw.set('option1');

				expect(bfw.get()).toEqual(['option1']);

				bfw.set('option3');

				expect(bfw.get()).toEqual(['option3']);

				testContainer.empty();
			});

			it('can clear its data', function(){
				var input = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option1"/>').appendTo(testContainer).inputField();
				var input2 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option2"/>').appendTo(testContainer).inputField();
				var input3 = $('<input type="checkbox" data-type="checkbox" name="optionsChecks" value="option3"/>').appendTo(testContainer).inputField();
				var bfw = input.data('formBuilderInputField');

				bfw.set('option1');

				expect(bfw.get()).toEqual(['option1']);

				bfw.clear();

				expect(bfw.get()).toEqual('please make at least one selection');

				testContainer.empty();

			});


		});
	});
});