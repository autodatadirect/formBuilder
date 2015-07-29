/** 
 * jquery.formBuilder - An advanced HTML5 form creation & validation framework
 * @version v2.0.0
 * @link http://autodatadirect.github.io/formBuilder/
 * @repository https://github.com/autodatadirect/formBuilder
 * @license MIT
 */

/**
 * Localization support
 *
 * Language: English
 * Code: 'en'
 *
 * This is included by default, and is the default language.
 *
 *
 * ======== Localization Notes ========
 * 
 * Unless $.formBuilder.lang.code is already defined, this will
 * attempt to match the browser's code with one in the acceptedCodes[].
 * If matched, it will define it as the formBuilder language code. 
 *
 * Browser codes take the form 'langCode-countryCode'. When creating your own
 * codes you may choose to use to ignore the country code. This script has an
 * example of how to do that at the bottom.
 * 
 * Possible browser lang codes: http://www.loc.gov/standards/iso639-2/php/code_list.php
 * Possible browser country codes: https://www.iso.org/obp/ui/#search
 */

(function($) {
	'use strict';

	// Code used by formBuilder to select the language
	var code = 'en';

	// Accepted language codes from the browser 
	var acceptedCodes = [
		'en',
		'eng'
	];


	/**
	 * Make sure language structure is setup
	 */
	if(typeof($.formBuilder) === 'undefined') {
		$.formBuilder = {};
	}

	var lang = $.formBuilder.lang;

	if(!lang) {
		lang = $.formBuilder.lang = {};
	}
	if(!lang.locales) {
		lang.locales = {};
	}
	if(!lang.locales[code]) {
		lang.locales[code] = {};
	}

	// Check for accepted code
	if(typeof(lang.code) === 'undefined') {
		var browserCode; // like 'en-US'

		// Chrome, Firefox, Opera, Safari, IE 11+ (desktop only)
		browserCode = navigator.language;
		
		// Other IE support
		if(!browserCode) { browserCode = navigator.userLanguage; }
		if(!browserCode) { browserCode = navigator.browserLanguage; }
		if(!browserCode) { browserCode = navigator.systemLanguage; }

		if(browserCode) {
			// Extract language code (optional)
			var dashIndex = browserCode.indexOf('-');
			browserCode = browserCode.slice(0, (dashIndex > 0)? dashIndex : undefined);

			if(acceptedCodes.indexOf(browserCode) !== -1) {
				lang.code = code;
			}

		}
	}
	
	/**
	 * Define formBuilder language
	 */
	$.extend(true, lang.locales[code], {
		/**
		 * Widgets
		 */
		
		// arrayField
		remove: 'Remove',
		

		// dateRangePicker
		from :'From',
		to : 'To',
		custom :'Custom',
		day : 'Day',
		week:'Week',
		month :'Month',
		year :'Year',

		// inputField
		required: 'required',

		// textSubmitter
		defaultSendInstruction: 'press enter to submit',


		/**
		 * Types
		 */
		
		invalid: 'invalid',

		// money
		over: 'over',
		under: 'under',

		// tmsPhone
		mobile: 'Mobile',
		home: 'Home',
		work: 'Work',
		fax: 'Fax',

		// booleanSelectCreator
		yes: 'Yes',
		no: 'No'

		// tmsFullName TODO
		
	});

	var dict = $.formBuilder.lang.dict;

	/**
	 * Extension language support
	 */
	// Datepicker (default english included)
	


	

})(jQuery);
/**
 * Localization support
 *
 * Language: Spanish
 * Code: 'es'
 *
 * This is included by default
 */

(function($) {
	'use strict';

	// Code used by formBuilder to select the language
	var code = 'es';

	// Accepted language codes from the browser 
	var acceptedCodes = [
		'es',
		'spa'
	];

	/**
	 * Make sure language structure is setup
	 */
	if(typeof($.formBuilder) === 'undefined') {
		$.formBuilder = {};
	}

	var lang = $.formBuilder.lang;

	if(!lang) {
		lang = $.formBuilder.lang = {};
	}
	if(!lang.locales) {
		lang.locales = {};
	}
	if(!lang.locales[code]) {
		lang.locales[code] = {};
	}

	// Check for accepted code
	if(typeof(lang.code) === 'undefined') {
		var browserCode; // like 'en-US'

		// Chrome, Firefox, Opera, Safari, IE 11+ (desktop only)
		browserCode = navigator.language;
		
		// Other IE support
		if(!browserCode) { browserCode = navigator.userLanguage; }
		if(!browserCode) { browserCode = navigator.browserLanguage; }
		if(!browserCode) { browserCode = navigator.systemLanguage; }

		if(browserCode) {
			// Extract language code (optional)
			var dashIndex = browserCode.indexOf('-');
			browserCode = browserCode.slice(0, (dashIndex > 0)? dashIndex : undefined);

			if(acceptedCodes.indexOf(browserCode) !== -1) {
				lang.code = code;
			}

		}
	}

	/**
	 * Define formBuilder language
	 */
	$.extend(true, lang.locales[code], {
		// arrayField
		remove: 'Quitar',

		// textSubmitter TODO
		
		// tmsPhone
		mobile: 'Móvil',
		home: 'Casa',
		work: 'Trabajo',
		fax: 'Fax',

		// booleanSelectCreator
		yes: 'Sí',
		no: 'No'
	});


	/**
	 * Extension language support
	 */
	// Datepicker
	$.fn.datepicker.dates[code] = {
		days: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
		daysShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
		daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
		months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		today: "Hoy",
		clear: "Borre",
		rtl: false
	};
	

})(jQuery);
/**
 * jQuery UI Widget support for spin.js
 *
 * http://fgnass.github.com/spin.js/
 */

/*global Spinner:true */
(function($){
	'use strict';

	$.widget('formBuilder.spin', {

		options: {
			lines: 10,
			// The number of lines to draw
			length: 4,
			// The length of each line
			width: 2,
			// The line thickness
			radius: 3,
			// The radius of the inner circle
			rotate: 0,
			// The rotation offset
			color: '#000',
			// #rgb or #rrggbb
			speed: 1.5,
			// Rounds per second
			trail: 60,
			// Afterglow percentage
			shadow: false,
			// Whether to render a shadow
			hwaccel: false,
			// Whether to use hardware acceleration
			className: 'spinner',
			// The CSS class to assign to the spinner
			zIndex: 0,
			// The z-index (defaults to 2000000000)
			top: '0',
			// Top position relative to parent in px
			left: '0' // Left position relative to parent in px
		},

		_spinner: undefined,

		_create: function() {
			var self = this;
			self._spinner = new Spinner(self.options);
		},

		_init: function() {
			this.start();
		},

		start: function() {
			this._spinner.spin(this.element[0]);
		},

		stop: function() {
			this._spinner.stop();
		},

		_destroy: function() {
			var self = this;
			self.stop();
			delete self._spinner;
		}
	});

})(jQuery);

/*
 * A subset of the ADD Utility library. 
 *
 * It only declares objects/functions when they do not already exist
 */

