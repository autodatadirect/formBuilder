/**
 * Tools for testing. Must be included before all specs
 */

/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true */
'use strict';
(function(){
	var chars = {
		alphas: 'abcdefghijklmnopqrstuvwxyz',
		digits: '1234567890',
		symbols: "!@#$%^&*()_-=+,<.>/?;:'\"[{]}\\|`~ "
	};

	chars.ALPHAS = chars.alphas.toUpperCase();
	chars.all = chars.alphas + chars.ALPHAS + chars.digits + chars.symbols;

	window.formBuilderTesting = {
		testContainer: $('.test-container'),

		//for testing q chains
		pause: function(miliseconds) {
			var def = $.Deferred();

			setTimeout(function(){
				def.resolve();
			}, miliseconds);

			return def.promise();
		},

		triggerWaitTime: 1,	// miliseconds to pause for trigger events

		chars: chars,

		// For expecting an array of vals against a expected individually via runCheck(val) result
		batchTest: function(testNameBase, vals, expected, runCheck) {
			var makeTest = function(value){
				it(testNameBase + ' "'+value+'"', function(){
					expect(runCheck(value)).toBe(expected);
				});
			};

			for(var i = 0; i < vals.length; ++i) {
				makeTest(vals[i]);
			}
		}
	};
})();
