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
 * Unless $.formBuilder.util.lang.code is already defined, this will
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

	if(typeof($.formBuilder.util) === 'undefined') {
		$.formBuilder.util = {};
	}

	var lang = $.formBuilder.util.lang;

	if(!lang) {
		lang = $.formBuilder.util.lang = {};
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