/**
 * Data Type 'tmsFullname', an extension of utext
 */

(function($){
	'use strict';
	
	var types = $.add123.inputField.types;

	types.tmsFullname = $.extend({}, types.utext, {
		validate: function (ui) {
			var value = ui.element.val();

			value = value.trim().replace(/\s{2,}/g, ' '); // Replace outside whitespace with two or more whitespaces?

			if (value.split(' ').length < 2) {
				return {
					message: 'first and last name'
				};
			}

			if(isNaN(value)) {
				value = value.toString();
				var count = 0; 
				var countH = 0; 
				var countA = 0; 
				for(var i = 0; i < value.length; i++){

					if((value[i]) === ','){
					count++;}
					if((value[i]) === '-'){
					countH++;}
					if((value[i]) === '\''){
					countA++;}
					if(value[i].match(/^[!@#\$%\^&*()_+={}\[\]\\\/|;:"\?<>\.~`]?$/)){
					return {
					message: 'illegal symbol'
					};}
					if(value[i].match(/^[0-9]$/)){
					return {
					message: 'no numbers'
					};}					
				}
				if(count > 1){
					return {
					message: 'one comma allowed'
					};
				}
				if(countH > 1){
					return {
					message: 'one hyphen allowed'
					};
				}
				if(countA > 3){
					return {
					message: 'one apostrophe per name'
					};
				}
			}
		}
	});
})(jQuery);
