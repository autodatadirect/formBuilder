/**
* Array Field Widget.
*
* Attribute Settings:
* data-addmessage="Some message"	- Message next to the '+' button
* data-sub-widget="widgetName"		- Name of jQuery widget to be used as the items
*/
import $ from 'jquery';
import loadDomData from '../util/loadDomData';
import loadDomToggleData from '../util/loadDomToggleData';
import equals from '../util/equals';

//TODO: refactor
const dict = {};

let arrayFieldId = 0;

const nextArrayFieldId = function () {
	return arrayFieldId++;
};

$.widget('formBuilder.arrayField', {
	_arrayFieldTemplate: 
		'<div class="array-field">' + 
			'<div class="items"><div class="items-content"></div></div>' + 
			'<div class="input-field">' + 
				'<div class="field-items">' + 
					'<span class="first field-item addon clickable array-field-add noselect">+</span>' + 
					'<span class="field-item array-field-add-message"></span>' + 
				'</div>' + 
			'</div>' + 
		'</div>',

	_arrayFieldItemTemplate:
		'<div class="input-field-group array-field-item">' +
			'<div class="input-field">' +
				'<div class="field-items">' +
					'<span class="first field-item addon clickable sort-handle noselect">::</span>' +
				'</div>' +
			'</div>' +
			'<span class="sub-field"></span>' +
			'<div class="input-field">' +
				'<div class="field-items">' +
					'<span class="field-item addon clickable array-field-delete">' +
						'<span class="fb-icon fb-icon-remove" title="'+ dict.remove+'"></span>' +
					'</span>' +
				'</div>' +
			'</div>' +
		'</div>', 

	_create: function() {
		const self = this,
			e = self.element,
			o = self.options;

		loadDomData(e, o, ['addmessage', 'subWidget']);
		loadDomToggleData(e, o, ['nosort']);

		self.subField = e.html();

		self.id = nextArrayFieldId();

		e.html(self._arrayFieldTemplate);

		if(o.addmessage) {
			e.find('.array-field-add-message').text(o.addmessage);
		}

		const items = self.items = e.find('.items');
		self.itemsContent = items.find('.items-content');

		e.on('click', '.array-field-add, .array-field-add-message', function (ev) {
			ev.preventDefault();
			/*
			 * killing the event here because this will cause cascaded array fields to delete the parent items as well.
			 */
			ev.stopPropagation();
			self._handleAddButtonClick();
		});

		e.on('click', '.array-field-delete', function (ev) {
			ev.preventDefault();
			/*
			 * killing the event here because this will cause cascaded array fields to delete the parent items as well.
			 */
			ev.stopPropagation();
			$(this).parents('.array-field-item').first().remove();
			self._onDirty();
			self._trigger('afterdelete', ev);
		});

		if(!o.nosort) {
			self.itemsContent.sortable({
				axis: 'y',
				handle: '.sort-handle',
				containment: self.itemsContent,
				tolerance: 'pointer',
				stop: function () {
					self._checkDirty();
				}
			});
		}

		/*
		 * proxy dirty and clean events
		 */
		self.dirty = false;

		/*
		 * proxy clean/dirty events to hanlder functions
		 */
		e.on('dirty clean', function (ev) {
			/*
			 * only listen to events from children of the widget,
			 * that way a loop will not form when the element triggers
			 * the same events
			 */
			if(!$(ev.target).childOf(e)){
				return;
			}

			ev.stopPropagation();

			if(ev.type === 'dirty'){
				self._onDirty();
			} else {
				self._onClean();
			}
		});
	},

	getId: function(){
		return this.id;
	},

	_handleAddButtonClick: function () {
		const self = this;
		if(self._trigger('beforeaddnewitem')){
			//default can be prevented
			self.addItem();
		}
	},

	_checkDirty: function () {
		const self = this,
			curData = self.data,
			newData = self.get();

		if(equals(newData, curData)){
			self.dirty = false;
			self.element.trigger('clean');
		} else {
			self.dirty = true;
			self.element.trigger('dirty');
		}
	},

	_onDirty: function () {
		const self = this;

		if(self.dirty){
			return;
		}

		self._checkDirty();
	},

	_onClean: function () {
		const self = this;

		if(!self.dirty){
			return;
		}

		self._checkDirty();
	},

	isDirty: function () {
		return this.dirty;
	},

	getFieldInstances: function () {
		const self = this,
			itemsContent = self.itemsContent,
			fields = [];

		itemsContent.children('.array-field-item').each(function () {
			fields.push($(this).find('.array-field-input-' + self.id));
		});
		return fields;
	},

	get: function () {
		const self = this,
			subWidget = self.options.subWidget || 'inputField',
			itemsContent = self.itemsContent,
			data = [];

		/*
		$.each(self.fields, function (i, field) {
			var val = field[subWidget]('get');
			if(val === 0 || val){
				data.push(val);
			}
		});
		*/
		
		itemsContent.children('.array-field-item').each(function () {
			const val = $(this).find('.array-field-input-' + self.id)[subWidget]('get');
			if(val === 0 || val){
				data.push(val);
			}
		});
		

		return data;
	},

	validate: function () {
		const self = this,
			itemsContent = self.itemsContent;

		let valid = true;

		itemsContent.find('.sub-field').each(function () {
			valid = valid && $(this).find(':formBuilder-inputField').inputField('validate');
		});

		return valid;
	},

	clearDirty: function () {
		const self = this,
			itemsContent = self.itemsContent;

		self.dirty = false;

		itemsContent.find('.sub-field').each(function () {
			$(this).find(':formBuilder-inputField').inputField('clearDirty');
		});
	},

	clear: function () {
		const self = this;
		self.set([]);
	},

	flash: function () {
		const self = this,
			itemsContent = self.itemsContent;

		itemsContent.find('.sub-field').each(function () {
			$(this).find(':formBuilder-inputField').inputField('flash');
		});
	},

	set: function (data) {
		const self = this,
			content = self.itemsContent;

		self._empty();

		if(!$.isArray(data)){
			data = [];
		}

		self.data = data;

		$.each(data, function (i, item) {
			content.append(self.drawItem(item));
		});
	},

	/*
	 * allows a different cleanup behavior for special lists)
	 */
	_empty: function () {
		const self = this,
			content = self.itemsContent;
		content.children().remove();
		// calls the destroy on widgets + removed them
		// content.empty(); //redundant
	},

	addItem: function (index, item) {
		const self = this,
			itemEl = self.drawItem(item),
			content = self.itemsContent;

		if((index || index === 0) && index >= 0){
			content.children().eq(index).before(itemEl);
		} else {
			/*
			 * if no insert index is defined, just append
			 */
			content.append(itemEl);
		}

		self._trigger('afteradd', null, itemEl);

		return itemEl || null;
	},

	drawItem: function (item) {
		const self = this,
			o = self.options,
			itemView = $(self._arrayFieldItemTemplate);

		if(o.nosort)  {
			// remove sort handle
			itemView.children().first().remove();
		}

		if(o.subWidget) {
			self._drawWidgetItem(item, itemView, o.subWidget);
		} else {
			self._drawInternalMarkupItem(item, itemView);
		}
		return itemView;
	},

	_drawInternalMarkupItem: function (item, itemView) {
		const self = this,
			field = $(self.subFieldMarkup());

		self._trigger('beforeadd', null, field);
		itemView.find('.sub-field').html(field);
		field.parent().find('input[type!=submit], select, textarea, [data-load-widget-as-field]')
			.inputField({ forceFirst: self.options.nosort })
			.inputField('set', item)
			.addClass('array-field-input-' + self.id);
	},

	_drawWidgetItem: function (item, itemView, subWidget) {
		const self = this,
			field = $('<div/>')[subWidget]();

		self._trigger('beforeadd', null, field);
		itemView.find('.sub-field').append(field);
		field[subWidget]('set', item).addClass('array-field-input-' + self.id).css('display', 'inline');
	},

	subFieldMarkup: function () {
		return this.subField;
	},


	_destroy: function(){
		const self = this;

		// Remove everything and put the inital back
		self._empty(); //destroys the widgets gracefully
		self.element.empty();
		self.element.html(self.subField);
	}
});