/**
 * Testing dropDownPanel widget
 */
'use strict';
describe('A dropDownPanel widget', function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	var	basePanelHtml = '<div>Some panel</div>';
	var baseTargetHtml = '<div>Some target</div>';


	it('can be created', function(){
		var target = $(baseTargetHtml).wrap('<div></div>');
		var panel = $(basePanelHtml).dropDownPanel({target: target});
		var ddpw = panel.data('formBuilderDropDownPanel');

		expect(ddpw).toBeDefined();
		expect(panel.is(':formBuilder-dropDownPanel')).toBe(true);
		expect(panel.is('.fb-dropDownPanel-content')).toBe(true);
		expect(panel.parent().is('.fb-dropDownPanel')).toBe(true);
		expect(panel.parent().parent().is('.fb-dropDownPanel-wrapper')).toBe(true);
		expect(target.next().is('.fb-dropDownPanel-wrapper')).toBe(true);
	});

	it('throws an error when created without a target', function(){
		var panel = $(basePanelHtml);
		var exception;

		try {
			panel.dropDownPanel();
		} catch (ex) {
			exception = ex;
		}

		expect(exception).toBeDefined();
		expect(exception).toBe('[dropDownPanel] No target element specifed.');
	});

	it('can get its class names', function() {
		var target = $(baseTargetHtml).wrap('<div></div>');
		var panel = $(basePanelHtml).dropDownPanel({target: target});
		var ddpw = panel.data('formBuilderDropDownPanel');
		var instanceClasses = ddpw.getClassNames();

		expect(instanceClasses).toEqual({
			target: 'fb-dropDownPanel-'+ddpw.id+'-target',
			focus: 'fb-dropDownPanel-'+ddpw.id+'-focusTarget'
		});
	});

	it('can get its instance id', function(){
		var target = $(baseTargetHtml).wrap('<div></div>');
		var panel = $(basePanelHtml).dropDownPanel({target: target});
		var ddpw = panel.data('formBuilderDropDownPanel');

		expect(ddpw.id).toBe(ddpw.getId());
	});


	describe('can be attached', function(){
		it('to a normal element', function(){
			var source = $('<div></div>');
			var target = $(baseTargetHtml).wrap('<div></div>');
			var panel = $(basePanelHtml).appendTo(source);
			var ddpw;

			expect(source.children().length).toBe(1);
			expect(target.siblings().length).toBe(0);

			panel.dropDownPanel({target: target});
			expect(source.children().length).toBe(0);
			expect(target.siblings().length).toBe(1);
			
			ddpw = panel.data('formBuilderDropDownPanel');
			expect(ddpw.target.is(target)).toBe(true);
			expect(ddpw.focusTarget.is(target)).toBe(true);
			expect(ddpw.wrapper.parent().is(target.parent())).toBe(true);
		});

		it('to an inputField (from input)', function() {
			var source = $('<div></div>');
			var target = $('<input />').appendTo(testContainer).inputField();
			var panel = $(basePanelHtml).appendTo(source);
			var field = target.closest('.input-field-group');
			var ddpw;

			expect(source.children().length).toBe(1);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(1);

			panel.dropDownPanel({target: target});
			expect(source.children().length).toBe(0);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(2);
			
			ddpw = panel.data('formBuilderDropDownPanel');
			expect(ddpw.target.is(target.parent())).toBe(true);
			expect(ddpw.focusTarget.is(target)).toBe(true);
			expect(ddpw.wrapper.parent().is(field)).toBe(true);
		});

		it('to an inputField (from .input-field)', function() {
			var source = $('<div></div>');
			var target = $('<input />').appendTo(testContainer).inputField();
			var panel = $(basePanelHtml).appendTo(source);
			var field = target.closest('.input-field-group');
			var ddpw;

			expect(source.children().length).toBe(1);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(1);

			panel.dropDownPanel({target: target.inputField('getField')});
			expect(source.children().length).toBe(0);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(2);
			
			ddpw = panel.data('formBuilderDropDownPanel');
			expect(ddpw.target.is(target.parent())).toBe(true);
			expect(ddpw.focusTarget.is(target)).toBe(true);
			expect(ddpw.wrapper.parent().is(field)).toBe(true);
		});

		it('to an inputField, targeting all of the field items wth an option', function() {
			var source = $('<div></div>');
			var target = $('<input />').appendTo(testContainer).inputField();
			var panel = $(basePanelHtml).appendTo(source);
			var field = target.closest('.input-field-group');
			var ddpw;

			expect(source.children().length).toBe(1);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(1);

			panel.dropDownPanel({
				target: target,
				targetInput: false
			});
			expect(source.children().length).toBe(0);
			expect(target.siblings().length).toBe(0);
			expect(field.children().length).toBe(2);
			
			ddpw = panel.data('formBuilderDropDownPanel');
			expect(ddpw.target.is(target.inputField('getField'))).toBe(true);
			expect(ddpw.focusTarget.is(target)).toBe(true);
			expect(ddpw.wrapper.parent().is(field)).toBe(true);
		});
	});

	it('can be detached from an element', function(){
		var target = $(baseTargetHtml).wrap('<div></div>');
		var panel = $(basePanelHtml).dropDownPanel({target: target});
		var ddpw = panel.data('formBuilderDropDownPanel');

		expect(ddpw.target.is(target)).toBe(true);
		expect(ddpw.focusTarget.is(target)).toBe(true);
		expect(ddpw.wrapper.parent().is(target.parent())).toBe(true);

		ddpw.detach();

		expect(ddpw.target).toBeUndefined();
		expect(ddpw.focusTarget).toBeUndefined();
		expect(ddpw.wrapper.parent().length).toBe(0);
	});


	describe('can be opened', function(){
		it('with a function call', function(){
			var target = $(baseTargetHtml).appendTo(testContainer);
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');
			
			spyOn(ddpw, '_trigger').and.callThrough();

			expect(ddpw.panel.is(':visible')).toBe(false);
			expect(ddpw.isOpen).toBe(false);

			ddpw.open();
			expect(ddpw.panel.is(':visible')).toBe(true);
			expect(ddpw.isOpen).toBe(true);
			expect(ddpw._trigger.calls.count()).toBe(2);
			expect(ddpw._trigger.calls.argsFor(0)[0]).toBe('beforeopen');
			expect(ddpw._trigger).toHaveBeenCalledWith('afteropen');

			testContainer.empty();
		});

		it('and can get its open status', function() {
			var target = $(baseTargetHtml).wrap('<div></div>');
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');

			expect(ddpw.isOpen).toBe(false);
			expect(ddpw.isOpen).toBe(ddpw.isOpened());

			ddpw.open();
			expect(ddpw.isOpen).toBe(true);
			expect(ddpw.isOpen).toBe(ddpw.isOpened());
		});

		it('only when closed', function() {
			var target = $(baseTargetHtml).wrap('<div></div>');
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');

			spyOn(ddpw, '_trigger').and.callThrough();

			ddpw.open();
			expect(ddpw.isOpen).toBe(true);
			expect(ddpw._trigger.calls.count()).toBe(2);
			expect(ddpw._trigger.calls.argsFor(0)[0]).toBe('beforeopen');
			expect(ddpw._trigger).toHaveBeenCalledWith('afteropen');

			ddpw._trigger.calls.reset();

			ddpw.open();
			expect(ddpw.isOpen).toBe(true);
			expect(ddpw._trigger.calls.count()).toBe(0);

		});

		it('when the focusTarget is clicked', function(done) {
			var target = $(baseTargetHtml).wrap('<div></div>');
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');			

			spyOn(ddpw, 'open');

			ddpw.focusTarget.trigger('click');
			pause(triggerWaitTime)
			.then(function(){
				expect(ddpw.open).toHaveBeenCalled();
				done();
			});
		});

		it('when a focusable focusTarget is focused', function(done) {
			var target = $('<div><input /></div>').appendTo(testContainer);
			var panel = $(basePanelHtml).dropDownPanel({
				target: target.find('input')
			});
			var ddpw = panel.data('formBuilderDropDownPanel');			

			spyOn(ddpw, 'open');

			ddpw.focusTarget.trigger('focus');
			pause(triggerWaitTime)
			.then(function(){
				expect(ddpw.open).toHaveBeenCalled();

				testContainer.empty();
				done();
			});
		});

		describe('and be positioned', function(){
			it('below the focusTarget', function() {
				var target = $(baseTargetHtml).width(400).height(50).appendTo(testContainer);
				var panel = $(basePanelHtml).width(100).dropDownPanel({target: target});
				var ddpw = panel.data('formBuilderDropDownPanel');
				var extraSpacing = ddpw.panel.outerWidth() - ddpw.panel.width();

				

				expect(ddpw.panel.width()).toBe(100);
				expect(ddpw.panel.outerWidth()).toBe(100 + extraSpacing);
				expect(ddpw.panel.css('left')).toBe('0px');
				expect(ddpw.panel.css('top')).toBe('auto');

				ddpw.open();

				expect(ddpw.panel.width()).toBe(400 - extraSpacing);
				expect(ddpw.panel.outerWidth()).toBe(400);
				expect(ddpw.panel.css('left')).toBe('0px');
				expect(ddpw.panel.css('top')).toBe('0px');

				// Enforce some distance arbitrarily + reopen
				ddpw.wrapper.css('margin-left', '70px');
				ddpw.wrapper.css('margin-top', '20px');

				ddpw.isOpen = false;
				ddpw.open();

				expect(ddpw.panel.width()).toBe(400 - extraSpacing);
				expect(ddpw.panel.outerWidth()).toBe(400);
				expect(ddpw.panel.css('left')).toBe('-70px');
				expect(ddpw.panel.css('top')).toBe('-20px');

				testContainer.empty();
			});

			it('with offsets', function() {
				var target = $(baseTargetHtml).width(400).height(50).appendTo(testContainer);
				var panel = $(basePanelHtml).width(100).dropDownPanel({
					target: target,
					offset: {
						top: 30,
						left: 50
					}
				});
				var ddpw = panel.data('formBuilderDropDownPanel');
				var extraSpacing = ddpw.panel.outerWidth() - ddpw.panel.width();

				expect(ddpw.panel.width()).toBe(100);
				expect(ddpw.panel.outerWidth()).toBe(100 + extraSpacing);
				expect(ddpw.panel.css('left')).toBe('0px');
				expect(ddpw.panel.css('top')).toBe('auto');

				ddpw.open();

				expect(ddpw.panel.width()).toBe(400 - extraSpacing);
				expect(ddpw.panel.outerWidth()).toBe(400);
				expect(ddpw.panel.css('top')).toBe('30px');
				expect(ddpw.panel.css('left')).toBe('50px');
				
				testContainer.empty();
			});

		});
		

	});
	
	
	describe('can be closed', function(){
		it('with a function call', function() {
			var target = $(baseTargetHtml).appendTo(testContainer);
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');
			
			ddpw.open();
			expect(ddpw.panel.is(':visible')).toBe(true);
			expect(ddpw.isOpen).toBe(true);

			spyOn(ddpw, '_trigger').and.callThrough();

			ddpw.close();
			expect(ddpw.panel.is(':visible')).toBe(false);
			expect(ddpw.isOpen).toBe(false);
			expect(ddpw._trigger.calls.count()).toBe(2);
			expect(ddpw._trigger).toHaveBeenCalledWith('beforeclose');
			expect(ddpw._trigger).toHaveBeenCalledWith('afterclose');

			testContainer.empty();
		});

		it('only when open', function() {
			var target = $(baseTargetHtml).wrap('<div></div>');
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');
			
			spyOn(ddpw, '_trigger').and.callThrough();

			ddpw.close();
			expect(ddpw.panel.is(':visible')).toBe(false);
			expect(ddpw.isOpen).toBe(false);
			expect(ddpw._trigger).not.toHaveBeenCalled();
		});

		it('when something outside the panel and focus target is clicked', function(done) {
			var target = $(baseTargetHtml).width(100).height(50).appendTo(testContainer);
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');

			spyOn(ddpw, 'close');

			ddpw.open();

			$(document).trigger('click');
			pause(triggerWaitTime)
			.then(function() {
				expect(ddpw.close).toHaveBeenCalled();
				testContainer.empty();
				done();
			});
		});

		it('when the escape key is pressed', function(done) {
			var target = $(baseTargetHtml).appendTo(testContainer);
			var panel = $(basePanelHtml).dropDownPanel({target: target});
			var ddpw = panel.data('formBuilderDropDownPanel');
			var ev = $.Event('keyup', {which: 27});

			spyOn(ddpw, 'close');
			spyOn(ddpw.focusTarget, 'focus');

			ddpw.open();

			$(document).trigger(ev);
			pause(triggerWaitTime)
			.then(function() {
				expect(ev.isDefaultPrevented()).toBe(true);
				expect(ev.isPropagationStopped()).toBe(true);
				expect(ddpw.focusTarget.focus).toHaveBeenCalled();
				expect(ddpw.close).toHaveBeenCalled();

				testContainer.empty();
				done();
			});
		});

	});

	it('can be destroyed', function(){
		var target = $(baseTargetHtml).appendTo(testContainer);
		var panel = $(basePanelHtml).dropDownPanel({target: target});
		
		expect(target.siblings().length).toBe(1);
		expect(target.next().is('.fb-dropDownPanel-wrapper')).toBe(true);
		expect(panel.is(':formBuilder-dropDownPanel')).toBe(true);
		expect(panel.data('formBuilderDropDownPanel')).toBeDefined();

		panel.dropDownPanel('destroy');

		expect(target.siblings().length).toBe(0);
		expect(panel.is(':formBuilder-dropDownPanel')).toBe(false);
		expect(panel.data('formBuilderDropDownPanel')).toBeUndefined();

		testContainer.empty();
	});
});