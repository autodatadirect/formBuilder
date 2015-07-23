/** 
 * Testing the arraySelectCreator
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/

describe('the checkbox and radio box types', function(){
'use strict';

	var testContainer = window.formBuilderTesting.testContainer;

	describe('checkboxes', function(){
		it('can be created', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();

			expect(input.siblings().is('.input-field-group')).toBe(true);
			expect(input.siblings().children().is('.input-field.undefined')).toBe(true);
			expect(input.siblings().children().children().is('.field-items')).toBe(true);
		});

		it('can get its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();

			input.click();
			input3.click();

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(true);

			testContainer.empty();
		});

		it('can set its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();

			input.selectionWidget('set', true);
			input3.selectionWidget('set', true);

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(true);

			input.selectionWidget('set', false);
			input3.selectionWidget('set', false);

			expect(input.selectionWidget('get')).toBe(false);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);
		});

		it('can clear its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var bfw = input.data('formBuilderSelectionWidget');

			input.selectionWidget('set', true);
			input3.selectionWidget('set', true);

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(true);

			bfw.clear();

			expect(input.selectionWidget('get')).toBe(false);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);

			testContainer.empty();

		});

		it('can check if it is dirty', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();

			expect(input.selectionWidget('isDirty')).toBe(false);

			input.selectionWidget('set', true);

			input.selectionWidget('checkDirty');
			expect(input.selectionWidget('isDirty')).toBe(true);

			testContainer.empty();
		});

		it('can clear its dirty status', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();

			input.selectionWidget('set', true);

			input.selectionWidget('checkDirty');
			expect(input.selectionWidget('isDirty')).toBe(true);

			input.selectionWidget('clearDirty');
			expect(input.selectionWidget('isDirty')).toBe(false);
		});

		it('can be validated', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test" data-require="true"/>').selectionWidget();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionWidget();

			input2.selectionWidget('set', true);

			expect(input.selectionWidget('validate')).toBe(false);
			expect(input2.selectionWidget('validate')).toBe(true);

			input.selectionWidget('set', true);

			expect(input.selectionWidget('validate')).toBe(true);
			expect(input2.selectionWidget('validate')).toBe(true);
		});

	});

	describe('radio boxes', function(){
		it('can be created', function(){
			var input = $('<input type="radio" name="optionsradios" value="test"/>').selectionWidget();

			expect(input.siblings().is('.input-field-group')).toBe(true);
			expect(input.siblings().children().is('.input-field.undefined')).toBe(true);
			expect(input.siblings().children().children().is('.field-items')).toBe(true);
		});

		it('can get its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();

			input.click();

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);

			testContainer.empty();
		});

		it('will only allow one radio box to be selected at a time', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();

			input.click();
			input3.click();

			expect(input.selectionWidget('get')).toBe(false);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(true);

			testContainer.empty();
		});

		it('can set its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionWidget();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').selectionWidget();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').selectionWidget();

			input.selectionWidget('set', true);
			input3.selectionWidget('set', true);

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(true);

			input.selectionWidget('set', false);
			input3.selectionWidget('set', false);

			expect(input.selectionWidget('get')).toBe(false);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);
		});

		it('can clear its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input2 = $('<input type="radiobox" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var input3 = $('<input type="radiobox" name="radioChecks" value="test"/>').appendTo(testContainer).selectionWidget();
			var bfw = input.data('formBuilderSelectionWidget');

			input.selectionWidget('set', true);

			expect(input.selectionWidget('get')).toBe(true);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);

			bfw.clear();

			expect(input.selectionWidget('get')).toBe(false);
			expect(input2.selectionWidget('get')).toBe(false);
			expect(input3.selectionWidget('get')).toBe(false);

			testContainer.empty();

		});

		it('can check if it is dirty', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionWidget();

			expect(input.selectionWidget('isDirty')).toBe(false);

			input.selectionWidget('set', true);

			input.selectionWidget('checkDirty');
			expect(input.selectionWidget('isDirty')).toBe(true);

			testContainer.empty();
		});

		it('can clear its dirty status', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionWidget();

			input.selectionWidget('set', true);

			input.selectionWidget('checkDirty');
			expect(input.selectionWidget('isDirty')).toBe(true);

			input.selectionWidget('clearDirty');
			expect(input.selectionWidget('isDirty')).toBe(false);
		});
	});
});