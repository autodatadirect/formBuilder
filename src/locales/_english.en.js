/**
 * Localization support
 *
 * Language: English
 * Code: 'en'
 *
 * This is included by default
 */

(function($){
	'use strict';

	var code = 'en',
		lang;

	/**
	 * Make sure language structure is setup
	 */
	if(!window.util) {
		window.util = {};
	}

	lang = window.util.lang;

	if(!lang) {
		lang = window.util.lang = {};
	}
	if(!lang.locales) {
		lang.locales = {};
	}
	if(!lang.locales[code]) {
		lang.locales[code] = {};
	}

	/**
	 * Define formBuilder language
	 */
	$.extend(true, lang.locales[code], {
		// TODO
	});



	/**
	 * Extension language support
	 */
	// Datepicker (default english included)
	

})(jQuery);