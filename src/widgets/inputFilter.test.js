import '../util/jsdomSetup';
import expect from 'expect';
import def from './inputFilter.def.js';
import lolex from 'lolex';

import $ from 'jquery';

describe('A inputFilter', () => {
	let ifp, ifw, clock, spy, skipAfter;
	const testContainer = $('<div/>').appendTo(document.body);

	const setup = (options, inputHtml = '<input type="text"/>') => {
		testContainer.empty();

		ifp = $(inputHtml).appendTo(testContainer);

		ifw = Object.create(def);
		ifw._trigger = expect.createSpy();
		ifw.element = ifp;
		ifw.options = options || ifw.options;

		ifw._create();

		spy = {
			_clean: expect.spyOn(ifw, '_clean'),
			_type: expect.spyOn(ifw, '_type').andCallThrough(),
			trigger: expect.spyOn(ifp, 'trigger').andCallThrough()
		};
	};

	const teardown = () => {
		ifw._destroy();
		ifp.remove();
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
		skipAfter = false;
	});

	afterEach(() => {
		if (!skipAfter) {
			teardown();
		}
		clock.uninstall();
	});

	it('can be created', () => {
		expect(ifp).toBeTruthy();
		expect(ifw).toBeTruthy();

		expect(ifp).toExist();
		expect(ifw).toExist();
	});

	it('can be created with options', () => {
		const ops = {
			toUpper: true,
			max: 100,
			pattern: /./
		};

		setup(ops);

		expect(ifp).toExist();
		expect(ifw).toBeTruthy();
		expect(ifw.options.toUpper).toBe(ops.toUpper);
		expect(ifw.options.max).toBe(ops.max);
		expect(ifw.options.pattern).toBe(ops.pattern);
	});

	it('can set its max value', () => {
		const testMax = 12;

		ifw.options.max = 0;
		ifw.setMax(testMax);
		expect(ifw.options.max).toBe(testMax);
	});

	it('can set its pattern', () => {
		const testPattern = /a-zA-Z0-9/g;

		ifw.options.pattern = /./;
		ifw.setPattern(testPattern);
		expect(ifw.options.pattern).toBe(testPattern);
	});

	it('will schedule a clean after on paste', () => {
		ifp.trigger('paste');
		clock.tick();

		expect(spy._clean).toHaveBeenCalled();
		expect(spy._clean.calls.length).toBe(1);
	});

	it('detects potential native changes from keydown events', () => {
		let code;

		expect(ifw.nativeChange).toBe(false);
		code = 42; // *
		ifp.trigger($.Event('keydown',{which:code}));
		clock.tick();
		expect(ifw.nativeChange).toBe(false);

		ifw.nativeChange = false;
		code = 32; // space
		ifp.trigger($.Event('keydown',{which:code}));
		clock.tick();
		expect(ifw.nativeChange).toBe(false);

		ifw.nativeChange = false;
		code = 31; // non-char
		ifp.trigger($.Event('keydown',{which:code}));
		clock.tick();
		expect(ifw.nativeChange).toBe(true);

		ifw.nativeChange = false;
		code = 126; // ~
		ifp.trigger($.Event('keydown',{which:code}));
		clock.tick();
		expect(ifw.nativeChange).toBe(false);

		ifw.nativeChange = false;
		code = 42; // *
		ifp.trigger($.Event('keydown',{which:code, ctrlKey:true}));
		clock.tick();
		expect(ifw.nativeChange).toBe(true);

		ifw.nativeChange = false;
		code = 127; // non-char
		ifp.trigger($.Event('keydown',{which:code}));
		clock.tick();
		expect(ifw.nativeChange).toBe(true);
	});

	it('calls change event for new native changes on blur', () => {
		let cCount;

		ifp.change(() => {
			++cCount;
		});

		ifw.nativeChange = true;
		ifw.memory = ifp.val();

		cCount = 0;
		ifp.trigger('blur');
		clock.tick();
		expect(cCount).toBe(0);

		ifp.nativeChange = true;
		ifp.trigger('blur');
		clock.tick();
		expect(cCount).toBe(1);
		expect(ifw.nativeChange).toBe(false);

		ifp.val('some val');
		ifp.trigger('blur');
		clock.tick();
		expect(cCount).toBe(2);
	});

	it('can handle typing on keypress for typeable text', () => {
		let cCount = 0,
			code;

		code = 42; // *
		ifp.trigger($.Event('keypress',{which: code}));
		clock.tick();
		expect(spy._type.calls.length).toBe(++cCount);

		code = 32; // space
		ifp.trigger($.Event('keypress',{which: code}));
		clock.tick();
		expect(spy._type.calls.length).toBe(++cCount);

		code = 31; // non-char
		ifp.trigger($.Event('keypress',{which: code}));
		clock.tick();
		expect(spy._type.calls.length).toBe(cCount);

		code = 126; // ~
		ifp.trigger($.Event('keypress',{which: code}));
		clock.tick();
		expect(spy._type.calls.length).toBe(++cCount);

		code = 42; // *
		ifp.trigger($.Event('keypress',{which: code, ctrlKey:true}));
		clock.tick();
		expect(spy._type.calls.length).toBe(cCount);

		code = 127; // non-char
		ifp.trigger($.Event('keypress',{which: code}));
		clock.tick();
		expect(spy._type.calls.length).toBe(cCount);
	});

	it('can destroy itself', () => {
		expect(ifw).toExist();
		ifw._destroy();
		ifw = ifp.data('formBuilderInputFilter');
		expect(ifw).toNotExist();
		skipAfter = true;
	});

	describe('can manually type a char', () => {
		it('to the end of the input', () => {
			ifp.val('123456');

			const isTyped = ifw._type('A');

			expect(isTyped).toBe(true);
			expect(ifp.val()).toBe('123456A');
		});

		it('with the caret in the middle of a value without moving it', () => {
			clock.tick();
			ifp.val('123456').caret(2,2); //start after 2

			const pos = ifp.caret();
			++pos.begin;
			++pos.end;

			const isTyped = ifw._type('A');

			expect(isTyped).toBe(true);
			expect(ifp.val()).toBe('12A3456');
			expect(ifp.caret()).toEqual(pos);

			testContainer.empty();
		});

		it('and can convert it to uppercase', () => {
			setup({toUpper: true});

			const isTyped = ifw._type('a');

			expect(isTyped).toBe(true);
			expect(ifp.val()).toBe('A');
		});

		it('and trigger status events', () => {
			setup({pattern: /[A-Z]/});

			ifw._type('A');
			clock.tick();

			expect(ifw._trigger).toHaveBeenCalledWith('keytyped');
			ifw._trigger.calls.length;

			ifw._type('2');
			clock.tick();

			expect(ifw._trigger).toHaveBeenCalledWith('keyignored');
		});

		it('and prevent going over the max (unfocused)', () => {
			ifw.setMax(6);

			ifp.val('123456');

			const isTyped = ifw._type('A');

			expect(isTyped).toBe(false);
			expect(ifp.val()).toBe('123456');
		});

		it('and prevent going over the max (focused)', () => {
			ifw.setMax(6);
			ifp.focus();

			ifp.val('123456').caret(2,2); //start after 2

			const pos = ifp.caret();
			const isTyped = ifw._type('A');

			expect(isTyped).toBe(false);
			expect(ifp.val()).toBe('123456');
			expect(pos).toEqual(ifp.caret());

			testContainer.empty();
		});

		it('and pass it through a custom extraFilter', () => {
			let testChar,
				isTyped;

			setup({
				pattern: /[abc]/,
				extraFilter: function(val, inChar) {
					expect(val).toBe(ifp.val());
					expect(inChar).toBe(testChar);

					if(inChar === 'a') {
						return inChar;
					} else if(inChar === 'c') {
						return '[something else]';
					}

					return; //ignore all else
				}
			});

			expect.spyOn(ifw.options, 'extraFilter').andCallThrough();

			ifp.val('start');

			testChar = 'd';
			isTyped = ifw._type(testChar);
			expect(isTyped).toBe(false);
			expect(ifw.options.extraFilter).toNotHaveBeenCalled();
			expect(ifp.val()).toBe('start');

			testChar = 'a';
			isTyped = ifw._type(testChar);
			expect(isTyped).toBe(true);
			expect(ifw.options.extraFilter).toHaveBeenCalled();
			expect(ifp.val()).toBe('starta');
			ifw.options.extraFilter.reset();

			testChar = 'b';
			isTyped = ifw._type(testChar);
			expect(isTyped).toBe(false);
			expect(ifw.options.extraFilter).toHaveBeenCalled();
			expect(ifp.val()).toBe('starta');
			ifw.options.extraFilter.reset();

			testChar = 'c';
			isTyped = ifw._type(testChar);
			expect(isTyped).toBe(true);
			expect(ifw.options.extraFilter).toHaveBeenCalled();
			expect(ifp.val()).toBe('starta[something else]');
			ifw.options.extraFilter.reset();

			testChar = 'c';
			ifp.caret(3,3);
			isTyped = ifw._type(testChar);
			expect(isTyped).toBe(true);
			expect(ifw.options.extraFilter).toHaveBeenCalled();
			expect(ifp.val()).toBe('sta[something else]rta[something else]');

			testContainer.empty();
		});
	});
});