import '../util/jsdomSetup';
import expect from 'expect';
import def from './popOver.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('The popOver Widget', () => {
	let pop, pow, clock, spy;

	const testContainer = $('<div/>').appendTo(document.body);
	const target = $('<div id="target"><h1>This is a target!</h1></div>').appendTo(testContainer);

	const setup = (htmlString = '<div><p>Some content</p><br><h4>And some more content</h4></div>', options) => {
		pop = $(htmlString);

		pow = Object.create(def);
		pow.element = pop;
		pow.options = options || pow.options;
		pow._trigger = expect.createSpy();

		pow._create();
		pow._init();

		spy = {
			trigger: expect.spyOn(pow, '_trigger').andReturn(true),
			position: expect.spyOn(pow, 'position').andCallThrough(),
			show: expect.spyOn(pow, 'show').andCallThrough(),
			hide: expect.spyOn(pow, 'hide').andCallThrough(),
			element: {
				position: expect.spyOn(pow.element, 'position'),
				fadeIn: expect.spyOn(pow.element, 'fadeIn').andCall(function () {
					this[0].style.display = '';
				})
			}
		};
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
	});

	afterEach(() => {
		clock.uninstall();
		pow._destroy();
		pop.remove();
	});

	it('is hidden by default', () => {
		expect(pop[0].style._values.display).toBe('none');
		expect(pow.showing).toBe(false);
	});

	it('can show itself', () => {
		expect(pop[0].style._values.display).toBe('none');
		expect(pow.showing).toBe(false);
		expect(pow._trigger).toNotHaveBeenCalled();
		expect(spy.position).toNotHaveBeenCalled();
		expect(spy.element.fadeIn).toNotHaveBeenCalled();

		pow.show();

		clock.tick();

		expect(pop[0].style._values.display).toNotExist();
		expect(pow.showing).toBe(true);
		expect(spy.trigger).toHaveBeenCalled();
		expect(spy.trigger).toHaveBeenCalledWith('onShow');
		expect(spy.position).toHaveBeenCalled();
		expect(spy.element.fadeIn).toHaveBeenCalled();
	});

	it('can hide itself', () => {
		expect(pop[0].style._values.display).toBe('none');
		expect(pow.showing).toBe(false);
		expect(spy.trigger).toNotHaveBeenCalled();
		expect(spy.position).toNotHaveBeenCalled();
		expect(spy.element.fadeIn).toNotHaveBeenCalled();

		pow.show();

		clock.tick();
		expect(pop[0].style._values.display).toNotExist();

		pow.hide();

		expect(pop[0].style._values.display).toBe('none');
		expect(pow.showing).toBe(false);
		expect(spy.trigger).toHaveBeenCalled();
		expect(spy.trigger).toHaveBeenCalledWith('onShow');
		expect(spy.position).toHaveBeenCalled();
		expect(spy.element.fadeIn).toHaveBeenCalled();
	});

	it('can set its position around its target', () => {
		pow._destroy();
		pop.remove();
		const options = {
			target: target,
			my: 'left',
			at: 'left bottom',
			collision: 'flipfit'
		};

		setup(undefined, options);
		pow.position();
		clock.tick();

		expect(spy.position).toHaveBeenCalled();
		expect(spy.element.position).toHaveBeenCalled();

		expect(spy.element.position).toHaveBeenCalledWith({
			my: options.my,
			at: options.at,
			of: options.target,
			collision: options.collision
		});
	});

	it('can destroy itself', () => {
		expect(pow).toBeTruthy();
		pow._destroy();

		const popWidget = pop.data('formBuilderPopOver');
		expect(popWidget).toNotExist();
	});

	it('is positioned on window resize when showing', () => {
		$(window).trigger('resize');
		expect(spy.position).toNotHaveBeenCalled();

		pow.show();
		clock.tick();

		$(window).trigger('resize');
		expect(pow.position).toHaveBeenCalled();
	});

	it('is hidden when clicking outside of its target and itself', () => {
		pow.show();
		clock.tick();

		target.trigger('mousedown');
		clock.tick();
		expect(spy.hide).toNotHaveBeenCalled();

		target.children('h1').trigger('mousedown');
		clock.tick();
		expect(spy.hide).toNotHaveBeenCalled();

		pop.trigger('mousedown');
		clock.tick();

		expect(spy.hide).toNotHaveBeenCalled();

		testContainer.trigger('mousedown');
		clock.tick();

		expect(spy.hide).toHaveBeenCalled();
	});

	describe('is appended to a new element', () => {
		it('that is the body be default', () => {
			expect(pop.parent().is('body')).toBe(true);
		});

		it('that can be set and changed with a function call', () => {
			expect(pop.parent().is('body')).toBe(true);
			expect(pop.parent().is(testContainer)).toBe(false);
			pow.setAppendTo(testContainer);
			expect(pop.parent().is('body')).toBe(false);
			expect(pop.parent().is(testContainer)).toBe(true);
		});

		it('that can be set with a widget option', () => {
			pow._destroy();
			pop.remove();

			const options = {
				appendTo: testContainer
			};

			setup(undefined, options);

			expect(pop.parent().is('body')).toBe(false);
			expect(pop.parent().is(testContainer)).toBe(true);
		});
	});

	describe('can have a title', () => {
		it('that is hidden and empty by default', () => {
			const title = pop.children('.tooltip-title');
			expect(title.length).toBe(1, 'Title element was found');
			expect(title[0].style._values.display).toBe('none');
			expect(title.text()).toBe('');
		});

		it('that can be set with an attribute', () => {
			setup('<div title="Some Title!"><p>Some content</p><br><h4>And some more content</h4></div>');

			const title = pop.children('.tooltip-title');

			expect(title.length).toBe(1, 'Title element was found');
			expect(title[0].style._values.display).toNotExist('Title should be visible');
			expect(title.text()).toBe('Some Title!');
		});
	});

	describe('can be toggled', () => {
		it('from shown to hidden', () => {
			pow.show();
			clock.tick();

			spy.show.reset();

			pow.toggle();

			expect(pow.hide).toHaveBeenCalled();
			expect(spy.show).toNotHaveBeenCalled();
		});

		it('from hidden to shown', () => {
			pow.toggle();

			expect(spy.hide).toNotHaveBeenCalled();
			expect(spy.show).toHaveBeenCalled();
		});
	});
});