(function($) {
	"use strict";



	/*
	 * If console is not defined build a mock console to avoid script errors in production
	 */
	if(typeof(window.console) === 'undefined') {
		window.console = {
			log: function() {},
			dir: function() {},
			timeStamp: function () {},
			time: function () {},
			timeEnd: function () {}
		};
	}

	if(typeof(console.timeStamp) === 'undefined'){
		console.timeStamp = function () {};
	}
	if(typeof(console.time) === 'undefined'){
		console.time = function () {};
	}
	if(typeof(console.timeEnd) === 'undefined'){
		console.timeEnd = function () {};
	}


	/*
	 * Object create polyfill
	 */
	if(typeof(Object.create) === 'undefined') {
		Object.create = function(o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}


	/*****************************************************
	 * $.formBuilder.util (formerly window.util)
	 */
	
	if(typeof($.formBuilder) === 'undefined') {
		$.formBuilder = {};
	}

	if(typeof($.formBuilder.util) === 'undefined') {
		$.formBuilder.util = {};
	}

	var util = $.formBuilder.util;


	/**
	 * Language Support Setup
	 */
	var lang = $.formBuilder.lang; //should be defined in at least the english package
	
	if(typeof(lang.code) === 'undefined' || !lang.locales[lang.code]) {
		lang.code = 'en';
	}

	// Create dictionary, based off of english and then replacing them with new words (prevents missing words)
	lang.dict = {};
	$.extend(true, lang.dict, lang.locales.en);
	if(lang.code !== 'en') {
		$.extend(lang.dict, lang.locales[lang.code]);
	}
	

	/*
	 * Retrieve from a namespace given the dot-notated key
	 *
	 * Since the form has a flat structure and therefore has prefixes to avoid naming conflicts, we need a way to map
	 * the prefixed DOM Keys to the hierarchical data maps. Keys that are not found will be saved in the extraKeys object
	 * in the correct hierarchical order
	 *
	 * DOM -> Data Examples: given dealFile = efsResponse['efs']['deal-file']
	 *
	 * basic:
	 *   'deal.acquired-date' -> dealFile['deal']['acquired-date']
	 *   'purchase-vehicle.data.vin' -> dealFile['purchase-vehicle']['data']['vin']
	 *
	 * arrays:
	 *   'customer.0.first-name' -> dealFile['customer'][0]['first-name']
	 *
	 */

	if(typeof(util.selectPath) === 'undefined') {
		util.selectPath = function(namespace, domKey) {
			
			if(namespace === undefined){
				return;
			}

			if(domKey === undefined || domKey === ''){
				return namespace;
			}

			var i, a = domKey.toString().split('.');
			for(i = 0; i < a.length; i += 1) {
				var key = a[i];
				if(key.match(/^[0-9]{1,3}$/)) {
					/*
					 * treat this as an array index
					 */
					key = parseInt(key, 10);
				}

				/*
				 * arrays with index might be pulled out of the array, so check if we can find the correct mapping without the array
				 */
				if(key === 0 && !$.isArray(namespace)) {
					continue;
				}

				if(namespace === undefined || namespace === null) {
					return undefined;
				}

				namespace = namespace[key];

				if(i === a.length - 1 || namespace === undefined) {
					return namespace;
				}

			}
		};
	}

	/*
	 * Given and namespace object and a dot-notated key, save the given object to
	 * the proper path in the namespace
	 *
	 */
	if(typeof(util.insertPath) === 'undefined') {
		util.insertPath = function(namespace, domKey, obj) {
			var i, a = domKey.split('.'),
				origRef = namespace;
			var types = [],
				key, type;

			for(i = 0; i < a.length; i += 1) {
				key = a[i];

				if(i === a.length - 1) {

					/*
					 * clean this logic up
					 */
					if(key.match(/^[0-9]{1,3}$/)) {

						types[types.length - 1] = {
							k: types[types.length - 1].k,
							v: []
						};

						types.push({
							k: parseInt(key, 10),
							v: obj
						});

					} else {
						types.push({
							k: key,
							v: obj
						});
					}

				} else if(key.match(/^[0-9]{1,3}$/)) {

					types[types.length - 1] = {
						k: types[types.length - 1].k,
						v: []
					};

					types.push({
						k: parseInt(key, 10),
						v: {}
					});

				} else {
					types.push({
						k: key,
						v: {}
					});
				}
			}

			for(i = 0; i < types.length; i += 1) {
				type = types[i];
				key = type.k;

				if(i === a.length - 1) {
					namespace[key] = type.v;
				} else {

					if(typeof namespace[key] === 'undefined') {
						namespace[key] = type.v;
					}

					namespace = namespace[key];

				}

			}

			return origRef;

		};
	}

	/*
	 * var ns = {test: {foo: 1, bar: 2, baz: 3}};
	 * deletePath(ns, 'test.foo');
	 * console.log(ns);
	 *
	 * TODO: make this work for arrays
	 */
	if(typeof(util.deletePath) === 'undefined') {
		util.deletePath = function(namespace, domKey) {
			var a = domKey.split('.'),
				i;
			for(i = 0; i < a.length; i += 1) {
				if(i === a.length - 1) {
					delete namespace[a[i]];
				} else {
					if(typeof namespace[a[i]] === "undefined") {
						return;
					}
					namespace = namespace[a[i]];
				}
			}
		};
	}


	/*
	 * parameter can be a jQuery object or HTML element object
	 */
	if(typeof($.fn.childOf) === 'undefined') {
		$.fn.childOf = function(b, includeSelf) {
			var i;

			if(b instanceof jQuery) {
				b = b[0];
			}

			if(includeSelf && b === this[0]) {
				return true;
			}

			var p = this.parents();
			for(i = 0; i < p.length; i++) {
				if(b === p[i]) {
					return true;
				}
			}
			return false;
		};
	}

	if(typeof(window.isEmpty) === 'undefined') {
		window.isEmpty = function isEmpty(a) {
			if(a === 0){
				return false;
			}
			return !a;
		};
	}

	if(typeof(util.equals) === 'undefined') {
		util.equals = function(a, b) {
			var p;

			if(a === b){
				return true;
			}

			if(window.isEmpty(a) && window.isEmpty(b)){
				return true;
			}

			if(window.isEmpty(a) || window.isEmpty(b)){
				return false;
			}

			switch(typeof(a)) {
			case 'object':
				for(p in a) {
					if(a.hasOwnProperty(p)) {
						if(!util.equals(a[p], b[p])) {
							return false;
						}
					}
				}

				for(p in b) {
					if(b.hasOwnProperty(p)) {
						if(!util.equals(a[p], b[p])) {
							return false;
						}
					}
				}
				
				break;
			case 'function':
				if(typeof(b) === 'undefined' || (a.toString() !== b.toString())) {
					return false;
				}
				break;
			default:
				if(a.toString() !== b.toString()) {
					return false;
				}
			}

			return true;
		};
	}

	if(typeof(util.removeEqual) === 'undefined') {
		util.removeEqual = function (a, b, ignoreDiffKeys) {
			var p, remove, removeTmp;

			if(!ignoreDiffKeys){
				ignoreDiffKeys = [];
			}

			if(a === undefined || b === undefined) {
				return;
			}

			switch(typeof(a)) {
			case 'object':
				remove = true;
				for(p in a) {
					if(a.hasOwnProperty(p)) {
						
						if($.inArray(p, ignoreDiffKeys) > -1){
							removeTmp = true;
						}else{
							removeTmp = util.removeEqual(a[p], b[p]);
						}

						if(removeTmp){
							delete a[p];
							delete b[p];
						}
						remove = remove && removeTmp;
					}
				}
				return remove;
			default:
				return a.toString() === b.toString();
			}
		};
	}



	util.loadDomData = function(namespace, aKey) {
		var self = this;
		$.each(aKey, function(i, key) {
			var data = self.element.data(key);
			if(data !== undefined && data !== null) {
				namespace[key] = data;
			}
		});
	};

})(jQuery);

/**
 * caret plugin
 */

(function($){
	'use strict';
	
	/*
	 * This plugin only operates on the first element of the working set
	 */
	$.fn.caret = function(begin, end) {

		if(this.length === 0) {
			return this;
		}

		var input = this[0],
			range;

		if(typeof begin === 'number') {
			/*
			 * setter mode
			 */

			if(!$(input).is(':visible')) {
				return input;
			}

			end = (typeof end === 'number') ? end : begin;

			if(input.setSelectionRange) {
				input.focus();
				input.setSelectionRange(begin, end);
				
				/*
				 * chrome hack
				 * TMS-2049
				 * Still need a better way to do this, chrome fails to set the scrolLeft
				 * when the cursor moves, still will only work it they are at the end of the text
				 */
				try{
					if(end === input.value.length){
						input.scrollLeft = 9999999999;
					}
				}catch(err){}
			} else if(input.createTextRange) {
				range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', begin);
				range.select();
			}


		} else {
			/*
			 * getter mode
			 */

			if(!$(input).is(':visible')) {
				var l = $(input).val().length;
				return {
					begin: l,
					end: l
				};
			}

			if(input.setSelectionRange) {
			begin = input.selectionStart;
				end = input.selectionEnd;
			} else if(document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				begin = -range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}

			return {
				begin: begin,
				end: end
			};
		}

		return input;
	};
})(jQuery);
/**
 * Array Field Widget.
 *
 * - We may want to put this in formBuilder-os
 * - May require css from dyn
 *
 * Attribute Settings:
 * data-addmessage="Some message"	- Message next to the '+' button
 * data-sub-widget="widgetName"		- Name of jQuery widget to be used as the items
 */
/*global util:true */
(function($){
	'use strict';
	var util = $.formBuilder.util;
	var dict = $.formBuilder.lang.dict;

	var arrayFieldId = 0;
	var nextArrayFieldId = function () {
		return arrayFieldId++;
	};

	$.widget("formBuilder.arrayField", {
		_arrayFieldTemplate: 
			'<div class="array-field">' + 
				'<div class="items"><div class="items-content"></div></div>' + 
				'<div class="input-field">' + 
					'<div class="field-items">' + 
						'<span class="first field-item addon clickable array-field-add noselect"><a href="#">+</a></span>' + 
						'<span class="field-item array-field-add-message"></span>' + 
					'</div>' + 
				'</div>' + 
			'</div>',

		_arrayFieldItemTemplate:
			'<div class="input-field-group array-field-item">' +
				'<div class="input-field">' +
					'<div class="field-items">' +
						'<span class="first field-item addon clickable sort-handle noselect">::</span>' +
					'</div>' +
				'</div>' +
				'<span class="sub-field"></span>' +
				'<div class="input-field">' +
					'<div class="field-items">' +
						'<span class="field-item addon clickable array-field-delete">' +
							'<span class="fb-icon fb-icon-remove" title="'+ dict.remoasdase+'"></span>' +
						'</span>' +
					'</div>' +
				'</div>' +
			'</div>', 

		_create: function(){
			var self = this,
				e = self.element;

			self.subField = e.html();

			self.id = nextArrayFieldId();

			e.html(self._arrayFieldTemplate);

			if(e.attr('data-addmessage')){
				e.find('.array-field-add-message').text(e.attr('data-addmessage'));
			}

			var items = self.items = e.find('.items');
			self.itemsContent = items.find('.items-content');

			//CDH 2013-12-05 removed this during the rafactor needed for waypoints
			//self.data = [];
			//self.draw();


			e.on('click', '.array-field-add, .array-field-add-message', function (ev) {
				ev.preventDefault();
				/*
				 * killing the event here because this will cause cascaded array fields to delete the parent items as well.
				 */
				ev.stopPropagation();
				self._handleAddButtonClick();
			});

			e.on('click', '.array-field-delete', function (ev) {
				ev.preventDefault();
				/*
				 * killing the event here because this will cause cascaded array fields to delete the parent items as well.
				 */
				ev.stopPropagation();
				$(this).parents('.array-field-item').first().remove();
				self._onDirty();
				self._trigger('afterdelete', ev);
			});

			self.itemsContent.sortable({
				axis: "y",
				handle: '.sort-handle',
				containment: self.itemsContent,
				tolerance: 'pointer',
				stop: function () {
					self._checkDirty();
				}
			});

			/*
			 * proxy dirty and clean events
			 */
			self.dirty = false;
			//items.on('dirty', $.proxy(self._onDirty, self)).on('clean', $.proxy(self._onClean, self));


			/*
			 * proxy clean/dirty events to hanlder functions
			 */
			e.on('dirty clean', function (ev) {
				/*
				 * only listen to events from children of the widget,
				 * that way a loop will not form when the element triggers
				 * the same events
				 */
				if(!$(ev.target).childOf(e)){
					return;
				}

				ev.stopPropagation();

				if(ev.type === 'dirty'){
					self._onDirty();
				}else{
					self._onClean();
				}
			});
		},

		getId: function(){
			return this.id;
		},

		_handleAddButtonClick: function () {
			var self = this;
			if(self._trigger('beforeaddnewitem')){
				//default can be prevented
				self.addItem();
			}
		},

		_checkDirty: function () {
			var self = this,
				curData = self.data,
				newData = self.get();

			if(util.equals(newData, curData)){
				self.dirty = false;
				self.element.trigger('clean');
			}else{
				self.dirty = true;
				self.element.trigger('dirty');
			}
		},

		_onDirty: function () {
			var self = this;

			if(self.dirty){
				return;
			}

			self._checkDirty();
		},

		_onClean: function () {
			var self = this;

			if(!self.dirty){
				return;
			}

			self._checkDirty();
		},

		isDirty: function () {
			return this.dirty;
		},

		getFieldInstances: function () {
			var self = this,
				itemsContent = self.itemsContent,
				fields = [];

			itemsContent.children('.array-field-item').each(function () {
				fields.push($(this).find('.array-field-input-' + self.id));
			});
			return fields;
		},

		get: function () {
			var self = this,
				subWidget = self.element.attr('data-sub-widget') || 'inputField',
				itemsContent = self.itemsContent,
				data = [];

			/*
			$.each(self.fields, function (i, field) {
				var val = field[subWidget]('get');
				if(val === 0 || val){
					data.push(val);
				}
			});
			*/
			
			itemsContent.children('.array-field-item').each(function () {
				var val = $(this).find('.array-field-input-' + self.id)[subWidget]('get');
				if(val === 0 || val){
					data.push(val);
				}
			});
			

			return data;
		},

		validate: function () {
			var self = this,
				itemsContent = self.itemsContent,
				valid = true;

			itemsContent.find('.sub-field').each(function () {
				valid = valid && $(this).find(':formBuilder-inputField').inputField('validate');
			});

			return valid;
		},

		clearDirty: function () {
			var self = this,
				itemsContent = self.itemsContent;

			self.dirty = false;

			itemsContent.find('.sub-field').each(function () {
				$(this).find(':formBuilder-inputField').inputField('clearDirty');
			});
		},

		clear: function () {
			var self = this;
			self.set([]);
		},

		flash: function () {
			var self = this,
				itemsContent = self.itemsContent;

			itemsContent.find('.sub-field').each(function () {
				$(this).find(':formBuilder-inputField').inputField('flash');
			});
		},

		set: function (data) {
			var self = this,
				items = self.items,
				content = self.itemsContent;

			self._empty();

			if(!$.isArray(data)){
				data = [];
			}

			self.data = data;

			$.each(data, function (i, item) {
				content.append(self.drawItem(item));
			});
		},

		/*
		 * allows a different cleanup behavior for special lists)
		 */
		_empty: function () {
			var self = this,
				content = self.itemsContent;
			content.children().remove(); // calls the destroy on widgets + removed them
			// content.empty(); //redundant
		},

		addItem: function (index, item) {
			var self = this,
				itemEl = self.drawItem(item),
				content = self.itemsContent;

			if((index || index === 0) && index >= 0){
				content.children().eq(index).before(itemEl);
			}else{
				/*
				 * if no insert index is defined, just append
				 */
				content.append(itemEl);
			}

			self._trigger('afteradd', null, itemEl);

			return itemEl || null;
		},

		drawItem: function (item) {
			var self = this,
				subWidget = self.element.attr('data-sub-widget'),
				itemView = $(self._arrayFieldItemTemplate);

			if(subWidget) {
				self._drawWidgetItem(item, itemView, subWidget);
			}else{
				self._drawInternalMarkupItem(item, itemView);
			}
			return itemView;
		},

		_drawInternalMarkupItem: function (item, itemView) {
			var self = this,
				field = $(self.subFieldMarkup());

			self._trigger('beforeadd', null, field);
			itemView.find('.sub-field').html(field);
			field.parent().find('input[type!=submit], select, textarea, [data-load-widget-as-field]')
				.inputField()
				.inputField('set', item)
				.addClass('array-field-input-' + self.id);
		},

		_drawWidgetItem: function (item, itemView, subWidget) {
			var self = this,
				field = $('<div/>')[subWidget]();

			self._trigger('beforeadd', null, field);
			itemView.find('.sub-field').append(field);
			field[subWidget]('set', item).addClass('array-field-input-' + self.id).css('display', 'inline');
		},

		subFieldMarkup: function () {
			return this.subField;
		},


		_destroy: function(){
			var self = this;

			// Remove everything and put the inital back
			self._empty(); //destroys the widgets gracefully
			self.element.empty();
			self.element.html(self.subField);
		}
	});
})(jQuery);

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



/*global  moment:true */
(function($) {
	"use strict";
	var dict = $.formBuilder.lang.dict;

	$.widget("formBuilder.dateRangePicker", {
		_dateRangePickerTemplate:
			'<div class="date-range-picker form">'+
				'<input type="text" name="from" data-type="date" data-label="'+dict.from+'"/>' +
				'<input type="text" name="to" data-type="date" data-label="'+dict.to+'"/>' +
				
				'<button type="button" class="previous-range">&lt;&lt;</button>' +
				
				'<div class="input-field-group range-select">' +
					'<select name="range" style="width: 138px;">' +
						'<option value="custom">'+dict.custom+'</option>' +
						'<option value="day">'+dict.day+'</option>' +
						'<option value="week">'+dict.week+'</option>' +
						'<option value="month">'+dict.month+'</option>' +
						'<option value="year">'+dict.year+'</option>' +
					'</select>' +
				'</div>'+

				'<button type="button" class="next-range">&gt;&gt;</button>' +
			'</div>',

		_create: function () {
			var self = this,
				e = self.element;

			var form = self.form = $('<div></div>').html(self._dateRangePickerTemplate).find('.date-range-picker').formBuilder();

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
		},

		_moveRange: function (number, unit) {
			var self = this,
				fromDate = self.fromDate.inputField('get');

			if (!fromDate || unit === 'custom') {
				return;
			}

			fromDate = self.deserialize(fromDate);


			var begin = fromDate.add(number, unit);
			var end = moment(begin).add(1,unit).subtract(1,'day');

			self._setFromAndTo(begin, end);
		},

		setRange: function (range) {
			var self = this;
			if (range === 'custom') {
				return;
			}

			var fromDate = self.fromDate.inputField('get');

			if (!fromDate) {
				fromDate = moment();
			}

			if (typeof fromDate === 'string') {
				fromDate = self.deserialize(fromDate);	
			}

			var from = fromDate.startOf(range);
			var to = moment(from).endOf(range);

			self._setFromAndTo(from, to);
		},
		
		_setFromAndTo: function (from, to) {
			var self = this;

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
			var self = this;

			return self.form.formBuilder('get');
		},

		set: function (data) {
			var self = this;

			self.form.formBuilder('set', data);
		},

		isDirty: function () {
			return this.form.formBuilder('isDirty');
		},

		clearDirty: function () {
			var self = this;

			self.form.formBuilder('clearDirty');
		},

		clear: function () {
			var self = this;

			self.set({
				from: '',
				to: '',
				range: 'custom'
			});
		},

		validate: function () {
			var self = this,
				e = self.element,
				form = self.form;

			if (!form.formBuilder('validate')) {
				return false;
			}			
		}
	});

}(jQuery));

/**
 * dateTimeRangePicker Widget
 *
 * This widget allows for the use of checkboxes and radio boxes alongside formBuilder
 *
 * Public Methods:
 *   setRange()
 *   serializeDate()
 *	 deserializeDate()
 *   get()
 *   set()
 *   isDirty()
 *   clearDirty()
 *   clear()
 *   validate()
 */


/*global  moment:true */
(function($) {
	"use strict";
	var dict = $.formBuilder.lang.dict;
	
	$.widget("formBuilder.dateTimeRangePicker", {
		_dateTimeRangePickerTemplate:
				'<div class="date-range-picker form">' +
					'<input type="text" name="from" data-type="dateTime" data-label="'+dict.from+'"/>' +
					'<input type="text" name="to" data-type="dateTime" data-label="'+dict.to+'"/>' +

					'<button type="button" class="previous-range">&lt;&lt;</button>' +

					'<div class="input-field-group range-select">' +
						'<select name="range" style="width: 138px;">' +
							'<option value="custom">'+dict.custom+'</option>' +
							'<option value="day">'+dict.day+'</option>' +
							'<option value="week">'+dict.week+'</option>' +
							'<option value="month">'+dict.month+'</option>' +
							'<option value="year">'+dict.year+'</option>' +
						'</select>' +
					'</div>' +

					'<button type="button" class="next-range">&gt;&gt;</button>' +
				'</div>',
				
		_create: function () {
			var self = this,
				e = self.element;

			var form = self.form = $('<div></div>').html(self._dateTimeRangePickerTemplate).find('.date-range-picker').formBuilder();

			e.append(form);

			self.fromDate = form.find('input[name="from"]').on('keyup ondateselect', function () {
				$(self.range).val('custom');
			});
			// self.fromDate.inputField('setLabel', e.attr('data-from-label'));

			self.toDate = form.find('input[name="to"]').on('keyup ondateselect', function () {
				$(self.range).val('custom');
			});
			// self.toDate.inputField('setLabel', e.attr('data-to-label'));

			form.find('button.previous-range').button().on('click', function () {
				self._moveRange(-1, $(self.range).val());
			});

			form.find('button.next-range').button().on('click', function () {
				self._moveRange(1, $(self.range).val());
			});

			self.range = form.find('select[name="range"]').on('change', function () {
				self.setRange($(this).val());
			});
		},

		_moveRange: function (number, unit) {
			var self = this,
				fromTypeInstance = self.fromDate.inputField('getType'),
				toTypeInstance = self.toDate.inputField('getType'),
				fromDate;

			if (fromTypeInstance.dateWidgetInstance.isEmpty() || unit === 'custom') {
				return;
			}

			fromDate = self.deserializeDate(fromTypeInstance.dateWidgetInstance.get());

			var begin = fromDate.add(number, unit);
			var end = moment(begin).add(1,unit).subtract(1,'day');

			fromTypeInstance.dateWidgetInstance.set(self.serializeDate(begin));
			toTypeInstance.dateWidgetInstance.set(self.serializeDate(end));

			// Force times to be correct in regards to DST
			if(fromTypeInstance.timeWidgetInstance.isEmpty()) {
				fromTypeInstance.timeWidgetInstance.set(moment().hours(0).minutes(0).utc().format('HH:mm'));
			}
			
			if(toTypeInstance.timeWidgetInstance.isEmpty()) {
				toTypeInstance.timeWidgetInstance.set(moment().hours(23).minutes(59).utc().format('HH:mm'));
			}
		},

		setRange: function (range) {
			var self = this,
				fromTypeInstance = self.fromDate.inputField('getType'),
				toTypeInstance = self.toDate.inputField('getType'),
				fromDate;

			if (range === 'custom') {
				return;
			}

			fromDate = fromTypeInstance.dateWidgetInstance.get();

			if (!fromDate) {
				fromDate = moment();
			}

			if (typeof fromDate === 'string') {
				fromDate = self.deserializeDate(fromDate);
			}
						

			var from = fromDate.startOf(range);
			var to = moment(from).endOf(range);

			fromTypeInstance.dateWidgetInstance.set(self.serializeDate(from));
			toTypeInstance.dateWidgetInstance.set(self.serializeDate(to));

			// Force times to be correct in regards to DST
			if(fromTypeInstance.timeWidgetInstance.isEmpty()) {
				fromTypeInstance.timeWidgetInstance.set(moment().hours(0).minutes(0).utc().format('HH:mm'));
			}
			
			if(toTypeInstance.timeWidgetInstance.isEmpty()) {
				toTypeInstance.timeWidgetInstance.set(moment().hours(23).minutes(59).utc().format('HH:mm'));
			}

			self.range.val(range);
		},

		serializeDate: function (momentDate) {
			if (!momentDate) {
				return;
			}

			return momentDate.format('YYYY-MM-DD');
		},

		deserializeDate: function (stringDate) {
			if (!stringDate) {
				return;
			}

			return moment(stringDate, 'YYYY-MM-DD');
		},

		get: function () {
			var self = this;

			return self.form.formBuilder('get');
		},

		set: function (data) {
			var self = this;

			self.form.formBuilder('set', data);
		},

		isDirty: function () {
			return this.form.formBuilder('isDirty');
		},

		clearDirty: function () {
			var self = this;

			self.form.formBuilder('clearDirty');
		},

		clear: function () {
			var self = this;

			self.set({
				from: '',
				to: '',
				range: 'custom'
			});
		},

		validate: function () {
			var self = this,
				e = self.element,
				form = self.form;

			if (!form.formBuilder('validate')) {
				return false;
			}
		}
	});

}(jQuery));
/**
 * formBuilder.dropDownPanel widget
 *
 * Public Methods:
 * 	getClassNames()
 *	getId()
 *	isOpened()
 *	detach()
 *	attach()
 *	open()
 *
 *
 * Events:
 *	beforeopen
 *	afteropen
 *	beforeclose
 *	afterclose
 */

(function($){
	'use strict';

	var doc = $(document);


	var dropDownPanelCount = 0;

	$.widget("formBuilder.dropDownPanel", {

		options: {
			offset: {
				top: 0,
				left: 0
			},


			// What it listens for events on and is positioned under (required)
			target: undefined,

			// Listen for focus/blur to trigger open/close on this element (default = target)
			focusTarget: undefined,

			// Automatically change target to the given target's first .field-item-input child, if it has one
			targetInput: true,

			// Array of name attributes to hide 
			hideFields: undefined	
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element,
				wrapper = $('<div class="fb-dropDownPanel-wrapper" style="position: relative;"></div>'),
				panel = $('<div class="fb-dropDownPanel"></div>').hide().appendTo(wrapper);

			self.wrapper = wrapper;
			self.panel = panel;
			self.isOpen = false;
			self.id = dropDownPanelCount++;

			o.targetInput = !!o.targetInput;

			e.addClass('fb-dropDownPanel-content').appendTo(panel);

			if(o.hideFields && Array.isArray(o.hideFields)) {
				$.each(o.hideFields, function(i, fieldName) {
					panel.find('[name="' + fieldName + '"]').remove();
				});
			}


			self.closeListener = function(ev) {

				// Listen for Escape key
				if(ev.which === 27) {
					ev.preventDefault();
					ev.stopPropagation();
					self.focusTarget.focus();
					setTimeout(function() {
						self.close();
					}, 0);
					return;
				}

				// Listen for a click outside
				if(!$(ev.target).childOf(panel, true) && !$(ev.target).childOf(self.focusTarget, true)) {
					setTimeout(function() {
						self.close();
					}, 0);
				}

			};

			self.openListener = function(ev) {
				setTimeout(function() {
					self.open();
				}, 0);
			};

			
			self.attach(o.target, o.focusTarget);
		},

		getClassNames: function() {
			var self = this;

			return {
				target: 'fb-dropDownPanel-'+self.id+'-target',
				focus: 'fb-dropDownPanel-'+self.id+'-focusTarget'
			};
		},

		getId: function() {
			return this.id;
		},

		isOpened: function() {
			return this.isOpen;
		},

		detach: function() {
			var self = this,
				instanceClasses = self.getClassNames();

			self.close();

			if(self.target) {
				self.target.removeClass(instanceClasses.target);
			}
			if(self.focusTarget) {
				self.focusTarget.removeClass(instanceClasses.focus);
				self.focusTarget.off('click focus', self.openListener);
			}

			self.focusTarget = undefined;
			self.target = undefined;
			self.wrapper.detach();
		},

		attach: function(newTarget, newFocusTarget) {
			var self = this,
				o = self.options,
				instanceClasses = self.getClassNames();

			if(!newTarget || !(newTarget instanceof $) || newTarget.length === 0) {
				throw '[dropDownPanel] No target element specifed.';
			}

			if(self.target) {
				self.detach();
			}


			// Determine correct targets

			if(newTarget.is(':formBuilder-inputField')) {
				if(!newFocusTarget) {
					newFocusTarget = newTarget;
				}
				newTarget = newTarget.closest('.input-field');

			} else if(newTarget.is('.input-field') && !newFocusTarget) {
				newFocusTarget = newTarget.find(':focusable:tabbable'); //NOTE: This may be mutiple elements, but that's okay
				
			} else {
				self.wrapper.insertAfter(newTarget);
			}


			if(newTarget.is('.input-field')) {
				self.wrapper.appendTo(newTarget.closest('.input-field-group'));

				if(o.targetInput) {
					var inputItem = newTarget.find('.field-item-input');
					if(inputItem.length > 0) {
						newTarget = $(inputItem[0]);
					}
				}
			}
			


			if(!newFocusTarget) {
				newFocusTarget = newTarget;
			}


			// Update targets
			if(self.target) {
				self.target.removeClass(instanceClasses.target);
			}
			if(self.focusTarget) {
				self.focusTarget.removeClass(instanceClasses.focus);
				self.focusTarget.off('click focus', self.openListener);
			}
			
			self.target = newTarget;
			self.focusTarget = newFocusTarget;

			self.target.addClass(instanceClasses.target);
			self.focusTarget.addClass(instanceClasses.focus);

			self.focusTarget.on('click focus', self.openListener);
		},

		open: function() {
			var self = this,
				o = self.options,
				panel = self.panel,
				e = self.element;
			
			if(self.isOpen || !self.target){
				return;
			}

			self.isOpen = true;

			var wrapperOffset = self.wrapper.offset();
			var targetOffset = self.target.offset();


			var css = {
				left: (targetOffset.left - wrapperOffset.left) + o.offset.left + 'px',
				top: (targetOffset.top + self.target.outerHeight() - wrapperOffset.top) + o.offset.top + 'px',
				width: self.target.outerWidth() - (self.panel.outerWidth() - self.panel.width()) + 'px'
			};

			panel.css(css);
			panel.children().css({
				maxWidth: css.width,
				overflow: 'hidden'
			});


			if(!self._trigger('beforeopen', null, [panel, css])){
				return;
			}

			panel.show();

			doc.on('click keyup', self.closeListener);

			self._trigger('afteropen');

		},

		close: function() {
			var self = this,
				panel = self.panel;

			if(!self.isOpen){
				return;
			}

			if(!self._trigger('beforeclose')){
				return;
			}

			self.isOpen = false;

			panel.hide();

			doc.off('click keyup', self.closeListener);

			self._trigger('afterclose');
		},

		_destroy: function() {
			var self = this;
			doc.off('click keyup', self.closeListener);
			self.wrapper.remove();
		}
	});


	
})(jQuery);

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


(function($) {
	"use strict";
	var util = $.formBuilder.util;

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
			
			// ignore fields that are not $(':visible')
			ignoreHidden: false,

			// default required option for fields
			defaultRequired: false,

			// Hide the form while it is being setup, then show it
			loadHidden: true

		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			// Get options + clean them
			util.loadDomData.call(self, o, ['ignoreHidden', 'defaultRequired', 'loadHidden']);
			o.ignoreHidden = !!o.ignoreHidden;
			o.defaultRequired = !!o.defaultRequired;
			o.loadHidden = !!o.loadHidden;


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

				if(!label) {
					return;
				}
				el.addClass('field-items').wrap('<div class="input-field-group"><div class="input-field"></div></div>').before('<label>' + label + '</label>');
			});

			e.find('input[type="checkbox"]')
				.not(':formBuilder-selectionField')
				.not('.form-builder-ignore *')
				.not('[data-load-widget-as-field]')
				.not('[data-load-widget-as-field] *')
				.each(function() {
					var el = $(this);

					el.selectionField({
						required: o.defaultRequired
					});

					self.fieldsWidgets = self.fieldsWidgets.add(el);
				});

			var radios = e.find('input[type="radio"]')
				.not(':formBuilder-selectionField')
				.not('.form-builder-ignore *')
				.not('[data-load-widget-as-field]')
				.not('[data-load-widget-as-field] *');
			
			radios.each(function() {
				var el = $(this);
				
				if(el.is(':formBuilder-selectionField')) {
					// ignore the ones already grouped
					return;
				}

				var radioGroup = radios.filter('[name="'+this.name+'"]');

				radioGroup.each(function() {
					$(this).selectionField({
						required: o.defaultRequired,
						radioGroup: radioGroup
					});
				});
				
				self.fieldsWidgets = self.fieldsWidgets.add(el);
			});


			e.find('input[type!=submit][type!="checkbox"][type!="radio"], select, textarea')
				.not(':formBuilder-inputField')
				.not(':formBuilder-selectionField')
				.not('.form-builder-ignore *')
				.not('[data-load-widget-as-field]')
				.not('[data-load-widget-as-field] *')
				.each(function () {
					var newInput = $(this);
				
					newInput.inputField({
						required: o.defaultRequired
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

		_proxyCommandToWidget: function (widgetElement, ignoreInvalid) {
			var self = this,
				method = Array.prototype.splice.call(arguments, 2, 1),
				args = Array.prototype.slice.call(arguments, 2),
				widgetName, instance;
				
			if(widgetElement.is(':formBuilder-inputField')) {
				widgetName = 'formBuilderInputField';
			} else if(widgetElement.is(':formBuilder-selectionField')) {
				widgetName = 'formBuilderSelectionField';
			} else {
				widgetName = widgetElement.data('load-widget-as-field');
			}

			instance = widgetElement.data(widgetName);

			if(ignoreInvalid && (!widgetName || !instance || !instance[method])) {
				return;
			}

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
				dirty = !!self._proxyCommandToWidget($(this), false, 'isDirty');
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
				self._proxyCommandToWidget($(this), false, 'clearDirty');
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
			var self = this;

			this.fields.filter(function() {
				return $(this).data('inputField').options.error;
			}).inputField('flash', numberOfTimes);
		},

		disable: function() {
			var self = this;

			this.fields.inputField('status', 'disable', true);

			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), true, 'status', 'disabled', true);
			});
		},

		enable: function() {
			var self = this;

			self.fields.inputField('status', 'disable', false);

			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), true, 'status', 'disabled', false);
			});
			
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
				self._proxyCommandToWidget($(this), false, 'clear');
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
				var conflict = self._proxyCommandToWidget($(this), false, 'conflicts', formData);
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

		validate: function() {
			var self = this,
				o = self.options,
				valid = true;

			self.fields.each(function() {
				var el = $(this);
				if((!self.ignoreHidden || el.is(':visible')) && el.inputField('validate') === false){
					valid = false;
				}
			});

			self.fieldsWidgets.each(function() {
				var el = $(this);
				if((!self.ignoreHidden || el.is(':visible')) && self._proxyCommandToWidget(el, false, 'validate') === false){
					valid = false;
				}
			});

			return valid;
		},

		_destroy: function() {
			var self = this;
			self.fields.inputField('destroy');
			self.fieldsWidgets.each(function() {
				self._proxyCommandToWidget($(this), false, 'destroy');
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
				self._proxyCommandToWidget($(this), false, 'set', util.selectPath(data, $(this).attr('name')), setOptions);
			});
		},

		_readDataFromDom: function() {
			var self = this,
				ignoreHidden = self.options.ignoreHidden,
				data = {};

			self.fields.each(function() {
				var el = $(this);
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
				var val = self._proxyCommandToWidget(el, false, 'get');
				util.insertPath(data, el.attr('name'), val);
			});


			return data;
		}
	});

	

}(jQuery));
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

	var statusNames = ['require', 'disable', 'error', 'hover', 'warn', 'focus'];

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


			error: 'error' 
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
			
			util.loadDomData.call(self, o, ['require', 'required', 'empty', 'placeholder', 'type', 'label', 'min', 'max', 'preinput', 'postinput', 'suffix', 'prefix']);

			/*
			 * legacy support
			 */
			o.require = !!(o.require || o.required);
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
	 * The context (this) will get set to the context of the type object, use the ifw parameter to obtain access to the inputField widget
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


