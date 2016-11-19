/*
* A subset of the ADD Utility library. 
*
* It only declares objects/functions when they do not already exist
*/


/** export to another file, refactor to use i18next
 * 
 *
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
*/

if(typeof(window.isEmpty) === 'undefined') {
	window.isEmpty = function isEmpty(a) {
		if(a === 0){
			return false;
		}
		return !a;
	};
}







