/*
 * formater methods are context sensitive, don't use arrow functions
 */
export default {
	formatter: {
		toField: function (val) {
			this.format(val);
		},
		fromField: function (val) {
			this.format(val);
		}
	},
	number: {
		toField: function (value) {
			if(!value && value !== 0) {
				return '';
			}
			return value + '';
		},
		fromField: function (value) {
			if(!value || isNaN(value)) {
				return null;
			}
			return +value;
		}
	}
};