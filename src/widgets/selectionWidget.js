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

	var statusNames = ['require'];

	var loadDomData = function(namespace, aKey) {
		var self = this;
		$.each(aKey, function(i, key) {
			var data = self.element.data(key);
			if(data !== undefined && data !== null) {
				namespace[key] = data;
			}
		});
	};

	$.widget("formBuilder.selectionWidget", {
		options: {
			require: ''
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.dirty = false;

			/*
			 * load DOM settings from field into options
			 */

			loadDomData.call(self, o, ['require']);

			/*
			 * convert the simple input into the full field format
			 */
			var field;
			var layers;

			field = self.field = $('<div class="input-field"><div class="field-items"></div></div>');
			layers = self.layers = {
				items: field.find('.field-items')
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

			/*
			 * if this field is not part of a group in its form, add a group class to this field for proper styling
			 */
			var parentContainer = field.closest('.input-field-group, :formBuilder-formBuilder');

			if(!parentContainer.length || parentContainer.is(':formBuilder-formBuilder')) {
				field.wrap('<div class="input-field-group"/>');
				field.find('.field-item:first').addClass('first');
			}

			self.states = {};

			self.prevValue = e.val();

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
			}
		},

		isDirty: function () {
			return this.dirty;
		},

		clear: function () {
			var self = this,
				o = self.options;

				var checkboxes = $('input[type="checkbox"]');
				var checkboxesChecked = [];

				for (var i=0; i<checkboxes.length; i++) {
					if (checkboxes[i].checked) {
						checkboxes[i].checked = false;
					}
				}

				var radioboxes = $('input[type="radio"]');
				var radioboxesChecked = [];

				for (var x=0; x<radioboxes.length; x++) {
					if (radioboxes[x].checked) {
						radioboxes[x].checked = false;
					}
				}

			self.clearDirty();
		},

		clearDirty: function () {
			var self = this;

			self.dirty = false;
			self.field.removeClass('dirty');
			self.element.trigger('clean');
		},

		set: function(value) {
			var self = this,
				e = self.element;
			var val;

			$(e.prop('checked', !!value)); 	

			return;	
		},
		

		get: function() {
			var self = this,
				o = self.options,
				e = self.element;

			return e.is(':checked');
		},


		validate: function(){
			var self = this,
				o = self.options,
				e = self.element;

			if(e.data('require')) {
				if(e.prop('checked') === false) {
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}
	});


}(jQuery));