/**
 * inputFilter widget
 *
 * Events:
 * keyignored
 * keytyped
 */


(function($) {
	'use strict';

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
			var self = this,
				e = self.element,
				memory;

			/*
			 * track if a native change event will be fired by the browser
			 */
			self.nativeChange = false;

			if(!e.is('input[type=text], textarea')) {
				throw new Error('inputFilter must be applied to a text input ');
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

		_onPaste: function(ev) {
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
			var self = this;
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
			var v = this.element.val();
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
			var self = this,
				o = self.options,
				e = self.element,
				val = e.val(),
				keytypedEvent = 'keytyped',
				keyignoredEvent = 'keyignored',
				p, tmp;

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
			var self = this,
				e = self.element;
			e.off('.inputFilter');
		}

	});
})(jQuery);
/**
 * formBuilder.popOver widget
 */

(function($){
	'use strict';

	var doc = $(document),
		win = $(window),
		body = $('body');

	$.widget("formBuilder.popOver", {

		options: {
			target: '',
			top: 0,
			left: 0,
			appendTo: 'body'
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.showing = false;

			e.detach();
			var content = e.clone().addClass('form-input-tooltip');
			self.title = $('<h3 class="tooltip-title"></h3>');

			e.addClass('tooltip-wrapper').css('position', 'absolute');

			e.empty();

			e.append(self.title).append(content);

			e.appendTo(o.appendTo);

			self.onClick = function(ev) {
				var target = $(ev.target);

				if(!self.showing){
					return;
				}

				if(!target.childOf(e, true) && !$(ev.delegateTarget.activeElement).childOf(e, true) && !target.childOf(o.target, true)) {
					if(self._trigger('beforeoffclick', ev, target)) {
						self.hide();
					}
				}
			};

			self.onResize = function(ev) {
				if(!self.showing){
					return;
				}
				self.position();
			};

			/*
			 * listen for off clicks
			 */
			doc.on('mousedown', self.onClick);

			/*
			 * listen for window resizes
			 */
			win.on('resize', self.onResize);
		},

		setAppendTo: function (el) {
			var self = this,
				o = self.options,
				e = self.element;

			o.appendTo = el;
			e.appendTo(el);
		},

		_init: function () {
			var self = this,
				e = self.element,
				titleElement = self.title;

			var title = e.attr('title');

			if(title) {
				titleElement.text(title).show();
			}else{
				titleElement.hide();
			}
		},

		toggle: function() {
			var self = this,
				e = self.element;

			if(self.showing) {
				self.hide();
			} else {
				self.show();
			}
		},

		show: function() {
			var self = this;

			if(self.showing){
				return;
			}

			/*
			 * show must be deferred with a timeout to avoid being affected by an offclick
			 */
			setTimeout(function() {
				self.showing = true;
				self.position();
				/*
				 * fadeIn is used instead of show() so that the popover
				 * posistioning is not visible
				 */
				self.element.fadeIn(10);
				self._trigger('onShow');
			}, 0);
		},

		hide: function() {
			var self = this;

			if(!self.showing){
				return;
			}

			self.showing = false;

			self.element.hide();
			self._trigger('onHide');
		},

		position: function() {
			var self = this,
				o = self.options,
				e = self.element,
				my = 'left+' + (o.left - 3) + ' top+' + (o.top + 3),
				at = 'left bottom',
				collision = 'flipfit none';

			if (o.my) {
				my = o.my;
			}

			if (o.at) {
				at = o.at;
			}

			if (o.collision) {
				collision = o.collision;
			}

			setTimeout(function() {
				e.position({
					my: my,
					at: at,
					of: o.target,
					collision: collision
				});
			}, 0);
		},

		_destroy: function() {
			var self = this,
				e = self.element;
			doc.off('mousedown', self.onClick);
			win.off('resize', self.onResize);
		}
	});

})(jQuery);
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
			util.loadDomData.call(self, o, ['require', 'required', 'label']);
			o.required = o.require = !!(o.require || o.required);
			
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

			var prevValue = value || self.radioGroup.filter(':checked').val();
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


