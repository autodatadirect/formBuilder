/**
* formBuilder Widget
*
* TODO: handle submission, bind to buttons somehow, and on-submit event
*
* TODO: maintain a model, take in the model, link to the fields and make is
* accessible by a getter model linker? listen to changes
*
* TODO: can you call _init() a second type with more options? is that how you
* call _setOption from outside?
*/
import $ from 'jquery';
import loadDomToggleData from '../util/loadDomToggleData';
import removeEqual from '../util/removeEqual';
import get from 'lodash/get';
import set from 'lodash/set';

export default {

	options: {
		converter: {
			fromForm: function(data) {
				return data;
			},
			toForm: function(data) {
				return data;
			}
		},
		
		// ignore fields that are not $(':visible')
		ignoreHidden: false,

		// default required option for fields
		defaultRequired: false,

		// Hide the form while it is being setup, then show it
		loadHidden: true
	},

	_create: function() {

		const self = this,
			o = self.options,
			e = self.element;

		e.addClass('formBuilder-widget');

		// Get options 
		loadDomToggleData(e, o, ['ignoreHidden','defaultRequired','loadHidden']);

		if(o.loadHidden) {
			e.hide();
		}

		self.baseData = {};

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

		if(o.loadHidden) {
			e.show();
		}
	},

	scanForNewFields: function() {
		const self = this,
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
			const el = $(this);

			if(!el.attr('name')){
				throw new Error('data-load-widget-as-field must have name attribute');
			}

			if(self.fieldsWidgets.has(el[0]).length){
				return;
			}

			const widgetName = el.attr('data-load-widget-as-field');
			if(!widgetName || !$.isFunction(el[widgetName])) {
				throw new Error('Cannot load widget "'+widgetName+'" as field, it does not exist');
			}

			el[widgetName]();

			/*
			 * check if the widget extends the base FieldWidget widget
			 */

			self.fieldsWidgets = self.fieldsWidgets.add(el);

			/*
			 * wrap if label is found
			 */
			const label = el.attr('data-label');

			if(!label) {
				return;
			}
			el.addClass('field-items').wrap('<div class="input-field-group"><div class="input-field"></div></div>').before('<label>' + label + '</label>');
		});

		e.find('input[type="checkbox"]')
			.not('.selectionField-widget')
			.not('.form-builder-ignore *')
			.not('[data-load-widget-as-field]')
			.not('[data-load-widget-as-field] *')
			.each(function() {
				const el = $(this);

				el.selectionField({
					required: o.defaultRequired
				});

				self.fieldsWidgets = self.fieldsWidgets.add(el);
			});

		const radios = e.find('input[type="radio"]')
			.not('.selectionField-widget')
			.not('.form-builder-ignore *')
			.not('[data-load-widget-as-field]')
			.not('[data-load-widget-as-field] *');
		
		radios.each(function() {
			const el = $(this);
			
			if(el.is('.selectionField-widget')) {
				// ignore the ones already grouped
				return;
			}

			const radioGroup = radios.filter('[name="'+this.name+'"]');

			radioGroup.each(function() {
				$(this).selectionField({
					required: o.defaultRequired,
					radioGroup: radioGroup
				});
			});
			
			self.fieldsWidgets = self.fieldsWidgets.add(el);
		});


		e.find('input[type!=submit][type!="checkbox"][type!="radio"], select, textarea')
			.not('.inputField-widget')
			.not('.selectionField-widget')
			.not('.form-builder-ignore *')
			.not('[data-load-widget-as-field]')
			.not('[data-load-widget-as-field] *')
			.each(function () {
				const newInput = $(this);
			
				newInput.inputField({
					required: o.defaultRequired
				});

				self.fields = self.fields.add(newInput);
			});

		/*
		 * set the first class on the first fields for proper styling
		 */
		e.find('.input-field-group').each(function () {
			$(this).find('.field-item:first').addClass('first');
		});
		
	},

	_proxyCommandToWidget: function (widgetElement, ignoreInvalid) {
		const self = this,
			method = Array.prototype.splice.call(arguments, 2, 1),
			args = Array.prototype.slice.call(arguments, 2),
			data = widgetElement.data();

		let widgetName, instance, keys;
			
		if(widgetElement.is('.inputField-widget')) {
			widgetName = 'formBuilderInputField';
		} else if(widgetElement.is('.selectionField-widget')) {
			widgetName = 'formBuilderSelectionField';
		} else {
			widgetName = widgetElement.data('load-widget-as-field');
		}
		
		
		instance = data[widgetName];

		if(!instance){
			instance = self._searchForWidgetInstance(data, widgetName);
		}
		
		if(!instance) {
			keys = Object.keys(data);
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				if(key.match('-' + widgetName)) {
					instance = data[key];
				}
			}				
		}

		if(ignoreInvalid && (!widgetName || !instance || !instance[method])) {
			return;
		}

		try {
			return instance[method].apply(instance, args);
		}catch(err){
			throw new Error('ERROR: widget field error NAME[' + widgetName + '] METHOD[' + method + ']');
		}
	},


	_capitalizeFirstLetter: function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	_searchForWidgetInstance: function (elementData, widgetName) {
		const self = this;
	
		if(!elementData || !widgetName){
			return null;
		}

		let instance = null;
		const widgetNameSearch = self._capitalizeFirstLetter(widgetName);

		$.each(elementData, (key, value) => {
			if(key.endsWith(widgetNameSearch)){
				if(value && value.widgetName === widgetName){
					instance = value;
				}
			}
		});

		return instance;
	},

	isDirty: function() {
		const self = this;
		let dirty = false;


		self.fields.each(function() {
			dirty = !!$(this).inputField('isDirty');
			return !dirty;
		});

		if(dirty){
			return dirty;
		}

		self.fieldsWidgets.each(function() {
			dirty = !!self._proxyCommandToWidget($(this), false, 'isDirty');
			return !dirty;
		});

		return dirty;
	},

	clearDirty: function() {
		const self = this;
		self.dirty = false;

		self.fields.each(function() {
			$(this).inputField('clearDirty');
		});

		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), false, 'clearDirty');
		});
	},

	flashDirty: function() {
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
		const self = this;

		this.fields.inputField('status', 'disable', true);

		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), true, 'status', 'disabled', true);
		});
	},

	enable: function() {
		const self = this;

		self.fields.inputField('status', 'disable', false);

		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), true, 'status', 'disabled', false);
		});
		
	},

	get: function() {
		const self = this,
			o = self.options;

		let formData = self._readDataFromDom();

		if($.isFunction(o.converter.fromForm)) {
			formData = o.converter.fromForm(formData);
		}

		if(!formData){
			formData = {};
		}

		return formData;
	},

	clear: function() {
		const self = this;

		self.baseData = {};

		self.fields.each(function() {
			$(this).inputField('clear');
		});


		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), false, 'clear');
		});
	},

	/*
	 * check if the given data would overwrite any dirty fields if set
	 *
	 * returns an array of conflict data, and false for no conflicts
	 */
	conflicts: function (data, ignoreKeys) {
		const self = this,
			formData = self._convertFormData(data),
			conflicts = [];

		/*
		 * if dirty flag is not set, assume there is no conflict
		 */
		if(!self.isDirty()){
			return;
		}

		const aData = $.extend(true, {}, self.baseData),
			bData = $.extend(true, {}, formData);

		/*
		 * only check fields that are different than the base value
		 */
		removeEqual(aData, bData, ignoreKeys);

		self.fields.each(function() {
			const fieldElement = $(this),
				fieldName = fieldElement.attr('name');

			const conflict = fieldElement.inputField('conflicts', formData[fieldName]);
			if(conflict){
				conflicts.push(conflict);
			}
		});

		self.fieldsWidgets.each(function() {
			const conflict = self._proxyCommandToWidget($(this), false, 'conflicts', formData);
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
			return false;
		}
	},

	set: function(data, setOptions) {
		const self = this,
			formData = self._convertFormData(data);

		self._trigger('beforeset', null, formData);
		self._writeDataToDom(formData, setOptions);
		self._trigger('afterset', null, formData);
	},

	_convertFormData: function (data) {
		const self = this,
			o = self.options;

		/*
		 * clone data object so form can not change the original
		 */
		let formData = $.extend(true, {}, data || {});

		if($.isFunction(o.converter.toForm)) {
			formData = o.converter.toForm(formData);
		}

		return formData;
	},

	validate: function() {
		const self = this,
			o = self.options;
		let valid = true;

		self.fields.each(function() {
			const el = $(this);
			if((!o.ignoreHidden || el.is(':visible')) && el.inputField('validate') === false){
				valid = false;
			}
		});

		self.fieldsWidgets.each(function() {
			const el = $(this);
			if((!o.ignoreHidden || el.is(':visible')) && self._proxyCommandToWidget(el, false, 'validate') === false){
				valid = false;
			}
		});

		return valid;
	},

	_destroy: function() {
		const self = this;
		self.fields.inputField('destroy');
		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), false, 'destroy');
		});
	},

	getFields: function() {
		return this.fields;
	},

	_writeDataToDom: function(data, setOptions) {
		const self = this;

		self.fields.each(function() {
			$(this).inputField('set', get(data, $(this).attr('name')), setOptions);
		});

		self.fieldsWidgets.each(function() {
			self._proxyCommandToWidget($(this), false, 'set', get(data, $(this).attr('name')), setOptions);
		});
	},

	_readDataFromDom: function() {
		const self = this,
			ignoreHidden = self.options.ignoreHidden,
			data = {};

		self.fields.each(function() {
			const el = $(this);
			if(ignoreHidden && !el.is(':visible')){
				return;
			}

			let val = el.inputField('get');

			if($.isArray(val)) {
				val = val[0];
			}

			set(data, el.attr('name'), val);
		});

		self.fieldsWidgets.each(function() {
			const el = $(this),
				ignoreHidden = self.options.ignoreHidden;

			if(ignoreHidden && !el.is(':visible')){
				return;
			}
			const val = self._proxyCommandToWidget(el, false, 'get');
			set(data, el.attr('name'), val);
		});

		return data;
	}
};
