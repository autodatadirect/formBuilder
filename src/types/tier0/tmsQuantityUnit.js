/**
 * Data Type 'tmsQuantityUnit'
 * 
 * For general unit input with some autocompletes
 */

(function($){
	'use strict';
	
	var types = $.add123.inputField.types;

	var units = ['MI', 'KM', 'HR', 'MIN', 'DAYS', 'PKGS'];
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
