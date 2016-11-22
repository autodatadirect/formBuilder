import  '../util/jsdomSetup';
import expect, {spyOn} from 'expect';
import def from './inputField.def.js';
import lolex from 'lolex';

import $ from 'jquery';

describe('The inputField Widget', function(){
	let input, widget, clock;

	const setup = (htmlString = '<input type="text"/>') => {
		input = $(htmlString);
		widget = Object.create(def);
		widget.element = input;
		widget._trigger = expect.createSpy();
		widget._create();
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
	});

	afterEach(() => {
		clock.uninstall();
	});

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

	it('can get its field', function() {
		const field = widget.getField();
		expect(field[0]).toEqual(input.parent().parent().parent('.input-field')[0]);
	});
	
	it('can initialize', function(){
		input = $('<input type="text" value="test"/>');
		widget = Object.create(def);
		widget.element = input;
		const spy = spyOn(widget, 'set');
		widget._init();
		expect(spy).toHaveBeenCalled();
		expect(widget.get()).toBe('test');
	});

	it('can toggle an individual layer', function(){
		const someLayer = $('<div id="someLayer"/>');

		widget._create();
		widget._init();
		
		someLayer.appendTo(widget.getField());
		someLayer.show();
		
		widget.layers.someLayer = someLayer;
		expect(widget.layers.someLayer.is(':visible')).toBe(true);

		const visible = () => someLayer[0].style._values.display !== 'none';

		widget._showLayer('someLayer', false);
		expect(visible()).toBe(false);

		widget._showLayer('someLayer', false);
		expect(visible()).toBe(false);
	});

	it('will show only valid layers after redraw', function(){
		spyOn(widget, '_showLayer');
		widget.redraw();
		expect(widget._showLayer.calls.length).toBe(5);
	});

	describe('will redraw', () => {

		beforeEach(() => {
			spyOn(widget, 'redraw');
		});

		it('after a set',function(){
			widget.set('testing calls');
			expect(widget.redraw.calls.length).toBe(1);
		});

		it('after a status change',function(){
			widget.status('error', true);
			expect(widget.redraw.calls.length).toBe(1);
		});

		it('after a keyup', function(){
			input.keyup();
			expect(widget.redraw.calls.length).toBe(1);
		});
	
		it('after a failed dirty check', function(){
			input.val('test');
			input.trigger('change');
			expect(widget.isDirty()).toBe(true);
			input.prevValue = '';
			input.val('');
			widget.checkDirty();
			expect(widget.redraw.calls.length).toBe(1);
		});
	});

	it('can set its value', function(){
		expect(input.val()).toBe('');
		widget.set('some value');
		expect(input.val()).toBe('some value');
	});

	it('can set its label', function(){
		widget.setLabel('some label');
		expect(input.parent().parent().siblings('label').length).toBe(1);
		expect(input.parent().parent().siblings('label').html()).toBe('some label');
	});

	describe('can have a suffix', function() {
		it('that can be set with a function', function() {
			widget.setSuffix('some suffix');
			const overlay = input.parent().siblings('.suffix-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.children('.shim').length).toBe(1);
			expect(overlay.children('.value').length).toBe(1);
			expect(overlay.children('.value').html()).toBe('some suffix');
		});

		it('that can be set with an attribute', function(){
			setup('<input type="text" data-suffix="some suffix"/>');
			const overlay = input.parent().siblings('.suffix-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.children('.shim').length).toBe(1);
			expect(overlay.children('.value').length).toBe(1);
			expect(overlay.children('.value').html()).toBe('some suffix');
		});

		it('that is hidden at the start', function(){
			widget.setSuffix('some suffix');
			widget.redraw();
			const overlay = input.parent().siblings('.suffix-overlay');
			expect(overlay.css('visibility')).toBe('hidden');
		});

		
		it('that is visible when the field has a value', function() {
			widget.setSuffix('some suffix');
			widget.redraw();
			let overlay = input.parent().siblings('.suffix-overlay');

			expect(overlay.css('visibility')).toBe('hidden');

			
			widget.set('some value');
			widget.redraw();

			overlay = widget.getField().find('.suffix-overlay');
			expect(overlay[0].style._values.visibility).toBe('visible');
		});
		
		it('that becomes hidden when the field loses all value', function(){
			widget.setSuffix('some suffix');
			widget.redraw();
			let overlay = input.parent().siblings('.suffix-overlay');

			expect(overlay[0].style._values.visibility).toBe('hidden');

			widget.set('some value');
			widget.redraw();

			overlay = widget.getField().find('.suffix-overlay');
			expect(overlay[0].style._values.visibility).toBe('visible');

			widget.set('');
			widget.redraw();
			
			overlay = widget.getField().find('.suffix-overlay');
			expect(overlay[0].style._values.visibility).toBe('hidden');
		});
	});

	describe('can have a prefix', function() {

		const getPrefixOverlay = () => widget.getField()[0].getElementsByClassName('prefix-overlay').item(0);



		it('that can be set with a function', function() {
			widget.setPrefix('some prefix');
			const overlay = input.parent().siblings('.prefix-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.html()).toBe('some prefix');
		});
		
		
		it('that can be set with an attribute', function(){
			setup('<input type="text" data-prefix="some prefix"/>');
			const overlay = input.parent().siblings('.prefix-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay.html()).toBe('some prefix');

		});

		it('that is hidden at the start', function(){
			const overlay = getPrefixOverlay();
			expect(overlay.style.display).toBe('none');
			widget.setPrefix('some prefix');
			widget.redraw();
			expect(overlay.innerHTML).toBe('some prefix');
			expect(overlay.style.display).toBe('none');
		});

		it('that is visible when the field has a value', function() {
			widget.setPrefix('some prefix');
			widget.redraw();
			let overlay = getPrefixOverlay();
			expect(overlay.style.display).toBe('none');

			widget.set('some value');
			widget.redraw();

			overlay = getPrefixOverlay();
			expect(overlay.style.display).toBe('');
		});
		
		it('that becomes hidden when the field loses all value', function(){
			widget.setPrefix('some prefix');
			widget.redraw();
			let overlay = getPrefixOverlay();

			expect(overlay.style.display).toBe('none');

			widget.set('some value');
			widget.redraw();

			overlay = getPrefixOverlay();
			expect(overlay.style.display).toBe('');

			widget.set('');
			widget.redraw();

			overlay = getPrefixOverlay();
			expect(overlay.style.display).toBe('none');
		});

	});

	describe('can have a max', function() {
		let inputFilter;

		before(() => {
			inputFilter = $.fn.inputFilter = expect.createSpy();
			$.fn.inputFilter = expect.createSpy();
		});

		beforeEach(() => $.fn.inputFilter.reset());

		after(() => $.fn.inputFilter = inputFilter);
		
		it('that can be set with a function', function(){
			widget.setMax(5);
			widget.set('123456');
			expect($.fn.inputFilter.calls.length).toBe(1);
			expect($.fn.inputFilter.calls[0].arguments[0]).toEqual({
				toUpper: false,
				max: 5,
				pattern: /./
			});
		});

		
		it('that can be set with an attribute', function(){
			expect($.fn.inputFilter.calls.length).toBe(0);
			setup('<input type="text" data-max="15"/>');
			expect($.fn.inputFilter.calls.length).toBe(1);
			expect($.fn.inputFilter.calls[0].arguments[0]).toEqual({
				toUpper: false,
				max: 15,
				pattern: /./
			});
		});
	});


	
	describe('can have addons', function() {
		const addonHtml = 'some addon';


		xit('that can be added on the right of the input with positive weight', function(){
			widget.addOn(1, addonHtml);
			const addon = input.parent().siblings('.addon');
			expect(addon.index()).toBe(1); // on right
			expect(addon.is('.first')).toBe(false);
		});

		it('that can be added with a function', function(){
			expect(input.parent().siblings('.addon').length).toBe(0);

			widget.addOn(0,addonHtml);
			const addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(0);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe(addonHtml);
		});
		
		it('that can be added on the left of the input with negative weight', function(){
			widget.addOn(-1,addonHtml);
			const addon = input.parent().siblings('.addon');
			expect(addon.index()).toBe(0); // on left
			expect(addon.is('.first')).toBe(true);
		});


		xit('that can have multiple side-by-side with different weights', function(){
			
			widget.addOn(-10,'left [0]');
			widget.addOn(-5,'left [1]');
			widget.addOn(10,'right [4]');
			widget.addOn(5,'right [3]');

			const items = input.parent().parent().children();

			expect(items.filter('.first').length).toBe(1);

			let addon = items.eq(0);
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
			const customClass = 'customClassName';
			widget.addOn(0,addonHtml, customClass);
			const addon = input.parent().siblings('.addon');
			expect(addon.is('.'+customClass)).toBe(true);
		});

		it('that can be made up of html, rather than just text', function(){
			const customHtml = 'some text <i>with italics</i>';
			widget.addOn(0,customHtml);
			const addon = input.parent().siblings('.addon');
			expect(addon.html()).toBe(customHtml);
			expect(addon.text()).toBe('some text with italics');
			expect(addon.children('i').length).toBe(1);
			expect(addon.children('i').text()).toBe('with italics');
		});

		it('that can be added with attribute data-preinput', function(){
			setup('<input type="text" data-preinput="pre"/>');
			const addon = input.parent().siblings('.addon');
			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(-1);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe('pre');
		});

		xit('that can be added with attribute data-postinput', function(){
			setup('<input type="text" data-postinput="post"/>');
			const addon = input.parent().siblings('.addon');
			expect(addon.length).toBe(1);
			expect(addon.data('weight')).toBe(1);
			expect(addon.is('.field-item')).toBe(true);
			expect(addon.html()).toBe('post');
		});
	});

	

	it('is not .first when placed in an existing group', function() {
		const group = $('<div class="input-field-group"><input type="text"/></div>');
		input = group.find('input');
		widget = Object.create(def);
		widget.element = input;
		widget._create();
		expect(group.find('.first').length).toBe(0);
	});

	xit('can force the input to be .first', function() {
		const group = $('<div class="input-field-group"><input type="text"/></div>');
		input = group.find('input');
		widget = Object.create(def);
		widget.element = input;
		widget._create({
			forceFirst: true
		});

		expect(group.find('.first').length).toBe(1);
		expect(input.parent().is('.first')).toBe(true);
	});



	describe('can have a placeholder', function() {
		const placeholderText = 'some placeholder';

		it('that can be set with a function', function(){
			let placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(0);
			widget.placeholder(placeholderText);
			placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.text()).toBe(placeholderText);
		});

		it('that can be set with an attribute', function(){
			setup('<input type="text" data-placeholder="' + placeholderText + '"/>');
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.text()).toBe(placeholderText);
		});
		
		it('that can be set and then set again', function(){
			widget.placeholder(placeholderText);
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.text()).toBe(placeholderText);
			widget.placeholder('some other placeholder');
			expect(placeholder.text()).toBe('some other placeholder');
		});
		
		it('that is visible at the start', function(){
			widget.placeholder(placeholderText);
			widget.redraw();
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);
		});

		it('that is hidden after a value is set', function(){
			widget.placeholder(placeholderText);
			widget.redraw();
			widget.set('some value');
			widget.redraw();
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder[0].style._values.display).toBe('none');
		});

		it('that is visible after a value has been cleared', function(){
			widget.placeholder(placeholderText);
			widget.redraw();
			widget.set('some value');
			widget.redraw();
			widget.set('');
			widget.redraw();
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder.is(':visible')).toBe(true);
		});

		it('that is hidden after keydown', function(){
			widget.placeholder(placeholderText);
			widget.redraw();
			const placeholder = input.siblings('.placeholder');
			expect(placeholder.length).toBe(1);
			expect(placeholder[0].style._values.display).toNotExist();
			input.keydown();
			expect(placeholder[0].style._values.display).toBe('none');
		});

		it('that is visible after keydown then keyup (no value change)', function(){
			widget.placeholder(placeholderText);
			widget.redraw();
			
			const placeholder = input.siblings('.placeholder');

			expect(placeholder.length).toBe(1);
			expect(placeholder[0].style._values.display).toNotExist();

			input.keydown();
			expect(placeholder[0].style._values.display).toBe('none');

			input.keyup();
			expect(placeholder[0].style._values.display).toNotExist();
		});
	});

	describe('can handle clean or dirty states', function(){
		it('by setting to dirty on change', function(){
			expect(widget.isDirty()).toBe(false);
			input.val('test');
			input.trigger('change');
			expect(widget.isDirty()).toBe(true);
		});

		it('by clearing the dirty state', function(){
			expect(widget.isDirty()).toBe(false);
			input.val('test');
			input.trigger('change');
			expect(widget.isDirty()).toBe(true);
			widget.clearDirty();
			expect(widget.isDirty()).toBe(false);
		});
	});

	xit('that can validate on blur', function(){
		const spy = spyOn(widget, 'validate');
		widget._onBlur();
		expect(spy.calls.length).toBe(1);
		expect(widget.validate()).toBe(true);
	});

	it('can clear its value', function(){
		widget.set('some value');
		expect(input.val()).toBe('some value');
		widget.clear();
		expect(input.val()).toBe('');
	});

	it('can clear its value by setting it with null', function(){
		widget.set('some value');
		expect(input.val()).toBe('some value');
		widget.set();
		expect(input.val()).toBe('');
	});

	it('can get its value', function(){
		const val = 'some value';
		widget.set(val);
		expect(input.val()).toBe(val);
		expect(widget.get()).toBe(val);
	});

	it('can flash its input box', function(){
		const field = widget.getField();
		expect(field.hasClass('flash')).toBe(false);

		widget.flash(1);
		expect(field.hasClass('flash')).toBe(true);

		clock.tick(149);
		expect(field.hasClass('flash')).toBe(true);

		clock.tick(151);
		expect(field.hasClass('flash')).toBe(false);

		clock.tick(999999);
		expect(field.hasClass('flash')).toBe(false);
	});
