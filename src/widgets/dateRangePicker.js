/**
* dateRangePicker Widget
*
* This widget allows for the use of checkboxes and radio boxes alongside formBuilder
*
* Public Methods:
*   setRange()
*   serialize()
*	 deserialize()
*   get()
*   set()
*   isDirty()
*   clearDirty()
*   clear()
*   validate()
*/

import $ from 'jquery';
import moment from 'moment';
import dict from '../util/i18n';

$.widget('formBuilder.dateRangePicker', {
	
	//TODO: this needs to be replaced with a template
	_dateRangePickerTemplate:
		'<div class="date-range-picker form">'+
			'<input type="text" name="from" data-type="date" data-label="' + dict.t('from') + '"/>' +
			'<input type="text" name="to" data-type="date" data-label="' + dict.t('to') + '"/>' +
			
			'<button type="button" class="previous-range">&lt;&lt;</button>' +
			
			'<div class="input-field-group range-select">' +
				'<select name="range" style="width: 138px;">' +
					'<option value="custom">' + dict.t('custom') + '</option>' +
					'<option value="day">' + dict.t('day') + '</option>' +
					'<option value="week">' + dict.t('week') + '</option>' +
					'<option value="month">' + dict.t('month') + '</option>' +
					'<option value="year">' + dict.t('year') + '</option>' +
				'</select>' +
			'</div>'+

			'<button type="button" class="next-range">&gt;&gt;</button>' +
		'</div>',

	_create: function () {
		const self = this,
			e = self.element;

		const form = self.form = $('<div></div>').html(self._dateRangePickerTemplate).find('.date-range-picker').formBuilder();

		e.append(form);

		self.fromDate = form.find('input[name="from"]').on('keyup ondateselect', function () {
			$(self.range).val('custom');
		});

		self.toDate = form.find('input[name="to"]').on('keyup ondateselect', function () {
			$(self.range).val('custom');
		});

		form.find('button.previous-range').button().on('click', function () {
			self._moveRange(-1, $(self.range).val());
		});

		form.find('button.next-range').button().on('click', function () {
			self._moveRange(1, $(self.range).val());
		});

		self.range = form.find('select[name="range"]').on('change', function () {
			self.setRange($(this).val());
		});
		
		self.set();
	},

	_moveRange: function (number, unit) {
		const self = this;

		let fromDate = self.fromDate.inputField('get');

		if (!fromDate || unit === 'custom') {
			return;
		}

		fromDate = self.deserialize(fromDate);


		const begin = fromDate.add(number, unit);
		const end = moment(begin).add(1,unit).subtract(1,'day');

		self._setFromAndTo(begin, end);
	},

	setRange: function (range) {
		const self = this;
		
		self.set({
			range: range
		});
		
		if (range === 'custom') {
			return;
		}

		let fromDate = self.fromDate.inputField('get');

		if (!fromDate) {
			fromDate = moment();
		}

		if (typeof fromDate === 'string') {
			fromDate = self.deserialize(fromDate);	
		}

		const from = fromDate.startOf(range);
		const to = moment(from).endOf(range);

		self._setFromAndTo(from, to);
	},
	
	_setFromAndTo: function (from, to) {
		const self = this;

		if (typeof from !== 'string') {
			from = self.serialize(from);
		}
		if (typeof to !== 'string') {
			to = self.serialize(to);
		}

		self.fromDate.inputField('set', from);
		self.toDate.inputField('set', to);
	},

	serialize: function (momentDate) {	
		if (!momentDate) {
			return;
		}

		return momentDate.format('YYYY-MM-DD');
	},

	deserialize: function (sDate) {
		if (!sDate) {
			return;
		}

		return moment(sDate, 'YYYY-MM-DD');
	},

	get: function () {
		return this.form.formBuilder('get');
	},

	set: function (data) {
		const self = this;

		if(typeof data === 'undefined') {
			data = self._getDataDefault();
		}
		
		self.form.formBuilder('set', data);
	},
	
	_getDataDefault: function () {
		return {
			range: 'custom'
		};
	},

	isDirty: function () {
		return this.form.formBuilder('isDirty');
	},

	clearDirty: function () {
		this.form.formBuilder('clearDirty');
	},

	clear: function () {
		this.set({
			from: '',
			to: '',
			range: 'custom'
		});
	},

	validate: function () {
		return this.form.formBuilder('validate');
	}
});

