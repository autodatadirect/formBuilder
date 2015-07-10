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
		// arrayField
		remove: 'Remove',

		// textSubmitter TODO
		
		// tmsPhone
		mobile: 'Mobile',
		home: 'Home',
		work: 'Work',
		fax: 'Fax',

		// booleanSelectCreator
		yes: 'Yes',
		no: 'No',

		// dateRangePicker
		from :'From',
		to : 'To',
		custom :'Custom',
		day : 'Day',
		week:'Week',
		month :'Month',
		year :'Year'
	});



	/**
	 * Extension language support
	 */
	// Datepicker (default english included)
	

})(jQuery);