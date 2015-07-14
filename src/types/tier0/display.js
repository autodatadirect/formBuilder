/**
 * Data type 'display'
 *
 * Displays data and acts as a read-only inputField
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;

	types.display = {
		setUp: function (ui) {
			var e = ui.element;

			e.parents('.field-item').hide();
			e.parents('.field-items').append('<div class="input-display"></div>');
		},

		converter: {
			toField: function (val, ui) {
				ui.element.parents('.field-items').find('.input-display').html(val);
			},
			fromField: function(value, ui) {
				return ui.element.parents('.field-items').find('.input-display').html().trim();
			}
		}
	};	

})(jQuery);