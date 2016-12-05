// import '../util/jsdomSetup';
// import expect from 'expect';
// import def from './textSubmitter.def.js';
// import lolex from 'lolex';
// import $ from 'jquery';

// describe('The textSubmitter Widget', () => {
// 	let pop, pow, clock; // spy;

// 	const testContainer = $('<div/>').appendTo(document.body);
// 	const target = $('<div id="target"><h1>This is a target!</h1></div>').appendTo(testContainer);

// 	const setup = (htmlString = '<div><p>Some content</p><br><h4>And some more content</h4></div>', options) => {
// 		pop = $(htmlString);

// 		pow = Object.create(def);
// 		pow.element = pop;
// 		pow.options = options || pow.options;
// 		pow._trigger = expect.createSpy();

// 		pow._create();
// 		pow._init();

// 		// spy = {
// 		// 	trigger: expect.spyOn(pow, '_trigger').andReturn(true),
// 		// 	position: expect.spyOn(pow, 'position').andCallThrough(),
// 		// 	show: expect.spyOn(pow, 'show').andCallThrough(),
// 		// 	hide: expect.spyOn(pow, 'hide').andCallThrough(),
// 		// 	element: {
// 		// 		position: expect.spyOn(pow.element, 'position').andCallThrough(),
// 		// 		fadeIn: expect.spyOn(pow.element, 'fadeIn').andCallThrough()
// 		// 	}
// 		// };
// 	};

// 	beforeEach(() => {
// 		clock = lolex.install();
// 		setup();
// 	});

// 	afterEach(() => {
// 		clock.uninstall();
// 		pow._destroy();
// 		pop.remove();
// 	});

// });