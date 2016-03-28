/** 
 * formBuilder - An advanced HTML5 form creation & validation framework
 * @version v2.1.3
 * @link http://autodatadirect.github.io/formBuilder/
 * @repository https://github.com/autodatadirect/formBuilder
 * @license MIT
 */

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