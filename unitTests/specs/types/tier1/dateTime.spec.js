/**
 * Testing dateTime data-type
 */
'use strict';
describe('The dateTime data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'dateTime';

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var type = $.formBuilder.inputField.types[typeName];
		var typeInstance;
		
		expect(type).toBeDefined();

		ifw.setType(typeName);

		// Should have these
		typeInstance = ifw.getType();
		expect(typeInstance.dateWidget).toBeDefined();
		expect(typeInstance.timeWidget).toBeDefined();
	});


	it('can be setup', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();

		var spy_fields = spyOn(typeInstance, '_setUpFields').and.callThrough();
		var spy_re = spyOn(typeInstance, '_refreshFieldWidth').and.callThrough();
		var spy_clean = spyOn(typeInstance, '_setUpCleanDirtyEvents').and.callThrough();

		// ifw.getType().setUp(ifw);
		typeInstance.setUp(ifw);

		expect(spy_fields).toHaveBeenCalled();
		expect(spy_re).toHaveBeenCalled();
		expect(spy_clean).toHaveBeenCalled();

		input.trigger('resize');

		expect(spy_re.calls.count()).toBe(3);
	});

	it('can setup its fields', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>')
			.appendTo(testContainer).inputField();	
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType(),
			fieldItems = input.parent().parent().children();

		expect(fieldItems.length).toBe(3);

		expect(fieldItems.eq(0).find('input').is('[data-type="date"]')).toBe(true);
		expect(fieldItems.eq(0).is(':visible')).toBe(true);

		expect(fieldItems.eq(1).find('input').is('[data-type="dateTime"]')).toBe(true);
		expect(fieldItems.eq(1).is(':visible')).toBe(false);

		expect(fieldItems.eq(2).find('input').is('[data-type="time"]')).toBe(true);
		expect(fieldItems.eq(2).is(':visible')).toBe(true);

		testContainer.empty();
	});


	it('can refresh its field widths', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();
		var startWidth;

		input.width(300);
		typeInstance._refreshFieldWidth();
		expect(typeInstance.dateWidget.outerWidth(true)+typeInstance.timeWidget.outerWidth(true)).toBe(300);

		input.width(400);
		typeInstance._refreshFieldWidth();
		expect(typeInstance.dateWidget.outerWidth(true)+typeInstance.timeWidget.outerWidth(true)).toBe(400);
	});

	it('refreshes its field widths on resize', function(done){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();

		var spy_refresh = spyOn(typeInstance, '_refreshFieldWidth');

		input.trigger('resize');
		pause(triggerWaitTime)
		.then(function(){
			expect(spy_refresh).toHaveBeenCalled();

			done();
		});
	});	

	describe('has datepicker and time picker widgets', function(){
		it('that can be opened on focus', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);
			var timeField = time_pick.inputField('getField');
			var datepicker;
			var timepicker;

			expect(time_pick.is('.ui-timepicker-input')).toBe(true);
			expect(time_pick.siblings().length).toBe(1);

			datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
			expect(datepicker.is(':visible')).toBe(false);

			timepicker = timeField.children('.ui-timepicker-wrapper');
			expect(timepicker.length).toBe(0);

			time_pick.focus();
			date_pick.focus();

			pause(triggerWaitTime)
			.then(function(){
				timepicker = timeField.children('.ui-timepicker-wrapper');
				expect(timepicker.length).toBe(1);
				expect(timepicker.is(':visible')).toBe(true);

				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);
				
				testContainer.empty();
				done();
			});
		});

		it('and can select a date', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
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

				testContainer.empty();
				done();
			});		
		});

		it('and can select a time', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
			var timeWidget = ifw.getType().timeWidget;
			var timeField = timeWidget.inputField('getField');
			var timepicker, time;

			timeWidget.focus();
			pause(triggerWaitTime)
			.then(function(){
				timepicker = timeField.children('.ui-timepicker-wrapper');
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
	});


	describe('it can handle changes', function(){
		it('with dirty events', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('formBuilderInputField');
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
			var ifw = input.data('formBuilderInputField');
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
		var ifw = input.data('formBuilderInputField');
		var timeInstance = ifw.getType();
		var formatDT = 'YYYY-MM-DDTHH:mm:ss[Z]',
			formatD = 'YYYY-MM-DD',
			formatT = 'HH:mm',
			testDate;
		
		expect(timeInstance._splitDateAndTime('Not a valid date')).toEqual({
			date: '',
			time: ''
		});

		testDate = '2014-04-25T01:32:21Z';
		expect(timeInstance._splitDateAndTime(testDate)).toEqual({
			date: moment.utc(testDate,formatDT).local().format(formatD),
			time: moment.utc(testDate,formatDT).format(formatT)
		});

		testDate = '2014-04-25T10:32:21Z';
		expect(timeInstance._splitDateAndTime(testDate)).toEqual({
			date: moment.utc(testDate,formatDT).local().format(formatD),
			time: moment.utc(testDate,formatDT).format(formatT)
		});

	});

	it('can join local date & time moments into one utc moment', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var timeInstance = ifw.getType();
		var localDateMoment, localTimeMoment, utcMoment;
		var inDateFormat = 'YYYY-MM-DD',
			outDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]',
			utcOffset = -240;

		//Check time zone boundaries
		localDateMoment = moment('2004-06-28', inDateFormat);
		localTimeMoment = moment().utcOffset(utcOffset).hour(0).minute(0).second(0);
		utcMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment).utcOffset(utcOffset).utc();
		expect(utcMoment.format(outDateTimeFormat)).toBe('2004-06-28T04:00:00Z');

		localDateMoment = moment('2004-06-27', inDateFormat);
		localTimeMoment = moment().utcOffset(utcOffset).hour(22).minute(0).second(0);
		utcMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment).utcOffset(utcOffset).utc();
		expect(utcMoment.format(outDateTimeFormat)).toBe('2004-06-28T02:00:00Z');

		localDateMoment = moment('2004-06-27', inDateFormat);
		localTimeMoment = moment().utcOffset(utcOffset).hour(18).minute(0).second(0);
		utcMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment).utcOffset(utcOffset).utc();
		expect(utcMoment.format(outDateTimeFormat)).toBe('2004-06-27T22:00:00Z');
	});

	it('can join local date & time moments into one local moment', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-store-utc="false"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var timeInstance = ifw.getType();
		var localDateMoment, localTimeMoment, localMoment;
		var inDateFormat = 'YYYY-MM-DD',
			outDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]';

		//Check time zone boundaries

		localDateMoment = moment('2004-06-28', inDateFormat);
		localTimeMoment = moment().hour(0).minute(0).second(0);
		localMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment);
		expect(localMoment.format(outDateTimeFormat)).toBe('2004-06-28T00:00:00Z');

		localDateMoment = moment('2004-06-27', inDateFormat);
		localTimeMoment = moment().hour(22).minute(0).second(0);
		localMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment);
		expect(localMoment.format(outDateTimeFormat)).toBe('2004-06-27T22:00:00Z');

		localDateMoment = moment('2004-06-27', inDateFormat);
		localTimeMoment = moment().hour(18).minute(0).second(0);
		localMoment = timeInstance._joinDateAndTimeMoments(localDateMoment,localTimeMoment);
		expect(localMoment.format(outDateTimeFormat)).toBe('2004-06-27T18:00:00Z');
	});


	it('can be set using UTC (default)', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType(),
			dateFomat = 'MM/DD/YYYY',
			timeFormat = 'h:mma',
			dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]',
			dateTimeMoment,
			testVal,
			utcOffset = moment().utcOffset(); // local

		testVal = '2004-06-28T00:00:00Z';
		ifw.set(testVal);
		dateTimeMoment = moment.utc(testVal, dateTimeFormat).utcOffset(utcOffset);
		expect(typeInstance.dateWidget.val()).toBe(dateTimeMoment.format(dateFomat));
		expect(typeInstance.timeWidget.val()).toBe(dateTimeMoment.format(timeFormat));
		expect(ifw.get()).toBe(testVal);

		testVal = '2004-06-28T12:00:00Z';
		ifw.set(testVal);
		dateTimeMoment = moment.utc(testVal, dateTimeFormat).utcOffset(utcOffset);
		expect(typeInstance.dateWidget.val()).toBe(dateTimeMoment.format(dateFomat));
		expect(typeInstance.timeWidget.val()).toBe(dateTimeMoment.format(timeFormat));
		expect(ifw.get()).toBe(testVal);
	});

	it('can be set using local', function(){
		var input = $('<input type="text" data-type="'+typeName+'" data-store-utc="false"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType(),
			dateFomat = 'MM/DD/YYYY',
			timeFormat = 'h:mma',
			dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]',
			dateTimeMoment,
			testVal;

		testVal = '2004-06-28T00:00:00Z';
		ifw.set(testVal);
		dateTimeMoment = moment(testVal,dateTimeFormat);
		expect(typeInstance.dateWidget.val()).toBe(dateTimeMoment.format(dateFomat));
		expect(typeInstance.timeWidget.val()).toBe(dateTimeMoment.format(timeFormat));
		expect(ifw.get()).toBe(testVal);

		testVal = '2004-06-28T12:00:00Z';
		ifw.set(testVal);
		dateTimeMoment = moment(testVal,dateTimeFormat);
		expect(typeInstance.dateWidget.val()).toBe(dateTimeMoment.format(dateFomat));
		expect(typeInstance.timeWidget.val()).toBe(dateTimeMoment.format(timeFormat));
		expect(ifw.get()).toBe(testVal);
	});

	it('can be torn down', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>')
			.appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var fieldItems = input.parent().parent(),
			typeInstance = ifw.getType();

		expect(fieldItems.children().length).toBe(3);
		expect(typeInstance.dateWidget).toBeDefined();
		expect(typeInstance.timeWidget).toBeDefined();
		expect(ifw.element.parent().is(':visible')).toBe(false);

		typeInstance.tearDown(ifw);

		expect(fieldItems.children().length).toBe(1);
		expect(typeInstance.dateWidget).toBeUndefined();
		expect(typeInstance.timeWidget).toBeUndefined();
		expect(ifw.element.parent().is(':visible')).toBe(true);

		testContainer.empty();
	});

});