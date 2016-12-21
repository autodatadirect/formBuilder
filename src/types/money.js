/**
 * Data type 'money'
 *
 * Attribute Settings:
 * data-currency-symbol (default='$') - Can modify currency symbol to any other symbol
 * data-hide-symbol (default=false) - Choose whether or not to show currency symbol 
 * data-max-amount
 * data-min-amount
 */
import $ from 'jquery';
import loadDomData from '../util/loadDomData';
import loadDomToggleData from '../util/loadDomToggleData';
import dict from '../util/i18n';

export default {

	attributes: ['currency-symbol', 'hide-symbol', 'max-amount', 'min-amount', 'allowNegative'],

	setUp: function (ifw) {
		const self = this,
			e = ifw.element;

		self.element = e;

		const o = self.typeOptions = {
			currencySymbol: '$'
		};

		loadDomData(e, o, ['currencySymbol', 'maxAmount', 'minAmount']);
		loadDomToggleData(e, o, ['hideSymbol', 'allowNegative']);

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
		const self = this,
			e = self.element,
			caret = e.caret();

		e.val(self.format(e.val())).caret(caret.begin, caret.end);
	},

	format: function (money) {
		if($.trim(money) === ''){
			return '';
		}
		try {
			if(isNaN(money)) {
				money = money.toString();
				const dec = money.indexOf('.');
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
		toField: function(val) {
			return this.format(val);
		},
		fromField: function(val) {
			if($.trim(val) === ''){
				return '';
			}
			return +this.format(val);
		}
	},

	validate: function(ifw){
		const self = this,
			o = self.typeOptions;

		if(o.maxAmount || o.minAmount){
			const enteredAmount = +ifw.get();

			if(o.maxAmount && enteredAmount > o.maxAmount){
				return {
					message: dict.t('over')
				};
			}
			if(o.minAmount && enteredAmount < o.minAmount){
				return {
					message: dict.t('under')
				};
			}
		}
	}
};	
