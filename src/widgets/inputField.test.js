import  '../util/jsdomSetup';
import expect, {spyOn} from 'expect';
import def from './inputField.def.js';
import lolex from 'lolex';
import equals from '../util/equals';
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
		expect(widget._showLayer.calls.length).toBe(3);
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


	it('can return a value', function(){
		
		const spy_set = spyOn(widget, 'set').andCallThrough();
		const spy_get = spyOn(widget, 'get').andCallThrough();

		widget.value('test');

		expect(spy_set).toHaveBeenCalled();
		expect(widget.get()).toBe('test');

		input.val('test2');

		const result = widget.value();

		expect(result).toBe('test2');
		expect(spy_get).toHaveBeenCalled(); 

	});

	it('can return if it is empty', function(){
		expect(widget.isEmpty()).toBe(true);
		input.val('test');
		expect(widget.isEmpty()).toBe(false);
	});

	describe('can have an error message in the input box', function(){
		it('and set it', function(){
			
			
			let overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(0);

			widget.setError({
				message: 'some error'
			});

			overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay[0].style._values.display).toNotExist();
			expect(overlay.text()).toBe('some error');

		});

		it('and clear it', function(){
			widget.setError({
				message: 'some error'
			});
			widget.clearError();

			const overlay = input.siblings('.error-overlay');
			expect(overlay.length).toBe(1);
			expect(overlay[0].style._values.display).toBe('none');
			expect(overlay.text()).toBe('some error');

		});
	});

	describe('can format a value', function(){

		before(() => {
			const testType = {
				converter: {
					toField: function(val){return val + ' to';},
					fromField: function(val){return val + ' from';}
				}
			};
			widget.type = testType;
		});
		
		xit('to prepare it to go in the field', function(){
			
			spyOn(widget.type.converter, 'toField').and.callThrough();

			const ret = widget._formatToField('some val');
			expect(ret).toBe('some val to');
			expect(widget.type.converter.toField).toHaveBeenCalled();
			expect(widget.type.converter.toField).toHaveBeenCalledWith('some val', widget);
		});

		xit('to prepare it for coming from the field', function(){
			
			spyOn(widget.type.converter, 'fromField').and.callThrough();

			const ret = widget._formatFromField('some val');
			expect(ret).toBe('some val from');
			expect(widget.type.converter.fromField).toHaveBeenCalled();
			expect(widget.type.converter.fromField).toHaveBeenCalledWith('some val', widget);
		});
	});

	describe('has a type', function(){
		const testType = {
			someProp: 'someValue'
		};

		it('that it can get', function(){
			widget.type = testType;
			const type = widget.getType();
			expect(type).toBe(testType);
		});

		xit('that can be set with a function (if the type exists)', function(){
			widget.setType(testType);
			expect(widget.getType()).not.toBe(testType);
			widget.setType('utext');
			expect(equals(widget.getType(), $.formBuilder.inputField.types.utext)).toBe(true);
		});

		xit('that be set with an attribute', function(){
			expect(equals(widget.getType(), $.formBuilder.inputField.types.utext)).toBe(true);
		});

		xit('that is "text" by default', function(){
			expect(equals(widget.getType(), $.formBuilder.inputField.types.text)).toBe(true);
		});
	});


	describe('can validate its value', function(){

		it('to be valid (text)', function(){
			expect(widget.validate()).toBe(true);
			widget.set('asdasd');
			expect(widget.validate()).toBe(true);
		});

		it('to be invalid when empty and required', function(){
			setup('<input type="text" data-require="true"/>');
			expect(widget.validate()).toBe(false);
			widget.set('some value');
			expect(widget.validate()).toBe(true);
		});

		it('and sets an error message when found invalid', function(){
			setup('<input type="text" data-require="true"/>');
			spyOn(widget, 'setError');
			expect(widget.validate()).toBe(false);
			expect(widget.setError).toHaveBeenCalled();
			expect(widget.setError).toHaveBeenCalledWith({
				message: 'required'
			});
		});

		it('and clears an error message when found valid', function(){
			setup('<input type="text" data-require="true"/>');
			spyOn(widget, 'clearError');
			expect(widget.validate()).toBe(false);
			widget.set('some value');
			expect(widget.validate()).toBe(true);
			expect(widget.clearError).toHaveBeenCalled();
		});

		

		it('and will attempt to revalidate invalids after typing', function(done){
			clock.uninstall();
			setup('<input type="text" data-require="true"/>');
			expect(widget.validate()).toBe(false);
			spyOn(widget,'validate').andCallThrough();
			input.val('a').keyup(); 

			setTimeout(function () {
				expect(widget.validate).toHaveBeenCalled();
				expect(widget.validate).toHaveBeenCalledWith(true); //skipping required
				expect(widget.validate.calls.length).toBe(1);
				
				input.val('b').keyup(); //type while valid
				setTimeout(function () {
					expect(widget.validate).toHaveBeenCalled();
					expect(widget.validate).toHaveBeenCalledWith(true); //skipping required
					expect(widget.validate.calls.length).toBe(1);

					input.val('c').keyup();
					setTimeout(function () {
						expect(widget.validate).toHaveBeenCalled();
						expect(widget.validate).toHaveBeenCalledWith(true); //skipping required
						expect(widget.validate.calls.length).toBe(1);
						done();
					}, 0);
				}, 0);
			}, 0);
		});
	});

	it('can hide itself', function(){
		const field = widget.getField();
		expect(field[0].style._values.display).toNotExist();
		widget.hide();
		expect(field[0].style._values.display).toBe('none');
	});

	it('can show itself', function(){
		const field = widget.getField();
		expect(field[0].style._values.display).toNotExist();
		widget.hide();
		expect(field[0].style._values.display).toBe('none');
		widget.show();
		expect(field[0].style._values.display).toNotExist();
	});


	describe('can have statuses', function(){

		it('that can be checked', function() {
			setup('<input type="text" data-require="true"/>');
			expect(widget.hasStatus('require')).toBe(true);
		});

		it('that can be updated', function(){
			expect(widget.hasStatus('require')).toBe(true);
			widget.status('require', false);
			expect(widget.hasStatus('require')).toBe(false);
		});

		it('that can be updated (legacy)', function(){
			setup('<input type="text" data-require="true"/>');
			expect(widget.hasStatus('require')).toBe(true);
			widget.updateStatus('require', false);
			expect(widget.hasStatus('require')).toBe(false);
		});

		it('that can update and fire events', function(){
			setup('<input type="text" data-require="true"/>');

			expect(widget.hasStatus('require')).toBe(true);
			widget.status('require', false, true);
			expect(widget.hasStatus('require')).toBe(false);

			expect(widget._trigger).toHaveBeenCalled();
			expect(widget._trigger.calls.length).toBe(1);
			const call = widget._trigger.calls[0];

			expect(call.arguments.length).toBe(3);
			expect(call.arguments[0]).toBe('statusUpdate');
			expect(call.arguments[1]).toBe(null);
			expect(call.arguments[2]).toEqual({
				statusName: 'require',
				value: false
			});

		});

		describe('including a "disabled" status', function(){
			it('that can be checked', function(){
				widget.status('disabled', true);
				expect(widget.hasStatus('disabled')).toBe(widget.isDisabled());
			});

			it('that can be set', function(){
				widget.status('disabled', false);
				widget.disable();
				expect(widget.isDisabled()).toBe(true);
			});

			it('that can be unset', function(){
				widget.status('disabled', true);
				widget.enable();
				expect(widget.isDisabled()).toBe(false);
			});
		});
	});

	it('can be destroyed', function(){
		clock.uninstall();
		let setUp = 0, tearDown = 0;

		const type = {
			setUp: function() {
				setUp++;
			},
			tearDown: function() {
				tearDown++;
			}
		};

		widget.getTypes = () => {
			return {
				text: type
			};
		};

		widget.setType('text');
		expect(setUp).toBe(1);
		expect(tearDown).toBe(0);
		widget._destroy();
		expect(setUp).toBe(1);
		expect(tearDown).toBe(1);
	});	
});