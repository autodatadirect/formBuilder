/*
 * parameter can be a jQuery object or HTML element object
 */
import $ from 'jquery';

if(typeof($.fn.childOf) === 'undefined') {
	$.fn.childOf = function(b, includeSelf) {
		let i;

		if(b instanceof $) {
			b = b[0];
		}

		if(includeSelf && b === this[0]) {
			return true;
		}

		const p = this.parents();
		for(i = 0; i < p.length; i++) {
			if(b === p[i]) {
				return true;
			}
		}
		return false;
	};
}
