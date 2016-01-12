/**
 * Data type 'display'
 *
 * Displays data and acts as a read-only inputField
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;

	types.display = {
		setUp: function (ifw) {
			var e = ifw.element;

			e.parents('.field-item').hide();
			e.parents('.field-items').append('<div class="input-display"></div>');
		},

		converter: {
			toField: function (val, ifw) {
				ifw.element.parents('.field-items').find('.input-display').html(val);
			},
			fromField: function(value, ifw) {
				return ifw.element.parents('.field-items').find('.input-display').html().trim();
			}
		}
	};	

})(jQuery);