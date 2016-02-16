/**
 * inputField Widget
 *
 * This widget wraps the operation of a single field of a form
 *
 * Public Methods:
 *   value(value)
 *   validate()
 *   flash()
 *   setError()
 *   clearError()
 *   redraw()
 *   status(statusName, bool)
 */

(function($) {
	"use strict";
	var util = $.formBuilder.util;
	var dict = $.formBuilder.lang.dict;

	var repeat = function(work, delay, count, idx) {
		idx = idx || 0;
		if(idx < count) {
			work();
			setTimeout(function() {
				repeat(work, delay, count, idx + 1);
			}, delay);
		}
	};

	var statusNames = ['require', 'disabled', 'error', 'hover', 'warn', 'focus'];

	$.widget('formBuilder.fieldWidget', {

		isDirty: function () {
			return false;
		},

		validate: function () {
			return true;
		},

		clearDirty: function () {

		},

		clear: function () {
			this.set();
		},

		flash: function () {

		},

		set: function (data) {

		},

		get: function () {
			return null;
		}
	});

	$.widget("formBuilder.inputField", {
		options: {
			type: 'text',

			/*
			 * the text shown
			 */
			label: '',

			require: '', required: '', //same

			/*
			 * text to show when the field is empty, this uses the suggest layer
			 */
			placeholder: '',

			/*
			 * min and max, there meaning depends on the type that is loaded
			 */
			min: '',
			max: '',

			error: 'error',

			forceFirst: false // force the addition of .first on input (left border fix)
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			if(!e.is('input[type!=submit], select, textarea')) {
				throw new Error("invalid element");
			}

			self.dirty = false;

			/*
			 * load DOM settings from field into options
			 */

			util.loadDomData(e, o, ['empty', 'placeholder', 'type', 'label', 'min', 'max', 'preinput', 'postinput', 'suffix', 'prefix']);
			util.loadDomToggleData(e, o, ['require', 'required']);

			/*
			 * legacy support
			 */
			o.require = o.require || o.required;
			if(!o.placeholder && o.empty) {
				o.placeholder = o.empty;
			}

			/*
			 * check if a tool-tip was given
			 */
			var tooltip, tooltipContent = e.next();
			if(tooltipContent.is('div.form-input-tooltip') || tooltipContent.is('div.tooltip')) {
				tooltip = tooltipContent;
			}

			/*
			 * convert the simple input into the full field format
			 */

			var field = self.field = $('<div class="input-field"><div class="field-items"><span class="field-item field-item-input"></span></div></div>');

			var layers = self.layers = {
				items: field.find('.field-items'),
				input: field.find('.field-item-input')
			};

			if(o.label) {
				self.setLabel(o.label);
			}

			/*
			 * move the DOM elements around
			 */
			e.before(field).appendTo(layers.input);

			/*
			 * move classes
			 */
			field.attr('class', $.trim(field.attr('class')) + ' ' + $.trim(e.attr('class')));
			e.removeAttr('class');

			if(e.is('textarea')) {
				field.addClass('textarea-fix');
				e.wrap('<div class="textarea-wrapper"></div>');
			}
			if (e.is('select')) {
				field.addClass('select-fix');
			}

			/*
			 * if this field is not part of a group in its form, add a group class to this field for proper styling
			 */
			var parentContainer = field.closest('.input-field-group, :formBuilder-formBuilder');

			if(!parentContainer.length || parentContainer.is(':formBuilder-formBuilder')) {
				field.wrap('<div class="input-field-group"/>');
				field.find('.field-item:first').addClass('first');
			}

			if(o.forceFirst) {
				field.find('.field-item:first').addClass('first');
			}

			if(o.placeholder){
				self.setPlaceholder(o.placeholder);
			}

			if(o.preinput) {
				self.addon(o.preinput, -1);
			}

			if(o.postinput) {
				self.addon(o.postinput, 1);
			}

			if(o.suffix){
				self.setSuffix(o.suffix);
			}

			if(o.prefix){
				self.setPrefix(o.prefix);
			}

			if(tooltip) {
				var addon = self.addOn(1000, '<span class="tooltip noselect">?</span>', 'clickable');

				field.addClass('has-tooltip');

				tooltip.popOver({
					target: addon,
					onShow: function () {
						addon.addClass('open');
					},
					onHide: function () {
						addon.removeClass('open');
					}
				}).on('click', function () {
					e.focus();
				});

				tooltip.popOver('hide');

				addon.on('click', function() {
					tooltip.popOver('toggle');
				});
			}

			/*
			 * move element style
			 */
			// field.attr('style', e.attr('style'));
			// e.removeAttr('style');
			/*
			 * add the pad1 class to make way for the drop down handle
			 */
			// if(e.is('select')){
			// field.addClass('pad1');
			// }
			/*
			 * if someone tries to select text from one of the layers, this will focus the input field
			 */
			/* this causes problems when extra dialogs like dropdown panels are placed inside the field container */
			//field.on('mousedown.inputField', function() {
			layers.input.on('mousedown.inputField', function() {
				$('body').one('mouseup.inputField', function() {
					e.focus();
				});
			});

			self.autoValidate = 'blur';

			self.states = {};

			/*
			 * set the require option as a status
			 */
			self.status('require', o.require, false);

			/*
			 * activate focus classes and suggestion layer
			 */
			e.focus(function() {
				self.status('focus', true);
			}).blur(function(ev) {
				self.status('focus', false);
				self._onBlur(ev);
			}).change(function(ev) {
				self._onKeyup(ev);
			}).on('inputfilterkeyignored.inputField', function() {
				self.flash();
			}).on('inputfilterkeytyped.inputField', function() {
				if(self.suffixShim){
					self.suffixShim.text(self.element.val());
				}
			}).on('keyup', function(ev) {
				self._onKeyup(ev);
			}).on('keydown', function(ev) {
				self._onKeydown(ev);
			});

			field.mouseenter(function() {
				self.status('hover', true);
			}).mouseleave(function() {
				self.status('hover', false);
			});

			/*
			 * set the type of this field
			 */
			self.setType(o.type);

			self.prevValue = e.val();

			if(o.max){
				self.setMax(o.max);
			}
		},

		setLabel: function (label) {
			var self = this,
				field = self.field;

			if(!self.label){
				self.label = $('<label>' + label + '</label>');
				self.label.prependTo(field);
			}

			self.label.html(label);
		},

		setSuffix: function (t) {
			var self = this,
				layers = self.layers;

			if(!layers.suffix){
				layers.suffix = self.addin(t, 1, 'suffix-overlay noselect', true);
			} else {
				layers.suffix.html(t);
			}
		},

		setPrefix: function(t) {
			var self = this,
				layers = self.layers;

			if(!layers.prefix){
				layers.prefix = self.addin(t, -1, 'prefix-overlay noselect', true);
			} else {
				layers.prefix.html(t);
			}
		},

		// legacy support
		placeholder: function(t) {
			this.setPlaceholder(t);
		},
		setPlaceholder: function(t) {
			var self = this,
				layers = self.layers;

			if(!layers.placeholder){
				layers.placeholder = $('<div class="placeholder noselect"></div>').hide().appendTo(layers.input);
			}

			layers.placeholder.html(t);
		},


		setMax: function (max) {
			var self = this,
				e = self.element;

			if(e.is(':formBuilder-inputFilter')){
				e.inputFilter('setMax', max);
			} else {
				e.inputFilter({
					toUpper: false,
					max: max,
					pattern: /./
				});
			}
		},

		_onKeydown: function(ev) {
			var self = this;
			self._toggleLayer('placeholder', false);
		},

		_onKeyup: function(ev) {
			var self = this;

			if(self.autoValidate === 'keyup') {
				/*
				 * defer validate, this will help give time for formaters and such to run
				 */
				setTimeout(function() {
					self.validate(true);
				}, 0);
			}

			self.checkDirty();
			self.redraw();
		},

		checkDirty: function () {
			var self = this,
				e = self.element;

			if(!self.dirty){
				var val = self.get();

				/*
				 * TMS-350 Save/Cancel become greyed out on Ticket Details page even when changes are present
				 */
				if(!util.equals(self.prevValue, val) && !(typeof self.prevValue === 'undefined' && val === '')){
					e.trigger('dirty');
					self.dirty = true;
				}
			} else {
				/*
				 * clean checks can be fired many times, so debouce them with a timer
				 */
				if(self.cleanCheckTimer){
					clearTimeout(self.cleanCheckTimer);
				}
				self.cleanCheckTimer = setTimeout(function() {
					var prev = self.prevValue,
						val = self.get();

					if(prev !== 0 && (!prev || $.isEmptyObject(prev))){
						prev = '';
					}

					if(val !== 0 && (!val || $.isEmptyObject(val))){
						val = '';
					}

					if(util.equals(prev,val)){
						self.dirty = false;
						e.trigger('clean');
						self.redraw();
					}
				}, 300);
			}
		},

		isDirty: function () {
			return this.dirty;
		},

		_onBlur: function(ev) {
			var self = this;
			if(self.autoValidate === 'blur') {
				/*
				 * defer validate, this will help give time for formaters and such to run
				 */
				setTimeout(function() {
					self.validate(true);
				}, 0);
			}
		},

		/**
		 * Handles addonWrapper around field-item-input
		 */
		addOn: function(weight, html, className) {
			// Legacy support
			var element = $(html);
			element.wrap('<span class="'+className+'"></span>');
			return this.addon(element, weight);
		},
		addon: function(element, weight, keepPosition) {
			var input = this.layers.input;

			if(!input.is(':formBuilder-addonWrapper')) {
				// Initialize it
				input.addonWrapper();
			}

			return input.addonWrapper('add', element, weight, keepPosition);
		},

		/**
		 * Handles addonWrapper around input element
		 */
		addin: function(element, weight, keepPosition) {
			var self = this,
				e = self.element;

			if(!e.is(':formBuilder-addonWrapper')) {
				// Initialize it
				e.addonWrapper({
					fixWidth: true,
					postUpdate: function() {
						self._repositionPlaceholder();
					}
				});
			}

			return e.addonWrapper('add', element, weight, keepPosition);
		},

		/**
		 * Keeps placeholder over input element only, reducing font if needed
		 */
		_repositionPlaceholder: function() {
			var p = this.layers.placeholder,
				e = this.element;

			if(!p) {
				return;
			}

			// Make the placeholder in the same location + same size as element
			p.width(e.width());
			p.css('margin-left', e.position().left);

			// Make sure the placholder text does not overflow container
			if(!this.savedPlaceholderSize) {
				this.savedPlaceholderFontSize = p.css('font-size');
			} else {
				p.css('font-size', this.savedPlaceholderSize);
			}

			while(p[0].scrollWidth > e.width() && (parseFloat(p.css('font-size'),10) >= 8.0)) {
				p.css('font-size','-=1.0');
			}
		},

		_init: function() {
			var self = this;
			self.set(self.element.attr('value'));
		},

		clear: function () {
			var self = this,
				type = self.type;

			self.clearDirty();

			if(type && $.isFunction(type.clear)) {
				type.clear.call(type, self);
			} else {
				self.prevValue = '';
				self.set('');
			}
		},

		clearDirty: function () {
			var self = this;

			if(self.cleanCheckTimer){
				clearTimeout(self.cleanCheckTimer);
			}

			self.dirty = false;
			self.field.removeClass('dirty');
			self.element.trigger('clean');
		},

		conflicts: function (value) {
			var self = this;
			if(self.dirty){
				return {
					key: self.element.attr('name'),
					vOld: self.get(),
					vNew: value
				};
			}
			return null;
		},

		set: function(value, setOptions) {
			var self = this,
				e = self.element;
			var val;

			setOptions = $.extend({autoClean: true}, setOptions);

			if (setOptions.autoClean) {

				 // * store the base value

				self.prevValue = value;

				self.clearDirty();
			}

			// Remove error (only if needed to avoid a redraw)
			if(self.hasStatus('error')) {
				self.status('error', false, false);
			}

			val = self._formatToField(value);

			// var val = value;
			/*
			 * some complex types might not want input.val() to be called,
			 * so ignore all undefined variables
			 */
			if(typeof(val) !== 'undefined') {
				e.val(val);
			}

			/*
			 * run the inputFilter if one exists on this field
			 */
			var f = e.data('inputFilter');
			if(f) {
				f._clean();
			}

			self._trigger('afterset', null, [val, value]);

			// Redraw synchronously to avoid display errors (was not working perfectly with setTimeout)
			self.redraw();
		},


		get: function() {
			var self = this,
				e = self.element;
			return self._formatFromField(e.val());
		},

		/*
		 * Legacy Method, use get() and set()
		 *
		 * value getter/setter for this field
		 */
		value: function(value) {
			var self = this;

			if(value === undefined) {
				return self.get();
			} else {
				return self.set(value);
			}
		},

		isEmpty: function() {
			var self = this,
				type = self.type;

			// check if type declares an isEmpty method
			if($.isFunction(type.isEmpty)) {
				return type.isEmpty.call(type, self);
			}

			return $.trim(self.element.val()) === '';
		},

		validate: function(skipRequired) {
			var self = this,
				states = self.states,
				type = self.type,
				empty = self.isEmpty();

			/*
			 * check required, compare against the actual value in the field
			 */
			if(!skipRequired && states.require && empty) {
				self.setError({
					message: dict.required
				});
				return false;
			}

			/*
			 * only call validate if not empty
			 */
			if(empty) {
				self.clearError();
				return true;
			}

			// This functionality should be handled in toField()
			// if($.isFunction(self.format)) {
			// 	self.format.call(self);
			// }

			/*
			 * check the type validation
			 */
			if($.isFunction(type.validate)) {
				var err = type.validate.call(type, self);
				if(typeof err === 'undefined') {
					self.clearError();
					return true;
				} else {
					self.setError(err);
					return false;
				}
			}

			self.clearError();
			return true;
		},

		/*
		 * flashes the field to get the users attention
		 *
		 * TODO: support flashing patterns
		 */
		flash: function(numberOfTimes) {
			var self = this,
				o = self.options;

			repeat(function() {
				self.field.addClass('flash');
				self.flashTimer = setTimeout(function() {
					self.field.removeClass('flash');
				}, 150);
			}, 150, numberOfTimes || 1);
		},

		/*
		 * err: {
		 *   message: '',
		 *   code: '',
		 *   description: ''
		 * }
		 */
		setError: function(err) {
			var self = this,
				error = self.states.error,
				layers = self.layers;

			// check if we need to clear the error
			if(err === undefined) {
				self.clearError();
				return;
			}

			if(!layers.error) {
				layers.error = self.addin(
					'<div class="error-overlay noselect"></div>',
					layers.suffix? 2 : 1,
					true
				);
			}

			console.log('ERROR', layers.error, layers.error.parent()[0]);

			if(err.message) {
				self.element.addonWrapper('update', function() {
					layers.error.html(err.message);
				});
			}

			self.status('error', true);

			// listen to keyUp events and rerun validate on this field
			self.autoValidate = 'keyup';
		},

		clearError: function() {
			var self = this;

			if(!self.states.error) {
				return;
			}

			self.autoValidate = 'blur';
			self.status('error', false);
		},

		_formatToField: function(value) {
			var self = this,
				type = self.type;

			if(value === null || value === undefined) {
				return value;
			}

			if(!type || !type.converter || !$.isFunction(type.converter.toField)) {
				return value;
			}

			return type.converter.toField.call(type, value, self);
		},

		_formatFromField: function(value) {
			var self = this,
				type = self.type;

			if(!type || !type.converter || !$.isFunction(type.converter.fromField)) {
				return value;
			}

			return type.converter.fromField.call(type, value, self);
		},

		/*
		 * decide what layers should be shown or hidden in the field
		 *
		 * warning: this function gets called a lot!
		 */
		redraw: function() {
			var self = this,
				e = self.element,
				hasVal = !!e.val(),
				layers = self.layers;


			self.field.toggleClass('dirty', !!self.dirty);
			self._toggleLayer('notice', !self.states.error);
			self._toggleLayer('placeholder', !hasVal);

			// Update the addins to preserve width
			if(e.is(':formBuilder-addonWrapper')) {
				e.addonWrapper('update', function() {
					self._toggleLayer(layers.error, self.states.error);
					self._toggleLayer(layers.prefix, hasVal);
					self._toggleLayer(layers.suffix, hasVal);
				});
			}
		},

		_toggleLayer: function(layerName, isVisible) {
			var layer = this.layers[layerName];

			if(!layer) {
				return;
			}

			layer.toggle(isVisible);

			if(isVisible && layerName === 'placholder') {
				this._repositionPlaceholder();
			}
		},

		setType: function(sType) {
			var self = this,
				types = $.formBuilder.inputField.types,
				type = self.type;

			/*
			 * run the type tear down if it exists
			 */

			if(type && $.isFunction(type.tearDown)) {
				type.tearDown().call(type, self);
			}

			/*
			 * if type doesn't exist set to the default of text
			 */
			if(!sType || !types[sType]) {
				if(sType) {
					throw new Error('[formBuilder] Invalid type "'+sType+'"', self.element);
				}

				sType = 'text';
			}

			/*
			 * setup the field type
			 */
			type = Object.create(types[sType]);

			/*
			 * run the type setup
			 */
			if($.isFunction(type.setUp)) {
				type.setUp.call(type, self);
			}

			self.type = type;
		},

		/*
		 * returns the type object
		 */
		getType: function () {
			return this.type;
		},

		hide: function() {
			this.field.hide();
		},

		show: function(displayValue) {
			if (displayValue) {
				this.field.css('display', displayValue);
			} else {
				this.field.show();
			}
		},

		getField: function() {
			return this.field;
		},

		enable: function() {
			this.status('disabled', false);
		},

		disable: function() {
			this.status('disabled', true);
		},

		isDisabled: function() {
			return this.hasStatus('disabled');
		},

		/*
		 * public status setters
		 */
		status: function(statusName, bool, fireEvents) {
			var self = this,
				o = self.options;

			/**
			 * Legacy support
			 */
			if(statusName === 'disable') {
				statusName = 'disabled';
			}

			/*
			 * only allow changes to status flags
			 */
			if($.inArray(statusName, statusNames) < 0) {
				return;
			}

			/*
			 * clean and set status in options
			 */
			var cleanBool = !!bool,
				states = self.states;

			if(cleanBool === states[statusName]) {
				/*
				 * this status is already set, ignore
				 */
				return;
			}

			states[statusName] = cleanBool;
			self.redraw();

			/*
			 * set the status class to the field
			 */
			if(states[statusName]) {
				self.field.addClass(statusName);
			} else {
				self.field.removeClass(statusName);
			}

			/*
			 * fire statusUpdated event
			 */
			if(fireEvents !== false) {
				self._trigger("statusUpdate", null, {
					'statusName': statusName,
					'value': states[statusName]
				});
			}

		},
		/*
		 * legacy status method
		 */
		updateStatus: function(statusName, bool, fireEvents) {
			this.status(statusName, bool, fireEvents);
		},

		hasStatus: function (statusName) {
			return !!this.states[statusName];
		},

		_destroy: function () {
			var self = this;

			//TODO remove all handlers
			//

			/*
			 * tearDown type object
			 */
			if(self.type && self.type.tearDown){
				self.type.tearDown.call(self.type, self);
			}
		}
	});





	/*
	 * InputField Types
	 *
	 * Stored in $.formBuilder.inputField.types
	 *
	 * The context (this) will get set to the context of the type object, use the ifw parameter to obtain access to the inputField widget
	 *
	 * setUp: add any events, elements, etc.
	 *
	 * tearDown: reverse whatever setUp did
	 *
	 * converter: used to convert data between "human" and transport formats (e.g. mm/dd/yyyy <-> yyyymmdd)
	 *
	 * validate: returns an error object on error or undefined on success
	 * err: {
	 *   message: '',
	 *   code: '', // not used
	 *   description: '' // not used
	 * }
	 *
	 */
	$.formBuilder.inputField.types = {};

	/* Basic Type Structure
	$.formBuilder.inputField.types = {
		setUp: function(ifw) {},
		tearDown: function(ifw) {},
		converter: {
			toField: function(value, ifw) {
				return value;
			},
			fromField: function(value, ifw) {
				return value;
			}
		},
		validate: function(ifw) {
			return {
				message: 'invalid'
			};
		}
	};
	*/


}(jQuery));
