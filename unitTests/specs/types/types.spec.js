/**
 * General type testing
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('Any custom type', function(){
	var testContainer = window.formBuilderTesting.testContainer;

	xdescribe('may be a simple regex type', function(){
		xit('that has a regex validation pattern', function(){
			var input = $('<input type="text"/>').inputField();
			var ifw = input.data('add123InputField');

			var types = $.add123.inputField.types;

			types.test = {};
		});

		it('that has a regex filter pattern', function(){
			var types = $.add123.inputField.types;

			types.test = {
				setUp: function(ui) {
					var self = this; 
					var e = ui.element;

					e.inputFilter({
						pattern: /[0-9]/
					});
				}
			};

			var input = $('<input type="text" data-type="test"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			ifw.set('sdfsdfsd');

			expect(ifw.get()).toBe('');
		});

		xit('that may have flags', function(){

		});

		it('that may have a max');

		it('that may use a cannedFormatter');
	});
});