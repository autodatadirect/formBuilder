/**
 * dateTimeSeparate, a combination of a date field and a time field
 */

(function($){
	var types = $.add123.inputField.types;

	/*
	 * Date Type Support (date)
	 *
	 * Has calendar popup (bootstrap-datepicker)
	 *
	 * Attribute Settings:
	 * data-minyear (default [-=15]) - Can be set to 'CURRENT'
	 * data-maxyear (default [+=2]) - Can be set to 'CURRENT'
	 * date-startdate (default 01/01/[minyear]) - trumps minyear if both set. Can be set to 'TODAY'
	 * date-enddate (default 12/31/[maxyear]) - trumps maxyear if both set. Can be set to 'TODAY'
	 */
	types.date = {
		attributes: ['minyear', 'maxyear', 'startdate', 'enddate'],

		setUp: function(ui) {
			var self = this,
				e = ui.element,
				tmp;

			ui.placeholder('MM/DD/YYYY');

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

			// Determine date ends
			var startDate = '1/1/' + minYear,
				endDate = '12/31/' + maxYear;

			tmp = e.data('startdate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					startDate = new moment().format('MM/DD/YYYY');
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					startDate = tmp;
				}
			}
			
			tmp = e.data('enddate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					endDate = new moment().format('MM/DD/YYYY');
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					endDate = tmp;
				}
			}

			// Setup datepicker
			var datePickerOptions = {
				startDate: startDate,
				endDate: endDate,
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
			 * Store date in XSD standard: yyyy-mm-dd <=> mm/dd/yyyy
			 */
			toField: function(val, ui) {
				if(!val || !val.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
					return '';
				}
				return val.substring(5, 7) + '/' + val.substring(8, 10) + '/' + val.substring(0, 4);
			},
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
				date = ui.element.val();
			if(!moment(date, ["MM/DD/YYYY"], true).isValid()) {
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
	 * date-step (default=30) - Minute increment between times in dropdown
	 * 
	 */
	types.time = {
		attributes: ['step'],

		_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,

		setUp: function(ifw) {
			var self = this,
				e = ifw.element;

			ifw.placeholder('H:MMam/pm');

			e.inputFilter({
				pattern: /[0-9:apm]/,
				max: 7
			});

			e.timepicker({
				appendTo: e.parent(),
				selectOnBlur: false,
				step: e.data('step') //default is 30 and will be set if undefined
			});

			// Make sure the timepicker width matches the field width
			e.on('showTimepicker', function(){
				e.siblings('.ui-timepicker-wrapper').width(e.outerWidth());
			});

		},

		converter: {
			/**
			 * convert from moment format HH:mm (utc) to h:mma (local)
			 */
			toField: function(val, ifw) {
				var self = this;
				if(!val || !val.match(/^[0-9]{2}:[0-9]{2}$/))
					return '';
				
				return moment.utc(val, 'HH:mm', true).local().format('h:mma');
			},

			/**
			 * convert from moment format h:mma (local) to HH:mm (utc)
			 */
			fromField: function(val, ifw) {
				var self = this;
				if(!val || !val.match(self._regex))
					return '';
				return moment(val,'h:mma').utc().format('HH:mm');
			}
		},

		tearDown: function(ifw) {
			ifw.element.timepicker('remove');
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

	/**
	 * A combination of two InputFields, date & time.
	 *
	 * The original inputfield is hidden between them.
	 *
	 * Format: 'YYYY-MM-DDTHH:mm:ssZ' in UTC
	 *
	 * Attribute Settings:
	 * data-time-width-ratio (default=0.5, min=.2, max=.8) 
	 *
	 * CSS Settings:
	 * min-width (default=270px, min=100px)
	 *
	 * Attributes specific for date or time will be passed to them.
	 */
	types.dateTime = {
		setUp: function(inputFieldWidgetInstance) {
			var self = this;

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
				dateAttr = '',
				timeAttr = '',
				options, tmp, i;

			self.ifw.element.parent().hide();

			// Get date attributes
			for(i = 0; i < types.date.attributes.length; ++i) {
				tmp = e.data(types.date.attributes[i]);
				if(tmp !== undefined) {
					dateAttr += 'data-'+types.date.attributes[i]+'="'+tmp+'" ';
				}
			}
			
			// Get time attributes
			for(i = 0; i < types.time.attributes.length; ++i) {
				tmp = e.data(types.time.attributes[i]);
				if(tmp !== undefined) {
					timeAttr += 'data-'+types.time.attributes[i]+'="'+tmp+'" ';
				}
			}

			options = {
				require: true
			};

			// Create the widgets
			self.dateWidget = $('<input type="text" data-type="date" '+dateAttr+'/>').prependTo(fieldItems).inputField(options);
			self.timeWidget = $('<input type="text" data-type="time" '+timeAttr+'/>').appendTo(fieldItems).inputField(options);
		},

		/**
		 * Make sure the child widgets' total width is equal to the base element's width
		 */
		_refreshFieldWidth: function() {
			var self = this,
				fullWidth = self.ifw.element.outerWidth(),
				elDate = self.dateWidget,
				elTime = self.timeWidget,
				timeWidthRatio,
				minWidth;

				// Take out widghet margins/padding from outer width
				fullWidth -= elDate.outerWidth() - elDate.width();
				fullWidth -= elTime.outerWidth() - elTime.width();
				
				// Prevent it from being too small
				minWidth = self.ifw.element.css('min-width');
				if(minWidth !== null) {
					minWidth = parseInt(minWidth, 10);
				}
				if(minWidth === null || minWidth < 100) {
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

				self.timeWidget.inputField('set', splitDate.time);
				self.dateWidget.inputField('set', splitDate.date);

				// Redraw them via async
				setTimeout(function(){
					self.timeWidget.inputField('redraw');
					self.dateWidget.inputField('redraw');
				}, 0);
			}, 

			fromField: function(val, ifw) {
				var self = this,
					dateTimeObject;

				dateTimeObject = {
					date: self.dateWidget.inputField('get'),
					time: self.timeWidget.inputField('get') 
				};

				return self._joinDateAndTime(dateTimeObject);
			}
		},

		_momentDateFormat: 'YYYY-MM-DDTHH:mm:ss[Z]', //The Z is escaped

		_splitDateAndTime: function (dateTimeString) {
			var dateString, timeString;
			var dateTime = moment(dateTimeString, self._momentDateFormat, true);
			
			if(!dateTime.isValid()){
				return {
					date: '',
					time: ''
				};
			}

			return {
				date: dateTime.format('YYYY-MM-DD'),
				time: dateTime.utc().format('HH:mm')
			};
			
		},

		_joinDateAndTime: function(dateTimeObject) {
			var dto = dateTimeObject;

			if(dto.date === '' || dto.time === '')
				return '';

			return dto.date + 'T' + dto.time + ':00Z';
		},

		validate: function(ifw) {
			var self = this,
				valid = true,
				skipRequired = !self.ifw.hasStatus('require');

			// Do not skip require check when only one is empty
			if(skipRequired){
				skipRequired = !self.dateWidget.inputField('isEmpty');
				skipRequired = skipRequired && !self.timeWidget.inputField('isEmpty');
			}

			valid = valid && self.dateWidget.inputField('validate', skipRequired);
			valid = valid && self.timeWidget.inputField('validate', skipRequired);

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
			self.dateWidget.remove();
			self.timeWidget.remove();

			self.dateWidget = undefined;
			self.timeWidget = undefined;

			ifw.parent().show();
		}

	};

})(jQuery);