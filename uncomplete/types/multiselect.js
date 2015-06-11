(function(){
	types.multiselect = {
		setUp: function(ui) {
			var e = ui.element,
				o = ui.options,
				field = o._field;


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

			var selectionsLayer = $('<div class="selections"></div>').prependTo(field.find('.input-wrapper'));

			e.autocomplete({
				source: codeListFilter(o._codeTable),
				select: function(ev, ui) {
					selectionsLayer.append('<div class="selection">' + ui.item.label + '</div>');

					/*
					 * return false here so that the value of the input is not changed by jquery UI autocomplete
					 */
					//ev.stopPropagation();
					//ev.preventDefault();
					return false;
				}
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

})();
