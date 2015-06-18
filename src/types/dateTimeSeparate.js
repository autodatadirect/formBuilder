/**
 * dateTimeSeparate, a combination of a date field and a time field
 */

(function($){
	var types = $.add123.inputField.types;
	/*
	types.dateTimeSeparate = {
		setup: function(ifw) {
			var self = this,
				eDate = ifw.element, //original element
				eTime = $('<input class="time"/>').before(eDate),
				minYear = new Date().getFullYear() - 15,
				maxYear = new Date().getFullYear() + 2,
				layers = ifw.layers;

			// Get max/min years from attributes
			if(e.data('minyear') !== undefined) {
				minYear = e.data('minyear');
			}
			if(e.data('maxyear') !== undefined) {
				if(e.data('maxyear') === 'CURRENT') {
					maxYear = new Date().getFullYear();
				} else {
					maxYear = e.data('maxyear');
				}
			}

			ifw.placeholder('MM/DD/YYYY');





		},

		converter: {
			toField: function(val, ifw) {

			},

			fromField: function(val, ifw) {

			}
		},

		validate: function(ifw) {

		}

	}
	*/


	types.time = {
		_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,

		setUp: function(ifw) {
			var self = this,
				e = ifw.element,
				layers = ifw.layers;

			ifw.placeholder('H:MMam/pm');

			e.inputFilter({
				pattern: /[0-9:apm]/,
				max: 7
			});

			e.timepicker({
				appendTo: e.parent(),
				showTimepicker: function(){
					console.log('shown');
					e.siblings('.ui-timepicker-wrapper').width(e.width());
				}
			});

			// Enforce the width to match a time
			// TODO: make this more dynamic
			e.width(88);

		},

		converter: {
			toField: function(val, ifw) {
				var self = this;
				if(!val || !val.match(self._regex))
					return '';
				return val;
			},

			fromField: function(val, ifw) {
				var self = this;
				if(!val || !val.match(self._regex))
					return '';
				return val;
			}
		},

		validate: function(ifw) {
			var self = this,
				e = ifw.element,
				val = e.val(),
				invalidMessage = {message: 'invalid'};

			if(!val.match(self._regex))
				return invalidMessage;

		}
	};

})(jQuery);