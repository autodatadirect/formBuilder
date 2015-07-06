/**
 * General type testing
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('Any custom type', function(){

	describe('may be a simple regex type', function(){
		it('that has a regex validation pattern', function(){
			var types = $.add123.inputField.types;

			console.log(types);
		});

		it('that has a regex filter pattern');

		it('that may have flags');

		it('that may have a max');

		it('that may use a cannedFormatter');
	});
});