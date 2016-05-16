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
