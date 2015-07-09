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
		var div = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

		expect(div.children().eq(0).is('.date-range-picker')).toBe(true);
		expect(div.children().text()).toBe('FromMM/DD/YYYYToMM/DD/YYYY<<CustomDayWeekMonthYear>>');

		// Test button creation
		var buttons = $(document).find('.ui-button');

		expect(buttons.length).toBe(2);
		expect(buttons.eq(0).is('.previous-range')).toBe(true);
		expect(buttons.eq(0).text()).toBe('<<');
		expect(buttons.eq(1).is('.next-range')).toBe(true);
		expect(buttons.eq(1).text()).toBe('>>');

		testContainer.empty();
	});

	it('can get and set its data', function(){
		var picker = $('<div></div>').appendTo(testContainer).dateRangePicker(); 

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

		testContainer.empty();
	});


	describe('has a range picker', function(){
		xit('that can be created', function(){
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
			xit('a custom date range', function(done){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 
				var range = $(document).find('.input-field-group.range-select');

				var date = {
					from: '01/01/2000', 
					to: '', 
					range: 'day' 
				};

				picker.dateRangePicker('set', date);

				// expect(range.children().children().children().children().eq(0).attr('name')).toBe('range');

				var e = range.children().children().children().children().eq(0).children().eq(2);

				range.click();
				pause(triggerWaitTime + 100)
				.then(function(){
					e.click();
					done();
				});

				// pause(triggerWaitTime);
			});

			xit('a day date range', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateRangePicker(); 

				var _value = moment();

				var date = {
					from: _value, 
					to: _value, 
					range: 'day' 
				};

				picker.dateRangePicker('setRange', 'day');

				expect(picker.dateRangePicker('get')).toEqual(date);
			});

			xit('a week date range', function(){

			});

			xit('a month date range', function(){

			});

			xit('and a year date range', function(){

			});
		});
	});

	describe('has buttons', function(){
		xit('that can be created', function(){

		});

		describe('and can be used to move the date range forward', function(){
			xit('by one day', function(){

			});

			xit('by one week', function(){

			});

			xit('by one month', function(){

			});

			xit('by one year', function(){

			});
		});

		describe('and can be used to move the date range backward', function(){
			xit('by one day', function(){

			});

			xit('by one week', function(){

			});

			xit('by one month', function(){

			});

			xit('by one year', function(){

			});
		});

		xit('but will not do anything if the custom type is selected', function(){

		});
	});
});