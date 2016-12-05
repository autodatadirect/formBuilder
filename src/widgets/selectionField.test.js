import '../util/jsdomSetup';
import expect from 'expect';
import def from './selectionField.def.js';
import lolex from 'lolex';
import $ from 'jquery';


describe('The selectionField widget', () =>  {
	let element, widget, clock, spy;

	//const testContainer = $('<div/>').appendTo(document.body);
	
	const setup = (htmlString, options, testContainerFlag = false) => {
		//testContainer.empty();

		//if (testContainerFlag) {
		//	element = $(htmlString).appendTo(testContainer);
		//} else {
		element = $(htmlString);	
		//}

		widget = Object.create(def);
		widget.element = element;
		widget.options = options || widget.options;
		widget._trigger = expect.createSpy();
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

	xdescribe('with radio elements', () => {
		const baseRadio = '<input type="radio" name="someRadioGroup"/>';

		const makeRadioGroup = (ignoreWidget) => {
			let radioGroup = $([]), rw1,rw2,rw3;

			// get to at least 3 radios
			while(radioGroup.length < 3) {
				radioGroup = radioGroup.add($('<input type="radio" name="someRadioGroup" value="'+radioGroup.length+'"/>'));
			}
		
			if(!ignoreWidget) {
				rw1 = Object.create(def);
				rw1.element = $(radioGroup[0]);
				rw1.options = {radioGroup: radioGroup};
				rw1._create();

				rw2 = Object.create(def);
				rw2.element = $(radioGroup[1]);
				rw2.options = {radioGroup: radioGroup};
				rw2._create();

				rw3 = Object.create(def);
				rw3.element = $(radioGroup[2]);
				rw3.options = {radioGroup: radioGroup};
				rw3._create();
			}

			return radioGroup;
		};

		beforeEach(() => {
			setup(baseRadio, {radioGroup: makeRadioGroup()});
		});

		afterEach(() => {
			widget._destroy();
			element.remove();
		});

		it('can be created', () => {
			expect(element).toBeTruthy();
			expect(widget).toBeTruthy();

			expect(widget.isRadio).toBe(true);
			expect(element.parent().is('.selection-field')).toBe(true);
			expect(element.parent().parent().is('.selection-field-group')).toBe(true);
			expect(widget.radioGroup).toBeTruthy();
			expect(widget.radioGroup.length).toBe(3);
		});
/*
		xit('can be created as a part of a group', () => {
			// var radio1 = $(baseRadio);
			// var radio2 = $(baseRadio);
			// var widget1, widget2;

			// radio1.selectionField();
			// widget1 = radio1.data('formBuilderSelectionField');
			// widget1.radioGroup = widget1.radioGroup.add(radio2);

			// radio2.selectionField({
			// 	radioGroup: widget1.radioGroup
			// });
			// widget2 = radio2.data('formBuilderSelectionField');

			// expect(radio1.is(':formBuilder-selectionField')).toBe(true);
			// expect(widget1.isRadio).toBe(true);
			// expect(widget1.radioGroup.length).toBe(2);

			// expect(radio2.is(':formBuilder-selectionField')).toBe(true);
			// expect(widget2.isRadio).toBe(true);
			// expect(widget2.radioGroup.length).toBe(2);
		});

		xit('can be created and keep options persistent', () => {
			// var radioGroup = makeRadioGroup(true);
			// var widget = [];
			// var i;

			// // Setup
			// radioGroup.eq(0).selectionField({
			// 	required: true,
			// 	radioGroup: radioGroup
			// });
			// widget.push(radioGroup.eq(0).data('formBuilderSelectionField'));

			// radioGroup.eq(1).selectionField({
			// 	required: false,
			// 	radioGroup: radioGroup
			// });
			// widget.push(radioGroup.eq(1).data('formBuilderSelectionField'));

			// expect(widget[0].options.required).toBe(true);
			// expect(widget[1].options.required).toBe(true);

			// widget[0].options.required = widget[1].options.required = false;

			// radioGroup.eq(2).selectionField({
			// 	required: true,
			// 	radioGroup: radioGroup
			// });
			// widget.push(radioGroup.eq(2).data('formBuilderSelectionField'));

			// expect(widget[0].options.required).toBe(true);
			// expect(widget[1].options.required).toBe(true);
			// expect(widget[2].options.required).toBe(true);
		});
		
		xit('can update the radio group\'s prevValue', () => {
			// var radioGroup = makeRadioGroup();
			// var widget = [];

			// radioGroup.each(function(i) {
			// 	widget.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			// });
			
			// expect(widget.length).toBe(3);

			// expect(widget[0].prevValue).toBe('');
			// expect(widget[1].prevValue).toBe('');
			// expect(widget[2].prevValue).toBe('');

			// // can be done from any in group
			// widget[0]._updatePreviousValue('2');

			// expect(widget[0].prevValue).toBe('2');
			// expect(widget[1].prevValue).toBe('2');
			// expect(widget[2].prevValue).toBe('2');

			// widget[1]._updatePreviousValue('1');

			// expect(widget[0].prevValue).toBe('1');
			// expect(widget[1].prevValue).toBe('1');
			// expect(widget[2].prevValue).toBe('1');
		});

		xit('can check its dirty state', () => {
			// var radioGroup = makeRadioGroup();
			// var widget = [];
			// var checkWaitTime = 310, i;

			// radioGroup.each(function(i) {
			// 	widget.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			// });

			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].dirty).toBe(false);
			// 	expect(widget[i].field.is('.dirty')).toBe(false);
			// }

			// widget[0].checkDirty();
			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].dirty).toBe(false);
			// 	expect(widget[i].field.is('.dirty')).toBe(false);
			// }

			// radioGroup.eq(1).prop('checked', true);
			// widget[0].checkDirty();
			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].dirty).toBe(true);
			// 	expect(widget[i].field.is('.dirty')).toBe(true);
			// }
			
			// radioGroup.eq(1).prop('checked', false);
			// widget[0].checkDirty();
			// pause(checkWaitTime)
			// .then(function() {
			// 	for(i = 0; i < widget.length; ++i) {
			// 		expect(widget[i].dirty).toBe(false);
			// 		expect(widget[i].field.is('.dirty')).toBe(false);
			// 	}

			// 	widget[2].set('0');
			// 	widget[1].checkDirty();
			// 	for(i = 0; i < widget.length; ++i) {
			// 		expect(widget[i].dirty).toBe(false);
			// 		expect(widget[i].field.is('.dirty')).toBe(false);
			// 	}

			// 	radioGroup.eq(0).prop('checked', false);
			// 	widget[1].checkDirty();
			// 	for(i = 0; i < widget.length; ++i) {
			// 		expect(widget[i].dirty).toBe(true);
			// 		expect(widget[i].field.is('.dirty')).toBe(true);
			// 	}

			// 	done();
			// });
		});

		xit('can be set using a value in the radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var widget = [];
			// var i;

			// radioGroup.each(function(index) {
			// 	var radio = $(this);
			// 	widget.push(radio.data('formBuilderSelectionField'));

			// 	expect(radio.prop('checked')).toBe(false);
			// 	expect(widget[index].prevValue).toBe('');
			// });

			// spyOn(widget[0], '_updatePreviousValue').and.callThrough();
			// spyOn(widget[0], 'clearDirty');
			// spyOn(widget[0], '_trigger');

			// expect(radioGroup.eq(2).is(':checked')).toBe(false);

			// widget[0].set('2');
			// expect(radioGroup.eq(2).is(':checked')).toBe(true);
			// expect(widget[0]._updatePreviousValue).toHaveBeenCalled();
			// expect(widget[0].clearDirty).toHaveBeenCalled();
			// expect(widget[0]._trigger).toHaveBeenCalledWith('afterset', null, ['2']);

			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].prevValue).toBe('2');
			// }
		});

		xit('can get its value as a value in the radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var widget = [];
			// var i;

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	widget.push(radio.data('formBuilderSelectionField'));

			// 	expect(radio.prop('checked')).toBe(false);
			// });

			// expect(widget[0].get()).toBeUndefined();

			// radioGroup.eq(2).prop('checked', true);

			// expect(widget[0].get()).toBe('2');
		});
		
		xit('can be validated', () => {
			// var radioGroup = makeRadioGroup(true);
			// var widget = [];

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	radio.selectionField({
			// 		required: true,
			// 		radioGroup: radioGroup
			// 	});
			// 	widget.push(radio.data('formBuilderSelectionField'));
			// });
			
			// spyOn(widget[0], 'status');

			// expect(radioGroup.filter(':checked').length).toBe(0);
			// expect(widget[0].validate()).toBe(false);
			// expect(widget[0].status).toHaveBeenCalledWith('error', true);
			// widget[0].status.calls.reset();


			// radioGroup.eq(1).prop('checked', true);
			// expect(widget[0].validate()).toBe(true);
			// expect(widget[0].status).toHaveBeenCalledWith('error', false);
			// widget[0].status.calls.reset();

			// radioGroup.each(function() {
			// 	$(this).data('formBuilderSelectionField').options.required = false;
			// });

			// radioGroup.eq(1).prop('checked', false);
			// expect(widget[0].validate()).toBe(true);
			// expect(widget[0].status).toHaveBeenCalledWith('error', false);
		});

		xit('can set its status and the statuses of its radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var widget = [];
			// var i;

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	widget.push(radio.data('formBuilderSelectionField'));
			// });

			// spyOn(widget[1], '_trigger');

			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].states.require).toBe(false);
			// 	expect(widget[i].field.is('.require')).toBe(false);
			// }

			// widget[1].status('require', true);
			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].states.require).toBe(true);
			// 	expect(widget[i].field.is('.require')).toBe(true);
			// }
			// expect(widget[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
			// 	statusName: 'require',
			// 	value: true
			// });
			// widget[1]._trigger.calls.reset();

			// widget[1].status('require', false);
			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].states.require).toBe(false);
			// 	expect(widget[i].field.is('.require')).toBe(false);
			// }
			// expect(widget[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
			// 	statusName: 'require',
			// 	value: false
			// });
			// widget[1]._trigger.calls.reset();

			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].states.disable).toBeUndefined();
			// 	expect(widget[i].field.is('.disable')).toBe(false);
			// 	expect(widget[i].field.css('pointer-events')).not.toBe('none');
			// }
			
			// widget[1].status('disable', true);
			// for(i = 0; i < widget.length; ++i) {
			// 	expect(widget[i].states.disable).toBe(true);
			// 	expect(widget[i].field.is('.disable')).toBe(true);
			// 	expect(widget[i].field.css('pointer-events')).toBe('none');
			// }
			// expect(widget[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
			// 	statusName: 'disable',
			// 	value: true
			// });
		});

		xit('can be destroyed', () => {
			// var radioGroup = makeRadioGroup();

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	expect(radio.is(':formBuilder-selectionField')).toBe(true);
			// 	expect(radio.data('formBuilderSelectionField')).toBeDefined();
			// });

			// radioGroup.eq(1).selectionField('destroy');

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	expect(radio.is(':formBuilder-selectionField')).toBe(false);
			// 	expect(radio.data('formBuilderSelectionField')).toBeUndefined();
			// });
		});
		*/
	});
	
});
