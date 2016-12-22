import '../util/jsdomSetup';
import expect from 'expect';
import def from './selectionField.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('The selectionField widget', () =>  {
	let element, widget, clock, spy;

	//const testContainer = $('<div/>').appendTo(document.body);
	
	const setup = (htmlString, options) => {
		//testContainer.empty();

		//if (testContainerFlag) {
		//	element = $(htmlString).appendTo(testContainer);
		//} else {
		element = $(htmlString);	
		//}

		widget = Object.create(def);
		widget.element = element;
		//widget.options = options || widget.options;
		widget._trigger = expect.createSpy();
		
		if(options){
			widget.options = $.extend({}, widget.options, options);	
		}else{
			widget.options = $.extend({}, widget.options);	
		}
		widget._create();

		spy = {
			clearDirty: expect.spyOn(widget, 'clearDirty').andCallThrough(),
			hasStatus: expect.spyOn(widget, 'hasStatus').andCallThrough(),
			set: expect.spyOn(widget, 'set').andCallThrough(),
			status: expect.spyOn(widget, 'status').andCallThrough(),
			_trigger: expect.spyOn(widget, '_trigger').andCallThrough(),
			selectionField: expect.createSpy($.formBuilder, 'selectionField')
		};
	};

	beforeEach(() => {
		clock = lolex.install();
	});

	afterEach(() => {
		clock.uninstall();
	});

	describe('by default', () => {
		
		beforeEach(() => {
			setup('<input type="checkbox">');
		});

		afterEach(() => {
			widget._destroy();
		});

		describe('set its label', () => {
			it('with a function', () => {
				expect(widget.label).toNotExist();
				expect(element.parent().is('.selection-field')).toBe(true);
				expect(element.siblings().length).toBe(0);

				widget.setLabel('some label');

				expect(widget.label).toExist();
				expect(widget.label.html()).toBe('some label');
				expect(element.parent().is('label')).toBe(true);
				expect(element.siblings().length).toBe(1);
				expect(element.next().is(widget.label)).toBe(true);
			});

			it('with an attribute', () => {
				setup('<input type="checkbox" data-label="some label"/>');
				expect(widget.label).toBeTruthy();
				expect(widget.label.html()).toBe('some label');
				expect(element.parent().is('label')).toBe(true);
				expect(element.siblings().length).toBe(1);
				expect(element.next().is(widget.label)).toBe(true);
			});
		});
		
		it('can get its current dirty state', () => {
			widget.dirty = false;
			expect(widget.isDirty()).toBe(false);

			widget.dirty = true;
			expect(widget.isDirty()).toBe(true);
		});
		
		it('can be hidden', () => {
			setup('<input type="checkbox">', undefined, true);
			expect(widget.field[0].style._values.display).toNotExist();
			widget.hide();
			expect(widget.field[0].style._values.display).toBe('none');
		});

		it('can be shown', () => {
			setup('<input type="checkbox">', undefined, true);
			
			widget.hide();
			expect(widget.field[0].style._values.display).toBe('none');

			widget.show();
			expect(widget.field[0].style._values.display).toNotExist();
		});

		it('can get its field', () => {
			expect(widget.field.is(widget.getField())).toBe(true);
		});

		it('can check if it has a status', () => {
			setup('<input type="checkbox" data-required="true"/>');
			
			expect(widget.options.required).toBe(true);
			expect(widget.hasStatus('require')).toBe(true);
			expect(widget.hasStatus('error')).toBe(false);

			widget.status('error', true);

			expect(widget.hasStatus('error')).toBe(true);
		});

		it('can be disabled', () => {
			widget.disable();
			
			expect(spy.status).toHaveBeenCalledWith('disable', true);
			expect(widget.hasStatus('disable')).toBe(true);
			expect(widget.field.is('.disable')).toBe(true);
		});

		it('can be enabled', () => {
			widget.disable();

			widget.enable();
			expect(spy.status).toHaveBeenCalledWith('disable', false);
			expect(widget.hasStatus('disable')).toBe(false);
			expect(widget.field.is('.disable')).toBe(false);
		});

		it('can check if it is disabled', () => {
			widget.isDisabled();

			expect(spy.hasStatus).toHaveBeenCalledWith('disable');
		});
		
	});

	
	describe('with checkbox elements', () => {
		const baseCheckbox = '<input type="checkbox">';

		beforeEach(() => {
			setup(baseCheckbox);
		});

		afterEach(() => {
			widget._destroy();
			element.remove();
		});

		it('can be created', () => {
			expect(element).toBeTruthy();
			expect(widget).toBeTruthy();

			expect(widget.isRadio).toBe(false);
			expect(element.parent().is('.selection-field')).toBe(true);
			expect(element.parent().parent().is('.selection-field-group')).toBe(true);
			expect(widget.radioGroup).toNotExist();
		});

		it('can clear the selected option', () => {
			expect(element.is(':checked')).toBe(false);

			widget.clear();
			expect(element.is(':checked')).toBe(false);
			expect(spy.set).toHaveBeenCalled(); //nothing

			element.prop('checked', true);

			widget.clear();
			expect(element.is(':checked')).toBe(false);
		});

		it('can check its dirty state', () => {
			expect(widget.dirty).toBe(false);
			expect(widget.field.is('.dirty')).toBe(false);

			widget.checkDirty();
			expect(widget.dirty).toBe(false);
			expect(widget.field.is('.dirty')).toBe(false);

			element.prop('checked', true);
			widget.checkDirty();
			expect(widget.dirty).toBe(true);
			expect(widget.field.is('.dirty')).toBe(true);

			element.prop('checked', false);
			widget.checkDirty();

			clock.tick(310);

			expect(widget.dirty).toBe(false);
			expect(widget.field.is('.dirty')).toBe(false);

			widget.set(true);
			widget.checkDirty();
			expect(element.is(':checked')).toBe(true);
			expect(widget.dirty).toBe(false);
			expect(widget.field.is('.dirty')).toBe(false);

			element.prop('checked', false);
			widget.checkDirty();
			expect(widget.dirty).toBe(true);
			expect(widget.field.is('.dirty')).toBe(true);
		});

		it('can be set using a boolean', () => {
			expect(element.is(':checked')).toBe(false);
			expect(widget.prevValue).toBe(false);

			widget.set(true);
			expect(element.is(':checked')).toBe(true);
			expect(widget.prevValue).toBe(true);
			expect(spy.clearDirty).toHaveBeenCalled();
			expect(spy._trigger).toHaveBeenCalledWith('afterset', null, [true]);
		});

		it('can get its value as a boolean', () => {
			expect(element.is(':checked')).toBe(false);
			expect(widget.get()).toBe(false);

			element.prop('checked', true);

			expect(widget.get()).toBe(true);
		});

		it('can be validated', () => {
			setup('<input type="checkbox">', {required: true});

			expect(element.is(':checked')).toBe(false);

			expect(widget.validate()).toBe(false);
			expect(spy.status).toHaveBeenCalledWith('error', true);
			spy.status.reset();
			
			element.prop('checked', true);

			expect(widget.validate()).toBe(true);
			expect(spy.status).toHaveBeenCalledWith('error', false);
			widget.status.reset();

			element.prop('checked', false);
			widget.options.required = false;
			expect(widget.validate()).toBe(true);
			expect(widget.status).toHaveBeenCalledWith('error', false);
		});

		it('can set its status', () => {
			expect(widget.states.require).toBe(false);
			expect(widget.field.is('.require')).toBe(false);

			widget.status('require', true);
			expect(widget.states.require).toBe(true);
			expect(widget.field.is('.require')).toBe(true);
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'require',
				value: true
			});

			widget._trigger.reset();

			widget.status('require', false);
			expect(widget.states.require).toBe(false);
			expect(widget.field.is('.require')).toBe(false);
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'require',
				value: false
			});

			widget._trigger.reset();

			widget.status('require', false);
			expect(widget.states.require).toBe(false);
			expect(widget.field.is('.require')).toBe(false);
			expect(spy._trigger).toNotHaveBeenCalled();
			
			expect(widget.states.disable).toNotExist();
			expect(widget.field.is('.disable')).toBe(false);
			expect(widget.field.css('pointer-events')).toNotBe('none');

			widget.status('disable', true);
			expect(widget.states.disable).toBe(true);
			expect(widget.field.is('.disable')).toBe(true);
			expect(widget.field.css('pointer-events')).toBe('none');
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'disable',
				value: true
			});
		});
	});
});
