import '../util/jsdomSetup';
import expect from 'expect';
import def from './textSubmitter.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('The textSubmitter Widget', () => {
	let tsp, tsw, clock;

	const testContainer = $('<div/>').appendTo(document.body);

	const setup = (options, htmlString = '<div></div>', testContainerFlag = false) => {
		testContainer.empty();

		if (testContainerFlag) {
			$(htmlString).appendTo(testContainer);
		}

		tsp = $(htmlString);

		tsw = Object.create(def);
		tsw.element = tsp;
		
		if(options) {
			tsw.options = $.extend({}, tsw.options, options);
		} else {
			tsw.options = $.extend({}, tsw.options);
		}
		
		expect.spyOn(tsw, 'clear').andCallThrough();
		expect.spyOn(tsw, 'disable').andCallThrough();
		expect.spyOn(tsw, 'enable').andCallThrough();
		expect.spyOn(tsw,'_submit').andCallThrough();

		$.fn.inputField = expect.createSpy().andCall((input) => {
			if (input === 'isEmpty') {
				if (tsw.textEntry.is(':empty')) {
					return true;
				}
				
				return false;
			}
		});

		tsw._trigger = expect.createSpy().andCall((eventName, ev, data) => {
			const func = tsw.options[eventName];

			if(func) {
				func(ev, data);
			}

			return this;
		});

		tsw._create();
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
	});

	afterEach(() => {
		clock.uninstall();
		tsw._destroy();
		tsp.remove();
	});

	it('can be destroyed', () => {
		setup(undefined, undefined, true);

		expect(tsp.find('.text-submitter').length).toBe(1);
		expect(tsp.is('.formBuilder-textSubmitter')).toBe(true);

		tsw._destroy();

		expect(tsp.find('.text-submitter').length).toBe(0);
		expect(tsp.is('.formBuilder-textSubmitter')).toBe(false);
	});

	describe('can be created', () => {
		it('with the default settings', () => {
			expect(tsp.is('.formBuilder-textSubmitter')).toBe(true);
			expect(tsw).toBeTruthy();
			expect($.fn.inputField).toHaveBeenCalled();
		});

		it('with specified options', () => {
			const options = {
				width: '900px',
				placeholder: 'some placeholder',
				sendInstruction: 'some instruction',
				rows: 10
			};

			setup(options);

			expect(tsp.is('.formBuilder-textSubmitter')).toBe(true);
			expect(tsw).toBeTruthy();

			options.width = parseInt(options.width, 10);

			expect(tsw.textEntry.width()).toBe(options.width);
			expect(tsw.element.width()).toBe(options.width);
			expect(tsw.textEntry.attr('rows')).toBe(options.rows.toString());
		});
	});

	describe('has a textarea inputField', () => {
		it('whose value can be set', () => {
			tsw.set('some val');

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('set', 'some val');
		});

		it('whose value can be retrieved', () => {
			tsw.get();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('get');
		});

		it('whose value can be cleared', () => {
			tsw.clear();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('clear');
		});

		it('that can be disabled', () => {
			tsw.disable();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('disable');
		});

		it('that can be enabled', () => {
			tsw.enable();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('enable');
		});
	});

	describe('has a send instruction message', () => {
		const instr = 'some instruction';

		it('which can be set with an option', () => {
			setup({ 
				sendInstruction: instr 
			});

			expect(tsw.sendInstruction.text().trim()).toBe(instr);
		});

		it('which can be set with a function', () => {
			expect(tsw.sendInstruction.text().trim()).toNotBe(instr);

			tsw.setInstruction(instr);
			expect(tsw.sendInstruction.text().trim()).toBe(instr);
		});

		it('which is visible only when focused', () => {
			setup(undefined, undefined, true);
			
			expect(tsw.sendInstruction.css('visibility')).toBe('hidden');

			tsw.textEntry.focus();
			clock.tick();

			expect(tsw.sendInstruction.css('visibility')).toBe('visible');
				
			tsw.textEntry.blur();
			clock.tick();
			
			expect(tsw.sendInstruction.css('visibility')).toBe('hidden');
		});	
	});

	describe('can be submitted', () => {		
		it('by pressing enter in the textEntry', () => {
			tsw.textEntry.trigger($.Event('keydown',{
				which: 13 //enter
			}));

			clock.tick();
			expect(tsw._submit).toHaveBeenCalled();
		});

		it('and is disabled + triggers an event on submit', () => {
			tsw._submit();

			expect(tsw.disable).toHaveBeenCalled();
			expect(tsw._trigger).toHaveBeenCalled();
			expect(tsw._trigger.getLastCall().arguments[0]).toBe('submit');
			expect(tsw._trigger.getLastCall().arguments[1]).toBe(null);
			expect($.isFunction(tsw._trigger.getLastCall().arguments[2].onComplete)).toBe(true);
			expect($.fn.inputField).toHaveBeenCalled();
			expect($.fn.inputField.getLastCall().arguments[0]).toBe('get');
		});

		it('and is cleared and enabled on submit callback', () => {
			const f = {
				submit: function(ev, data){
					f.onComplete = data.onComplete;
				}
			};

			setup({ 
				submit: function(ev, data){
					f.submit(ev,data);
				}
			});

			expect.spyOn(tsw.options, 'submit').andCallThrough();

			tsw._submit();
			clock.tick();

			expect(tsw.options.submit).toHaveBeenCalled();

			f.onComplete(false);
			expect(tsw.clear).toNotHaveBeenCalled();
			expect(tsw.enable).toHaveBeenCalled();
			tsw.enable.reset();

			f.onComplete(true);
			expect(tsw.clear).toHaveBeenCalled();
			expect(tsw.enable).toHaveBeenCalled();
		});

		it('and by default accepts empty input submissions', () => {
			expect(tsw.textEntry.is(':empty')).toBe(true);
			tsw._submit();
			expect(tsw._trigger).toHaveBeenCalled();
			expect(tsw._trigger.getLastCall().arguments[0]).toBe('submit');
		});

		it('and can ignore empty input submissions', () => {
			setup({
				ignoreEmptySubmit: true
			});

			expect(tsw.textEntry.is(':empty')).toBe(true);
			tsw._submit();
			expect(tsw._trigger).toNotHaveBeenCalled();
		});
	});

});