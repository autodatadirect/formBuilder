/**
 * jQuery UI Widget support for spin.js
 *
 * http://fgnass.github.com/spin.js/
 */

/*global Spinner:true */
(function($){
	'use strict';

	$.widget('formBuilder.spin', {

		options: {
			lines: 10,
			// The number of lines to draw
			length: 4,
			// The length of each line
			width: 2,
			// The line thickness
			radius: 3,
			// The radius of the inner circle
			rotate: 0,
			// The rotation offset
			color: '#000',
			// #rgb or #rrggbb
			speed: 1.5,
			// Rounds per second
			trail: 60,
			// Afterglow percentage
			shadow: false,
			// Whether to render a shadow
			hwaccel: false,
			// Whether to use hardware acceleration
			className: 'spinner',
			// The CSS class to assign to the spinner
			zIndex: 0,
			// The z-index (defaults to 2000000000)
			top: '0',
			// Top position relative to parent in px
			left: '1000' // Left position relative to parent in px
		},

		_spinner: undefined,

		_create: function() {
			var self = this;
			self._spinner = new Spinner(self.options);
		},

		_init: function() {
			this.start();
		},

		start: function() {
			this._spinner.spin(this.element[0]);
		},

		stop: function() {
			this._spinner.stop();
		},

		_destroy: function() {
			var self = this;
			self.stop();
			delete self._spinner;
		}
	});

})(jQuery);
