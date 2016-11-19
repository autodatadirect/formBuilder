/**
* Data type 'phone'
*
*/
import $ from 'jquery';

import '../widgets/inputFilter';

//TODO replace with i18next?
const dict = {};


export default {
	setUp: function (ifw) {
		const self = this,
			e = ifw.element;

		e.inputFilter({
			pattern: /[0-9()\s\-x]/
		});

		e.on('blur', function() {
			e.val(self.format(e.val()));
		});

	},

	converter: {
		toField: function(val) {
			return this.format(val);
		},
		fromField: function(val) {
			return this.format(val);
		}
	},

	format: function (text) {
		if(!text){
			return '';
		}

		/*
		 * find extension delimeter
		 */

		const xlocation = text.indexOf('x'),
			lastSpace = text.lastIndexOf(' ');

		let extensionStart = 0,
			ext = '',
			extraExt = '';

		if(xlocation > 0){
			extensionStart = xlocation;
		}else if(lastSpace > 7){
			extensionStart = lastSpace;
		}

		if(extensionStart > 0){
			ext = text.substring(extensionStart + 1);
			text = text.substring(0, extensionStart);
		}

		let num = $.trim(text.replace(/[()\s\-]/g, '')),
			numberLength = num.length;


		if(num[0] === '1'){
			num = num.substring(1);
			numberLength--;
		}

		if(numberLength > 10){
			extraExt = num.substring(10);
			num = num.substring(0, 10);
			numberLength = 10;
		}

		if (numberLength === 7) {
			num = num.substring(0,3) + '-' + num.substring(3);
		} else if (numberLength === 10) {
			num = num.substring(0,3) + '-' + num.substring(3,6) + '-' + num.substring(6);
		}

		ext = extraExt + ext;

		num = num.replace(/[^0-9^x^-]/g, '');
		ext = ext.replace(/[^0-9^x^-]/g, '');

		if(ext){
			num += 'x' + ext;
		}

		return num;
	},

	validate: function(ifw) {
		///^([0-9]{3}-)?[0-9]{3}-[0-9]{4}(x[0-9]+)?$/ simple regex
		if(!ifw.element.val().match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)) {
			return {
				message: dict.invalid
			};
		}
	}
};
