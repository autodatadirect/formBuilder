/**
 * Time Related Types
 * 
 * date, 
 * time,
 * dateTime, a combination of a date field and a time field
 */

/*global util:true, moment:true */
(function($){
	'use strict';

	var types = $.add123.inputField.types;

	/*
	 * Date Type Support (date)
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

	/**
	 * Time type. 
	 *
	 * Has a dropdown with shortcuts.
	 *
	 * Attribute Settings:
	 * data-step (default=30) - Minute increment between times in dropdown
	 * data-military - Converts time into 24-hour
	 * data-store-utc (default true) - keeps set/get in utc time zone format, rather than local.
	 */
	types.time = {
		attributes: ['step', 'military','storeUtc'],
		momentStoreFormat: 'HH:mm',

		_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,
		_regex2400: /^(([01]?[0-9])|(2[0-3])):[0-5][0-9]$/,

		setUp: function(ifw) {
			var self = this,
				e = ifw.element;

			self.military = !!e.data('military');
			self.step = e.data('step');
			self.storeUtc = e.data('storeUtc');

			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			if(!self.military)
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
				step: self.step, //default is 30 and will be set if undefined
				timeFormat: self.military?'H:i':'g:ia'
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

				if(!time.isValid()) {
					return '';
				}

				if(self.storeUtc) {
					// Convert utc back to local for display
					time.local();
				}

				return time.format(self.military? 'H:mm' : 'h:mma');
			},

			/**
			 * convert from moment format h:mma (local) to HH:mm (utc)
			 */
			fromField: function(val, ifw) {
				var self = this,
					time;
				
				if(!val || !val.match(self.military? self._regex2400 : self._regex)) {
					return '';
				}


				time = moment(val, self.military? 'H:mm' : 'h:mma');

				if(!time.isValid()) {
					return '';
				}

				if(self.storeUtc) {
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
				invalidMessage = {message: 'invalid'},
				valid;

			valid = self.military? val.match(self._regex2400) : val.match(self._regex);

			if(!valid) {
				return invalidMessage;
			}

		}
	};

	/**
	 * A combination of two InputFields, date & time.
	 *
	 * The original inputfield is hidden between them.
	 *
	 * Format: 'YYYY-MM-DDTHH:mm:ssZ' in UTC
	 *
	 * Attribute Settings:
	 * data-time-width-ratio (default=0.5, min=.2, max=.8) 
	 * data-store-utc (default true) keeps set/get in utc time zone format, rather than local.
	 *
	 * CSS Settings:
	 * min-width (default=270px, min=100px)
	 *
	 * Attributes specific for date or time will be passed to them.
	 */
	types.dateTime = {
		momentStoreFormat: 'YYYY-MM-DDTHH:mm:ss[Z]',


		setUp: function(inputFieldWidgetInstance) {
			var self = this,
				e = inputFieldWidgetInstance.element;


			// Get option constants
			self.storeUtc = e.data('storeUtc');
			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			self.ifw = inputFieldWidgetInstance;

			self._setUpFields();
			self._refreshFieldWidth();
			self._setUpCleanDirtyEvents();

			self.ifw.element.on('resize', function(ev){
				self._refreshFieldWidth();
			});
		},

		_setUpFields: function() {
			var self = this,
				e = self.ifw.element,
				fieldItems = self.ifw.element.parent().parent(),
				options, tmp, i;

			self.ifw.element.parent().hide();

			// Create the elements
			self.dateWidget = $('<input type="text" data-type="date"/>');
			self.timeWidget = $('<input type="text" data-type="time"/>');

			// Pass date attributes
			for(i = 0; i < types.date.attributes.length; ++i) {
				tmp = e.data(types.date.attributes[i]);
				if(tmp !== undefined) {
					self.dateWidget.data(types.date.attributes[i], tmp);
				}
			}
			
			// Pass time attributes
			for(i = 0; i < types.time.attributes.length; ++i) {
				tmp = e.data(types.time.attributes[i]);
				if(tmp !== undefined) {
					self.timeWidget.data(types.time.attributes[i], tmp);
				}
			}

			options = {
				require: true
			};

			// Create the widgets
			self.dateWidget.prependTo(fieldItems).inputField(options);
			self.timeWidget.appendTo(fieldItems).inputField(options);

			self.dateWidget.parent().addClass('first');

			self.timeWidgetInstance = self.timeWidget.data('add123InputField');
			self.dateWidgetInstance = self.dateWidget.data('add123InputField');
		},

		/**
		 * Make sure the child widgets' total width is equal to the base element's width
		 */
		_refreshFieldWidth: function() {
			var self = this,
				fullWidth = self.ifw.element.width(),
				elDate = self.dateWidget,
				elTime = self.timeWidget,
				timeWidthRatio,
				minWidth;
					
				// Take out widghet margins/padding from outer width
				fullWidth -= elDate.outerWidth(true) - elDate.width();
				fullWidth -= elTime.outerWidth(true) - elTime.width();
				
				// Prevent it from being too small
				minWidth = self.ifw.element.css('min-width');
				if(minWidth !== null) {
					minWidth = parseInt(minWidth, 10);
				}
				if(isNaN(minWidth) || minWidth < 100) {
					minWidth = 270; //default
				}

				if(fullWidth < minWidth) {
					fullWidth = minWidth;
				}

				// Set time width at ratio and give the rest to date
				timeWidthRatio = self.ifw.element.data('timeWidthRatio');
				if(isNaN(timeWidthRatio) || timeWidthRatio < 0.2 || 0.8 < timeWidthRatio) {
					timeWidthRatio = 0.5; //default
				}

				elTime.width(fullWidth * timeWidthRatio);
				elDate.width(fullWidth - elTime.width());
		},

		_setUpCleanDirtyEvents: function() {
			var self = this;	

			self.dateWidget.on('dirty clean', function (ev) {
				ev.stopPropagation();
				self.ifw.checkDirty();
			});

			self.timeWidget.on('dirty clean', function (ev) {
				ev.stopPropagation();
				self.ifw.checkDirty();
			});
		},

		converter: {
			/**
			 * No need to worry about utc/local. Handled in type time.
			 * All retrived/set times should be in utc
			 *
			 * Seconds are included in the formatting but are ignored and 
			 * always set to 00
			 */
			toField: function(val, ifw) {
				var self = this,
					splitDate = self._splitDateAndTime(val);

				self.timeWidgetInstance.set(splitDate.time);
				self.dateWidgetInstance.set(splitDate.date);
			}, 
			
			fromField: function(val, ifw) {
				var self = this,
					localDate = self.dateWidgetInstance.get(),
					time = self.timeWidgetInstance.get(),
					dateTime;

				// If one is empty just return nothing
				if(!localDate.trim() || !time.trim()) {
					return '';
				}

				// Convert them to moments
				localDate = moment(localDate, types.date.momentStoreFormat);


				if(self.storeUtc) {
					// Parse as UTC and localize
					time = moment.utc(time, types.time.momentStoreFormat).local();
				} else {
					// Parse as local
					time = moment(time, types.time.momentStoreFormat);
				}
				

				// Account for DST shifts 
				if(localDate.isDST() && !time.isDST()) {
					time.add(1,'h');
				} else if(!localDate.isDST() && time.isDST()) {
					time.subtract(1,'h');
				}

				// Combine them
				dateTime = self._joinDateAndTimeMoments(localDate,time);

				if(self.storeUtc) {
					dateTime.utc();
				}

				if(!dateTime.isValid()) {
					return '';
				}

				return dateTime.format(self.momentStoreFormat);
			}
		},

		_splitDateAndTime: function (dateTimeString) {
			var self = this,
				dateTime,
				result = {};
			
			if(self.storeUtc) {
				// Parse as UTC
				dateTime = moment.utc(dateTimeString, self.momentStoreFormat);
			} else {
				// Parse as local
				dateTime = moment(dateTimeString, self.momentStoreFormat);
			}

			if(!dateTime.isValid()){
				return {
					date: '',
					time: ''
				};
			}

			result.time = dateTime.format(types.time.momentStoreFormat);

			if(self.storeUtc) {
				// need local for date type
				dateTime.local();
			}

			result.date = dateTime.format(types.date.momentStoreFormat);

			return result;
		},

		_joinDateAndTimeMoments: function(localDateMoment, localTimeMoment) {
			return moment()
				.second(localTimeMoment.second())
				.minute(localTimeMoment.minute())
				.hour(localTimeMoment.hour())

				.date(localDateMoment.date())
				.month(localDateMoment.month())
				.year(localDateMoment.year());
		},

		validate: function(ifw) {
			var self = this,
				valid = true,
				skipRequired = !self.ifw.hasStatus('require');

			// Do not skip require check when only one is empty
			if(skipRequired){
				skipRequired = !self.dateWidgetInstance.isEmpty();
				skipRequired = skipRequired && !self.timeWidgetInstance.isEmpty();
			}

			valid = valid && self.dateWidgetInstance.validate(skipRequired);
			valid = valid && self.timeWidgetInstance.validate(skipRequired);

			if(!valid) {
				return {
					message: 'invalid'
				};
			}
		},

		// will not validate if empty
		isEmpty: function() {
			var self = this;

			return ($.trim(self.dateWidget.val()) + $.trim(self.timeWidget.val())) === '';
		},

		tearDown: function(ifw) {
			var self = this;

			self.dateWidget.inputField('getField').remove();
			self.timeWidget.inputField('getField').remove();

			self.dateWidget = undefined;
			self.timeWidget = undefined;

			ifw.element.parent().show();
		}

	};

})(jQuery);