/**
 * submitButton Widget
 */
(function($) {
	'use strict';

	/*
	 * when you catch the submitbuttonsubmit event, you need to call execute
	 * 'event.data.onComplete' when the processing is done
	 */
	$.widget('formBuilder.submitButton', {
		options: {
			color: '#000',
			delay: 10,
			disabled: false,
			waiting: false,
			preventDefault: true,
			enterKeyListenerProvider: function() {
				return this.parents('form').first();
			},
			onKeyDown: function (ev) {
				if(ev.keyCode === 13 && !$(ev.target).is('textarea')) {
					this.submit.call(this, ev);
				}
			}
		},

		_showLoading: function() {
			var self = this,
				e = self.element,
				o = self.options,
				w = e.width(),
				h = e.height();

			e.addClass('submitting');

			self.getButtonLabel().css('visibility', 'hidden');

			self.spinner.appendTo(e).spin({
				color: o.color,
				top: -h + 4,
				left: -7
			});
		},

		getButtonLabel: function () {
			return this.element.find('.ui-button-text');
		},

		_hideLoading: function() {
			var self = this,
				e = self.element;

			if(self.destroyed){
				return;
			}

			e.removeClass('submitting');
			self.spinner.spin('stop');
			self.getButtonLabel().css('visibility', 'visible');
		},

		_create: function() {
			var self = this;
			var o = self.options;
			var e = self.element,
				bOptions = {};

			if(o.icons) {
				bOptions.icons = o.icons;	// does nothing
			}

			if(o.disabled) {
				bOptions.disabled = o.disabled;
			}

			if(o.text !== undefined){
				bOptions.text = o.text;
			}

			o.label = e.html();

			e.button(bOptions).on('click.submitButton', $.proxy(self.submit, self));

			self.spinner = $('<div class="spinner" style="display: inline-block; position: absolute;"></div>');
			e.append(this.spinner);

			var listenerProvider = o.enterKeyListenerProvider;
			if($.isFunction(listenerProvider)) {
				var listener = listenerProvider.call(e);
				if(typeof listener !== 'undefined') {
					listener.on('keydown.submitButton', $.proxy(o.onKeyDown, self));
				}
			}
		},

		submit: function(ev) {
			var self = this;
			var o = self.options;

			if(o.preventDefault && ev) {
				ev.preventDefault();
			}

			if(o.waiting === true || o.disabled === true) {
				return this;
			}

			if(!ev) {
				ev = null;
			}

			if(self._trigger('beforesubmit', ev) === false) {
				return this;
			}


			o.waiting = true;
			self._showLoading.call(self);

			/*
			 * submit clicks are delayed so that the UI can update before
			 * doing all of the submit work
			 *
			 * passes the onComplete callback as the data for this event
			 */
			setTimeout(function() {
				self._trigger('submit', ev, function() {
					o.waiting = false;
					self._hideLoading.call(self);
					self._trigger('aftersubmit', ev);
				});
			}, o.delay);

			return this;
		},

		enable: function() {
			this.options.disabled = false;
		},

		disable: function() {
			this.options.disabled = true;
		},

		_destroy: function() {
			var self = this,
				e = self.element;
			e.off('.submitButton');
			self.destroyed = true;
		}
	});
})(jQuery);
/**
 * formBuilder.textSubmitter widget
 *
 * You can type text then hit enter to trigger a submit event with the data and a callback.
 * Once submitted, the textbox is cleared and ready for new input.
 *
 * A send instruction message appears when focused
 */

