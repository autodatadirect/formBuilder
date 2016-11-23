import def from './fieldWidget.def';
import expect from 'expect';
import $ from 'jquery';

$.widget = () => {};

describe('The fieldWidget', () => {
	it('has all required methods', () => {
		expect(def.isDirty).toExist();
		expect(def.validate).toExist();
		expect(def.clearDirty).toExist();
		expect(def.clear).toExist();
		expect(def.flash).toExist();
		expect(def.set).toExist();
		expect(def.get).toExist();

		expect(typeof def.isDirty).toBe('function');
		expect(typeof def.validate).toBe('function');
		expect(typeof def.clearDirty).toBe('function');
		expect(typeof def.clear).toBe('function');
		expect(typeof def.flash).toBe('function');
		expect(typeof def.set).toBe('function');
		expect(typeof def.get).toBe('function');
	});

	it('returns NULL when get is called', () => {
		expect(def.get()).toBe(null);
	});

	it('returns calls set with undefined when clear is called', () => {
		const spy = expect.spyOn(def, 'set');
		expect(spy.calls.length).toBe(0);
		def.clear();
		def.clear();
		expect(spy.calls.length).toBe(2);
		expect(spy.calls[0].arguments.length).toBe(0);
		spy.restore();
	});
});