/**
 * Testing dateTimeRangePicker
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true, moment:true*/
'use strict';
describe('A dateTimeRangePicker widget',function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can be created', function(){
		var div = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

		expect(div.children().eq(0).is('.date-range-picker')).toBe(true);
		expect(div.children().text()).toBe('FromMM/DD/YYYYH:MMam/pmToMM/DD/YYYYH:MMam/pm<<CustomDayWeekMonthYear>>');
	});

	it('can get and set its data', function(){
		var picker = $('<div></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		var date = {
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		};

		ddrw.set({
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		});

		expect(picker.dateTimeRangePicker('get')).toEqual(date);
	});

	it('but will not set invalid data', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		drpw.set({
			from: '2016-13-01T09:00:00Z', 
			to: '2016-12-03T11:00:00Z', 
			range: 'custom'
		});

		var date = {
			from: '', 
			to: '2016-12-03T10:00:00Z', 
			range: 'custom'
		};

		expect(drpw.get()).toEqual(date);
	});

	it('can serialize its date', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		var date = moment();

		expect(drpw.serializeDate(date)).toBe('2015-07-15');
	});

	it('can deserialize its date', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		var date = moment();

		var date2 = drpw.serializeDate(date);

		expect(drpw.deserializeDate(date2)).toEqual(moment(date2, 'YYYY-MM-DD'));
	});

	it('can clear its data', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker();
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		var date = {
			from: '',
			to: '',
			range: 'custom'
		};

		drpw.set({
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		});

		drpw.clear();

		expect(drpw.get()).toEqual(date);
	});

	it('can check if its data is dirty', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateTimeRangePicker('isDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('isDirty');
	});

	it('and can clear its dirty status', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateTimeRangePicker('clearDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('clearDirty');
	});

	describe('has a range picker', function(){
		it('that can be created', function(){
			var div = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			var select = $(document).find('.range-select');
			var values = select.children().children().children().children().children();

			expect(select.length).toBe(1);
			expect(select.children().is('.input-field.undefined.select-fix')).toBe(true);
			expect(values.length).toBe(5);
			expect(values.eq(0).text()).toBe('Custom');
			expect(values.eq(1).text()).toBe('Day');
			expect(values.eq(2).text()).toBe('Week');
			expect(values.eq(3).text()).toBe('Month');
			expect(values.eq(4).text()).toBe('Year');

			testContainer.empty();
		});

		describe('and can set', function(){
			it('a day date range', function(){
				// Problem with moment where the miliseconds are lagging after running test 
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from: '2001-05-13T15:52:00Z',
					to: '2001-05-13T19:34:00Z',
					range: 'day'
				};

				drpw.set({
					from: '2001-05-13T15:52:00Z',
					to: '2001-05-13T19:34:00Z',
					range: 'custom'
				});

				drpw.setRange('day');

				expect(drpw.get()).toEqual(date);
			});

			it('a week date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from: '2001-05-06T15:52:00Z',
					to: '2001-05-12T19:34:00Z',
					range: 'week'
				};

				drpw.set({
					from: '2001-05-07T15:52:00Z',
					to: '2001-05-08T19:34:00Z',
					range: 'custom'
				});

				drpw.setRange('week');

				expect(drpw.get()).toEqual(date);
			});

			it('a month date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from:  '2001-05-01T15:52:00Z',
					to: '2001-05-31T19:34:00Z',
					range: 'month'
				};

				drpw.set({
					from: '2001-05-07T15:52:00Z',
					to: '2001-05-08T19:34:00Z',
					range: 'custom'
				});

				drpw.setRange('month');

				expect(drpw.get()).toEqual(date);
			});

			it('a year date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from: '2005-01-01T14:52:00Z',
					to: '2005-12-31T18:34:00Z',
					range: 'year'
				};

				drpw.set({
					from: '2005-05-07T15:52:00Z',
					to: '2001-05-08T19:34:00Z',
					range: 'custom'
				});

				drpw.setRange('year');

				expect(drpw.get()).toEqual(date);
			});

			it('but will not modify a custom date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from: '2003-01-02T08:00:00Z', 
					to: '2000-01-21T10:00:00Z',
					range: 'custom'
				};

				drpw.set({
					from: '2003-01-02T09:00:00Z', 
					to: '2000-01-21T11:00:00Z',
					range: 'custom'
				});

				drpw.setRange('custom');

				expect(drpw.get()).toEqual(date);
			});
		});
	});

	describe('has buttons', function(){
		it('that can be created', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			// Test button creation
			var buttons = $(document).find('.ui-button');

			expect(buttons.length).toBe(2);
			expect(buttons.eq(0).is('.previous-range')).toBe(true);
			expect(buttons.eq(0).text()).toBe('<<');
			expect(buttons.eq(1).is('.next-range')).toBe(true);
			expect(buttons.eq(1).text()).toBe('>>');

			testContainer.empty();
		});

		describe('that can be used to move the date range forward', function(){
			it('by one day', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');
				
				drpw.set({
					from: '2000-01-01T03:00:00Z', 
					to: '2000-01-01T03:00:00Z',
					range: 'custom' 
				});

				drpw.setRange('day');

				var date = {
					from: '2000-01-02T02:00:00Z', 
					to: '2000-01-02T02:00:00Z', 
					range: 'day' 
				};

				buttons.eq(1).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one week', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2014-12-28T15:52:00Z',
					to: '2015-01-03T05:34:00Z',
					range: 'custom'
				});

				drpw.setRange('week');

				var date = {
					from: '2015-01-04T14:52:00Z', 
					to: '2015-01-10T04:34:00Z', 
					range: 'week' 
				};

				buttons.eq(1).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one month', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2000-01-02T00:00:00Z', 
					to: '2000-01-21T00:00:00Z', 
					range: 'month' 
				});

				drpw.setRange('month');

				var date = {
					from: '2000-02-01T23:00:00Z', 
					to: '2000-02-28T23:00:00Z', 
					range: 'month' 
				};

				buttons.eq(1).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one year', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2003-01-01T23:00:00Z', 
					to: '2003-01-21T00:00:00Z', 
					range: 'custom' 
				});

				drpw.setRange('year');

				var date = {
					from: '2004-01-01T22:00:00Z', 
					to: '2004-12-31T23:00:00Z',  
					range: 'year' 
				};

				buttons.eq(1).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});
		});

		it('but will not do anything if the custom type is selected', function(done){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');
			var buttons = $(document).find('.ui-button');

			drpw.set({
				from: '2003-01-02T10:00:00Z', 
				to: '2000-01-21T12:00:00Z', 
				range: 'custom' 
			});

			var date = {
				from: '2003-01-02T09:00:00Z', 
				to: '2000-01-21T11:00:00Z', 
				range: 'custom' 
			};

			buttons.eq(1).click();

			pause(triggerWaitTime)
			.then(function(){
				expect(drpw.get()).toEqual(date);

				testContainer.empty();

				done();
			});
		});

		describe('and can be used to move the date range backward', function(){
			it('by one day', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2000-01-02T10:00:00Z', 
					to: '2000-01-02T12:00:00Z', 
					range: 'custom' 
				});

				drpw.setRange('day');

				var date = {
					from: '2000-01-01T09:00:00Z', 
					to: '2000-01-01T11:00:00Z',
					range: 'day' 
				};

				buttons.eq(0).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one week', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2000-01-02T10:00:00Z', 
					to: '2000-01-02T12:00:00Z', 
					range: 'custom' 
				});

				drpw.setRange('week');

				var date = {
					from: '1999-12-26T09:00:00Z', 
					to: '2000-01-01T11:00:00Z',
					range: 'week' 
				};

				buttons.eq(0).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one month', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2000-01-02T10:00:00Z', 
					to: '2000-01-02T12:00:00Z', 
					range: 'custom' 
				});

				drpw.setRange('month');

				var date = {
					from: '1999-12-01T09:00:00Z', 
					to: '1999-12-31T11:00:00Z',
					range: 'month' 
				};

				buttons.eq(0).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});

			it('by one year', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');
				var buttons = $(document).find('.ui-button');

				drpw.set({
					from: '2000-01-02T10:00:00Z', 
					to: '2000-01-02T12:00:00Z', 
					range: 'custom' 
				});

				drpw.setRange('year');

				var date = {
					from: '1999-01-01T09:00:00Z', 
					to: '1999-12-31T11:00:00Z',
					range: 'year' 
				};

				buttons.eq(0).click();

				pause(triggerWaitTime)
				.then(function(){
					expect(drpw.get()).toEqual(date);

					testContainer.empty();

					done();
				});
			});
		});

		it('but will not do anything if the custom type is selected', function(done){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');
			var buttons = $(document).find('.ui-button');

			drpw.set({
				from: '2000-01-02T10:00:00Z', 
				to: '2000-01-02T12:00:00Z', 
				range: 'custom' 
			});

			drpw.setRange('custom');

			var date = {
				from: '2000-01-02T09:00:00Z', 
				to: '2000-01-02T11:00:00Z', 
				range: 'custom'
			};

			buttons.eq(0).click();

			pause(triggerWaitTime)
			.then(function(){
				expect(drpw.get()).toEqual(date);

				testContainer.empty();

				done();
			});
		});
	});

	describe('can move the range type of the dates', function(){
		it('by one day', function(){
			var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');

			drpw.set({
				from: '2000-01-02T10:00:00Z', 
				to: '2000-01-02T12:00:00Z', 
				range: 'custom' 
			});

			var date = {
				from: '2000-01-03T09:00:00Z', 
				to: '2000-01-03T11:00:00Z', 
				range: 'custom'
			};

			var date2 = {
				from: '2000-01-02T09:00:00Z', 
				to: '2000-01-02T11:00:00Z',
				range: 'custom'
			};

			drpw._moveRange(1, 'day');

			expect(picker.dateTimeRangePicker('get')).toEqual(date);

			drpw._moveRange(-1, 'day');

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);
		});

		it('by one week', function(){
			var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');

			drpw.set({
				from: '2015-01-04T10:00:00Z', 
				to: '2015-01-10T12:00:00Z', 
				range: 'custom' 
			});

			var date = {
				from: '2015-01-11T09:00:00Z', 
				to: '2015-01-17T11:00:00Z',
				range: 'custom'
			};

			var date2 = {
				from: '2015-01-04T09:00:00Z', 
				to: '2015-01-10T11:00:00Z',
				range: 'custom'
			};

			drpw._moveRange(1, 'week');

			expect(picker.dateTimeRangePicker('get')).toEqual(date);

			drpw._moveRange(-1, 'week');

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);
		});

		it('by one month', function(){
			var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');

			drpw.set({
				from: '2015-01-01T10:00:00Z', 
				to: '2015-01-31T12:00:00Z', 
				range: 'custom' 
			});

			var date = {
				from: '2015-02-01T09:00:00Z', 
				to: '2015-02-28T11:00:00Z',
				range: 'custom'
			};

			var date2 = {
				from: '2015-01-01T09:00:00Z', 
				to: '2015-01-31T11:00:00Z',
				range: 'custom'
			};

			drpw._moveRange(1, 'month');

			expect(picker.dateTimeRangePicker('get')).toEqual(date);

			drpw._moveRange(-1, 'month');

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);
		});

		it('by one year', function(){
			var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
			var drpw = picker.data('formBuilderDateTimeRangePicker');

			drpw.set({
				from: '2015-01-01T10:00:00Z', 
				to: '2015-12-31T12:00:00Z', 
				range: 'custom' 
			});

			var date = {
				from: '2016-01-01T09:00:00Z', 
				to: '2016-12-31T11:00:00Z', 
				range: 'custom'
			};

			var date2 = {
				from: '2015-01-01T09:00:00Z', 
				to: '2015-12-31T11:00:00Z', 
				range: 'custom'
			};

			drpw._moveRange(1, 'year');

			expect(picker.dateTimeRangePicker('get')).toEqual(date);

			drpw._moveRange(-1, 'year');

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);
		});
	});

	it('can validate its input', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		drpw.set({
			from: '2016-01-01T09:00:00Z', 
			to: '2016-12-31T11:00:00Z', 
			range: 'custom'
		});

		expect(picker.dateTimeRangePicker('validate')).toBeTruthy();

		drpw.set({
			from: '2016-13-01T09:00:00Z', 
			to: '', 
			range: 'custom'
		});

		expect(drpw.validate()).toBeFalsy();

		drpw.set({
			from: '2016-01-33T09:00:00Z', 
			to: '2016-12-31T11:00:00Z', 
			range: 'custom'
		});

		expect(drpw.validate()).toBeFalsy();
	});
});