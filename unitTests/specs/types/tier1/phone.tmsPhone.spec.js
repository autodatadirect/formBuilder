/** 
 * Testing the tms phone type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
 describe('The tms Phone data type',function(){
 	var testContainer = window.formBuilderTesting.testContainer;
 	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	describe('can be created', function(){

		it('with a popover addon', function(){
			var input = $('<input type="text" data-type="tmsPhone"/>').inputField();

			expect(input.parent().siblings().is('.field-item.addon.clickable')).toBe(true);

			expect(input.parent().siblings().children().children().is('.tms-icon')).toBe(true);
		});

		it('that can be clicked on to open a popOver', function(done){
			var input = $('<input type="text" data-type="tmsPhone"/>').appendTo(testContainer).inputField();
			var drop; 

			var addon = $(document).find('.field-item.addon.clickable');
			drop = $(document).find('.phone-type-form.tooltip-wrapper');

			expect(drop.length).toBe(0);
			expect(drop.css('display')).toBeUndefined();

			addon.click();
			pause(triggerWaitTime)
			.then(function(){
				drop = $(document).find('.phone-type-form.tooltip-wrapper');

				expect(drop.length).toBe(1);
				expect(drop.css('display')).toBe('block');

				testContainer.empty();

				done(); 
			});
		});

		it('and can be used to select other phone types', function(done){
			var input = $('<input type="text" data-type="tmsPhone"/>').appendTo(testContainer).inputField();
			var drop, item, icon; 

			var addon = $(document).find('.field-item.addon.clickable');
			drop = $(document).find('.phone-type-form.tooltip-wrapper');

			// Default icon is the home phone 
			expect(input.parent().siblings().children().children().is('.tms-icon.tms-icon-home')).toBe(true);

			addon.click();
			pause(triggerWaitTime)
			.then(function(){
				item = $(document).find('.phone-type.clickable');

				item.eq(2).click();

				return pause(triggerWaitTime);
			})
			.then(function(){
				// Now the icon should be for a work phone
				expect(input.parent().siblings().children().children().is('.tms-icon.tms-icon-office')).toBe(true);

				testContainer.empty(); 

				done();
			});
		});
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="tmsPhone"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			'2345678910x1234', 
			'12345678910x1234', 
			'5678910x1234', 
			'5678910'
		];

		invalids = [
			'2-()(x345(67-8  910', 
			'234567891x01234', 
			'2345678910x123x4'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="tmsPhone"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('x');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('()- ');
	});
});