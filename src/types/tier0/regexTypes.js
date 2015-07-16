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
			validate: function(ui) {
				if(!ui.element.val().match(pattern)) {
					return {
						message: 'invalid'
					};
				}
			}
		};

		if(filter || max) {
			type.setUp = function(ui) {

				var filterData = {
					pattern: filter || /./,
					toUpper: flags.toUpper,
					max: max || 0
				};

				if(ui.element.attr('data-max')){
					filterData.max = ui.element.attr('data-max');
				}

				//console.log('setup ', ui.element.attr('name'), filterData, max);
				ui.element.inputFilter(filterData);
			};
		}

		if(flags.cannedFormatter !== undefined) {
			if($.isFunction(cannedFormatters[flags.cannedFormatter])) {
				type.format = cannedFormatters[flags.cannedFormatter];

				// add converters
				type.converter = {
					toField: function (val, ui) { return type.format(val); },
					fromField: function (val, ui) { return type.format(val); }
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