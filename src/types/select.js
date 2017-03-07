/**
* Datatype 'select'
* 
* 
* Attribute Options:
* data-empty-label
* data-no-sort
* data-options
* data-filter-min
* data-overflow-tooltips
* 
*/

import $ from 'jquery';
import loadDomData from '../util/loadDomData';
import loadDomToggleData from '../util/loadDomToggleData';
import '../plugins/childOf';
import './select.scss';


const doc = $(document),
	defaultOptions = {
		filterMin: 5
	};

export default {

	setUp: function(inputFieldWidget) {
		const self = this,
			e = inputFieldWidget.element;

		self.element = e;
		self.source = [];
		self.inputWidget = inputFieldWidget;

		self.typeOptions = $.extend({}, defaultOptions);
		self._getTypeOptions();

		const fieldGroup = self.fieldGroup = inputFieldWidget.field.parents('.input-field-group');

		if(e.is('select')) {
			console.log('** ERROR: deprecated use of <select> in the select type **');
		}

		e.css('opacity', 0);

		/*
		 * width(inputWidget.layers.items.width() - 26).
		 */
		self.shim = $('<div class="shim"></div>').insertAfter(e);

		inputFieldWidget.field.addClass('select-box');

		self.iconClosed = $('<span class="fb-icon fb-icon-sort-down dropdown-closed-icon"></span>').insertAfter(e);
		self.iconOpen = $('<span class="fb-icon fb-icon-sort-up dropdown-open-icon"></span>').insertAfter(e).hide();
		
		const panel = self.panel = $('<div class="fb-select-panel"><div class="tms-select-dropdown-content"><div class="search" style="position:relative;"/><div class="options" style="position:relative;"/></div></div>').hide();
		self.options = panel.find('.options');

		inputFieldWidget.layers.items.append(panel).css('position', 'relative');

		const selectionClass = self.sectionClass =  'selected';

		panel.on('click', '.option', function () {
			self._setSelected();
		}).on('mouseenter', '.option', function () {
			panel.find('.' + selectionClass).removeClass(selectionClass);
			$(this).addClass(selectionClass);
		}).on('mouseleave', '.option', function () {
			$(this).removeClass(selectionClass);
		});

		inputFieldWidget.layers.items.on('click', function (ev) {
			if (inputFieldWidget.states.disable) {
				return;
			}
			const target = $(ev.target);

			if(target.childOf(panel, true)) {
				return;
			}

			setTimeout(function() {
				self.toggle();
			}, 0);
		});

		/*
		 * build filter input
		 */
		const filter = self.filter = $('<input type="text" class="filter-box"/>')
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

		e.on('keydown', $.proxy(self._keyDownNavigate, self));
		filter.on('keydown', $.proxy(self._keyDownNavigate, self));
		filter.on('keyup', $.proxy(self._onKeyup, self));

		filter.on('dirty clean', function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		});

		self.closeListener = function (ev) {
			const which = ev.which;
			/*
			if(ev.which === 9){

			}
			*/

			if(which === 27 || which === 13){
				ev.preventDefault();
				ev.stopPropagation();

				if(which === 13){
					self._setSelected();
				} else {
					self.element.focus();
				}

				setTimeout(function() {
					self.close();
				}, 0);
				return;
			}

			const target = $(ev.target);

			if(!target.childOf(panel, true) && !target.childOf(fieldGroup, true)){
				setTimeout(function() {
					self.close();
				}, 0);
			}

		};

		self.update();
	},

	_getTypeOptions: function() {
		const self = this,
			e = self.element,
			o = self.typeOptions;

		loadDomData(e, o, [
			'default',
			'emptyLabel',
			'filterMin'
		]);
		loadDomToggleData(e, o, [
			'noSort',
			'overflowTooltips'
		]);
	},

	_keyDownNavigate: function (ev) {
		const self = this,
			panel = self.panel,
			selectionClass = self.sectionClass,
			which = ev.which;

		/*
		 * special handling for tab, does not perform any function (keeping for legacy)
		 */
		if(which === 9) {
			self.element.next('input').focus();
			return;
		}


		if(which === 27 || which === 13){
			ev.preventDefault();
			return;
		}

		let selected, next;

		/*
		 * move down
		 */
		if(which === 40){
			selected = panel.find('.' + selectionClass);

			if(!selected.length){
				panel.find('.option:first').addClass(selectionClass);
			} else {
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
			} else {
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

	_onKeyup: function () {
		const self = this,
			filter = self.filter,
			val = filter.val();

		if(self.filterValue === val){
			return;
		}

		self.filterValue = val;


		self._filterOptions();
	},

	_setSelected: function () {
		const self = this,
			e = self.element;

		let selected = self.panel.find('.selected:not(.filtered):visible');

		/*
		 * use the first value if none of the options are selected
		 */
		if(!selected.length){
			self._selectFirstNonEmptyOption();
		}

		selected = self.panel.find('.selected:not(.filtered):visible');

		const item = self.item = selected.data('item');
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
		const self = this;
		self._removeSelection();
		self.panel.find('.option:not(.filtered):visible').each(function () {
			const option = $(this);
			if(option.html()){
				option.addClass('selected');
				return false;
			}
		});
	},

	_set: function (val) {
		const self = this;

		self.filter.val('');
		self.filterValue = '';

		self.item = undefined;

		self.loaded.done(function () {
			self._removeSelection();
			const options = self.panel.find('.option');

			options.each(function () {
				const item = $(this),
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
		const self = this;
		
		self._setDefaultItem();

		if(!self.item || !self.item.value){
			self._selectFirstItem();
		}
	},

	_setDefaultItem: function () {
		const self = this,
			options = self.panel.find('.option'),
			defaultValue =  { value: self.typeOptions['default']};

		options.each(function () {
			const item = $(this),
				itemData = item.data('item');

			if(self._equal(itemData, defaultValue)){
				item.addClass('selected');
				self.item = itemData;
				self._setLabel(itemData.label);
				self.showHideCommand();
				return false;
			}
		});
	},

	_selectFirstItem: function() {
		const self = this,
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
		const self = this,
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

	clear: function () {
		const self = this,
			e = self.element;

		self.item = {};
		self.panel.find('.selected').removeClass('selected');
		e.val('');
		self.filter.val('');
		self.filterValue = '';
		self.shim.text('');

		self._handleItemNotFound();

		self.inputWidget.redraw();
	},

	_equal: function (a, b) {
		return a && b && a.value === b.value;
	},

	_setLabel: function (text) {
		const self = this;

		self.shim.text(text);

		// Account for overlap (only needs to do this once)
		if(!self.shimWidthSet) {
			const paddingRight = parseFloat(self.iconClosed.outerWidth(true)) + parseFloat(self.iconClosed.css('right'))*2;
			const eWidth = parseFloat(self.element.width());
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
		const self = this;
		if(self.panel.is(':visible')){
			self.close();
		} else {
			self.open();
		}
	},

	/*
	 * this options was built for testing
	 */
	getOptions: function () {
		const self = this,
			optionPanel = self.panel.find('.option'),
			options = [];

		optionPanel.each(function () {
			options.push($(this).data('item'));
		});

		return options;
	},

	_filterOptions: function () {
		const self = this;
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
		const self = this,
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
			const margin = (self.panel.find('.option').not('.filtered').length > 0)? self.panel.children().css('padding-top') : 0;
			self.filter.inputField('getField').css('margin-bottom', margin);

			return;
		}

		const optionsToProcessNow = optionsElements.splice(0,1000);

		$.each(optionsToProcessNow, function (i, optionsEl) {
			self._filterItem($(optionsEl), val);
		});

		setTimeout(function() {
			self.__filterOptionsWork(optionsElements);
		}, 0);
	},

	_filterItem: function (optionEl, val) {
		const self = this,
			item = optionEl.data('item');

		if(self._itemShouldBeFiltered(item, val)){
			optionEl.addClass('filtered');
		} else {			
			optionEl.removeClass('filtered');
		}
	},

	_itemShouldBeFiltered: function (item, val) {
		if(!val){
			return false;
		}
		if(!item.label){
			return true;
		}

		return item.label.match(new RegExp($.ui.autocomplete.escapeRegex(val), 'i')) === null;
	},

	_clearFilter: function () {
		const self = this;
		self.filter.val('');
		self.panel.find('.option.filtered').removeClass('filtered');
	},

	_buildEmptyOption: function () {
		const self = this,
			o = self.typeOptions;

		if(o.emptyLabel !== '' && !o.emptyLabel){
			return;
		}

		self.source.unshift({
			label: o.emptyLabel,
			value: ''
		});
	},

	_buildOptions: function () {
		const self = this,
			options = self.options;

		self.element.trigger('tmsselectbeforebuild');

		options.empty();

		const optionsbuffer = $('<div/>');

		if (!self.typeOptions.noSort) {
			self._sort(self.source);
		}

		self._buildEmptyOption();

		$.each(self.source, function (i, item) {
			
			const option = $('<div class="option"/>'),
				renderedItem = self.renderItem(item);

			if(renderedItem !== null){
				option.append(renderedItem).data('item', item);
				optionsbuffer.append(option);
			}

			if(renderedItem === ''){
				option.height(20);
			}

			if(self.typeOptions.overflowTooltips) {
				option.on('mouseenter', function() {
					if(this.offsetWidth < this.scrollWidth) {
						$(this).attr('title', item.label);
					} else {
						$(this).removeAttr('title');
					}
				});
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
			const al = a.label.toLowerCase(), bl = b.label.toLowerCase();
			return al > bl ? 1 : al < bl ? -1 : a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
		});
	},

	_scroll: function () {
		const self = this,
			options = self.options;

		if(!self.panel.is(':visible')){
			return;
		}

		setTimeout(function() {
			const selected = self.panel.find('.selected');

			if(selected.length === 0){
				options.scrollTop(0);
			} else {
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
		const self = this,
			e = self.element,
			panel = self.panel,
			inputLayer = self.inputWidget.layers.input,
			itemsLayer = self.inputWidget.layers.items;


		if(panel.is(':visible')){
			return;
		}

		self.filterValue = '';

		doc.on('click keyup', self.closeListener);

		let leftOffset = 0;
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
		const margin = self.panel.children().css('padding-top');
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
		const self = this,
			panel = self.panel;

		doc.off('click keyup', self.closeListener);
		panel.hide();

		self._clearFilter();

		self.iconClosed.show();
		self.iconOpen.hide();
	},

	update: function () {
		const self = this,
			e = self.element,
			o = self.typeOptions;

		// Reload settings
		self._getTypeOptions();

		// Clear any selected option 
		self.clear(true);

		// Setup the new options 
		self.loaded = $.Deferred();
		self.load().done(function (source) {
			if (!source) {
				source = [];
			}
			self.source = source;
			
			self._buildOptions();

			/*
			 * hide the filter if less then five items are returned
			 */
			if (self.filter && self.filter.data('inputField')) {
				if(source.length < o.filterMin) {
					self.filter.inputField('hide');
				} else {
					self.filter.inputField('show');
				}
			}

			/*
			 * scan for showClass commands
			 */
			let form, sections = $([]);

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

	setOptions: function(options) {
		const self = this;

		self.optionsMap = options;
		self.optionsSetDynamically = true;
		self.update();
	},
	/*
	 * returns a sorted array of objects that have value and label properties
	 */
	load: function () {
		const self = this,
			e = self.element;

		let source = [];

		if(self.optionsSetDynamically) {
			// Options already loaded from setOptions
			self.optionsSetDynamically = false;
			return $.when(self.optionsMap);
		}

		// Load options from DOM
		const dataOptions = e.attr('data-options');

		if(dataOptions) {
			source = $.parseJSON(dataOptions);
		} else {
			e.find('option').each(function () {
				const option = $(this);
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
		if (!obj) {
			return null;
		}
		return obj.value;
	},

	isEmpty: function () {
		const self = this,
			data = self.deMap(self.item);

		return data === 0 || data === undefined || data === null || data === '';
	},

	converter: {

		fromField: function () {
			const self = this,
				data = self.item;
			if(data === undefined){
				return null;
			}
			const val = self.deMap(data);

			if(val === undefined){
				return null;
			}

			return val;
		},

		toField: function (rawdata) {
			const self = this,
				o = self.typeOptions;

			let data = self.map(rawdata);

			if(!rawdata && typeof o['default'] !== 'undefined') {
				data = self.map(o['default']);
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

