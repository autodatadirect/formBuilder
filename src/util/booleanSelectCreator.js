import $ from 'jquery';
import select from '../types/select';

export default function (trueString, falseString) {
	return $.extend({}, select, {
		map: function (s) {
			const d = {};
			let val = falseString;

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
			const self = this;
			return $.when($.map([true, false], $.proxy(self.map, self)));
		}
	});
}