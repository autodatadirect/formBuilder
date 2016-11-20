/**
* inputFilter widget
*
* Events:
* keyignored
* keytyped
*/

import '../plugins/caret';
import $ from 'jquery';

$.widget('formBuilder.inputFilter', {

	options: {
		toUpper: false,
		//TODO: support max, flash when at end of string, other wise just splice off the end
		max: 0,
		pattern: /[\w\s]/, 	// was [A-Z]

		// If the typed character/text matches the pattern it will go through this function.
		// This can be used for custom checks. The text returned is the
		// one that is actually put into the input. If no text is returned, 
		// the key is ignored like ususal
		extraFilter: function(currentValue, inText) {
			return inText;
		}
	},

	_create: function() {
		const self = this,
			e = self.element;

		let memory;

		/*
		 * track if a native change event will be fired by the browser
		 */
		self.nativeChange = false;

		if(!e.is('input[type=text], input[type=password], textarea')) {
			throw new Error('inputFilter must be applied to a text or password input ');
		}

		e.on('keydown.inputFilter', $.proxy(this._onKeyDown, self));
		e.on('keypress.inputFilter', $.proxy(this._onKeyPress, self));
		e.on('paste.inputFilter', $.proxy(this._onPaste, self));

		/*
		 * support change events
		 */
		e.on('focus.inputFilter', function() {
			memory = e.val();
		});
		e.on('blur.inputFilter', function() {
			if(!self.nativeChange && memory !== e.val()) {
				e.change();
			}
			self.nativeChange = false;
		});

	},

	setMax: function (max) {
		this.options.max = max;
	},

	setPattern: function (regex) {
		this.options.pattern = regex;
	},

	_onPaste: function() {
		/*
		 * on the paste event, schedule a clean
		 */
		setTimeout($.proxy(this._clean, this), 0);
	},

	_onKeyDown: function(ev) {
		/*
		 * detect when the native change event will be fired
		 */
		if(ev.which < 32 || ev.which > 126 || ev.ctrlKey) {
			this.nativeChange = true;
		}
	},


	_onKeyPress: function(ev) {
		const self = this;
		/*
		 * Weird IE glitch fix
		 *
		 * TODO: this needs an explaination of the problem
		 */
		//if (!ev.which && ((ev.charCode || ev.charCode === 0) ? ev.charCode : ev.keyCode)) {
		//	ev.which = ev.charCode || ev.keyCode;
		//}
		/*
		 * bypass command keys
		 */
		if(ev.which < 32 || ev.which > 126 || ev.ctrlKey) {
			return true;
		}
		self._type(String.fromCharCode(ev.which));
		return false;
	},

	/*
	 * retype all the characters in the field so they are passed through the filter
	 */
	_clean: function() {
		const v = this.element.val();
		this.element.val('');
		$.each(v.split(''), $.proxy(function(i, c) {
			this._type(c);
		}, this));
	},

	/*
	 * manually enter the given text into the input field
	 * obeying the regular expression and triggering events
	 * when characters are ignored
	 */
	_type: function(text) {
		const self = this,
			o = self.options,
			e = self.element,
			val = e.val(),
			keytypedEvent = 'keytyped',
			keyignoredEvent = 'keyignored';

		let p, tmp;

		if(o.toUpper) {
			text = text.toUpperCase();
		}

		if(text.match(o.pattern) && typeof(text = o.extraFilter(val, text)) === 'string') {
			/*
			 * only deal with the caret if the field is focused
			 *
			 * (changed focus check because of a PhantomJS bug)
			 * https://github.com/ariya/phantomjs/issues/10427
			 */
			if(e[0] === document.activeElement) {
				p = e.caret();
				tmp = val.slice(0, p.begin) + text + val.slice(p.end);
				if(o.max && tmp.length > o.max){
					self._trigger(keyignoredEvent);
					return false;
				}else{
					e.val(tmp);
					e.caret(p.begin + text.length);
				}
			} else {
				p = val + text;

				if(o.max && p.length > o.max){
					p = p.substring(0, o.max);
					self._trigger(keyignoredEvent);
					return false;
				}

				e.val(p);
			}

			self._trigger(keytypedEvent);
			return true;
		} else {
			self._trigger(keyignoredEvent);
			return false;
		}
	},

	_destroy: function() {
		const self = this,
			e = self.element;
		e.off('.inputFilter');
	}

});
