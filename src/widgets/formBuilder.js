/**
 * formBuilder Widget
 *
 * TODO: improve codes type
 *
 * TODO: handle submission, bind to buttons somehow, and on-submit event
 *
 * TODO: maintain a model, take in the model, link to the fields and make is
 * accessible by a getter model linker? listen to changes
 *
 * TODO: can you call _init() a second type with more options? is that how you
 * call _setOption from outside?
 */


/*global util:true */
(function($) {
	"use strict";

	$.widget("formBuilder.formBuilder", {

		options: {
			converter: {
				fromForm: function(data) {
					return data;
				},
				toForm: function(data) {
					return data;
				}
			},
			/*
			 * set to true to ignore fields that are not $(':visible')
			 */
			ignoreHidden: false, 
			error: 'tegan'
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.baseData = {};

			o.defaultRequired = e.data('default-required');

			self.fieldsWidgets = $([]);
			self.fields = $([]);

			self.scanForNewFields();

			self.dirty = false;

			/*
			 * proxy the dirty events from all of the fields in the form
			 */
			e.on('dirty', function (ev) {
				if(self.dirty){
					ev.stopPropagation();
					return;
				}
				self.dirty = true;
			}).on('clean', function (ev) {

				/*
				 * if the form is clean kill the clean event
				 */
				if(!self.dirty){
					ev.stopPropagation();
					return;
				}

				/*
				 * check if form is really clean
				 */
				self.dirty = self.isDirty();

				/*
				 * if form is still dirty, kill the clean event
				 */
				if(self.dirty){
					ev.stopPropagation();
				}
			});

			e.show();
		},

		scanForNewFields: function() {
			var self = this,
				o = self.options,
				e = self.element;

			/*
			 * expected methods for a widget to act a as field:
			 *
			 * set()
			 * get()
			 * isDirty()
			 * clearDirty()
			 * flashDirty()
			 * flashError()
			 * disable()
			 * enable()
			 * clear()
			 * validate()
			 *
			 */
			e.find('[data-load-widget-as-field]').each(function () {
				var el = $(this);
				if(!el.attr('name')){
					throw new Error('data-load-widget-as-field must have name attribute');
				}

				if(self.fieldsWidgets.has(el[0]).length){
					return;
				}

				el[el.attr('data-load-widget-as-field')]();

				/*
				 * check if the widget extends the base FieldWidget widget
				 */

				self.fieldsWidgets = self.fieldsWidgets.add(el);

				/*
				 * wrap if label is found
				 */
				var label = el.attr('data-label');

				if(!label){
					return;
				}
				el.addClass('field-items').wrap('<div class="input-field-group"><div class="input-field"></div></div>').before('<label>' + label + '</label>');
			});
			/*
			self.fields = e.find('input[type!=submit], select, textarea').not(':formBuilder-inputField').inputField({
				require: typeof o.defaultRequired !== 'undefined' && o.defaultRequired === true
			});
			*/
			e.find('input[type!=submit], select, textarea').not(':formBuilder-inputField').not('.form-builder-ignore *').each(function () {
				var newInput = $(this);
				if(newInput.is('[data-load-widget-as-field]') || newInput.parents('[data-load-widget-as-field]').length){
					return;
				}
				newInput.inputField({
					require: !!o.defaultRequired
				});

				self.fields = self.fields.add(newInput);


			});



			/*
			 * set the first class on the first fields for proper styling
			 */
			//setTimeout(function() {
				//var ingroup = e.find('.input-field-group .input-field .field-item:nth(0)').addClass('first');
				//
				e.find('.input-field-group').each(function () {
					$(this).find('.field-item:first').addClass('first');
				});
				//e.find('.input-field .field-item:first-child').not('.input-field-group .input-field:first-child .field-item:first-child').addClass('first');
			//}, 0);
		},

		_proxyCommandToWidget: function (widgetElement) {
			var self = this,
				widgetName = widgetElement.data('load-widget-as-field') || 'inputField',
				instance = widgetElement.data(widgetName),
				method = Array.prototype.splice.call(arguments, 1, 1),
				args = Array.prototype.slice.call(arguments, 1);

			try {
				return instance[method].apply(instance, args);
			}catch(err){
				throw new Error('ERROR: widget field error NAME[' + widgetName + '] METHOD[' + method + ']');
			}
		},
	

		isDirty: function() {
			var self = this,
				dirty = false;


			self.fields.each(function() {
				dirty = !!$(this).inputField('isDirty');
				return !dirty;
			});

			if(dirty){
				return dirty;
			}

			self.fieldsWidgets.each(function() {
				dirty = !!self._proxyCommandToWidget($(this), 'isDirty');
				return !dirty;
			});

			return dirty;
		},

		clearDirty: function() {
			var self = this;
			self.dirty = false;

			self.fields.each(function() {
				$(this).inputField('clearDirty');
			});

			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), 'clearDirty');
			});
		},

		flashDirty: function(numberOfTimes) {
			//this.dirty.inputField('flash', numberOfTimes);
			/*
			var self = this;
			self.dirty.each(function () {
				self._proxyCommandToWidget($(this), 'flash', numberOfTimes);
			});
			*/
		},

		flashError: function(numberOfTimes) {
			this.fields.filter(function() {
				return $(this).data('inputField').options.error;
			}).inputField('flash', numberOfTimes);
		},

		disable: function() {
			this.fields.inputField('status', 'disable', true);
		},

		enable: function() {
			this.fields.inputField('status', 'disable', false);
		},

		get: function() {
			var self = this,
				o = self.options,
				formData = self._readDataFromDom();

			if($.isFunction(o.converter.fromForm)) {
				formData = o.converter.fromForm(formData);
			}

			if(!formData){
				formData = {};
			}

			return formData;
		},

		clear: function() {
			var self = this,
				o = self.options;

			self.baseData = {};

			self.fields.each(function() {
				$(this).inputField('clear');
			});

			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), 'clear');
			});
		},

		/*
		 * check if the given data would overwrite any dirty fields if set
		 *
		 * returns an array of conflict data, and false for no conflicts
		 */
		conflicts: function (data, ignoreKeys) {
			var self = this,
				formData = self._convertFormData(data),
				conflicts = [];

			/*
			 * if dirty flag is not set, assume there is no conflict
			 */
			if(!self.isDirty()){
				return;
			}

			var aData = $.extend(true, {}, self.baseData),
				bData = $.extend(true, {}, formData);

			/*
			 * only check fields that are different than the base value
			 */
			util.removeEqual(aData, bData, ignoreKeys);

			self.fields.each(function() {
				var fieldElement = $(this),
					fieldName = fieldElement.attr('name');

				var conflict = fieldElement.inputField('conflicts', formData[fieldName]);
				if(conflict){
					conflicts.push(conflict);
				}
			});

			self.fieldsWidgets.each(function() {
				var conflict = self._proxyCommandToWidget($(this), 'conflicts', formData);
				if(conflict){
					if($.isArray(conflict)){
						conflicts.concat(conflict);
					}else{
						conflicts.push(conflict);
					}
				}
			});

			if(conflicts.length){
				return conflicts;
			}else{
				// Under what circumstances would it be false?
				return false;
			}
		},

		set: function(data, setOptions) {
			var self = this,
				formData = self._convertFormData(data);

			self._trigger('beforeset', null, formData);
			self._writeDataToDom(formData, setOptions);
			self._trigger('afterset', null, formData);
		},

		_convertFormData: function (data) {
			var self = this,
				o = self.options;

			/*
			 * clone data object so form can not change the original
			 */
			var formData = $.extend(true, {}, data || {});

			if($.isFunction(o.converter.toForm)) {
				formData = o.converter.toForm(formData);
			}

			return formData;
		},

		val: function(values) {
			//TODO: forgot to implement this, there is logic taking its place in efsfl.js
			if(values === undefined) {
				/*
				 * getter
				 */
				return {};
			} else {
				/*
				 * setter
				 */
				return this;
			}
		},

		validate: function() {
			var self = this,
				o = self.options,
				valid = true;

			self.fields.each(function() {
				var el = $(this);
				if(el.is(':visible') && el.inputField('validate') === false){
					valid = false;
				}
			});

			self.fieldsWidgets.each(function() {
				var el = $(this);
				if(el.is(':visible') && self._proxyCommandToWidget(el, 'validate') === false){
					valid = false;
				}
			});

			return valid;
		},

		_destroy: function() {
			var self = this;
			self.fields.inputField('destroy');
			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), 'destroy');
			});
		},

		getFields: function() {
			return this.fields;
		},

		_writeDataToDom: function(data, setOptions) {
			var self = this,
				o = self.options;

			self.fields.each(function() {
				$(this).inputField('set', util.selectPath(data, $(this).attr('name')), setOptions);
			});

			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), 'set', util.selectPath(data, $(this).attr('name')), setOptions);
			});
		},

		_readDataFromDom: function() {
			var self = this,
				ignoreHidden = self.options.ignoreHidden,
				data = {};

			self.fields.each(function() {
				var el = $(this);
				// console.log('inside of each');
				if(ignoreHidden && !el.is(':visible')){
					return;
				}

				var val = el.inputField('get');

				if($.isArray(val)) {
					val = val[0];
				}

				util.insertPath(data, el.attr('name'), val);
			});

			self.fieldsWidgets.each(function() {
				var el = $(this),
					ignoreHidden = self.options.ignoreHidden;

				if(ignoreHidden && !el.is(':visible')){
					return;
				}
				var val = self._proxyCommandToWidget(el, 'get');
				util.insertPath(data, el.attr('name'), val);
			});


			return data;
		}
	});

	

}(jQuery));