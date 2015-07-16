/** 
 * Testing the tms Fullname type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true*/
'use strict';
 describe('The Fullname data type',function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	it('will not allow a single word input', function(done){
		var input = $('<input type="text" data-type="tmsFullname"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var err; 

		input.focus();
		
		pause(triggerWaitTime)
		.then(function(){			
			ifw.set('OneName');

			input.blur();

			return pause(triggerWaitTime);
		})
		.then(function(){
			err = $(document).find('div .error-overlay');

			expect(err.is(':visible')).toBe(true);
			expect(err.text()).toBe('first and last name');

			testContainer.empty();

			done(); 
		});
	});

	it('will allow two or more words as input', function(done){
		var input = $('<input type="text" data-type="tmsFullname"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var err; 

		input.focus();
		
		pause(triggerWaitTime)
		.then(function(){			
			ifw.set('Hello Names');

			input.blur();

			return pause(triggerWaitTime);
		})
		.then(function(){
			err = $(document).find('div .error-overlay');

			expect(err.is(':visible')).toBe(false);

			return pause(triggerWaitTime);
		})
		.then(function(){			
			ifw.set('Three More Names');

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

	it('should allow commas in between the two names', function(done){
		var input = $('<input type="text" data-type="tmsFullname"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var err; 

		input.focus();
		
		pause(triggerWaitTime)
		.then(function(){			
			ifw.set('Two, Names');

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

	it('should allow hyphenated last names', function(done){
		var input = $('<input type="text" data-type="tmsFullname"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var err; 

		input.focus();
		
		pause(triggerWaitTime)
		.then(function(){			
			ifw.set('Sarah Is-Married');

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

	it('should allow apostrophes in names', function(done){
		var input = $('<input type="text" data-type="tmsFullname"/>').appendTo(testContainer).inputField();
		var ifw = input.data('formBuilderInputField');
		var err; 

		input.focus();
		
		pause(triggerWaitTime)
		.then(function(){			
			ifw.set('N\'amdi O\'Conner');

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

	it('has filter support that will convert all lower case to upper case', function(){
		var input = $('<input type="text" data-type="tmsFullname"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var filter = input.data('formBuilderInputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual(chars.ALPHAS);
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="tmsFullname"/>').wrap('<div/>').inputField();
		var ifw = input.data('formBuilderInputField');
		var valids, invalids;

		valids = [
			"good name", 
			"even better name"
		];

		invalids = [
			chars.digits,
			chars.symbols,
			'bad',
			'worse',
			'!@#', 
			'name! with? symbols*'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});
});
