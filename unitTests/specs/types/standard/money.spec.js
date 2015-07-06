/**
 * Testing money data-type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('The money data-type', function(){
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;
	var testContainer = window.formBuilderTesting.testContainer;
	var typeName = 'money';
	var type = $.add123.inputField.types[typeName];
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), $.add123.inputField.types.text)).toBe(false);
	});
	
	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

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
		expect(typeNewString(chars.symbols)).toEqual('.');
		expect(typeNewString(chars.all)).toEqual(chars.digits + '.');
	});

	describe('has a currency symbol addon',function(){
		it('that is "$" by default', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();	
			var addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.text()).toBe("$");

			expect(input.parent().siblings().length).toBe(1);
		});

		it('that can be customized with attribute data-currency-symbol', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-currency-symbol="&pound;"/>').wrap('<div/>').inputField();
			var addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.text()).toBe("£");

			expect(input.parent().siblings().length).toBe(1);
		});

		it('that can be set to not be displayed', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-show-symbol="true/>').wrap('<div/>').inputField();
			
			expect(input.parent().siblings().length).toBe(0);
		});
	});

	describe('has a max/min attribute', function(){
		var testContainer = window.formBuilderTesting.testContainer;
	 	var pause = window.formBuilderTesting.pause;
		var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

		it('that allows you to set a max amount of money to be entered', function(done){
			var input = $('<input type="text" data-type="'+typeName+'" data-max-amount="10.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();
			
			pause(triggerWaitTime)
			.then(function(){	
				// Legal entry		
				ifw.set('9.00');

				input.blur();

				return pause(triggerWaitTime);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(false);

				testContainer.empty();

				done();
			});
		});

		it('and will not allow input to exceed that amount', function(done){
	 		var input = $('<input type="text" data-type="'+typeName+'" data-max-amount="10.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();

	 		pause(triggerWaitTime)
	 		.then(function(){	
				// Illegal entry		
				ifw.set('900.00');

				input.blur();

				return pause(triggerWaitTime*100);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(true);
				expect(err.text()).toBe('over');

				testContainer.empty(); 

				done(); 
			});
 		}); 

 		it('that allows you to set a min amount of money to be entered', function(done){
			var input = $('<input type="text" data-type="'+typeName+'" data-min-amount="10.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();
			
			pause(triggerWaitTime)
			.then(function(){	
				// Legal entry		
				ifw.set('19.00');

				input.blur();

				return pause(triggerWaitTime);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(false);

				testContainer.empty();

				done();
			});
		});

		it('and will not allow input to be less than that amount', function(done){
	 		var input = $('<input type="text" data-type="'+typeName+'" data-min-amount="10.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();

	 		pause(triggerWaitTime)
	 		.then(function(){	
				// Illegal entry		
				ifw.set('9.00');

				input.blur();

				return pause(triggerWaitTime*100);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(true);
				expect(err.text()).toBe('under');

				testContainer.empty(); 

				done(); 
			});
 		}); 

 		it('that allows you to set a both min amount and a max amount of money to be entered', function(done){
			var input = $('<input type="text" data-type="'+typeName+'" data-min-amount="10.00" data-max-amount="100.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();
			
			pause(triggerWaitTime)
			.then(function(){	
				// Legal entry		
				ifw.set('19.00');

				input.blur();
				return pause(triggerWaitTime);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(false);

				testContainer.empty();

				done();
			});
		});

		it('and will not allow input to be less than the min or greater than the max', function(done){
	 		var input = $('<input type="text" data-type="'+typeName+'" data-min-amount="10.00" data-max-amount="100.00"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var err;

			input.focus();

	 		pause(triggerWaitTime)
	 		.then(function(){	
				// Illegal entry		
				ifw.set('9.00');

				input.blur();

				return pause(triggerWaitTime*100);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(true);
				expect(err.text()).toBe('under');

				return pause(triggerWaitTime);
			})
			.then(function(){	
				// Illegal entry		
				ifw.set('900.00');

				input.blur();

				return pause(triggerWaitTime*100);
			})
			.then(function(){
				err = $(document).find('div .error-overlay');

				expect(err.is(':visible')).toBe(true);
				expect(err.text()).toBe('over');

				testContainer.empty(); 

				done();
			});
 		});
	});

	describe('has a converter', function(){
		it('that formats to field', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');
		
			var spy_format = spyOn(ifw.getType(), 'format');

			ifw._formatToField('1234'); 
			
			expect(spy_format).toHaveBeenCalled(); 
		});

		it('that formats from field', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').inputField();
			var ifw = input.data('add123InputField');
		
			var spy_format = spyOn(ifw.getType(), 'format');

			var result = ifw._formatFromField('1234'); 
			
			expect(spy_format).toHaveBeenCalled(); 
			expect(result).toEqual(jasmine.any(Number)); 
		});
	});

	describe('has a format', function(){
		it('that formats it like money, only using the first', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			
			expect(ifw.getType().format(chars.digits)).toBe('1234567890.00');
			expect(ifw.getType().format('01234567890')).toBe('1234567890.00');
			expect(ifw.getType().format('56619')).toBe('56619.00');
			expect(ifw.getType().format('56619.')).toBe('56619.00');
			expect(ifw.getType().format('.56619')).toBe('0.57');
			expect(ifw.getType().format('-123')).toBe('-123.00');
			expect(ifw.getType().format('123.155')).toBe('123.16');
			expect(ifw.getType().format('2312.3.12.3.1')).toBe('2312.31');
			expect(ifw.getType().format('12..34')).toBe('12.34');// This one needs to be looked at 
			expect(ifw.getType().format('12.3.4.6')).toBe('12.35');
			expect(ifw.getType().format('12345.4123')).toBe('12345.41');
		});

		it('that is set on blur', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			
			var spy_format = spyOn(ifw.getType(), 'format');

			input.focus(); 
			input.blur(); // When input is blurred the input should be formatted 

			expect(spy_format).toHaveBeenCalled(); 

			testContainer.empty();
		});

		it('that is set on change, keeping the caret position', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			var pos;
			
			var spy_format = spyOn(ifw.getType(), 'format').and.callThrough();

			input.val('7777').caret(2,2); //start after 2
			
			pos = input.caret();

			input.change(); // When input is changed the caret should be modified 

			pause(triggerWaitTime)
			.then(function(){
				expect(spy_format).toHaveBeenCalled();
				expect(util.equals(pos,input.caret())).toBe(true);
				expect(input.val()).toEqual('7777.00');

				testContainer.empty();

				done();
			});
			
		});
			
	});

	it('can set and get its values', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
		var ifw = input.data('add123InputField');

		ifw.set(100.55); 

		expect(ifw.get()).toEqual(100.55);

		testContainer.empty();
	});

	// does not have validation, is format based
});
