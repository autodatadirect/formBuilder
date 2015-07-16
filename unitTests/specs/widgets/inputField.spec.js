/**
 * Testing inputField ifw
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true,  util:true*/
'use strict';
describe('An inputField', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can be created', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();

		expect(input.is(':formBuilder-inputField')).toBe(true);
	});

	describe('always constructs', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();

		it('a field-item div around the input', function() {			
			expect(input.parent('.field-item').length).toBe(1);
		});

		it('a field-items div around the field-item', function() {			
			expect(input.parent().parent('.field-items').length).toBe(1);
		});

		it('an input-field div around the field-items', function() {
			expect(input.parent().parent().parent('.input-field').length).toBe(1);
		});

		it('an input-field-group div around the input-field', function() {
			expect(input.parent().parent().parent().parent('.input-field-group').length).toBe(1);
		});
	});

	it('can get its field', function() {
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var field = ifw.getField();

		expect(field[0]).toEqual(input.parent().parent().parent('.input-field')[0]);
	});

	it('can toggle an individual layer', function(){

		var input = $('<input type="text"/>');
		var someLayer = $('<div id="someLayer"/>');
		var ifw;

		testContainer.empty();

		input.appendTo(testContainer).inputField();
		ifw = input.data('formBuilderInputField');
		
		// Setup the test layer
		someLayer.appendTo(ifw.getField());
		someLayer.show();
		ifw.layers.someLayer = someLayer;
		expect(ifw.layers.someLayer.is(':visible')).toBe(true);

		// Hide it
		ifw._showLayer('someLayer', false);
		expect(ifw.layers.someLayer.is(':visible')).toBe(false);

		// Show it again
		ifw._showLayer('someLayer', true);
		expect(ifw.layers.someLayer.is(':visible')).toBe(true);

		testContainer.empty();
	});

	describe('is redrawn', function(){
		it('to show only valid layers', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			spyOn(ifw, '_showLayer');
			
			ifw.redraw();
			expect(ifw._showLayer).toHaveBeenCalled();
			expect(ifw._showLayer.calls.count()).toBe(5);
		});

		it('after a set',function(done){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			
			//wait for _init
			pause(triggerWaitTime)
			.then(function(){
				spyOn(ifw, 'redraw');
				ifw.set('testing calls');
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(ifw.redraw).toHaveBeenCalled();
				expect(ifw.redraw.calls.count()).toBe(1);
				done();
			});
			
		});

		it('after a status change',function(done){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			
			pause(triggerWaitTime)
			.then(function(){
				spyOn(ifw, 'redraw');
				ifw.status('error', true);
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(ifw.redraw).toHaveBeenCalled();
				expect(ifw.redraw.calls.count()).toBe(1);
				done();
			});
		});

		it('after a keyup', function(done){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			
			pause(triggerWaitTime)
			.then(function(){
				spyOn(ifw, 'redraw');
				input.keyup();
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(ifw.redraw).toHaveBeenCalled();
				expect(ifw.redraw.calls.count()).toBe(1);
				done();
			});
		});

		it('after a failed dirty check');
	});


	it('can set its value', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		expect(input.val()).toBe('');
		ifw.set('some value');
		expect(input.val()).toBe('some value');
	});

	describe('can have a label', function(){
		it('that can be set with a function', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setLabel('some label');
			expect(input.parent().parent().siblings('label').length).toBe(1);
			expect(input.parent().parent().siblings('label').html()).toBe('some label');
		});

		it('that can be set with an attribute', function(){
			var input = $('<input type="text" data-label="some label" />').wrap('<div/>').inputField();

			expect(input.parent().parent().siblings('label').length).toBe(1);
			expect(input.parent().parent().siblings('label').html()).toBe('some label');
		});
		
	});

	describe('can have a suffix', function() {
		it('that can be set with a function', function() {
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setSuffix('some suffix');
			var overlay = input.parent().siblings('.suffix-overlay');
			
			expect(overlay.length).toBe(1);
			expect(overlay.children('.shim').length).toBe(1);
			expect(overlay.children('.value').length).toBe(1);
			expect(overlay.children('.value').html()).toBe('some suffix');
		});
		
		it('that can be set with an attribute', function(){
			var input = $('<input type="text" data-suffix="some suffix"/>').wrap('<div/>').inputField();
			var container = input.parent();
			var ifw = input.data('inputField');
			var overlay = input.parent().siblings('.suffix-overlay');
			
			expect(overlay.length).toBe(1);
			expect(overlay.children('.shim').length).toBe(1);
			expect(overlay.children('.value').length).toBe(1);
			expect(overlay.children('.value').html()).toBe('some suffix');

		});

		it('that is hidden at the start', function(){
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setSuffix('some suffix');
			ifw.redraw();

			overlay = input.parent().siblings('.suffix-overlay');

			expect(overlay.css('visibility')).toBe('hidden');

			testContainer.empty();
		});

		it('that is visible when the field has a value', function() {
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setSuffix('some suffix');
			ifw.redraw();
			overlay = input.parent().siblings('.suffix-overlay');

			expect(overlay.css('visibility')).toBe('hidden');

			ifw.set('some value');
			ifw.redraw();

			overlay = container.find('.suffix-overlay');
			expect(overlay.css('visibility')).toBe('visible');

			testContainer.empty();
		});

		it('that becomes hidden when the field loses all value', function(){
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setSuffix('some suffix');
			ifw.redraw();
			overlay = input.parent().siblings('.suffix-overlay');

			expect(overlay.css('visibility')).toBe('hidden');

			ifw.set('some value');
			ifw.redraw();

			overlay = container.find('.suffix-overlay');
			expect(overlay.css('visibility')).toBe('visible');

			ifw.set('');
			ifw.redraw();

			overlay = container.find('.suffix-overlay');
			expect(overlay.css('visibility')).toBe('hidden');
			
			testContainer.empty();
		});

	});

	describe('can have a prefix', function() {
		it('that can be set with a function', function() {
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setPrefix('some prefix');
			var overlay = input.parent().siblings('.prefix-overlay');
			
			expect(overlay.length).toBe(1);
			expect(overlay.html()).toBe('some prefix');
		});
		
		it('that can be set with an attribute', function(){
			var input = $('<input type="text" data-prefix="some prefix"/>').wrap('<div/>').inputField();
			var container = input.parent();
			var ifw = input.data('inputField');
			var overlay = input.parent().siblings('.prefix-overlay');
			
			expect(overlay.length).toBe(1);
			expect(overlay.html()).toBe('some prefix');

		});

		it('that is hidden at the start', function(){
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setPrefix('some prefix');
			ifw.redraw();

			overlay = input.parent().siblings('.prefix-overlay');

			expect(overlay.is(':visible')).toBe(false);

			testContainer.empty();
		});

		it('that is visible when the field has a value', function() {
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setPrefix('some prefix');
			ifw.redraw();
			overlay = input.parent().siblings('.prefix-overlay');

			expect(overlay.is(':visible')).toBe(false);

			ifw.set('some value');
			ifw.redraw();

			overlay = container.find('.prefix-overlay');
			expect(overlay.is(':visible')).toBe(true);

			testContainer.empty();
		});

		it('that becomes hidden when the field loses all value', function(){
			var input = $('<input type="text"/>');
			var ifw, container, overlay;

			testContainer.empty();

			input.appendTo(testContainer).inputField();
			ifw = input.data('formBuilderInputField');
			container = ifw.getField();

			ifw.setPrefix('some prefix');
			ifw.redraw();
			overlay = input.parent().siblings('.prefix-overlay');

			expect(overlay.is(':visible')).toBe(false);

			ifw.set('some value');
			ifw.redraw();

			overlay = container.find('.prefix-overlay');
			expect(overlay.is(':visible')).toBe(true);

			ifw.set('');
			ifw.redraw();

			overlay = container.find('.prefix-overlay');
			expect(overlay.is(':visible')).toBe(false);

			testContainer.empty();
		});

	});

	describe('can have a max', function() {		// Uses inputFilter widget
		it('that can be set with a function', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setMax(5);
			ifw.set('123456');
			expect(input.val()).toBe('12345');
			ifw.set('54321asdasfdfhsdfg125ds5fg1sdf5');
			expect(input.val()).toBe('54321');
		});

		it('that can be set with an attribute', function(){
			var input = $('<input type="text" data-max="5"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.set('123456');
			expect(input.val()).toBe('12345');
			ifw.set('54321asdasfdfhsdfg125ds5fg1sdf5');
			expect(input.val()).toBe('54321');
		});
	});

	describe('can have addons', function() {
		var addonHtml = 'some addon';

		it('that can be added with a function', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;

			expect(input.parent().siblings('.addon').length).toBe(0);

			ifw.addOn(0,addonHtml);
			addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(0);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe(addonHtml);
		});

		it('that can be added on the left of the input with negative weight', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;

			ifw.addOn(-1,addonHtml);
			addon = input.parent().siblings('.addon');
			

			expect(addon.index()).toBe(0); // on left
			expect(addon.is('.first')).toBe(true);
		});

		it('that can be added on the right of the input with positive weight', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;

			ifw.addOn(1,addonHtml);
			addon = input.parent().siblings('.addon');

			expect(addon.index()).toBe(1); // on right
			expect(addon.is('.first')).toBe(false);
		});

		it('that can have multiple side-by-side with different weights', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var items, addon;

			ifw.addOn(-10,'left [0]');
			ifw.addOn(-5,'left [1]');
			ifw.addOn(10,'right [4]');
			ifw.addOn(5,'right [3]');

			items = input.parent().parent().children();

			expect(items.filter('.first').length).toBe(1);

			addon = items.eq(0);
			expect(addon.is('.addon.first')).toBe(true);
			expect(addon.html()).toEqual('left [0]');

			addon = items.eq(1);
			expect(addon.is('.addon')).toBe(true);
			expect(addon.html()).toEqual('left [1]');

			//items.eq(2) == the input field

			addon = items.eq(3);
			expect(addon.is('.addon')).toBe(true);
			expect(addon.html()).toEqual('right [3]');

			addon = items.eq(4);
			expect(addon.is('.addon')).toBe(true);
			expect(addon.html()).toEqual('right [4]');
		});

		it('that can have a custom class name', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;
			var customClass = 'customClassName';

			ifw.addOn(0,addonHtml, customClass);
			addon = input.parent().siblings('.addon');

			expect(addon.is('.'+customClass)).toBe(true);
		});

		it('that can be made up of html, rather than just text', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;
			var customHtml = 'some text <i>with italics</i>';

			ifw.addOn(0,customHtml);
			addon = input.parent().siblings('.addon');

			expect(addon.html()).toBe(customHtml);
			expect(addon.text()).toBe('some text with italics');
			expect(addon.children('i').length).toBe(1);
			expect(addon.children('i').text()).toBe('with italics');
		});

		it('that can be added with attribute data-preinput', function(){
			var input = $('<input type="text" data-preinput="pre"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;

			addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(-1);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe('pre');
		});

		it('that can be added with attribute data-postinput', function(){
			var input = $('<input type="text" data-postinput="post"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var addon;

			addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(1);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe('post');
		});

	});

	describe('can have a placeholder', function() {
		var placeholderText = 'some placeholder';

		it('that can be set with a function', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var placeholder;
			
			placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(0);

			ifw.placeholder(placeholderText);

			placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.text()).toBe(placeholderText);
		});

		it('that can be set with an attribute', function(){
			var input = $('<input type="text" data-placeholder="'+placeholderText+'"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var placeholder;

			placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.text()).toBe(placeholderText);
		});

		it('that can be set and then set again', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var placeholder;
			
			ifw.placeholder(placeholderText);
			placeholder = input.siblings('.placeholder');
			
			expect(placeholder.text()).toBe(placeholderText);

			ifw.placeholder('some other placeholder');

			expect(placeholder.text()).toBe('some other placeholder');
		});

		it('that is visible at the start', function(){
			var input = $('<input type="text"/>');
			var ifw, placeholder;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.placeholder(placeholderText);
			ifw.redraw();

			placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);

			testContainer.empty();
		});

		it('that is hidden after a value is set', function(){
			var input = $('<input type="text"/>');
			var ifw, placeholder;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.placeholder(placeholderText);
			ifw.redraw();
			ifw.set('some value');
			ifw.redraw();
			
			placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(false);

			testContainer.empty();
		});

		it('that is visible after a value has been cleared', function(){
			var input = $('<input type="text"/>');
			var ifw, placeholder;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.placeholder(placeholderText);
			ifw.redraw();
			ifw.set('some value');
			ifw.redraw();
			ifw.set('');
			ifw.redraw();

			placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);

			testContainer.empty();
		});

		it('that is hidden after keydown', function(){
			var input = $('<input type="text"/>');
			var ifw, placeholder;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.placeholder(placeholderText);
			ifw.redraw();
			
			placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);

			input.keydown();

			expect(placeholder.is(':visible')).toBe(false);

			testContainer.empty();
		});

		it('that is visible after keydown then keyup (no value change)', function(){
			var input = $('<input type="text"/>');
			var ifw, placeholder;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.placeholder(placeholderText);
			ifw.redraw();
			
			placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);

			input.keydown();
			expect(placeholder.is(':visible')).toBe(false);

			input.keyup();
			expect(placeholder.is(':visible')).toBe(true);

			testContainer.empty();
		});
		
	});

	xdescribe('can handle clean or dirty states', function(){
		// Do when dirty is actually working
		it('by setting to dirty on change');
		it('by clearing the dirty state');
	});

	it('can clear its value', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		ifw.set('some value');
		expect(input.val()).toBe('some value');
		ifw.clear();
		expect(input.val()).toBe('');
	});

	it('can get its value', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var val = 'some value';
		
		ifw.set(val);
		expect(input.val()).toBe(val);
		expect(ifw.get()).toBe(val);
	});

	it('can flash its input box', function(done){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var field = ifw.getField();

		spyOn(ifw.field, 'addClass').and.callThrough();
		spyOn(ifw.field, 'removeClass').and.callThrough();

		ifw.flash(1);
		pause(155)
		.then(function(){
			expect(ifw.field.addClass).toHaveBeenCalled();
			expect(ifw.field.addClass).toHaveBeenCalledWith('flash');
			expect(ifw.field.removeClass).toHaveBeenCalled();
			expect(ifw.field.removeClass).toHaveBeenCalledWith('flash');

			expect(field.is('.flash')).toBe(false); //should have faded

			done();
		});

	});

	describe('can have an error message in the input box', function(){
		it('and set it', function(){
			var input = $('<input type="text"/>');
			var ifw, overlay;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(0);

			ifw.setError({
				message: 'some error'
			});

			overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.is(':visible')).toBe(true);
			expect(overlay.text()).toBe('some error');

			testContainer.empty();
		});

		it('and clear it', function(){
			var input = $('<input type="text"/>');
			var ifw, overlay;

			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			ifw.setError({
				message: 'some error'
			});
			ifw.clearError();

			overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.is(':visible')).toBe(false);
			expect(overlay.text()).toBe('some error');

			testContainer.empty();
		});
	});

	describe('can format a value', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var testType = {
			converter: {
				toField: function(val, ui){return val + ' to';},
				fromField: function(val, ui){return val + ' from';}
			}
		};

		ifw.type = testType;
		
		it('to prepare it to go in the field', function(){
			var ret;

			spyOn(ifw.type.converter, 'toField').and.callThrough();

			ret = ifw._formatToField('some val');
			expect(ret).toBe('some val to');
			expect(ifw.type.converter.toField).toHaveBeenCalled();
			expect(ifw.type.converter.toField).toHaveBeenCalledWith('some val', ifw);
		});

		it('to prepare it for coming from the field', function(){
			var ret;

			spyOn(ifw.type.converter, 'fromField').and.callThrough();

			ret = ifw._formatFromField('some val');
			expect(ret).toBe('some val from');
			expect(ifw.type.converter.fromField).toHaveBeenCalled();
			expect(ifw.type.converter.fromField).toHaveBeenCalledWith('some val', ifw);
		});
	});


	describe('has a type', function(){
		var testType = {
			someProp: 'someValue'
		};

		it('that it can get', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var type;

			ifw.type = testType;
			type = ifw.getType();
			expect(util.equals(type, testType)).toBe(true);
		});

		it('that can bet set with a function (if the type exists)', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setType(testType);
			expect(util.equals(ifw.getType(), testType)).toBe(false);
			
			ifw.setType('utext');
			expect(util.equals(ifw.getType(), $.formBuilder.inputField.types.utext)).toBe(true);
		});

		it('that be set with an attribute', function(){
			var input = $('<input type="text" data-type="utext"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(util.equals(ifw.getType(), $.formBuilder.inputField.types.utext)).toBe(true);
		});

		it('that is "text" by default', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(util.equals(ifw.getType(), $.formBuilder.inputField.types.text)).toBe(true);
		});
		
	});
	
	describe('can validate its value', function(){
		it('to be valid (text)', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(ifw.validate()).toBe(true);
			ifw.set('asdasd');
			expect(ifw.validate()).toBe(true);
		});

		// Other validity tests run individual types

		it('to be invalid when empty and required', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(ifw.validate()).toBe(false);
			ifw.set('some value');
			expect(ifw.validate()).toBe(true);
		});

		it('and sets an error message when found invalid', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			
			spyOn(ifw, 'setError');

			expect(ifw.validate()).toBe(false);
			expect(ifw.setError).toHaveBeenCalled();
			expect(ifw.setError).toHaveBeenCalledWith({
				message: 'required'
			});
		});

		it('and clears an error message when found valid', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');
			
			spyOn(ifw, 'clearError');

			expect(ifw.validate()).toBe(false);
			ifw.set('some value');
			expect(ifw.validate()).toBe(true);
			expect(ifw.clearError).toHaveBeenCalled();
		});

		it('and will attempt to revalidate invalids after typing', function(done){
			var input = $('<input type="text" data-require="true"/>');
			var ifw;
			
			testContainer.append(input);

			input.inputField();
			ifw = input.data('formBuilderInputField');

			expect(ifw.validate()).toBe(false);

			spyOn(ifw,'validate').and.callThrough();

			input.val('a').keyup(); //type while invalid

			pause(triggerWaitTime)
			.then(function(){
				expect(ifw.validate).toHaveBeenCalled();
				expect(ifw.validate).toHaveBeenCalledWith(true); //skipping required
				expect(ifw.validate.calls.count()).toBe(1);
				
				input.val('b').keyup(); //type while valid
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(ifw.validate).toHaveBeenCalled();
				expect(ifw.validate).toHaveBeenCalledWith(true);
				expect(ifw.validate.calls.count()).toBe(1); //not called b/c valid
				
				testContainer.empty();
				done();
			});
		});

	});


	it('can hide itself', function(){
		var input = $('<input type="text"/>');
		var ifw, field;

		testContainer.append(input);

		input.inputField();
		ifw = input.data('formBuilderInputField');
		field = ifw.getField();

		expect(field.is(':visible')).toBe(true);
		ifw.hide();
		expect(field.is(':visible')).toBe(false);

		testContainer.empty();
	});

	it('can show itself', function(){
		var input = $('<input type="text"/>');
		var ifw, field;

		testContainer.append(input);

		input.inputField();
		ifw = input.data('formBuilderInputField');
		field = ifw.getField();

		expect(field.is(':visible')).toBe(true);
		ifw.hide();
		expect(field.is(':visible')).toBe(false);
		ifw.show();
		expect(field.is(':visible')).toBe(true);

		testContainer.empty();
	});

	describe('can have statuses', function(){
		it('that can be checked', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(ifw.hasStatus('require')).toBe(true);
		});

		it('that can be updated', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(ifw.hasStatus('require')).toBe(true);
			ifw.status('require', false);
			expect(ifw.hasStatus('require')).toBe(false);
		});

		it('that can be updated (legacy)', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			expect(ifw.hasStatus('require')).toBe(true);
			ifw.updateStatus('require', false);
			expect(ifw.hasStatus('require')).toBe(false);
		});

		it('that can update and fire events', function(){
			var input = $('<input type="text" data-require="true"/>').wrap('<div/>');
			var ifw;

			var foo = {
				bar: function(e, data){}
			};

			input.inputField({
				statusUpdate: function(e, data){
					foo.bar(null, data); //event data irrelevant
				}
			});
			
			ifw = input.data('formBuilderInputField');

			expect(ifw.hasStatus('require')).toBe(true);

			spyOn(foo, 'bar');

			ifw.status('require', false, true);

			expect(ifw.hasStatus('require')).toBe(false);
			expect(foo.bar).toHaveBeenCalled();
			expect(foo.bar).toHaveBeenCalledWith(null, {
				statusName: 'require',
				value: false
			});
			
		});

		describe('including a "disable" status', function(){
			it('that can be checked', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disable', true);
				expect(ifw.hasStatus('disable')).toBe(ifw.isDisabled());
			});

			it('that can be set', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disable', false);
				ifw.disable();
				expect(ifw.isDisabled()).toBe(true);
			});

			it('that can be unset', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disable', true);
				ifw.enable();
				expect(ifw.isDisabled()).toBe(false);
			});

			it('that has an overlay that is visible when set', function(done){
				var input = $('<input type="text">');
				var ifw, overlay;

				testContainer.append(input);
				input.inputField();
				ifw = input.data('formBuilderInputField');

				overlay = input.parent().siblings('.disable-overlay');
				expect(overlay.length).toBe(0);

				ifw.disable();
				overlay = input.parent().siblings('.disable-overlay');
				expect(overlay.length).toBe(1);

				pause(triggerWaitTime)
				.then(function(){
					expect(overlay.is(':visible')).toBe(true);

					ifw.enable();
					expect(overlay.length).toBe(1);

					return pause(triggerWaitTime);
				})
				.then(function(){
					expect(overlay.is(':visible')).toBe(false);

					testContainer.empty();

					done();
				});

			});
		});
	});


	it('can be destroyed');

	
});
