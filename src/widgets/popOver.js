

(function($){
	var doc = $(document),
		win = $(window),
		body = $('body');

	$.widget("add123.popOver", {

		options: {
			target: '',
			top: 0,
			left: 0,
			appendTo: 'body'
		},

		_create: function() {
			var self = this,
				o = self.options,
				e = self.element;

			self.showing = false;

			e.detach();
			var content = e.clone().addClass('form-input-tooltip');
			self.title = $('<h3 class="tooltip-title"></h3>');

			e.addClass('tooltip-wrapper').css('position', 'absolute');

			e.empty();

			e.append(self.title).append(content);

			e.appendTo(o.appendTo);

			self.onClick = function(ev) {
				var target = $(ev.target);

				if(!self.showing){
					return;
				}

				if(!target.childOf(e, true) && !$(ev.delegateTarget.activeElement).childOf(e, true) && !target.childOf(o.target, true)) {
					if(self._trigger('beforeoffclick', ev, target)) {
						self.hide();
					}
				}
			};

			self.onResize = function(ev) {
				if(!self.showing){
					return;
				}
				self.position();
			};

			/*
			 * listen for off clicks
			 */
			doc.on('mousedown', self.onClick);

			/*
			 * listen for window resizes
			 */
			win.on('resize', self.onResize);
		},

		setAppendTo: function (el) {
			var self = this,
				o = self.options,
				e = self.element;

			o.appendTo = el;
			e.appendTo(el);
		},

		_init: function () {
			var self = this,
				e = self.element,
				titleElement = self.title;

			var title = e.attr('title');

			if(title) {
				titleElement.text(title).show();
			}else{
				titleElement.hide();
			}
		},

		toggle: function() {
			var self = this,
				e = self.element;

			if(self.showing) {
				self.hide();
			} else {
				self.show();
			}
		},

		show: function() {
			var self = this;

			if(self.showing){
				return;
			}

			/*
			 * show must be deferred with a timeout to avoid being affected by an offclick
			 */
			setTimeout(function() {
				self.showing = true;
				self.position();
				/*
				 * fadeIn is used instead of show() so that the popover
				 * posistioning is not visible
				 */
				self.element.fadeIn(10);
				self._trigger('onShow');
			}, 0);
		},

		hide: function() {
			var self = this;

			if(!self.showing){
				return;
			}

			self.showing = false;

			self.element.hide();
			self._trigger('onHide');
		},

		position: function() {
			var self = this,
				o = self.options,
				e = self.element,
				my = 'left+' + (o.left - 3) + ' top+' + (o.top + 3),
				at = 'left bottom',
				collision = 'flipfit none';

			if (o.my) {
				my = o.my;
			}

			if (o.at) {
				at = o.at;
			}

			if (o.collision) {
				collision = o.collision;
			}

			setTimeout(function() {
				e.position({
					my: my,
					at: at,
					of: o.target,
					collision: collision
				});
			}, 0);
		},

		_destroy: function() {
			var self = this,
				e = self.element;
			doc.off('mousedown', self.onClick);
			win.off('resize', self.onResize);
		}
	});

})(jQuery);