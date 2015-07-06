/**
 * General type testing
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('Any custom type', function(){
	var testContainer = window.formBuilderTesting.testContainer;

	var types = $.add123.inputField.types;

	describe('may be a simple regex type', function(){

		it('that has a regex validation pattern', function(){
			types.testType = $.add123.inputField.createRegexType(/^[0-9]$/);

			var input = $('<input type="text" data-type="testType"/>').appendTo(testContainer).inputFilter().inputField();
			var filter = input.data('add123InputFilter'); 
			var ifw = input.data('add123InputField');
			var typeInstance = ifw.getType();
			var Obj = {
				message: 'invalid'
			};

			ifw.set('abcde');

			var result = typeInstance.validate(ifw); 

			expect(result).toEqual(Obj);

			types.testType = undefined;
			testContainer.empty(); 
		});

		it('that has a regex filter pattern', function(){
			types.testType = $.add123.inputField.createRegexType(/^[0-9]$/, /[0-9]/);

			var input = $('<input type="text" data-type="testType"/>').inputFilter().inputField();
			var filter = input.data('add123InputFilter'); 
			var ifw = input.data('add123InputField');
			var typeInstance = ifw.getType();

			expect(filter.options.pattern).toEqual(/[0-9]/);

			types.testType = undefined;
		});

		it('that may have flags such as toUpper', function(){
			types.testType = $.add123.inputField.createRegexType(/^[0-9]$/, /[0-9]/, {
				toUpper: true 
			});

			var input = $('<input type="text" data-type="testType"/>').inputFilter().inputField();
			var filter = input.data('add123InputFilter'); 
			var ifw = input.data('add123InputField');
			var typeInstance = ifw.getType();

			expect(filter.options.toUpper).toBe(true);

			types.testType = undefined;
		});

		it('that may use a cannedFormatter (trim)', function(){
			types.testType = $.add123.inputField.createRegexType(/^[0-9\s]*$/, /[0-9\s]/, {
				 cannedFormatter: 'trim'
			});

			var input = $('<input type="text" data-type="testType"/>').inputField();
			var filter = input.data('add123InputFilter'); 
			var ifw = input.data('add123InputField');
			var typeInstance = ifw.getType();

			input.val('  32424  ');

			expect(typeInstance.format(ifw)).toBe('32424');

			types.testType = undefined;
		});

		it('that may have a max', function(){
			types.testType = $.add123.inputField.createRegexType(/^[0-9\s]*$/, /[0-9\s]/, {}, 10);

			var input = $('<input type="text" data-type="testType"/>').inputField();
			var filter = input.data('add123InputFilter'); 
			var ifw = input.data('add123InputField');
			var typeInstance = ifw.getType();

			expect(filter.options.max).toBe(10);

			types.testType = undefined;
		});
	});
});