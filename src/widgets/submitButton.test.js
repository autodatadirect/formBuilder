import '../util/jsdomSetup';
import expect from 'expect';
import def from './submitButton.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('A submitButton', () => {
	let sbp, sbw, clock, spy, spinner, label;
	const testContainer = $('<div/>').appendTo(document.body);

	const setup = (options, buttonHtml = '<button type="submit">Submit</button>') => {
		testContainer.empty();

		sbp = $(buttonHtml);
		sbw = Object.create(def);

		sbw.element = sbp;
		sbw.options = options || sbw.options;
		
		sbw.element.button = expect.createSpy().andCall(() => {
			// console.log('\t\tButton element called');
			const button = $('<button>A button element</button>');
			button.appendTo(sbw.element);
			button.addClass('ui-button-text');

			return sbw.element;
		});

		sbw._create();

		sbw.spinner.spin = expect.createSpy().andCall(() => {
			console.log('Spin Called!!!');
			// sbw.spinner.spin.options = {
			// 	color: '',
			// 	top: '',
			// 	left: ''
			// };

			// return sbw.spinner.spin;
		});

		spy = {
			button: expect.spyOn(sbw.element, 'button'),
			spinner: expect.spyOn(sbw.spinner, 'appendTo').andCall(() => {
				console.log('$$$$$$$$$$$$$$$$$$');
				return sbw.spinner;
			}),
			spin: expect.spyOn(sbw.spinner, 'appendTo').andCall(() => {
				console.log('$$$$$$$$$$$$$$$$$$');
				return sbw.spinner;
			})
		};
		// sbw.spinner = expect.createSpy().andCall(() => {
		// 	console.log('Spinner element called');
			
		// });

		label = sbp.children('.ui-button-text');
		spinner = sbp.children('.spinner');
		// console.log(spinner);
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

	describe('can be created', () => {
		it('created with defaults', () => {
			expect(sbp.is('.formBuilder-submitButton')).toBe(true);
			expect(sbw).toBeTruthy();
			expect(sbp.children().length).toBe(2);
		});

		it('with set options', function(){

			const options = {
				color: '#EAEAEA',
				delay: 42,
				disabled: true,
				waiting: true,
				preventDefault: false,
				enterKeyListenerProvider: function(){
					return $('form')[0];
				},
				onKeyDown: function() {
					return;
				}
			};

			setup(options);

			expect(spy.button).toHaveBeenCalled();

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

	describe('is created with', () => {
		it('a hidden spinner', () => {	
			expect(spinner.length).toBe(1);
			expect(spinner.children().length).toBe(0);
		});

		xit('jquery-ui button text', () => {
			// var btn =  $(buttonHtml).submitButton();
			// var sbw = btn.data('formBuilderSubmitButton');
			// var label = btn.children('.ui-button-text');

			// expect(label.length).toBe(1);
			// expect(label.text()).toBe('Submit');
			// expect(label.css('visibility')).not.toBe('hidden');
		});
	});

	xit('can get its button label', function(){
		// expect(label.is(sbw.getButtonLabel())).toBe(true);
	});

	it('can show its loading status', function(){
		// var spinner = btn.children('.spinner');
		// var label = sbw.getButtonLabel();

		expect(spinner.children().length).toBe(0);
		expect(label.css('visibility')).toNotBe('hidden');
		console.log('Before: ' + label.css('visibility'));

		sbw._showLoading();

		console.log('After: ' + label.css('visibility'));
		expect(label.css('visibility')).toBe('hidden');
		// expect(spinner.children().length).toBeGreaterThan(0); //spinner stuff
	});
});