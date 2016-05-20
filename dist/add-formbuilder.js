/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * formBuilder - An advanced HTML5 form creation & validation framework
	 * @version v2.1.9
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

	__webpack_require__(11);
	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(8);

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
				left: '1000' // Left position relative to parent in px
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

						if(key.match(/^[0-9]{1,3}$/)) {

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



		util.loadDomData = function(element, namespace, aKey) {
			$.each(aKey, function(i, key) {
				var data = element.data(key);
				if(typeof data !== 'undefined' && data !== null) {
					namespace[key] = data;
				}
			});
		};

		/**
		 * For reading boolean values from dom attributes.
		 * When the the attribute does not exist, the key retains its !!value. (therefore undefined -> false and true -> true)
		 * Allows for 'data-some-key' and 'data-some-key="true"' to both be true.
		 *
		 * Note: 'data-some-key="false"' is still false.
		 */
		util.loadDomToggleData = function(element, namespace, aKey) {
			$.each(aKey, function(i, key) {
				var data = element.data(key);
				namespace[key] = (typeof data === 'undefined' || data === null)? !!namespace[key] : (data !== false);
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
							'<span class="first field-item addon clickable array-field-add noselect">+</span>' +
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
								'<span class="fb-icon fb-icon-remove" title="'+ dict.remove+'"></span>' +
							'</span>' +
						'</div>' +
					'</div>' +
				'</div>',

			_create: function() {
				var self = this,
					e = self.element,
					o = self.options;

				util.loadDomData(e, o, ['addmessage', 'subWidget']);
				util.loadDomToggleData(e, o, ['nosort']);

				self.subField = e.html();

				self.id = nextArrayFieldId();

				e.html(self._arrayFieldTemplate);

				if(o.addmessage) {
					e.find('.array-field-add-message').text(o.addmessage);
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



				if(!o.nosort) {
					self.itemsContent.sortable({
						axis: "y",
						handle: '.sort-handle',
						containment: self.itemsContent,
						tolerance: 'pointer',
						stop: function () {
							self._checkDirty();
						}
					});
				}

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
					} else {
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
				} else {
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
					subWidget = self.options.subWidget || 'inputField',
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
				} else {
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
					o = self.options,
					itemView = $(self._arrayFieldItemTemplate);

				if(o.nosort)  {
					// remove sort handle
					itemView.children().first().remove();
				}

				if(o.subWidget) {
					self._drawWidgetItem(item, itemView, o.subWidget);
				} else {
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
					.inputField({ forceFirst: self.options.nosort })
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

				self.set();
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

				self.set({
					range: range
				});

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
				return this.form.formBuilder('get');
			},

			set: function (data) {
				var self = this;

				if(typeof data === 'undefined') {
					data = self._getDataDefault();
				}

				self.form.formBuilder('set', data);
			},

			_getDataDefault: function () {
				return {
					range: 'custom'
				};
			},

			isDirty: function () {
				return this.form.formBuilder('isDirty');
			},

			clearDirty: function () {
				this.form.formBuilder('clearDirty');
			},

			clear: function () {
				this.set({
					from: '',
					to: '',
					range: 'custom'
				});
			},

			validate: function () {
				return this.form.formBuilder('validate');
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

				// Get options
				util.loadDomToggleData(e, o, ['ignoreHidden','defaultRequired','loadHidden']);

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

					var widgetName = el.attr('data-load-widget-as-field');
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
					if((!o.ignoreHidden || el.is(':visible')) && el.inputField('validate') === false){
						valid = false;
					}
				});

				self.fieldsWidgets.each(function() {
					var el = $(this);
					if((!o.ignoreHidden || el.is(':visible')) && self._proxyCommandToWidget(el, false, 'validate') === false){
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

				if(o.forceFirst) {
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
				 * so set all undefined variables to ''
				 */
				if(typeof val !== 'undefined') {
					e.val(val);
				} else {
					e.val('');
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
								paddingLeft: (layers.prefix? layers.prefix.outerWidth() : 1) + 'px',
								maxWidth: (self.startInputWidth - valWidth)  + 'px'
							});

							self.suffixPaddingAdded = true;
						}
					} else {
						e.css({
							paddingRight: self.startPaddingRight,
							width: self.startInputWidth + (layers.prefix? layers.prefix.outerWidth() : 0) + 'px'
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


	/**
	 * submitButton Widget
	 *
	 * Status Classes:
	 * submitting - when waiting for the onComplete callback
	 * complete - set/unset with mark functions
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

				self.spinner = $('<div class="spinner" style="display: inline-block; position: absolute; margin-left: -.10cm; margin-top: -.4cm;"></div>');
				(self.spinner).appendTo(e);

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
				var self = this,
					e = self.element;
				self.options.disabled = false;
				e.button('enable');
			},

			disable: function() {
				var self = this,
					e = self.element;
				self.options.disabled = true;
				e.button('disable');
			},

			markComplete: function() {
				var self = this,
					e = self.element;
				e.addClass('complete');
				self.disable();
			},

			markIncomplete: function() {
				var self = this,
					e = self.element;
				e.removeClass('complete');
				self.enable();
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
	 * data-min-date [YYYY-MM-DD] | offset - first date visible in datepicker & valid
	 * data-max-date [YYYY-MM-DD] | offset - last date visible in datepicker & valid
	 * data-no-rounding - disables offset date unit rounding
	 *
	 * The offset format should match /[+-]*\d+\!?[dmyw]/gi and is an offset from the current
	 * date. Multple offsets can be in one string and are applied in order of unit
	 * size, largest to smallest. Multiple offsets with the same unit will be
	 * evaluated left to right.
	 *
	 * By default, each offset will round the date to the start or end of the offset
	 * unit when subtracting or adding, respectively. This can be disabled with the
	 * no-rounding option. Combining addition/subtration with the same unit is
	 * particularly useful when you want to get a specific date that is partially
	 * relative to the current date. As a result, +0x/-0x can be used to move to
	 * the end/start of unit x, changing any smaller units to match that fact.
	 *
	 * Rounding may also be disabled on a per-offset unit basis by adding a '!'
	 * before the unit character. Other offsets without it will still be rounded
	 * unless the no-rounding option is set. For example in "+1!y+0m" will evaluate
	 * as "the end of this month next year".
	 *
	 *
	 * Any dateTime objects stored in UTC must convert to/from local timezone when
	 * setting/retrieving from this type. This type should only touch local dates.
	 *
	 * Examples for displayed values (local):
	 *
	 * min-date="1995-06-07" max-date="2020-02-20"
	 * @ 2016-01-05 => [1995-06-07, 2020-02-20]
	 * @ 2000-05-20 => [1995-06-07, 2020-02-20]
	 *
	 * min-date="-5y" max-month="+1m"
	 * @ 2016-01-05 => [2015-01-05, 2016-02-29]
	 * @ 2000-05-20 => [1995-01-01, 2000-06-30]
	 *
	 * min-date="0d" max-date="+60d"
	 * @ 2016-01-05 => [2015-01-05, 2016-03-05]
	 * @ 2000-05-20 => [1995-05-20, 2000-07-19]
	 *
	 * max-date="+2y"
	 * @ 2016-01-05 => (beg. of time, 2018-12-31]
	 * @ 2000-05-20 => (beg. of time, 2002-12-31]
	 *
	 * min-date="-1y+1m-0m+5d" (last year, Feb 6) max-date="+1y-0m+2y" (+3y, Dec 1)
	 * @ 2016-01-05 => [2016-02-06, 2019-12-01]
	 * @ 2000-05-20 => [1999-02-06, 2003-12-01]
	 *
	 * min-date="+1w-0w+1d" (next Monday)
	 * @ 2016-01-05 => [2016-01-11, end of time)
	 * @ 2000-05-20 => [2000-05-08, end of time)
	 *
	 * min-date="-1!y" max-date="+1y"
	 * @ 2016-01-05 => [2015-01-05, 2017-12-31]
	 * @ 2000-05-20 => [1999-05-08, 2001-12-31]
	 */


	/*global  moment:true */
	(function($){
		'use strict';

		var types = $.formBuilder.inputField.types;
		var util = $.formBuilder.util;
		var lang = $.formBuilder.lang;

		types.text = {};

		types.date = {
			attributes: [
				'minDate',
				'maxDate',
				'noRounding'
			],
			momentStoreFormat: 'YYYY-MM-DD',

			_dateFormat: 'MM/DD/YYYY',	// for output + datepicker
			_unitOrder: 'ymwd',			// largest -> smallest

			setUp: function(ifw) {
				var self = this,
					e = ifw.element;

				util.loadDomData(e, self, [
					'minDate',
					'maxDate'
				]);
				util.loadDomToggleData(e, self, ['noRounding']);

				ifw.placeholder(self._dateFormat);

				self.minDate = self._parseOffsetDate(self.minDate);
				self.maxDate = self._parseOffsetDate(self.maxDate);

				// Setup datepicker
				var datePickerOptions = {
					startDate: self.minDate,
					endDate: self.maxDate,
					autoclose: true,
					forceParse: false,
					format: self._dateFormat.toLowerCase(),
					todayBtn: "linked",
					todayHighlight: true,
					language: lang.code,
					keyboardNavigation: false
				};

				e.datepicker(datePickerOptions);

				// Setup inputFilter
				e.inputFilter({
					pattern: /[0-9\/]/,
					max : 10,
					toUpper: true
				});

			},


			/**
			 * Converts a offset or date string to a plain date string
			 */
			_parseOffsetDate: function(str) {
				var self = this,
					offsets, m, type, u, noRound;

				if(!str) {
					return;
				}

				str = String(str).trim();

				if(str === '0') {
					return moment().format(self._dateFormat);

				}

				offsets = str.match(/[+-]*\d+\!?[dmyw]/gi);
				if(offsets) {

					// sort units from largest -> smallest
					offsets.sort(function(a, b) {
						var uA = a[a.length - 1],
							uB = b[b.length - 1];

						if(self._unitOrder.indexOf(uA) < self._unitOrder.indexOf(uB)) {
							return -1;
						}

						if(self._unitOrder.indexOf(uA) > self._unitOrder.indexOf(uB)) {
							return 1;
						}

						return 0;
					});

					// apply offsets
					offsets.forEach(function(o) {
						switch(o[o.length - 1]) {
							case 'm': type = 'months'; break;
							case 'y': type = 'years'; break;
							case 'w': type = 'weeks'; break;
							default : type = 'days'; break;
						}

						if(!m) {
							m = moment();
						}

						m.add(parseInt(o, 10), type);

						if(!self.noRounding && o[o.length - 2] !== '!') {
							m[(o[0] === '+')? 'endOf' : 'startOf'](type.substring(0, type.length-1));
						}

					});

					return m.format(self._dateFormat);
				}

				m = moment(str, self.momentStoreFormat, true);
				if(m.isValid()) {
					return m.format(self._dateFormat);
				}

			},

			converter: {
				/*
				 * Store date in XSD standard: yyyy-mm-dd, display in dd/mm/yyy
				 */

				/**
				 * yyyy-mm-dd => mm/dd/yyyy
				 */
				toField: function(val, ifw) {
					if(!val || !val.match(/^\d{4}-\d{2}-\d{2}$/)) {
						return '';
					}
					return val.substring(5, 7) + '/' + val.substring(8, 10) + '/' + val.substring(0, 4);
				},

				/**
				 * mm/dd/yyyy => yyyy-mm-dd
				 */
				fromField: function(val, ifw) {
					var self = this;

					if(!val || !val.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
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
					date = moment(ifw.element.val(), self._dateFormat, true);

				if(!date.isValid() ||
					(self.minDate && date.isBefore(moment(self.minDate, self._dateFormat))) ||
					(self.maxDate && moment(self.maxDate, self._dateFormat).isBefore(date))) {
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
	 * data-currency-symbol (default='$') - Can modify currency symbol to any other symbol
	 * data-hide-symbol (default=false) - Choose whether or not to show currency symbol
	 * data-max-amount
	 * data-min-amount
	 */

	(function($){
		'use strict';

		var types = $.formBuilder.inputField.types;
		var dict = $.formBuilder.lang.dict;
		var util = $.formBuilder.util;

		types.money = {

			attributes: ['currency-symbol', 'hide-symbol', 'max-amount', 'min-amount', 'allowNegative'],

			setUp: function (ifw) {
				var self = this,
					e = ifw.element;

				self.element = e;

				var o = self.typeOptions = {
					currencySymbol: '$'
				};
				util.loadDomData(e, o, ['currencySymbol', 'maxAmount', 'minAmount']);
				util.loadDomToggleData(e, o, ['hideSymbol', 'allowNegative']);

				if(!o.allowNegative){
					e.inputFilter({
						pattern: /[0-9\.]/
					}).change(function () {
						self._onChange();
					}).blur(function() {
						e.val(self.format(e.val()));
					});
				} else{
					e.inputFilter({
						pattern: /[0-9\.-]/
					}).change(function () {
						self._onChange();
					}).blur(function() {
						e.val(self.format(e.val()));
					});

				}



				if(!o.hideSymbol) {
					ifw.addOn(-100, o.currencySymbol);
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
				var self = this,
					o = self.typeOptions;

				if(o.maxAmount || o.minAmount){
					var e = ifw.element,
						enteredAmount = +ifw.get();

					if(o.maxAmount && enteredAmount > o.maxAmount){
						return {
							message: dict.over
						};
					}
					if(o.minAmount && enteredAmount < o.minAmount){
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
	 * Formatters/Convertes
	 * $.formBuilder.inputField.standardConverters
	 * 	- formatter
	 * 	- number
	 * $.formBuilder.inputField.standardFormatters
	 * 	- trim
	 *
	 * Type Creator defined:
	 *  - createRegexType(pattern, filter, flags, max)
	 */


	(function($){
		'use strict';

		var types = $.formBuilder.inputField.types;
		var dict = $.formBuilder.lang.dict;

		var formatters = $.formBuilder.inputField.standardFormatters = {
			trim: function(val) {
				return $.trim(val);
			}
		};

		var converters = $.formBuilder.inputField.standardConverters = {
			formatter: {
				toField: function (val, ifw) { return this.format(val); },
				fromField: function (val, ifw) { return this.format(val); }
			},
			number: {
				// number => string
				toField: function(value) {
					if(!value && value !== 0) {
						return '';
					}
					return value + '';
				},
				// string => number
				fromField: function(value) {
					if(!value || isNaN(value)) {
						return null;
					}
					return +value;
				}
			}
		};

		/**
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

					ifw.element.inputFilter(filterData);
				};
			}

			// Legacy support
			if(flags.cannedFormatter) {
				flags.formatter = flags.cannedFormatter;
			}

			// passed in formatter?
			if(flags.formatter) {
				if(typeof flags.formatter === 'string' && $.isFunction(formatters[flags.formatter])) {
					// standard
					type.format = formatters[flags.formatter];
					type.converter = converters.formatter;
				} else if($.isFunction(flags.formatter)) {
					// custom
					type.format = flags.formatter;
					type.converter = converters.formatter;
				}
			}

			// passed in converter?
			if(flags.converter) {
				if(typeof flags.converter === 'string' && converters[flags.converter]) {
					type.converter = converters[flags.converter];
				} else if($.isFunction(flags.converter)) {
					type.converter = flags.converter;
				}
			}

			return type;
		};
		$.formBuilder.inputField.createRegexType = createRegexType;


		/**
		 * basic types
		 */
		$.extend(types, {
			'utext': createRegexType(/.*/, /.*/, {toUpper: true}),
			'state': createRegexType(/^(A[LKZR]|C[AOT]|DE|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINSOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY])$/, /[A-Z]/, {}, 2),
			'feid': createRegexType(/^[0-9]{2}\-?[0-9]{7}$/, /[0-9\-]/, {}, 10),
			'zip': createRegexType(/(^\d{5}(\-?\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} ?\d{1}[A-Za]{1}\d{1})$/, /[0-9A-Z\s\-]/, {}, 10),
			'email': createRegexType(/^(?!.*\.{2})[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/, /[A-Za-z0-9._%+\-@]/, {
				toUpper: false,
				cannedFormatter: 'trim'
			})
		});

		types.integer = createRegexType(/^-?[0-9]*$/, /[-0-9]/, {
			converter: 'number'
		});
		types.number = createRegexType(/^-?[0-9]+\.?[0-9]*$/, /[-0-9.]/, {
			converter: 'number'
		});


	})(jQuery);

	/**
	 * Datatype 'select'
	 *
	 *
	 * Attribute Options:
	 * data-empty-label
	 * data-no-sort
	 * data-options
	 * data-filter-min
	 * data-overflow-tooltips
	 *
	 */

	(function($) {
		'use strict';

		var doc = $(document);
		var util = $.formBuilder.util;

		var defaultOptions = {
			filterMin: 5
		};

		$.formBuilder.inputField.types.select = {

			setUp: function(inputFieldWidget) {
				var self = this, // Object = {}
					e = inputFieldWidget.element;

				self.element = e;
				self.source = [];
				self.inputWidget = inputFieldWidget;

				self.typeOptions = $.extend({}, defaultOptions);
				self._getTypeOptions();

				var fieldGroup = self.fieldGroup = inputFieldWidget.field.parents('.input-field-group');

				if(e.is('select')) {
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
						} else {
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

			_getTypeOptions: function() {
				var self = this,
					e = self.element,
					o = self.typeOptions;

				util.loadDomData(e, o, [
					'default',
					'emptyLabel',
					'filterMin'
				]);
				util.loadDomToggleData(e, o, [
					'noSort',
					'overflowTooltips'
				]);
			},

			_keyDownNavigate: function (ev) {
				var self = this,
					panel = self.panel,
					selectionClass = self.sectionClass,
					which = ev.which;

				/*
				 * special handling for tab, does not perform any function (keeping for legacy)
				 */
				if(which === 9) {
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
					} else {
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
					} else {
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
					defaultValue =  { value: self.typeOptions['default']};

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

				self._handleItemNotFound();

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
				} else {
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
				} else {
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
					o = self.typeOptions;

				if(o.emptyLabel !== '' && !o.emptyLabel){
					return;
				}

				self.source.unshift({
					label: o.emptyLabel,
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

				if (!self.typeOptions.noSort) {
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

					if(self.typeOptions.overflowTooltips) {
						option.on('mouseenter', function() {
							if(this.offsetWidth < this.scrollWidth) {
								$(this).attr('title', item.label);
							} else {
								$(this).removeAttr('title');
							}
						});
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
					} else {
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
					e = self.element,
					o = self.typeOptions;

				// Reload settings
				self._getTypeOptions();

				// Clear any selected option
				self.clear(true);

				// Setup the new options
				self.loaded = $.Deferred();
				self.load().done(function (source) {
					if (!source) {
						source = [];
					}
					self.source = source;

					self._buildOptions();

					/*
					 * hide the filter if less then five items are returned
					 */
					if (self.filter && self.filter.data('inputField')) {
						if(source.length < o.filterMin) {
							self.filter.inputField('hide');
						} else {
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
						o = self.typeOptions,
						data = self.map(rawdata);

					if(!rawdata && typeof o['default'] !== 'undefined') {
						data = self.map(o['default']);
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
		var util = $.formBuilder.util;

		types.time = {
			attributes: ['step', 'military','storeUtc'],
			momentStoreFormat: 'HH:mm',

			_regex: /^((0[0-9])|([0-9])|(1[0-2])):([0-5][0-9])((am)|(pm))$/,
			_regex2400: /^(([01]?[0-9])|(2[0-3])):[0-5][0-9]$/,

			setUp: function(ifw) {
				var self = this,
					e = ifw.element;

				// Setup options
				var o = self.typeOptions = {
					storeUtc: true
				};
				util.loadDomToggleData(e, o, ['military', 'storeUtc']);
				util.loadDomData(e, o, ['step', 'storeUtc']);

				if(!self.typeOptions.military)
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
					step: o.step, //default is 30 and will be set if undefined
					timeFormat: o.military?'H:i':'g:ia'
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

					if(self.typeOptions.storeUtc) {
						// Convert utc back to local for display
						time.local();
					}

					return time.format(self.typeOptions.military? 'H:mm' : 'h:mma');
				},

				/**
				 * convert from moment format h:mma (local) to HH:mm (utc)
				 */
				fromField: function(val, ifw) {
					var self = this,
						time;

					if(!val || !val.match(self.typeOptions.military? self._regex2400 : self._regex)) {
						return '';
					}


					time = moment(val, self.typeOptions.military? 'H:mm' : 'h:mma').milliseconds(0);

					if(self.typeOptions.storeUtc) {
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

				valid = self.typeOptions.military? val.match(self._regex2400) : val.match(self._regex);

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

					// Day set order is required from highest -> lowest
					.year(localDateMoment.year())
					.month(localDateMoment.month())
					.date(localDateMoment.date());
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "data:application/vnd.ms-fontobject;base64,cAgAAMwHAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAApXqpcwAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxH8oAAAALwAAABgY21hcKCmoS0AAAEcAAAAfGdhc3AAAAAQAAABmAAAAAhnbHlm529ZBQAAAaAAAAO8aGVhZAa5O20AAAVcAAAANmhoZWEHwgPNAAAFlAAAACRobXR4IZIAQAAABbgAAAAwbG9jYQSuA7IAAAXoAAAAGm1heHAAFgA7AAAGBAAAACBuYW1lmUoJ+wAABiQAAAGGcG9zdAADAAAAAAesAAAAIAADA0kBkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOAtA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABABgAAAAFAAQAAMABAABACDgAeAF4BLgGuAq4C3//f//AAAAAAAg4ADgBOAS4BrgKuAt//3//wAB/+MgBCACH/Yf7x/gH94AAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACAAAAAAQAA6EABQAOAAAJAjUJAQcRIREhESERAQQA/gD+AAIAAgCA/wD/AP8AAYABcgGN/nOiAY3+c5T+gAEA/wABgAEgAAAJAAD/wAQAA8AABAAJAA4AEwAYAB0AIgAmAC4AABchESERATMVIzURMxUjNREzFSM1ATMVIzURMxUjNREzFSM1ASEVIREzETMRMxEhAAIA/gABQICAgICAgP8AgICAgICAAgABwP5AgMCA/kBABAD8AAOAgID/AICA/wCAgAIAgID/AICA/wCAgAFAQP2AAQD/AAJAAAAAAAEAAAIJAkkDUgATAAABFAcGIyEiJyY1NDcBNjMyFwEWFQJJCwsO/gAPCwsLAQALDw4LAQALAi4PCwsLCw8PCgEACwv/AAoPAAEAAAAuAkkBdwATAAABFAcBBiMiJwEmNTQ3NjMhMhcWFQJJC/8ACw4PC/8ACwsLDwIADgsLAVIPCv8ACwsBAAoPDwsLCwsPAAMAAP/AAwADwAAYACUAMAAAASEiDgIVERQeAjMhMj4CNRE0LgIjAyImNTQ2MzIWFRQGIyUhETQ2MyEyFhURAgD/ADVdRigoRl01AQA1XUYoKEZdNYAbJycbGycnGwEA/gBLNQEANUsDwChGXTX+ADVdRigoRl01AgA1XUYo/D4nGxsnJxsbJ8ICADVLSzX+AAAAAAADAED/wAPAA8AAAwAOABMAABchEyElNSEVIRU3IRc1ISsBNTMVwAKAQP0AAgD/AP7AQAMAQP7AQICAQALAwICAwEBAwEBAAAAEAAAAAAQAA4AAAwAYAB0AKgAAASEVIQUhIgYVERQWOwERIREzMjY1ETQmIwEhESERARQGIyImNTQ2MzIWFQEAAgD+AALA/IAaJiYawAIAwBomJhr/AP6AAYABDhsTExsbExMbA4CAQCYa/sAaJv8AAQAmGgFAGib9gAFA/sACIBMbGxMTGxsTAAAAAAIAAP/YA+gDwAAjADgAACUnLgEHPgE1NC4CIyIOAhUUHgIzMjY3BhYfAR4BNzYmJyUiLgI1ND4CMzIeAhUUDgIjA+DyEycQKzE8aYtQUItpPDxpi1BHgDIBEBHOG0sbGgQe/aA1XUYoKEZdNTVdRigoRl01Wc4REAEygEdQi2k8PGmLUFCLaTwxKxAnE/IeBBobSxvnKEZdNTVdRigoRl01NV1GKAAAAAEAAAAAAABzqXqlXw889QALBAAAAAAA0c17eAAAAADRzXt4AAD/wAQAA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAwEAAAAAAAAAAAAAAACAAAABAAAAAQAAAACSQAAAkkAAAMAAAAEAABABAAAAAQAAAAAAAAAAAoAFAAeAEIAjgCyANYBIAFEAYoB3gAAAAEAAAAMADkACQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v1.11.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:19Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper window is present,
			// execute the factory and get jQuery
			// For environments that do not inherently posses a window with a document
			// (such as Node.js), expose a jQuery-making factory as module.exports
			// This accentuates the need for the creation of a real window
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Can't do this because several apps including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	// Support: Firefox 18+
	//

	var deletedIds = [];

	var slice = deletedIds.slice;

	var concat = deletedIds.concat;

	var push = deletedIds.push;

	var indexOf = deletedIds.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "1.11.3",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1, IE<9
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray || function( obj ) {
			return jQuery.type(obj) === "array";
		},

		isWindow: function( obj ) {
			/* jshint eqeqeq: false */
			return obj != null && obj == obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		isPlainObject: function( obj ) {
			var key;

			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			} catch ( e ) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}

			// Support: IE<9
			// Handle iteration over inherited properties before own properties.
			if ( support.ownLast ) {
				for ( key in obj ) {
					return hasOwn.call( obj, key );
				}
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		// Workarounds based on findings by Jim Driscoll
		// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
		globalEval: function( data ) {
			if ( data && jQuery.trim( data ) ) {
				// We use execScript on Internet Explorer
				// We use an anonymous function so that context is window
				// rather than jQuery in Firefox
				( window.execScript || function( data ) {
					window[ "eval" ].call( window, data );
				} )( data );
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1, IE<9
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			var len;

			if ( arr ) {
				if ( indexOf ) {
					return indexOf.call( arr, elem, i );
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

				for ( ; i < len; i++ ) {
					// Skip accessing in sparse arrays
					if ( i in arr && arr[ i ] === elem ) {
						return i;
					}
				}
			}

			return -1;
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			while ( j < len ) {
				first[ i++ ] = second[ j++ ];
			}

			// Support: IE<9
			// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
			if ( len !== len ) {
				while ( second[j] !== undefined ) {
					first[ i++ ] = second[ j++ ];
				}
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var args, proxy, tmp;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: function() {
			return +( new Date() );
		},

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				ret = [],
				self = this,
				len = self.length;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id !== match[2] ) {
								return rootjQuery.find( selector );
							}

							// Otherwise, we inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				cur = elem[ dir ];

			while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
				if ( cur.nodeType === 1 ) {
					matched.push( cur );
				}
				cur = cur[dir];
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var r = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					r.push( n );
				}
			}

			return r;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var i,
				targets = jQuery( target, this ),
				len = targets.length;

			return this.filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within
		// the matched set of elements
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
			}

			// index in selector
			if ( typeof elem === "string" ) {
				return jQuery.inArray( this[0], jQuery( elem ) );
			}

			// Locate the position of the desired element
			return jQuery.inArray(
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem, this );
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		do {
			cur = cur[ dir ];
		} while ( cur && cur.nodeType !== 1 );

		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return jQuery.nodeName( elem, "iframe" ) ?
				elem.contentDocument || elem.contentWindow.document :
				jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var ret = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				ret = jQuery.filter( selector, ret );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					ret = jQuery.unique( ret );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					ret = ret.reverse();
				}
			}

			return this.pushStack( ret );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,
			// Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );

						} else if ( !(--remaining) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// if we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * Clean-up method for dom ready events
	 */
	function detach() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	}

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// we once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			// Standards-based browsers support DOMContentLoaded
			} else if ( document.addEventListener ) {
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );

			// If IE event model is used
			} else {
				// Ensure firing before onload, maybe late but safe also for iframes
				document.attachEvent( "onreadystatechange", completed );

				// A fallback to window.onload, that will always work
				window.attachEvent( "onload", completed );

				// If IE and not a frame
				// continually check to see if the document is ready
				var top = false;

				try {
					top = window.frameElement == null && document.documentElement;
				} catch(e) {}

				if ( top && top.doScroll ) {
					(function doScrollCheck() {
						if ( !jQuery.isReady ) {

							try {
								// Use the trick by Diego Perini
								// http://javascript.nwbox.com/IEContentLoaded/
								top.doScroll("left");
							} catch(e) {
								return setTimeout( doScrollCheck, 50 );
							}

							// detach all dom ready events
							detach();

							// and execute any waiting functions
							jQuery.ready();
						}
					})();
				}
			}
		}
		return readyList.promise( obj );
	};


	var strundefined = typeof undefined;



	// Support: IE<9
	// Iteration over object's inherited properties before its own
	var i;
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Note: most support tests are defined in their respective modules.
	// false until the test is run
	support.inlineBlockNeedsLayout = false;

	// Execute ASAP in case we need to set body.style.zoom
	jQuery(function() {
		// Minified: var a,b,c,d
		var val, div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Return for frameset docs that don't have a body
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		if ( typeof div.style.zoom !== strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

			support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
			if ( val ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );
	});




	(function() {
		var div = document.createElement( "div" );

		// Execute the test only if not already executed in another module.
		if (support.deleteExpando == null) {
			// Support: IE<9
			support.deleteExpando = true;
			try {
				delete div.test;
			} catch( e ) {
				support.deleteExpando = false;
			}
		}

		// Null elements to avoid leaks in IE.
		div = null;
	})();


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( elem ) {
		var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
			nodeType = +elem.nodeType || 1;

		// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
		return nodeType !== 1 && nodeType !== 9 ?
			false :

			// Nodes accept data unless otherwise specified; rejection can be conditional
			!noData || noData !== true && elem.getAttribute("classid") === noData;
	};


	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {

			var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				jQuery.data( elem, key, data );

			} else {
				data = undefined;
			}
		}

		return data;
	}

	// checks a cache object for emptiness
	function isEmptyDataObject( obj ) {
		var name;
		for ( name in obj ) {

			// if the public data object is empty, the private is still empty
			if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
				continue;
			}
			if ( name !== "toJSON" ) {
				return false;
			}
		}

		return true;
	}

	function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var ret, thisCache,
			internalKey = jQuery.expando,

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			// Avoid exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( typeof name === "string" ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	}

	function internalRemoveData( elem, name, pvt ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i,
			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				} else {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = name.concat( jQuery.map( name, jQuery.camelCase ) );
				}

				i = name.length;
				while ( i-- ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		/* jshint eqeqeq: false */
		} else if ( support.deleteExpando || cache != cache.window ) {
			/* jshint eqeqeq: true */
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	}

	jQuery.extend({
		cache: {},

		// The following elements (space-suffixed to avoid Object.prototype collisions)
		// throw uncatchable exceptions if you attempt to set expando properties
		noData: {
			"applet ": true,
			"embed ": true,
			// ...but Flash objects (which have this classid) *can* handle expandos
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},

		hasData: function( elem ) {
			elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
			return !!elem && !isEmptyDataObject( elem );
		},

		data: function( elem, name, data ) {
			return internalData( elem, name, data );
		},

		removeData: function( elem, name ) {
			return internalRemoveData( elem, name );
		},

		// For internal use only.
		_data: function( elem, name, data ) {
			return internalData( elem, name, data, true );
		},

		_removeData: function( elem, name ) {
			return internalRemoveData( elem, name, true );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[0],
				attrs = elem && elem.attributes;

			// Special expections of .data basically thwart jQuery.access,
			// so implement the relevant behavior ourselves

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = jQuery.data( elem );

					if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						jQuery._data( elem, "parsedAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					jQuery.data( this, key );
				});
			}

			return arguments.length > 1 ?

				// Sets one value
				this.each(function() {
					jQuery.data( this, key, value );
				}) :

				// Gets one value
				// Try to fetch any internally stored data first
				elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
		},

		removeData: function( key ) {
			return this.each(function() {
				jQuery.removeData( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = jQuery._data( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray(data) ) {
						queue = jQuery._data( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return jQuery._data( elem, key ) || jQuery._data( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					jQuery._removeData( elem, type + "queue" );
					jQuery._removeData( elem, key );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = jQuery._data( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};



	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	};
	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		// Minified: var a,b,c
		var input = document.createElement( "input" ),
			div = document.createElement( "div" ),
			fragment = document.createDocumentFragment();

		// Setup
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

		// IE strips leading whitespace when .innerHTML is used
		support.leadingWhitespace = div.firstChild.nodeType === 3;

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		support.tbody = !div.getElementsByTagName( "tbody" ).length;

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		support.html5Clone =
			document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

		// Check if a disconnected checkbox will retain its checked
		// value of true after appended to the DOM (IE6/7)
		input.type = "checkbox";
		input.checked = true;
		fragment.appendChild( input );
		support.appendChecked = input.checked;

		// Make sure textarea (and checkbox) defaultValue is properly cloned
		// Support: IE6-IE11+
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

		// #11217 - WebKit loses check when the name is after the checked attribute
		fragment.appendChild( div );
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

		// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
		// old WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<9
		// Opera does not clone events (and typeof div.attachEvent === undefined).
		// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
		support.noCloneEvent = true;
		if ( div.attachEvent ) {
			div.attachEvent( "onclick", function() {
				support.noCloneEvent = false;
			});

			div.cloneNode( true ).click();
		}

		// Execute the test only if not already executed in another module.
		if (support.deleteExpando == null) {
			// Support: IE<9
			support.deleteExpando = true;
			try {
				delete div.test;
			} catch( e ) {
				support.deleteExpando = false;
			}
		}
	})();


	(function() {
		var i, eventName,
			div = document.createElement( "div" );

		// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
		for ( i in { submit: true, change: true, focusin: true }) {
			eventName = "on" + i;

			if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
				// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
				div.setAttribute( eventName, "t" );
				support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
			}
		}

		// Null elements to avoid leaks in IE.
		div = null;
	})();


	var rformElems = /^(?:input|select|textarea)$/i,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {
			var tmp, events, t, handleObjIn,
				special, eventHandle, handleObj,
				handlers, type, namespaces, origType,
				elemData = jQuery._data( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
						jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
						undefined;
				};
				// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
				eventHandle.elem = elem;
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener/attachEvent if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						// Bind the global event handler to the element
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );

						} else if ( elem.attachEvent ) {
							elem.attachEvent( "on" + type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

			// Nullify elem to prevent memory leaks in IE
			elem = null;
		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
			var j, handleObj, tmp,
				origCount, t, events,
				special, handlers, type,
				namespaces, origType,
				elemData = jQuery.hasData( elem ) && jQuery._data( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;

				// removeData also checks for emptiness and clears the expando if empty
				// so use it instead of delete
				jQuery._removeData( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {
			var handle, ontype, cur,
				bubbleType, special, tmp, i,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Can't use an .isFunction() check here because IE6/7 fails that test.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						try {
							elem[ type ]();
						} catch ( e ) {
							// IE<9 dies on focus/blur to hidden element (#1486,#12518)
							// only reproducible on winXP IE8 native, not IE9 in IE8 mode
						}
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, ret, handleObj, matched, j,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var sel, handleObj, matches, i,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				/* jshint eqeqeq: false */
				for ( ; cur != this; cur = cur.parentNode || this ) {
					/* jshint eqeqeq: true */

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: IE<9
			// Fix target property (#1925)
			if ( !event.target ) {
				event.target = originalEvent.srcElement || document;
			}

			// Support: Chrome 23+, Safari?
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			// Support: IE<9
			// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
			event.metaKey = !!event.metaKey;

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var body, eventDoc, doc,
					button = original.button,
					fromElement = original.fromElement;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add relatedTarget, if necessary
				if ( !event.relatedTarget && fromElement ) {
					event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						try {
							this.focus();
							return false;
						} catch ( e ) {
							// Support: IE<9
							// If we error on focus to hidden element (#1486, #12518),
							// let .trigger() run the handlers
						}
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = document.removeEventListener ?
		function( elem, type, handle ) {
			if ( elem.removeEventListener ) {
				elem.removeEventListener( type, handle, false );
			}
		} :
		function( elem, type, handle ) {
			var name = "on" + type;

			if ( elem.detachEvent ) {

				// #8545, #7054, preventing memory leaks for custom events in IE6-8
				// detachEvent needed property on element, by name of that event, to properly expose it to GC
				if ( typeof elem[ name ] === strundefined ) {
					elem[ name ] = null;
				}

				elem.detachEvent( name, handle );
			}
		};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: IE < 9, Android < 4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;
			if ( !e ) {
				return;
			}

			// If preventDefault exists, run it on the original event
			if ( e.preventDefault ) {
				e.preventDefault();

			// Support: IE
			// Otherwise set the returnValue property of the original event to false
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;
			if ( !e ) {
				return;
			}
			// If stopPropagation exists, run it on the original event
			if ( e.stopPropagation ) {
				e.stopPropagation();
			}

			// Support: IE
			// Set the cancelBubble property of the original event to true
			e.cancelBubble = true;
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// IE submit delegation
	if ( !support.submitBubbles ) {

		jQuery.event.special.submit = {
			setup: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}

				// Lazy-add a submit handler when a descendant form may potentially be submitted
				jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
					// Node name check avoids a VML-related crash in IE (#9807)
					var elem = e.target,
						form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
					if ( form && !jQuery._data( form, "submitBubbles" ) ) {
						jQuery.event.add( form, "submit._submit", function( event ) {
							event._submit_bubble = true;
						});
						jQuery._data( form, "submitBubbles", true );
					}
				});
				// return undefined since we don't need an event listener
			},

			postDispatch: function( event ) {
				// If form was submitted by the user, bubble the event up the tree
				if ( event._submit_bubble ) {
					delete event._submit_bubble;
					if ( this.parentNode && !event.isTrigger ) {
						jQuery.event.simulate( "submit", this.parentNode, event, true );
					}
				}
			},

			teardown: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}

				// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
				jQuery.event.remove( this, "._submit" );
			}
		};
	}

	// IE change delegation and checkbox/radio fix
	if ( !support.changeBubbles ) {

		jQuery.event.special.change = {

			setup: function() {

				if ( rformElems.test( this.nodeName ) ) {
					// IE doesn't fire change on a check/radio until blur; trigger it on click
					// after a propertychange. Eat the blur-change in special.change.handle.
					// This still fires onchange a second time for check/radio after blur.
					if ( this.type === "checkbox" || this.type === "radio" ) {
						jQuery.event.add( this, "propertychange._change", function( event ) {
							if ( event.originalEvent.propertyName === "checked" ) {
								this._just_changed = true;
							}
						});
						jQuery.event.add( this, "click._change", function( event ) {
							if ( this._just_changed && !event.isTrigger ) {
								this._just_changed = false;
							}
							// Allow triggered, simulated change events (#11500)
							jQuery.event.simulate( "change", this, event, true );
						});
					}
					return false;
				}
				// Delegated event; lazy-add a change handler on descendant inputs
				jQuery.event.add( this, "beforeactivate._change", function( e ) {
					var elem = e.target;

					if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
						jQuery.event.add( elem, "change._change", function( event ) {
							if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
								jQuery.event.simulate( "change", this.parentNode, event, true );
							}
						});
						jQuery._data( elem, "changeBubbles", true );
					}
				});
			},

			handle: function( event ) {
				var elem = event.target;

				// Swallow native change events from checkbox/radio, we already triggered them above
				if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
					return event.handleObj.handler.apply( this, arguments );
				}
			},

			teardown: function() {
				jQuery.event.remove( this, "._change" );

				return !rformElems.test( this.nodeName );
			}
		};
	}

	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = jQuery._data( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = jQuery._data( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						jQuery._removeData( doc, fix );
					} else {
						jQuery._data( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var type, origFn;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	function createSafeFragment( document ) {
		var list = nodeNames.split( "|" ),
			safeFrag = document.createDocumentFragment();

		if ( safeFrag.createElement ) {
			while ( list.length ) {
				safeFrag.createElement(
					list.pop()
				);
			}
		}
		return safeFrag;
	}

	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		rleadingWhitespace = /^\s+/,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
			legend: [ 1, "<fieldset>", "</fieldset>" ],
			area: [ 1, "<map>", "</map>" ],
			param: [ 1, "<object>", "</object>" ],
			thead: [ 1, "<table>", "</table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
			// unless wrapped in a div with non-breaking characters in front of it.
			_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
		},
		safeFragment = createSafeFragment( document ),
		fragmentDiv = safeFragment.appendChild( document.createElement("div") );

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll( context, tag ) {
		var elems, elem,
			i = 0,
			found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
				undefined;

		if ( !found ) {
			for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
				if ( !tag || jQuery.nodeName( elem, tag ) ) {
					found.push( elem );
				} else {
					jQuery.merge( found, getAll( elem, tag ) );
				}
			}
		}

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], found ) :
			found;
	}

	// Used in buildFragment, fixes the defaultChecked property
	function fixDefaultChecked( elem ) {
		if ( rcheckableType.test( elem.type ) ) {
			elem.defaultChecked = elem.checked;
		}
	}

	// Support: IE<8
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
		if ( match ) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}
		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var elem,
			i = 0;
		for ( ; (elem = elems[i]) != null; i++ ) {
			jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
		}
	}

	function cloneCopyEvent( src, dest ) {

		if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
			return;
		}

		var type, i, l,
			oldData = jQuery._data( src ),
			curData = jQuery._data( dest, oldData ),
			events = oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}

		// make the cloned public data object a copy from the original
		if ( curData.data ) {
			curData.data = jQuery.extend( {}, curData.data );
		}
	}

	function fixCloneNodeIssues( src, dest ) {
		var nodeName, e, data;

		// We do not need to do anything for non-Elements
		if ( dest.nodeType !== 1 ) {
			return;
		}

		nodeName = dest.nodeName.toLowerCase();

		// IE6-8 copies events bound via attachEvent when using cloneNode.
		if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
			data = jQuery._data( dest );

			for ( e in data.events ) {
				jQuery.removeEvent( dest, e, data.handle );
			}

			// Event data gets referenced instead of copied if the expando gets copied too
			dest.removeAttribute( jQuery.expando );
		}

		// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
		if ( nodeName === "script" && dest.text !== src.text ) {
			disableScript( dest ).text = src.text;
			restoreScript( dest );

		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		} else if ( nodeName === "object" ) {
			if ( dest.parentNode ) {
				dest.outerHTML = src.outerHTML;
			}

			// This path appears unavoidable for IE9. When cloning an object
			// element in IE9, the outerHTML strategy above is not sufficient.
			// If the src has innerHTML and the destination does not,
			// copy the src.innerHTML into the dest.innerHTML. #10324
			if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
				dest.innerHTML = src.innerHTML;
			}

		} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			// IE6-8 fails to persist the checked state of a cloned checkbox
			// or radio button. Worse, IE6-7 fail to give the cloned element
			// a checked appearance if the defaultChecked value isn't also set

			dest.defaultChecked = dest.checked = src.checked;

			// IE6-7 get confused and end up setting the value of a cloned
			// checkbox/radio button to an empty string instead of "on"
			if ( dest.value !== src.value ) {
				dest.value = src.value;
			}

		// IE6-8 fails to return the selected option to the default selected
		// state when cloning options
		} else if ( nodeName === "option" ) {
			dest.defaultSelected = dest.selected = src.defaultSelected;

		// IE6-8 fails to set the defaultValue to the correct value when
		// cloning other types of input fields
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var destElements, node, clone, i, srcElements,
				inPage = jQuery.contains( elem.ownerDocument, elem );

			if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
				clone = elem.cloneNode( true );

			// IE<=8 does not properly clone detached, unknown element nodes
			} else {
				fragmentDiv.innerHTML = elem.outerHTML;
				fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
			}

			if ( (!support.noCloneEvent || !support.noCloneChecked) &&
					(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				// Fix all IE cloning issues
				for ( i = 0; (node = srcElements[i]) != null; ++i ) {
					// Ensure that the destination node is not null; Fixes #9587
					if ( destElements[i] ) {
						fixCloneNodeIssues( node, destElements[i] );
					}
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0; (node = srcElements[i]) != null; i++ ) {
						cloneCopyEvent( node, destElements[i] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			destElements = srcElements = node = null;

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var j, elem, contains,
				tmp, tag, tbody, wrap,
				l = elems.length,

				// Ensure a safe fragment
				safe = createSafeFragment( context ),

				nodes = [],
				i = 0;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || safe.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;

						tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

						// Descend through wrappers to the right content
						j = wrap[0];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Manually add leading whitespace removed by IE
						if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
							nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
						}

						// Remove IE's autoinserted <tbody> from table fragments
						if ( !support.tbody ) {

							// String was a <table>, *may* have spurious <tbody>
							elem = tag === "table" && !rtbody.test( elem ) ?
								tmp.firstChild :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !rtbody.test( elem ) ?
									tmp :
									0;

							j = elem && elem.childNodes.length;
							while ( j-- ) {
								if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
									elem.removeChild( tbody );
								}
							}
						}

						jQuery.merge( nodes, tmp.childNodes );

						// Fix #12392 for WebKit and IE > 9
						tmp.textContent = "";

						// Fix #12392 for oldIE
						while ( tmp.firstChild ) {
							tmp.removeChild( tmp.firstChild );
						}

						// Remember the top-level container for proper cleanup
						tmp = safe.lastChild;
					}
				}
			}

			// Fix #11356: Clear elements from fragment
			if ( tmp ) {
				safe.removeChild( tmp );
			}

			// Reset defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			if ( !support.appendChecked ) {
				jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
			}

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( safe.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			tmp = null;

			return safe;
		},

		cleanData: function( elems, /* internal */ acceptData ) {
			var elem, type, id, data,
				i = 0,
				internalKey = jQuery.expando,
				cache = jQuery.cache,
				deleteExpando = support.deleteExpando,
				special = jQuery.event.special;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( acceptData || jQuery.acceptData( elem ) ) {

					id = elem[ internalKey ];
					data = id && cache[ id ];

					if ( data ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Remove cache only if it was not already removed by jQuery.event.remove
						if ( cache[ id ] ) {

							delete cache[ id ];

							// IE does not allow us to delete expando properties from nodes,
							// nor does it have a removeAttribute function on Document nodes;
							// we must handle all of these cases
							if ( deleteExpando ) {
								delete elem[ internalKey ];

							} else if ( typeof elem.removeAttribute !== strundefined ) {
								elem.removeAttribute( internalKey );

							} else {
								elem[ internalKey ] = null;
							}

							deletedIds.push( id );
						}
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {

				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				// Remove element nodes and prevent memory leaks
				if ( elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem, false ) );
				}

				// Remove any remaining nodes
				while ( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
				}

				// If this is a select, ensure that it displays empty (#12336)
				// Support: IE<9
				if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
					elem.options.length = 0;
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined ) {
					return elem.nodeType === 1 ?
						elem.innerHTML.replace( rinlinejQuery, "" ) :
						undefined;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
					( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
					!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for (; i < l; i++ ) {
							// Remove element nodes and prevent memory leaks
							elem = this[i] || {};
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch(e) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var first, node, hasScripts,
				scripts, doc, fragment,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[0] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[i], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
								}
							}
						}
					}

					// Fix #11809: Avoid leaking memory
					fragment = first = null;
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				i = 0,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone(true);
				jQuery( insert[i] )[ original ]( elems );

				// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optmization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}


	(function() {
		var shrinkWrapBlocksVal;

		support.shrinkWrapBlocks = function() {
			if ( shrinkWrapBlocksVal != null ) {
				return shrinkWrapBlocksVal;
			}

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			// Minified: var b,c,d
			var div, body, container;

			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body || !body.style ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			// Setup
			div = document.createElement( "div" );
			container = document.createElement( "div" );
			container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
			body.appendChild( container ).appendChild( div );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			if ( typeof div.style.zoom !== strundefined ) {
				// Reset CSS: box-sizing; display; margin; border
				div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;" +
					"padding:1px;width:1px;zoom:1";
				div.appendChild( document.createElement( "div" ) ).style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			return shrinkWrapBlocksVal;
		};

	})();
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



	var getStyles, curCSS,
		rposition = /^(top|right|bottom|left)$/;

	if ( window.getComputedStyle ) {
		getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};

		curCSS = function( elem, name, computed ) {
			var width, minWidth, maxWidth, ret,
				style = elem.style;

			computed = computed || getStyles( elem );

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

			if ( computed ) {

				if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
					ret = jQuery.style( elem, name );
				}

				// A tribute to the "awesome hack by Dean Edwards"
				// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
				// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
				// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
				if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

					// Remember the original values
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;

					// Put in the new values to get a computed value out
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;

					// Revert the changed values
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}

			// Support: IE
			// IE returns zIndex value as an integer.
			return ret === undefined ?
				ret :
				ret + "";
		};
	} else if ( document.documentElement.currentStyle ) {
		getStyles = function( elem ) {
			return elem.currentStyle;
		};

		curCSS = function( elem, name, computed ) {
			var left, rs, rsLeft, ret,
				style = elem.style;

			computed = computed || getStyles( elem );
			ret = computed ? computed[ name ] : undefined;

			// Avoid setting ret to empty string here
			// so we don't default to auto
			if ( ret == null && style && style[ name ] ) {
				ret = style[ name ];
			}

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			// but not position css attributes, as those are proportional to the parent element instead
			// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
			if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

				// Remember the original values
				left = style.left;
				rs = elem.runtimeStyle;
				rsLeft = rs && rs.left;

				// Put in the new values to get a computed value out
				if ( rsLeft ) {
					rs.left = elem.currentStyle.left;
				}
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				if ( rsLeft ) {
					rs.left = rsLeft;
				}
			}

			// Support: IE
			// IE returns zIndex value as an integer.
			return ret === undefined ?
				ret :
				ret + "" || "auto";
		};
	}




	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				var condition = conditionFn();

				if ( condition == null ) {
					// The test was not ready at this point; screw the hook this time
					// but check again when needed next time.
					return;
				}

				if ( condition ) {
					// Hook not needed (or it's not possible to use it due to missing dependency),
					// remove it.
					// Since there are no other hooks for marginRight, remove the whole object.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.

				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		// Minified: var b,c,d,e,f,g, h,i
		var div, style, a, pixelPositionVal, boxSizingReliableVal,
			reliableHiddenOffsetsVal, reliableMarginRightVal;

		// Setup
		div = document.createElement( "div" );
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName( "a" )[ 0 ];
		style = a && a.style;

		// Finish early in limited (non-browser) environments
		if ( !style ) {
			return;
		}

		style.cssText = "float:left;opacity:.5";

		// Support: IE<9
		// Make sure that element opacity exists (as opposed to filter)
		support.opacity = style.opacity === "0.5";

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		support.cssFloat = !!style.cssFloat;

		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		// Support: Firefox<29, Android 2.3
		// Vendor-prefix box-sizing
		support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
			style.WebkitBoxSizing === "";

		jQuery.extend(support, {
			reliableHiddenOffsets: function() {
				if ( reliableHiddenOffsetsVal == null ) {
					computeStyleTests();
				}
				return reliableHiddenOffsetsVal;
			},

			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},

			pixelPosition: function() {
				if ( pixelPositionVal == null ) {
					computeStyleTests();
				}
				return pixelPositionVal;
			},

			// Support: Android 2.3
			reliableMarginRight: function() {
				if ( reliableMarginRightVal == null ) {
					computeStyleTests();
				}
				return reliableMarginRightVal;
			}
		});

		function computeStyleTests() {
			// Minified: var b,c,d,j
			var div, body, container, contents;

			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body || !body.style ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			// Setup
			div = document.createElement( "div" );
			container = document.createElement( "div" );
			container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
			body.appendChild( container ).appendChild( div );

			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";

			// Support: IE<9
			// Assume reasonable values in the absence of getComputedStyle
			pixelPositionVal = boxSizingReliableVal = false;
			reliableMarginRightVal = true;

			// Check for getComputedStyle so that this code is not run in IE<9.
			if ( window.getComputedStyle ) {
				pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
				boxSizingReliableVal =
					( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

				// Support: Android 2.3
				// Div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				contents = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				contents.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				contents.style.marginRight = contents.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

				div.removeChild( contents );
			}

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}

			body.removeChild( container );
		}

	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
			ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity\s*=\s*([^)]*)/,

		// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// check for vendor prefixed names
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = jQuery._data( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// at this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// at this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// at this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// we need the check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": support.cssFloat ? "cssFloat" : "styleFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// convert relative number strings (+= or -=) to relative numbers. #7345
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set. See: #7116
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
				// but it would mean to define eight (for every problematic property) identical functions
				if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

					// Support: IE
					// Swallow errors from 'invalid' CSS values (#5509)
					try {
						style[ name ] = value;
					} catch(e) {}
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var num, val, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			//convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Return, converting to number if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
					// certain elements can have dimension info if we invisibly show them
					// however, it must have a current display style that would benefit from this
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	if ( !support.opacity ) {
		jQuery.cssHooks.opacity = {
			get: function( elem, computed ) {
				// IE uses filters for opacity
				return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
			},

			set: function( elem, value ) {
				var style = elem.style,
					currentStyle = elem.currentStyle,
					opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
					filter = currentStyle && currentStyle.filter || style.filter || "";

				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				style.zoom = 1;

				// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
				// if value === "", then remove inline opacity #12685
				if ( ( value >= 1 || value === "" ) &&
						jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
						style.removeAttribute ) {

					// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
					// if "filter:" is present at all, clearType is disabled, we want to avoid this
					// style.removeAttribute is IE Only, but so apparently is this code path...
					style.removeAttribute( "filter" );

					// if there is no filter style applied in a css rule or unset inline opacity, we are done
					if ( value === "" || currentStyle && !currentStyle.filter ) {
						return;
					}
				}

				// otherwise, set new filter values
				style.filter = ralpha.test( filter ) ?
					filter.replace( ralpha, opacity ) :
					filter + " " + opacity;
			}
		};
	}

	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails
				// so, simple values such as "10px" are parsed to Float.
				// complex values such as "rotate(1rad)" are returned as is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// use step hook for back compat - use cssHook if its there - use .style if its
				// available and use plain properties where available
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9
	// Panic based approach to setting things on disconnected nodes

	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			attrs = { height: type },
			i = 0;

		// if we include width, step value is 1 to do all cssExpand values,
		// if we don't include width, step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// we're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = jQuery._data( elem, "fxshow" );

		// handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// doing this makes sure that the complete handler will be called
				// before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE does not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

				// inline-level elements accept inline-block;
				// block-level elements need to be inline with layout
				if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
					style.display = "inline-block";
				} else {
					style.zoom = 1;
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			if ( !support.shrinkWrapBlocks() ) {
				anim.always(function() {
					style.overflow = opts.overflow[ 0 ];
					style.overflowX = opts.overflow[ 1 ];
					style.overflowY = opts.overflow[ 2 ];
				});
			}
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = jQuery._data( elem, "fxshow", {} );
			}

			// store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;
				jQuery._removeData( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// not quite $.extend, this wont overwrite keys already present.
				// also - reusing 'index' from above because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// if we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// resolve when we played the last frame
					// otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || jQuery._data( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = jQuery._data( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// start the next in the queue if the last step wasn't forced
				// timers currently will call their complete callbacks, which will dequeue
				// but only if they were gotoEnd
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = jQuery._data( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// enable finishing flag on private data
				data.finish = true;

				// empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		// Minified: var a,b,c,d,e
		var input, div, select, a, opt;

		// Setup
		div = document.createElement( "div" );
		div.setAttribute( "className", "t" );
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[ 0 ];

		// First batch of tests.
		select = document.createElement("select");
		opt = select.appendChild( document.createElement("option") );
		input = div.getElementsByTagName("input")[ 0 ];

		a.style.cssText = "top:1px";

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		support.getSetAttribute = div.className !== "t";

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		support.style = /top/.test( a.getAttribute("style") );

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		support.hrefNormalized = a.getAttribute("href") === "/a";

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		support.checkOn = !!input.value;

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		support.optSelected = opt.selected;

		// Tests for enctype support on a form (#6743)
		support.enctype = !!document.createElement("form").enctype;

		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE8 only
		// Check if we can trust getAttribute("value")
		input = document.createElement( "input" );
		input.setAttribute( "value", "" );
		support.input = input.getAttribute( "value" ) === "";

		// Check if an input maintains its value after becoming a radio
		input.value = "t";
		input.setAttribute( "type", "radio" );
		support.radioValue = input.value === "t";
	})();


	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
				} else if ( typeof val === "number" ) {
					val += "";
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// oldIE doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

							// Support: IE6
							// When new option element is added to select box we need to
							// force reflow of newly added node in order to workaround delay
							// of initialization properties
							try {
								option.selected = optionSet = true;

							} catch ( _ ) {

								// Will be executed only in IE6
								option.scrollHeight;
							}

						} else {
							option.selected = false;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}

					return options;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				// Support: Webkit
				// "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle,
		ruseDefault = /^(?:checked|selected)$/i,
		getSetAttribute = support.getSetAttribute,
		getSetInput = support.input;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
							elem[ propName ] = false;
						// Support: IE<9
						// Also clear defaultChecked/defaultSelected (if appropriate)
						} else {
							elem[ jQuery.camelCase( "default-" + name ) ] =
								elem[ propName ] = false;
						}

					// See #9699 for explanation of this approach (setting first, then removal)
					} else {
						jQuery.attr( elem, name, "" );
					}

					elem.removeAttribute( getSetAttribute ? name : propName );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
						// Setting the type on a radio button after the value resets the value in IE6-9
						// Reset value to default in case type is set after value during creation
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hook for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
				// IE<8 needs the *property* name
				elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

			// Use defaultChecked and defaultSelected for oldIE
			} else {
				elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
			}

			return name;
		}
	};

	// Retrieve booleans specially
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
			function( elem, name, isXML ) {
				var ret, handle;
				if ( !isXML ) {
					// Avoid an infinite loop by temporarily removing this function from the getter
					handle = attrHandle[ name ];
					attrHandle[ name ] = ret;
					ret = getter( elem, name, isXML ) != null ?
						name.toLowerCase() :
						null;
					attrHandle[ name ] = handle;
				}
				return ret;
			} :
			function( elem, name, isXML ) {
				if ( !isXML ) {
					return elem[ jQuery.camelCase( "default-" + name ) ] ?
						name.toLowerCase() :
						null;
				}
			};
	});

	// fix oldIE attroperties
	if ( !getSetInput || !getSetAttribute ) {
		jQuery.attrHooks.value = {
			set: function( elem, value, name ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					// Does not return so that setAttribute is also used
					elem.defaultValue = value;
				} else {
					// Use nodeHook if defined (#1954); otherwise setAttribute is fine
					return nodeHook && nodeHook.set( elem, value, name );
				}
			}
		};
	}

	// IE6/7 do not support getting/setting some attributes with get/setAttribute
	if ( !getSetAttribute ) {

		// Use this for any attribute in IE6/7
		// This fixes almost every IE6/7 issue
		nodeHook = {
			set: function( elem, value, name ) {
				// Set the existing or create a new attribute node
				var ret = elem.getAttributeNode( name );
				if ( !ret ) {
					elem.setAttributeNode(
						(ret = elem.ownerDocument.createAttribute( name ))
					);
				}

				ret.value = value += "";

				// Break association with cloned elements by also using setAttribute (#9646)
				if ( name === "value" || value === elem.getAttribute( name ) ) {
					return value;
				}
			}
		};

		// Some attributes are constructed with empty-string values when not defined
		attrHandle.id = attrHandle.name = attrHandle.coords =
			function( elem, name, isXML ) {
				var ret;
				if ( !isXML ) {
					return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
						ret.value :
						null;
				}
			};

		// Fixing value retrieval on a button requires this module
		jQuery.valHooks.button = {
			get: function( elem, name ) {
				var ret = elem.getAttributeNode( name );
				if ( ret && ret.specified ) {
					return ret.value;
				}
			},
			set: nodeHook.set
		};

		// Set contenteditable to false on removals(#10429)
		// Setting to empty string throws an error as an invalid value
		jQuery.attrHooks.contenteditable = {
			set: function( elem, value, name ) {
				nodeHook.set( elem, value === "" ? false : value, name );
			}
		};

		// Set width and height to auto instead of 0 on empty string( Bug #8150 )
		// This is for removals
		jQuery.each([ "width", "height" ], function( i, name ) {
			jQuery.attrHooks[ name ] = {
				set: function( elem, value ) {
					if ( value === "" ) {
						elem.setAttribute( name, "auto" );
						return value;
					}
				}
			};
		});
	}

	if ( !support.style ) {
		jQuery.attrHooks.style = {
			get: function( elem ) {
				// Return undefined in the case of empty string
				// Note: IE uppercases css property names, but if we were to .toLowerCase()
				// .cssText, that would destroy case senstitivity in URL's, like in "background"
				return elem.style.cssText || undefined;
			},
			set: function( elem, value ) {
				return ( elem.style.cssText = value + "" );
			}
		};
	}




	var rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			name = jQuery.propFix[ name ] || name;
			return this.each(function() {
				// try/catch handles cases where IE balks (such as removing a property on window)
				try {
					this[ name ] = undefined;
					delete this[ name ];
				} catch( e ) {}
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
				}
			}
		}
	});

	// Some attributes require a special call on IE
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !support.hrefNormalized ) {
		// href/src property should get the full normalized URL (#10299/#12915)
		jQuery.each([ "href", "src" ], function( i, name ) {
			jQuery.propHooks[ name ] = {
				get: function( elem ) {
					return elem.getAttribute( name, 4 );
				}
			};
		});
	}

	// Support: Safari, IE9+
	// mis-reports the default selected property of an option
	// Accessing the parent's selectedIndex property fixes it
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;

				if ( parent ) {
					parent.selectedIndex;

					// Make sure that it also works with optgroups, see #5701
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});

	// IE6/7 call enctype encoding
	if ( !support.enctype ) {
		jQuery.propFix.enctype = "encoding";
	}




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				i = 0,
				len = this.length,
				proceed = arguments.length === 0 || typeof value === "string" && value;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						jQuery._data( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed "false",
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

	jQuery.parseJSON = function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			// Support: Android 2.3
			// Workaround failure to string-cast null input
			return window.JSON.parse( data + "" );
		}

		var requireNonComma,
			depth = null,
			str = jQuery.trim( data + "" );

		// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
		// after removing valid tokens
		return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

			// Force termination if we see a misplaced comma
			if ( requireNonComma && comma ) {
				depth = 0;
			}

			// Perform no more replacements after returning to outermost depth
			if ( depth === 0 ) {
				return token;
			}

			// Commas must not follow "[", "{", or ","
			requireNonComma = open || comma;

			// Determine new depth
			// array/object open ("[" or "{"): depth += true - false (increment)
			// array/object close ("]" or "}"): depth += false - true (decrement)
			// other cases ("," or primitive): depth += true - true (numeric cast)
			depth += !close - !open;

			// Remove this token
			return "";
		}) ) ?
			( Function( "return " + str ) )() :
			jQuery.error( "Invalid JSON: " + data );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data, "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		// Document location
		ajaxLocParts,
		ajaxLocation,

		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*");

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType.charAt( 0 ) === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var deep, key,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
		var firstDataType, ct, finalDataType, type,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var // Cross-domain detection vars
				parts,
				// Loop variable
				i,
				// URL without anti-cache param
				cacheURL,
				// Response headers as string
				responseHeadersString,
				// timeout handle
				timeoutTimer,

				// To know if global events are to be dispatched
				fireGlobals,

				transport,
				// Response headers
				responseHeaders,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapAll( html.call(this, i) );
				});
			}

			if ( this[0] ) {
				// The elements to wrap the target around
				var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

				if ( this[0].parentNode ) {
					wrap.insertBefore( this[0] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
						elem = elem.firstChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function(i) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!support.reliableHiddenOffsets() &&
				((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;
				// Use .is(":disabled") so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	// Create the request object
	// (This is still attached to ajaxSettings for backward compatibility)
	jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
		// Support: IE6+
		function() {

			// XHR cannot access local files, always use ActiveX for that case
			return !this.isLocal &&

				// Support: IE7-8
				// oldIE XHR does not support non-RFC2616 methods (#13240)
				// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
				// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
				// Although this check for six methods instead of eight
				// since IE also does not support "trace" and "connect"
				/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

				createStandardXHR() || createActiveXHR();
		} :
		// For all other browsers, use the standard XMLHttpRequest object
		createStandardXHR;

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE<10
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]( undefined, true );
			}
		});
	}

	// Determine support properties
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	xhrSupported = support.ajax = !!xhrSupported;

	// Create transport if the browser can provide an xhr
	if ( xhrSupported ) {

		jQuery.ajaxTransport(function( options ) {
			// Cross domain only allowed if supported through XMLHttpRequest
			if ( !options.crossDomain || support.cors ) {

				var callback;

				return {
					send: function( headers, complete ) {
						var i,
							xhr = options.xhr(),
							id = ++xhrId;

						// Open the socket
						xhr.open( options.type, options.url, options.async, options.username, options.password );

						// Apply custom fields if provided
						if ( options.xhrFields ) {
							for ( i in options.xhrFields ) {
								xhr[ i ] = options.xhrFields[ i ];
							}
						}

						// Override mime type if needed
						if ( options.mimeType && xhr.overrideMimeType ) {
							xhr.overrideMimeType( options.mimeType );
						}

						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if ( !options.crossDomain && !headers["X-Requested-With"] ) {
							headers["X-Requested-With"] = "XMLHttpRequest";
						}

						// Set headers
						for ( i in headers ) {
							// Support: IE<9
							// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
							// request header to a null-value.
							//
							// To keep consistent with other XHR implementations, cast the value
							// to string and ignore `undefined`.
							if ( headers[ i ] !== undefined ) {
								xhr.setRequestHeader( i, headers[ i ] + "" );
							}
						}

						// Do send the request
						// This may raise an exception which is actually
						// handled in jQuery.ajax (so no try/catch here)
						xhr.send( ( options.hasContent && options.data ) || null );

						// Listener
						callback = function( _, isAbort ) {
							var status, statusText, responses;

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
								// Clean up
								delete xhrCallbacks[ id ];
								callback = undefined;
								xhr.onreadystatechange = jQuery.noop;

								// Abort manually if needed
								if ( isAbort ) {
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;

									// Support: IE<10
									// Accessing binary-data responseText throws an exception
									// (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && options.isLocal && !options.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}

							// Call complete if needed
							if ( responses ) {
								complete( status, statusText, responses, xhr.getAllResponseHeaders() );
							}
						};

						if ( !options.async ) {
							// if we're in sync mode we fire the callback
							callback();
						} else if ( xhr.readyState === 4 ) {
							// (IE6 & IE7) if it's in cache and has been
							// retrieved directly we need to fire the callback
							setTimeout( callback );
						} else {
							// Add to the list of active xhr callbacks
							xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
						}
					},

					abort: function() {
						if ( callback ) {
							callback( undefined, true );
						}
					}
				};
			}
		});
	}

	// Functions to create xhrs
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}

	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and global
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
			s.global = false;
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function(s) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {

			var script,
				head = document.head || jQuery("head")[0] || document.documentElement;

			return {

				send: function( _, callback ) {

					script = document.createElement("script");

					script.async = true;

					if ( s.scriptCharset ) {
						script.charset = s.scriptCharset;
					}

					script.src = s.url;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function( _, isAbort ) {

						if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;

							// Remove the script
							if ( script.parentNode ) {
								script.parentNode.removeChild( script );
							}

							// Dereference the script
							script = null;

							// Callback if not abort
							if ( !isAbort ) {
								callback( 200, "success" );
							}
						}
					};

					// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					head.insertBefore( script, head.firstChild );
				},

				abort: function() {
					if ( script ) {
						script.onload( undefined, true );
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, response, type,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off, url.length ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};





	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ?
			elem :
			elem.nodeType === 9 ?
				elem.defaultView || elem.parentWindow :
				false;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

			// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );
			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				box = { top: 0, left: 0 },
				elem = this[ 0 ],
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
				left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				parentOffset = { top: 0, left: 0 },
				elem = this[ 0 ];

			// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// we assume that getBoundingClientRect is available when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft
			// are the same in Safari causing offset.left to incorrectly be 0
			return {
				top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = /Y/.test( prop );

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? (prop in win) ? win[ prop ] :
						win.document.documentElement[ method ] :
						elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : jQuery( win ).scrollLeft(),
						top ? val : jQuery( win ).scrollTop()
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// if curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
						// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in
	// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPgo8ZGVmcz4KPGZvbnQgaWQ9ImZvcm1CdWlsZGVySWNvbnMiIGhvcml6LWFkdi14PSIxMDI0Ij4KPGZvbnQtZmFjZSB1bml0cy1wZXItZW09IjEwMjQiIGFzY2VudD0iOTYwIiBkZXNjZW50PSItNjQiIC8+CjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4MjA7IiBob3Jpei1hZHYteD0iNTEyIiBkPSIiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlMDAwOyIgZ2x5cGgtbmFtZT0iaG9tZSIgZD0iTTEwMjQgMzY5LjU1N2wtNTEyIDM5Ny40MjYtNTEyLTM5Ny40Mjl2MTYyLjAzN2w1MTIgMzk3LjQyNiA1MTItMzk3LjQyNnpNODk2IDM4NHYtMzg0aC0yNTZ2MjU2aC0yNTZ2LTI1NmgtMjU2djM4NGwzODQgMjg4eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGUwMDE7IiBnbHlwaC1uYW1lPSJvZmZpY2UiIGQ9Ik0wLTY0aDUxMnYxMDI0aC01MTJ2LTEwMjR6TTMyMCA4MzJoMTI4di0xMjhoLTEyOHYxMjh6TTMyMCA1NzZoMTI4di0xMjhoLTEyOHYxMjh6TTMyMCAzMjBoMTI4di0xMjhoLTEyOHYxMjh6TTY0IDgzMmgxMjh2LTEyOGgtMTI4djEyOHpNNjQgNTc2aDEyOHYtMTI4aC0xMjh2MTI4ek02NCAzMjBoMTI4di0xMjhoLTEyOHYxMjh6TTU3NiA2NDBoNDQ4di02NGgtNDQ4ek01NzYtNjRoMTI4djI1NmgxOTJ2LTI1NmgxMjh2NTc2aC00NDh6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTAwNDsiIGdseXBoLW5hbWU9InNvcnQtdXAiIGhvcml6LWFkdi14PSI1ODUiIGQ9Ik01ODUuMTQzIDU1Ny43MTRxMC0xNC44NTctMTAuODU3LTI1LjcxNHQtMjUuNzE0LTEwLjg1N2gtNTEycS0xNC44NTcgMC0yNS43MTQgMTAuODU3dC0xMC44NTcgMjUuNzE0IDEwLjg1NyAyNS43MTRsMjU2IDI1NnExMC44NTcgMTAuODU3IDI1LjcxNCAxMC44NTd0MjUuNzE0LTEwLjg1N2wyNTYtMjU2cTEwLjg1Ny0xMC44NTcgMTAuODU3LTI1LjcxNHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlMDA1OyIgZ2x5cGgtbmFtZT0ic29ydC1kb3duIiBob3Jpei1hZHYteD0iNTg1IiBkPSJNNTg1LjE0MyAzMzguMjg2cTAtMTQuODU3LTEwLjg1Ny0yNS43MTRsLTI1Ni0yNTZxLTEwLjg1Ny0xMC44NTctMjUuNzE0LTEwLjg1N3QtMjUuNzE0IDEwLjg1N2wtMjU2IDI1NnEtMTAuODU3IDEwLjg1Ny0xMC44NTcgMjUuNzE0dDEwLjg1NyAyNS43MTQgMjUuNzE0IDEwLjg1N2g1MTJxMTQuODU3IDAgMjUuNzE0LTEwLjg1N3QxMC44NTctMjUuNzE0eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGUwMTI7IiBnbHlwaC1uYW1lPSJpcGhvbmUiIGhvcml6LWFkdi14PSI3NjgiIGQ9Ik01MTIgOTYwaC0yNTZjLTE0MS4zNzYgMC0yNTYtMTE0LjYyNC0yNTYtMjU2di01MTJjMC0xNDEuMzc2IDExNC42MjQtMjU2IDI1Ni0yNTZoMjU2YzE0MS4zNzYgMCAyNTYgMTE0LjYyNCAyNTYgMjU2djUxMmMwIDE0MS4zNzYtMTE0LjYyNCAyNTYtMjU2IDI1NnpNMzg0LTEuOTg0Yy0zNi40NDggMC02NS45ODQgMjkuNTA0LTY1Ljk4NCA2NS45ODRzMjkuNTY4IDY1Ljk4NCA2NS45ODQgNjUuOTg0IDY1Ljk4NC0yOS41MDQgNjUuOTg0LTY1Ljk4NC0yOS41MzYtNjUuOTg0LTY1Ljk4NC02NS45ODR6TTY0MCAxOTJoLTUxMnY1MTJjMCA3MC40OTYgNTcuNDQgMTI4IDEyOCAxMjhoMjU2YzcwLjQ5NiAwIDEyOC01Ny41MDQgMTI4LTEyOHYtNTEyeiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGUwMWE7IiBnbHlwaC1uYW1lPSJyZW1vdmUiIGQ9Ik0xOTItNjRoNjQwbDY0IDcwNGgtNzY4ek02NDAgODMydjEyOGgtMjU2di0xMjhoLTMyMHYtMTkybDY0IDY0aDc2OGw2NC02NHYxOTJoLTMyMHpNNTc2IDgzMmgtMTI4djY0aDEyOHYtNjR6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTAyYTsiIGdseXBoLW5hbWU9InByaW50IiBkPSJNMjU2IDg5Nmg1MTJ2LTEyOGgtNTEyek05NjAgNzA0aC04OTZjLTM1LjIgMC02NC0yOC44LTY0LTY0di0zMjBjMC0zNS4yIDI4Ljc5NS02NCA2NC02NGgxOTJ2LTI1Nmg1MTJ2MjU2aDE5MmMzNS4yIDAgNjQgMjguOCA2NCA2NHYzMjBjMCAzNS4yLTI4LjggNjQtNjQgNjR6TTcwNCA2NGgtMzg0djMyMGgzODR2LTMyMHpNOTc0LjQgNjA4YzAtMjUuNjI1LTIwLjc3NS00Ni40LTQ2LjM5OC00Ni40LTI1LjYyNSAwLTQ2LjQwMiAyMC43NzUtNDYuNDAyIDQ2LjRzMjAuNzc1IDQ2LjQgNDYuNDAyIDQ2LjRjMjUuNjI1IDAgNDYuMzk4LTIwLjc3NSA0Ni4zOTgtNDYuNHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlMDJkOyIgZ2x5cGgtbmFtZT0ic2VhcmNoIiBkPSJNOTkyLjI2MyA4OC42MDNsLTI0Mi41NTMgMjA2LjI5NWMtMjUuMDc0IDIyLjU2Ny01MS44OSAzMi45MjYtNzMuNTUyIDMxLjkyNyA1Ny4yNTcgNjcuMDY3IDkxLjg0MiAxNTQuMDc4IDkxLjg0MiAyNDkuMTc1IDAgMjEyLjA3OC0xNzEuOTIyIDM4NC0zODQgMzg0LTIxMi4wNzUgMC0zODQtMTcxLjkyMi0zODQtMzg0czE3MS45MjItMzg0IDM4NC0zODRjOTUuMDk3IDAgMTgyLjEwNyAzNC41ODUgMjQ5LjE3NSA5MS44NDUtMS4wMDEtMjEuNjYyIDkuMzYtNDguNDc4IDMxLjkyNy03My41NTJsMjA2LjI5NS0yNDIuNTUzYzM1LjMyMS0zOS4yNDYgOTMuMDIyLTQyLjU1MyAxMjguMjE5LTcuMzU1czMxLjg5MyA5Mi44OTgtNy4zNTMgMTI4LjIxOXpNMzg0IDMyMGMtMTQxLjM4MyAwLTI1NiAxMTQuNjE3LTI1NiAyNTZzMTE0LjYxNyAyNTYgMjU2IDI1NiAyNTYtMTE0LjYxNyAyNTYtMjU2LTExNC42MTUtMjU2LTI1Ni0yNTZ6IiAvPgo8L2ZvbnQ+PC9kZWZzPjwvc3ZnPg=="

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "data:application/x-font-ttf;base64,AAEAAAALAIAAAwAwT1MvMg8R/KAAAAC8AAAAYGNtYXCgpqEtAAABHAAAAHxnYXNwAAAAEAAAAZgAAAAIZ2x5ZudvWQUAAAGgAAADvGhlYWQGuTttAAAFXAAAADZoaGVhB8IDzQAABZQAAAAkaG10eCGSAEAAAAW4AAAAMGxvY2EErgOyAAAF6AAAABptYXhwABYAOwAABgQAAAAgbmFtZZlKCfsAAAYkAAABhnBvc3QAAwAAAAAHrAAAACAAAwNJAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADgLQPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAYAAAABQAEAADAAQAAQAg4AHgBeAS4BrgKuAt//3//wAAAAAAIOAA4ATgEuAa4CrgLf/9//8AAf/jIAQgAh/2H+8f4B/eAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAAAAAEAAOhAAUADgAACQI1CQEHESERIREhEQEEAP4A/gACAAIAgP8A/wD/AAGAAXIBjf5zogGN/nOU/oABAP8AAYABIAAACQAA/8AEAAPAAAQACQAOABMAGAAdACIAJgAuAAAXIREhEQEzFSM1ETMVIzURMxUjNQEzFSM1ETMVIzURMxUjNQEhFSERMxEzETMRIQACAP4AAUCAgICAgID/AICAgICAgAIAAcD+QIDAgP5AQAQA/AADgICA/wCAgP8AgIACAICA/wCAgP8AgIABQED9gAEA/wACQAAAAAABAAACCQJJA1IAEwAAARQHBiMhIicmNTQ3ATYzMhcBFhUCSQsLDv4ADwsLCwEACw8OCwEACwIuDwsLCwsPDwoBAAsL/wAKDwABAAAALgJJAXcAEwAAARQHAQYjIicBJjU0NzYzITIXFhUCSQv/AAsODwv/AAsLCw8CAA4LCwFSDwr/AAsLAQAKDw8LCwsLDwADAAD/wAMAA8AAGAAlADAAAAEhIg4CFREUHgIzITI+AjURNC4CIwMiJjU0NjMyFhUUBiMlIRE0NjMhMhYVEQIA/wA1XUYoKEZdNQEANV1GKChGXTWAGycnGxsnJxsBAP4ASzUBADVLA8AoRl01/gA1XUYoKEZdNQIANV1GKPw+JxsbJycbGyfCAgA1S0s1/gAAAAAAAwBA/8ADwAPAAAMADgATAAAXIRMhJTUhFSEVNyEXNSErATUzFcACgED9AAIA/wD+wEADAED+wECAgEACwMCAgMBAQMBAQAAABAAAAAAEAAOAAAMAGAAdACoAAAEhFSEFISIGFREUFjsBESERMzI2NRE0JiMBIREhEQEUBiMiJjU0NjMyFhUBAAIA/gACwPyAGiYmGsACAMAaJiYa/wD+gAGAAQ4bExMbGxMTGwOAgEAmGv7AGib/AAEAJhoBQBom/YABQP7AAiATGxsTExsbEwAAAAACAAD/2APoA8AAIwA4AAAlJy4BBz4BNTQuAiMiDgIVFB4CMzI2NwYWHwEeATc2JiclIi4CNTQ+AjMyHgIVFA4CIwPg8hMnECsxPGmLUFCLaTw8aYtQR4AyARARzhtLGxoEHv2gNV1GKChGXTU1XUYoKEZdNVnOERABMoBHUItpPDxpi1BQi2k8MSsQJxPyHgQaG0sb5yhGXTU1XUYoKEZdNTVdRigAAAABAAAAAAAAc6l6pV8PPPUACwQAAAAAANHNe3gAAAAA0c17eAAA/8AEAAPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAQAAAEAAAAAAAAAAAAAAAAAAAAMBAAAAAAAAAAAAAAAAgAAAAQAAAAEAAAAAkkAAAJJAAADAAAABAAAQAQAAAAEAAAAAAAAAAAKABQAHgBCAI4AsgDWASABRAGKAd4AAAABAAAADAA5AAkAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,d09GRgABAAAAAAgYAAsAAAAAB8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxH8oGNtYXAAAAFoAAAAfAAAAHygpqEtZ2FzcAAAAeQAAAAIAAAACAAAABBnbHlmAAAB7AAAA7wAAAO8529ZBWhlYWQAAAWoAAAANgAAADYGuTttaGhlYQAABeAAAAAkAAAAJAfCA81obXR4AAAGBAAAADAAAAAwIZIAQGxvY2EAAAY0AAAAGgAAABoErgOybWF4cAAABlAAAAAgAAAAIAAWADtuYW1lAAAGcAAAAYYAAAGGmUoJ+3Bvc3QAAAf4AAAAIAAAACAAAwAAAAMDSQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA4C0DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAGAAAAAUABAAAwAEAAEAIOAB4AXgEuAa4CrgLf/9//8AAAAAACDgAOAE4BLgGuAq4C3//f//AAH/4yAEIAIf9h/vH+Af3gADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAAAAABAADoQAFAA4AAAkCNQkBBxEhESERIREBBAD+AP4AAgACAID/AP8A/wABgAFyAY3+c6IBjf5zlP6AAQD/AAGAASAAAAkAAP/ABAADwAAEAAkADgATABgAHQAiACYALgAAFyERIREBMxUjNREzFSM1ETMVIzUBMxUjNREzFSM1ETMVIzUBIRUhETMRMxEzESEAAgD+AAFAgICAgICA/wCAgICAgIACAAHA/kCAwID+QEAEAPwAA4CAgP8AgID/AICAAgCAgP8AgID/AICAAUBA/YABAP8AAkAAAAAAAQAAAgkCSQNSABMAAAEUBwYjISInJjU0NwE2MzIXARYVAkkLCw7+AA8LCwsBAAsPDgsBAAsCLg8LCwsLDw8KAQALC/8ACg8AAQAAAC4CSQF3ABMAAAEUBwEGIyInASY1NDc2MyEyFxYVAkkL/wALDg8L/wALCwsPAgAOCwsBUg8K/wALCwEACg8PCwsLCw8AAwAA/8ADAAPAABgAJQAwAAABISIOAhURFB4CMyEyPgI1ETQuAiMDIiY1NDYzMhYVFAYjJSERNDYzITIWFRECAP8ANV1GKChGXTUBADVdRigoRl01gBsnJxsbJycbAQD+AEs1AQA1SwPAKEZdNf4ANV1GKChGXTUCADVdRij8PicbGycnGxsnwgIANUtLNf4AAAAAAAMAQP/AA8ADwAADAA4AEwAAFyETISU1IRUhFTchFzUhKwE1MxXAAoBA/QACAP8A/sBAAwBA/sBAgIBAAsDAgIDAQEDAQEAAAAQAAAAABAADgAADABgAHQAqAAABIRUhBSEiBhURFBY7AREhETMyNjURNCYjASERIREBFAYjIiY1NDYzMhYVAQACAP4AAsD8gBomJhrAAgDAGiYmGv8A/oABgAEOGxMTGxsTExsDgIBAJhr+wBom/wABACYaAUAaJv2AAUD+wAIgExsbExMbGxMAAAAAAgAA/9gD6APAACMAOAAAJScuAQc+ATU0LgIjIg4CFRQeAjMyNjcGFh8BHgE3NiYnJSIuAjU0PgIzMh4CFRQOAiMD4PITJxArMTxpi1BQi2k8PGmLUEeAMgEQEc4bSxsaBB79oDVdRigoRl01NV1GKChGXTVZzhEQATKAR1CLaTw8aYtQUItpPDErECcT8h4EGhtLG+coRl01NV1GKChGXTU1XUYoAAAAAQAAAAAAAHOpeqVfDzz1AAsEAAAAAADRzXt4AAAAANHNe3gAAP/ABAADwAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAAEAAABAAAAAAAAAAAAAAAAAAAADAQAAAAAAAAAAAAAAAIAAAAEAAAABAAAAAJJAAACSQAAAwAAAAQAAEAEAAAABAAAAAAAAAAACgAUAB4AQgCOALIA1gEgAUQBigHeAAAAAQAAAAwAOQAJAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* =========================================================
	 * bootstrap-datepicker.js
	 * Repo: https://github.com/eternicode/bootstrap-datepicker/
	 * Demo: http://eternicode.github.io/bootstrap-datepicker/
	 * Docs: http://bootstrap-datepicker.readthedocs.org/
	 * Forked from http://www.eyecon.ro/bootstrap-datepicker
	 * =========================================================
	 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	(function($, undefined){

		function UTCDate(){
			return new Date(Date.UTC.apply(Date, arguments));
		}
		function UTCToday(){
			var today = new Date();
			return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
		}
		function isUTCEquals(date1, date2) {
			return (
				date1.getUTCFullYear() === date2.getUTCFullYear() &&
				date1.getUTCMonth() === date2.getUTCMonth() &&
				date1.getUTCDate() === date2.getUTCDate()
			);
		}
		function alias(method){
			return function(){
				return this[method].apply(this, arguments);
			};
		}

		var DateArray = (function(){
			var extras = {
				get: function(i){
					return this.slice(i)[0];
				},
				contains: function(d){
					// Array.indexOf is not cross-browser;
					// $.inArray doesn't work with Dates
					var val = d && d.valueOf();
					for (var i=0, l=this.length; i < l; i++)
						if (this[i].valueOf() === val)
							return i;
					return -1;
				},
				remove: function(i){
					this.splice(i,1);
				},
				replace: function(new_array){
					if (!new_array)
						return;
					if (!$.isArray(new_array))
						new_array = [new_array];
					this.clear();
					this.push.apply(this, new_array);
				},
				clear: function(){
					this.length = 0;
				},
				copy: function(){
					var a = new DateArray();
					a.replace(this);
					return a;
				}
			};

			return function(){
				var a = [];
				a.push.apply(a, arguments);
				$.extend(a, extras);
				return a;
			};
		})();


		// Picker object

		var Datepicker = function(element, options){
			this._process_options(options);

			this.dates = new DateArray();
			this.viewDate = this.o.defaultViewDate;
			this.focusDate = null;

			this.element = $(element);
			this.isInline = false;
			this.isInput = this.element.is('input');
			this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
			this.hasInput = this.component && this.element.find('input').length;
			if (this.component && this.component.length === 0)
				this.component = false;

			this.picker = $(DPGlobal.template);
			this._buildEvents();
			this._attachEvents();

			if (this.isInline){
				this.picker.addClass('datepicker-inline').appendTo(this.element);
			}
			else {
				this.picker.addClass('datepicker-dropdown dropdown-menu');
			}

			if (this.o.rtl){
				this.picker.addClass('datepicker-rtl');
			}

			this.viewMode = this.o.startView;

			if (this.o.calendarWeeks)
				this.picker.find('tfoot .today, tfoot .clear')
							.attr('colspan', function(i, val){
								return parseInt(val) + 1;
							});

			this._allow_update = false;

			this.setStartDate(this._o.startDate);
			this.setEndDate(this._o.endDate);
			this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
			this.setDatesDisabled(this.o.datesDisabled);

			this.fillDow();
			this.fillMonths();

			this._allow_update = true;

			this.update();
			this.showMode();

			if (this.isInline){
				this.show();
			}
		};

		Datepicker.prototype = {
			constructor: Datepicker,

			_process_options: function(opts){
				// Store raw options for reference
				this._o = $.extend({}, this._o, opts);
				// Processed options
				var o = this.o = $.extend({}, this._o);

				// Check if "de-DE" style date is available, if not language should
				// fallback to 2 letter code eg "de"
				var lang = o.language;
				if (!dates[lang]){
					lang = lang.split('-')[0];
					if (!dates[lang])
						lang = defaults.language;
				}
				o.language = lang;

				switch (o.startView){
					case 2:
					case 'decade':
						o.startView = 2;
						break;
					case 1:
					case 'year':
						o.startView = 1;
						break;
					default:
						o.startView = 0;
				}

				switch (o.minViewMode){
					case 1:
					case 'months':
						o.minViewMode = 1;
						break;
					case 2:
					case 'years':
						o.minViewMode = 2;
						break;
					default:
						o.minViewMode = 0;
				}

				o.startView = Math.max(o.startView, o.minViewMode);

				// true, false, or Number > 0
				if (o.multidate !== true){
					o.multidate = Number(o.multidate) || false;
					if (o.multidate !== false)
						o.multidate = Math.max(0, o.multidate);
				}
				o.multidateSeparator = String(o.multidateSeparator);

				o.weekStart %= 7;
				o.weekEnd = ((o.weekStart + 6) % 7);

				var format = DPGlobal.parseFormat(o.format);
				if (o.startDate !== -Infinity){
					if (!!o.startDate){
						if (o.startDate instanceof Date)
							o.startDate = this._local_to_utc(this._zero_time(o.startDate));
						else
							o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
					}
					else {
						o.startDate = -Infinity;
					}
				}
				if (o.endDate !== Infinity){
					if (!!o.endDate){
						if (o.endDate instanceof Date)
							o.endDate = this._local_to_utc(this._zero_time(o.endDate));
						else
							o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
					}
					else {
						o.endDate = Infinity;
					}
				}

				o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
				if (!$.isArray(o.daysOfWeekDisabled))
					o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
				o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
					return parseInt(d, 10);
				});

				o.datesDisabled = o.datesDisabled||[];
				if (!$.isArray(o.datesDisabled)) {
					var datesDisabled = [];
					datesDisabled.push(DPGlobal.parseDate(o.datesDisabled, format, o.language));
					o.datesDisabled = datesDisabled;
				}
				o.datesDisabled = $.map(o.datesDisabled,function(d){
					return DPGlobal.parseDate(d, format, o.language);
				});

				var plc = String(o.orientation).toLowerCase().split(/\s+/g),
					_plc = o.orientation.toLowerCase();
				plc = $.grep(plc, function(word){
					return /^auto|left|right|top|bottom$/.test(word);
				});
				o.orientation = {x: 'auto', y: 'auto'};
				if (!_plc || _plc === 'auto')
					; // no action
				else if (plc.length === 1){
					switch (plc[0]){
						case 'top':
						case 'bottom':
							o.orientation.y = plc[0];
							break;
						case 'left':
						case 'right':
							o.orientation.x = plc[0];
							break;
					}
				}
				else {
					_plc = $.grep(plc, function(word){
						return /^left|right$/.test(word);
					});
					o.orientation.x = _plc[0] || 'auto';

					_plc = $.grep(plc, function(word){
						return /^top|bottom$/.test(word);
					});
					o.orientation.y = _plc[0] || 'auto';
				}
				if (o.defaultViewDate) {
					var year = o.defaultViewDate.year || new Date().getFullYear();
					var month = o.defaultViewDate.month || 0;
					var day = o.defaultViewDate.day || 1;
					o.defaultViewDate = UTCDate(year, month, day);
				} else {
					o.defaultViewDate = UTCToday();
				}
				o.showOnFocus = o.showOnFocus !== undefined ? o.showOnFocus : true;
			},
			_events: [],
			_secondaryEvents: [],
			_applyEvents: function(evs){
				for (var i=0, el, ch, ev; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.on(ev, ch);
				}
			},
			_unapplyEvents: function(evs){
				for (var i=0, el, ev, ch; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.off(ev, ch);
				}
			},
			_buildEvents: function(){
	            var events = {
	                keyup: $.proxy(function(e){
	                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
	                        this.update();
	                }, this),
	                keydown: $.proxy(this.keydown, this)
	            };

	            if (this.o.showOnFocus === true) {
	                events.focus = $.proxy(this.show, this);
	            }

	            if (this.isInput) { // single input
	                this._events = [
	                    [this.element, events]
	                ];
	            }
	            else if (this.component && this.hasInput) { // component: input + button
	                this._events = [
	                    // For components that are not readonly, allow keyboard nav
	                    [this.element.find('input'), events],
	                    [this.component, {
	                        click: $.proxy(this.show, this)
	                    }]
	                ];
	            }
				else if (this.element.is('div')){  // inline datepicker
					this.isInline = true;
				}
				else {
					this._events = [
						[this.element, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				this._events.push(
					// Component: listen for blur on element descendants
					[this.element, '*', {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}],
					// Input: listen for blur on element
					[this.element, {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}]
				);

				this._secondaryEvents = [
					[this.picker, {
						click: $.proxy(this.click, this)
					}],
					[$(window), {
						resize: $.proxy(this.place, this)
					}],
					[$(document), {
						'mousedown touchstart': $.proxy(function(e){
							// Clicked outside the datepicker, hide it
							if (!(
								this.element.is(e.target) ||
								this.element.find(e.target).length ||
								this.picker.is(e.target) ||
								this.picker.find(e.target).length
							)){
								this.hide();
							}
						}, this)
					}]
				];
			},
			_attachEvents: function(){
				this._detachEvents();
				this._applyEvents(this._events);
			},
			_detachEvents: function(){
				this._unapplyEvents(this._events);
			},
			_attachSecondaryEvents: function(){
				this._detachSecondaryEvents();
				this._applyEvents(this._secondaryEvents);
			},
			_detachSecondaryEvents: function(){
				this._unapplyEvents(this._secondaryEvents);
			},
			_trigger: function(event, altdate){
				var date = altdate || this.dates.get(-1),
					local_date = this._utc_to_local(date);

				this.element.trigger({
					type: event,
					date: local_date,
					dates: $.map(this.dates, this._utc_to_local),
					format: $.proxy(function(ix, format){
						if (arguments.length === 0){
							ix = this.dates.length - 1;
							format = this.o.format;
						}
						else if (typeof ix === 'string'){
							format = ix;
							ix = this.dates.length - 1;
						}
						format = format || this.o.format;
						var date = this.dates.get(ix);
						return DPGlobal.formatDate(date, format, this.o.language);
					}, this)
				});
			},

			show: function(){
				if (this.element.attr('readonly') && this.o.enableOnReadonly === false)
					return;
				if (!this.isInline)
					this.picker.appendTo(this.o.container);
				this.place();
				this.picker.show();
				this._attachSecondaryEvents();
				this._trigger('show');
				if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
					$(this.element).blur();
				}
				return this;
			},

			hide: function(){
				if (this.isInline)
					return this;
				if (!this.picker.is(':visible'))
					return this;
				this.focusDate = null;
				this.picker.hide().detach();
				this._detachSecondaryEvents();
				this.viewMode = this.o.startView;
				this.showMode();

				if (
					this.o.forceParse &&
					(
						this.isInput && this.element.val() ||
						this.hasInput && this.element.find('input').val()
					)
				)
					this.setValue();
				this._trigger('hide');
				return this;
			},

			remove: function(){
				this.hide();
				this._detachEvents();
				this._detachSecondaryEvents();
				this.picker.remove();
				delete this.element.data().datepicker;
				if (!this.isInput){
					delete this.element.data().date;
				}
				return this;
			},

			_utc_to_local: function(utc){
				return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
			},
			_local_to_utc: function(local){
				return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
			},
			_zero_time: function(local){
				return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
			},
			_zero_utc_time: function(utc){
				return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
			},

			getDates: function(){
				return $.map(this.dates, this._utc_to_local);
			},

			getUTCDates: function(){
				return $.map(this.dates, function(d){
					return new Date(d);
				});
			},

			getDate: function(){
				return this._utc_to_local(this.getUTCDate());
			},

			getUTCDate: function(){
				var selected_date = this.dates.get(-1);
				if (typeof selected_date !== 'undefined') {
					return new Date(selected_date);
				} else {
					return null;
				}
			},

			clearDates: function(){
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component) {
					element = this.element.find('input');
				}

				if (element) {
					element.val('').change();
				}

				this.update();
				this._trigger('changeDate');

				if (this.o.autoclose) {
					this.hide();
				}
			},
			setDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, args);
				this._trigger('changeDate');
				this.setValue();
				return this;
			},

			setUTCDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, $.map(args, this._utc_to_local));
				this._trigger('changeDate');
				this.setValue();
				return this;
			},

			setDate: alias('setDates'),
			setUTCDate: alias('setUTCDates'),

			setValue: function(){
				var formatted = this.getFormattedDate();
				if (!this.isInput){
					if (this.component){
						this.element.find('input').val(formatted).change();
					}
				}
				else {
					this.element.val(formatted).change();
				}
				return this;
			},

			getFormattedDate: function(format){
				if (format === undefined)
					format = this.o.format;

				var lang = this.o.language;
				return $.map(this.dates, function(d){
					return DPGlobal.formatDate(d, format, lang);
				}).join(this.o.multidateSeparator);
			},

			setStartDate: function(startDate){
				this._process_options({startDate: startDate});
				this.update();
				this.updateNavArrows();
				return this;
			},

			setEndDate: function(endDate){
				this._process_options({endDate: endDate});
				this.update();
				this.updateNavArrows();
				return this;
			},

			setDaysOfWeekDisabled: function(daysOfWeekDisabled){
				this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
				this.update();
				this.updateNavArrows();
				return this;
			},

			setDatesDisabled: function(datesDisabled){
				this._process_options({datesDisabled: datesDisabled});
				this.update();
				this.updateNavArrows();
			},

			place: function(){
				if (this.isInline)
					return this;
				var calendarWidth = this.picker.outerWidth(),
					calendarHeight = this.picker.outerHeight(),
					visualPadding = 10,
					windowWidth = $(this.o.container).width(),
					windowHeight = $(this.o.container).height(),
					scrollTop = $(this.o.container).scrollTop(),
					appendOffset = $(this.o.container).offset();

				var parentsZindex = [];
				this.element.parents().each(function(){
					var itemZIndex = $(this).css('z-index');
					if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
				});
				var zIndex = Math.max.apply(Math, parentsZindex) + 10;
				var offset = this.component ? this.component.parent().offset() : this.element.offset();
				var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
				var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
				var left = offset.left - appendOffset.left,
					top = offset.top - appendOffset.top;

				this.picker.removeClass(
					'datepicker-orient-top datepicker-orient-bottom '+
					'datepicker-orient-right datepicker-orient-left'
				);

				if (this.o.orientation.x !== 'auto'){
					this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
					if (this.o.orientation.x === 'right')
						left -= calendarWidth - width;
				}
				// auto x orientation is best-placement: if it crosses a window
				// edge, fudge it sideways
				else {
					if (offset.left < 0) {
						// component is outside the window on the left side. Move it into visible range
						this.picker.addClass('datepicker-orient-left');
						left -= offset.left - visualPadding;
					} else if (left + calendarWidth > windowWidth) {
						// the calendar passes the widow right edge. Align it to component right side
						this.picker.addClass('datepicker-orient-right');
						left = offset.left + width - calendarWidth;
					} else {
						// Default to left
						this.picker.addClass('datepicker-orient-left');
					}
				}

				// auto y orientation is best-situation: top or bottom, no fudging,
				// decision based on which shows more of the calendar
				var yorient = this.o.orientation.y,
					top_overflow, bottom_overflow;
				if (yorient === 'auto'){
					top_overflow = -scrollTop + top - calendarHeight;
					bottom_overflow = scrollTop + windowHeight - (top + height + calendarHeight);
					if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
						yorient = 'top';
					else
						yorient = 'bottom';
				}
				this.picker.addClass('datepicker-orient-' + yorient);
				if (yorient === 'top')
					top += height;
				else
					top -= calendarHeight + parseInt(this.picker.css('padding-top'));

				if (this.o.rtl) {
					var right = windowWidth - (left + width);
					this.picker.css({
						top: top,
						right: right,
						zIndex: zIndex
					});
				} else {
					this.picker.css({
						top: top,
						left: left,
						zIndex: zIndex
					});
				}
				return this;
			},

			_allow_update: true,
			update: function(){
				if (!this._allow_update)
					return this;

				var oldDates = this.dates.copy(),
					dates = [],
					fromArgs = false;
				if (arguments.length){
					$.each(arguments, $.proxy(function(i, date){
						if (date instanceof Date)
							date = this._local_to_utc(date);
						dates.push(date);
					}, this));
					fromArgs = true;
				}
				else {
					dates = this.isInput
							? this.element.val()
							: this.element.data('date') || this.element.find('input').val();
					if (dates && this.o.multidate)
						dates = dates.split(this.o.multidateSeparator);
					else
						dates = [dates];
					delete this.element.data().date;
				}

				dates = $.map(dates, $.proxy(function(date){
					return DPGlobal.parseDate(date, this.o.format, this.o.language);
				}, this));
				dates = $.grep(dates, $.proxy(function(date){
					return (
						date < this.o.startDate ||
						date > this.o.endDate ||
						!date
					);
				}, this), true);
				this.dates.replace(dates);

				if (this.dates.length)
					this.viewDate = new Date(this.dates.get(-1));
				else if (this.viewDate < this.o.startDate)
					this.viewDate = new Date(this.o.startDate);
				else if (this.viewDate > this.o.endDate)
					this.viewDate = new Date(this.o.endDate);

				if (fromArgs){
					// setting date by clicking
					this.setValue();
				}
				else if (dates.length){
					// setting date by typing
					if (String(oldDates) !== String(this.dates))
						this._trigger('changeDate');
				}
				if (!this.dates.length && oldDates.length)
					this._trigger('clearDate');

				this.fill();
				return this;
			},

			fillDow: function(){
				var dowCnt = this.o.weekStart,
					html = '<tr>';
				if (this.o.calendarWeeks){
					this.picker.find('.datepicker-days thead tr:first-child .datepicker-switch')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});
					var cell = '<th class="cw">&#160;</th>';
					html += cell;
				}
				while (dowCnt < this.o.weekStart + 7){
					html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
				}
				html += '</tr>';
				this.picker.find('.datepicker-days thead').append(html);
			},

			fillMonths: function(){
				var html = '',
				i = 0;
				while (i < 12){
					html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
				}
				this.picker.find('.datepicker-months td').html(html);
			},

			setRange: function(range){
				if (!range || !range.length)
					delete this.range;
				else
					this.range = $.map(range, function(d){
						return d.valueOf();
					});
				this.fill();
			},

			getClassNames: function(date){
				var cls = [],
					year = this.viewDate.getUTCFullYear(),
					month = this.viewDate.getUTCMonth(),
					today = new Date();
				if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
					cls.push('old');
				}
				else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
					cls.push('new');
				}
				if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
					cls.push('focused');
				// Compare internal UTC date with local today, not UTC today
				if (this.o.todayHighlight &&
					date.getUTCFullYear() === today.getFullYear() &&
					date.getUTCMonth() === today.getMonth() &&
					date.getUTCDate() === today.getDate()){
					cls.push('today');
				}
				if (this.dates.contains(date) !== -1)
					cls.push('active');
				if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
					$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
					cls.push('disabled');
				}
				if (this.o.datesDisabled.length > 0 &&
					$.grep(this.o.datesDisabled, function(d){
						return isUTCEquals(date, d); }).length > 0) {
					cls.push('disabled', 'disabled-date');
				}

				if (this.range){
					if (date > this.range[0] && date < this.range[this.range.length-1]){
						cls.push('range');
					}
					if ($.inArray(date.valueOf(), this.range) !== -1){
						cls.push('selected');
					}
				}
				return cls;
			},

			fill: function(){
				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth(),
					startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
					startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
					endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
					endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
					todaytxt = dates[this.o.language].today || dates['en'].today || '',
					cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
					tooltip;
				if (isNaN(year) || isNaN(month))
					return;
				this.picker.find('.datepicker-days thead .datepicker-switch')
							.text(dates[this.o.language].months[month]+' '+year);
				this.picker.find('tfoot .today')
							.text(todaytxt)
							.toggle(this.o.todayBtn !== false);
				this.picker.find('tfoot .clear')
							.text(cleartxt)
							.toggle(this.o.clearBtn !== false);
				this.updateNavArrows();
				this.fillMonths();
				var prevMonth = UTCDate(year, month-1, 28),
					day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
				prevMonth.setUTCDate(day);
				prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
				var nextMonth = new Date(prevMonth);
				nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
				nextMonth = nextMonth.valueOf();
				var html = [];
				var clsName;
				while (prevMonth.valueOf() < nextMonth){
					if (prevMonth.getUTCDay() === this.o.weekStart){
						html.push('<tr>');
						if (this.o.calendarWeeks){
							// ISO 8601: First week contains first thursday.
							// ISO also states week starts on Monday, but we can be more abstract here.
							var
								// Start of current week: based on weekstart/current date
								ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
								// Thursday of this week
								th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
								// First Thursday of year, year from thursday
								yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
								// Calendar week: ms between thursdays, div ms per day, div 7 days
								calWeek =  (th - yth) / 864e5 / 7 + 1;
							html.push('<td class="cw">'+ calWeek +'</td>');

						}
					}
					clsName = this.getClassNames(prevMonth);
					clsName.push('day');

					if (this.o.beforeShowDay !== $.noop){
						var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
						if (before === undefined)
							before = {};
						else if (typeof(before) === 'boolean')
							before = {enabled: before};
						else if (typeof(before) === 'string')
							before = {classes: before};
						if (before.enabled === false)
							clsName.push('disabled');
						if (before.classes)
							clsName = clsName.concat(before.classes.split(/\s+/));
						if (before.tooltip)
							tooltip = before.tooltip;
					}

					clsName = $.unique(clsName);
					html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
					tooltip = null;
					if (prevMonth.getUTCDay() === this.o.weekEnd){
						html.push('</tr>');
					}
					prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
				}
				this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

				var months = this.picker.find('.datepicker-months')
							.find('th:eq(1)')
								.text(year)
								.end()
							.find('span').removeClass('active');

				$.each(this.dates, function(i, d){
					if (d.getUTCFullYear() === year)
						months.eq(d.getUTCMonth()).addClass('active');
				});

				if (year < startYear || year > endYear){
					months.addClass('disabled');
				}
				if (year === startYear){
					months.slice(0, startMonth).addClass('disabled');
				}
				if (year === endYear){
					months.slice(endMonth+1).addClass('disabled');
				}

				if (this.o.beforeShowMonth !== $.noop){
					var that = this;
					$.each(months, function(i, month){
						if (!$(month).hasClass('disabled')) {
							var moDate = new Date(year, i, 1);
							var before = that.o.beforeShowMonth(moDate);
							if (before === false)
								$(month).addClass('disabled');
						}
					});
				}

				html = '';
				year = parseInt(year/10, 10) * 10;
				var yearCont = this.picker.find('.datepicker-years')
									.find('th:eq(1)')
										.text(year + '-' + (year + 9))
										.end()
									.find('td');
				year -= 1;
				var years = $.map(this.dates, function(d){
						return d.getUTCFullYear();
					}),
					classes;
				for (var i = -1; i < 11; i++){
					classes = ['year'];
					if (i === -1)
						classes.push('old');
					else if (i === 10)
						classes.push('new');
					if ($.inArray(year, years) !== -1)
						classes.push('active');
					if (year < startYear || year > endYear)
						classes.push('disabled');
					html += '<span class="' + classes.join(' ') + '">' + year + '</span>';
					year += 1;
				}
				yearCont.html(html);
			},

			updateNavArrows: function(){
				if (!this._allow_update)
					return;

				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth();
				switch (this.viewMode){
					case 0:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
					case 1:
					case 2:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
				}
			},

			click: function(e){
				e.preventDefault();
				var target = $(e.target).closest('span, td, th'),
					year, month, day;
				if (target.length === 1){
					switch (target[0].nodeName.toLowerCase()){
						case 'th':
							switch (target[0].className){
								case 'datepicker-switch':
									this.showMode(1);
									break;
								case 'prev':
								case 'next':
									var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
									switch (this.viewMode){
										case 0:
											this.viewDate = this.moveMonth(this.viewDate, dir);
											this._trigger('changeMonth', this.viewDate);
											break;
										case 1:
										case 2:
											this.viewDate = this.moveYear(this.viewDate, dir);
											if (this.viewMode === 1)
												this._trigger('changeYear', this.viewDate);
											break;
									}
									this.fill();
									break;
								case 'today':
									var date = new Date();
									date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

									this.showMode(-2);
									var which = this.o.todayBtn === 'linked' ? null : 'view';
									this._setDate(date, which);
									break;
								case 'clear':
									this.clearDates();
									break;
							}
							break;
						case 'span':
							if (!target.hasClass('disabled')){
								this.viewDate.setUTCDate(1);
								if (target.hasClass('month')){
									day = 1;
									month = target.parent().find('span').index(target);
									year = this.viewDate.getUTCFullYear();
									this.viewDate.setUTCMonth(month);
									this._trigger('changeMonth', this.viewDate);
									if (this.o.minViewMode === 1){
										this._setDate(UTCDate(year, month, day));
									}
								}
								else {
									day = 1;
									month = 0;
									year = parseInt(target.text(), 10)||0;
									this.viewDate.setUTCFullYear(year);
									this._trigger('changeYear', this.viewDate);
									if (this.o.minViewMode === 2){
										this._setDate(UTCDate(year, month, day));
									}
								}
								this.showMode(-1);
								this.fill();
							}
							break;
						case 'td':
							if (target.hasClass('day') && !target.hasClass('disabled')){
								day = parseInt(target.text(), 10)||1;
								year = this.viewDate.getUTCFullYear();
								month = this.viewDate.getUTCMonth();
								if (target.hasClass('old')){
									if (month === 0){
										month = 11;
										year -= 1;
									}
									else {
										month -= 1;
									}
								}
								else if (target.hasClass('new')){
									if (month === 11){
										month = 0;
										year += 1;
									}
									else {
										month += 1;
									}
								}
								this._setDate(UTCDate(year, month, day));
							}
							break;
					}
				}
				if (this.picker.is(':visible') && this._focused_from){
					$(this._focused_from).focus();
				}
				delete this._focused_from;
			},

			_toggle_multidate: function(date){
				var ix = this.dates.contains(date);
				if (!date){
					this.dates.clear();
				}

				if (ix !== -1){
					if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
						this.dates.remove(ix);
					}
				} else if (this.o.multidate === false) {
					this.dates.clear();
					this.dates.push(date);
				}
				else {
					this.dates.push(date);
				}

				if (typeof this.o.multidate === 'number')
					while (this.dates.length > this.o.multidate)
						this.dates.remove(0);
			},

			_setDate: function(date, which){
				if (!which || which === 'date')
					this._toggle_multidate(date && new Date(date));
				if (!which || which  === 'view')
					this.viewDate = date && new Date(date);

				this.fill();
				this.setValue();
				if (!which || which  !== 'view') {
					this._trigger('changeDate');
				}
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
				if (this.o.autoclose && (!which || which === 'date')){
					this.hide();
				}
			},

			moveMonth: function(date, dir){
				if (!date)
					return undefined;
				if (!dir)
					return date;
				var new_date = new Date(date.valueOf()),
					day = new_date.getUTCDate(),
					month = new_date.getUTCMonth(),
					mag = Math.abs(dir),
					new_month, test;
				dir = dir > 0 ? 1 : -1;
				if (mag === 1){
					test = dir === -1
						// If going back one month, make sure month is not current month
						// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
						? function(){
							return new_date.getUTCMonth() === month;
						}
						// If going forward one month, make sure month is as expected
						// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
						: function(){
							return new_date.getUTCMonth() !== new_month;
						};
					new_month = month + dir;
					new_date.setUTCMonth(new_month);
					// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
					if (new_month < 0 || new_month > 11)
						new_month = (new_month + 12) % 12;
				}
				else {
					// For magnitudes >1, move one month at a time...
					for (var i=0; i < mag; i++)
						// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
						new_date = this.moveMonth(new_date, dir);
					// ...then reset the day, keeping it in the new month
					new_month = new_date.getUTCMonth();
					new_date.setUTCDate(day);
					test = function(){
						return new_month !== new_date.getUTCMonth();
					};
				}
				// Common date-resetting loop -- if date is beyond end of month, make it
				// end of month
				while (test()){
					new_date.setUTCDate(--day);
					new_date.setUTCMonth(new_month);
				}
				return new_date;
			},

			moveYear: function(date, dir){
				return this.moveMonth(date, dir*12);
			},

			dateWithinRange: function(date){
				return date >= this.o.startDate && date <= this.o.endDate;
			},

			keydown: function(e){
				if (!this.picker.is(':visible')){
					if (e.keyCode === 27) // allow escape to hide and re-show picker
						this.show();
					return;
				}
				var dateChanged = false,
					dir, newDate, newViewDate,
					focusDate = this.focusDate || this.viewDate;
				switch (e.keyCode){
					case 27: // escape
						if (this.focusDate){
							this.focusDate = null;
							this.viewDate = this.dates.get(-1) || this.viewDate;
							this.fill();
						}
						else
							this.hide();
						e.preventDefault();
						break;
					case 37: // left
					case 39: // right
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 37 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
						}
						if (this.dateWithinRange(newViewDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 38: // up
					case 40: // down
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 38 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
						}
						if (this.dateWithinRange(newViewDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 32: // spacebar
						// Spacebar is used in manually typing dates in some formats.
						// As such, its behavior should not be hijacked.
						break;
					case 13: // enter
						focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
						if (this.o.keyboardNavigation) {
							this._toggle_multidate(focusDate);
							dateChanged = true;
						}
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.setValue();
						this.fill();
						if (this.picker.is(':visible')){
							e.preventDefault();
							if (typeof e.stopPropagation === 'function') {
								e.stopPropagation(); // All modern browsers, IE9+
							} else {
								e.cancelBubble = true; // IE6,7,8 ignore "stopPropagation"
							}
							if (this.o.autoclose)
								this.hide();
						}
						break;
					case 9: // tab
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
						this.hide();
						break;
				}
				if (dateChanged){
					if (this.dates.length)
						this._trigger('changeDate');
					else
						this._trigger('clearDate');
					var element;
					if (this.isInput){
						element = this.element;
					}
					else if (this.component){
						element = this.element.find('input');
					}
					if (element){
						element.change();
					}
				}
			},

			showMode: function(dir){
				if (dir){
					this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
				}
				this.picker
					.children('div')
					.hide()
					.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
						.css('display', 'block');
				this.updateNavArrows();
			}
		};

		var DateRangePicker = function(element, options){
			this.element = $(element);
			this.inputs = $.map(options.inputs, function(i){
				return i.jquery ? i[0] : i;
			});
			delete options.inputs;

			datepickerPlugin.call($(this.inputs), options)
				.bind('changeDate', $.proxy(this.dateUpdated, this));

			this.pickers = $.map(this.inputs, function(i){
				return $(i).data('datepicker');
			});
			this.updateDates();
		};
		DateRangePicker.prototype = {
			updateDates: function(){
				this.dates = $.map(this.pickers, function(i){
					return i.getUTCDate();
				});
				this.updateRanges();
			},
			updateRanges: function(){
				var range = $.map(this.dates, function(d){
					return d.valueOf();
				});
				$.each(this.pickers, function(i, p){
					p.setRange(range);
				});
			},
			dateUpdated: function(e){
				// `this.updating` is a workaround for preventing infinite recursion
				// between `changeDate` triggering and `setUTCDate` calling.  Until
				// there is a better mechanism.
				if (this.updating)
					return;
				this.updating = true;

				var dp = $(e.target).data('datepicker'),
					new_date = dp.getUTCDate(),
					i = $.inArray(e.target, this.inputs),
					j = i - 1,
					k = i + 1,
					l = this.inputs.length;
				if (i === -1)
					return;

				$.each(this.pickers, function(i, p){
					if (!p.getUTCDate())
						p.setUTCDate(new_date);
				});

				if (new_date < this.dates[j]){
					// Date being moved earlier/left
					while (j >= 0 && new_date < this.dates[j]){
						this.pickers[j--].setUTCDate(new_date);
					}
				}
				else if (new_date > this.dates[k]){
					// Date being moved later/right
					while (k < l && new_date > this.dates[k]){
						this.pickers[k++].setUTCDate(new_date);
					}
				}
				this.updateDates();

				delete this.updating;
			},
			remove: function(){
				$.map(this.pickers, function(p){ p.remove(); });
				delete this.element.data().datepicker;
			}
		};

		function opts_from_el(el, prefix){
			// Derive options from element data-attrs
			var data = $(el).data(),
				out = {}, inkey,
				replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
			prefix = new RegExp('^' + prefix.toLowerCase());
			function re_lower(_,a){
				return a.toLowerCase();
			}
			for (var key in data)
				if (prefix.test(key)){
					inkey = key.replace(replace, re_lower);
					out[inkey] = data[key];
				}
			return out;
		}

		function opts_from_locale(lang){
			// Derive options from locale plugins
			var out = {};
			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					return;
			}
			var d = dates[lang];
			$.each(locale_opts, function(i,k){
				if (k in d)
					out[k] = d[k];
			});
			return out;
		}

		var old = $.fn.datepicker;
		var datepickerPlugin = function(option){
			var args = Array.apply(null, arguments);
			args.shift();
			var internal_return;
			this.each(function(){
				var $this = $(this),
					data = $this.data('datepicker'),
					options = typeof option === 'object' && option;
				if (!data){
					var elopts = opts_from_el(this, 'date'),
						// Preliminary otions
						xopts = $.extend({}, defaults, elopts, options),
						locopts = opts_from_locale(xopts.language),
						// Options priority: js args, data-attrs, locales, defaults
						opts = $.extend({}, defaults, locopts, elopts, options);
					if ($this.hasClass('input-daterange') || opts.inputs){
						var ropts = {
							inputs: opts.inputs || $this.find('input').toArray()
						};
						$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
					}
					else {
						$this.data('datepicker', (data = new Datepicker(this, opts)));
					}
				}
				if (typeof option === 'string' && typeof data[option] === 'function'){
					internal_return = data[option].apply(data, args);
					if (internal_return !== undefined)
						return false;
				}
			});
			if (internal_return !== undefined)
				return internal_return;
			else
				return this;
		};
		$.fn.datepicker = datepickerPlugin;

		var defaults = $.fn.datepicker.defaults = {
			autoclose: false,
			beforeShowDay: $.noop,
			beforeShowMonth: $.noop,
			calendarWeeks: false,
			clearBtn: false,
			toggleActive: false,
			daysOfWeekDisabled: [],
			datesDisabled: [],
			endDate: Infinity,
			forceParse: true,
			format: 'mm/dd/yyyy',
			keyboardNavigation: true,
			language: 'en',
			minViewMode: 0,
			multidate: false,
			multidateSeparator: ',',
			orientation: "auto",
			rtl: false,
			startDate: -Infinity,
			startView: 0,
			todayBtn: false,
			todayHighlight: false,
			weekStart: 0,
			disableTouchKeyboard: false,
	        enableOnReadonly: true,
			container: 'body'
		};
		var locale_opts = $.fn.datepicker.locale_opts = [
			'format',
			'rtl',
			'weekStart'
		];
		$.fn.datepicker.Constructor = Datepicker;
		var dates = $.fn.datepicker.dates = {
			en: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				today: "Today",
				clear: "Clear"
			}
		};

		var DPGlobal = {
			modes: [
				{
					clsName: 'days',
					navFnc: 'Month',
					navStep: 1
				},
				{
					clsName: 'months',
					navFnc: 'FullYear',
					navStep: 1
				},
				{
					clsName: 'years',
					navFnc: 'FullYear',
					navStep: 10
			}],
			isLeapYear: function(year){
				return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
			},
			getDaysInMonth: function(year, month){
				return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
			},
			validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
			nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
			parseFormat: function(format){
				// IE treats \0 as a string end in inputs (truncating the value),
				// so it's a bad format delimiter, anyway
				var separators = format.replace(this.validParts, '\0').split('\0'),
					parts = format.match(this.validParts);
				if (!separators || !separators.length || !parts || parts.length === 0){
					throw new Error("Invalid date format.");
				}
				return {separators: separators, parts: parts};
			},
			parseDate: function(date, format, language){
				if (!date)
					return undefined;
				if (date instanceof Date)
					return date;
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir, i;
				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
					for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						switch (part[2]){
							case 'd':
								date.setUTCDate(date.getUTCDate() + dir);
								break;
							case 'm':
								date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
								break;
							case 'w':
								date.setUTCDate(date.getUTCDate() + dir * 7);
								break;
							case 'y':
								date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
								break;
						}
					}
					return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
				}
				parts = date && date.match(this.nonpunctuation) || [];
				date = new Date();
				var parsed = {},
					setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
					setters_map = {
						yyyy: function(d,v){
							return d.setUTCFullYear(v);
						},
						yy: function(d,v){
							return d.setUTCFullYear(2000+v);
						},
						m: function(d,v){
							if (isNaN(d))
								return d;
							v -= 1;
							while (v < 0) v += 12;
							v %= 12;
							d.setUTCMonth(v);
							while (d.getUTCMonth() !== v)
								d.setUTCDate(d.getUTCDate()-1);
							return d;
						},
						d: function(d,v){
							return d.setUTCDate(v);
						}
					},
					val, filtered;
				setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
				setters_map['dd'] = setters_map['d'];
				date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
				var fparts = format.parts.slice();
				// Remove noop parts
				if (parts.length !== fparts.length){
					fparts = $(fparts).filter(function(i,p){
						return $.inArray(p, setters_order) !== -1;
					}).toArray();
				}
				// Process remainder
				function match_part(){
					var m = this.slice(0, parts[i].length),
						p = parts[i].slice(0, m.length);
					return m.toLowerCase() === p.toLowerCase();
				}
				if (parts.length === fparts.length){
					var cnt;
					for (i=0, cnt = fparts.length; i < cnt; i++){
						val = parseInt(parts[i], 10);
						part = fparts[i];
						if (isNaN(val)){
							switch (part){
								case 'MM':
									filtered = $(dates[language].months).filter(match_part);
									val = $.inArray(filtered[0], dates[language].months) + 1;
									break;
								case 'M':
									filtered = $(dates[language].monthsShort).filter(match_part);
									val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
									break;
							}
						}
						parsed[part] = val;
					}
					var _date, s;
					for (i=0; i < setters_order.length; i++){
						s = setters_order[i];
						if (s in parsed && !isNaN(parsed[s])){
							_date = new Date(date);
							setters_map[s](_date, parsed[s]);
							if (!isNaN(_date))
								date = _date;
						}
					}
				}
				return date;
			},
			formatDate: function(date, format, language){
				if (!date)
					return '';
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var val = {
					d: date.getUTCDate(),
					D: dates[language].daysShort[date.getUTCDay()],
					DD: dates[language].days[date.getUTCDay()],
					m: date.getUTCMonth() + 1,
					M: dates[language].monthsShort[date.getUTCMonth()],
					MM: dates[language].months[date.getUTCMonth()],
					yy: date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear()
				};
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
				date = [];
				var seps = $.extend([], format.separators);
				for (var i=0, cnt = format.parts.length; i <= cnt; i++){
					if (seps.length)
						date.push(seps.shift());
					date.push(val[format.parts[i]]);
				}
				return date.join('');
			},
			headTemplate: '<thead>'+
								'<tr>'+
									'<th class="prev">&#171;</th>'+
									'<th colspan="5" class="datepicker-switch"></th>'+
									'<th class="next">&#187;</th>'+
								'</tr>'+
							'</thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot>'+
								'<tr>'+
									'<th colspan="7" class="today"></th>'+
								'</tr>'+
								'<tr>'+
									'<th colspan="7" class="clear"></th>'+
								'</tr>'+
							'</tfoot>'
		};
		DPGlobal.template = '<div class="datepicker">'+
								'<div class="datepicker-days">'+
									'<table class=" table-condensed">'+
										DPGlobal.headTemplate+
										'<tbody></tbody>'+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-months">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-years">'+
									'<table class="table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
							'</div>';

		$.fn.datepicker.DPGlobal = DPGlobal;


		/* DATEPICKER NO CONFLICT
		* =================== */

		$.fn.datepicker.noConflict = function(){
			$.fn.datepicker = old;
			return this;
		};

		/* DATEPICKER VERSION
		 * =================== */
		$.fn.datepicker.version =  "1.4.0";

		/* DATEPICKER DATA-API
		* ================== */

		$(document).on(
			'focus.datepicker.data-api click.datepicker.data-api',
			'[data-provide="datepicker"]',
			function(e){
				var $this = $(this);
				if ($this.data('datepicker'))
					return;
				e.preventDefault();
				// component click requires us to explicitly show it
				datepickerPlugin.call($this, 'show');
			}
		);
		$(function(){
			datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
		});

	}(window.jQuery));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".input-field{font-size:14px}.input-field label{color:dimgray}.input-field.disabled{opacity:0.5;pointer-events:none}.input-field .field-items{background:#fff;position:relative;vertical-align:middle;width:auto;min-width:16px}.input-field .field-items .suffix-overlay{position:absolute;top:1px;left:5px;line-height:28px;color:#aaa;font-family:sans-serif}.input-field .field-items .suffix-overlay .shim{visibility:hidden;display:inline-block}.input-field .field-items .suffix-overlay .value{padding-left:2.5px;padding-right:5px}.input-field .field-items .prefix-overlay{position:absolute;top:1px;left:5px;line-height:28px;color:#aaa;font-family:sans-serif}.input-field .field-items .field-item-input{box-shadow:inset 0 1px 2px rgba(0,0,0,0.15);position:relative;-webkit-transition:box-shadow linear 0.2s;transition:box-shadow linear 0.2s}.input-field .error-overlay{position:absolute;top:1px;right:5px;line-height:28px;color:#c55;font-size:.8em}.input-field .field-item{display:inline-block;white-space:nowrap;border:1px solid #aaa;border-left:0;height:28px;line-height:28px;vertical-align:top;overflow:hidden}.input-field .field-item.first{border:1px solid #aaa}.input-field .clickable{cursor:pointer}.input-field .addon{padding-left:8px;padding-right:8px;text-align:center;text-shadow:0 1px 0 white;background:#f0f0f0}.input-field .addon.clickable{text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.75);vertical-align:middle;background-image:-webkit-linear-gradient(top, #fff, #D0D0D0);background-image:linear-gradient(to bottom, #fff, #D0D0D0);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}.input-field .addon.clickable:hover{background-image:-webkit-linear-gradient(top, #fff, silver);background-image:linear-gradient(to bottom, #fff, silver)}.input-field .addon.clickable.open{background-color:#E6E6E6;background-image:none;box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}.input-field .field-item-input input,.input-field .field-item-input select,.input-field .field-item-input textarea{padding-left:5px;padding-right:5px;padding-top:0;padding-bottom:0;margin:0;border:0;outline:none;background:transparent;resize:none;color:#555}.input-field .field-item-input .placeholder{position:absolute;top:1px;right:5px;line-height:28px;left:6px;margin-right:6px;color:#999;font-size:0.9em}.input-field.warn .field-item-input{border-color:#aa4;background:#ffffd0}.input-field.hover .field-items .field-item-input{border-color:#666}.input-field.hover.disable .field-items .field-item-input{border-color:#aaa}.input-field.error .field-items .field-item-input{border-color:#c55;box-shadow:inset 0 1px 2px rgba(0,0,0,0.15),0 0 8px rgba(204,85,85,0.5)}.input-field.focus .field-items .field-item-input{border-color:#79f;box-shadow:inset 0 1px 0 rgba(0,0,0,0.015),0 0 8px rgba(82,168,236,0.5)}.input-field.flash .field-items .field-item-input{border-color:#a00;color:#a00;box-shadow:inset 0 1px 2px rgba(0,0,0,0.15),0 0 8px rgba(204,85,85,0.5);-webkit-transition:none;transition:none}.input-field.flash .field-items .field-item-input input,.input-field.flash .field-items .field-item-input select,.input-field.flash .field-items .field-item-input textarea{color:#a00}.input-field.flash label{color:#a00}.input-field.textarea-fix textarea{line-height:21px}.input-field.textarea-fix .placeholder{line-height:21px}.input-field.textarea-fix .field-item{height:auto}.input-field-group{font-size:0}.input-field-group .input-field{display:inline-block;white-space:nowrap;vertical-align:bottom}.submitting{color:#aaa}.tooltip-wrapper{position:absolute;top:0;left:0;z-index:1010;display:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,0.3);border-radius:6px;box-shadow:0 5px 10px rgba(0,0,0,0.2)}.tooltip-wrapper .tooltip-title{margin:0;padding:8px 14px;font-size:.85em;font-weight:normal;line-height:1.5em;background-color:#f2f2f2;border-bottom:1px solid rgba(0,0,0,0.1)}.tooltip-wrapper .form-input-tooltip{position:relative;display:block;margin:8px;padding:8px 14px;color:#555}.tooltip-wrapper .form-input-tooltip>:first-child{margin-top:0}.tooltip-wrapper .form-input-tooltip p,.tooltip-wrapper .form-input-tooltip ul,.tooltip-wrapper .form-input-tooltip ol{margin-bottom:0}.input-hidden{display:none}.filter-box .field-item-input{border-radius:10px/25px}.filter-box .field-item-input input{position:relative;width:100%;cursor:text}.filter-box .field-item-input .fb-icon-search{position:absolute;right:.4em;font-size:14px;cursor:default;pointer-events:none}.select-box>.field-items>.field-item-input>input{visibility:hidden}.select-box .field-item-input,.select-box input{cursor:pointer}.select-box .shim{position:absolute;top:0;left:0;width:100%;height:100%;text-align:middle;padding-left:5px;overflow:hidden;font-family:sans-serif}.select-box>.field-items{background-color:#ffffff;filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#eeeeee', GradientType=0 );background-image:-webkit-linear-gradient(#fff 20%, #f6f6f6 50%, #eee 52%, #f4f4f4 100%);background-image:linear-gradient(#fff 20%, #f6f6f6 50%, #eee 52%, #f4f4f4 100%)}.fb-select-panel{left:0;position:absolute;z-index:100;overflow:hidden;background:#fff;background-clip:padding-box;box-shadow:0 3px 8px rgba(0,0,0,0.4);border:1px solid #707070;border-top:1px solid #B6B6B6;border-radius:0 0 4px 4px;font-size:14px;cursor:default}.fb-select-panel .options{cursor:pointer;overflow:auto;max-height:250px}.fb-select-panel .filtered{display:none}.fb-select-panel.filtering .option{color:#eee}.fb-select-panel .option{padding:.25em;cursor:pointer}.fb-select-panel .option.selected{background-color:#3875d7;filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='$select-hoverBackgroundColor-light', endColorstr='$select-hoverBackgroundColor-dark', GradientType=0 );background-image:-webkit-linear-gradient(#3875d7 20%, #2a62bc 90%);background-image:linear-gradient(#3875d7 20%, #2a62bc 90%);color:#fff}.tms-select-dropdown-content{padding:5px}.dropdown-open-icon{position:absolute;top:.25em;right:10px}.dropdown-closed-icon{position:absolute;top:-.2em;right:10px}.ui-autocomplete{max-height:400px;overflow-y:auto;overflow-x:hidden}@font-face{font-family:'formBuilderIcons';src:url(" + __webpack_require__(1) + ");src:url(" + __webpack_require__(1) + "?#iefix) format(\"embedded-opentype\"),url(" + __webpack_require__(6) + ") format(\"truetype\"),url(" + __webpack_require__(7) + ") format(\"woff\"),url(" + __webpack_require__(5) + "#formBuilderIcons) format(\"svg\");font-weight:normal;font-style:normal}.fb-icon,.fb-icon.ui-icon{font-family:'formBuilderIcons';speak:none;font-style:normal;font-weight:normal;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-shadow:1px 1px 1px rgba(0,0,0,0.1);cursor:pointer;background:transparent;display:inline;text-indent:0}.fb-icon:hover{color:#46e}.fb-icon:active{color:#68f;text-shadow:0 0 1px rgba(0,0,0,0.3)}.fb-icon:before{text-indent:0}.ui-button .fb-icon{font-size:14px;line-height:17px}.ui-button .fb-icon:hover{color:inherit}.fb-icon-home:before{content:\"\\E000\"}.fb-icon-office:before{content:\"\\E001\"}.fb-icon-sort-up:before{content:\"\\E004\"}.fb-icon-sort-down:before{content:\"\\E005\"}.fb-icon-iphone:before{content:\"\\E012\"}.fb-icon-remove:before{content:\"\\E01A\"}.fb-icon-print:before{content:\"\\E02A\"}.fb-icon-search:before{content:\"\\E02D\"}.fb-icon-iphone:before{padding-left:.14em;padding-right:.15em}.noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.date-range-picker button{vertical-align:top}.date-range-picker .range-select{display:inline-block}.array-field-add a{color:#555;text-decoration:none;font-weight:bold}.array-field .input-field .addon.sort-handle{cursor:row-resize}.array-field-item{padding-bottom:5px}.array-field-item:hover .array-field-delete{color:#555}.array-field-delete{color:#bbb}.array-field-delete .fb-icon{text-shadow:none}.input-field .addon.array-field-delete,.input-field .addon.sort-handle,.input-field .addon.array-field-add{width:1em;padding-right:5.5px;padding-left:5.5px;text-align:center}.array-field-add-message.field-item{border:0;vertical-align:middle;margin-left:0.5em;cursor:pointer}.array-field-add-message.field-item:hover{text-decoration:underline}.text-submitter .send-instruction{width:100%;text-align:right;font-size:0.8em;margin-top:-3px;cursor:default}.fb-dropDownPanel{left:0;position:absolute;z-index:100;overflow:hidden;white-space:normal;background:#fff;background-clip:padding-box;box-shadow:0 3px 8px rgba(0,0,0,0.4);border:1px solid #707070;border-top:1px solid #B6B6B6;border-radius:0 0 4px 4px;padding:10px;font-size:14px;cursor:default}.fb-dropDownPanel .fb-dropDownPanel-content{position:relative}.fb-dropDownPanel .fb-dropDownPanel-content>:first-child{padding-top:0;margin-top:0}.selection-field{display:block;font-size:14px}.selection-field label{display:inline-block;margin:2px 0px;padding:2px 2px;cursor:pointer;color:inherit}.selection-field label input{cursor:pointer;vertical-align:middle}.selection-field label span{margin-left:5px;vertical-align:middle}.selection-field.hover label{color:inherit}.selection-field.disable{opacity:.7}.selection-field.error label{color:#c55;font-weight:bold}.selection-field-group{display:block;font-size:0px}.selection-field-group.selection-horizontal .selection-field{display:inline-block;white-space:nowrap;vertical-align:bottom}.selection-field-group.selection-horizontal .selection-field:not(:first-child){margin-left:1em}\n\n/*# sourceMappingURL=formBuilder.css.map */", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./formBuilder.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./formBuilder.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./normalize.css", function() {
				var newContent = require("!!./../css-loader/index.js!./normalize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * jquery-timepicker v1.8.11 - A jQuery timepicker plugin inspired by Google Calendar. It supports both mouse and keyboard navigation.
	 * Copyright (c) 2016 Jon Thornton - http://jonthornton.github.com/jquery-timepicker/
	 * License: MIT
	 */

	!function(a){"object"==typeof exports&&exports&&"object"==typeof module&&module&&module.exports===exports?a(__webpack_require__(3)): true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a(jQuery)}(function(a){function b(a){var b=a[0];return b.offsetWidth>0&&b.offsetHeight>0}function c(b){if(b.minTime&&(b.minTime=u(b.minTime)),b.maxTime&&(b.maxTime=u(b.maxTime)),b.durationTime&&"function"!=typeof b.durationTime&&(b.durationTime=u(b.durationTime)),"now"==b.scrollDefault)b.scrollDefault=function(){return b.roundingFunction(u(new Date),b)};else if(b.scrollDefault&&"function"!=typeof b.scrollDefault){var c=b.scrollDefault;b.scrollDefault=function(){return b.roundingFunction(u(c),b)}}else b.minTime&&(b.scrollDefault=function(){return b.roundingFunction(b.minTime,b)});if("string"===a.type(b.timeFormat)&&b.timeFormat.match(/[gh]/)&&(b._twelveHourTime=!0),b.showOnFocus===!1&&-1!=b.showOn.indexOf("focus")&&b.showOn.splice(b.showOn.indexOf("focus"),1),b.disableTimeRanges.length>0){for(var d in b.disableTimeRanges)b.disableTimeRanges[d]=[u(b.disableTimeRanges[d][0]),u(b.disableTimeRanges[d][1])];b.disableTimeRanges=b.disableTimeRanges.sort(function(a,b){return a[0]-b[0]});for(var d=b.disableTimeRanges.length-1;d>0;d--)b.disableTimeRanges[d][0]<=b.disableTimeRanges[d-1][1]&&(b.disableTimeRanges[d-1]=[Math.min(b.disableTimeRanges[d][0],b.disableTimeRanges[d-1][0]),Math.max(b.disableTimeRanges[d][1],b.disableTimeRanges[d-1][1])],b.disableTimeRanges.splice(d,1))}return b}function d(b){var c=b.data("timepicker-settings"),d=b.data("timepicker-list");if(d&&d.length&&(d.remove(),b.data("timepicker-list",!1)),c.useSelect){d=a("<select />",{"class":"ui-timepicker-select"});var g=d}else{d=a("<ul />",{"class":"ui-timepicker-list"});var g=a("<div />",{"class":"ui-timepicker-wrapper",tabindex:-1});g.css({display:"none",position:"absolute"}).append(d)}if(c.noneOption)if(c.noneOption===!0&&(c.noneOption=c.useSelect?"Time...":"None"),a.isArray(c.noneOption)){for(var h in c.noneOption)if(parseInt(h,10)==h){var j=e(c.noneOption[h],c.useSelect);d.append(j)}}else{var j=e(c.noneOption,c.useSelect);d.append(j)}if(c.className&&g.addClass(c.className),(null!==c.minTime||null!==c.durationTime)&&c.showDuration){"function"==typeof c.step?"function":c.step;g.addClass("ui-timepicker-with-duration"),g.addClass("ui-timepicker-step-"+c.step)}var l=c.minTime;"function"==typeof c.durationTime?l=u(c.durationTime()):null!==c.durationTime&&(l=c.durationTime);var m=null!==c.minTime?c.minTime:0,o=null!==c.maxTime?c.maxTime:m+w-1;m>o&&(o+=w),o===w-1&&"string"===a.type(c.timeFormat)&&c.show2400&&(o=w);var p=c.disableTimeRanges,q=0,v=p.length,x=c.step;"function"!=typeof x&&(x=function(){return c.step});for(var h=m,z=0;o>=h;z++,h+=60*x(z)){var A=h,B=t(A,c);if(c.useSelect){var C=a("<option />",{value:B});C.text(B)}else{var C=a("<li />");C.addClass(43200>A%86400?"ui-timepicker-am":"ui-timepicker-pm"),C.data("time",86400>=A?A:A%86400),C.text(B)}if((null!==c.minTime||null!==c.durationTime)&&c.showDuration){var D=s(h-l,c.step);if(c.useSelect)C.text(C.text()+" ("+D+")");else{var E=a("<span />",{"class":"ui-timepicker-duration"});E.text(" ("+D+")"),C.append(E)}}v>q&&(A>=p[q][1]&&(q+=1),p[q]&&A>=p[q][0]&&A<p[q][1]&&(c.useSelect?C.prop("disabled",!0):C.addClass("ui-timepicker-disabled"))),d.append(C)}if(g.data("timepicker-input",b),b.data("timepicker-list",g),c.useSelect)b.val()&&d.val(f(u(b.val()),c)),d.on("focus",function(){a(this).data("timepicker-input").trigger("showTimepicker")}),d.on("blur",function(){a(this).data("timepicker-input").trigger("hideTimepicker")}),d.on("change",function(){n(b,a(this).val(),"select")}),n(b,d.val(),"initial"),b.hide().after(d);else{var F=c.appendTo;"string"==typeof F?F=a(F):"function"==typeof F&&(F=F(b)),F.append(g),k(b,d),d.on("mousedown touchstart","li",function(c){b.off("focus.timepicker"),b.on("focus.timepicker-ie-hack",function(){b.off("focus.timepicker-ie-hack"),b.on("focus.timepicker",y.show)}),i(b)||b[0].focus(),d.find("li").removeClass("ui-timepicker-selected"),a(this).addClass("ui-timepicker-selected"),r(b)&&(b.trigger("hideTimepicker"),d.on("mouseup.timepicker touchend.timepicker","li",function(a){d.off("mouseup.timepicker touchend.timepicker"),g.hide()}))})}}function e(b,c){var d,e,f;return"object"==typeof b?(d=b.label,e=b.className,f=b.value):"string"==typeof b?d=b:a.error("Invalid noneOption value"),c?a("<option />",{value:f,"class":e,text:d}):a("<li />",{"class":e,text:d}).data("time",String(f))}function f(a,b){return a=b.roundingFunction(a,b),null!==a?t(a,b):void 0}function g(){return new Date(1970,0,1,0,0,0)}function h(b){var c=a(b.target),d=c.closest(".ui-timepicker-input");0===d.length&&0===c.closest(".ui-timepicker-wrapper").length&&(y.hide(),a(document).unbind(".ui-timepicker"),a(window).unbind(".ui-timepicker"))}function i(a){var b=a.data("timepicker-settings");return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&b.disableTouchKeyboard}function j(b,c,d){if(!d&&0!==d)return!1;var e=b.data("timepicker-settings"),f=!1,d=e.roundingFunction(d,e);return c.find("li").each(function(b,c){var e=a(c);if("number"==typeof e.data("time"))return e.data("time")==d?(f=e,!1):void 0}),f}function k(a,b){b.find("li").removeClass("ui-timepicker-selected");var c=u(m(a),a.data("timepicker-settings"));if(null!==c){var d=j(a,b,c);if(d){var e=d.offset().top-b.offset().top;(e+d.outerHeight()>b.outerHeight()||0>e)&&b.scrollTop(b.scrollTop()+d.position().top-d.outerHeight()),d.addClass("ui-timepicker-selected")}}}function l(b,c){if(""!==this.value&&"timepicker"!=c){var d=a(this);if(!d.is(":focus")||b&&"change"==b.type){var e=d.data("timepicker-settings"),f=u(this.value,e);if(null===f)return void d.trigger("timeFormatError");var g=!1;null!==e.minTime&&f<e.minTime?g=!0:null!==e.maxTime&&f>e.maxTime&&(g=!0),a.each(e.disableTimeRanges,function(){return f>=this[0]&&f<this[1]?(g=!0,!1):void 0}),e.forceRoundTime&&(f=e.roundingFunction(f,e));var h=t(f,e);g?n(d,h,"error")&&d.trigger("timeRangeError"):n(d,h)}}}function m(a){return a.is("input")?a.val():a.data("ui-timepicker-value")}function n(a,b,c){if(a.is("input")){a.val(b);var d=a.data("timepicker-settings");d.useSelect&&"select"!=c&&"initial"!=c&&a.data("timepicker-list").val(f(u(b),d))}return a.data("ui-timepicker-value")!=b?(a.data("ui-timepicker-value",b),"select"==c?a.trigger("selectTime").trigger("changeTime").trigger("change","timepicker"):"error"!=c&&a.trigger("changeTime"),!0):(a.trigger("selectTime"),!1)}function o(a){switch(a.keyCode){case 13:case 9:return;default:a.preventDefault()}}function p(c){var d=a(this),e=d.data("timepicker-list");if(!e||!b(e)){if(40!=c.keyCode)return!0;y.show.call(d.get(0)),e=d.data("timepicker-list"),i(d)||d.focus()}switch(c.keyCode){case 13:return r(d)&&y.hide.apply(this),c.preventDefault(),!1;case 38:var f=e.find(".ui-timepicker-selected");return f.length?f.is(":first-child")||(f.removeClass("ui-timepicker-selected"),f.prev().addClass("ui-timepicker-selected"),f.prev().position().top<f.outerHeight()&&e.scrollTop(e.scrollTop()-f.outerHeight())):(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")),!1;case 40:return f=e.find(".ui-timepicker-selected"),0===f.length?(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")):f.is(":last-child")||(f.removeClass("ui-timepicker-selected"),f.next().addClass("ui-timepicker-selected"),f.next().position().top+2*f.outerHeight()>e.outerHeight()&&e.scrollTop(e.scrollTop()+f.outerHeight())),!1;case 27:e.find("li").removeClass("ui-timepicker-selected"),y.hide();break;case 9:y.hide();break;default:return!0}}function q(c){var d=a(this),e=d.data("timepicker-list"),f=d.data("timepicker-settings");if(!e||!b(e)||f.disableTextInput)return!0;switch(c.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:f.typeaheadHighlight?k(d,e):e.hide()}}function r(a){var b=a.data("timepicker-settings"),c=a.data("timepicker-list"),d=null,e=c.find(".ui-timepicker-selected");return e.hasClass("ui-timepicker-disabled")?!1:(e.length&&(d=e.data("time")),null!==d&&("string"!=typeof d&&(d=t(d,b)),n(a,d,"select")),!0)}function s(a,b){a=Math.abs(a);var c,d,e=Math.round(a/60),f=[];return 60>e?f=[e,x.mins]:(c=Math.floor(e/60),d=e%60,30==b&&30==d&&(c+=x.decimal+5),f.push(c),f.push(1==c?x.hr:x.hrs),30!=b&&d&&(f.push(d),f.push(x.mins))),f.join(" ")}function t(b,c){if(null===b)return null;var d=new Date(v.valueOf()+1e3*b);if(isNaN(d.getTime()))return null;if("function"===a.type(c.timeFormat))return c.timeFormat(d);for(var e,f,g="",h=0;h<c.timeFormat.length;h++)switch(f=c.timeFormat.charAt(h)){case"a":g+=d.getHours()>11?x.pm:x.am;break;case"A":g+=d.getHours()>11?x.PM:x.AM;break;case"g":e=d.getHours()%12,g+=0===e?"12":e;break;case"G":e=d.getHours(),b===w&&(e=24),g+=e;break;case"h":e=d.getHours()%12,0!==e&&10>e&&(e="0"+e),g+=0===e?"12":e;break;case"H":e=d.getHours(),b===w&&(e=c.show2400?24:0),g+=e>9?e:"0"+e;break;case"i":var i=d.getMinutes();g+=i>9?i:"0"+i;break;case"s":b=d.getSeconds(),g+=b>9?b:"0"+b;break;case"\\":h++,g+=c.timeFormat.charAt(h);break;default:g+=f}return g}function u(a,b){if(""===a)return null;if(!a||a+0==a)return a;if("object"==typeof a)return 3600*a.getHours()+60*a.getMinutes()+a.getSeconds();a=a.toLowerCase().replace(/[\s\.]/g,""),("a"==a.slice(-1)||"p"==a.slice(-1))&&(a+="m");var c="("+x.am.replace(".","")+"|"+x.pm.replace(".","")+"|"+x.AM.replace(".","")+"|"+x.PM.replace(".","")+")?",d=new RegExp("^"+c+"([0-9]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?"+c+"$"),e=a.match(d);if(!e)return null;var f=parseInt(1*e[2],10),g=f>24?f%24:f,h=e[1]||e[5],i=g;if(12>=g&&h){var j=h==x.pm||h==x.PM;i=12==g?j?12:0:g+(j?12:0)}var k=1*e[3]||0,l=1*e[4]||0,m=3600*i+60*k+l;if(12>g&&!h&&b&&b._twelveHourTime&&b.scrollDefault){var n=m-b.scrollDefault();0>n&&n>=w/-2&&(m=(m+w/2)%w)}return m}var v=g(),w=86400,x={am:"am",pm:"pm",AM:"AM",PM:"PM",decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},y={init:function(b){return this.each(function(){var e=a(this),f=[];for(var g in a.fn.timepicker.defaults)e.data(g)&&(f[g]=e.data(g));var h=a.extend({},a.fn.timepicker.defaults,f,b);if(h.lang&&(x=a.extend(x,h.lang)),h=c(h),e.data("timepicker-settings",h),e.addClass("ui-timepicker-input"),h.useSelect)d(e);else{if(e.prop("autocomplete","off"),h.showOn)for(var i in h.showOn)e.on(h.showOn[i]+".timepicker",y.show);e.on("change.timepicker",l),e.on("keydown.timepicker",p),e.on("keyup.timepicker",q),h.disableTextInput&&e.on("keydown.timepicker",o),l.call(e.get(0))}})},show:function(c){var e=a(this),f=e.data("timepicker-settings");if(c&&c.preventDefault(),f.useSelect)return void e.data("timepicker-list").focus();i(e)&&e.blur();var g=e.data("timepicker-list");if(!e.prop("readonly")&&(g&&0!==g.length&&"function"!=typeof f.durationTime||(d(e),g=e.data("timepicker-list")),!b(g))){e.data("ui-timepicker-value",e.val()),k(e,g),y.hide(),g.show();var l={};f.orientation.match(/r/)?l.left=e.offset().left+e.outerWidth()-g.outerWidth()+parseInt(g.css("marginLeft").replace("px",""),10):l.left=e.offset().left+parseInt(g.css("marginLeft").replace("px",""),10);var n;n=f.orientation.match(/t/)?"t":f.orientation.match(/b/)?"b":e.offset().top+e.outerHeight(!0)+g.outerHeight()>a(window).height()+a(window).scrollTop()?"t":"b","t"==n?(g.addClass("ui-timepicker-positioned-top"),l.top=e.offset().top-g.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10)):(g.removeClass("ui-timepicker-positioned-top"),l.top=e.offset().top+e.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10)),g.offset(l);var o=g.find(".ui-timepicker-selected");if(!o.length){var p=u(m(e));null!==p?o=j(e,g,p):f.scrollDefault&&(o=j(e,g,f.scrollDefault()))}if(o&&o.length){var q=g.scrollTop()+o.position().top-o.outerHeight();g.scrollTop(q)}else g.scrollTop(0);return f.stopScrollPropagation&&a(document).on("wheel.ui-timepicker",".ui-timepicker-wrapper",function(b){b.preventDefault();var c=a(this).scrollTop();a(this).scrollTop(c+b.originalEvent.deltaY)}),a(document).on("touchstart.ui-timepicker mousedown.ui-timepicker",h),a(window).on("resize.ui-timepicker",h),f.closeOnWindowScroll&&a(document).on("scroll.ui-timepicker",h),e.trigger("showTimepicker"),this}},hide:function(c){var d=a(this),e=d.data("timepicker-settings");return e&&e.useSelect&&d.blur(),a(".ui-timepicker-wrapper").each(function(){var c=a(this);if(b(c)){var d=c.data("timepicker-input"),e=d.data("timepicker-settings");e&&e.selectOnBlur&&r(d),c.hide(),d.trigger("hideTimepicker")}}),this},option:function(b,e){return"string"==typeof b&&"undefined"==typeof e?a(this).data("timepicker-settings")[b]:this.each(function(){var f=a(this),g=f.data("timepicker-settings"),h=f.data("timepicker-list");"object"==typeof b?g=a.extend(g,b):"string"==typeof b&&(g[b]=e),g=c(g),f.data("timepicker-settings",g),h&&(h.remove(),f.data("timepicker-list",!1)),g.useSelect&&d(f)})},getSecondsFromMidnight:function(){return u(m(this))},getTime:function(a){var b=this,c=m(b);if(!c)return null;var d=u(c);if(null===d)return null;a||(a=v);var e=new Date(a);return e.setHours(d/3600),e.setMinutes(d%3600/60),e.setSeconds(d%60),e.setMilliseconds(0),e},setTime:function(a){var b=this,c=b.data("timepicker-settings");if(c.forceRoundTime)var d=f(u(a),c);else var d=t(u(a),c);return a&&null===d&&c.noneOption&&(d=a),n(b,d),b.data("timepicker-list")&&k(b,b.data("timepicker-list")),this},remove:function(){var a=this;if(a.hasClass("ui-timepicker-input")){var b=a.data("timepicker-settings");return a.removeAttr("autocomplete","off"),a.removeClass("ui-timepicker-input"),a.removeData("timepicker-settings"),a.off(".timepicker"),a.data("timepicker-list")&&a.data("timepicker-list").remove(),b.useSelect&&a.show(),a.removeData("timepicker-list"),this}}};a.fn.timepicker=function(b){return this.length?y[b]?this.hasClass("ui-timepicker-input")?y[b].apply(this,Array.prototype.slice.call(arguments,1)):this:"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.timepicker"):y.init.apply(this,arguments):this},a.fn.timepicker.defaults={appendTo:"body",className:null,closeOnWindowScroll:!1,disableTextInput:!1,disableTimeRanges:[],disableTouchKeyboard:!1,durationTime:null,forceRoundTime:!1,maxTime:null,minTime:null,noneOption:!1,orientation:"l",roundingFunction:function(a,b){if(null===a)return null;if("number"!=typeof b.step)return a;var c=a%(60*b.step);return c>=30*b.step?a+=60*b.step-c:a-=c,a},scrollDefault:null,selectOnBlur:!1,show2400:!1,showDuration:!1,showOn:["click","focus"],showOnFocus:!0,step:30,stopScrollPropagation:!1,timeFormat:"g:ia",typeaheadHighlight:!0,useSelect:!1}});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);