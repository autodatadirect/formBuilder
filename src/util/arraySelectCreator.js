import $ from 'jquery';
import select from '../types/select';

export default function (array) {
	return $.extend({}, select, {
		map: function (s) {
			const d = {};
			d.label = s;
			d.value = s;
			return d;
		},

		load: function () {
			const self = this;
			return $.when($.map(array, $.proxy(self.map, self)));
		}
	});
}