(function($){
	'use strict';
	
	var dict = $.formBuilder.lang.dict;

	// Converted the lang.sendInstruction to an option with 'press enter to submit' as a default
	// Note: this differs from the tms 'press enter to add note'

	$.widget("formBuilder.textSubmitter", {
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
			var self = this,
				e = self.element,
				o = self.options,
				tmp;

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
			var self = this,
				o = self.options;

			if(self.textEntry.inputField('isDisabled') || 
				(o.ignoreEmptySubmit && self.textEntry.inputField('isEmpty'))) {
				return;
			}


			self.disable();

			var onComplete = function (success) {
				if (success) {
					self.clear();
				}
				self.enable();
			};
			self._trigger('submit', null, {text: self.get(), onComplete: onComplete});
		},

		set: function (text) {
			var self = this;

			self.textEntry.inputField('set', text);
		},

		setInstruction: function(text){
			var self = this;

			self.sendInstruction.text(text);
		},

		get: function () {
			var self = this;

			return self.textEntry.inputField('get');
		},

		clear: function () {
			var self = this;

			self.textEntry.inputField('clear');
		},

		disable: function () {
			var self = this;

			self.textEntry.inputField('disable');
		},

		enable: function () {
			var self = this;
			self.textEntry.inputField('enable');
		},

		_destroy: function() {
			var self = this;
			self.container.remove();
		}
	});
	
})(jQuery);

/*
 * Data Type 'date'
 *
 * Has calendar popup (bootstrap-datepicker)
 *
 * Attribute Settings:
 * data-minyear (default [-=15]) - Can be set to 'CURRENT'
 * data-maxyear (default [+=2]) - Can be set to 'CURRENT'
 * data-startdate (default 01/01/[minyear]) - trumps minyear if both set. Can be set to 'TODAY'
 * data-enddate (default 12/31/[maxyear]) - trumps maxyear if both set. Can be set to 'TODAY'
 * data-enforce-min (default false) - marks dates <startDate as invalid
 * data-enforce-max (default false) - marks dates >endDate as invalid
 */

/*global  moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var util = $.formBuilder.util;
	var lang = $.formBuilder.lang;

	types.text = {};

	types.date = {
		attributes: ['minyear', 'maxyear', 'startdate', 'enddate','enforceMax','enforceMin'],
		momentStoreFormat: 'YYYY-MM-DD',

		_dateFormat: 'MM/DD/YYYY', // for output + datepicker

		setUp: function(ifw) {
			var self = this,
				e = ifw.element,
				tmp, startDate, endDate;

			ifw.placeholder(self._dateFormat);

			self.enforceMin = !!e.data('enforceMin');
			self.enforceMax = !!e.data('enforceMax');

			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			// Determine year ends
			var minYear = new Date().getFullYear() - 15,
				maxYear = new Date().getFullYear() + 2;

			tmp = e.data('minyear');
			if(tmp !== undefined) {
				if(tmp === 'CURRENT') {
					minYear = new Date().getFullYear();
				} else {
					minYear = tmp;
				}
			}

			tmp = e.data('maxyear');
			if(tmp !== undefined) {
				if(tmp === 'CURRENT') {
					maxYear = new Date().getFullYear();
				} else {
					maxYear = tmp;
				}
			}

			self.startDate = '01/1/' + minYear;
			self.endDate = '12/31/' + maxYear;

			// Determine date ends and save for validation

			tmp = e.data('startdate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					self.startDate = moment().format(self._dateFormat);
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					self.startDate = tmp;
				}
			}
			
			tmp = e.data('enddate');
			if(tmp !== undefined) {
				if(tmp === 'TODAY') {
					self.endDate = moment().format(self._dateFormat);
				} else if(tmp.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					self.endDate = tmp;
				}				
			}

			// Setup datepicker
			var datePickerOptions = {
				startDate: self.startDate, 
				endDate: self.endDate,
				autoclose: true,
				forceParse: false,
				format: 'mm/dd/yyyy',
				todayBtn: true,
				todayHighlight: true,
				language: lang.code
			};

			e.datepicker(datePickerOptions);

			// Setup inputFilter
			e.inputFilter({
				pattern: /[0-9\/]/,
				max : 10,
				toUpper: true
			});

		},

		converter: {
			/*
			 * Store date in XSD standard: yyyy-mm-dd, display in dd/mm/yyy 
			 */
			
			/**
			 * yyyy-mm-dd => mm/dd/yyyy
			 */
			toField: function(val, ifw) {
				if(!val || !val.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
					return '';
				}
				return val.substring(5, 7) + '/' + val.substring(8, 10) + '/' + val.substring(0, 4);
			},

			/**
			 * mm/dd/yyyy (local) => yyyy-mm-dd (utc)
			 */
			fromField: function(val, ifw) {
				if(!val || !val.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					return '';
				}

				return val.substring(6, 10) + '-' + val.substring(0, 2) + '-' + val.substring(3, 5);
			}
		},

		tearDown: function(ifw) {
			ifw.element.datepicker('remove');
		},

		validate: function(ifw) {
			var self = this,
				date = moment(ifw.element.val(),self._dateFormat,true);


			if(!date.isValid() || 
				(self.enforceMin && date.isBefore(moment(self.startDate, self._dateFormat))) ||
				(self.enforceMax && moment(self.endDate, self._dateFormat).isBefore(date))) {
				return {
					message: lang.dict.invalid
				};
			}
		}
	};

})(jQuery);
/**
 * Data type 'display'
 *
 * Displays data and acts as a read-only inputField
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;

	types.display = {
		setUp: function (ifw) {
			var e = ifw.element;

			e.parents('.field-item').hide();
			e.parents('.field-items').append('<div class="input-display"></div>');
		},

		converter: {
			toField: function (val, ifw) {
				ifw.element.parents('.field-items').find('.input-display').html(val);
			},
			fromField: function(value, ifw) {
				return ifw.element.parents('.field-items').find('.input-display').html().trim();
			}
		}
	};	

})(jQuery);
/**
 * Data type 'money'
 *
 * Attribute Settings:
 * data-currency-symbol (default=$) - Can modify currency symbol to any other symbol
 * data-show-symbol (default=true) - Choose whether or not to show currency symbol 
 */

(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.money = {

		attributes: ['currency-symbol', 'show-symbol', 'max-amount', 'min-amount'],

		setUp: function (ifw) {
			var self = this,
				e = ifw.element;

			self.element = e;

			self.currency = e.data('currency-symbol');
			self.showSymbol = e.data('show-symbol');
			self.max = e.data('max-amount');
			self.min = e.data('min-amount');

			e.inputFilter({
				pattern: /[0-9\.]/
			}).change(function () {
				self._onChange();
			}).blur(function() {
				e.val(self.format(e.val()));
			});

			if(self.showSymbol === undefined || !!self.showSymbol)
			{
				if(!self.currency) {
					ifw.addOn(-100, '$');
				} else {
					ifw.addOn(-100, self.currency);
				}
			}	

		},
		_onChange: function () {
			var self = this,
				e = self.element,
				caret = e.caret();

			e.val(self.format(e.val())).caret(caret.begin, caret.end);
		},

		format: function (money) {
			var self = this; 
			if($.trim(money) === ''){
				return '';
			}
			try {
				// MISC-916 removed extra decimals that cause NaN
				if(isNaN(money)) {
					money = money.toString();
					var count = 0; 
					for(var i = 0; i < money.length; i++){

						if((money[i]) === '.'){
						count++;}
					}
					var dec = money.indexOf('.');
					if(dec !== -1) {
						money = money.replace(/\./g,'');
						money = money.substring(0,dec) + '.' + money.substring(dec);
					}			
					money = parseFloat(money);
				}
				return (+money).toFixed(2);
			} catch(err) {
				return '';
			}
		},

		converter: {
			toField: function(val, ifw) {
				return this.format(val);
			},
			fromField: function(val, ifw) {
				if($.trim(val) === ''){
					return '';
				}
				return +this.format(val);
			}
		},

		validate: function(ifw){
			var self = this; 

			if(self.max || self.min){
				var e = ifw.element,
					enteredAmount = +ifw.get();

				if(self.max && enteredAmount > self.max){
					return {
						message: dict.over
					};
				}
				if(self.min && enteredAmount < self.min){
					return {
						message: dict.under
					};
				}
				
			}
		}
	};	

})(jQuery);
/**
 * Data type 'phone'
 *
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.phone = {
		setUp: function (ifw) {
			var self = this,
				e = ifw.element;

			e.inputFilter({
				pattern: /[0-9()\s\-x]/
			});

			e.on('blur', function() {
				e.val(self.format(e.val()));
			});

		},

		converter: {
			toField: function(val, ifw) {
				return this.format(val);
			},
			fromField: function(val, ifw) {
				return this.format(val);
			}
		},

		format: function (text) {


			if(!text){
				return '';
			}

			/*
			 * find extension delimeter
			 */
			var extensionStart = 0,
				xlocation = text.indexOf('x'),
				lastSpace = text.lastIndexOf(' '),
				ext = '',
				extraExt = '';

			if(xlocation > 0){
				extensionStart = xlocation;
			}else if(lastSpace > 7){
				extensionStart = lastSpace;
			}

			if(extensionStart > 0){
				ext = text.substring(extensionStart + 1);
				text = text.substring(0, extensionStart);
			}

			var num = $.trim(text.replace(/[()\s\-]/g, '')),
				numberLength = num.length;


			if(num[0] === '1'){
				num = num.substring(1);
				numberLength--;
			}

			if(numberLength > 10){
				extraExt = num.substring(10);
				num = num.substring(0, 10);
				numberLength = 10;
			}

			if (numberLength === 7) {
				num = num.substring(0,3) + '-' + num.substring(3);
			} else if (numberLength === 10) {
				num = num.substring(0,3) + '-' + num.substring(3,6) + '-' + num.substring(6);
			}

			ext = extraExt + ext;

			num = num.replace(/[^0-9^x^-]/g, '');
			ext = ext.replace(/[^0-9^x^-]/g, '');

			if(ext){
				num += 'x' + ext;
			}

			return num;
		},
		validate: function(ifw) {
			///^([0-9]{3}-)?[0-9]{3}-[0-9]{4}(x[0-9]+)?$/ simple regex
			if(!ifw.element.val().match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)) {
				return {
					message: dict.invalid
				};
			}
		}
	};
	

})(jQuery);
/**
 * Basic Regex data types
 * 
 * Types defined:
 *  - utext
 *  - integer
 *  - number
 *  - state
 *  - feid
 *  - zip
 *  - email
 *
 * Type Creator defined:
 *  - createRegexType(pattern, filter, flags, max)
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	var cannedFormatters = {
		trim: function(val) {
			return $.trim(val);
		}
	};

	/*
	 * helper function to build basic types
	 */
	var createRegexType = function(pattern, filter, flags, max) {
		if(flags === undefined) {
			flags = {};
		}
		if(flags.toUpper !== false) {
			flags.toUpper = true;
		}

		var type = {
			validate: function(ifw) {
				if(!ifw.element.val().match(pattern)) {
					return {
						message: dict.invalid
					};
				}
			}
		};

		if(filter || max) {
			type.setUp = function(ifw) {

				var filterData = {
					pattern: filter || /./,
					toUpper: flags.toUpper,
					max: max || 0
				};

				if(ifw.element.attr('data-max')){
					filterData.max = ifw.element.attr('data-max');
				}

				//console.log('setup ', ifw.element.attr('name'), filterData, max);
				ifw.element.inputFilter(filterData);
			};
		}

		if(flags.cannedFormatter !== undefined) {
			if($.isFunction(cannedFormatters[flags.cannedFormatter])) {
				type.format = cannedFormatters[flags.cannedFormatter];

				// add converters
				type.converter = {
					toField: function (val, ifw) { return type.format(val); },
					fromField: function (val, ifw) { return type.format(val); }
				};
			}
		}

		return type;
	};
	$.formBuilder.inputField.createRegexType = createRegexType;


	/*
	 * basic types
	 */
	$.extend(types, {
		'utext': createRegexType(/.*/, /.*/, {
			toUpper: true
		}),
		'integer': createRegexType(/^[0-9]*$/, /[0-9]/),
		'number': createRegexType(/^-?[0-9]+\.?[0-9]*$/, /[-0-9.]/),
		'state': createRegexType(/^[A-Z]{2}$/, /[A-Z]/, {}, 2),
		'feid': createRegexType(/^[0-9]{2}\-?[0-9]{7}$/, /[0-9\-]/, {}, 10),
		'zip': createRegexType(/(^\d{5}(\-?\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} ?\d{1}[A-Za]{1}\d{1})$/, /[0-9A-Z\s\-]/, {}, 10),
		'email': createRegexType(/^(?!.*\.{2})[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/, /[A-Za-z0-9._%+\-@]/, {
			toUpper: false,
			cannedFormatter: 'trim'
		})
	});
	

})(jQuery);
/**
 * Datatype 'select'
 * 
 */

