/**
 * Testing dateRangePicker widget
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true,  moment:true*/
'use strict';
describe('A dateRangePicker widget',function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can be created', function(){
		var div = $('<div class="dateRange"></div>').dateRangePicker(); 

		expect(div.children().eq(0).is('.date-range-picker')).toBe(true);
		expect(div.children().text()).toBe('FromMM/DD/YYYYToMM/DD/YYYY<<CustomDayWeekMonthYear>>');
	});

	it('can get and set its data', function(){
		var picker = $('<div></div>').dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		var date = {
			from: '2001-05-13',
			to: '2001-05-13',
			range: 'custom'
		};

		ddrw.set({
			from: '2001-05-13',
			to: '2001-05-13',
			range: 'custom'
		});

		expect(ddrw.get()).toEqual(date);
	});

	it('can serialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

		var date = '2013-01-01';

		expect(picker.dateRangePicker('serialize', moment(date,'YYYY-MM-DD'))).toBe(date);
	});

	it('can deserialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

		var date = '2013-01-01';

		expect(picker.dateRangePicker('deserialize', date)).toEqual(moment(date,'YYYY-MM-DD'));
	});

	it('can clear its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker();
		var drpw = picker.data('formBuilderDateRangePicker');

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
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateRangePicker('isDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('isDirty');
	});

	it('and can clear its dirty status', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateRangePicker('clearDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('clearDirty');

		// expect(picker.dateRangePicker('isDirty')).toBe(false);
	});

	describe('has a range picker', function(){
		it('that can be created', function(){
			var div = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

			var select = $(document).find('.range-select');
			var values = select.children().children().children().children().children();

			expect(select.length).toBe(1);
			expect(select.children().is('.input-field.select-fix')).toBe(true);
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
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker');

				var from1 = moment();
				var to1 = moment();

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);


				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				ddrw.setRange('day');

				expect(ddrw.get()).toEqual(date);
			});

			it('a week date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker');

				var from1 = moment().startOf('week');
				var to1 = moment().endOf('week');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);


				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				ddrw.setRange('week');

				expect(ddrw.get()).toEqual(date);
			});

			it('a month date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker');

				var from1 = moment().startOf('month');
				var to1 = moment().endOf('month');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				ddrw.setRange('month');

				expect(ddrw.get()).toEqual(date);
			});

			it('and a year date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker');

				var from1 = moment().startOf('year');
				var to1 = moment().endOf('year');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				ddrw.setRange('year');

				expect(ddrw.get()).toEqual(date);
			});

			it('but will not set a custom date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker();
				var ddrw = picker.data('formBuilderDateRangePicker'); 

				var date2 = {
					from: '', 
					to: '', 
					range: 'custom'
				};

				ddrw.setRange('custom');

				expect(ddrw.get()).toEqual(date2);
			});
		});
	});

	describe('has buttons', function(){
		it('that can be created', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

			// Test button creation
			var buttons = $(document).find('.ui-button');

			expect(buttons.length).toBe(2);
			expect(buttons.eq(0).is('.previous-range')).toBe(true);
			expect(buttons.eq(0).text()).toBe('<<');
			expect(buttons.eq(1).is('.next-range')).toBe(true);
			expect(buttons.eq(1).text()).toBe('>>');

			testContainer.empty();
		});

		describe('and can be used to move the date range forward', function(){
			it('by one day', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2000-01-02', 
					to: '2000-01-02',
					range: 'day' 
				});

				var date = {
					from: '2000-01-03', 
					to: '2000-01-03', 
					range: 'day' 
				};

				buttons.eq(1).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-07-19', 
					to: '2015-07-25', 
					range: 'week' 
				});

				var date = {
					from: '2015-07-26', 
					to: '2015-08-01', 
					range: 'week' 
				};

				buttons.eq(1).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-07-01', 
					to: '2015-07-31', 
					range: 'month' 
				});

				var date = {
					from: '2015-08-01', 
					to: '2015-08-31', 
					range: 'month' 
				};

				buttons.eq(1).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-01-01', 
					to: '2015-12-31', 
					range: 'year' 
				});

				var date = {
					from: '2016-01-01', 
					to: '2016-12-31', 
					range: 'year' 
				};

				buttons.eq(1).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});
		});

		it('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
			var ddrw = picker.data('formBuilderDateRangePicker'); 
			var buttons = $(document).find('.ui-button');

			ddrw.set({
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			});

			var date = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			buttons.eq(1).click();

			expect(ddrw.get()).toEqual(date);

			testContainer.empty();
		});

		describe('and can be used to move the date range backward', function(){
			it('by one day', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2000-01-02', 
					to: '2000-01-02', 
					range: 'day' 
				});

				var date = {
					from: '2000-01-01', 
					to: '2000-01-01', 
					range: 'day' 
				};

				buttons.eq(0).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-07-19', 
					to: '2015-07-25', 
					range: 'week' 
				});

				var date = {
					from: '2015-07-12', 
					to: '2015-07-18', 
					range: 'week' 
				};

				buttons.eq(0).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-07-01', 
					to: '2015-07-30', 
					range: 'month' 
				});

				var date = {
					from: '2015-06-01', 
					to: '2015-06-30', 
					range: 'month' 
				};

				buttons.eq(0).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});

			it('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var ddrw = picker.data('formBuilderDateRangePicker'); 
				var buttons = $(document).find('.ui-button');

				ddrw.set({
					from: '2015-01-01', 
					to: '2015-12-31', 
					range: 'year' 
				});

				var date = {
					from: '2014-01-01', 
					to: '2014-12-31', 
					range: 'year' 
				};

				buttons.eq(0).click();

				expect(ddrw.get()).toEqual(date);

				testContainer.empty();
			});
		});

		it('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
			var ddrw = picker.data('formBuilderDateRangePicker'); 
			var buttons = $(document).find('.ui-button');

			ddrw.set({
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			});

			var date = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			buttons.eq(0).click();

			expect(ddrw.get()).toEqual(date);

			testContainer.empty();
		});
	});

	it('can move the range', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		var from = '2015-01-02';
		var from2 = '2015-01-03';
		var from3 = '2015-01-02';

		ddrw.set({
			from: from, 
			to: from, 
			range: 'day' 
		});

		ddrw._moveRange(1, 'day');

		var date2 = {
			from: from2, 
			to: from2, 
			range: 'day' 
		};

		expect(picker.dateRangePicker('get')).toEqual(date2);

		ddrw._moveRange(-1, 'day');

		var date3 = {
			from: from3, 
			to: from3, 
			range: 'day' 
		};

		expect(picker.dateRangePicker('get')).toEqual(date3);
	});

	it('can set its from and to fields', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		var from1 = moment();
		var to1 = moment();

		var from = picker.dateRangePicker('serialize', from1);
		var to = picker.dateRangePicker('serialize', to1);

		var date = {
			from: from, 
			to: to, 
			range: 'custom'
		};

   		ddrw._setFromAndTo(from, to); 

   		expect(ddrw.get()).toEqual(date);
	});

	it('can validate its input', function(){
		var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
		var ddrw = picker.data('formBuilderDateRangePicker');

		ddrw.set({
			from: '2014-01-02', 
			to: '2015-08-02', 
			range: 'custom' 
		});

		expect(picker.dateRangePicker('validate')).toBeTruthy();

		ddrw.set({
			from: '2015-13-01', 
			to: '2015-08-02', 
			range: 'custom' 
		});

		expect(picker.dateRangePicker('validate')).toBeFalsy();

		testContainer.empty();
	});
});