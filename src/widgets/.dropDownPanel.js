/**
 * tms.dropDownPanel widget 
 */

(function($){
	'use strict';

	var doc = $(document);

	$.widget("tms.dropDownPanel", {

		_dropDownPaneltmpl:
			'<div class="location-field-detail-panel">' +

			'<form>' +
				'<div class="address-section non-linear-fields">' +


					'<input name="name" data-label="Name" data-placeholder="name" type="text" data-type="utext" />' +

					'<div style="height:2em;"></div>' +

					'<input name="address1" data-label="Address" data-placeholder="address" type="text" data-type="utext" />' +
					'<input name="address2" data-placeholder="address" type="text" data-type="utext" />' +

					'<div class="input-field-group">' +
						'<input name="city" data-placeholder="city" type="text" data-type="utext"  />' +
						'<input name="state" type="text" data-type="state" data-placeholder="state" />' +
						'<input name="zip" type="text" data-type="zip" data-placeholder="zip" />' +
					'</div>' +

					'<input name="country" data-placeholder="country" type="text" data-type="utext" />' +

					'<div class="set-as-lot">' +
						'<input name="isLot" data-label="isLot" data-type="tmsSelect" type="text" data-default="No" data-no-sort="true" style="width: 100px;" data-options="[' +
							'{"value": false, "label": "no"},' +
							'{"value": true, "label": "yes"}' +
						']" />' +
					'</div>' +

					'<div style="height:2em;"></div>' +

					'<input name="xstreet" data-label="street" data-type="utext" type="text" />' +
					'<input name="landmark" data-label="landmark" data-type="utext" type="text" />' +

					'<div style="height:2em;"></div>' +

					'<div class="input-field-group">' +
						'<input name="lat" data-label="coordinates" data-placeholder="latitude" type="text" data-type="number"  style="width:123px;" />' +
						'<input name="lng" type="text" data-type="number" data-placeholder="longitude" style="width:124px;" />' +
					'</div>' +

				'</div>' +
			'</form>' +
		'</div>',

		options: {
			offset: {
				top: 0,
				left: 0
			}
		},

		_create: function () {
			var self = this,
				o = self.options,
				e = self.element,
				panel = $('<div class="dropdown-panel"></div>'),
				details = $('<div></div>').html(self._dropDownPaneltmpl).find('.location-field-detail-panel').formBuilder();

			if (self.hideFields) {
				$.each(self.hideFields, function(i, fieldName) {
					details.find('[name="' + fieldName + '"]').remove();
				});
			}

			self.panel = panel;

			self.appendTo = o.appendTo || e; 

			self.appendTo.css('position', 'relative'); 

			panel.hide().appendTo(self.appendTo); 

			if(o.content){
				self.set(o.content);
			}

			self.set(details);

			self.opened = false;

			self.closeListener = function (ev) {

				if(ev.which === 27){
					ev.preventDefault();
					ev.stopPropagation();
					e.focus();
					setTimeout(function() {
						self.close();
					}, 0);
					return;
				}

				if(!$(ev.target).childOf(panel, true) && !$(ev.target).childOf(self.appendTo, true)){
					setTimeout(function() {
						self.close();
					}, 0);
				}

			};


			e.on('focus', function () {
				console.log('inside of focus');
				setTimeout(function() {
					self.open();
				}, 0);
			});
			/*
			.on('blur', function () {
				self.updateSummary();
			});
			*/
		},

		/*
		 * set the content of the panel
		 */
		set: function (content) {
			var self = this,
				panel = self.panel;

			panel.empty().append(content);
		},

		open: function () {
			var self = this,
				o = self.options,
				panel = self.panel,
				e = self.element;

			if(self.opened){
				return;
			}

			var left = e.offset().left - self.appendTo.offset().left - 1;

			var css = {
				top: (self.appendTo.height() + o.offset.top) + 'px',
				left: (left + o.offset.left) + 'px',
				width: e.outerWidth() + 'px'
			};

			if(!self._trigger('beforeopen', null, [panel, css])){
				return;
			}

			self.opened = true;

			panel.css(css).show();

			doc.on('click keyup', self.closeListener);

			self._trigger('afteropen');
		},

		close: function () {
			var self = this,
				panel = self.panel;

			if(!self.opened){
				return;
			}

			if(!self._trigger('beforeclose')){
				return;
			}

			self.opened = false;

			panel.hide();

			doc.off('click keyup', self.closeListener);

			self._trigger('afterclose');
		},

		_destroy: function () {
			var self = this;
			doc.off('click keyup', self.closeListener);
		}
	});


	
})(jQuery);
