/**
 * Testing popOver 
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true,  util:true*/
'use strict';
describe('A popOver', function(){
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var testContainer = window.formBuilderTesting.testContainer;

	var baseHtml = '<p>Some content</p><br><h4>And some more content</h4>';
	var targetHtml = '<div id="target"><h1>This is a target!</h1></div>';

	it('can be created', function(){
		var pop = $('<div>'+baseHtml+'</div>').popOver(); 	//popover dom element
		var pow = pop.data('add123PopOver');				//popOver widget instance
		
		expect(pop.is(':add123-popOver')).toBe(true);
		expect(pow).toBeDefined();
		expect(pop.is('.tooltip-wrapper')).toBe(true);
		expect(pop.parent().is('body')).toBe(true);
		expect(pop.children().length).toBe(2);
		expect(pop.children('.tooltip-title').length).toBe(1);
		expect(pop.children('.form-input-tooltip').length).toBe(1);
		expect(pop.children('.form-input-tooltip').html()).toBe(baseHtml);

		pop.remove();
	});

	describe('is appended to a new element', function(){
		it('that is the body be default', function(){
			var pop = $('<div>'+baseHtml+'</div>').popOver();
			expect(pop.parent().is('body')).toBe(true);

			pop.remove();
		});

		it('that can be set and changed with a function call', function(){
			var pop = $('<div>'+baseHtml+'</div>').popOver();
			var pow = pop.data('add123PopOver');

			expect(pop.parent().is('body')).toBe(true);
			expect(pop.parent().is(testContainer)).toBe(false);

			pow.setAppendTo(testContainer);
			
			expect(pop.parent().is('body')).toBe(false);
			expect(pop.parent().is(testContainer)).toBe(true);

			pop.remove();
		});

		it('that can be set with a widget option', function(){
			var pop = $('<div>'+baseHtml+'</div>').popOver({
				appendTo: testContainer
			});

			expect(pop.parent().is('body')).toBe(false);
			expect(pop.parent().is(testContainer)).toBe(true);

			pop.remove();
		});
	});

	describe('can have a title', function(){
		it('that is hidden and empty by default', function(){
			var pop = $('<div>'+baseHtml+'</div>').popOver();
			var title = pop.children('.tooltip-title');

			pop.show();

			expect(title.length).toBe(1);
			expect(title.is(':visible')).toBe(false);
			expect(title.text()).toBe('');

			pop.remove();
		});

		it('that can be set with an attribute', function(){
			var pop = $('<div title="Some title!">'+baseHtml+'</div>').popOver();
			var title = pop.children('.tooltip-title');

			pop.show();

			expect(title.length).toBe(1);
			expect(title.is(':visible')).toBe(true);
			expect(title.text()).toBe('Some title!');

			pop.remove();
		});
	});


	it('is hidden by default', function(){
		var pop = $('<div>'+baseHtml+'</div>').popOver();
		var pow = pop.data('add123PopOver');

		expect(pop.is(':visible')).toBe(false);
		expect(pow.showing).toBe(false);

		pop.remove();
	});

	it('can show itself', function(done){
		var pop = $('<div>'+baseHtml+'</div>').popOver();
		var pow = pop.data('add123PopOver');

		spyOn(pow, '_trigger');
		spyOn(pow, 'position');
		spyOn(pow.element, 'fadeIn').and.callThrough();

		expect(pop.is(':visible')).toBe(false);
		expect(pow.showing).toBe(false);
		expect(pow._trigger).not.toHaveBeenCalled();
		expect(pow.position).not.toHaveBeenCalled();
		expect(pow.element.fadeIn).not.toHaveBeenCalled();
		
		pow.show();

		pause(triggerWaitTime) //wait for it to be faded in
		.then(function(){
			expect(pop.is(':visible')).toBe(true);
			expect(pow.showing).toBe(true);
			expect(pow._trigger).toHaveBeenCalled();
			expect(pow._trigger).toHaveBeenCalledWith('onShow');
			expect(pow.position).toHaveBeenCalled();
			expect(pow.element.fadeIn).toHaveBeenCalled();

			pop.remove();
			done();
		});
		
	});

	it('can hide itself', function(done){
		var pop = $('<div>'+baseHtml+'</div>').popOver();
		var pow = pop.data('add123PopOver');

		pow.show();

		pause(triggerWaitTime)
		.then(function(){
			expect(pop.is(':visible')).toBe(true);
			expect(pow.showing).toBe(true);

			spyOn(pow, '_trigger');

			pow.hide();

			expect(pop.is(':visible')).toBe(false);
			expect(pow.showing).toBe(false);
			expect(pow._trigger).toHaveBeenCalled();
			expect(pow._trigger).toHaveBeenCalledWith('onHide');

			pop.remove();
			done();
		});
	});

	describe('can be toggled', function(){
		it('from shown to hidden', function(done){
			var pop = $('<div>'+baseHtml+'</div>').popOver();
			var pow = pop.data('add123PopOver');

			pow.show();

			pause(triggerWaitTime)
			.then(function(){
				spyOn(pow, 'hide');
				spyOn(pow, 'show');

				pow.toggle();

				expect(pow.hide).toHaveBeenCalled();
				expect(pow.show).not.toHaveBeenCalled();

				pop.remove();
				done();
			});
		});

		it('from hidden to shown', function(){
			var pop = $('<div>'+baseHtml+'</div>').popOver();
			var pow = pop.data('add123PopOver');

			//hidden by default

			spyOn(pow, 'hide');
			spyOn(pow, 'show');

			pow.toggle();

			expect(pow.hide).not.toHaveBeenCalled();
			expect(pow.show).toHaveBeenCalled();

			pop.remove();
		});
	});

	it('is hidden when clicking outside of its target and itself', function(done){
		var target = $(targetHtml).appendTo(testContainer);
		var pop = $('<div>'+baseHtml+'</div>').popOver({
			target: target
		});
		var pow = pop.data('add123PopOver');

		spyOn(pow, 'hide');

		pow.show();

		target.trigger('mousedown');
		pause(triggerWaitTime)
		.then(function(){
			expect(pow.hide).not.toHaveBeenCalled();
			
			target.children('h1').trigger('mousedown');

			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(pow.hide).not.toHaveBeenCalled();

			pop.trigger('mousedown');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(pow.hide).not.toHaveBeenCalled();

			testContainer.trigger('mousedown');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(pow.hide).toHaveBeenCalled();

			pop.remove();
			target.remove();
			done();
		});
	});

	it('can set its position around its target', function(done){
		var options = {
			target: $(targetHtml).appendTo(testContainer)[0],
			my: 'left',
			at: 'left bottom',
			collision: 'flipfit'
		};
		var pop = $('<div>'+baseHtml+'</div>').popOver(options);
		var pow = pop.data('add123PopOver');

		spyOn(pow.element, 'position'); //jquery function
		pow.position();	//widget function
		pause(triggerWaitTime)
		.then(function(){
			expect(pow.element.position).toHaveBeenCalled();
			expect(pow.element.position).toHaveBeenCalledWith({
				my: options.my,
				at: options.at,
				of: options.target,
				collision: options.collision
			});

			pop.remove();
			testContainer.empty();
			done();
		});
	});

	it('is positioned on window resize when showing', function(done){
		var pop = $('<div>'+baseHtml+'</div>').popOver();
		var pow = pop.data('add123PopOver');

		spyOn(pow,'position');

		$(window).trigger('resize');
		pause(triggerWaitTime)
		.then(function(){
			expect(pow.position).not.toHaveBeenCalled();

			pow.show();

			$(window).trigger('resize');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(pow.position).toHaveBeenCalled();

			pop.remove();
			done();
		});
	});

	it('can destroy itself', function(){
		var pop = $('<div>'+baseHtml+'</div>').popOver();
		var pow = pop.data('add123PopOver');

		expect(pow).toBeDefined();

		pow.destroy();

		pow = pop.data('add123PopOver');

		expect(pow).toBeUndefined();
		expect(pop.is(':add123-popOver')).toBe(false);

		pop.remove();
	});

	it('is added by the user through a tooltip', function(){
		var input = $('<input type="text" data-type="text"/>').wrap('<div></div>');
		var tool = $('<div class="tooltip" </div>').insertAfter(input);	

		input.inputField();

		expect(tool.is(':add123-popOver')).toBe(true);

		var toolT = $('body').find('.tooltip');
		var wrapper = $('body').find('.tooltip.tooltip-wrapper');
		expect(wrapper.length).toBe(1);
		expect(toolT.length).toBe(2);

		tool.remove();
	});

	it('can be added with a title if the user chooses to', function(){
		var input = $('<input type="text" data-type="text"/>').wrap('<div></div>');
		var tool = $('<div class="tooltip" title="Example Title"></div>').insertAfter(input);	

		input.inputField();

		var title = $('body').find('.tooltip-title');
		expect(title.length).toBe(1);
		expect(title.text()).toBe("Example Title");

		tool.remove();
	});

	it('can be added with data inside the tooltip that is entered by the user', function(){
		var input = $('<input type="text" data-type="text"/>').wrap('<div></div>');
		var tool = $('<div class="tooltip" <h1>Tooltip without a header</h1><p>Paragraph One</p><p>Paragraph Two</p><a href="http://add123.com">Some link somewhere cool</a></div>').insertAfter(input);	

		input.inputField();

		var tool_input = $('body').find('.tooltip.form-input-tooltip');

		var firstP = $(tool_input).find('p').eq(0);
		var secondP = $(tool_input).find('p').eq(1);
		var link = $(tool_input).find('a').attr('href');

		expect(firstP.text()).toBe('Paragraph One');
		expect(secondP.text()).toBe('Paragraph Two');
		expect(link).toBe('http://add123.com');

		tool.remove();
	});
});