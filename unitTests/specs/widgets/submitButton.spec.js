/**
 * Testing submitButton
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true */
'use strict';
describe('A submitButton', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	
	var buttonHtml = '<button type="submit">Submit</button>';
 
 	describe('can be created', function(){
 		it('with defaults', function(){
 			var btn =  $(buttonHtml).submitButton();
 			var sbw = btn.data('formBuilderSubmitButton');

 			expect(btn.is(':formBuilder-submitButton')).toBe(true);
 			expect(sbw).toBeDefined();
 			expect(btn.children().length).toBe(2);
 		});

 		it('with set options', function(){
 			var options = {
 				color: '#EAEAEA',
 				delay: 42,
 				disabled: true,
 				waiting: true,
 				preventDefault: false,
 				enterKeyListenerProvider: function(){
 					return $('form')[0];
 				},
 				onKeyDown: function(ev) {
 					return;
 				}
 			};
 			var btn =  $(buttonHtml).submitButton(options);
 			var sbw = btn.data('formBuilderSubmitButton');

 			expect(btn.is(':formBuilder-submitButton')).toBe(true);
 			expect(sbw).toBeDefined();
 			expect(btn.children().length).toBe(2);

 			expect(sbw.options.color).toBe(options.color);
 			expect(sbw.options.delay).toBe(options.delay);
 			expect(sbw.options.disabled).toBe(options.disabled);
 			expect(sbw.options.waiting).toBe(options.waiting);
 			expect(sbw.options.preventDefault).toBe(options.preventDefault);
 			expect(sbw.options.enterKeyListenerProvider).toBe(options.enterKeyListenerProvider);
 			expect(sbw.options.onKeyDown).toBe(options.onKeyDown);
 		});
 	});


	describe('is created with', function(){
		it('a hidden spinner', function(){
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');
			var spinner = btn.children('.spinner');

			expect(spinner.length).toBe(1);
			expect(spinner.children().length).toBe(0);
		});

		it('jquery-ui button text', function(){
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');
			var label = btn.children('.ui-button-text');

			expect(label.length).toBe(1);
			expect(label.text()).toBe('Submit');
			expect(label.css('visibility')).not.toBe('hidden');
		});
	});

	it('can get its button label', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');
		var label = btn.children('.ui-button-text');

		expect(label.is(sbw.getButtonLabel())).toBe(true);
	});
	
	it('can show its loading status', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');
		var spinner = btn.children('.spinner');
		var label = sbw.getButtonLabel();

		expect(spinner.children().length).toBe(0);
		expect(label.css('visibility')).not.toBe('hidden');

		sbw._showLoading();

		expect(label.css('visibility')).toBe('hidden');
		expect(spinner.children().length).toBeGreaterThan(0); //spinner stuff
	});

	it('can hide its loading status', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');
		var spinner = btn.children('.spinner');
		var label = sbw.getButtonLabel();

		sbw._showLoading();

		expect(label.css('visibility')).toBe('hidden');
		expect(spinner.children().length).toBeGreaterThan(0); //spinner stuff

		sbw._hideLoading();

		expect(spinner.children().length).toBe(0);
		expect(label.css('visibility')).toBe('visible');
	});

	it('can be disabled', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');

		expect(sbw.options.disabled).toBe(false);

		sbw.disable();

		expect(sbw.options.disabled).toBe(true);
	}); 

	it('can be enabled', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');

		sbw.disable();

		expect(sbw.options.disabled).toBe(true);

		sbw.enable();

		expect(sbw.options.disabled).toBe(false);
	});

	describe('can be submitted', function(done){
		it('on click', function(done){
			var btn =  $(buttonHtml).appendTo(testContainer).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw, '_showLoading'); //actual submit is proxied
			btn.click();
			pause(triggerWaitTime)
			.then(function(){
				expect(sbw._showLoading).toHaveBeenCalled();

				testContainer.empty();
				done();
			});
		});

		it('on enter key (by default)', function(done){
			var btn =  $(buttonHtml);
			var form = $('<form><form>');
			var input = $('<input type="text"></input>');
			var sbw, e;

			input.appendTo(form);
			btn.appendTo(form).submitButton();
			form.appendTo(testContainer);

			btn. submitButton();
			sbw = btn.data('formBuilderSubmitButton');


			spyOn(sbw, '_showLoading'); //actual submit is proxied
			
			input.focus();

			e = $.Event('keydown');
			e.keyCode = 13;	//enter
			btn.siblings('input').trigger(e);
			pause(triggerWaitTime)
			.then(function(){
				expect(sbw._showLoading).toHaveBeenCalled();

				testContainer.empty();
				done();
			});
		});

		it('on form submit (manual)', function(done){
			var form = $('<form></form>');
			var btn =  $(buttonHtml).appendTo(form).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw, '_showLoading');

			// Pass event to submit
			form.submit(function(ev){
				sbw.submit(ev);

				expect(ev.isDefaultPrevented()).toBe(true);
				ev.preventDefault(); //just in case
			});

			form.submit();
			pause(triggerWaitTime)
			.then(function(){
				expect(sbw._showLoading).toHaveBeenCalled();

				done();
			});
		});

		it('directly, without an event', function(done){
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw, '_showLoading');
			
			sbw.submit();
			pause(triggerWaitTime)
			.then(function(){
				expect(sbw._showLoading).toHaveBeenCalled();

				done();
			});
		});

		it('and trigger "beforesubmit"', function(done){
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw,'_trigger'); 
			
			sbw.submit();
			pause(triggerWaitTime)
			.then(function(){
				expect(sbw._trigger).toHaveBeenCalled();
				expect(sbw._trigger).toHaveBeenCalledWith('beforesubmit', null);

				done();
			});
		});

		it('and trigger "submit"', function(done){
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw,'_trigger'); 
			
			sbw.submit();
			pause(triggerWaitTime + sbw.options.delay)
			.then(function(){
				var args;

				expect(sbw._trigger).toHaveBeenCalled();
				expect(sbw._trigger.calls.count()).toBe(2);

				args = sbw._trigger.calls.argsFor(1); //get args for submit
				
				expect(args.length).toBe(3);
				expect(args[0]).toBe('submit');				//function called
				expect(args[1]).toBeNull();					//event
				expect($.isFunction(args[2])).toBe(true);	//callback

				done();
			});
		});

		it('and trigger "aftersubmit" and hide on completion',function(done){
			var btn =  $(buttonHtml).submitButton({
				submit: function(ev, cb){
					cb();
				}
			});
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw,'_trigger').and.callThrough();
			spyOn(sbw, '_hideLoading');
			
			sbw.submit();
			pause(triggerWaitTime + sbw.options.delay)
			.then(function(){
				expect(sbw._trigger).toHaveBeenCalled();

				//another trigger passes, but within the time. No need for pause

				expect(sbw._hideLoading).toHaveBeenCalled();
				expect(sbw._trigger).toHaveBeenCalledWith('aftersubmit', null);
				sbw._trigger.calls.reset();

				done();
			});
		});
	});

	describe('can be marked', function() {
		it('as complete', function() {
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			spyOn(sbw, 'disable');

			expect(btn.is('.complete')).toBe(false);
			expect(sbw.disable).not.toHaveBeenCalled();

			sbw.markComplete();

			expect(btn.is('.complete')).toBe(true);
			expect(sbw.disable).toHaveBeenCalled();
		});

		it('as incomplete', function() {
			var btn =  $(buttonHtml).submitButton();
			var sbw = btn.data('formBuilderSubmitButton');

			sbw.markComplete();
			spyOn(sbw, 'enable');

			expect(btn.is('.complete')).toBe(true);
			expect(sbw.enable).not.toHaveBeenCalled();
			
			sbw.markIncomplete();

			expect(btn.is('.complete')).toBe(false);
			expect(sbw.enable).toHaveBeenCalled();
		});
	});


	it('can destory itself', function(){
		var btn =  $(buttonHtml).submitButton();
		var sbw = btn.data('formBuilderSubmitButton');

		expect(sbw).toBeDefined();

		sbw.destroy();

		expect(sbw.destroyed).toBe(true);

		sbw = btn.data('formBuilderSubmitButton');

		expect(sbw).toBeUndefined();
	}); 
});