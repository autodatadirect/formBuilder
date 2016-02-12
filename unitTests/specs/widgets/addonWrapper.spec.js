/**
 * Tests for widge addonWrapper
 */
'use strict';



describe('The addonWrapper widget', function() {
	function simpleTestInstance(addToTestContainer, options) {

		var t = new window.formBuilderTesting.TestInstance();

		t.e = $('<div style="width: 200px; background-color: #A4A4A4; display: inline-block;"></div>');
		t.e.wrap('<div style="display:inline-block; line-height: 25px; background-color: #D8D8D8;"></div>');
		t.p = t.e.parent();

		if(addToTestContainer) {
			t.add(t.p);
		}

		t.e.text('src');
		t.e.addonWrapper(options);
		t.w = t.e.data('formBuilderAddonWrapper');

		return t;
	}

	function makeAddon(inside) {
		return '<div style="background-color: #FA5882">'+inside+'</div>';
	}

	xit('ui testing', function() {
		var t = simpleTestInstance(true, {
			fixWidth: true
		});

		t.e.addonWrapper('add', makeAddon('A1'), -1);
		t.e.addonWrapper('add', makeAddon('A2'), 0);
		t.e.addonWrapper('add', makeAddon('A3'), -1);
		t.e.addonWrapper('add', makeAddon('A4'), -1);
	});

	it('can be created', function() {
		var t = simpleTestInstance();

		expect(t.w).toBeDefined();
		expect(t.w.sides).toBeDefined();
	});

	it('can save a width', function() {
		var t = simpleTestInstance(true);

		expect(t.w.savedWidth).toBeUndefined();

		t.w._saveWidth();
		expect(t.w.savedWidth).toBeDefined();
		expect(t.w.savedWidth).toBe(t.p.width());

		t.clear();
	});

	it('can restore a saved width after the source element width changes', function() {
		var t = simpleTestInstance(true),
			testWidth = t.e.width() + 100;

		t.w._saveWidth();
		expect(t.p.width()).toBe(t.w.savedWidth);
		expect(t.e.width()).not.toBe(testWidth);

		t.e.width(testWidth);
		expect(t.p.width()).not.toBe(t.w.savedWidth);
		expect(t.e.width()).toBe(testWidth);

		t.w._restoreWidth();
		expect(t.p.width()).toBe(t.w.savedWidth);
		expect(t.e.width()).not.toBe(testWidth);

		t.clear();
	});

	it('can maintain source element width through update calls', function() {
		var t = simpleTestInstance(true, {
			fixWidth: true,
			postUpdate: function() {}
		});
		var originalWidth = t.p.width();

		spyOn(t.w, '_saveWidth').and.callThrough();
		spyOn(t.w, '_restoreWidth').and.callThrough();
		spyOn(t.w.options, 'postUpdate');

		expect(t.e.width()).toBe(originalWidth);

		t.w.update(function(el) {
			expect(t.w._saveWidth).toHaveBeenCalled();

			el.width(el.width() + 100);

			expect(el[0]).toBe(t.e[0]);
			expect(t.e.width()).not.toBe(originalWidth);
		});

		expect(t.w._restoreWidth).toHaveBeenCalled();
		expect(t.w.options.postUpdate).toHaveBeenCalledWith(t.w.element);
		expect(t.e.width()).toBe(originalWidth);

		t.clear();
	});

	it('can get both sides, creating them if needed', function() {
		var t = simpleTestInstance(),
			side, container;

		expect(t.w.sides.before).toBeUndefined();
		expect(t.w.sides.after).toBeUndefined();
		expect(t.e.siblings('.addon-container').length).toBe(0);

		// create 'before'
		side = t.w._getSide(-1);
		container = t.e.siblings('.addon-container.addon-container-before')[0];
		expect(t.w.sides.before).toBe(side);
		expect(side).toEqual({
			elements: [null],
			fixedPos: [],
			insertNextFunction: 'before',
			insertClosestFunction: 'append',
			container: container
		});
		expect(t.e.prev()[0]).toBe(container);
		expect(t.w._getSide(-1)).toBe(side); // does not recreate

		// create 'after'
		side = t.w._getSide(1);
		container = t.e.siblings('.addon-container.addon-container-after')[0];
		expect(t.w.sides.after).toBe(side);
		expect(side).toEqual({
			elements: [null],
			fixedPos: [],
			insertNextFunction: 'after',
			insertClosestFunction: 'prepend',
			container: container
		});
		expect(t.e.next()[0]).toBe(container);
		expect(t.w._getSide(1)).toBe(side); // does not recreate
	});

	it('can get a position from a weight and side', function() {
		var t = simpleTestInstance();
		var testSide = {
			elements: [null,19,29,39,49,59,69]
		};
		var testEmptySide = {
			elements: [null]
		};

		var testCases = [
			[-1, 1],
			[0, 1],
			[2, 2],
			[6, 6],
			[10, 7],
			[-5, 5],
			[1000, 7],
			[-1000, 7]
		];


		expect(t.w._weightToPos(0, testEmptySide)).toBe(1);
		expect(t.w._weightToPos(1, testEmptySide)).toBe(1);
		expect(t.w._weightToPos(-1, testEmptySide)).toBe(1);

		testCases.forEach(function(tcase) {
			expect(t.w._weightToPos(tcase[0], testSide)).toBe(tcase[1]);
		});
	});

	describe('can add elements', function() {
		function addonOrder(srcElement) {
			var contents = []; // combined text of addons groups in order

			// Get addon contents
			srcElement.siblings('.addon-container').each(function() {
				var order = '';
				$(this).children('.addon').each(function() {
					order += $(this).text();
				});
				contents.push(order);
			});

			return contents;
		}

		it('one at a time', function() {
			var t = simpleTestInstance(),
				testCount = 0;

			function addTestDiv(weight) {
				var side = t.w._getSide(weight),
					pos = t.w._weightToPos(weight, side);

				++testCount;

				t.w._add('<div class="test'+testCount+'"></div>', side, pos);
			}

			function checkAddition(side, weight) {
				expect(t.p.find('.addon-container.addon-container-'+side+' .addon.test'+(testCount+1)).length).toBe(0);
				addTestDiv(weight);
				expect(t.p.find('.addon-container.addon-container-'+side+' .addon.test'+(testCount)).length).toBe(1);
			}

			checkAddition('before', -1);
			checkAddition('before', -1);
			checkAddition('before', -10);
			checkAddition('after', 1);
			checkAddition('after', 1);
			checkAddition('after', 0);
			checkAddition('after', 10);
		});

		it('with an public function', function() {
			var t = simpleTestInstance(),
				addon = $('<div></div>'),
				returnedAddon;

			spyOn(t.w, 'update').and.callThrough();
			spyOn(t.w, '_add').and.callThrough();

			returnedAddon = t.w.add(addon, -1);

			expect(t.w.update).toHaveBeenCalled();
			expect(t.w._add).toHaveBeenCalled();
			expect(returnedAddon[0]).toBe(addon[0]);
			expect(addon.is('.addon')).toBe(true);
			expect(addon.parent().is('.addon-container.addon-container-before')).toBe(true);
		});

		it('in the correct order', function() {
			var t = simpleTestInstance();

			function addTestDiv(text, weight) {
				t.w.add('<div class="test-'+text+'">'+text+'</div>', weight);
			}

			expect(addonOrder(t.e)).toEqual([]);

			addTestDiv('a', 1);
			expect(addonOrder(t.e)).toEqual(['a']);

			addTestDiv('b', 1);
			expect(addonOrder(t.e)).toEqual(['ba']);

			addTestDiv('c', -1);
			expect(addonOrder(t.e)).toEqual(['c', 'ba']);

			addTestDiv('d', -10);
			addTestDiv('e', 10);
			addTestDiv('f', 2);
			addTestDiv('g', -2);
			addTestDiv('h', -3);
			addTestDiv('i', 3);
			expect(addonOrder(t.e)).toEqual(['dhgc','bfiae']);
		});

		it('and fix them to their weight, not allowing overwrites', function() {
			var t = simpleTestInstance();

			function addTestDiv(text, weight, fix) {
				t.w.add('<div class="test-'+text+'">'+text+'</div>', weight, fix);
			}

			// additions to fixed should ++pos
			addTestDiv('a', 1, true);
			addTestDiv('b', 1);
			addTestDiv('c', 1);
			expect(t.w.sides.after.fixedPos).toEqual([1]);
			expect(addonOrder(t.e)).toEqual(['acb']);

			// a fix at the end
			addTestDiv('d', 10, true);
			addTestDiv('e', 4);
			addTestDiv('f', 4);
			expect(t.w.sides.after.fixedPos).toEqual([1,4]);
			expect(addonOrder(t.e)).toEqual(['acbdfe']);

			// testing two fixed pos in a row, g fixes to 2
			addTestDiv('g', 1, true);
			addTestDiv('h', 1);
			addTestDiv('i', 1);
			expect(t.w.sides.after.fixedPos).toEqual([1,7,2]);
			expect(addonOrder(t.e)).toEqual(['agihcbdfe']);

			// d should now be fixed to 7 from <pos addtions
			addTestDiv('j', 7);
			addTestDiv('k', 7);
			expect(t.w.sides.after.fixedPos).toEqual([1,7,2]);
			expect(addonOrder(t.e)).toEqual(['agihcbdkjfe']);

			// Same process, but on the left side (reversed order L->R)
			addTestDiv('a', -1, true);
			addTestDiv('b', -1);
			addTestDiv('c', -1);
			addTestDiv('d', -10, true);
			addTestDiv('e', -4);
			addTestDiv('f', -4);
			addTestDiv('g', -1, true);
			addTestDiv('h', -1);
			addTestDiv('i', -1);
			addTestDiv('j', -7);
			addTestDiv('k', -7);
			expect(addonOrder(t.e)).toEqual(['efjkdbchiga', 'agihcbdkjfe']);
		});
	});

	it('can get a single addon by weight', function() {
		var t = simpleTestInstance();

		function addTestDiv(text, weight) {
			t.w.add('<div class="test-'+text+'"></div>', weight);
		}

		function testGets(tcases, valid) {
			tcases.forEach(function(tcase) {
				var addon = t.w.get(tcase[0]);
				if(valid) {
					expect(addon).toBeDefined();
					expect(addon.is('.test-'+tcase[1])).toBe(valid);
				} else {
					expect(addon).toBeUndefined();
				}
			});
		}

		addTestDiv('a', 1);
		addTestDiv('b', 1);
		addTestDiv('c', 1);
		addTestDiv('d', 1);
		addTestDiv('e', -1);
		addTestDiv('f', -1);
		addTestDiv('g', -1);
		addTestDiv('h', -1);

		// ORDER: efgh<-->dcba

		testGets([
			[undefined], ['d'], [0], [5], [-5]
		], false);

		testGets([
			[1, 'd'], [2, 'c'], [3, 'b'], [4, 'a'],
			[-1, 'h'], [-2, 'g'], [-3, 'f'], [-4, 'e']
		], true);

	});

	describe('can handle the removal of addons', function() {
		it('without maintaing a fixed width', function() {
			var t = simpleTestInstance(),
				addon = $('<div></div>'),
				side;

			t.w.add(addon);
			side = t.w.sides.after;

			expect(side.elements.length).toBe(2); // null + addon
			expect(side.fixedPos.length).toBe(0);

			addon.remove();
			expect(side.elements.length).toBe(1);

			// Try it with fixed
			t.w.add(addon, 1, true);
			expect(side.elements.length).toBe(2);
			expect(side.fixedPos.length).toBe(1);

			addon.remove();
			expect(side.elements.length).toBe(1);
			expect(side.fixedPos.length).toBe(0);


		});

		it('while maintaing a fixed width', function() {
			var t = simpleTestInstance(true, {
				fixWidth: true
			});
			var addon = $('<div>addon</div>'),
				side, pw;


			pw = t.p.width();
			t.w.add(addon);
			side = t.w.sides.after;

			expect(side.elements.length).toBe(2);
			expect(t.p.width()).toBe(pw);

			addon.remove();
			expect(side.elements.length).toBe(1);
			expect(t.p.width()).toBe(pw);

			t.clear();
		});
	});

	it('can be destroyed', function() {
		var t = simpleTestInstance(),
			addonHtml = '<div class="test"></div>';

		t.w.add(addonHtml, 1);
		t.w.add(addonHtml, 1);
		t.w.add(addonHtml, -1);
		t.w.add(addonHtml, -1);

		expect(t.p.find('.addon-container, .test').length).toBe(6);

		t.e.addonWrapper('destroy');
		expect(t.p.find('.addon-container, .test').length).toBe(0);
		expect(t.e.data('formBuilderAddonWrapper')).toBeUndefined();
	});
});
