/**
 * Datatype 'select'
 * 
 */

(function($) {
	'use strict';
	
	var doc = $(document);
	$.formBuilder.inputField.types.select = {
		setUp: function(inputWidget) {
			var self = this, // Object = {}
				o = inputWidget.options,
				e = inputWidget.element;

			self.element = e;
			self.source = [];
			self.inputWidget = inputWidget;

			var fieldGroup = self.fieldGroup = inputWidget.field.parents('.input-field-group');

			if(e.is('select')){
				console.log('** ERROR: deprecated use of <select> in the select type **');
			}

			e.css('opacity', 0);

			/*
			 * width(inputWidget.layers.items.width() - 26).
			 */
			var shim = self.shim = $('<div class="shim"></div>').insertAfter(e);

			inputWidget.field.addClass('select-box');

			self.iconClosed = $('<span class="fb-icon fb-icon-sort-down dropdown-closed-icon"></span>').insertAfter(e);
			self.iconOpen = $('<span class="fb-icon fb-icon-sort-up dropdown-open-icon"></span>').insertAfter(e).hide();
			


			/*
			self.iconClear = $('<span class="fb-icon fb-icon-erase clear-icon"></span>').insertAfter(shim).on('click', function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				self.clear();
				e.change();
				return false;
			});
			*/
			var panel = self.panel = $('<div class="dropdown-panel"><div class="tms-select-dropdown-content"><div class="search" style="position:relative;"/><div class="options" style="position:relative;"/></div></div>').hide();
			self.options = panel.find('.options');

			inputWidget.layers.items.append(panel).css('position', 'relative');

			var selectionClass = self.sectionClass =  'selected';

			panel.on('click', '.option', function () {
				self._setSelected();
			}).on('mouseenter', '.option', function () {
				panel.find('.' + selectionClass).removeClass(selectionClass);
				$(this).addClass(selectionClass);
			}).on('mouseleave', '.option', function () {
				$(this).removeClass(selectionClass);
			});

			inputWidget.layers.items.on('click', function (ev) {
				if (inputWidget.states.disable) {
					return;
				}
				var target = $(ev.target);

				if(target.childOf(panel, true)) {
					return;
				}

				setTimeout(function() {
					self.toggle();
				}, 0);
			});

			/*
			 * stop all enter and esc key events to leave the field
			 */
			/*
			inputWidget.field.on('keydown', function (ev) {

				if(ev.which === 13){
					ev.preventDefault();
					self._setSelected();
				}


				if(ev.which === 27 || ev.which === 13){
					ev.preventDefault();
					ev.stopPropagation();
					self.element.focus();
				}

			});
			*/

			/*
			 * build filter input
			 */
			var filter = self.filter = $('<input type="text" class="filter-box"/>')
				.appendTo(panel.find('.search')).inputField();

			filter.after('<span class="fb-icon fb-icon-search"></span>');
			filter.parents('.field-item').first().addClass('first');

			filter.parent().css({
					display: 'block',
					paddingRight: '2em'
				})
				.parent().css('display', 'block')
				.parent().css('display', 'block');
			/*
			 * kill click event, to prevent the inputField from grabbing focus
			 */

			filter.on('click', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
			});

			/*
			 * down 40
			 * up 39
			 * left 37
			 * right 39
			 */


			e.on('keydown', $.proxy(self._keyDownNavigate, self));
			filter.on('keydown', $.proxy(self._keyDownNavigate, self));
			filter.on('keyup', $.proxy(self._onKeyup, self));

			filter.on('dirty clean', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
			});

			self.closeListener = function (ev) {
				var which = ev.which;
				/*
				if(ev.which === 9){

				}
				*/

				if(which === 27 || which === 13){
					ev.preventDefault();
					ev.stopPropagation();

					if(which === 13){
						self._setSelected();
					}else{
						self.element.focus();
					}

					setTimeout(function() {
						self.close();
					}, 0);
					return;
				}

				var target = $(ev.target);

				if(!target.childOf(panel, true) && !target.childOf(fieldGroup, true)){
					setTimeout(function() {
						self.close();
					}, 0);
				}

			};

			self.update();
		},

		_keyDownNavigate: function (ev) {
			var self = this,
				panel = self.panel,
				selectionClass = self.sectionClass,
				which = ev.which;

			/*
			 * special handling for tab, does not perform any function (keeping for legacy)
			 */
			if(which === 9){
				self.element.next('input').focus();
				return;
			}


			if(which === 27 || which === 13){
				ev.preventDefault();
				return;
			}

			var selected, next;

			/*
			 * move down
			 */
			if(which === 40){
				selected = panel.find('.' + selectionClass);

				if(!selected.length){
					panel.find('.option:first').addClass(selectionClass);
				}else{
					next = selected.next();
					if(next.length){
						next.addClass(selectionClass);
						selected.removeClass(selectionClass);
					}
				}

				self._scroll();
			}

			/*
			 * move down
			 */
			if(which === 38){
				selected = panel.find('.' + selectionClass);

				if(!selected.length){
					panel.find('.option:last').addClass(selectionClass);
				}else{
					next = selected.prev();
					if(next.length){
						next.addClass(selectionClass);
						selected.removeClass(selectionClass);
					}

				}

				self._scroll();
			}

			if(which < 32 || which > 126){
				return;
			}
			self.open();
		},

		_onKeyup: function (ev) {
			var self = this,
				filter = self.filter,
				which = ev.which,
				val = filter.val();

			if(self.filterValue === val){
				return;
			}

			self.filterValue = val;


			self._filterOptions();
		},

		_setSelected: function () {
			var self = this,
				e = self.element,
				selected = self.panel.find('.selected:not(.filtered):visible');

			/*
			 * use the first value if none of the options are selected
			 */
			if(!selected.length){
				self._selectFirstNonEmptyOption();
			}

			selected = self.panel.find('.selected:not(.filtered):visible');

			var item = self.item = selected.data('item');
			/*
			 * TMS-1137
			 * if nothing is selected, ignore this call
			 */
			if(!item){
				return;
			}

			self._setLabel(self.renderLabel(item));

			self.close();
			e.val(self.item.value);




			e.focus();
			e.change();
			self.inputWidget.redraw();
			self.showHideCommand();
		},

		_selectFirstNonEmptyOption: function () {
			var self = this;
			self._removeSelection();
			self.panel.find('.option:not(.filtered):visible').each(function () {
				var option = $(this);
				if(option.html()){
					option.addClass('selected');
					return false;
				}
			});
		},

		_set: function (val) {
			var self = this;

			self.filter.val('');
			self.filterValue = '';

			self.item = undefined;

			self.loaded.done(function () {
				self._removeSelection();
				var options = self.panel.find('.option');

				options.each(function () {
					var item = $(this),
						itemData = item.data('item');

					if(self._equal(itemData, val)){
						item.addClass('selected');
						self.item = itemData;
						self._setLabel(itemData.label);
						self.showHideCommand();
						return false;
					}
				});

				if(!self.item || !self.item.value){
					if(self.inputWidget._trigger('itemnotfound', null, [val])){
						self._handleItemNotFound();
					}
				}
			});
		},

		_removeSelection: function () {
			this.panel.find('.option.selected').removeClass('selected');
		},

		_handleItemNotFound: function () {
			var self = this,
				e = self.element;
			
			self._setDefaultItem();

			if(!self.item || !self.item.value){
				self._selectFirstItem();
			}
		},

		_setDefaultItem: function () {
			var self = this,
				e = self.element,
				options = self.panel.find('.option'),
				defaultValue =  { value: e.attr('data-default')};

			options.each(function () {
				var item = $(this),
					itemData = item.data('item');

				if(self._equal(itemData, defaultValue)){
					if(e.attr('name') === 'params.category'){
						console.log('found defaultValue', defaultValue, itemData);
					}
					item.addClass('selected');
					self.item = itemData;
					self._setLabel(itemData.label);
					self.showHideCommand();
					return false;
				}
			});
		},

		_selectFirstItem: function() {
			var self = this,
				e = self.element,
				options = self.panel.find('.option');

			self.item = options.first().addClass('selected').data('item');
	
			if(self.item && self.item.label) {
				self._setLabel(self.item.label);
			} else {
				self._setLabel('');
			}

			self.showHideCommand();
		},

		showHideCommand: function () {
			var self = this,
				showClass = self.item && self.item.showClass,
				sections = self.showHideSections;

			if(!sections){
				return;
			}

			sections.hide();

			if(!showClass){
				return;
			}

			sections.filter('.' + showClass).show();
		},

		clear: function (andSelectNothing) {
			var self = this,
				e = self.element;

			self.item = {};
			self.panel.find('.selected').removeClass('selected');
			e.val('');
			self.filter.val('');
			self.filterValue = '';
			self.shim.text('');

			if(!andSelectNothing) {
				self._handleItemNotFound();
			}

			self.inputWidget.redraw();
		},

		_equal: function (a, b) {
			return a && b && a.value === b.value;
		},

		_setLabel: function (text) {
			var self = this;

			self.shim.text(text);

			// Account for overlap (only needs to do this once)
			if(!self.shimWidthSet) {
				var paddingRight, eWidth;

				paddingRight = parseFloat(self.iconClosed.outerWidth(true)) + parseFloat(self.iconClosed.css('right'))*2;
				eWidth = parseFloat(self.element.width());
				self.shim.css('max-width', eWidth - paddingRight);

				self.shimWidthSet = true;
			}
			
			
		},

		/*
		 * used for testing
		 */
		_getLabel: function () {
			return this.shim.text();
		},

		toggle: function () {
			var self = this;
			if(self.panel.is(':visible')){
				self.close();
			}else{
				self.open();
			}
		},

		/*
		 * this options was built for testing
		 */
		getOptions: function () {
			var self = this,
				optionPanel = self.panel.find('.option'),
				options = [];

			optionPanel.each(function () {
				options.push($(this).data('item'));
			});

			return options;
		},

		_filterOptions: function () {
			var self = this;
			self._removeSelection();
			self.panel.addClass('filtering');
			if(self.filterTimer){
				clearTimeout(self.filterTimer);
			}
			self.filterTimer = setTimeout(function() {
				self.__filterOptionsWork();
			}, 200);
		},

		__filterOptionsWork: function (optionsElements) {
			var self = this,
				val = self.filterValue;
			/*
			if(val && item.label && item.label.match(new RegExp($.ui.autocomplete.escapeRegex(val), 'i')) === null){
				return;
			}
			*/

			self.panel.addClass('filtering');

			if(!optionsElements){
				optionsElements = self.panel.find('.option');
			}
			
			if(!optionsElements.length){
				self.panel.removeClass('filtering');
				self.inputWidget._trigger('filterdone');

				// Update option list spacer
				var margin = (self.panel.find('.option').not('.filtered').length > 0)? self.panel.children().css('padding-top') : 0;
				self.filter.inputField('getField').css('margin-bottom', margin);

				return;
			}

			var optionsToProcessNow = optionsElements.splice(0,1000);

			$.each(optionsToProcessNow, function (i, optionsEl) {
				self._filterItem($(optionsEl), val);
			});

			setTimeout(function() {
				self.__filterOptionsWork(optionsElements);
			}, 0);
		},

		_filterItem: function (optionEl, val) {
			var self = this,
				item = optionEl.data('item');

			if(self._itemShoudBeFiltered(item, val)){
				optionEl.addClass('filtered');
			}else{			
				optionEl.removeClass('filtered');
			}
		},

		_itemShoudBeFiltered: function (item, val) {
			if(!val){
				return false;
			}
			if(!item.label){
				return true;
			}

			return item.label.match(new RegExp($.ui.autocomplete.escapeRegex(val), 'i')) === null;
		},

		_clearFilter: function () {
			var self = this;
			self.filter.val('');
			self.panel.find('.option.filtered').removeClass('filtered');
		},

		_buildEmptyOption: function () {
			var self = this,
				e = self.element,
				emptyLabel = e.data('emptyLabel');

			if(emptyLabel !== '' && !emptyLabel){
				return;
			}

			self.source.unshift({
				label: emptyLabel,
				value: ''
			});
		},

		_buildOptions: function () {
			var self = this,
				e = self.element,
				panel = self.panel,
				options = self.options;

			self.element.trigger('tmsselectbeforebuild');

			options.empty();

			var optionsbuffer = $('<div/>');

			if (!e.data('noSort')) {
				self._sort(self.source);
			}

			self._buildEmptyOption();

			$.each(self.source, function (i, item) {
				
				var option = $('<div class="option"/>'),
					renderedItem = self.renderItem(item);

				if(renderedItem !== null){
					option.append(renderedItem).data('item', item);
					optionsbuffer.append(option);
				}

				if(renderedItem === ''){
					option.height(20);
				}
			});

			options.append(optionsbuffer);
			self.element.trigger('tmsselectafterbuild', [options]);
		},

		_sort: function (items) {
			items.sort(function (a, b) {
				if (!a || !b) {
					return;
				}
				var al = a.label.toLowerCase(), bl = b.label.toLowerCase();
				return al > bl ? 1 : al < bl ? -1 : a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
			});
		},

		_scroll: function () {
			var self = this,
				options = self.options;

			if(!self.panel.is(':visible')){
				return;
			}

			setTimeout(function() {
				var selected = self.panel.find('.selected');

				if(selected.length === 0){
					options.scrollTop(0);
				}else{
					options.scrollTop(selected.position().top - selected.before().outerHeight());
				}
				
			}, 0);


			/*
			setTimeout(function() {
				panel.find('.options').scrollTop(0);
			}, 0);
			*/
		},

		open: function () {
			var self = this,
				e = self.element,
				panel = self.panel,
				inputLayer = self.inputWidget.layers.input,
				itemsLayer = self.inputWidget.layers.items;


			if(panel.is(':visible')){
				return;
			}

			self.filterValue = '';

			doc.on('click keyup', self.closeListener);

			var leftOffset = 0;
			if(inputLayer.index()){
				leftOffset = inputLayer.position().left - 1;
			}

			panel.width(e.width()).css({
				left: leftOffset,
				top: (itemsLayer.height() - 1) + 'px',
				width: (e.outerWidth() ) + 'px'
			});

			self.iconClosed.hide();
			self.iconOpen.show();
			panel.show();

			// update options margin
			var margin = self.panel.children().css('padding-top');
			self.filter.inputField('getField').css('margin-bottom', margin);

			self.filter.focus();

			self._scroll();
		},

		renderLabel: function (item) {
			return (item && item.label) || '';
		},

		renderItem: function (item) {
			return item.label;
		},

		close: function () {
			var self = this,
				panel = self.panel,
				filter = self.filter;

			doc.off('click keyup', self.closeListener);
			panel.hide();

			self._clearFilter();

			self.iconClosed.show();
			self.iconOpen.hide();
		},

		update: function () {
			var self = this,
				e = self.element;

			// Clear any selected option 
			self.clear(true);

			// Setup the new options 
			self.loaded = $.Deferred();
			self.load().done(function (source) {
				if (!source) {
					source = [];
				}
				self.source = source;
				setTimeout(function() {
					self.removeInvalid();
				}, 0);

				self._buildOptions();

				/*
				 * hide the filter if less then five items are returned
				 */
				if (self.filter && self.filter.data('inputField')) {
					if(source.length < 5){
						self.filter.inputField('hide');
					}else{
						self.filter.inputField('show');
					}
				}

				/*
				 * scan for showClass commands
				 */
				var form, sections = $([]);

				$.each(source, function (i, item) {
					if(item.showClass){
						if(!form){
							form = e.parents(':formBuilder-formBuilder').first();
						}
						sections = sections.add(form.find('.' + item.showClass));
					}
				});
				self.showHideSections = sections;
				self.loaded.resolve();
				self.showHideCommand();
			});
			return self.loaded;
		},

		removeInvalid: function (ev, ui) {
			var self = this,
				e = self.element, 
				val = e.val(),
				source = self.source, 
				l = source.length, 
				i; 

			/*
			 * if ui.item is set, the autocomplete just set this
			 * and it does not need to be checked
			 */
			if(ui && ui.item){
				return;
			}


			/*
			 * verify that the current self.item matches an id in the source and that the label matches
			 */
			for(i = 0; i < l; i++){
				if(source[i].label === val && self.item && self.item.value === source[i].value){
					self.item = source[i];
					return;
				}
			}
			e.val('');
		},

		setOptions: function(options) {
			var self = this;

			self.optionsMap = options;
			self.optionsSetDynamically = true;
			self.update();
		},
		/*
		 * returns a sorted array of objects that have value and label properties
		 */
		load: function () {
			var self = this,
				e = self.element,
				source = [],
				dataOptions;

			if(self.optionsSetDynamically) {
				// Options already loaded from setOptions
				self.optionsSetDynamically = false;
				return $.when(self.optionsMap);
			}

			// Load options from DOM
			dataOptions = e.attr('data-options');

			if(dataOptions) {
				source = $.parseJSON(dataOptions);
			} else {
				e.find('option').each(function () {
					var option = $(this);
					source.push({
						label: option.text(),
						value: option.val()
					});
				});
			}
			return $.when(source); // returns a promise object
		},

		map: function (raw) {
			return {
				label: raw,
				value: raw
			};
		},

		deMap: function (obj) {
			if(!obj){
				return null;
			}
			return obj.value || null;
		},

		isEmpty: function () {
			var self = this,
				data = self.deMap(self.item);

			return data !== 0 && !data;
		},

		converter: {

			fromField: function () {
				var self = this,
					data = self.item;
				if(data === undefined){
					return null;
				}
				var val = self.deMap(data);

				if(val === undefined){
					return null;
				}

				return val;
			},

			toField: function (rawdata) {
				var self = this,
					e = self.element,
					data = self.map(rawdata);

				if(!rawdata && typeof e.data('default') !== 'undefined') {
					data = self.map(e.data('default'));
				}

				if (!data) {
					self.clear();
					return;
				}

				self._set(data);

				if (!self.item) {
					self.clear();
					return;
				}

				return self.item.label;
			}
		}
	};

})(jQuery);