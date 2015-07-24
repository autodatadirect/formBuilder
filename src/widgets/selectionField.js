/**
 * selectionWidget Widget
 *
 * This widget allows for the use of checkboxes and radio boxes alongside formBuilder
 *
 * Public Methods:
 *   setLabel()
 *   checkDirty()
 *	 isDirty()
 *   clear()
 *   clearDirty()
 *   set()
 *   get()
 *   validate()
 */

(function($) {
	"use strict";

	var util = $.formBuilder.util;

	var statusNames = ['require', 'disable', 'error', 'hover', 'warn'];

	var loadDomData = function(namespace, aKey) {
		var self = this;
		$.each(aKey, function(i, key) {
			var data = self.element.data(key);
			if(data !== undefined && data !== null) {
				namespace[key] = data;
			}
		});
	};

	$.widget("formBuilder.selectionField", {
		options: {
			require: undefined, 
			label: ''
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.dirty = false;			
			
			// Load DOM data settings into options + clean bools
			loadDomData.call(self, o, ['require', 'label']);
			o.require = !!o.require;
			
			// convert input to field format
			var field = self.field = $('<div class="selection-field"></div>');
			var layers = self.layers = {};

			// move DOM elements around
			e.before(field).appendTo(field);

			// Setup label from option/dom
			if(!o.label) {
				o.label = e.data('label');
			}
			if(o.label) {
				self.setLabel(o.label);
			}

			// move input classes to field
			field.attr('class', $.trim(field.attr('class') + ' ' + e.attr('class')));
			e.removeAttr('class');


			// Checkbox or Radio?
			self.isRadio = e.is('[type="radio"]');

			/*
			 * if this field is not part of a group in its form, add a group class to this field for proper styling
			 */
			var parentContainer = field.closest('.selection-field-group, :formBuilder-formBuilder');

			if(!parentContainer.length || parentContainer.is(':formBuilder-formBuilder')) {
				field.wrap('<div class="selection-field-group"/>');
				
				if(self.isRadio) {
					self.radioGroup = e;
				}
				
			} else if(self.isRadio && parentContainer.is('.selection-field-group')) {
				var radioGroup = parentContainer.find('input[type="radio"][name="'+e.attr('name')+'"]:formBuilder-selectionField');
				
				// Update radio links (this widget included)
				radioGroup.each(function() {
					$(this).data('formBuilderSelectionField').radioGroup = radioGroup;
				});

			}

			self.states = {};

			if(self.isRadio) {
				// Keep all radioGroup in sync
				self._updatePreviousValue();
			} else {
				self.prevValue = e.is(':checked');
			}

			e.on('clean', function() {
				console.log('now clean!');
			}).on('dirty', function() {
				console.log('now dirty!');
			});


			e.change(function(ev) {
				// TODO: change this to use errors + autoValidate
				self.validate();
			});

			field.mouseenter(function() {
				self.status('hover', true);
			}).mouseleave(function() {
				self.status('hover', false);
			});

		},

		setLabel: function(newLabel) {
			var self = this,
				e = self.element;

			// Assign unique id
			if(!self.label) {
				e.wrap('<label></label>');
				self.label = $('<span></span>');
				e.after(self.label);
			}

			self.label.html(newLabel);
		},


		// Keep prevValue in sync with all connected selectionWidgets
		_updatePreviousValue: function(value) {
			var self = this;

			if(!self.isRadio) {
				self.prevValue = !!value;
				return;
			}

			var prevValue = value || self.radioGroup.filter(':checked').val();
			self.radioGroup.each(function(){
				$(this).data('formBuilderSelectionField').prevValue = prevValue;
			});

		},

		checkDirty: function() {
			var self = this,
				e = self.element;

			if(!self.dirty){
				var val = self.get();

				if(!util.equals(self.prevValue, val) && !(typeof self.prevValue === 'undefined' && !val)){
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

					if(prev !== 0 && !prev) {
						prev = '';
					}

					if(val !== 0 && !val){
						val = '';
					}

					if(util.equals(prev,val)){
						self.dirty = false;
						e.trigger('clean');
					}
				}, 300);
			}
		},


		isDirty: function() {
			return this.dirty;
		},

		clear: function() {
			var self = this;

			self.set(false);
			self.clearDirty();
		},

		clearDirty: function() {
			var self = this;

			if(self.cleanCheckTimer){
				clearTimeout(self.cleanCheckTimer);
			}

			self.dirty = false;
			self.field.removeClass('dirty');
			self.element.trigger('clean');
		},

		conflicts: function(value) {
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


			if(self.isRadio) {
				// Reset group
				self.radioGroup.removeAttr('checked');

				// Select passed value
				self.radioGroup.filter('[value="'+value+'"]').prop('checked', true);

				self._updatePreviousValue();

			} else {
				e.prop('checked', !!value);
			}

			self.clearDirty();
			self._trigger('afterset', null, [value]);
		},
		

		get: function() {
			var self = this,
				e = self.element;

			if(self.isRadio) {
				return self.radioGroup.filter(':checked').val();
			}

			return e.is(':checked');
		},


		validate: function(){
			var self = this,
				o = self.options,
				e = self.element,
				isValid = true;

			if(o.require) {
				if(self.isRadio) {				
					isValid = self.radioGroup.filter(':checked').length === 1;
				} else {
					isValid = !!e.prop('checked');
				}
			}

			// update error status
			if(self.hasStatus('error') === isValid) {
				self.status('error', !isValid);
			}

			return isValid;
		},

		hide: function() {
			var self = this;
			self.field.hide();
		},

		show: function() {
			var self = this;
			self.field.show();
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

			/*
			 * set the status class to the field
			 */
			if(states[statusName]) {
				self.field.addClass(statusName);
			} else {
				self.field.removeClass(statusName);
			}

			// Enforce high-level css
			if(statusName === 'disable') {
				self.field.css('pointer-events', cleanBool? 'none' : 'auto');
			} 

			// Sync rest of radioGroup if needed
			if(self.isRadio && (statusName === 'disable' || statusName === 'error' || statusName === 'warn' || statusName === 'require')) {
				self.radioGroup.not(self.element).filter(function(){
					return $(this).selectionField('hasStatus', statusName) !== cleanBool;
				}).selectionField('status', statusName, bool, fireEvents);
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


		_destroy: function() {
			var self = this;

			if(self.isRadio) {
				// Remove the element from the radio group
				self.radioGroup = self.radioGroup.not(self.element);
				self.radioGroup.each(function() {
					$(this).data('formBuilderSelectionField').radioGroup = self.radioGroup;
				});
			}
		}
	});
}(jQuery));

