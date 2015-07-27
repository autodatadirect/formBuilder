/** 
 * Testing the selectionField
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/
'use strict';

describe('The selectionField widget', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	var baseCheckbox = '<input type="checkbox">';
	var baseRadio = '<input type="radio" name="someRadioGroup"/>';

	var makeRadioGroup = function() {
		var radioGroup = $([]);

		// get to at least 3 radios
		while(radioGroup.length < 3) {
			radioGroup = radioGroup.add($('<input type="radio" name="someRadioGroup" value="'+radioGroup.length+'"/>'));
		}

		radioGroup.each(function() { 
			$(this).selectionField({
				radioGroup: radioGroup
			});
		});

		return radioGroup;
	};

	
	describe('can be created', function() {
		it('(checkbox)', function() {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			expect(checkbox.is(':formBuilder-selectionField')).toBe(true);
			expect(sfw).toBeDefined();
			expect(sfw.isRadio).toBe(false);
			expect(checkbox.parent().is('.selection-field')).toBe(true);
			expect(checkbox.parent().parent().is('.selection-field-group')).toBe(true);
			expect(sfw.radioGroup).toBeUndefined();
		});

		it('(radio)', function() {
			var radio = $(baseRadio).selectionField();
			var sfw = radio.data('formBuilderSelectionField');

			expect(radio.is(':formBuilder-selectionField')).toBe(true);
			expect(sfw).toBeDefined();
			expect(sfw.isRadio).toBe(true);
			expect(radio.parent().is('.selection-field')).toBe(true);
			expect(radio.parent().parent().is('.selection-field-group')).toBe(true);
			expect(sfw.radioGroup).toBeDefined();
			expect(sfw.radioGroup.length).toBe(1);
		});

		it('(radio) as a part of a group', function() {
			var radio1 = $(baseRadio);
			var radio2 = $(baseRadio);
			var sfw1, sfw2;

			radio1.selectionField();
			sfw1 = radio1.data('formBuilderSelectionField');
			sfw1.radioGroup = sfw1.radioGroup.add(radio2);

			radio2.selectionField({
				radioGroup: sfw1.radioGroup
			});
			sfw2 = radio2.data('formBuilderSelectionField');

			expect(radio1.is(':formBuilder-selectionField')).toBe(true);
			expect(sfw1.isRadio).toBe(true);
			expect(sfw1.radioGroup.length).toBe(2);

			expect(radio2.is(':formBuilder-selectionField')).toBe(true);
			expect(sfw2.isRadio).toBe(true);
			expect(sfw2.radioGroup.length).toBe(2);
		});
	});

	describe('can set its label', function() {
		it('with a function', function() {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			expect(sfw.label).toBeUndefined();
			expect(checkbox.parent().is('.selection-field')).toBe(true);
			expect(checkbox.siblings().length).toBe(0);

			sfw.setLabel('some label');

			expect(sfw.label).toBeDefined();
			expect(sfw.label.html()).toBe('some label');
			expect(checkbox.parent().is('label')).toBe(true);
			expect(checkbox.siblings().length).toBe(1);
			expect(checkbox.next().is(sfw.label)).toBe(true);
		});

		it('with an attribute', function() {
			var checkbox = $('<input type="checkbox" data-label="some label"/>').selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			expect(sfw.label).toBeDefined();
			expect(sfw.label.html()).toBe('some label');
			expect(checkbox.parent().is('label')).toBe(true);
			expect(checkbox.siblings().length).toBe(1);
			expect(checkbox.next().is(sfw.label)).toBe(true);
		});
	});

	it('(radio) can update the radio group\'s prevValue', function() {
		var radioGroup = makeRadioGroup();
		var sfw = [];

		radioGroup.each(function(i) {
			sfw.push(radioGroup.eq(i).data('formBuilderSelectionField'));
		});
		
		expect(sfw.length).toBe(3);

		expect(sfw[0].prevValue).toBeUndefined();
		expect(sfw[1].prevValue).toBeUndefined();
		expect(sfw[2].prevValue).toBeUndefined();

		// can be done from any in group
		sfw[0]._updatePreviousValue('2');

		expect(sfw[0].prevValue).toBe('2');
		expect(sfw[1].prevValue).toBe('2');
		expect(sfw[2].prevValue).toBe('2');

		sfw[1]._updatePreviousValue('1');

		expect(sfw[0].prevValue).toBe('1');
		expect(sfw[1].prevValue).toBe('1');
		expect(sfw[2].prevValue).toBe('1');
	});

	describe('can check its dirty state', function() {
		it('(checkbox)', function(done) {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');
			var checkWaitTime = 310;

			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			sfw.checkDirty();
			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('.dirty')).toBe(false);

			checkbox.prop('checked', true);
			sfw.checkDirty();
			expect(sfw.dirty).toBe(true);
			expect(sfw.field.is('.dirty')).toBe(true);

			checkbox.prop('checked', false);
			sfw.checkDirty();
			pause(checkWaitTime)
			.then(function() {
				expect(sfw.dirty).toBe(false);
				expect(sfw.field.is('.dirty')).toBe(false);

				sfw.set(true);
				sfw.checkDirty();
				expect(checkbox.is(':checked')).toBe(true);
				expect(sfw.dirty).toBe(false);
				expect(sfw.field.is('.dirty')).toBe(false);

				checkbox.prop('checked', false);
				sfw.checkDirty();
				expect(sfw.dirty).toBe(true);
				expect(sfw.field.is('.dirty')).toBe(true);

				done();
			});


	
		});

		it('(radio)', function(done) {
			var radioGroup = makeRadioGroup();
			var sfw = [];
			var checkWaitTime = 310, i;

			radioGroup.each(function(i) {
				sfw.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			});

			for(i = 0; i < sfw.length; ++i) {
				expect(sfw[i].dirty).toBe(false);
				expect(sfw[i].field.is('.dirty')).toBe(false);
			}

			sfw[0].checkDirty();
			for(i = 0; i < sfw.length; ++i) {
				expect(sfw[i].dirty).toBe(false);
				expect(sfw[i].field.is('.dirty')).toBe(false);
			}

			radioGroup.eq(1).prop('checked', true);
			sfw[0].checkDirty();
			for(i = 0; i < sfw.length; ++i) {
				expect(sfw[i].dirty).toBe(true);
				expect(sfw[i].field.is('.dirty')).toBe(true);
			}
			
			radioGroup.eq(1).prop('checked', false);
			sfw[0].checkDirty();
			pause(checkWaitTime)
			.then(function() {
				for(i = 0; i < sfw.length; ++i) {
					expect(sfw[i].dirty).toBe(false);
					expect(sfw[i].field.is('.dirty')).toBe(false);
				}

				sfw[2].set('0');
				sfw[1].checkDirty();
				for(i = 0; i < sfw.length; ++i) {
					expect(sfw[i].dirty).toBe(false);
					expect(sfw[i].field.is('.dirty')).toBe(false);
				}

				radioGroup.eq(0).prop('checked', false);
				sfw[1].checkDirty();
				for(i = 0; i < sfw.length; ++i) {
					expect(sfw[i].dirty).toBe(true);
					expect(sfw[i].field.is('.dirty')).toBe(true);
				}

				done();
			});
		});
	});

	it('can get its current dirty state', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		sfw.dirty = false;
		expect(sfw.isDirty()).toBe(false);

		sfw.dirty = true;
		expect(sfw.isDirty()).toBe(true);
	});

	it('can clear the selected option', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		spyOn(sfw, 'set').and.callThrough();

		expect(checkbox.is(':checked')).toBe(false);

		sfw.clear();
		expect(checkbox.is(':checked')).toBe(false);
		expect(sfw.set).toHaveBeenCalled();
		expect(sfw.set).toHaveBeenCalledWith(); //nothing

		checkbox.prop('checked', true);

		sfw.clear();
		expect(checkbox.is(':checked')).toBe(false);
	});

	describe('can clear its current dirty state', function() {
		it('(checkbox)', function() {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			spyOn(sfw,'_trigger');
			sfw.dirty = true;
			sfw.field.addClass('dirty');

			sfw.clearDirty();

			expect(sfw.dirty).toBe(false);
			expect(sfw.field.is('dirty')).toBe(false);
			expect(sfw._trigger).toHaveBeenCalled();
			expect(sfw._trigger).toHaveBeenCalledWith('clean');
		});

		it('(radio)', function() {
			var radioGroup = makeRadioGroup();
			var sfw = [];
			var i;

			radioGroup.each(function(i) {
				sfw.push(radioGroup.eq(i).data('formBuilderSelectionField'));
			});

			// start them out dirty
			for(i = 0; i < sfw.length; ++i) {
				sfw[i].dirty = true;
				sfw[i].field.addClass('dirty');
			}

			sfw[0].clearDirty();

			for(i = 0; i < sfw.length; ++i) {
				expect(sfw[i].dirty).toBe(false);
				expect(sfw[i].field.is('.dirty')).toBe(false);
			}

		});
	});

	xit('can check for conflicts', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');
	});

	describe('can be set', function() {
		it('(checkbox) using a boolean', function() {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			spyOn(sfw, 'clearDirty');
			spyOn(sfw, '_trigger');

			expect(checkbox.is(':checked')).toBe(false);
			expect(sfw.prevValue).toBe(false);

			sfw.set(true);
			expect(checkbox.is(':checked')).toBe(true);
			expect(sfw.prevValue).toBe(true);
			expect(sfw.clearDirty).toHaveBeenCalled();
			expect(sfw._trigger).toHaveBeenCalled();
			expect(sfw._trigger).toHaveBeenCalledWith('afterset', null, [true]);
		});

		it('(radio) using a value in the radio group', function() {
			var radioGroup = makeRadioGroup();
			var sfw = [];
			var i;

			radioGroup.each(function(index) {
				var radio = $(this);
				sfw.push(radio.data('formBuilderSelectionField'));

				expect(radio.prop('checked')).toBe(false);
				expect(sfw[index].prevValue).toBeUndefined();
			});

			spyOn(sfw[0], '_updatePreviousValue').and.callThrough();
			spyOn(sfw[0], 'clearDirty');
			spyOn(sfw[0], '_trigger');

			expect(radioGroup.eq(2).is(':checked')).toBe(false);

			sfw[0].set('2');
			expect(radioGroup.eq(2).is(':checked')).toBe(true);
			expect(sfw[0]._updatePreviousValue).toHaveBeenCalled();
			expect(sfw[0].clearDirty).toHaveBeenCalled();
			expect(sfw[0]._trigger).toHaveBeenCalled();
			expect(sfw[0]._trigger).toHaveBeenCalledWith('afterset', null, ['2']);

			for(i = 0; i < sfw.length; ++i) {
				expect(sfw[i].prevValue).toBe('2');
			}

		});
	});

	describe('can get its value', function() {
		it('(checkbox) as a boolean', function() {
			var checkbox = $(baseCheckbox).selectionField();
			var sfw = checkbox.data('formBuilderSelectionField');

			expect(checkbox.is(':checked')).toBe(false);
			expect(sfw.get()).toBe(false);

			checkbox.prop('checked', true);

			expect(sfw.get()).toBe(true);
		});

		it('(radio) as a value in the radio group', function() {
			var radioGroup = makeRadioGroup();
			var sfw = [];
			var i;

			radioGroup.each(function() {
				var radio = $(this);
				sfw.push(radio.data('formBuilderSelectionField'));

				expect(radio.prop('checked')).toBe(false);
			});

			expect(sfw[0].get()).toBeUndefined();

			radioGroup.eq(2).prop('checked', true);

			expect(sfw[0].get()).toBe('2');
			
		});
	});

	describe('can be validated', function() {
		it('(checkbox)');

		it('(radio)');
	});

	
	it('can be hidden', function() {
		var checkbox = $(baseCheckbox).appendTo(testContainer).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		expect(sfw.field.is(':visible')).toBe(true);

		sfw.hide();
		expect(sfw.field.is(':visible')).toBe(false);

		testContainer.empty();
	});

	it('can be shown', function() {
		var checkbox = $(baseCheckbox).appendTo(testContainer).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		sfw.hide();
		expect(sfw.field.is(':visible')).toBe(false);

		sfw.show();
		expect(sfw.field.is(':visible')).toBe(true);

		testContainer.empty();
	});

	it('can get its field', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		expect(sfw.field.is(sfw.getField())).toBe(true);
	});

	describe('can set its status', function() {
		it('(checkbox)');

		it('(radio) and the statuses of its radio group');
	});

	it('can check if it has a status');

	it('can be disabled', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		spyOn(sfw, 'status').and.callThrough();

		sfw.disable();
		expect(sfw.status).toHaveBeenCalled();
		expect(sfw.status).toHaveBeenCalledWith('disable', true);
		expect(sfw.hasStatus('disable')).toBe(true);
		expect(sfw.field.is('.disable')).toBe(true);
	});

	it('can be enabled', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		sfw.disable();

		spyOn(sfw, 'status').and.callThrough();

		sfw.enable();
		expect(sfw.status).toHaveBeenCalled();
		expect(sfw.status).toHaveBeenCalledWith('disable', false);
		expect(sfw.hasStatus('disable')).toBe(false);
		expect(sfw.field.is('.disable')).toBe(false);
	});

	it('can check if it is disabled', function() {
		var checkbox = $(baseCheckbox).selectionField();
		var sfw = checkbox.data('formBuilderSelectionField');

		spyOn(sfw, 'hasStatus');

		sfw.isDisabled();
		expect(sfw.hasStatus).toHaveBeenCalled();
		expect(sfw.hasStatus).toHaveBeenCalledWith('disable');
	});

	describe('can be destroyed', function() {
		it('(checkbox)');

		it('(radio)');
	});
});