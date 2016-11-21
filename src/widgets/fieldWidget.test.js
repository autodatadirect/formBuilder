import  '../util/jsdomSetup';
import expect from 'expect';
//import './fieldWidget';
//import $ from 'jquery';
//window.jQuery = $;
import func from './fieldWidget';

describe('fieldWidget Widget', function(){



	//console.log('********** jQuery', window.jQuery);

	it('to have jquery', () => {
		expect(window.jQuery).toExist();
		expect(window.$).toExist();
	});

	it('to have jquery UI', () => {
		expect(window.$.widget).toExist();
	});

	it('to exist', () => {
		func();
	});


});