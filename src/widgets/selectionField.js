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

	$.widget("formBuilder.selectionField", {
		options: {
			require: undefined, required: undefined, // both the same
			label: '',

			// Radio specific
			radioGroup: undefined
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.dirty = false;
			
			// Load DOM data settings into options + clean bools
			util.loadDomData(e, o, ['label']);
			util.loadDomToggleData(e, o, ['require', 'required']);

			o.required = o.require || o.required;
			
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
			}

			self.states = {};

			if(self.isRadio) {
				if(o.radioGroup) {
					self.radioGroup = o.radioGroup;
				} else {
					self.radioGroup = e;
				}

				// Keep prevValue in sync
				self._updatePreviousValue();

				// Keep any needed options in sync
				var widgets = self.radioGroup.not(e).filter(':formBuilder-selectionField');
				if(!o.required) {
					widgets.each(function() {
						var ops = $(this).data('formBuilderSelectionField').options;
						if(ops.required) {
							o.required = ops.required;
							return false;
						}
					});
				}
				if(o.required) {
					widgets.each(function(){
						var sfw = $(this).data('formBuilderSelectionField');
						sfw.options.required = o.required;
					});
				}
				

			} else {
				self.prevValue = e.is(':checked');
			}


			// set the require option as a status
			self.status('require', o.required, false);

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

			var prevValue = value || self.radioGroup.filter(':checked').val() || '';
			self.radioGroup.filter(':formBuilder-selectionField').each(function(){
				$(this).data('formBuilderSelectionField').prevValue = prevValue;
			});

		},

		checkDirty: function() {
			var self = this,
				e = self.element;

			if(!self.dirty){
				var val = self.get();

				if(!util.equals(self.prevValue, val) && !(typeof self.prevValue === 'undefined' && !val)){
					// is dirty
					if(self.isRadio) {
						self.radioGroup.each(function() {
							var sfw = $(this).data('formBuilderSelectionField');
							sfw.dirty = true;
							sfw.field.addClass('dirty');
						});
					} else {
						self.dirty = true;
						self.field.addClass('dirty');
					}

					self._trigger('dirty');
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

					if(util.equals(prev,val)){
						self.clearDirty();
					}
				}, 300);
			}
		},


		isDirty: function() {
			return this.dirty;
		},

		clear: function() {
			var self = this;

			self.set();
		},

		clearDirty: function() {
			var self = this;

			if(self.cleanCheckTimer){
				clearTimeout(self.cleanCheckTimer);
			}

			if(self.isRadio) {
				self.radioGroup.each(function() {
					var sfw = $(this).data('formBuilderSelectionField');
					sfw.dirty = false;
					sfw.field.removeClass('dirty');
				});
			} else {
				self.dirty = false;
				self.field.removeClass('dirty');
			}

			
			self._trigger('clean');
		},

		conflicts: function(value) {
			var self = this;
			if(self.dirty && self.get() !== value){
				return {
					key: self.element.attr('name'),
					vOld: self.get(),
					vNew: value
				};
			}
			return null;
		},

		set: function(value) {
			var self = this,
				e = self.element;


			if(self.isRadio) {
				// Reset group
				self.radioGroup.removeAttr('checked');

				// Select passed value
				if(typeof(value) !== 'undefined') {
					self.radioGroup.filter('[value="'+value+'"]').prop('checked', true);
				}
				
				self._updatePreviousValue();

			} else {
				value = !!value;
				self.prevValue = value;
				e.prop('checked', self.prevValue);
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

			if(o.required) {
				if(self.isRadio) {				
					isValid = self.radioGroup.filter(':checked').length === 1;
				} else {
					isValid = !!e.prop('checked');
				}
			}

			// update error status
			self.status('error', !isValid);

			return isValid;
		},

		
		hide: function() {
			this.field.hide();
		},

		show: function() {
			this.field.show();
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
				self.radioGroup.not(self.element).filter(':formBuilder-selectionField').filter(function(){
					return $(this).selectionField('hasStatus', statusName) !== cleanBool;
				}).selectionField('status', statusName, bool, false);
			}

			/*
			 * fire statusUpdated event
			 */
			if(fireEvents !== false) {
				self._trigger("statusUpdate", null, {
					statusName: statusName,
					value: states[statusName]
				});
			}

		},

		hasStatus: function (statusName) {
			return !!this.states[statusName];
		},


		_destroy: function() {
			var self = this;

			if(self.radioGroup) {
				// Destroy all in radioGroup
				self.radioGroup.not(self.element).each(function() {
					var radio = $(this);
					radio.data('formBuilderSelectionField').radioGroup = undefined;
					radio.selectionField('destroy');
				});
			}
		}
	});
}(jQuery));

