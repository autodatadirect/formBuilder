/*
 * Data Type 'date'
 *
 * Has calendar popup (bootstrap-datepicker)
 *
 * Attribute Settings:
 * data-minyear (default [-=15]) - Can be set to 'CURRENT'
 * data-maxyear (default [+=2]) - Can be set to 'CURRENT'
 * data-startdate (default 01/01/[minyear]) - trumps minyear if both set. Can be set to 'TODAY'
 * data-enddate (default 12/31/[maxyear]) - trumps maxyear if both set. Can be set to 'TODAY'
 * data-enforce-min (default false) - marks dates <startDate as invalid
 * data-enforce-max (default false) - marks dates >endDate as invalid
 */

/*global util:true, moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;

	types.text = {};

	types.date = {
		attributes: ['minyear', 'maxyear', 'startdate', 'enddate','enforceMax','enforceMin'],
		momentStoreFormat: 'YYYY-MM-DD',

		_dateFormat: 'MM/DD/YYYY', // for output + datepicker

		setUp: function(ui) {
			var self = this,
				e = ui.element,
				tmp, startDate, endDate;

			ui.placeholder(self._dateFormat);

			self.enforceMin = !!e.data('enforceMin');
			self.enforceMax = !!e.data('enforceMax');

			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			// Determine year ends
			var minYear = new Date().getFullYear() - 15,
				maxYear = new Date().getFullYear() + 2;

			tmp = e.data('minyear');
			if(tmp !== undefined) {
				if(tmp === 'CURRENT') {
					minYear = new Date().getFullYear();
				} else {
					minYear = tmp;
				}
			}

			tmp = e.data('maxyear');
			if(tmp !== undefined) {
				if(tmp === 'CURRENT') {
					maxYear = new Date().getFullYear();
				} else {
					maxYear = tmp;
				}
			}

			self.startDate = '01/1/' + minYear;
			self.endDate = '12/31/' + maxYear;

			// Determine date ends and save for validation

			tmp = e.data('startdate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					self.startDate = moment().format(self._dateFormat);
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					self.startDate = tmp;
				}
			}
			
			tmp = e.data('enddate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					self.endDate = moment().format(self._dateFormat);
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					self.endDate = tmp;
				}				
			}

			// Setup datepicker
			var datePickerOptions = {
				startDate: self.startDate, 
				endDate: self.endDate,
				autoclose: true,
				forceParse: false,
				format: 'mm/dd/yyyy',
				todayBtn: true,
				todayHighlight: true,
				language: util.lang.code
			};

			e.datepicker(datePickerOptions);

			// Setup inputFilter
			e.inputFilter({
				pattern: /[0-9\/]/,
				max : 10,
				toUpper: true
			});

		},

		converter: {
			/*
			 * Store date in XSD standard: yyyy-mm-dd, display in dd/mm/yyy 
			 */
			
			/**
			 * yyyy-mm-dd => mm/dd/yyyy
			 */
			toField: function(val, ui) {
				if(!val || !val.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
					return '';
				}
				return val.substring(5, 7) + '/' + val.substring(8, 10) + '/' + val.substring(0, 4);
			},

			/**
			 * mm/dd/yyyy (local) => yyyy-mm-dd (utc)
			 */
			fromField: function(val, ui) {
				if(!val || !val.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					return '';
				}

				return val.substring(6, 10) + '-' + val.substring(0, 2) + '-' + val.substring(3, 5);
			}
		},

		tearDown: function(ui) {
			ui.element.datepicker('remove');
		},

		validate: function(ui) {
			var self = this,
				date = moment(ui.element.val(),self._dateFormat,true);


			if(!date.isValid() || 
				(self.enforceMin && date.isBefore(moment(self.startDate, self._dateFormat))) ||
				(self.enforceMax && moment(self.endDate, self._dateFormat).isBefore(date))) {
				return {
					message: 'invalid'
				};
			}
		}
	};

})(jQuery);