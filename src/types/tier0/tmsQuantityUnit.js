/**
 * Data Type 'tmsQuantityUnit'
 * 
 * For general unit input with some autocompletes
 */

(function($){
	'use strict';
	
	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	// manually converted them to strings b/c of a strange jqueryui error
	var units = [
		''+dict.MI,
		''+dict.KM,
		''+dict.HR,
		''+dict.MIN,
		''+dict.DAYS,
		''+dict.PKGS
	];

	types.tmsQuantityUnit = {
		setUp: function(ui) {
			var self = this,
				o = ui.options,
				e = ui.element;

			self.e = e;

			e.inputFilter({
				toUpper: true,
				pattern: /./
			});

			e.autocomplete({
				minLength: 0,
				autoFocus: false,
				appendTo: ui.getField(),
				position: {
					my: "left top+6", // may be theme dependent
					at: "left bottom",
					of: e,
					collision: "none"
				},

				source: units
			});
		}
	};
	
})(jQuery);
