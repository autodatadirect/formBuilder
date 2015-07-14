/**
 * Functions to quickly make extensions of the select type
 * 
 * arraySelectCreator(array)
 * booleanSelectCreator(trueString, falseString)
 * 
 */

/* global util:true */
(function($){
	'use strict';
	
	var types = $.formBuilder.inputField.types;

	$.formBuilder.inputField.arraySelectCreator = function (array) {
		return $.extend({}, types.select, {
			map: function (s) {
				var d = {};
				d.label = s;
				d.value = s;
				return d;
			},

			load: function () {
				var self = this;
				return $.when($.map(array, $.proxy(self.map, self)));
			}
		});
	};

	$.formBuilder.inputField.booleanSelectCreator = function (trueString, falseString) {
		return $.extend({}, types.select, {
			map: function (s) {
				var d = {},
					val = falseString;

				if(s === true){
					val = trueString;
				}

				d.label = val;
				d.value = !!s;

				return d;
			},

			deMap: function (d) {
				if($.isEmptyObject(d)){
					return false;
				}
				return d.value;
			},

			load: function () {
				var self = this;
				return $.when($.map([true, false], $.proxy(self.map, self)));
			}
		});
	};


	// Examples from tms
	var date = new Date();
	var years = [];
	for (var i = 0; i <= 10; i++) {
		years.push((date.getFullYear() + i).toString());
	}
	
	types.tmsExpYear = $.formBuilder.inputField.arraySelectCreator(years);
	types.tmsYesNo = $.formBuilder.inputField.booleanSelectCreator(util.lang.dict.yes, util.lang.dict.no);
	
})(jQuery);
