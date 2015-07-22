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
	
	if(typeof(util.lang) === 'undefined') {
		util.lang = {};
	}

	// Set the language
	var lang = util.lang;
	if(typeof(lang.code) === 'undefined' || !lang.locales[lang.code]) {
		lang.code = 'en';
	}

	// Create dictionary, based off of english and then replacing them with new words (prevents missing words)
	lang.dict = {};
	$.extend(true, lang.dict, lang.locales.en);
	if(lang.code !== 'en') {
		$.extend(true, lang.dict, lang.locales[lang.code]);
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
})(jQuery);
