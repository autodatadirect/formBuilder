/**
 * Testing dateTime data-type
 */

describe('The dateTime data-type', function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'dateTime';
	var type = $.add123.inputField.types[typeName];

	it('can be created with placeholders', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();	
		var ifw = input.data('add123InputField');

		expect(input.parent().parent().parent().children().children().eq(0).is('.input-field.undefined.require')).toBe(true);
		expect(input.parent().parent().parent().children().children().eq(0).children().children().eq(0).children().eq(1).text()).toBe('MM/DD/YYYY');
		expect(input.parent().parent().parent().children().children().eq(2).is('.input-field.undefined.require')).toBe(true);
		expect(input.parent().parent().parent().children().children().eq(2).children().children().eq(0).children().eq(1).text()).toBe('H:MMam/pm');

		testContainer.empty();
	});

	describe('has datepicker and time picker widgets', function(){
		it('that can be opened on focus', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);

			expect(time_pick.is('.ui-timepicker-input')).toBe(true);
			expect(time_pick.siblings().length).toBe(1);

			expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
			expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);

			time_pick.focus();
			date_pick.focus();

			pause(triggerWaitTime)
			.then(function(){
				expect(time_pick.siblings().length).toBe(2);
				expect(time_pick.siblings().eq(1).is('.ui-timepicker-wrapper')).toBe(true);
				expect(time_pick.siblings().eq(1).css('display')).toBe('block');

				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);
				
				testContainer.empty();
				done();
			});
		});

		it('and can select a date and/or a time', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var time_pick = input.parent().parent().children().eq(2).children().children().children().eq(0);
			var date_pick = input.parent().parent().children().eq(0).children().eq(0).children().eq(0).children().eq(0);

			expect(ifw.get()).toBe('');

			time_pick.focus();
			date_pick.focus();
			pause(triggerWaitTime)
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);

				var day = testContainer.siblings().eq(26).children().eq(0).children().eq(0).children().eq(1).children().eq(1).children().eq(2);

				expect(input.parent().parent().parent().children().children().eq(0).children().children().eq(0).children().eq(1).css('display')).toBe('block');
				day.click(); 
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);

				// The placeholder should no longer be visible now there is data in the field
				expect(input.parent().parent().parent().children().children().eq(0).children().children().eq(0).children().eq(1).css('display')).toBe('none');

				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(time_pick.siblings().length).toBe(2);
				expect(time_pick.siblings().eq(1).is('.ui-timepicker-wrapper')).toBe(true);
				expect(time_pick.siblings().eq(1).css('display')).toBe('block');

				var time = time_pick.siblings().eq(1).children().children().eq(5);
			
				time.mousedown();
				time.mouseup();

				expect(input.parent().children().eq(2).is(':visible')).not.toBe(true);
			 	expect(ifw.get()).not.toBe('');
			 	expect(time.is('.ui-timepicker-selected')).toBe(true);

			 	testContainer.empty();

				done();
			});		
		});

		it('and can be torn down', function(done){
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(true);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(true);

				ifw.getType().tearDown(ifw);

				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(testContainer.siblings().eq(26).is('.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top')).toBe(false);
				expect(testContainer.siblings().eq(26).is(':visible')).toBe(false);
				expect(input.parent().children().eq(2).is(':visible')).not.toBe(true);

				testContainer.empty();

				done(); 
			});
		});

	});

	it('can be set up', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
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

		testContainer.empty();
	});

	it('can set up its fields', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');

		var spy_set = spyOn(ifw.getType(), '_setUpFields').and.callThrough();

		ifw.getType()._setUpFields(); 

		expect(spy_set).toHaveBeenCalled();

		expect(input.parent().css('display')).toBe('none');

		testContainer.empty();
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
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
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
			
			testContainer.empty(); 
		});

		it('and with clean events', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
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
			
			testContainer.empty(); 
		});
	});
	

	it('can split date and time', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');
		var spy_split = spyOn(ifw.getType(), '_splitDateAndTime').and.callThrough();

		var Object1 = {
			date: '',
			time: ''
		};

		var Object2 = {
			date: '1990-08-07',
			time: '04:00'
		};

		var result = ifw.getType()._splitDateAndTime('Not a valid date');

		expect(result).toEqual(Object1);

		var result2 = ifw.getType()._splitDateAndTime('08/07/1990');

		expect(result2).toEqual(Object2);

		testContainer.empty();
	});

	it('can join date and time', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
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

		testContainer.empty();
	});

});