(function($) {
	'use strict';
	
	var doc = $(document);
	$.formBuilder.inputField.types.select = {
		setUp: function(inputFieldWidget) {
			var self = this, // Object = {}
				o = inputFieldWidget.options,
				e = inputFieldWidget.element;

			self.element = e;
			self.source = [];
			self.inputWidget = inputFieldWidget;

			var fieldGroup = self.fieldGroup = inputFieldWidget.field.parents('.input-field-group');

			if(e.is('select')){
				console.log('** ERROR: deprecated use of <select> in the select type **');
			}

			e.css('opacity', 0);

			/*
			 * width(inputWidget.layers.items.width() - 26).
			 */
			var shim = self.shim = $('<div class="shim"></div>').insertAfter(e);

			inputFieldWidget.field.addClass('select-box');

			self.iconClosed = $('<span class="fb-icon fb-icon-sort-down dropdown-closed-icon"></span>').insertAfter(e);
			self.iconOpen = $('<span class="fb-icon fb-icon-sort-up dropdown-open-icon"></span>').insertAfter(e).hide();
			


			/*
			self.iconClear = $('<span class="fb-icon fb-icon-erase clear-icon"></span>').insertAfter(shim).on('click', function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				self.clear();
				e.change();
				return false;
			});
			*/
			var panel = self.panel = $('<div class="fb-select-panel"><div class="tms-select-dropdown-content"><div class="search" style="position:relative;"/><div class="options" style="position:relative;"/></div></div>').hide();
			self.options = panel.find('.options');

			inputFieldWidget.layers.items.append(panel).css('position', 'relative');

			var selectionClass = self.sectionClass =  'selected';

			panel.on('click', '.option', function () {
				self._setSelected();
			}).on('mouseenter', '.option', function () {
				panel.find('.' + selectionClass).removeClass(selectionClass);
				$(this).addClass(selectionClass);
			}).on('mouseleave', '.option', function () {
				$(this).removeClass(selectionClass);
			});

			inputFieldWidget.layers.items.on('click', function (ev) {
				if (inputFieldWidget.states.disable) {
					return;
				}
				var target = $(ev.target);

				if(target.childOf(panel, true)) {
					return;
				}

				setTimeout(function() {
					self.toggle();
				}, 0);
			});

			/*
			 * stop all enter and esc key events to leave the field
			 */
			/*
			inputWidget.field.on('keydown', function (ev) {

				if(ev.which === 13){
					ev.preventDefault();
					self._setSelected();
				}


				if(ev.which === 27 || ev.which === 13){
					ev.preventDefault();
					ev.stopPropagation();
					self.element.focus();
				}

			});
			*/

			/*
			 * build filter input
			 */
			var filter = self.filter = $('<input type="text" class="filter-box"/>')
				.appendTo(panel.find('.search')).inputField();

			filter.after('<span class="fb-icon fb-icon-search"></span>');
			filter.parents('.field-item').first().addClass('first');

			filter.parent().css({
					display: 'block',
					paddingRight: '2em'
				})
				.parent().css('display', 'block')
				.parent().css('display', 'block');
			/*
			 * kill click event, to prevent the inputField from grabbing focus
			 */

			filter.on('click', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
			});

			/*
			 * down 40
			 * up 39
			 * left 37
			 * right 39
			 */


			e.on('keydown', $.proxy(self._keyDownNavigate, self));
			filter.on('keydown', $.proxy(self._keyDownNavigate, self));
			filter.on('keyup', $.proxy(self._onKeyup, self));

			filter.on('dirty clean', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
			});

			self.closeListener = function (ev) {
				var which = ev.which;
				/*
				if(ev.which === 9){

				}
				*/

				if(which === 27 || which === 13){
					ev.preventDefault();
					ev.stopPropagation();

					if(which === 13){
						self._setSelected();
					}else{
						self.element.focus();
					}

					setTimeout(function() {
						self.close();
					}, 0);
					return;
				}

				var target = $(ev.target);

				if(!target.childOf(panel, true) && !target.childOf(fieldGroup, true)){
					setTimeout(function() {
						self.close();
					}, 0);
				}

			};

			self.update();
		},

		_keyDownNavigate: function (ev) {
			var self = this,
				panel = self.panel,
				selectionClass = self.sectionClass,
				which = ev.which;

			/*
			 * special handling for tab, does not perform any function (keeping for legacy)
			 */
			if(which === 9){
				self.element.next('input').focus();
				return;
			}


			if(which === 27 || which === 13){
				ev.preventDefault();
				return;
			}

			var selected, next;

			/*
			 * move down
			 */
			if(which === 40){
				selected = panel.find('.' + selectionClass);

				if(!selected.length){
					panel.find('.option:first').addClass(selectionClass);
				}else{
					next = selected.next();
					if(next.length){
						next.addClass(selectionClass);
						selected.removeClass(selectionClass);
					}
				}

				self._scroll();
			}

			/*
			 * move down
			 */
			if(which === 38){
				selected = panel.find('.' + selectionClass);

				if(!selected.length){
					panel.find('.option:last').addClass(selectionClass);
				}else{
					next = selected.prev();
					if(next.length){
						next.addClass(selectionClass);
						selected.removeClass(selectionClass);
					}

				}

				self._scroll();
			}

			if(which < 32 || which > 126){
				return;
			}
			self.open();
		},

		_onKeyup: function (ev) {
			var self = this,
				filter = self.filter,
				which = ev.which,
				val = filter.val();

			if(self.filterValue === val){
				return;
			}

			self.filterValue = val;


			self._filterOptions();
		},

		_setSelected: function () {
			var self = this,
				e = self.element,
				selected = self.panel.find('.selected:not(.filtered):visible');

			/*
			 * use the first value if none of the options are selected
			 */
			if(!selected.length){
				self._selectFirstNonEmptyOption();
			}

			selected = self.panel.find('.selected:not(.filtered):visible');

			var item = self.item = selected.data('item');
			/*
			 * TMS-1137
			 * if nothing is selected, ignore this call
			 */
			if(!item){
				return;
			}

			self._setLabel(self.renderLabel(item));

			self.close();
			e.val(self.item.value);

			e.focus();
			e.change();
			self.inputWidget.redraw();
			self.showHideCommand();
		},

		_selectFirstNonEmptyOption: function () {
			var self = this;
			self._removeSelection();
			self.panel.find('.option:not(.filtered):visible').each(function () {
				var option = $(this);
				if(option.html()){
					option.addClass('selected');
					return false;
				}
			});
		},

		_set: function (val) {
			var self = this;

			self.filter.val('');
			self.filterValue = '';

			self.item = undefined;

			self.loaded.done(function () {
				self._removeSelection();
				var options = self.panel.find('.option');

				options.each(function () {
					var item = $(this),
						itemData = item.data('item');

					if(self._equal(itemData, val)){
						item.addClass('selected');
						self.item = itemData;
						self._setLabel(itemData.label);
						self.showHideCommand();
						return false;
					}
				});

				if(!self.item || !self.item.value){
					if(self.inputWidget._trigger('itemnotfound', null, [val])){
						self._handleItemNotFound();
					}
				}
			});
		},

		_removeSelection: function () {
			this.panel.find('.option.selected').removeClass('selected');
		},

		_handleItemNotFound: function () {
			var self = this,
				e = self.element;
			
			self._setDefaultItem();

			if(!self.item || !self.item.value){
				self._selectFirstItem();
			}
		},

		_setDefaultItem: function () {
			var self = this,
				e = self.element,
				options = self.panel.find('.option'),
				defaultValue =  { value: e.attr('data-default')};

			options.each(function () {
				var item = $(this),
					itemData = item.data('item');

				if(self._equal(itemData, defaultValue)){
					if(e.attr('name') === 'params.category'){
						console.log('found defaultValue', defaultValue, itemData);
					}
					item.addClass('selected');
					self.item = itemData;
					self._setLabel(itemData.label);
					self.showHideCommand();
					return false;
				}
			});
		},

		_selectFirstItem: function() {
			var self = this,
				e = self.element,
				options = self.panel.find('.option');

			self.item = options.first().addClass('selected').data('item');
	
			if(self.item && self.item.label) {
				self._setLabel(self.item.label);
			} else {
				self._setLabel('');
			}

			self.showHideCommand();
		},

		showHideCommand: function () {
			var self = this,
				showClass = self.item && self.item.showClass,
				sections = self.showHideSections;

			if(!sections){
				return;
			}

			sections.hide();

			if(!showClass){
				return;
			}

			sections.filter('.' + showClass).show();
		},

		clear: function (andSelectNothing) {
			var self = this,
				e = self.element;

			self.item = {};
			self.panel.find('.selected').removeClass('selected');
			e.val('');
			self.filter.val('');
			self.filterValue = '';
			self.shim.text('');

			if(!andSelectNothing) {
				self._handleItemNotFound();
			}

			self.inputWidget.redraw();
		},

		_equal: function (a, b) {
			return a && b && a.value === b.value;
		},

		_setLabel: function (text) {
			var self = this;

			self.shim.text(text);

			// Account for overlap (only needs to do this once)
			if(!self.shimWidthSet) {
				var paddingRight, eWidth;

				paddingRight = parseFloat(self.iconClosed.outerWidth(true)) + parseFloat(self.iconClosed.css('right'))*2;
				eWidth = parseFloat(self.element.width());
				self.shim.css('max-width', eWidth - paddingRight);

				self.shimWidthSet = true;
			}
			
			
		},

		/*
		 * used for testing
		 */
		_getLabel: function () {
			return this.shim.text();
		},

		toggle: function () {
			var self = this;
			if(self.panel.is(':visible')){
				self.close();
			}else{
				self.open();
			}
		},

		/*
		 * this options was built for testing
		 */
		getOptions: function () {
			var self = this,
				optionPanel = self.panel.find('.option'),
				options = [];

			optionPanel.each(function () {
				options.push($(this).data('item'));
			});

			return options;
		},

		_filterOptions: function () {
			var self = this;
			self._removeSelection();
			self.panel.addClass('filtering');
			if(self.filterTimer){
				clearTimeout(self.filterTimer);
			}
			self.filterTimer = setTimeout(function() {
				self.__filterOptionsWork();
			}, 200);
		},

		__filterOptionsWork: function (optionsElements) {
			var self = this,
				val = self.filterValue;
			/*
			if(val && item.label && item.label.match(new RegExp($.ui.autocomplete.escapeRegex(val), 'i')) === null){
				return;
			}
			*/

			self.panel.addClass('filtering');

			if(!optionsElements){
				optionsElements = self.panel.find('.option');
			}
			
			if(!optionsElements.length){
				self.panel.removeClass('filtering');
				self.inputWidget._trigger('filterdone');

				// Update option list spacer
				var margin = (self.panel.find('.option').not('.filtered').length > 0)? self.panel.children().css('padding-top') : 0;
				self.filter.inputField('getField').css('margin-bottom', margin);

				return;
			}

			var optionsToProcessNow = optionsElements.splice(0,1000);

			$.each(optionsToProcessNow, function (i, optionsEl) {
				self._filterItem($(optionsEl), val);
			});

			setTimeout(function() {
				self.__filterOptionsWork(optionsElements);
			}, 0);
		},

		_filterItem: function (optionEl, val) {
			var self = this,
				item = optionEl.data('item');

			if(self._itemShoudBeFiltered(item, val)){
				optionEl.addClass('filtered');
			}else{			
				optionEl.removeClass('filtered');
			}
		},

		_itemShoudBeFiltered: function (item, val) {
			if(!val){
				return false;
			}
			if(!item.label){
				return true;
			}

			return item.label.match(new RegExp($.ui.autocomplete.escapeRegex(val), 'i')) === null;
		},

		_clearFilter: function () {
			var self = this;
			self.filter.val('');
			self.panel.find('.option.filtered').removeClass('filtered');
		},

		_buildEmptyOption: function () {
			var self = this,
				e = self.element,
				emptyLabel = e.data('emptyLabel');

			if(emptyLabel !== '' && !emptyLabel){
				return;
			}

			self.source.unshift({
				label: emptyLabel,
				value: ''
			});
		},

		_buildOptions: function () {
			var self = this,
				e = self.element,
				panel = self.panel,
				options = self.options;

			self.element.trigger('tmsselectbeforebuild');

			options.empty();

			var optionsbuffer = $('<div/>');

			if (!e.data('noSort')) {
				self._sort(self.source);
			}

			self._buildEmptyOption();

			$.each(self.source, function (i, item) {
				
				var option = $('<div class="option"/>'),
					renderedItem = self.renderItem(item);

				if(renderedItem !== null){
					option.append(renderedItem).data('item', item);
					optionsbuffer.append(option);
				}

				if(renderedItem === ''){
					option.height(20);
				}
			});

			options.append(optionsbuffer);
			self.element.trigger('tmsselectafterbuild', [options]);
		},

		_sort: function (items) {
			items.sort(function (a, b) {
				if (!a || !b) {
					return;
				}
				var al = a.label.toLowerCase(), bl = b.label.toLowerCase();
				return al > bl ? 1 : al < bl ? -1 : a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
			});
		},

		_scroll: function () {
			var self = this,
				options = self.options;

			if(!self.panel.is(':visible')){
				return;
			}

			setTimeout(function() {
				var selected = self.panel.find('.selected');

				if(selected.length === 0){
					options.scrollTop(0);
				}else{
					options.scrollTop(selected.position().top - selected.before().outerHeight());
				}
				
			}, 0);


			/*
			setTimeout(function() {
				panel.find('.options').scrollTop(0);
			}, 0);
			*/
		},

		open: function () {
			var self = this,
				e = self.element,
				panel = self.panel,
				inputLayer = self.inputWidget.layers.input,
				itemsLayer = self.inputWidget.layers.items;


			if(panel.is(':visible')){
				return;
			}

			self.filterValue = '';

			doc.on('click keyup', self.closeListener);

			var leftOffset = 0;
			if(inputLayer.index()){
				leftOffset = inputLayer.position().left - 1;
			}

			panel.width(e.width()).css({
				left: leftOffset,
				top: (itemsLayer.height() - 1) + 'px',
				width: (e.outerWidth() ) + 'px'
			});

			self.iconClosed.hide();
			self.iconOpen.show();
			panel.show();

			// update options margin
			var margin = self.panel.children().css('padding-top');
			self.filter.inputField('getField').css('margin-bottom', margin);

			self.filter.focus();

			self._scroll();
		},

		renderLabel: function (item) {
			return (item && item.label) || '';
		},

		renderItem: function (item) {
			return item.label;
		},

		close: function () {
			var self = this,
				panel = self.panel,
				filter = self.filter;

			doc.off('click keyup', self.closeListener);
			panel.hide();

			self._clearFilter();

			self.iconClosed.show();
			self.iconOpen.hide();
		},

		update: function () {
			var self = this,
				e = self.element;

			// Clear any selected option 
			self.clear(true);

			// Setup the new options 
			self.loaded = $.Deferred();
			self.load().done(function (source) {
				if (!source) {
					source = [];
				}
				self.source = source;
				setTimeout(function() {
					self.removeInvalid();
				}, 0);

				self._buildOptions();

				/*
				 * hide the filter if less then five items are returned
				 */
				if (self.filter && self.filter.data('inputField')) {
					if(source.length < 5){
						self.filter.inputField('hide');
					}else{
						self.filter.inputField('show');
					}
				}

				/*
				 * scan for showClass commands
				 */
				var form, sections = $([]);

				$.each(source, function (i, item) {
					if(item.showClass){
						if(!form){
							form = e.parents(':formBuilder-formBuilder').first();
						}
						sections = sections.add(form.find('.' + item.showClass));
					}
				});
				self.showHideSections = sections;
				self.loaded.resolve();
				self.showHideCommand();
			});
			return self.loaded;
		},

		removeInvalid: function (ev, ifw) {
			var self = this,
				e = self.element, 
				val = e.val(),
				source = self.source, 
				l = source.length, 
				i; 

			/*
			 * if ui.item is set, the autocomplete just set this
			 * and it does not need to be checked
			 */
			if(ifw && ifw.item){
				return;
			}


			/*
			 * verify that the current self.item matches an id in the source and that the label matches
			 */
			for(i = 0; i < l; i++){
				if(source[i].label === val && self.item && self.item.value === source[i].value){
					self.item = source[i];
					return;
				}
			}
			e.val('');
		},

		setOptions: function(options) {
			var self = this;

			self.optionsMap = options;
			self.optionsSetDynamically = true;
			self.update();
		},
		/*
		 * returns a sorted array of objects that have value and label properties
		 */
		load: function () {
			var self = this,
				e = self.element,
				source = [],
				dataOptions;

			if(self.optionsSetDynamically) {
				// Options already loaded from setOptions
				self.optionsSetDynamically = false;
				return $.when(self.optionsMap);
			}

			// Load options from DOM
			dataOptions = e.attr('data-options');

			if(dataOptions) {
				source = $.parseJSON(dataOptions);
			} else {
				e.find('option').each(function () {
					var option = $(this);
					source.push({
						label: option.text(),
						value: option.val()
					});
				});
			}
			return $.when(source); // returns a promise object
		},

		map: function (raw) {
			return {
				label: raw,
				value: raw
			};
		},

		deMap: function (obj) {
			if(!obj){
				return null;
			}
			return obj.value || null;
		},

		isEmpty: function () {
			var self = this,
				data = self.deMap(self.item);

			return data !== 0 && !data;
		},

		converter: {

			fromField: function () {
				var self = this,
					data = self.item;
				if(data === undefined){
					return null;
				}
				var val = self.deMap(data);

				if(val === undefined){
					return null;
				}

				return val;
			},

			toField: function (rawdata) {
				var self = this,
					e = self.element,
					data = self.map(rawdata);

				if(!rawdata && typeof e.data('default') !== 'undefined') {
					data = self.map(e.data('default'));
				}

				if (!data) {
					self.clear();
					return;
				}

				self._set(data);

				if (!self.item) {
					self.clear();
					return;
				}

				return self.item.label;
			}
		}
	};

})(jQuery);
/**
 * Data type 'text'
 *
 * This is the default type and has no special features.
 */


