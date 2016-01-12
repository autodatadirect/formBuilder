/**
 * Data type 'money'
 *
 * Attribute Settings:
 * data-currency-symbol (default='$') - Can modify currency symbol to any other symbol
 * data-hide-symbol (default=false) - Choose whether or not to show currency symbol 
 * data-max-amount
 * data-min-amount
 */

(function($){
	'use strict';

	var types = $.formBuilder.inputField.types;
	var dict = $.formBuilder.lang.dict;
	var util = $.formBuilder.util;

	types.money = {

		attributes: ['currency-symbol', 'hide-symbol', 'max-amount', 'min-amount', 'allowNegative'],

		setUp: function (ifw) {
			var self = this,
				e = ifw.element;

			self.element = e;

			var o = self.typeOptions = {
				currencySymbol: '$'
			};
			util.loadDomData(e, o, ['currencySymbol', 'maxAmount', 'minAmount']);
			util.loadDomToggleData(e, o, ['hideSymbol', 'allowNegative']);

			if(!o.allowNegative){
				e.inputFilter({
					pattern: /[0-9\.]/
				}).change(function () {
					self._onChange();
				}).blur(function() {
					e.val(self.format(e.val()));
				});
			} else{
				e.inputFilter({
					pattern: /[0-9\.-]/
				}).change(function () {
					self._onChange();
				}).blur(function() {
					e.val(self.format(e.val()));
				});

			}
			
			

			if(!o.hideSymbol) {
				ifw.addOn(-100, o.currencySymbol);
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
			toField: function(val, ifw) {
				return this.format(val);
			},
			fromField: function(val, ifw) {
				if($.trim(val) === ''){
					return '';
				}
				return +this.format(val);
			}
		},

		validate: function(ifw){
			var self = this,
				o = self.typeOptions;

			if(o.maxAmount || o.minAmount){
				var e = ifw.element,
					enteredAmount = +ifw.get();

				if(o.maxAmount && enteredAmount > o.maxAmount){
					return {
						message: dict.over
					};
				}
				if(o.minAmount && enteredAmount < o.minAmount){
					return {
						message: dict.under
					};
				}
				
			}
		}
	};	

})(jQuery);