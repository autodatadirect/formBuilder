/**
 * Data type 'display'
 *
 * Displays data and acts as a read-only inputField
 */

export default {
	setUp: function (ifw) {
		const e = ifw.element;
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
