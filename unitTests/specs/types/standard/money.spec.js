/**
 * Testing money data-type
 */

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
			for(var i = 0; i < str.length; ++i)
				filter._type(str[i]);
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
		});

		it('that can be customized with attribute data-currency-symbol', function(){
			var input = $('<input type="text" data-type="'+typeName+'" data-currency-symbol="&pound;"/>')
				.wrap('<div/>').inputField();
			var addon = input.parent().siblings('.addon');

			expect(addon.length).toBe(1);
			expect(addon.text()).toBe("£");
		});
	});

	describe('has a converter', function(){
		it('that formats to field', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
		
			spyOn(type, 'format');

			ifw._formatToField('1234'); 
			
			expect(type.format).toHaveBeenCalled(); 
		});

		it('that formats from field', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
		
			spyOn(type, 'format');

			var result = ifw._formatFromField('1234'); 
			
			expect(type.format).toHaveBeenCalled(); 
			expect(result).toEqual(jasmine.any(Number)); 
		});
	});

	describe('has a format', function(){
		it('that formats it like money, only using the first', function(){
			expect(type.format(chars.digits)).toBe('1234567890.00');
			expect(type.format('01234567890')).toBe('1234567890.00');
			expect(type.format('56619')).toBe('56619.00');
			expect(type.format('56619.')).toBe('56619.00');
			expect(type.format('.56619')).toBe('0.57');
			expect(type.format('-123')).toBe('-123.00');
			expect(type.format('123.155')).toBe('123.16');
			expect(type.format('2312.3.12.3.1')).toBe('2312.31');
			expect(type.format('12..34')).toBe('12.34');// This one needs to be looked at 
			expect(type.format('12.3.4.6')).toBe('12.35');
			expect(type.format('12345.4123')).toBe('12345.41');
		});

		it('that is set on blur', function(){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			
			spyOn(type, 'format');

			input.focus(); 
			input.blur(); // When input is blurred the input should be formatted 

			expect(type.format).toHaveBeenCalled(); 

			testContainer.empty();
		});

		it('that is set on change, keeping the caret position', function(done){
			var input = $('<input type="text" data-type="'+typeName+'"/>').appendTo(testContainer).inputField();
			var ifw = input.data('add123InputField');
			
			spyOn(type, 'format').and.callThrough();

			input.val('7777').caret(2,2); //start after 2
			
			pos = input.caret();

			input.change(); // When input is changed the caret should be modified 

			pause(triggerWaitTime)
			.then(function(){
				expect(type.format).toHaveBeenCalled();
				expect(util.equals(pos,input.caret())).toBe(true);
				expect(input.val()).toEqual('7777.00');
				testContainer.empty();
				done();
			});
			
		});
			
	});

	// does not have validation, is format based
});
