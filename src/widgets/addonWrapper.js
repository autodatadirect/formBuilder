/**
 * addonWrapper Widget
 *
 * Wraps the element with side elements and allows these addons to be modified.
 *
 * Addons are split into two groups: before and after. The before group handles
 * negative weights and the after group will handle positive weights.
 *
 * Smaller |weight| values will be closer to the source element.
 *
 * The .addon-container class must be styled to match the height of the source
 * element, and the source element should be inline. This can be done easily by
 * specifying a line-height if the elements should not contain multiple lines.
 */

(function($) {
	'use strict';

	$.widget('formBuilder.addonWrapper', {

		options: {

			/**
			 * Combined width of the addons and source element will be the same
			 * as the original source element alone by reducing its size.
			 *
			 * When true, the update function should be used to wrap any action
			 * that may affect an addon's width.
			 */
			fixWidth: false

			// postUpdate() - called after an update() is completed
		},

		_create: function() {
			this.sides = {};
		},

		add: function(element, weight, keepPosition) {
			var self = this,
				side = self._getSide(weight),
				addon;

			self.update(function() {
				addon = self._add(
					element,
					side,
					self._weightToPos(weight, side),
					!!keepPosition
				);
			});

			return addon;
		},


		/**
		 * Get $(addon) by exact weight
		 */
		get: function(weight) {
			var side, pos;

			if(!weight || typeof weight !== 'number') {
				// 0 or invalid
				return;
			}

			side = this.sides[weight < 0? 'before' : 'after'];

			if(!side) {
				return;
			}

			pos = Math.abs(weight);

			if(pos < side.elements.length) {
				return $(side.elements[pos]);
			}

			// Non matching
			return;
		},

		/**
		 * Maintains the source element's width through updatePreformer()
		 */
		update: function(updatePreformer) {
			if(this.options.fixWidth) {
				this._saveWidth();
			}

			if($.isFunction(updatePreformer)) {
				updatePreformer(this.element);
			}

			if(this.options.fixWidth) {
				this._restoreWidth();
			}

			if($.isFunction(this.options.postUpdate)) {
				this.options.postUpdate(this.element);
			}
		},

		_getSide: function(weight) {
			var name = (weight < 0)? 'before' : 'after',
				side = this.sides[name],
				container;

			if(!side) {
				// Create it
				side = this.sides[name] = {
					elements: [null],
					fixedPos: [],
					insertNextFunction: name, // before/after
					insertClosestFunction: (weight < 0)? 'append' : 'prepend'
				};

				container = $('<div class="addon-container addon-container-'+name+'"></div>');

				// places before/after source element
				this.element[name](container);

				side.container = container[0];
			}

			return side;
		},

		_saveWidth: function() {
			this.savedWidth = this.element.parent().width();
		},

		_restoreWidth: function() {
			var e = this.element;
			e.width(e.width() + (this.savedWidth - e.parent().width()));
		},


		_weightToPos: function(weight, side) {
			var position = Math.abs(weight);

			if(typeof position !== 'number' || position <= 0) {
				position = 1;
			} else if (position > side.elements.length) {
				position = side.elements.length;
			}

			return position;
		},

		_add: function(newElement, side, position, keepPosition) {
			var self = this,
				newAddon;

			if(side.fixedPos.indexOf(position) !== -1) {
				// Get next open position, respecting closest first
				while(side.fixedPos.indexOf(position) !== -1) {
					++position;
				}
			}


			// Make the addon
			newAddon = $(newElement);
			if(!newAddon) {
				// failed to create it
				return;
			}

			newAddon.addClass('addon');

			// Insert it using jquery addition functions
			if(position <= 1) {
				$(side.container)[side.insertClosestFunction](newAddon);
			} else {
				$(side.elements[position - 1])[side.insertNextFunction](newAddon);
			}

			// Store DOM element only
			side.elements.splice(position, 0, newAddon[0]);

			if(keepPosition) {
				side.fixedPos.push(position);
			}

			// Increase any subsequent fixed locations
			$.each(side.fixedPos, function(i, fpos) {
				if(fpos > position) {
					side.fixedPos[i] += 1;
				}
			});

			// Handle removed elements
			newAddon.on('remove', function() {
				side.elements.splice(position, 1);

				if(keepPosition) {
					side.fixedPos.splice(side.fixedPos.indexOf(position), 1);
				}

				if(self.options.fixWidth) {
					self._restoreWidth();
				}

			});

			return newAddon;
		},

		_destroy: function() {

			// Remove all side elements
			$.each(this.sides, function(sideName, side) {
				$(side.container).remove();
			});

		}
	});

})(jQuery);
