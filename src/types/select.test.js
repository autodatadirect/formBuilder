import expect from 'expect';
import select from './select';

describe('The select Type', () => {

	describe('to have an _equal method that', () => {
		const equal = (a, b) => {
			return select._equal({
				value: a
			},{
				value: b
			});
		};

		it('exists and is a function',function() {
			expect(equal && select._equal instanceof Function).toBeTruthy();
		});

		it('works for a != b',function() {
			expect(equal('a', 'b')).toBe(false);
		});

		it('works for 0 = 0',function() {
			expect(equal(0, 0)).toBe(true);
		});

		it('works for 0 != 1',function() {
			expect(equal(0, 1)).toBe(false);
		});

	});

	describe('to have a _set method that', () => {
		it('exists and is a function',function() {
			expect(select._set && select._set instanceof Function).toBeTruthy();
		});
	});

});