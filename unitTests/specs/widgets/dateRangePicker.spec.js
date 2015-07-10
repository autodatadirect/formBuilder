/**
 * Testing dateRangePicker
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true, moment:true*/
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

		var date = {
			from: '01/01/2000', 
			to: '01/02/2000', 
			range: 'day' 
		};

		var returnDate = {
			from: '2000-01-01',
			to: '2000-01-02',
			range: 'day'
		};

		picker.dateRangePicker('set', date);

		expect(picker.dateRangePicker('get')).toEqual(returnDate);
	});

	it('can serialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

		var from = moment('2013-01-01');

		var date = '2013-01-01';

		expect(picker.dateRangePicker('serialize', moment(date,'YYYY-MM-DD'))).toBe(date);
	});

	it('can deserialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

		var buttons = $(document).find('.ui-button');

		var from = '2013-01-01';

		expect(picker.dateRangePicker('deserialize', from)).toEqual(moment(from,'YYYY-MM-DD'));
	});

	it('can clear its data', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker();

		var date = {
			from: '01/01/2000', 
			to: '01/02/2000', 
			range: 'day' 
		};

		var returnDate = {
			from: '',
			to: '',
			range: 'custom'
		};

		picker.dateRangePicker('set', date);

		picker.dateRangePicker('clear');

		expect(picker.dateRangePicker('get')).toEqual(returnDate);
	});

	xit('can check if its data is dirty', function(){
		var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
		var ddrw = picker.data('add123DateRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		var result = picker.dateRangePicker('isDirty'); // Why isn't this returning false?

		expect(result).toBe(false);

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('isDirty');

		picker.val('something');

		var result2 = picker.dateRangePicker('isDirty'); // Why isn't this returning false?

		expect(result2).toBe(true);

		// expect(picker.dateRangePicker('isDirty')).toBe(true);

		// console.log(picker.dirty);
	});

	xit('and can clear its dirty status', function(){

	});

	describe('has a range picker', function(){
		it('that can be created', function(){
			var div = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

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
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

				var from1 = moment();
				var to1 = moment();

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);


				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateRangePicker('setRange', 'day');

				expect(picker.dateRangePicker('get')).toEqual(date);
			});

			it('a week date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

				var from1 = moment().startOf('week');
				var to1 = moment().endOf('week');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);


				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateRangePicker('setRange', 'week');

				expect(picker.dateRangePicker('get')).toEqual(date);
			});

			it('a month date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

				var from1 = moment().startOf('month');
				var to1 = moment().endOf('month');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateRangePicker('setRange', 'month');

				expect(picker.dateRangePicker('get')).toEqual(date);
			});

			it('and a year date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

				var from1 = moment().startOf('year');
				var to1 = moment().endOf('year');

				var from = picker.dateRangePicker('serialize', from1);
				var to = picker.dateRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateRangePicker('setRange', 'year');

				expect(picker.dateRangePicker('get')).toEqual(date);
			});

			it('but will not set a custom date range', function(){
				var picker = $('<div class="dateRange"></div>').dateRangePicker(); 

				var date = {
					from: '01/01/2000', 
					to: '08/05/2015', 
					range: 'custom'
				};

				var date2 = {
					from: '', 
					to: '', 
					range: 'custom'
				};

				picker.dateRangePicker('setRange', 'custom');

				expect(picker.dateRangePicker('get')).toEqual(date2);
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

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/01/2000', 
					to: '01/01/2000', 
					range: 'day' 
				};

				var date2 = {
					from: '2000-01-02', 
					to: '2000-01-02', 
					range: 'day' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/19/2015', 
					to: '07/25/2015', 
					range: 'week' 
				};

				var date2 = {
					from: '2015-07-26', 
					to: '2015-08-01', 
					range: 'week' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/01/2015', 
					to: '07/31/2015', 
					range: 'month' 
				};

				var date2 = {
					from: '2015-08-01', 
					to: '2015-08-31', 
					range: 'month' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/01/2015', 
					to: '12/31/2015', 
					range: 'year' 
				};

				var date2 = {
					from: '2016-01-01', 
					to: '2016-12-31', 
					range: 'year' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});
		});

		it('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

			var buttons = $(document).find('.ui-button');

			var date = {
				from: '01/01/2015', 
				to: '08/05/2015', 
				range: 'custom' 
			};

			var date2 = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			picker.dateRangePicker('set', date);

			buttons.eq(1).click();

			expect(picker.dateRangePicker('get')).toEqual(date2);

			testContainer.empty();
		});

		describe('and can be used to move the date range backward', function(){
			it('by one day', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/02/2000', 
					to: '01/02/2000', 
					range: 'day' 
				};

				var date2 = {
					from: '2000-01-01', 
					to: '2000-01-01', 
					range: 'day' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/19/2015', 
					to: '07/25/2015', 
					range: 'week' 
				};

				var date2 = {
					from: '2015-07-12', 
					to: '2015-07-18', 
					range: 'week' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/01/2015', 
					to: '07/31/2015', 
					range: 'month' 
				};

				var date2 = {
					from: '2015-06-01', 
					to: '2015-06-30', 
					range: 'month' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			it('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/01/2015', 
					to: '12/31/2015', 
					range: 'year' 
				};

				var date2 = {
					from: '2014-01-01', 
					to: '2014-12-31', 
					range: 'year' 
				};

				picker.dateRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});
		});

		it('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

			var buttons = $(document).find('.ui-button');

			var date = {
				from: '01/01/2015', 
				to: '08/05/2015', 
				range: 'custom' 
			};

			var date2 = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			picker.dateRangePicker('set', date);

			buttons.eq(0).click();

			expect(picker.dateRangePicker('get')).toEqual(date2);

			testContainer.empty();
		});
	});

	it('can switch the range type of the dates', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('add123DateRangePicker');

		// var spy_de = spyOn(picker.dateRangePicker(), 'deserialize').and.callThrough();

		var from = '01/01/2015';
		var from2 = '2015-01-02';
		var from3 = '2015-01-01';

		var date = {
				from: from, 
				to: from, 
				range: 'day' 
			};

		var date2 = {
				from: from2, 
				to: from2, 
				range: 'day' 
			};

		var date3 = {
				from: from3, 
				to: from3, 
				range: 'day' 
			};


		picker.dateRangePicker('set', date);

		ddrw._moveRange(1, 'day');

		expect(picker.dateRangePicker('get')).toEqual(date2);

		ddrw._moveRange(-1, 'day');

		expect(picker.dateRangePicker('get')).toEqual(date3);
	});

	it('can set its from and to fields', function(){
		var picker = $('<div class="dateRange"></div>').dateRangePicker(); 
		var ddrw = picker.data('add123DateRangePicker');

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

   		expect(picker.dateRangePicker('get')).toEqual(date);
	});

	it('can validate its input', function(){
		var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

		var date = {
			from: '01/01/2015', 
			to: '08/05/2015', 
			range: 'custom' 
		};

		picker.dateRangePicker('set', date);

		expect(picker.dateRangePicker('validate')).toBeTruthy();

		var date2 = {
			from: '13/01/2015',
			to: '08/05/2015', 
			range: 'custom' 
		};

		picker.dateRangePicker('set', date2);

		expect(picker.dateRangePicker('validate')).toBeFalsy();

		testContainer.empty();
	});
});