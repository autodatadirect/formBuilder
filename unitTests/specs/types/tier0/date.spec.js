/**
 * Testing date data-type
 */
'use strict';
describe('The date data-type', function() {
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'date';

	it('is a valid data-type', function() {
		var input = $('<input type="text"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance;

		expect($.formBuilder.inputField.types[typeName]).toBeDefined();

		ifw.setType(typeName);
		
		// Should have these
		typeInstance = ifw.getType();
		expect(typeInstance.noRounding).toBe(false);
		expect(typeInstance.minDate).toBeUndefined();
		expect(typeInstance.maxDate).toBeUndefined();
	});

	it('is created with a placeholder', function() {
		var input = $('<input type="text" data-type="date"/>').inputField();	

		expect(input.parent().children('.placeholder').length).toBe(1);
		expect(input.parent().children('.placeholder').text()).toBe('MM/DD/YYYY');
	});

	describe('has a datepicker', function() {
		it('that opens on focus', function(done) {
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
			var datepicker;

			datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
			expect(datepicker.length).toBe(0);
			expect(datepicker.is(':visible')).toBe(false);

			input.focus();

			pause(triggerWaitTime)
			.then(function() {
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);
				expect(datepicker.is(':visible')).toBe(true);

				testContainer.empty();

				done();
			});	 
		});

		it('that can select a date', function(done) {
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
			var datepicker;

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function() {
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);

				var day = datepicker.children().eq(0).children().eq(0).children().eq(1).children().eq(1).children().eq(2);

				day.click(); 
				return pause(triggerWaitTime);
			})
			.then(function() {
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(0);
				expect(ifw.get()).not.toBe('');

				testContainer.empty();

				done();
			});		
		}); 

		it('and can be torn down', function(done) {
			var input = $('<input type="text" data-type="date"/>').appendTo(testContainer).inputField();
			var ifw = input.data('formBuilderInputField');
			var datepicker;

			expect(ifw.get()).toBe('');

			input.focus();
			pause(triggerWaitTime)
			.then(function() {
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(1);

				ifw.getType().tearDown(ifw);

				return pause(triggerWaitTime);
			})
			.then(function() {
				datepicker = testContainer.siblings('.datepicker.datepicker-dropdown');
				expect(datepicker.length).toBe(0);

				testContainer.empty();

				done(); 
			});
		});
	});
	

	it('has filter support', function() {
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var filter = input.data('formBuilderInputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}

			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('/');
	});

	describe('has simple regex validation', function() {
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var valids, invalids;

		valids = [
			'02/02/2222', 
			'01/31/1234', 
			'12/31/9999'
		];

		invalids = [
			'00/02/2222',
			'13/02/2222',
			'02/32/2222',
			'0222/33/222222',
			'55555555555555' // too many characters, max allowed is ten
		];
		
		var validateNewVal = function(str) {
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts', valids, true, validateNewVal);
		batchTest('that rejects', invalids, false, validateNewVal);
	});

	it('can parse standard dates', function() {
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();
		var parse = typeInstance._parseOffsetDate.bind(typeInstance);

		expect(parse('1995-06-07')).toBe('06/07/1995');
		expect(parse('2020-02-20')).toBe('02/20/2020');
		expect(parse('bad format')).toBeUndefined();
		expect(parse()).toBeUndefined();
	});

	describe('can parse offset dates', function() {
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();
		var parse = typeInstance._parseOffsetDate.bind(typeInstance);
		var f = 'MM/DD/YYYY';

		it('with a single offset', function() {
			expect(parse("+5y")).toBe(moment().add(5,'years').endOf('year').format(f));
			expect(parse("+6m")).toBe(moment().add(6,'months').endOf('month').format(f));
			expect(parse("+7w")).toBe(moment().add(7,'weeks').endOf('week').format(f));
			expect(parse("+42d")).toBe(moment().add(42,'days').endOf('day').format(f));

			expect(parse("-5y")).toBe(moment().add(-5,'years').startOf('year').format(f));
			expect(parse("-6m")).toBe(moment().add(-6,'months').startOf('month').format(f));
			expect(parse("-7w")).toBe(moment().add(-7,'weeks').startOf('week').format(f));
			expect(parse("-42d")).toBe(moment().add(-42,'days').startOf('day').format(f));
		});

		it('with multiple offsets', function() {
			var m = moment().add(5,'years').endOf('year');
			expect(parse("+5y-6m")).toBe(m.add(-6,'months').startOf('month').format(f));
			expect(parse("+5y-6m+2m")).toBe(m.add(2,'months').endOf('month').format(f));
			expect(parse("+5y-6m+2m+7w")).toBe(m.add(7,'weeks').endOf('week').format(f));
			expect(parse("+5y-6m+2m+7w-42d")).toBe(m.add(-42,'days').startOf('day').format(f));
			expect(parse("-42d+5y+7w-6m+2m")).toBe(m.format(f));
			expect(parse("-42d+5y+7w+2m-6m")).not.toBe(m.format(f)); // like-unit order matters
		});

		describe('with disabled offset rounding', function() {
			it('for all offsets via attribute', function() {
				var input = $('<input type="text" data-type="'+typeName+'" data-no-rounding/>').inputField();
				var ifw = input.data('formBuilderInputField');
				var typeInstance = ifw.getType();
				var parse = typeInstance._parseOffsetDate.bind(typeInstance);

				var m = moment().add(5,'years');
				expect(parse("+5y-6m")).toBe(m.add(-6,'months').format(f));
				expect(parse("+5y-6m+2m")).toBe(m.add(2,'months').format(f));
				expect(parse("+5y-6m+2m+7w")).toBe(m.add(7,'weeks').format(f));
				expect(parse("+5y-6m+2m+7w-42d")).toBe(m.add(-42,'days').format(f));
			});

			it('for individual offsets via "!"', function() {
				var m = moment().add(5,'years').endOf('year');
				expect(parse("+5y-6!m")).toBe(m.add(-6,'months').format(f));
				expect(parse("+5y-6!m+2m")).toBe(m.add(2,'months').endOf('month').format(f));
				expect(parse("+5y-6!m+2m+7!w")).toBe(m.add(7,'weeks').format(f));
				expect(parse("+5y-6!m+2m+7!w-42d")).toBe(m.add(-42,'days').startOf('day').format(f));
			});
		});
	
	});

	it('can have a minDate', function() {
		var min = '1995-06-07';
		var input = $('<input type="text" data-type="'+typeName+'" data-min-date="'+min+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();

		expect(typeInstance.minDate).toBe('06/07/1995');
		expect(typeInstance.maxDate).toBeUndefined();
	});
	it('can have a maxDate', function() {
		var max = '2020-02-20';
		var input = $('<input type="text" data-type="'+typeName+'" data-max-date="'+max+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();

		expect(typeInstance.minDate).toBeUndefined();
		expect(typeInstance.maxDate).toBe('02/20/2020');
	});

	describe('can handle conversion', function() {
		it('using its toField', function() {
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			// With correct input 
			var result = typeInstance.converter.toField.call(typeInstance, '1988-07-23');

			expect(result).toBe('07/23/1988');

			// With incorrect input 
			var result2 = typeInstance.converter.toField.call(typeInstance, '18-07-23');

			expect(result2).toBe('');

			// With no input 
			var result3 = typeInstance.converter.toField.call(typeInstance);

			expect(result3).toBe('');
		});

		it('and fromField functions', function() {
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			// With correct input 
			var result = typeInstance.converter.fromField.call(typeInstance, '07/23/1988');

			expect(result).toBe('1988-07-23');

			// With incorrect input 
			var result2 = typeInstance.converter.fromField.call(typeInstance, '07/23/88');

			expect(result2).toBe('');

			// With no input 
			var result3 = typeInstance.converter.fromField.call(typeInstance);

			expect(result3).toBe('');
		});
	});

	it('stores as local date, rather than utc date', function() {
		var input = $('<input type="text" data-type="'+typeName+'" data-store-utc="false"/>').inputField();
		var ifw = input.data('formBuilderInputField');

		ifw.set('2015-06-14');
		expect(ifw.get()).toBe('2015-06-14');
		expect(input.val()).toBe('06/14/2015');
	});

	it('can be torn down', function() {
		var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var typeInstance = ifw.getType();

		spyOn(ifw.element, 'datepicker').and.callThrough();

		typeInstance.tearDown(ifw);
		expect(ifw.element.datepicker).toHaveBeenCalled();
		expect(ifw.element.datepicker).toHaveBeenCalledWith('remove');
	});

});