(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;

	types.text = {};	

})(jQuery);
/**
 * Data Type 'time'
 *
 * Has a dropdown with shortcuts.
 *
 * Attribute Settings:
 * data-step (default=30) - Minute increment between times in dropdown
 * data-military - Converts time into 24-hour
 * data-store-utc (default true) - keeps set/get in utc time zone format, rather than local.
 */

/* global moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.time = {
		attributes: ['step', 'military','storeUtc'],
		momentStoreFormat: 'HH:mm',

		_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,
		_regex2400: /^(([01]?[0-9])|(2[0-3])):[0-5][0-9]$/,

		setUp: function(ifw) {
			var self = this,
				e = ifw.element;

			self.military = !!e.data('military');
			self.step = e.data('step');
			self.storeUtc = e.data('storeUtc');

			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			if(!self.military)
			{
				ifw.placeholder('H:MMam/pm');

				e.inputFilter({
					pattern: /[0-9:apm]/,
					max: 7
				});
			}
			else
			{
				ifw.placeholder('HH:MM');

				e.inputFilter({
					pattern: /[0-9:]/,
					max: 5
				});
			}
			

			e.timepicker({
				appendTo: ifw.getField(),
				selectOnBlur: false,
				step: self.step, //default is 30 and will be set if undefined
				timeFormat: self.military?'H:i':'g:ia'
			});

			// Make sure the timepicker width matches the field width
			e.on('showTimepicker', function(){
				var newWidth = e.outerWidth();
				if(newWidth < 80) {
					newWidth = 80;
				}
				ifw.getField().children('.ui-timepicker-wrapper').width(newWidth);
			});

		},

		converter: {
			/**
			 * convert from moment format HH:mm (utc) to h:mma (local)
			 */
			toField: function(val, ifw) {
				var self = this,
					time;

				if(!val || !val.match(/^[0-9]{2}:[0-9]{2}$/)){
					return '';
				}

				time = moment.utc(val, self.momentStoreFormat, true);

				if(!time.isValid()) {
					return '';
				}

				if(self.storeUtc) {
					// Convert utc back to local for display
					time.local();
				}

				return time.format(self.military? 'H:mm' : 'h:mma');
			},

			/**
			 * convert from moment format h:mma (local) to HH:mm (utc)
			 */
			fromField: function(val, ifw) {
				var self = this,
					time;
				
				if(!val || !val.match(self.military? self._regex2400 : self._regex)) {
					return '';
				}


				time = moment(val, self.military? 'H:mm' : 'h:mma').milliseconds(0);

				if(!time.isValid()) {
					return '';
				}

				if(self.storeUtc) {
					// Convert to utc for storage
					time.utc();
				}

				// Return in 24hr format
				return time.format(self.momentStoreFormat);
			}
		},

		tearDown: function(ifw) {
			ifw.element.timepicker('remove');
		},

		validate: function(ifw) {
			var self = this,
				e = ifw.element,
				val = e.val(),
				invalidMessage = {message: dict.invalid},
				valid;

			valid = self.military? val.match(self._regex2400) : val.match(self._regex);

			if(!valid) {
				return invalidMessage;
			}

		}
	};

})(jQuery);
/**
 * Data Type 'dateTime'
 * 
 * A combination of two InputFields, date & time.
 *
 * The original inputfield is hidden between them.
 *
 * Format: 'YYYY-MM-DDTHH:mm:ssZ' in UTC
 *
 * Attribute Settings:
 * data-time-width-ratio (default=0.5, min=.2, max=.8) 
 * data-store-utc (default true) keeps set/get in utc time zone format, rather than local.
 *
 * CSS Settings:
 * min-width (default=270px, min=100px)
 *
 * Attributes specific for date or time will be passed to them.
 */

