/**
 * Data type 'tmsPhone', an extension of phone
 *
 * It adds a secondary addon to the right to specify number type.
 */

(function($){
	'use strict';
	
	var types = $.add123.inputField.types;

	types.tmsPhone = $.extend({}, types.phone, {
		_phoneTypeTemplate:
				'<div class="phone-type-form">' +
					'<div class="phone-type clickable" data-code="mobile"><span class="tms-icon tms-icon-iphone"></span> '+'mobile'+'</div>' +
					'<div class="phone-type clickable" data-code="home"><span class="tms-icon tms-icon-home"></span> '+'home'+'</div>' +
					'<div class="phone-type clickable" data-code="work"><span class="tms-icon tms-icon-office"></span> '+'work'+'</div>' +
					'<div class="phone-type clickable" data-code="fax"><span class="tms-icon tms-icon-print"></span> '+'fax'+'</div>' +
				'</div>',

		setUp: function(inputWidget) {
			var self = this,
				o = inputWidget.options,
				e = inputWidget.element;

			self.element = e;

			types.phone.setUp.call(self, inputWidget);

			/*
			 * add icon
			 */

			self.desc = $('<span></span>');
			self.setType();
			self.icon = inputWidget.addOn(1, '').addClass('clickable').append(self.desc).width(75).css('textAlign', 'left');

			self.icon.on('click', function() {
				/*
				 * build the menu lazily, so that popovers are not created when now needed and the field has time to attach
				 * to the form so that the popover appendto can be set
				 */
				self._setupMenu(inputWidget);
				self.toggleMenu();
			});

			//updateTmsPhone.call(self);
			//o._layers.suggest.html('(NNN) NNN-NNNN');
		},

		toggleMenu: function () {
			var self = this;
			self.menu.find('.focused').removeClass('focused').end().find('[data-code="' + self.type + '"]').addClass('focused').end().popOver('toggle');
		},

		_setupMenu: function (inputWidget) {
			var self = this,
				e = self.element,
				appendToParent, appendTo;

			if(self.menuBuilt){
				return;
			}

			self.menu = $(self._phoneTypeTemplate).popOver({
				target: self.icon,
				appendTo: inputWidget.getField()
			}).on('click', function (ev) {
				ev.stopPropagation();
			}).on('click', '.phone-type', function (ev) {
				ev.stopPropagation();
				var control = $(this);
				self.setType(control.attr('data-code'));
				self.menu.popOver('hide');
			});

			self.menuBuilt = true;
		},

		setType: function (type) {
			var self = this;

			if(!type){
				type = 'home';
			}

			var icon = '';

			if(type === 'work'){
				icon = 'office';
			} else if(type === 'mobile'){
				icon = 'iphone';
			} else if(type === 'fax'){
				icon = 'print';
			} else {
				icon = type = 'home';
			}

			self.desc.html('<span class="tms-icon tms-icon-' + icon + '" style="margin-right:0.25em;"></span> ' + type);
			self.type = type;
		},

		converter: {
			fromField: function(number, inputWidget) {
				var self = this;
				number = types.phone.converter.fromField.call(self, number, inputWidget);
				// Number is the value being entered

				console.log(this);

				// Returns null if the value entered is not a number 
				if(number !== 0 && !number){
					return null;
				}

				var data = {
					type: self.type,
					number: number
				};

				if(self.id){
					console.log(self.id);
					data.id = self.id;
				}

				return data;
			},
			toField: function(data, inputWidget) {
				var self = this;

				if(data){
					self.setType(data.type);
					self.id = data.id;
					data = types.phone.converter.toField.call(self, data.number, inputWidget);
				}

				return data;
			}
		},

		destroy: function(inputWidget) {
			inputWidget.element.off('.tmsPhone');
			$.Widget.prototype.destroy.call(this);
		}
	});
	
})(jQuery);
