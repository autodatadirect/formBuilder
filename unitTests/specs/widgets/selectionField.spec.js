/** 
 * Testing the selectionField
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/

describe('the checkbox and radio box types', function(){
'use strict';

	var testContainer = window.formBuilderTesting.testContainer;

	describe('checkboxes', function(){
		it('can be created', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test" data-label="This is a label"/>').appendTo(testContainer).selectionField();

			expect(input.parent().is('.input-field.undefined')).toBe(true);
			expect(input.parent().parent().is('.input-field-group')).toBe(true);

			var label = $(document).find('label');
			expect(label.text()).toBe('This is a label');

			testContainer.empty();
		});

		it('can get its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();

			input.prop('checked', true);
			input3.prop('checked', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(true);

			testContainer.empty();
		});

		it('can set its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();

			input.selectionField('set', true);
			input3.selectionField('set', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(true);

			input.selectionField('set', false);
			input3.selectionField('set', false);

			expect(input.selectionField('get')).toBe(false);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);
		});

		it('can clear its data', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input3 = $('<input type="checkbox" name="optionsChecks" value="test"/>').appendTo(testContainer).selectionField();
			var bfw = input.data('formBuilderselectionField');

			input.selectionField('set', true);
			input3.selectionField('set', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(true);

			bfw.clear();

			expect(input.selectionField('get')).toBe(false);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);

			testContainer.empty();

		});

		it('can check if it is dirty', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();

			expect(input.selectionField('isDirty')).toBe(false);

			input.selectionField('set', true);

			input.selectionField('checkDirty');
			expect(input.selectionField('isDirty')).toBe(true);

			testContainer.empty();
		});

		it('can clear its dirty status', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();

			input.selectionField('set', true);

			input.selectionField('checkDirty');
			expect(input.selectionField('isDirty')).toBe(true);

			input.selectionField('clearDirty');
			expect(input.selectionField('isDirty')).toBe(false);
		});

		it('can be validated', function(){
			var input = $('<input type="checkbox" name="optionsChecks" value="test" data-require="true"/>').selectionField();
			var input2 = $('<input type="checkbox" name="optionsChecks" value="test"/>').selectionField();

			input2.selectionField('set', true);

			expect(input.selectionField('validate')).toBe(false);
			expect(input2.selectionField('validate')).toBe(true);

			input.selectionField('set', true);

			expect(input.selectionField('validate')).toBe(true);
			expect(input2.selectionField('validate')).toBe(true);
		});

	});

	describe('radio boxes', function(){
		it('can be created', function(){
			var input = $('<input type="radio" name="radioChecks" value="test" data-label="This is a label"/>').appendTo(testContainer).selectionField();

			expect(input.parent().is('.input-field.undefined')).toBe(true);
			expect(input.parent().parent().is('.input-field-group')).toBe(true);

			var label = $(document).find('label');
			expect(label.text()).toBe('This is a label');

			testContainer.empty();
		});

		it('can get its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();

			input.prop('checked', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);

			testContainer.empty();
		});

		it('will only allow one radio box to be selected at a time', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();

			input.prop('checked', true);
			input3.prop('checked', true);

			expect(input.selectionField('get')).toBe(false);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(true);

			testContainer.empty();
		});

		it('can set its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionField();
			var input2 = $('<input type="radio" name="radioChecks" value="test"/>').selectionField();
			var input3 = $('<input type="radio" name="radioChecks" value="test"/>').selectionField();

			input.selectionField('set', true);
			input3.selectionField('set', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(true);

			input.selectionField('set', false);
			input3.selectionField('set', false);

			expect(input.selectionField('get')).toBe(false);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);
		});

		it('can clear its data', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input2 = $('<input type="radiobox" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var input3 = $('<input type="radiobox" name="radioChecks" value="test"/>').appendTo(testContainer).selectionField();
			var bfw = input.data('formBuilderselectionField');

			input.selectionField('set', true);

			expect(input.selectionField('get')).toBe(true);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);

			bfw.clear();

			expect(input.selectionField('get')).toBe(false);
			expect(input2.selectionField('get')).toBe(false);
			expect(input3.selectionField('get')).toBe(false);

			testContainer.empty();

		});

		it('can check if it is dirty', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionField();

			expect(input.selectionField('isDirty')).toBe(false);

			input.selectionField('set', true);

			input.selectionField('checkDirty');
			expect(input.selectionField('isDirty')).toBe(true);

			testContainer.empty();
		});

		it('can clear its dirty status', function(){
			var input = $('<input type="radio" name="radioChecks" value="test"/>').selectionField();

			input.selectionField('set', true);

			input.selectionField('checkDirty');
			expect(input.selectionField('isDirty')).toBe(true);

			input.selectionField('clearDirty');
			expect(input.selectionField('isDirty')).toBe(false);
		});
	});
});