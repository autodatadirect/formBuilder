/**
 * Testing dateTime data-type
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('The dateTime data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'dateTime';
	var type = $.add123.inputField.types[typeName];

	it('can be created with placeholders', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();	
		var ifw = input.data('add123InputField');

		expect(input.parent().parent().parent().children().children().eq(0).is('.input-field.undefined.require')).toBe(true);
		expect(input.parent().parent().parent().children().children().eq(0).children().children().eq(0).children().eq(1).text()).toBe('MM/DD/YYYY');
		expect(input.parent().parent().parent().children().children().eq(2).is('.input-field.undefined.require')).toBe(true);
		expect(input.parent().parent().parent().children().children().eq(2).children().children().eq(0).children().eq(1).text()).toBe('H:MMam/pm');
	});

	describe('has datepicker and time picker widgets', function(){
		it('that can be opened on focus', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var datepicker;

			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);

			expect(time_pick.is('.ui-timepicker-input')).toBe(true);
			expect(time_pick.siblings().length).toBe(1);

			datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
			expect(datepicker.is(':visible')).toBe(false);

			time_pick.focus();
			date_pick.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(time_pick.siblings().length).toBe(2);
				expect(time_pick.siblings().eq(1).is('.ui-timepicker-wrapper')).toBe(true);
				expect(time_pick.siblings().eq(1).css('display')).toBe('block');

				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);
				
				testContainer.empty();
				done();
			});
		});

		it('and can select a date', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var dateWidget = ifw.getType().dateWidget;
			var datepicker;

			expect(ifw.get()).toBe('');

			dateWidget.focus();
			pause(triggerWaitTime)
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);

				var day = datepicker.find('.day').eq(0);

				expect(dateWidget.inputField('isEmpty')).toBe(true);
				day.click(); 
				return pause(triggerWaitTime);
			})
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.is(':visible')).toBe(false);

				// The placeholder should no longer be visible now there is data in the field
				expect(dateWidget.inputField('isEmpty')).toBe(false);

				// testContainer.empty();
				done();
			});		
		});

		it('and can select a time', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var timeWidget = ifw.getType().timeWidget;
			var timepicker, time;

			timeWidget.focus();
			pause(triggerWaitTime)
			.then(function(){
				timepicker = timeWidget.siblings('.ui-timepicker-wrapper');
				expect(timepicker.is(':visible')).toBe(true);

				time = timepicker.find('.ui-timepicker-list').children().eq(5);				

				time.mousedown();

				return pause(triggerWaitTime);
			})
			.then(function(){
				time.mouseup();
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(timepicker.is(':visible')).toBe(false);
			 	expect(timeWidget.inputField('isEmpty')).toBe(false);
			 	expect(time.is('.ui-timepicker-selected')).toBe(true);

			 	testContainer.empty();
				done();
			});		
		});

		it('and can be torn down', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var datepicker;

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);

				ifw.getType().tearDown(ifw);

				return pause(triggerWaitTime);
			})
			.then(function(){
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(0);
				expect(input.parent().children().eq(2).is(':visible')).not.toBe(true);

				testContainer.empty();

				done(); 
			});
		});

	});

	it('can be set up', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');

		var spy_set = spyOn(ifw.getType(), 'setUp').and.callThrough();
		var spy_fields = spyOn(ifw.getType(), '_setUpFields').and.callThrough();
		var spy_re = spyOn(ifw.getType(), '_refreshFieldWidth').and.callThrough();
		var spy_clean = spyOn(ifw.getType(), '_setUpCleanDirtyEvents').and.callThrough();

		ifw.getType().setUp(ifw);

		expect(spy_fields).toHaveBeenCalled();
		expect(spy_re).toHaveBeenCalled();
		expect(spy_clean).toHaveBeenCalled();

		input.trigger('resize');

		expect(spy_re.calls.count()).toBe(3);
	});

	it('can set up its fields', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');

		var spy_set = spyOn(ifw.getType(), '_setUpFields').and.callThrough();

		ifw.getType()._setUpFields(); 

		expect(spy_set).toHaveBeenCalled();

		expect(input.parent().css('display')).toBe('none');
	});

	it('can refresh its field width', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);

		expect(time_pick.width()).toBe(135);

		testContainer.empty();
	});

	describe('it can handle changes', function(){
		it('with dirty events', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');
			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);

			var spy_check = spyOn(ifw, 'checkDirty').and.callThrough();

			var ev = $.Event('dirty');  
			time_pick.trigger(ev);

			expect(ev.isPropagationStopped()).toBe(true);
			expect(spy_check).toHaveBeenCalled();

			var ev2 = $.Event('dirty');  
			date_pick.trigger(ev2); 

			expect(ev2.isPropagationStopped()).toBe(true);
			expect(spy_check.calls.count()).toBe(2);
		});

		it('and with clean events', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');
			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);

			var spy_check = spyOn(ifw, 'checkDirty').and.callThrough();

			var ev = $.Event('clean');  
			time_pick.trigger(ev);

			expect(ev.isPropagationStopped()).toBe(true);
			expect(spy_check).toHaveBeenCalled();

			var ev2 = $.Event('clean');  
			date_pick.trigger(ev2); 

			expect(ev2.isPropagationStopped()).toBe(true);
			expect(spy_check.calls.count()).toBe(2);
		});
	});
	

	it('can split date and time', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var spy_split = spyOn(ifw.getType(), '_splitDateAndTime').and.callThrough();

		var Object1 = {
			date: '',
			time: ''
		};

		var Object2 = {
			date: '2014-04-25',
			time: '05:32'
		};

		var result = ifw.getType()._splitDateAndTime('Not a valid date');

		expect(result).toEqual(Object1);

		var result2 = ifw.getType()._splitDateAndTime('2014-04-25T01:32:21');

		expect(result2).toEqual(Object2);
	});

	it('can join date and time', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('add123InputField');
		var spy_join = spyOn(ifw.getType(), '_joinDateAndTime').and.callThrough();

		var empty_date = {
			date: '',
			time: '06:30'
		};

		var empty_time = {
			date: '2015-06-09',
			time: ''
		};

		var correct = {
			date: '2015-06-09',
			time: '06:30'
		};

		var result = ifw.getType()._joinDateAndTime(empty_date);

		expect(result).toBe('');

		var result2 = ifw.getType()._joinDateAndTime(empty_time);

		expect(result2).toBe('');

		var result3 = ifw.getType()._joinDateAndTime(correct);

		expect(result3).toBe('2015-06-09T06:30:00Z');
	});

});