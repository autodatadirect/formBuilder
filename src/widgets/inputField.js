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

	var repeat = function(work, delay, count, idx) {
		idx = idx || 0;
		if(idx < count) {
			work();
			setTimeout(function() {
				repeat(work, delay, count, idx + 1);
			}, delay);
		}
	};

	var statusNames = ['require', 'disable', 'error', 'hover', 'warn', 'focus'];

	var loadDomData = function(namespace, aKey) {
		var self = this;
		$.each(aKey, function(i, key) {
			/*
			if(namespace){
				return;
			}*/
			var data = self.element.data(key);
			if(data !== undefined && data !== null) {
				namespace[key] = data;
			}
		});
	};

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
			error: 'error',
			type: 'text',

			/*
			 * the text shown
			 */
			label: '',

			require: '',

			/*
			 * text to show when the field is empty, this uses the suggest layer
			 */
			placeholder: '',

			/*
			 * min and max, there meaning depends on the type that is loaded
			 */
			min: '', // min does nothing in formbuilder
			max: ''

			/*
			 * values: false/undefined, 'keyup', 'blur'
			 */
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
			loadDomData.call(self, o, ['require', 'empty', 'placeholder', 'type', 'label', 'min', 'max', 'preinput', 'postinput', 'suffix', 'prefix']);

			/*
			 * legacy support
			 */
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

			if(o.label){
				self.setLabel(o.label);
			}

			/*
			 * move the DOM elements around
			 */
			e.before(field).appendTo(layers.input);

			/*
			 * move classes
			 */
			field.attr('class', $.trim(field.attr('class') + ' ' + e.attr('class')));
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

			if(o.placeholder){
				self.placeholder(o.placeholder);
			}

			if(o.preinput) {
				self.addOn(-1, o.preinput);
			}

			if(o.postinput) {
				self.addOn(1, o.postinput);
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
			self.updateStatus('require', o.require, false);

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
				layers.suffix = $('<div class="suffix-overlay"><div class="shim"></div><span class="value noselect">' + t + '</span></div>').prependTo(layers.items);
				self.suffixShim = layers.suffix.find('.shim');
				
			} else {
				layers.suffix.find('.value').text(t);
			}
		},

		setPrefix: function (t) {
			var self = this,
				layers = self.layers;

			if(!layers.prefix){
				layers.prefix = $('<div class="prefix-overlay noselect">' + t + '</div>').prependTo(layers.items);
			}else{
				self.layers.prefix.find('.value').text(t);
			}
		},

		setMax: function (max) {
			var self = this,
				e = self.element;

			if(e.is(':formBuilder-inputFilter')){
				e.inputFilter('setMax', max);
			}else{
				e.inputFilter({
					toUpper: false,
					max: max,
					pattern: /./
				});
			}
		},

		_onKeydown: function(ev) {
			var self = this;
			self._showLayer('placeholder', false);
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
				e = self.element,
				val;


			if(!self.dirty){
				val = self.get();

				/*
				 * TMS-350 Save/Cancel become greyed out on Ticket Details page even when changes are present
				 */
				if(!util.equals(self.prevValue, val) && !(typeof self.prevValue === 'undefined' && val === '')){
					e.trigger('dirty');
					self.dirty = true;
				}
			}else {
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

		/*
		 * weight < 0 goest to left
		 *
		 * Overly complex weight logic, maybe this can be refactored!
		 */
		addOn: function(weight, html, className) {
			var self = this,
				layers = self.layers;

			if(typeof(weight) !== 'number') {
				weight = 0;
			}

			var addon = $('<span data-weight="' + weight + '" class="field-item addon">' + html + '</span>');

			if(className) {
				addon.addClass(className);
			}

			var pre = true, found = false;
			layers.items.children().each(function () {
				var el = $(this);

				if(el.hasClass('field-item-input')){
					pre = false;
					return;
				}

				// Get correct element weight
				var eWeight = el.data('weight');
				if(typeof(eWeight) !== 'number') {
					eWeight = 0;
				}

				if(pre && weight < 0 && weight <= eWeight){
					addon.insertBefore(el);
					found = true;

					// refresh first
					layers.items.find('.field-item.first').not(':first').removeClass('first');
					layers.items.find('.field-item').filter(':first').addClass('first');

					return false;
				} else if(!pre && weight >= 0 && weight <= eWeight) {
					addon.insertBefore(el);
					found = true;
					return false;
				}
			});

			if(!found && weight < 0){
				// Must just left of input
				layers.items.find('.field-item-input').before(addon);
				
				// refresh first
				layers.items.find('.field-item.first').not(':first').removeClass('first');
				layers.items.find('.field-item').filter(':first').addClass('first');

			} else if(!found){
				// Must go all the way right
				layers.items.append(addon);
			}

			return addon;
		},

		placeholder: function (s) {
			var self = this,
				layers = self.layers;

			if(!layers.placeholder){
				layers.placeholder = $('<div class="placeholder noselect"></div>').hide().appendTo(layers.input);
			}

			layers.placeholder.text(s);
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
			}else{
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
					message: 'required'
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

			if($.isFunction(self.format)) {
				self.format.call(self);
			}

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

			/*
			 * check if we need to clear the error
			 */
			if(err === undefined) {
				self.clearError();
				return;
			}

			if(!layers.error) {
				layers.error = $('<div class="error-overlay noselect"></div>').appendTo(layers.input);
			}

			//TODO: place error then check for overlaps
			layers.error.text(err.message);

			self.status('error', true);

			/*
			 * listen to keyUp events and rerun validate on this field
			 */
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
				o = self.options,
				hasVal = !!e.val(),
				showError = false,
				showNotice = true,
				showPlaceholder = true,
				layers = self.layers;

				//self.inputWidth = self.element.width(); // Added this line to fix display issue 

			if(hasVal) {
				showPlaceholder = false;
			}

			if(self.suffixShim && !showPlaceholder){
				self.suffixShim.text(e.val());
			}

			if(layers.prefix){
				if(!showPlaceholder) {
					if(!self.prefixPaddingAdded) {
						self.startInputWidth = e.width();
						self.startPaddingLeft = e.css('padding-left').replace('[^0-9]','');
						self.startPaddingLeft = isNaN(self.startPaddingLeft)? 5 : parseInt(self.startPaddingLeft, 10);
						e.css({
							paddingLeft: (self.startPaddingLeft + layers.prefix.outerWidth()) + "px",
							width: (self.startInputWidth - layers.prefix.outerWidth())  + 'px'
						});

						self.prefixPaddingAdded = true;
					}
				} else {
					e.css({
						paddingLeft: self.startPaddingLeft,
						width: self.startInputWidth + 'px'
					});

					self.prefixPaddingAdded = false;
				}
			}

			if(layers.suffix){
				if(!showPlaceholder) {
					if(!self.suffixPaddingAdded) {
						var valWidth = layers.suffix.find('.value').outerWidth();

						self.startInputWidth = e.width();
						self.startPaddingRight = e.css('padding-right').replace('[^0-9]','');
						self.startPaddingRight = isNaN(self.startPaddingRight)? 0 : parseInt(self.startPaddingRight, 10);

						e.css({
							paddingRight: (self.startPaddingRight + valWidth) + 'px',
							width: (self.startInputWidth - valWidth)  + 'px'
						});
						self.suffixShim.css({
							maxWidth: (self.startInputWidth - valWidth)  + 'px'
						});

						self.suffixPaddingAdded = true;
					}
				} else {	
					e.css({
						paddingRight: self.startPaddingRight,
						width: self.startInputWidth + 'px'
					});
					
					self.suffixPaddingAdded = false;
				}
			}

			/*
			if(o.hover){

			}
			*/
			/*
			if(o.focus){
				showSuggest = false;
			}
			*/
			/*
			if(o.warn){

			}
			*/
			if(self.states.error) {
				showNotice = false;
				showError = true;
			}

			if(self.dirty){
				self.field.addClass('dirty');
			}else{
				self.field.removeClass('dirty');
			}

			self._showLayer('error', showError);
			self._showLayer('notice', showNotice);
			self._showLayer('placeholder', showPlaceholder);
			self._showLayer('suffix', !showPlaceholder);
			self._showLayer('prefix', !showPlaceholder);
		},

		_showLayer: function(layer, show) {
			var self = this,
				e = self.element;

			if(!self.layers[layer]) {
				return;
			}

			if(show) {
				if(layer === 'suffix') {
					self.layers[layer].css('visibility', 'visible');
				} else {
					self.layers[layer].show();
				}

				// MISC-919 make sure placeholder stays in input box
				if(layer === 'placeholder' && e.width() > 0) {
					var ph = self.layers[layer];
					while((ph.outerWidth(true)) > e.width() && (parseFloat(ph.css('font-size'),10) >= 8.0)) {
						ph.css('font-size','-=1.0');
					}
				}
			} else {
				if(layer === 'suffix') {
					self.layers[layer].css('visibility', 'hidden');
				} else {
					self.layers[layer].hide();
				}
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
			this.status('disable', false);
		},

		disable: function() {
			this.status('disable', true);
		},

		isDisabled: function() {
			return this.hasStatus('disable');
		},

		/*
		 * public status setters
		 */
		status: function(statusName, bool, fireEvents) {
			var self = this,
				o = self.options;

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
			 * run any updates to the field needed
			 */
			var layers = self.layers;
			if(statusName === 'disable') {

				if(!layers.disable) {
					layers.disable = $('<div class="disable-overlay"></div>').appendTo(layers.items);
				}

				if(cleanBool) {
					layers.disable.css({
						width: (layers.items.outerWidth() - 2) + 'px',
						height: (layers.items.outerHeight() - 2) + 'px'
					}).show();
				} else {
					layers.disable.hide();
				}
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
	 * The context (this) will get set to the context of the type object, use the ui parameter to obtain access to the inputField widget
	 *
	 * setUp: add any events, elements, etc.
	 *
	 * tearDown: reverse whatever setUp did
	 *
	 * converter: used to convert data between "human" and transport formats (e.g. mm/dd/yyyy <-> yyyymmdd)
	 *
	 * format: attempt to format the human readable value (e.g. mm/ dd/yyyy -> mm/dd/yyyy, '  foo ' -> 'foo')
	 *    format is called on before validate
	 *
	 * validate: returns an error object on error or undefined on success
	 * err: {
	 *   message: '',
	 *   code: '',
	 *   description: ''
	 * }
	 *
	 */
	$.formBuilder.inputField.types = {};

	/* Basic Type Structure
	$.formBuilder.inputField.types = {
		setUp: function(ui) {},
		tearDown: function(ui) {},
		converter: {
			toField: function(value, ui) {
				return value;
			},
			fromField: function(value, ui) {
				return value;
			}
		},
		validate: function(ui) {
			return {
				message: 'invalid'
			};
		}
	};
	*/


}(jQuery));

