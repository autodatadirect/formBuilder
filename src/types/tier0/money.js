/**
 * Data type 'money'
 *
 * Attribute Settings:
 * data-currency-symbol (default=$) - Can modify currency symbol to any other symbol
 * data-show-symbol (default=true) - Choose whether or not to show currency symbol 
 */

(function($){
	'use strict';

	var types = $.add123.inputField.types;

	types.money = {

		attributes: ['currency-symbol', 'show-symbol', 'max-amount', 'min-amount'],

		setUp: function (ui) {
			var self = this,
				e = ui.element;

			self.element = e;

			self.currency = e.data('currency-symbol');
			self.showSymbol = e.data('show-symbol');
			self.max = e.data('max-amount');
			self.min = e.data('min-amount');

			e.inputFilter({
				pattern: /[0-9\.]/
			}).change(function () {
				self._onChange();
			}).blur(function() {
				e.val(self.format(e.val()));
			});

			if(self.showSymbol === undefined || !!self.showSymbol)
			{
				if(!self.currency) {
					ui.addOn(-100, '$');
				} else {
					ui.addOn(-100, self.currency);
				}
			}	

		},
		_onChange: function () {
			var self = this,
				e = self.element,
				caret = e.caret();

			e.val(self.format(e.val())).caret(caret.begin, caret.end);
		},

		format: function (money) {
			var self = this; 
			if($.trim(money) === ''){
				return '';
			}
			try {
				// MISC-916 removed extra decimals that cause NaN
				if(isNaN(money)) {
					money = money.toString();
					var count = 0; 
					for(var i = 0; i < money.length; i++){

						if((money[i]) === '.'){
						count++;}
					}
					var dec = money.indexOf('.');
					if(dec !== -1) {
						money = money.replace(/\./g,'');
						money = money.substring(0,dec) + '.' + money.substring(dec);
					}			
					money = parseFloat(money);
				}
				return (+money).toFixed(2);
			} catch(err) {
				return '';
			}
		},

		converter: {
			toField: function(val, ui) {
				return this.format(val);
			},
			fromField: function(val, ui) {
				if($.trim(val) === ''){
					return '';
				}
				return +this.format(val);
			}
		},

		validate: function(ifw){
			var self = this; 

			if(self.max || self.min){
				var e = ifw.element,
					enteredAmount = +ifw.get();

				if(self.max && enteredAmount > self.max){
					return {
						message: 'over'
					};
				}
				if(self.min && enteredAmount < self.min){
					return {
						message: 'under'
					};
				}
				
			}
		}
	};	

})(jQuery);