import '../util/jsdomSetup';
import expect from 'expect';
import def from './submitButton.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('A submitButton', () => {
	let sbp, sbw, clock, spinner, label;

	const testContainer = $('<div/>').appendTo(document.body),
		form = $('<form><form>'),
		input = $('<input type="text"></input>');

	const setup = (options, buttonHtml = '<button type="submit">Submit</button>', testContainerFlag = false, formFlag = false) => {
		testContainer.empty();

		if(testContainerFlag) {
			$(buttonHtml).appendTo(testContainer);
		}

		if (formFlag) {
			input.appendTo(form);
			$(buttonHtml).appendTo(form);
			form.appendTo(testContainer);
		}

		sbp = $(buttonHtml);
		sbw = Object.create(def);

		sbw.element = sbp;

		if(options) {
			sbw.options = $.extend({}, sbw.options, options);
		} else {
			sbw.options = $.extend({}, sbw.options);
		}

		sbw.element.button = expect.createSpy().andCall(() => {
			const button = $('<button>A button element</button>');
			button.appendTo(sbw.element);
			button.addClass('ui-button-text');

			return sbw.element;
		});

		sbw._create();

		sbw.spinner.spin = expect.createSpy();
		sbw.spinner.appendTo = expect.createSpy().andCall(() => {
			$('<div class="spinner"></div>').appendTo(sbw.element);
		});

		sbw._trigger = expect.createSpy().andCall((eventName, ev, data) => {
			const func = sbw.options[eventName];

			if(func) {
				func(ev, data);
			}

			return this;
		});

		expect.spyOn(sbw, '_showLoading').andCallThrough();
		expect.spyOn(sbw, '_hideLoading').andCallThrough();
		expect.spyOn(sbw, 'disable').andCallThrough();
		expect.spyOn(sbw, 'enable').andCallThrough();

		label = sbp.children('.ui-button-text');
		spinner = sbp.children('.spinner');
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
	});

	afterEach(() => {
		clock.uninstall();
		sbw._destroy();
		sbp.remove();
	});

	it('can show its loading status', () => {
		expect(label.css('visibility')).toNotBe('hidden');
		expect(sbw.spinner.appendTo).toNotHaveBeenCalled();
		expect(sbw.spinner.spin).toNotHaveBeenCalled();

		sbw._showLoading();

		expect(label.css('visibility')).toBe('hidden');
		expect(sbw.spinner.appendTo).toHaveBeenCalled();
		expect(sbw.spinner.spin).toHaveBeenCalled();
	});

	it('can hide its loading status', () => {
		sbw._showLoading();

		expect(label.css('visibility')).toBe('hidden');
		expect(sbw.spinner.appendTo).toHaveBeenCalled();
		expect(sbw.spinner.spin).toHaveBeenCalled();
		expect(sbw.element.is('.submitting')).toBeTruthy();

		sbw._hideLoading();

		expect(sbw.element.is('.submitting')).toBeFalsy();
		expect(label.css('visibility')).toBe('visible');
	});

	it('can be disabled', () => {
		expect(sbw.options.disabled).toBe(false);

		sbw.disable();

		expect(sbw.options.disabled).toBe(true);
	});

	it('can be enabled', () => {
		sbw.disable();

		expect(sbw.options.disabled).toBe(true);

		sbw.enable();

		expect(sbw.options.disabled).toBe(false);
	});

	it('can destory itself', () => {
		expect(sbw).toBeTruthy();

		sbw._destroy();

		expect(sbw.destroyed).toBe(true);
		expect(sbw._destroy()).toBeFalsy();
	});

	describe('is created with', () => {
		it('a hidden spinner', () => {
			expect(spinner.length).toBe(1);
			expect(spinner.children().length).toBe(0);
		});
	});

	describe('can be created', () => {
		it('created with defaults', () => {
			expect(sbp.is('.formBuilder-submitButton')).toBe(true);
			expect(sbw).toBeTruthy();
			expect(sbp.children().length).toBe(2);
		});

		it('with set options', () => {
			const options = {
				color: '#EAEAEA',
				delay: 42,
				disabled: true,
				waiting: true,
				preventDefault: false,
				enterKeyListenerProvider: () => {
					return $('form')[0];
				},
				onKeyDown: () => {
					return;
				}
			};

			setup(options);

			expect(sbw.element.button).toHaveBeenCalled();

			expect(sbp.is('.formBuilder-submitButton')).toBe(true);
			expect(sbp.children().length).toBe(2);

			expect(sbw).toBeTruthy();
			expect(sbw.options.color).toBe(options.color);
			expect(sbw.options.delay).toBe(options.delay);
			expect(sbw.options.disabled).toBe(options.disabled);
			expect(sbw.options.waiting).toBe(options.waiting);
			expect(sbw.options.preventDefault).toBe(options.preventDefault);
			expect(sbw.options.enterKeyListenerProvider).toBe(options.enterKeyListenerProvider);
			expect(sbw.options.onKeyDown).toBe(options.onKeyDown);
		});
	});

	describe('can be submitted', () => {
		it('on click', () => {
			setup(undefined, undefined, true);

			sbp.click();
			clock.tick();

			expect(sbw._showLoading).toHaveBeenCalled();
		});

		xit('on enter key (by default)', () => {
			setup(undefined, undefined, false, true);

			input.focus();

			const e = $.Event('keydown');
			e.keyCode = 13;
			sbp.siblings('input').trigger(e);
			clock.tick(10);

			expect(sbw._showLoading).toHaveBeenCalled();
		});

		it('on form submit (manual)', () => {
			form.submit((ev) => {
				sbw.submit(ev);

				expect(ev.isDefaultPrevented()).toBe(true);
				ev.preventDefault();
			});

			form.submit();
			clock.tick(10);

			expect(sbw._showLoading).toHaveBeenCalled();
		});

		it('directly, without an event', () => {
			sbw.submit();
			clock.tick();

			expect(sbw._showLoading).toHaveBeenCalled();
		});

		it('and trigger "beforesubmit"', () => {
			sbw.submit();
			clock.tick();

			expect(sbw._trigger).toHaveBeenCalled();
			expect(sbw._trigger).toHaveBeenCalledWith('beforesubmit', null);
		});

		it('and trigger "submit"', () => {
			sbw.submit();
			clock.tick(10);

			expect(sbw._trigger).toHaveBeenCalled();
			expect(sbw._trigger.calls.length).toBe(2);

			const args = sbw._trigger.calls[1].arguments;

			expect(args.length).toBe(3);
			expect(args[0]).toBe('submit');
			expect(args[1]).toBeFalsy();
			expect($.isFunction(args[2])).toBe(true);
		});

		it('and trigger "aftersubmit" and hide on completion',() => {
			setup({
				submit: (ev, cb) => {
					cb();
				}
			});

			sbw.submit();

			clock.tick(10);

			expect(sbw._hideLoading).toHaveBeenCalled();
			expect(sbw._trigger).toHaveBeenCalled();
			expect(sbw._trigger).toHaveBeenCalledWith('aftersubmit', null);
			expect(sbw.spinner.appendTo).toHaveBeenCalled();
			expect(sbw.spinner.spin).toHaveBeenCalled();
		});
	});

	describe('can be marked', () =>  {
		it('as complete', () =>  {
			expect(sbp.is('.complete')).toBe(false);
			expect(sbw.disable).toNotHaveBeenCalled();

			sbw.markComplete();

			expect(sbp.is('.complete')).toBe(true);
			expect(sbw.disable).toHaveBeenCalled();
		});

		it('as incomplete', () =>  {
			sbw.markComplete();

			expect(sbp.is('.complete')).toBe(true);
			expect(sbw.enable).toNotHaveBeenCalled();

			sbw.markIncomplete();

			expect(sbp.is('.complete')).toBe(false);
			expect(sbw.enable).toHaveBeenCalled();
		});
	});
});