/* global moment:true */
(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.dateTime = {
		momentStoreFormat: 'YYYY-MM-DDTHH:mm:ss[Z]',


		setUp: function(inputFieldWidget) {
			var self = this,
				e = inputFieldWidget.element;


			// Get option constants
			self.storeUtc = e.data('storeUtc');
			if(self.storeUtc === undefined) {
				self.storeUtc = true;
			} else {
				self.storeUtc = !!self.storeUtc;
			}

			self.ifw = inputFieldWidget;

			self._setUpFields();
			self._refreshFieldWidth();
			self._setUpCleanDirtyEvents();

			self.ifw.element.on('resize', function(ev){
				self._refreshFieldWidth();
			});
		},

		_setUpFields: function() {
			var self = this,
				e = self.ifw.element,
				fieldItems = self.ifw.element.parent().parent(),
				options, tmp, i;

			self.ifw.element.parent().hide();

			// Create the elements
			self.dateWidget = $('<input type="text" data-type="date"/>');
			self.timeWidget = $('<input type="text" data-type="time"/>');

			// Pass date attributes
			for(i = 0; i < types.date.attributes.length; ++i) {
				tmp = e.data(types.date.attributes[i]);
				if(tmp !== undefined) {
					self.dateWidget.data(types.date.attributes[i], tmp);
				}
			}
			
			// Pass time attributes
			for(i = 0; i < types.time.attributes.length; ++i) {
				tmp = e.data(types.time.attributes[i]);
				if(tmp !== undefined) {
					self.timeWidget.data(types.time.attributes[i], tmp);
				}
			}

			options = {
				require: true
			};

			// Create the widgets
			self.dateWidget.prependTo(fieldItems).inputField(options);
			self.timeWidget.appendTo(fieldItems).inputField(options);

			self.dateWidget.parent().addClass('first');

			self.timeWidgetInstance = self.timeWidget.data('formBuilderInputField');
			self.dateWidgetInstance = self.dateWidget.data('formBuilderInputField');
		},

		/**
		 * Make sure the child widgets' total width is equal to the base element's width
		 */
		_refreshFieldWidth: function() {
			var self = this,
				fullWidth = self.ifw.element.width(),
				elDate = self.dateWidget,
				elTime = self.timeWidget,
				timeWidthRatio,
				minWidth;
					
				// Take out widghet margins/padding from outer width
				fullWidth -= elDate.outerWidth(true) - elDate.width();
				fullWidth -= elTime.outerWidth(true) - elTime.width();
				
				// Prevent it from being too small
				minWidth = self.ifw.element.css('min-width');
				if(minWidth !== null) {
					minWidth = parseInt(minWidth, 10);
				}
				if(isNaN(minWidth) || minWidth < 100) {
					minWidth = 270; //default
				}

				if(fullWidth < minWidth) {
					fullWidth = minWidth;
				}

				// Set time width at ratio and give the rest to date
				timeWidthRatio = self.ifw.element.data('timeWidthRatio');
				if(isNaN(timeWidthRatio) || timeWidthRatio < 0.2 || 0.8 < timeWidthRatio) {
					timeWidthRatio = 0.5; //default
				}

				elTime.width(fullWidth * timeWidthRatio);
				elDate.width(fullWidth - elTime.width());
		},

		_setUpCleanDirtyEvents: function() {
			var self = this;	

			self.dateWidget.on('dirty clean', function (ev) {
				ev.stopPropagation();
				self.ifw.checkDirty();
			});

			self.timeWidget.on('dirty clean', function (ev) {
				ev.stopPropagation();
				self.ifw.checkDirty();
			});
		},

		converter: {
			/**
			 * No need to worry about utc/local. Handled in type time.
			 * All retrived/set times should be in utc
			 *
			 * Seconds are included in the formatting but are ignored and 
			 * always set to 00
			 */
			toField: function(val, ifw) {
				var self = this,
					splitDate = self._splitDateAndTime(val);


				self.timeWidgetInstance.set(splitDate.time);
				self.dateWidgetInstance.set(splitDate.date);
			}, 
			
			fromField: function(val, ifw) {
				var self = this,
					localDate = self.dateWidgetInstance.get(),
					time = self.timeWidgetInstance.get(),
					dateTime;

				// If one is empty just default to current time
				if(!localDate.trim() || !time.trim()) {
					return '';
				}
				
				if(!localDate.trim()) {
					localDate = moment();
				} else {
					// Convert them to moments
					localDate = moment(localDate, types.date.momentStoreFormat);
				}

				if(!time.trim()) {
					time.moment();
					
					if(self.storeUtc) {
						time.utc();
					}
				} else {
					if(self.storeUtc) {
						// Parse as UTC and localize
						time = moment.utc(time, types.time.momentStoreFormat).local();
					} else {
						// Parse as local
						time = moment(time, types.time.momentStoreFormat);
					}
				}
				
				// Combine them
				dateTime = self._joinDateAndTimeMoments(localDate,time);

				if(self.storeUtc) {
					dateTime.utc();
				}

				if(!dateTime.isValid()) {
					return '';
				}

				return dateTime.format(self.momentStoreFormat);
			}
		},

		_splitDateAndTime: function (dateTimeString) {
			var self = this,
				dateTime,
				result = {};
			
			if(self.storeUtc) {
				// Parse as UTC
				dateTime = moment.utc(dateTimeString, self.momentStoreFormat);
				
			} else {
				// Parse as local
				dateTime = moment(dateTimeString, self.momentStoreFormat);
			}

			if(!dateTime.isValid()){
				return {
					date: '',
					time: ''
				};
			}

			result.time = dateTime.format(types.time.momentStoreFormat);

			if(self.storeUtc) {
				// need local for date typ
				dateTime.local();
			}

			result.date = dateTime.format(types.date.momentStoreFormat);

			return result;
		},

		_joinDateAndTimeMoments: function(localDateMoment, localTimeMoment) {
			return moment().utcOffset(localTimeMoment.utcOffset())
				.milliseconds(0)
				.second(localTimeMoment.second())
				.minute(localTimeMoment.minute())
				.hour(localTimeMoment.hour())

				.date(localDateMoment.date())
				.month(localDateMoment.month())
				.year(localDateMoment.year());
		},

		validate: function(ifw) {
			var self = this,
				valid = true,
				skipRequired = !self.ifw.hasStatus('require');

			// Do not skip require check when only one is empty
			if(skipRequired){
				skipRequired = !self.dateWidgetInstance.isEmpty();
				skipRequired = skipRequired && !self.timeWidgetInstance.isEmpty();
			}

			valid = valid && self.dateWidgetInstance.validate(skipRequired);
			valid = valid && self.timeWidgetInstance.validate(skipRequired);

			if(!valid) {
				return {
					message: dict.invalid
				};
			}
		},

		// will not validate if empty
		isEmpty: function() {
			var self = this;

			return ($.trim(self.dateWidget.val()) + $.trim(self.timeWidget.val())) === '';
		},

		tearDown: function(ifw) {
			var self = this;

			self.dateWidget.inputField('getField').remove();
			self.timeWidget.inputField('getField').remove();

			self.dateWidget = undefined;
			self.timeWidget = undefined;

			ifw.element.parent().show();
		}

	};

})(jQuery);
/**
 * Data type 'tmsPhone', an extension of phone
 *
 * It adds a secondary addon to the right to specify number type.
 */

(function($){
	'use strict';
	
	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.tmsPhone = $.extend({}, types.phone, {
		_phoneTypeTemplate:
				'<div class="phone-type-form" style="padding: 1px;">' +
					'<div class="phone-type clickable" data-code="mobile" ><span class="fb-icon fb-icon-iphone"> '+dict.mobile+'</span></div>' +
					'<div class="phone-type clickable" data-code="home"><span class="fb-icon fb-icon-home"> '+dict.home+'</span></div>' +
					'<div class="phone-type clickable" data-code="work"><span class="fb-icon fb-icon-office"> '+dict.work+'</span></div>' +
					'<div class="phone-type clickable" data-code="fax"><span class="fb-icon fb-icon-print"> '+dict.fax+'</span></div>' +
				'</div>',

		setUp: function(inputWidget) {
			var self = this,
				o = inputWidget.options,
				e = inputWidget.element;

			self.element = e;

			types.phone.setUp.call(self, inputWidget);

			/*
			 * add icon
			 */

			self.desc = $('<span></span>');
			self.setType();

			self.menu = $(self._phoneTypeTemplate);
			self.icon = inputWidget.addOn(1, '').addClass('clickable').append(self.desc).css({
				textAlign: 'left',
				// padding: '0px 22px',
				width: '4.8em'
			});

			self.icon.on('click', function() {
				/*
				 * build the menu lazily, so that popovers are not created when now needed and the field has time to attach
				 * to the form so that the popover appendto can be set
				 */
				self._setupMenu(inputWidget);
				self.toggleMenu();
			});

			//updateTmsPhone.call(self);
			//o._layers.suggest.html('(NNN) NNN-NNNN');
		},

		toggleMenu: function () {
			var self = this;
			self.menu.find('.focused').removeClass('focused').end().find('[data-code="' + self.type + '"]').addClass('focused').end().popOver('toggle');
		},

		_setupMenu: function (inputWidget) {
			var self = this,
				e = self.element,
				appendToParent, appendTo;

			if(self.menuBuilt){
				return;
			}

			self.menu.popOver({
				target: self.icon,
				appendTo: inputWidget.getField()
			}).on('click', function (ev) {
				ev.stopPropagation();
			}).on('click', '.phone-type', function (ev) {
				ev.stopPropagation();
				var control = $(this);
				self.setType(control.attr('data-code'));
				self.menu.popOver('hide');
			});

			self.menuBuilt = true;
		},

		setType: function (type) {
			var self = this;

			if(!type){
				type = 'home';
			}

			var icon = '';

			if(type === 'work'){
				icon = 'office';
			} else if(type === 'mobile'){
				icon = 'iphone';
			} else if(type === 'fax'){
				icon = 'print';
			} else {
				icon = type = 'home';
			}

			self.desc.html('<span class="fb-icon fb-icon-' + icon + '"> ' + dict[type] + '</span>');
			self.type = type;
		},

		converter: {
			fromField: function(number, inputWidget) {
				var self = this;
				number = types.phone.converter.fromField.call(self, number, inputWidget);
				// Number is the value being entered

				// Returns null if the value entered is not a number 
				if(number !== 0 && !number){
					return null;
				}

				var data = {
					type: self.type,
					number: number
				};

				if(self.id){
					data.id = self.id;
				}

				return data;
			},
			toField: function(data, inputWidget) {
				var self = this;

				if(data){
					self.setType(data.type);
					self.id = data.id;
					data = types.phone.converter.toField.call(self, data.number, inputWidget);
				}

				return data;
			}
		},

		destroy: function(inputWidget) {
			inputWidget.element.off('.tmsPhone');
			$.Widget.prototype.destroy.call(this);
		}
	});
	
})(jQuery);

/**
 * Functions to quickly make extensions of the select type
 * 
 * arraySelectCreator(array)
 * booleanSelectCreator(trueString, falseString)
 * 
 */

(function($){
	'use strict';
	
	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	$.formBuilder.inputField.arraySelectCreator = function (array) {
		return $.extend({}, types.select, {
			map: function (s) {
				var d = {};
				d.label = s;
				d.value = s;
				return d;
			},

			load: function () {
				var self = this;
				return $.when($.map(array, $.proxy(self.map, self)));
			}
		});
	};

	$.formBuilder.inputField.booleanSelectCreator = function (trueString, falseString) {
		return $.extend({}, types.select, {
			map: function (s) {
				var d = {},
					val = falseString;

				if(s === true){
					val = trueString;
				}

				d.label = val;
				d.value = !!s;

				return d;
			},

			deMap: function (d) {
				if($.isEmptyObject(d)){
					return false;
				}
				return d.value;
			},

			load: function () {
				var self = this;
				return $.when($.map([true, false], $.proxy(self.map, self)));
			}
		});
	};


	// Examples from tms
	var date = new Date();
	var years = [];
	for (var i = 0; i <= 10; i++) {
		years.push((date.getFullYear() + i).toString());
	}
	
	types.tmsExpYear = $.formBuilder.inputField.arraySelectCreator(years);
	types.tmsYesNo = $.formBuilder.inputField.booleanSelectCreator(dict.yes, dict.no);
	
})(jQuery);
