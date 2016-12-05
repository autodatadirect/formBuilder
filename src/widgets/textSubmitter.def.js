import $ from 'jquery';

const dict = $.formBuilder.lang.dict;

// Converted the lang.sendInstruction to an option with 'press enter to submit' as a default
// Note: this differs from the tms 'press enter to add note'

export default {
	_textSubmitterTemplate:
		'<div class="text-submitter">' +
			'<textarea name="text-entry" rows="3" />' +
			'<div class="send-instruction noselect"></div>' +
		'</div>',

	options: {
		width: '300px',
		placeholder: '',
		sendInstruction: dict.defaultSendInstruction,
		rows: undefined, 
		ignoreEmptySubmit: false	// submit when empty yes/no
	},

	_create: function () {
		const self = this,
			e = self.element,
			o = self.options;

		/**
		 * Setup html
		 */
		self.container = $(self._textSubmitterTemplate);

		e.append(self.container);

		self.textEntry = e.find('textarea[name="text-entry"]');

		if(!isNaN(o.rows)) {
			self.textEntry.attr('rows', o.rows);
		}

		self.sendInstruction = e.find('.send-instruction').text(o.sendInstruction);
		self.sendInstruction.css('visibility', 'hidden');

		self.textEntry.width(o.width).inputField({
			placeholder: o.placeholder,
			statusUpdate: function(ev, data) {
				if(data.statusName === 'disable'){
					if(data.value === false && self.textEntry.is(':focus')) {
						// Just been enabled and still on it
						self.sendInstruction.css('visibility', 'visible');
						self.textEntry.removeAttr('readonly');
					} else {
						// Just been disabled
						self.sendInstruction.css('visibility', 'hidden');
						self.textEntry.attr('readonly', true); // prevents edits during submit
					}
				}
			}
		});

		self.element.width(o.width);

		/**
		 * Handle events
		 */
		self.textEntry
			.on('focus',function(){
				self.sendInstruction.css('visibility', 'visible');
			})
			.on('blur', function(){
				self.sendInstruction.css('visibility', 'hidden');
			})
			.on('keydown', function (ev) {
				if (ev.which === 13 && !ev.shiftKey) {
					ev.preventDefault();
					self._submit();
				}
			});
	},

	_submit: function () {
		const self = this,
			o = self.options;

		if(self.textEntry.inputField('isDisabled') || 
			(o.ignoreEmptySubmit && self.textEntry.inputField('isEmpty'))) {
			return;
		}


		self.disable();

		const onComplete = function (success) {
			if (success) {
				self.clear();
			}
			self.enable();
		};
		self._trigger('submit', null, {text: self.get(), onComplete: onComplete});
	},

	set: function (text) {
		const self = this;

		self.textEntry.inputField('set', text);
	},

	setInstruction: function(text){
		const self = this;

		self.sendInstruction.text(text);
	},

	get: function () {
		const self = this;

		return self.textEntry.inputField('get');
	},

	clear: function () {
		const self = this;

		self.textEntry.inputField('clear');
	},

	disable: function () {
		const self = this;

		self.textEntry.inputField('disable');
	},

	enable: function () {
		const self = this;
		self.textEntry.inputField('enable');
	},

	_destroy: function() {
		const self = this;
		self.container.remove();
	}
};
