/**
 * Data Type 'time'
 *
 * Has a dropdown with shortcuts.
 *
 * Attribute Settings:
 * data-step (default=30) - Minute increment between times in dropdown
 * data-military - Converts time into 24-hour
 * data-store-utc (default true) - keeps set/get in utc time zone format, rather than local.
 */

/* global moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;
	var util = $.formBuilder.util;

	types.time = {
		attributes: ['step', 'military','storeUtc'],
		momentStoreFormat: 'HH:mm',

		_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,
		_regex2400: /^(([01]?[0-9])|(2[0-3])):[0-5][0-9]$/,

		setUp: function(ifw) {
			var self = this,
				e = ifw.element;

			// Setup options
			var o = self.typeOptions = {
				storeUtc: true
			};
			util.loadDomToggleData(e, o, ['military', 'storeUtc']);
			util.loadDomData(e, o, ['step', 'storeUtc']);

			if(!self.typeOptions.military)
			{
				ifw.placeholder('H:MMam/pm');

				e.inputFilter({
					pattern: /[0-9:apm]/,
					max: 7
				});
			}
			else
			{
				ifw.placeholder('HH:MM');

				e.inputFilter({
					pattern: /[0-9:]/,
					max: 5
				});
			}
			

			e.timepicker({
				appendTo: ifw.getField(),
				selectOnBlur: false,
				step: o.step, //default is 30 and will be set if undefined
				timeFormat: o.military?'H:i':'g:ia'
			});

			// Make sure the timepicker width matches the field width
			e.on('showTimepicker', function(){
				var newWidth = e.outerWidth();
				if(newWidth < 80) {
					newWidth = 80;
				}
				ifw.getField().children('.ui-timepicker-wrapper').width(newWidth);
			});

		},

		converter: {
			/**
			 * convert from moment format HH:mm (utc) to h:mma (local)
			 */
			toField: function(val, ifw) {
				var self = this,
					time;

				if(!val || !val.match(/^[0-9]{2}:[0-9]{2}$/)){
					return '';
				}

				time = moment.utc(val, self.momentStoreFormat, true);

				if(self.typeOptions.storeUtc) {
					// Convert utc back to local for display
					time.local();
				}

				return time.format(self.typeOptions.military? 'H:mm' : 'h:mma');
			},

			/**
			 * convert from moment format h:mma (local) to HH:mm (utc)
			 */
			fromField: function(val, ifw) {
				var self = this,
					time;
				
				if(!val || !val.match(self.typeOptions.military? self._regex2400 : self._regex)) {
					return '';
				}


				time = moment(val, self.typeOptions.military? 'H:mm' : 'h:mma').milliseconds(0);

				if(self.typeOptions.storeUtc) {
					// Convert to utc for storage
					time.utc();
				}

				// Return in 24hr format
				return time.format(self.momentStoreFormat);
			}
		},

		tearDown: function(ifw) {
			ifw.element.timepicker('remove');
		},

		validate: function(ifw) {
			var self = this,
				e = ifw.element,
				val = e.val(),
				invalidMessage = {message: dict.invalid},
				valid;

			valid = self.typeOptions.military? val.match(self._regex2400) : val.match(self._regex);

			if(!valid) {
				return invalidMessage;
			}

		}
	};

})(jQuery);