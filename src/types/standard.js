/*
 * Define general types
 */
(function($) {
	"use strict";

	var doc = $(document);

	/*
	 * InputField Types
	 *
	 * Type objects are of the form:
	 * {
	 *   setUp : function (ui) {},
	 *   tearDown : function (ui) {},
	 *   converter : {
	 *     toField : function (value, ui) {},
	 *     fromField : function (value, ui) {}
	 *   },
	 *   format : function (ui) {}
	 *   validate : function (ui) {}
	 * }
	 * and stored in $.add123.inputField.types
	 *
	 * The context (this) will get set to the context of the type object, use the ui parameter to obtain access to the inputField widget
	 *
	 * setUp: add any events, elements, etc.
	 *
	 * tearDown: reverse whatever setUp did
	 *
	 * converter: used to convert data between "human" and transport formats (e.g. mm/dd/yyyy <-> yyyymmdd)
	 *
	 * format: attempt to format the human readable value (e.g. mm/ dd/yyyy -> mm/dd/yyyy, '  foo ' -> 'foo')
	 *    format is called on before validate
	 *
	 * validate: returns an error object on error or undefined on success
	 * err: {
	 *   message: '',
	 *   code: '',
	 *   description: ''
	 * }
	 *
	 */
	
	 var types = $.add123.inputField.types;

	/*
	 * the default type
	 */
	types.text = {};

	var cannedFormatters = {
		trim: function(ui) {
			var e = ui.element;
			e.val($.trim(e.val()));
		}
	};

	/*
	 * helper function to build basic types
	 */
	var createRegexType = function(pattern, filter, flags, max) {
		if(flags === undefined) {
			flags = {};
		}
		if(flags.toUpper !== false) {
			flags.toUpper = true;
		}

		var type = {
			validate: function(ui) {
				if(!ui.element.val().match(pattern)) {
					return {
						message: 'invalid'
					};
				}
			}
		};

		if(filter || max) {
			type.setUp = function(ui) {

				var filterData = {
					pattern: filter || /./,
					toUpper: flags.toUpper,
					max: max || 0
				};

				if(ui.element.attr('data-max')){
					filterData.max = ui.element.attr('data-max');
				}

				//console.log('setup ', ui.element.attr('name'), filterData, max);
				ui.element.inputFilter(filterData);
			};
		}

		if(flags.cannedFormatter !== undefined) {
			if($.isFunction(cannedFormatters[flags.cannedFormatter])) {
				type.format = cannedFormatters[flags.cannedFormatter];

				// add converters
				type.converter = {
					toField: function (val, ui) { return type.format(ui); },
					fromField: function (val, ui) { return type.format(ui); }
				};
			}
		}

		return type;
	};
	$.add123.inputField.createRegexType = createRegexType;


	/*
	 * basic types
	 */
	$.extend(types, {
		'utext': createRegexType(/.*/, /.*/, {
			toUpper: true
		}),
		'integer': createRegexType(/^[0-9]*$/, /[0-9]/),
		'number': createRegexType(/^-?[0-9]+\.?[0-9]*$/, /[-0-9.]/),
		'state': createRegexType(/^[A-Z]{2}$/, /[A-Z]/, {}, 2),
		'feid': createRegexType(/^[0-9]{2}\-?[0-9]{7}$/, /[0-9\-]/, {}, 10),
		'zip': createRegexType(/(^\d{5}(\-?\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} ?\d{1}[A-Za]{1}\d{1})$/, /[0-9A-Z\s\-]/, {}, 10),
		'email': createRegexType(/^(?!.*\.{2})[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/, /[A-Za-z0-9._%+\-@]/, {
			toUpper: false,
			cannedFormatter: 'trim'
		})
	});


	types.display = {
		setUp: function (ui) {
			var e = ui.element;

			e.parents('.field-item').hide();
			e.parents('.field-items').append('<div class="input-display"></div>');
		},

		converter: {
			toField: function (val, ui) {
				ui.element.parents('.field-items').find('.input-display').html(val);
			},
			fromField: function(value, ui) {
				return ui.element.parents('.field-items').find('.input-display').html().trim();
			}
		}
	};


	types.phone = {
		setUp: function (ui) {
			var self = this,
				e = ui.element;

			e.inputFilter({
				pattern: /[0-9()\s\-x]/
			});

			e.on('blur', function() {
				e.val(self.format(e.val()));
			});

		},

		converter: {
			toField: function(val, ui) {
				return this.format(val);
			},
			fromField: function(val, ui) {
				return this.format(val);
			}
		},

		format: function (text) {

			if(!text){
				return '';
			}

			/*
			 * find extension delimeter
			 */
			var extensionStart = 0,
				xlocation = text.indexOf('x'),
				lastSpace = text.lastIndexOf(' '),
				ext = '',
				extraExt = '';

			if(xlocation > 0){
				extensionStart = xlocation;
			}else if(lastSpace > 7){
				extensionStart = lastSpace;
			}

			if(extensionStart > 0){
				ext = text.substring(extensionStart + 1);
				text = text.substring(0, extensionStart);
			}

			var num = $.trim(text.replace(/[()\s\-]/g, '')),
				numberLength = num.length;


			if(num[0] === '1'){
				num = num.substring(1);
				numberLength--;
			}

			if(numberLength > 10){
				extraExt = num.substring(10);
				num = num.substring(0, 10);
				numberLength = 10;
			}

			if (numberLength === 7) {
				num = num.substring(0,3) + '-' + num.substring(3);
			} else if (numberLength === 10) {
				num = num.substring(0,3) + '-' + num.substring(3,6) + '-' + num.substring(6);
			}

			ext = extraExt + ext;

			num = num.replace(/[^0-9^x^-]/g, '');
			ext = ext.replace(/[^0-9^x^-]/g, '');

			if(ext){
				num += 'x' + ext;
			}

			return num;
		},
		validate: function(ui) {
			///^([0-9]{3}-)?[0-9]{3}-[0-9]{4}(x[0-9]+)?$/ simple regex
			if(!ui.element.val().match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)) {
				return {
					message: 'invalid'
				};
			}
		}
	};

	/**
	 * Money type. 
	 *
	 * 
	 * Attribute Settings:
	 * data-currency-symbol (default=$) - Can modify currency symbol to any other symbol
	 * data-show-symbol (default=true) - Choose whether or not to show currency symbol
	 * 
	 */
	types.money = {

		attributes: ['currency-symbol', 'show-symbol'],

		setUp: function (ui) {
			var self = this,
				e = ui.element;

			self.element = e;

			self.currency = e.data('currency-symbol');
			self.showSymbol = e.data('show-symbol');

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
					if(dec != -1) {
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
		}
	};

})(jQuery);