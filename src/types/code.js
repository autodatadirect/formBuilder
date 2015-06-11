/*
	 * Large Code Type Support (code)
	 *
	 * TODO: update this so that the code table does not have to global (e.g. assigned to window)
	 *
	 * Example Code Table:
	 * [
	 *   {"value" : "100",  "label" : "BROWARD TRAILER"},
	 *   {"value" : "AAA",  "label" : "122 WELDING LLC. TRAILER"},
	 *   {"value" : "BBB",  "label" : "22 WELDING LLC. TRAILER"},
	 *   {"value" : "CCC",  "label" : "333 WELDING LLC. TRAILER"},
	 *   {"value" : "EEE",  "label" : "444 WELDING LLC. TRAILER"},
	 *   {"value" : "ZZZ",  "label" : "MEADOW CREEK WELDING LLC."}
	 * ]
	 */



(function($) {

	/*
	 * binary array search, codes must be in alpha order!
	 */
	var binarySearch = function(needle, haystack) {
		var mid, element;

		if(!haystack.length) {
			return -1;
		}

		var high = haystack.length - 1;
		var low = 0;

		needle = needle.toLowerCase();

		//TODO: only supporting case insensitive right now
		while(low <= high) {
			mid = parseInt((low + high) / 2, 10);
			element = haystack[mid].value.toLowerCase();
			if(element > needle) {
				high = mid - 1;
			} else if(element < needle) {
				low = mid + 1;
			} else {
				return mid;
			}
		}
		return -1;
	};

	var codeListFilter = function(codeTable) {
		return function(request, response) {
			if(request.term.length < 3) {
				response();
				return;
			}

			var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

			var matches = $.grep(codeTable, function(value) {
				return matcher.test(value.label) || matcher.test(value.value);
			});

			response(matches);
		};
	};

	$.add123.inputField.types.code = {
		setUp: function(ui) {
			var e = ui.element,
				o = ui.options;


			var codeTableName = e.data('codes');

			if(!codeTableName) {
				throw new Error('not data-codes attribute given for input ' + e.attr('name'));
			}

			/*
			 * save code table reference to options
			 */
			o._codeTable = window[codeTableName];

			if(!o._codeTable) {
				throw new Error('ERROR: data-codes points to an undefined window property window[' + codeTableName + '] for input [name=' + e.attr('name') + ']');
			}

			e.autocomplete({
				source: codeListFilter(o._codeTable)
			}).on('autocompleteselect.type-code', function(ev, ui) {
				/*
				if(ui.item && ui.item.label) {
					//o._layers.notice.html(ui.item.label).show();
				} else {
					//o._layers.notice.html('').hide(0);
				}
				*/
			}).on('keyup.type-code', function(ev) {
				/*
				var val = binarySearch(e.val(), o._codeTable);
				if(val > -1) {
					//o._layers.notice.html(o._codeTable[val].label).show();
				} else {
					//o._layers.notice.html('').hide(0);
				}
				*/
			});

		},
		tearDown: function(ui) {
			var o = ui.options,
				e = ui.element;
			e.html('').off('.type-code').autocomplete('destroy');
			delete o.codeTable;
		},
		validate: function(ui) {
			var e = ui.element;
			if(binarySearch(e.val(), ui.options._codeTable) < 0) {
				return {
					message: 'invalid'
				};
			}
		}
	};

})(jQuery);