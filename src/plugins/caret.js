/**
 * caret plugin
 */

(function($){
	'use strict';
	
	/*
	 * This plugin only operates on the first element of the working set
	 */
	$.fn.caret = function(begin, end) {

		if(this.length === 0) {
			return this;
		}

		var input = this[0],
			range;

		if(typeof begin === 'number') {
			/*
			 * setter mode
			 */

			if(!$(input).is(':visible')) {
				return input;
			}

			end = (typeof end === 'number') ? end : begin;

			if(input.setSelectionRange) {
				input.focus();
				input.setSelectionRange(begin, end);
				
				/*
				 * chrome hack
				 * TMS-2049
				 * Still need a better way to do this, chrome fails to set the scrolLeft
				 * whem the cursor moves, still will only work it they are at the end of the text
				 */
				try{
					if(end === input.value.length){
						input.scrollLeft = 9999999999;
					}
				}catch(err){}
			} else if(input.createTextRange) {
				range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', begin);
				range.select();
			}


		} else {
			/*
			 * getter mode
			 */

			if(!$(input).is(':visible')) {
				var l = $(input).val().length;
				return {
					begin: l,
					end: l
				};
			}

			if(input.setSelectionRange) {
			begin = input.selectionStart;
				end = input.selectionEnd;
			} else if(document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				begin = -range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}

			return {
				begin: begin,
				end: end
			};
		}

		return input;
	};
})(jQuery);