/**
 * Array Field Widget.
 *
 * - We may want to put this in formBuilder-os
 * - May require css from dyn
 *
 * Attribute Settings:
 * data-addmessage="Some message"	- Message next to the '+' button
 * data-sub-widget="widgetName"		- Name of jQuery widget to be used as the items
 */
/*global util:true */
(function($){
	'use strict';
	
	var arrayFieldId = 0;
	var nextArrayFieldId = function () {
		return arrayFieldId++;
	};

	// Localization
	if(!util.lang.remove) {
		switch(util.lang.code) {
			case 'es': util.lang.remove = 'Quitar'; break;

			//add more lang code translations here

			default: //'en'
				util.lang.remove = 'Remove'; 
				break;
		}
	}


	$.widget("formBuilder.arrayField", {
		_arrayFieldTemplate: 
			'<div class="array-field">' + 
				'<div class="items"><div class="items-content"></div></div>' + 
				'<div class="input-field">' + 
					'<div class="field-items">' + 
						'<span class="first field-item addon clickable array-field-add noselect"><a href="#">+</a></span>' + 
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
							'<span class="fb-icon fb-icon-remove" title="'+util.lang.remove+'"></span>' +
						'</span>' +
					'</div>' +
				'</div>' +
			'</div>', 

		_create: function(){
			var self = this,
				e = self.element;

			self.subField = e.html();

			self.id = nextArrayFieldId();

			e.html(self._arrayFieldTemplate);

			if(e.attr('data-addmessage')){
				e.find('.array-field-add-message').text(e.attr('data-addmessage'));
			}

			var items = self.items = e.find('.items');
			self.itemsContent = items.find('.items-content');

			//CDH 2013-12-05 removed this during the rafactor needed for waypoints
			//self.data = [];
			//self.draw();


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

			self.itemsContent.sortable({
				axis: "y",
				handle: '.sort-handle',
				containment: self.itemsContent,
				tolerance: 'pointer',
				stop: function () {
					self._checkDirty();
				}
			});

			/*
			 * proxy dirty and clean events
			 */
			self.dirty = false;
			//items.on('dirty', $.proxy(self._onDirty, self)).on('clean', $.proxy(self._onClean, self));


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
				}else{
					self._onClean();
				}
			});
		},

		getId: function(){
			return this.id;
		},

		_handleAddButtonClick: function () {
			var self = this;
			if(self._trigger('beforeaddnewitem')){
				//default can be prevented
				self.addItem();
			}
		},

		_checkDirty: function () {
			var self = this,
				curData = self.data,
				newData = self.get();

			if(util.equals(newData, curData)){
				self.dirty = false;
				self.element.trigger('clean');
			}else{
				self.dirty = true;
				self.element.trigger('dirty');
			}
		},

		_onDirty: function () {
			var self = this;

			if(self.dirty){
				return;
			}

			self._checkDirty();
		},

		_onClean: function () {
			var self = this;

			if(!self.dirty){
				return;
			}

			self._checkDirty();
		},

		isDirty: function () {
			return this.dirty;
		},

		getFieldInstances: function () {
			var self = this,
				itemsContent = self.itemsContent,
				fields = [];

			itemsContent.children('.array-field-item').each(function () {
				fields.push($(this).find('.array-field-input-' + self.id));
			});
			return fields;
		},

		get: function () {
			var self = this,
				subWidget = self.element.attr('data-sub-widget') || 'inputField',
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
				var val = $(this).find('.array-field-input-' + self.id)[subWidget]('get');
				if(val === 0 || val){
					data.push(val);
				}
			});
			

			return data;
		},

		validate: function () {
			var self = this,
				itemsContent = self.itemsContent,
				valid = true;

			itemsContent.find('.sub-field').each(function () {
				valid = valid && $(this).find(':formBuilder-inputField').inputField('validate');
			});

			return valid;
		},

		clearDirty: function () {
			var self = this,
				itemsContent = self.itemsContent;

			self.dirty = false;

			itemsContent.find('.sub-field').each(function () {
				$(this).find(':formBuilder-inputField').inputField('clearDirty');
			});
		},

		clear: function () {
			var self = this;
			self.set([]);
		},

		flash: function () {
			var self = this,
				itemsContent = self.itemsContent;

			itemsContent.find('.sub-field').each(function () {
				$(this).find(':formBuilder-inputField').inputField('flash');
			});
		},

		set: function (data) {
			var self = this,
				items = self.items,
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
			var self = this,
				content = self.itemsContent;
			content.children().remove(); // calls the destroy on widgets + removed them
			// content.empty(); //redundant
		},

		addItem: function (index, item) {
			var self = this,
				itemEl = self.drawItem(item),
				content = self.itemsContent;

			if((index || index === 0) && index >= 0){
				content.children().eq(index).before(itemEl);
			}else{
				/*
				 * if no insert index is defined, just append
				 */
				content.append(itemEl);
			}

			self._trigger('afteradd', null, itemEl);

			return itemEl || null;
		},

		drawItem: function (item) {
			var self = this,
				subWidget = self.element.attr('data-sub-widget'),
				itemView = $(self._arrayFieldItemTemplate);

			if(subWidget) {
				self._drawWidgetItem(item, itemView, subWidget);
			}else{
				self._drawInternalMarkupItem(item, itemView);
			}
			return itemView;
		},

		_drawInternalMarkupItem: function (item, itemView) {
			var self = this,
				field = $(self.subFieldMarkup());

			self._trigger('beforeadd', null, field);
			itemView.find('.sub-field').html(field);
			field.parent().find('input[type!=submit], select, textarea, [data-load-widget-as-field]')
				.inputField()
				.inputField('set', item)
				.addClass('array-field-input-' + self.id);
		},

		_drawWidgetItem: function (item, itemView, subWidget) {
			var self = this,
				field = $('<div/>')[subWidget]();

			self._trigger('beforeadd', null, field);
			itemView.find('.sub-field').append(field);
			field[subWidget]('set', item).addClass('array-field-input-' + self.id).css('display', 'inline');
		},

		subFieldMarkup: function () {
			return this.subField;
		},


		_destroy: function(){
			var self = this;

			// Remove everything and put the inital back
			self._empty(); //destroys the widgets gracefully
			self.element.empty();
			self.element.html(self.subField);
		}
	});
})(jQuery);
