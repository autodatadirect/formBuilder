(function(){
	types.multiselect = {
		setUp: function(ifw) {
			var e = ifw.element,
				o = ifw.options,
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
				select: function(ev, ifw) {
					selectionsLayer.append('<div class="selection">' + ifw.item.label + '</div>');

					/*
					 * return false here so that the value of the input is not changed by jquery UI autocomplete
					 */
					//ev.stopPropagation();
					//ev.preventDefault();
					return false;
				}
			});



		},
		tearDown: function(ifw) {
			var o = ifw.options,
				e = ifw.element;
			e.html('').off('.type-code').autocomplete('destroy');
			delete o.codeTable;
		},
		validate: function(ifw) {
			var e = ifw.element;
			if(binarySearch(e.val(), ifw.options._codeTable) < 0) {
				return {
					message: 'invalid'
				};
			}
		}
	};

})();
