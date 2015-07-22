/**
 * Data type 'tmsPhone', an extension of phone
 *
 * It adds a secondary addon to the right to specify number type.
 */

(function($){
	'use strict';
	
	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;

	types.tmsPhone = $.extend({}, types.phone, {
		_phoneTypeTemplate:
				'<div class="phone-type-form" style="padding: 1px;">' +
					'<div class="phone-type clickable" data-code="mobile" ><span class="fb-icon fb-icon-iphone"> '+dict.mobile+'</span></div>' +
					'<div class="phone-type clickable" data-code="home"><span class="fb-icon fb-icon-home"> '+dict.home+'</span></div>' +
					'<div class="phone-type clickable" data-code="work"><span class="fb-icon fb-icon-office"> '+dict.work+'</span></div>' +
					'<div class="phone-type clickable" data-code="fax"><span class="fb-icon fb-icon-print"> '+dict.fax+'</span></div>' +
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

			
			self.setType();

			self.menu = $(self._phoneTypeTemplate);
			self.icon = inputWidget.addOn(1, '').addClass('clickable').append(self.desc).css({
				textAlign: 'left',
				// padding: '0px 22px',
				width: '4.8em'
			});

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

			self.menu.popOver({
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

			self.desc.html('<span class="fb-icon fb-icon-' + icon + '"> ' + dict[type] + '</span>');
			self.type = type;
		},

		converter: {
			fromField: function(number, inputWidget) {
				var self = this;
				number = types.phone.converter.fromField.call(self, number, inputWidget);
				// Number is the value being entered

				// Returns null if the value entered is not a number 
				if(number !== 0 && !number){
					return null;
				}

				var data = {
					type: self.type,
					number: number
				};

				if(self.id){
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
