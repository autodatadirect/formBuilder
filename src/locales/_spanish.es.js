/**
 * Localization support
 *
 * Language: Spanish
 * Code: 'es'
 *
 * This is included by default
 */

(function($){
	'use strict';

	var code = 'es',
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
		remove: 'Quitar',

		// textSubmitter TODO
		
		// tmsPhone
		mobile: 'Móvil',
		home: 'Casa',
		work: 'Trabajo',
		fax: 'Fax',

		// booleanSelectCreator
		yes: 'Yes',
		no: 'No'
	});


	/**
	 * Extension language support
	 */
	// Datepicker
	$.fn.datepicker.dates.es = {
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