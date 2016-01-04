/**
 * submitButton Widget
 *
 * Status Classes:
 * submitting - when waiting for the onComplete callback
 * complete - set/unset with mark functions
 */
(function($) {
	'use strict';

	/*
	 * when you catch the submitbuttonsubmit event, you need to call execute
	 * 'event.data.onComplete' when the processing is done
	 */
	$.widget('formBuilder.submitButton', {
		options: {
			color: '#000',
			delay: 10,
			disabled: false,
			waiting: false,
			preventDefault: true,
			enterKeyListenerProvider: function() {
				return this.parents('form').first();
			},
			onKeyDown: function (ev) {
				if(ev.keyCode === 13 && !$(ev.target).is('textarea')) {
					this.submit.call(this, ev);
				}
			}
		},

		_showLoading: function() {
			var self = this,
				e = self.element,
				o = self.options,
				w = e.width(),
				h = e.height();

			e.addClass('submitting');

			self.getButtonLabel().css('visibility', 'hidden');

			self.spinner.appendTo(e).spin({
				color: o.color,
				top: -h + 4,
				left: -7
			});
		},

		getButtonLabel: function () {
			return this.element.find('.ui-button-text');
		},

		_hideLoading: function() {
			var self = this,
				e = self.element;

			if(self.destroyed){
				return;
			}

			e.removeClass('submitting');
			self.spinner.spin('stop');
			self.getButtonLabel().css('visibility', 'visible');
		},

		_create: function() {
			var self = this;
			var o = self.options;
			var e = self.element,
				bOptions = {};

			if(o.icons) {
				bOptions.icons = o.icons;	// does nothing
			}

			if(o.disabled) {
				bOptions.disabled = o.disabled;
			}

			if(o.text !== undefined){
				bOptions.text = o.text;
			}

			o.label = e.html();

			e.button(bOptions).on('click.submitButton', $.proxy(self.submit, self));

			self.spinner = $('<div class="spinner" style="display: inline-block; position: absolute; margin-left: -.10cm; margin-top: -.4cm;"></div>');
			(self.spinner).appendTo(e);

			var listenerProvider = o.enterKeyListenerProvider;
			if($.isFunction(listenerProvider)) {
				var listener = listenerProvider.call(e);
				if(typeof listener !== 'undefined') {
					listener.on('keydown.submitButton', $.proxy(o.onKeyDown, self));
				}
			}
		},

		submit: function(ev) {
			var self = this;
			var o = self.options;

			if(o.preventDefault && ev) {
				ev.preventDefault();
			}

			if(o.waiting === true || o.disabled === true) {
				return this;
			}

			if(!ev) {
				ev = null;
			}

			if(self._trigger('beforesubmit', ev) === false) {
				return this;
			}


			o.waiting = true;
			self._showLoading.call(self);

			/*
			 * submit clicks are delayed so that the UI can update before
			 * doing all of the submit work
			 *
			 * passes the onComplete callback as the data for this event
			 */
			setTimeout(function() {
				self._trigger('submit', ev, function() {
					o.waiting = false;
					self._hideLoading.call(self);
					self._trigger('aftersubmit', ev);
				});
			}, o.delay);

			return this;
		},

		enable: function() {
			var self = this,
				e = self.element;
			self.options.disabled = false;
			e.button('enable');
		},

		disable: function() {
			var self = this,
				e = self.element;
			self.options.disabled = true;
			e.button('disable');
		},

		markComplete: function() {
			var self = this,
				e = self.element;
			e.addClass('complete');
			self.disable();
		},

		markIncomplete: function() {
			var self = this,
				e = self.element;
			e.removeClass('complete');
			self.enable();
		},

		_destroy: function() {
			var self = this,
				e = self.element;
			e.off('.submitButton');
			self.destroyed = true;
		}
	});
})(jQuery);