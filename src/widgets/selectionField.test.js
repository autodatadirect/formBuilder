import '../util/jsdomSetup';
import expect from 'expect';
import def from './selectionField.def.js';
import lolex from 'lolex';
import $ from 'jquery';


xdescribe('The selectionField widget', () =>  {
	let sfp, sfw, clock, spy;

	const testContainer = $('<div/>').appendTo(document.body);
	
	const setup = (htmlString, options, testContainerFlag = false) => {
		testContainer.empty();

		if (testContainerFlag) {
			sfp = $(htmlString).appendTo(testContainer);
		} else {
			sfp = $(htmlString);	
		}

		sfw = Object.create(def);
		sfw.element = sfp;
		sfw.options = options || sfw.options;
		sfw._trigger = expect.createSpy();
		sfw._create();

		spy = {
			clearDirty: expect.spyOn(sfw, 'clearDirty').andCallThrough(),
			hasStatus: expect.spyOn(sfw, 'hasStatus').andCallThrough(),
			set: expect.spyOn(sfw, 'set').andCallThrough(),
			status: expect.spyOn(sfw, 'status').andCallThrough(),
			_trigger: expect.spyOn(sfw, '_trigger').andCallThrough(),
			selectionField: expect.spyOn($.formBuilder, 'selectionField')
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
			sfw._destroy();
			sfp.remove();
		});

		describe('set its label', () => {
			it('with a function', () => {
				expect(sfw.label).toNotExist();
				expect(sfp.parent().is('.selection-field')).toBe(true);
				expect(sfp.siblings().length).toBe(0);

				sfw.setLabel('some label');

				expect(sfw.label).toExist();
				expect(sfw.label.html()).toBe('some label');
				expect(sfp.parent().is('label')).toBe(true);
				expect(sfp.siblings().length).toBe(1);
				expect(sfp.next().is(sfw.label)).toBe(true);
			});

			it('with an attribute', () => {
				setup('<input type="checkbox" data-label="some label"/>');

				expect(sfw.label).toBeTruthy();
				expect(sfw.label.html()).toBe('some label');
				expect(sfp.parent().is('label')).toBe(true);
				expect(sfp.siblings().length).toBe(1);
				expect(sfp.next().is(sfw.label)).toBe(true);
			});
		});

		it('can get its current dirty state', () => {
			sfw.dirty = false;
			expect(sfw.isDirty()).toBe(false);

			sfw.dirty = true;
			expect(sfw.isDirty()).toBe(true);
		});
		
		it('can be hidden', () => {
			setup('<input type="checkbox">', undefined, true);
			expect(sfw.field[0].style._values.display).toNotExist();

			sfw.hide();
			
			expect(sfw.field[0].style._values.display).toBe('none');
			testContainer.empty();
		});

		it('can be shown', () => {
			setup('<input type="checkbox">', undefined, true);
			
			sfw.hide();
			expect(sfw.field[0].style._values.display).toBe('none');

			sfw.show();
			expect(sfw.field[0].style._values.display).toNotExist();

			testContainer.empty();
		});

		it('can get its field', () => {
			expect(sfw.field.is(sfw.getField())).toBe(true);
		});

		// Ask what's happening here/come back and trace this one
		it('can check if it has a status', () => {
			setup('<input type="checkbox" data-required="true"/>');
			
			expect(sfw.options.required).toBe(true);
			expect(sfw.hasStatus('require')).toBe(true);
			expect(sfw.hasStatus('error')).toBe(false);

			sfw.status('error', true);

			expect(sfw.hasStatus('error')).toBe(true);
		});

		it('can be disabled', () => {
			sfw.disable();
			
			expect(spy.status).toHaveBeenCalledWith('disable', true);
			expect(sfw.hasStatus('disable')).toBe(true);
			expect(sfw.field.is('.disable')).toBe(true);
		});

		it('can be enabled', () => {
			sfw.disable();

			sfw.enable();
			expect(spy.status).toHaveBeenCalledWith('disable', false);
			expect(sfw.hasStatus('disable')).toBe(false);
			expect(sfw.field.is('.disable')).toBe(false);
		});

		it('can check if it is disabled', () => {
			sfw.isDisabled();

			expect(spy.hasStatus).toHaveBeenCalledWith('disable');
		});

		xit('can check for conflicts', () => {
		
		});
	});

	describe('with checkbox elements', () => {
		const baseCheckbox = '<input type="checkbox">';

		beforeEach(() => {
			setup(baseCheckbox);
		});

		afterEach(() => {
			sfw._destroy();
			sfp.remove();
		});

		it('can be created', () => {
			expect(sfp).toBeTruthy();
			expect(sfw).toBeTruthy();

			expect(sfw.isRadio).toBe(false);
			expect(sfp.parent().is('.selection-field')).toBe(true);
			expect(sfp.parent().parent().is('.selection-field-group')).toBe(true);
			expect(sfw.radioGroup).toNotExist();
		});

		it('can clear the selected option', () => {
			expect(sfp.is(':checked')).toBe(false);

			sfw.clear();
			expect(sfp.is(':checked')).toBe(false);
			expect(spy.set).toHaveBeenCalled(); //nothing

			sfp.prop('checked', true);

			sfw.clear();
			expect(sfp.is(':checked')).toBe(false);
		});

		it('can check its dirty state', () => {
			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			sfw.checkDirty();
			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			sfp.prop('checked', true);
			sfw.checkDirty();
			expect(sfw.dirty).toBe(true);
			expect(sfw.field.is('.dirty')).toBe(true);

			sfp.prop('checked', false);
			sfw.checkDirty();

			clock.tick(310);

			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			sfw.set(true);
			sfw.checkDirty();
			expect(sfp.is(':checked')).toBe(true);
			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			sfp.prop('checked', false);
			sfw.checkDirty();
			expect(sfw.dirty).toBe(true);
			expect(sfw.field.is('.dirty')).toBe(true);
		});

		it('can be set using a boolean', () => {
			expect(sfp.is(':checked')).toBe(false);
			expect(sfw.prevValue).toBe(false);

			sfw.set(true);
			expect(sfp.is(':checked')).toBe(true);
			expect(sfw.prevValue).toBe(true);
			expect(spy.clearDirty).toHaveBeenCalled();
			expect(spy._trigger).toHaveBeenCalledWith('afterset', null, [true]);
		});

		it('can get its value as a boolean', () => {
			expect(sfp.is(':checked')).toBe(false);
			expect(sfw.get()).toBe(false);

			sfp.prop('checked', true);

			expect(sfw.get()).toBe(true);
		});

		it('can be validated', () => {
			setup('<input type="checkbox">', {required: true});

			expect(sfp.is(':checked')).toBe(false);

			expect(sfw.validate()).toBe(false);
			expect(spy.status).toHaveBeenCalledWith('error', true);
			spy.status.reset();
			
			sfp.prop('checked', true);

			expect(sfw.validate()).toBe(true);
			expect(spy.status).toHaveBeenCalledWith('error', false);
			sfw.status.reset();

			sfp.prop('checked', false);
			sfw.options.required = false;
			expect(sfw.validate()).toBe(true);
			expect(sfw.status).toHaveBeenCalledWith('error', false);
		});

		it('can set its status', () => {
			expect(sfw.states.require).toBe(false);
			expect(sfw.field.is('.require')).toBe(false);

			sfw.status('require', true);
			expect(sfw.states.require).toBe(true);
			expect(sfw.field.is('.require')).toBe(true);
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'require',
				value: true
			});

			sfw._trigger.reset();

			sfw.status('require', false);
			expect(sfw.states.require).toBe(false);
			expect(sfw.field.is('.require')).toBe(false);
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'require',
				value: false
			});

			sfw._trigger.reset();

			sfw.status('require', false);
			expect(sfw.states.require).toBe(false);
			expect(sfw.field.is('.require')).toBe(false);
			expect(spy._trigger).toNotHaveBeenCalled();
			
			expect(sfw.states.disable).toNotExist();
			expect(sfw.field.is('.disable')).toBe(false);
			expect(sfw.field.css('pointer-events')).toNotBe('none');

			sfw.status('disable', true);
			expect(sfw.states.disable).toBe(true);
			expect(sfw.field.is('.disable')).toBe(true);
			expect(sfw.field.css('pointer-events')).toBe('none');
			expect(spy._trigger).toHaveBeenCalledWith('statusUpdate', null, {
				statusName: 'disable',
				value: true
			});
		});

		it('can be destroyed', () => {
			
			// JASMINE 
			
			// var checkbox = $(baseCheckbox).selectionField();
			// var sfw = checkbox.data('formBuilderSelectionField');

			// expect(checkbox.is(':formBuilder-selectionField')).toBe(true);
			// expect(checkbox.data('formBuilderSelectionField')).toBeDefined();

			// checkbox.selectionField('destroy');

			// expect(checkbox.is(':formBuilder-selectionField')).toBe(false);
			// expect(checkbox.data('formBuilderSelectionField')).toBeUndefined();
			
			//////////////////////////////////////////////////////////////////

			// MOCHA 
			// console.log(sfw.field[0].style);
			// expect(sfw.field[0].style._values.display).toBe('none');
			// expect(sfp.toBeTruthy();
			// expect(sfp.data('formBuilderSelectionField')).toBeDefined();

			// sfw.selectionField('destroy');
			// console.log(sfw.field[0].style);
			// expect(checkbox.is(':formBuilder-selectionField')).toBe(false);
			// expect(checkbox.data('formBuilderSelectionField')).toBeUndefined();
		});
	});

	describe('with radio elements', () => {
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
			sfw._destroy();
			sfp.remove();
		});

		it('can be created', () => {
			expect(sfp).toBeTruthy();
			expect(sfw).toBeTruthy();

			expect(sfw.isRadio).toBe(true);
			expect(sfp.parent().is('.selection-field')).toBe(true);
			expect(sfp.parent().parent().is('.selection-field-group')).toBe(true);
			expect(sfw.radioGroup).toBeTruthy();
			expect(sfw.radioGroup.length).toBe(3);
		});

		xit('can be created as a part of a group', () => {
			// var radio1 = $(baseRadio);
			// var radio2 = $(baseRadio);
			// var sfw1, sfw2;

			// radio1.selectionField();
			// sfw1 = radio1.data('formBuilderSelectionField');
			// sfw1.radioGroup = sfw1.radioGroup.add(radio2);

			// radio2.selectionField({
			// 	radioGroup: sfw1.radioGroup
			// });
			// sfw2 = radio2.data('formBuilderSelectionField');

			// expect(radio1.is(':formBuilder-selectionField')).toBe(true);
			// expect(sfw1.isRadio).toBe(true);
			// expect(sfw1.radioGroup.length).toBe(2);

			// expect(radio2.is(':formBuilder-selectionField')).toBe(true);
			// expect(sfw2.isRadio).toBe(true);
			// expect(sfw2.radioGroup.length).toBe(2);
		});

		xit('can be created and keep options persistent', () => {
			// var radioGroup = makeRadioGroup(true);
			// var sfw = [];
			// var i;

			// // Setup
			// radioGroup.eq(0).selectionField({
			// 	required: true,
			// 	radioGroup: radioGroup
			// });
			// sfw.push(radioGroup.eq(0).data('formBuilderSelectionField'));

			// radioGroup.eq(1).selectionField({
			// 	required: false,
			// 	radioGroup: radioGroup
			// });
			// sfw.push(radioGroup.eq(1).data('formBuilderSelectionField'));

			// expect(sfw[0].options.required).toBe(true);
			// expect(sfw[1].options.required).toBe(true);

			// sfw[0].options.required = sfw[1].options.required = false;

			// radioGroup.eq(2).selectionField({
			// 	required: true,
			// 	radioGroup: radioGroup
			// });
			// sfw.push(radioGroup.eq(2).data('formBuilderSelectionField'));

			// expect(sfw[0].options.required).toBe(true);
			// expect(sfw[1].options.required).toBe(true);
			// expect(sfw[2].options.required).toBe(true);
		});
		
		xit('can update the radio group\'s prevValue', () => {
			// var radioGroup = makeRadioGroup();
			// var sfw = [];

			// radioGroup.each(function(i) {
			// 	sfw.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			// });
			
			// expect(sfw.length).toBe(3);

			// expect(sfw[0].prevValue).toBe('');
			// expect(sfw[1].prevValue).toBe('');
			// expect(sfw[2].prevValue).toBe('');

			// // can be done from any in group
			// sfw[0]._updatePreviousValue('2');

			// expect(sfw[0].prevValue).toBe('2');
			// expect(sfw[1].prevValue).toBe('2');
			// expect(sfw[2].prevValue).toBe('2');

			// sfw[1]._updatePreviousValue('1');

			// expect(sfw[0].prevValue).toBe('1');
			// expect(sfw[1].prevValue).toBe('1');
			// expect(sfw[2].prevValue).toBe('1');
		});

		xit('can check its dirty state', () => {
			// var radioGroup = makeRadioGroup();
			// var sfw = [];
			// var checkWaitTime = 310, i;

			// radioGroup.each(function(i) {
			// 	sfw.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			// });

			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].dirty).toBe(false);
			// 	expect(sfw[i].field.is('.dirty')).toBe(false);
			// }

			// sfw[0].checkDirty();
			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].dirty).toBe(false);
			// 	expect(sfw[i].field.is('.dirty')).toBe(false);
			// }

			// radioGroup.eq(1).prop('checked', true);
			// sfw[0].checkDirty();
			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].dirty).toBe(true);
			// 	expect(sfw[i].field.is('.dirty')).toBe(true);
			// }
			
			// radioGroup.eq(1).prop('checked', false);
			// sfw[0].checkDirty();
			// pause(checkWaitTime)
			// .then(function() {
			// 	for(i = 0; i < sfw.length; ++i) {
			// 		expect(sfw[i].dirty).toBe(false);
			// 		expect(sfw[i].field.is('.dirty')).toBe(false);
			// 	}

			// 	sfw[2].set('0');
			// 	sfw[1].checkDirty();
			// 	for(i = 0; i < sfw.length; ++i) {
			// 		expect(sfw[i].dirty).toBe(false);
			// 		expect(sfw[i].field.is('.dirty')).toBe(false);
			// 	}

			// 	radioGroup.eq(0).prop('checked', false);
			// 	sfw[1].checkDirty();
			// 	for(i = 0; i < sfw.length; ++i) {
			// 		expect(sfw[i].dirty).toBe(true);
			// 		expect(sfw[i].field.is('.dirty')).toBe(true);
			// 	}

			// 	done();
			// });
		});

		xit('can be set using a value in the radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var sfw = [];
			// var i;

			// radioGroup.each(function(index) {
			// 	var radio = $(this);
			// 	sfw.push(radio.data('formBuilderSelectionField'));

			// 	expect(radio.prop('checked')).toBe(false);
			// 	expect(sfw[index].prevValue).toBe('');
			// });

			// spyOn(sfw[0], '_updatePreviousValue').and.callThrough();
			// spyOn(sfw[0], 'clearDirty');
			// spyOn(sfw[0], '_trigger');

			// expect(radioGroup.eq(2).is(':checked')).toBe(false);

			// sfw[0].set('2');
			// expect(radioGroup.eq(2).is(':checked')).toBe(true);
			// expect(sfw[0]._updatePreviousValue).toHaveBeenCalled();
			// expect(sfw[0].clearDirty).toHaveBeenCalled();
			// expect(sfw[0]._trigger).toHaveBeenCalledWith('afterset', null, ['2']);

			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].prevValue).toBe('2');
			// }
		});

		xit('can get its value as a value in the radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var sfw = [];
			// var i;

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	sfw.push(radio.data('formBuilderSelectionField'));

			// 	expect(radio.prop('checked')).toBe(false);
			// });

			// expect(sfw[0].get()).toBeUndefined();

			// radioGroup.eq(2).prop('checked', true);

			// expect(sfw[0].get()).toBe('2');
		});
		
		xit('can be validated', () => {
			// var radioGroup = makeRadioGroup(true);
			// var sfw = [];

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	radio.selectionField({
			// 		required: true,
			// 		radioGroup: radioGroup
			// 	});
			// 	sfw.push(radio.data('formBuilderSelectionField'));
			// });
			
			// spyOn(sfw[0], 'status');

			// expect(radioGroup.filter(':checked').length).toBe(0);
			// expect(sfw[0].validate()).toBe(false);
			// expect(sfw[0].status).toHaveBeenCalledWith('error', true);
			// sfw[0].status.calls.reset();


			// radioGroup.eq(1).prop('checked', true);
			// expect(sfw[0].validate()).toBe(true);
			// expect(sfw[0].status).toHaveBeenCalledWith('error', false);
			// sfw[0].status.calls.reset();

			// radioGroup.each(function() {
			// 	$(this).data('formBuilderSelectionField').options.required = false;
			// });

			// radioGroup.eq(1).prop('checked', false);
			// expect(sfw[0].validate()).toBe(true);
			// expect(sfw[0].status).toHaveBeenCalledWith('error', false);
		});

		xit('can set its status and the statuses of its radio group', () => {
			// var radioGroup = makeRadioGroup();
			// var sfw = [];
			// var i;

			// radioGroup.each(function() {
			// 	var radio = $(this);
			// 	sfw.push(radio.data('formBuilderSelectionField'));
			// });

			// spyOn(sfw[1], '_trigger');

			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].states.require).toBe(false);
			// 	expect(sfw[i].field.is('.require')).toBe(false);
			// }

			// sfw[1].status('require', true);
			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].states.require).toBe(true);
			// 	expect(sfw[i].field.is('.require')).toBe(true);
			// }
			// expect(sfw[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
			// 	statusName: 'require',
			// 	value: true
			// });
			// sfw[1]._trigger.calls.reset();

			// sfw[1].status('require', false);
			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].states.require).toBe(false);
			// 	expect(sfw[i].field.is('.require')).toBe(false);
			// }
			// expect(sfw[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
			// 	statusName: 'require',
			// 	value: false
			// });
			// sfw[1]._trigger.calls.reset();

			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].states.disable).toBeUndefined();
			// 	expect(sfw[i].field.is('.disable')).toBe(false);
			// 	expect(sfw[i].field.css('pointer-events')).not.toBe('none');
			// }
			
			// sfw[1].status('disable', true);
			// for(i = 0; i < sfw.length; ++i) {
			// 	expect(sfw[i].states.disable).toBe(true);
			// 	expect(sfw[i].field.is('.disable')).toBe(true);
			// 	expect(sfw[i].field.css('pointer-events')).toBe('none');
			// }
			// expect(sfw[1]._trigger).toHaveBeenCalledWith('statusUpdate', null, {
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
	});
});
