/*
 * Data Type 'date'
 *
 * Has calendar popup (bootstrap-datepicker)
 *
 * Attribute Settings:
 * data-min-date [YYYY-MM-DD] | offset - first date visible in datepicker & valid
 * data-max-date [YYYY-MM-DD] | offset - last date visible in datepicker & valid
 * data-no-rounding - disables offset date unit rounding
 * 
 * The offset format should match /[+-]*\d+\!?[dmyw]/gi and is an offset from the current
 * date. Multple offsets can be in one string and are applied in order of unit
 * size, largest to smallest. Multiple offsets with the same unit will be 
 * evaluated left to right.
 *
 * By default, each offset will round the date to the start or end of the offset
 * unit when subtracting or adding, respectively. This can be disabled with the
 * no-rounding option. Combining addition/subtration with the same unit is
 * particularly useful when you want to get a specific date that is partially
 * relative to the current date. As a result, +0x/-0x can be used to move to
 * the end/start of unit x, changing any smaller units to match that fact.
 *
 * Rounding may also be disabled on a per-offset unit basis by adding a '!' 
 * before the unit character. Other offsets without it will still be rounded
 * unless the no-rounding option is set. For example in "+1!y+0m" will evaluate
 * as "the end of this month next year".
 * 
 *
 * Any dateTime objects stored in UTC must convert to/from local timezone when 
 * setting/retrieving from this type. This type should only touch local dates.
 * 
 * Examples for displayed values (local):
 *
 * min-date="1995-06-07" max-date="2020-02-20"
 * @ 2016-01-05 => [1995-06-07, 2020-02-20]
 * @ 2000-05-20 => [1995-06-07, 2020-02-20]
 * 
 * min-date="-5y" max-month="+1m"
 * @ 2016-01-05 => [2015-01-05, 2016-02-29]
 * @ 2000-05-20 => [1995-01-01, 2000-06-30]
 *
 * min-date="0d" max-date="+60d"
 * @ 2016-01-05 => [2015-01-05, 2016-03-05]
 * @ 2000-05-20 => [1995-05-20, 2000-07-19]
 *
 * max-date="+2y"
 * @ 2016-01-05 => (beg. of time, 2018-12-31]
 * @ 2000-05-20 => (beg. of time, 2002-12-31]
 *
 * min-date="-1y+1m-0m+5d" (last year, Feb 6) max-date="+1y-0m+2y" (+3y, Dec 1)
 * @ 2016-01-05 => [2016-02-06, 2019-12-01]
 * @ 2000-05-20 => [1999-02-06, 2003-12-01]
 *
 * min-date="+1w-0w+1d" (next Monday)
 * @ 2016-01-05 => [2016-01-11, end of time)
 * @ 2000-05-20 => [2000-05-08, end of time)
 *
 * min-date="-1!y" max-date="+1y"
 * @ 2016-01-05 => [2015-01-05, 2017-12-31]
 * @ 2000-05-20 => [1999-05-08, 2001-12-31]
 */

/*global  moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var util = $.formBuilder.util;
	var lang = $.formBuilder.lang;

	types.text = {};

	types.date = {
		attributes: [
			'minDate',
			'maxDate',
			'noRounding'
		],
		momentStoreFormat: 'YYYY-MM-DD',

		_dateFormat: 'MM/DD/YYYY',	// for output + datepicker
		_unitOrder: 'ymwd',			// largest -> smallest

		setUp: function(ifw) {
			var self = this,
				e = ifw.element;

			util.loadDomData(e, self, [
				'minDate',
				'maxDate'
			]);
			util.loadDomToggleData(e, self, ['noRounding']);

			ifw.placeholder(self._dateFormat);

			self.minDate = self._parseOffsetDate(self.minDate);
			self.maxDate = self._parseOffsetDate(self.maxDate);

			// Setup datepicker
			var datePickerOptions = {
				startDate: self.minDate, 
				endDate: self.maxDate,
				autoclose: true,
				forceParse: false,
				format: self._dateFormat.toLowerCase(),
				todayBtn: true,
				todayHighlight: true,
				language: lang.code,
				keyboardNavigation: false
			};

			e.datepicker(datePickerOptions);

			// Setup inputFilter
			e.inputFilter({
				pattern: /[0-9\/]/,
				max : 10,
				toUpper: true
			});

		},


		/**
		 * Converts a offset or date string to a plain date string
		 */
		_parseOffsetDate: function(str) {
			var self = this,
				offsets, m, type, u, noRound;

			if(!str) {
				return;
			}

			str = String(str).trim();
			
			if(str === '0') {
				return moment().format(self._dateFormat);

			}

			offsets = str.match(/[+-]*\d+\!?[dmyw]/gi);
			if(offsets) {

				// sort units from largest -> smallest
				offsets.sort(function(a, b) {
					var uA = a[a.length - 1],
						uB = b[b.length - 1];

					if(self._unitOrder.indexOf(uA) < self._unitOrder.indexOf(uB)) {
						return -1;
					}

					if(self._unitOrder.indexOf(uA) > self._unitOrder.indexOf(uB)) {
						return 1;
					}

					return 0;
				});

				// apply offsets
				offsets.forEach(function(o) {
					switch(o[o.length - 1]) {
						case 'm': type = 'months'; break;
						case 'y': type = 'years'; break;
						case 'w': type = 'weeks'; break;
						default : type = 'days'; break;
					}

					if(!m) {
						m = moment();
					}

					m.add(parseInt(o, 10), type);
					
					if(!self.noRounding && o[o.length - 2] !== '!') {
						m[(o[0] === '+')? 'endOf' : 'startOf'](type.substring(0, type.length-1));
					}
					
				});

				return m.format(self._dateFormat);
			}

			m = moment(str, self.momentStoreFormat, true);
			if(m.isValid()) {
				return m.format(self._dateFormat);
			}

		},

		converter: {
			/*
			 * Store date in XSD standard: yyyy-mm-dd, display in dd/mm/yyy 
			 */
			
			/**
			 * yyyy-mm-dd => mm/dd/yyyy
			 */
			toField: function(val, ifw) {
				if(!val || !val.match(/^\d{4}-\d{2}-\d{2}$/)) {
					return '';
				}
				return val.substring(5, 7) + '/' + val.substring(8, 10) + '/' + val.substring(0, 4);
			},

			/**
			 * mm/dd/yyyy => yyyy-mm-dd
			 */
			fromField: function(val, ifw) {
				var self = this;

				if(!val || !val.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
					return '';
				}

				return val.substring(6, 10) + '-' + val.substring(0, 2) + '-' + val.substring(3, 5);
			}
		},

		tearDown: function(ifw) {
			ifw.element.datepicker('remove');
		},

		validate: function(ifw) {
			var self = this,
				date = moment(ifw.element.val(), self._dateFormat, true);

			if(!date.isValid() || 
				(self.minDate && date.isBefore(moment(self.minDate, self._dateFormat))) ||
				(self.maxDate && moment(self.maxDate, self._dateFormat).isBefore(date))) {
				return {
					message: lang.dict.invalid
				};
			}
		}
	};

})(jQuery);