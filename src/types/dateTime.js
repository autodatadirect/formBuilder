/**
* Data Type 'dateTime'
* 
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

import $ from 'jquery';
import date from './date';
import time from './time';
import moment from 'moment';

const dict = {};

export default {
	momentStoreFormat: 'YYYY-MM-DDTHH:mm:ss[Z]',
	setUp: function(inputFieldWidget) {
		const self = this,
			e = inputFieldWidget.element;


		// Get option constants
		self.storeUtc = e.data('storeUtc');
		if(self.storeUtc === undefined) {
			self.storeUtc = true;
		} else {
			self.storeUtc = !!self.storeUtc;
		}

		self.ifw = inputFieldWidget;

		self._setUpFields();
		self._refreshFieldWidth();
		self._setUpCleanDirtyEvents();

		self.ifw.element.on('resize', function(){
			self._refreshFieldWidth();
		});
	},

	_setUpFields: function() {
		const self = this,
			e = self.ifw.element,
			fieldItems = self.ifw.element.parent().parent();
		
		let tmp, i;

		self.ifw.element.parent().hide();

		// Create the elements
		self.dateWidget = $('<input type="text" data-type="date"/>');
		self.timeWidget = $('<input type="text" data-type="time"/>');

		// Pass date attributes
		for(i = 0; i < date.attributes.length; ++i) {
			tmp = e.data(date.attributes[i]);
			if(tmp !== undefined) {
				self.dateWidget.data(date.attributes[i], tmp);
			}
		}
		
		// Pass time attributes
		for(i = 0; i < time.attributes.length; ++i) {
			tmp = e.data(time.attributes[i]);
			if(tmp !== undefined) {
				self.timeWidget.data(time.attributes[i], tmp);
			}
		}

		const options = {
			require: true
		};

		// Create the widgets
		self.dateWidget.prependTo(fieldItems).inputField(options);
		self.timeWidget.appendTo(fieldItems).inputField(options);

		self.dateWidget.parent().addClass('first');

		self.timeWidgetInstance = self.timeWidget.data('formBuilderInputField');
		self.dateWidgetInstance = self.dateWidget.data('formBuilderInputField');
	},

	/**
	 * Make sure the child widgets' total width is equal to the base element's width
	 */
	_refreshFieldWidth: function() {
		const self = this,
			elDate = self.dateWidget,
			elTime = self.timeWidget;

		let fullWidth = self.ifw.element.width(),
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
		const self = this;	

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
		toField: function(val) {
			const self = this,
				splitDate = self._splitDateAndTime(val);


			self.timeWidgetInstance.set(splitDate.time);
			self.dateWidgetInstance.set(splitDate.date);
		}, 
		
		fromField: function() {
			const self = this;

			let localDate = self.dateWidgetInstance.get(),
				time = self.timeWidgetInstance.get();

			// If one is empty just default to current time
			if(!localDate.trim() || !time.trim()) {
				return '';
			}
			
			if(!localDate.trim()) {
				localDate = moment();
			} else {
				// Convert them to moments
				localDate = moment(localDate, date.momentStoreFormat);
			}

			if(!time.trim()) {
				time.moment();
				
				if(self.storeUtc) {
					time.utc();
				}
			} else {
				if(self.storeUtc) {
					// Parse as UTC and localize
					time = moment.utc(time, time.momentStoreFormat).local();
				} else {
					// Parse as local
					time = moment(time, time.momentStoreFormat);
				}
			}

			// Combine them
			const dateTime = self._joinDateAndTimeMoments(localDate,time);

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
		const self = this,
			result = {};

		let dateTime;
		
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

		result.time = dateTime.format(time.momentStoreFormat);

		if(self.storeUtc) {
			// need local for date typ
			dateTime.local();
		}

		result.date = dateTime.format(date.momentStoreFormat);

		return result;
	},

	_joinDateAndTimeMoments: function(localDateMoment, localTimeMoment) {
		return moment().utcOffset(localTimeMoment.utcOffset())
			.milliseconds(0)
			.second(localTimeMoment.second())
			.minute(localTimeMoment.minute())
			.hour(localTimeMoment.hour())

			// Day set order is required from highest -> lowest
			.year(localDateMoment.year())
			.month(localDateMoment.month())
			.date(localDateMoment.date());
	},

	validate: function() {
		const self = this;
		
		let skipRequired = !self.ifw.hasStatus('require'),
			valid = true;

		// Do not skip require check when only one is empty
		if(skipRequired){
			skipRequired = !self.dateWidgetInstance.isEmpty();
			skipRequired = skipRequired && !self.timeWidgetInstance.isEmpty();
		}

		valid = valid && self.dateWidgetInstance.validate(skipRequired);
		valid = valid && self.timeWidgetInstance.validate(skipRequired);

		if(!valid) {
			return {
				message: dict.invalid
			};
		}
	},

	// will not validate if empty
	isEmpty: function() {
		const self = this;
		return ($.trim(self.dateWidget.val()) + $.trim(self.timeWidget.val())) === '';
	},

	tearDown: function(ifw) {
		const self = this;

		self.dateWidget.inputField('getField').remove();
		self.timeWidget.inputField('getField').remove();

		self.dateWidget = undefined;
		self.timeWidget = undefined;

		ifw.element.parent().show();
	}
};