/*
	xit('can handle conflicts', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		var conflicts;

		var result = {
			key: undefined, 
			vOld: 'test', 
			vNew: 'test'
		};

		input.val('test');
		input.trigger('change');
		expect(ifw.isDirty()).toBe(true);

		conflicts = ifw.conflicts('test');
		expect(conflicts).toEqual(result);

		ifw.clearDirty();

		conflicts = ifw.conflicts('test2');
		expect(conflicts).toEqual(null);

	});

	it('can return a value', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		var spy_set = spyOn(ifw, 'set').and.callThrough();
		var spy_get = spyOn(ifw, 'get').and.callThrough();

		ifw.value('test');

		expect(spy_set).toHaveBeenCalled();
		expect(ifw.get()).toBe('test');

		input.val('test2');

		var result = ifw.value();

		expect(result).toBe('test2');
		expect(spy_get).toHaveBeenCalled(); 

	});

	it('can return if it is empty', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		expect(ifw.isEmpty()).toBe(true);

		input.val('test');

		expect(ifw.isEmpty()).toBe(false);
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
			expect(type).toBe(testType);
		});

		it('that can be set with a function (if the type exists)', function(){
			var input = $('<input type="text"/>').wrap('<div/>').inputField();
			var ifw = input.data('formBuilderInputField');

			ifw.setType(testType);
			expect(ifw.getType()).not.toBe(testType);

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

		describe('including a "disabled" status', function(){
			it('that can be checked', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disabled', true);
				expect(ifw.hasStatus('disabled')).toBe(ifw.isDisabled());
			});

			it('that can be set', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disabled', false);
				ifw.disable();
				expect(ifw.isDisabled()).toBe(true);
			});

			it('that can be unset', function(){
				var input = $('<input type="text">').wrap('<div/>').inputField();
				var ifw = input.data('formBuilderInputField');

				ifw.status('disabled', true);
				ifw.enable();
				expect(ifw.isDisabled()).toBe(false);
			});

		});
	});

	it('can be destroyed', function(done){
		var input = $('<input type="text" data-type="time">').appendTo(testContainer).wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');

		input.trigger('focus');

		pause(triggerWaitTime)
		.then(function(){
			var element = $(document).find('.ui-timepicker-wrapper');

			expect(element.length).toBe(1);

			ifw.destroy();

			return pause(triggerWaitTime);
		})
		.then(function(){

			var element = $(document).find('.ui-timepicker-wrapper');

			expect(element.length).toBe(0);

			testContainer.empty();

			done(); 
		});
	});	
	 * 
	 */
	
});