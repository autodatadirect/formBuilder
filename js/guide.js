/**
 * Handles documentation page
 */

/* globals JSON:true, moment:true, Path2D:true */
'use strict';

/**
 * Customization Examples
 */

// Adding simple regex types
$.extend($.formBuilder.inputField.types,{
	'swear': $.formBuilder.inputField.createRegexType(/^[\!@#\$%\&*]*$/, /[\!@#\$%\&*]/),
	'theLetterF': $.formBuilder.inputField.createRegexType(/^[fF]*$/, /[fF]/,{
			toUpper: false
		}),
	'luckySeven': $.formBuilder.inputField.createRegexType(/^[7]*$/, /[7]/,{},3)
});

// Adding full custom types
$.formBuilder.inputField.types.SSN = {
	setUp: function(ifw) {
		var self = this,
			e = ifw.element;

		// Add a placeholder
		ifw.placeholder('XXX-XX-XXXX');

		// Set the characters a user can enter
		e.inputFilter({
			pattern: /[0-9]/,
			max: 11,
			extraFilter: function(val, inText) {
				// A special character maximimum
				if(val.replace(/[^0-9]/g,'').length < 9) {
					return inText;
				}
			}
		});

		// Replace the input with a formatted input
		e.on('blur', function(){
			e.val(self.format(e.val()));
		});
	},
	converter: {
		toField: function(value, ifw) {
			return this.format(value);
		},
		fromField: function(value, ifw) {
			return parseInt(this.format(value).replace(/\-/g,''),10);
		}
	},
	validate: function(ifw) {
		if(!this.format(ifw.element.val()).match(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)) {
			return {
				message: 'invalid'
			};
		}
	},

	//- This is an extra function specifically for this type
	format: function(text) {
		if(!text) {
			return '';
		}

		//- Remove non-digits
		text = text.replace(/[^0-9]/g,'');
		text = text.substring(0, 10);

		//- add correct dashes
		if(text.length <= 3) {
			return text;
		} else if(text.length <= 5) {
			return text.substring(0,3) + '-' + text.substring(3);
		} else {
			return  text.substring(0,3) + '-' + text.substring(3,5) + '-' + text.substring(5);
		}
	}
};







// For drop down panel
$.formBuilder.inputField.types.customLocation = {
	_dropDownTemplate:
		'<div>' +
			'<p>Enter the location information below. In this <i>customLocation</i> type, the input field above is only used as a visual. The actual data is retrieved from this subform as an object. However, the parent form will see still see this as a single input.</p>' +
			'<form data-default-required="true">' + 
				'<input name="name" type="text" data-type="utext" data-label="Location Name" />' +
				'<input name="address" type="text" data-type="utext" data-label="Address" />' +
				'<input name="city" type="text" data-type="utext" data-label="City" />' +
				'<input name="state" type="text" data-type="state" data-label="State" />' +
			'</form>' + 
			'<br/><button type="button" disabled>View on Google Maps</button>' + 
		'</div>',

	setUp: function(ifw) {
		var self = this,
			e = self.e = ifw.element;

		self.ifw = ifw;

		self.ddp = $(self._dropDownTemplate).dropDownPanel({
			target: e,
			afterclose: function() {
				ifw.validate(true);
			}
		});

		self.form = self.ddp.find('form').formBuilder();
		self.viewBtn = self.ddp.find('button');

		self.form.on('change', function(ev){
			self._updateTarget();
		});

		self.viewBtn.on('click', function(ev){
			var data = self.form.formBuilder('get'),
				query = '';

			if(data.address) {
				query += data.address;
			}
			if(data.city) {
				query += ' ' + data.city;
			}
			if(data.state) {
				query += ' ' + data.state;
			}

			if(query.trim()) {
				window.open('http://maps.google.com?q='+query);
			}
			
		});

		// disable input to the source element
		e.inputFilter({
			pattern: /[]/ //accept nothing
		});
		e.on('keydown', function(ev){
			// ignore backspaces
			if(ev.keyCode === 8) {
				return false;
			}
		});

		ifw.placeholder('Location name, Address');

	},

	_updateTarget: function() {
		var self = this,
			data = self.form.formBuilder('get');
		
		if(data.name && data.address && data.city && data.state) {
			self.e.val(data.name + ', ' + data.address);
			self.viewBtn.prop('disabled', false);
			self.ifw.redraw();
		} else {
			self.e.val('');
			self.viewBtn.prop('disabled', true);
			self.ifw.redraw();
		}
		
	},

	converter: {
		toField: function(value, ifw) {
			var self = this;

			self.form.formBuilder('set', value);
			self._updateTarget();

			return ;
		},
		fromField: function(value, ifw) {
			var self = this;

			return self.form.formBuilder('get');
		}
	},
	
	validate: function(ifw) {
		var self = this;

		if(!self.form.formBuilder('validate')) {
			return {
				message: 'invalid'
			};
		}

		self._updateTarget();
	},

	isEmpty: function() {
		var self = this,
			fields = self.form.formBuilder('getFields'),
			empty = true;

		fields.each(function(i, field){
			if(!$(field).inputField('isEmpty')) {
				empty = false;
				return false;
			}
		});

		return empty;
	},
		
	tearDown: function() {
		var self = this;

		self.ddp.remove();
	}
};




/**
 * Create Custom Field Widget
 */
// You can use the formBuilder utility functions if needed
var util = $.formBuilder.util;

$.formBuilder.inputField.types.colorHex = {
	_validRegex: /^[ABCDEF0-9]{6}$/,
	setUp: function(ifw) {
		var self = this,
			e = ifw.element;

		e.inputFilter({
			pattern: /[ABCDEFabcdef0-9]/,
			max: 6,
			toUpper: true
		});
		e.css('font-family', 'monospace');

		e.blur(function(){
			if(!e.val().match(self._validRegex)) {
				ifw.clear();
			}
		});

		ifw.placeholder('Color Hex');
	},
	
	converter: {
		toField: function(value, ifw) {
			var self = this;

			// Make sure is string
			value = (''+value).toUpperCase();

			// Remove '#' if added
			if(value.length > 1 && value[0] === '#') {
				value = value.substring(1);
			}

			return value.match(self._validRegex)? value : '';
		},
		fromField: function(value, ifw) {
			var self = this;
			return value.match(self._validRegex)? '#' + value.toUpperCase() : '';
		}
	},

	validate: function(ifw) {
		var self = this;
		return ifw.get().match(self._validRegex)? undefined : {
			message: ''
		};
	}
};

$.widget('examples.customColorPicker', {
	/**
	 * Any options needed
	 * Optional.
	 */
	options: {
		required: false, // passed by formBuilder

		randomColors: false,
		randomCount: 10,
		outerDiameter: 250.0,
		innerDiameter: 80.0,
		padding: 10.0,
		divider: 8.0,
		background: '#FBFBFB'
	},

	/**
	 * jQuery widget constructor
	 * Required.
	 */
	_create: function() {
		var self = this,
			e = self.element,
			o = self.options;

		// Load any options from DOM (overrides any passed options if set)
		util.loadDomData(e, o, ['outerDiameter','innerDiameter', 'padding','divider', 'background', 'randomCount']);
		util.loadDomToggleData(e, o, ['required','randomColors']);

		self.sideLength = o.outerDiameter + o.padding;

		self.wrapper = $('<div class="picker-wrapper input-field-group"></div>').appendTo(e);
		self.canvas = $('<canvas class="picker-canvas" width="'+self.sideLength+'" height="'+self.sideLength+'"></canvas>').appendTo(self.wrapper);
		self.field = $('<input type="text" data-type="colorHex" class="picker-field" data-prefix="#" style="width:60px"/>').appendTo(self.wrapper).inputField({
			required: o.required
		});

		self.isSupported = !!self.canvas[0].getContext;

		if(self.isSupported) {
			e.addClass('picker');

			// Convert strings to floats
			o.outerDiameter = parseFloat(o.outerDiameter);
			o.innerDiameter = parseFloat(o.innerDiameter);
		
			self._setColors();
		
			var fieldWrapper = self.field.inputField('getField');
			setTimeout(function() {
				self.fieldColor = -1;
				self._drawPicker();
				fieldWrapper.css({
					left: self.sideLength/2 - fieldWrapper.outerWidth()/2.0,
					top: self.sideLength/2 - fieldWrapper.outerHeight()/2.0
				});
			}, 10); 

			// Check for hover + check events events
			self.canvas.on('mousemove', function(ev) {
				for(var i = 0; i < self.colors.length; ++i) {
					if(self._pointInSlice(ev.offsetX, ev.offsetY, i)) {
						self.hoverColor = i;
						self._drawPicker();
						self.canvas.css('cursor','pointer');
						return;
					}

					self.hoverColor = -1;
					self._drawPicker();
					self.canvas.css('cursor','default');
				}
			}).on('click', function(ev) {
				for(var i = 0; i < self.colors.length; ++i) {
					if(self._pointInSlice(ev.offsetX, ev.offsetY, i)) {					
						self.field.focus().val(self.colors[i].substring(1)).keydown().blur();
						self.fieldColor = self.get();
						self._drawPicker();
						return;
					}
				}
			}).on('mouseleave', function() {
				if(self.hoverColor >= 0) {
					self.hoverColor = -1;
					self._drawPicker();
					self.canvas.css('cursor','default');
				}
			});

			self.field.on('change keydown', function() {
				self.fieldColor = self.get();
				self._drawPicker();
			});

		} else {
			console.log('Canvas is unsupported, only the inputField will be used for the customColorPicker');
			self.canvas.remove();
			self.canvas = undefined;
		}
	},

	/**
	 * jQuery widget destructor
	 * Optional, suggested.
	 */
	_destroy: function() {
		var self = this,
			e = self.element;

		self.canvas.remove();
		self.field.remove();
		e.empty();
	},


	/**
	 * Used to set field.
	 * @param {any} Any data needed by the widget to set its value
	 * Required.
	 */
	set: function(data) {
		var self = this;

		self.field.inputField('set', data);
		self.fieldColor = self.get();
		self._drawPicker();
	},

	/**
	 * Used to retrieve the data from the field.
	 * @return {any} Data from field. Must match set() data format
	 * Required.
	 */
	get: function() {
		return this.field.inputField('get');
	},

	/**
	 * Checks for dirty state. A value is dirty when 
	 * what is entered is differs from the last set()
	 * @return {Boolean} clean/dirty
	 * Required.
	 */
	isDirty: function() {
		return this.field.inputField('isDirty');
	},

	/**
	 * Removes the dirty state and calls any needed events.
	 * Note: This should not change the value of the widget, 
	 * that is what clear() is for.
	 * Required.
	 */
	clearDirty: function() {
		this.field.inputField('clearDirty');
	},

	/**
	 * Empties all entered inputs.
	 * Required.
	 */
	clear: function() {
		this.field.inputField('clear');
	},

	/**
	 * Preforms a visual effect to bring the user's attention
	 * to the widget. Can be used for errors or simply left
	 * empty.
	 * Required.
	 */
	flash: function() {

	},

	/**
	 * Runs input validation on the widget's inputs. This can 
	 * be anything specific to the widget.
	 * @return {Boolean} valid/invalid
	 */
	validate: function() {
		return this.field.inputField('validate');
	},

	/**
	 * Custom functions to handle canvas
	 */

	_defaultColors: ['#FF0000','#FF7F00','#FFFF00','#00FF00','#00FFFF','#0000FF','#8B00FF', '#000000'],
	_setColors: function() {
		var self = this,
			o = self.options,
			i;
		
		self.colors = [];
		if(o.randomColors) {

			if(o.randomCount < 2) {
				o.randomCount = 2;
			}

			for(i = 0; i < o.randomCount; ++i) {
				self.colors[i] = '#' + Math.floor((Math.random() * 0xFFFFFF)).toString(16).toUpperCase();
			}
		} else {
			for(i = 0; i < self._defaultColors.length; ++i) {
				self.colors[i] = self._defaultColors[i];
			}			
		}

	},

	_drawPicker: function() {
		var self = this,
			c = self.colors,
			o = self.options,
			ctx = self.canvas[0].getContext('2d'),
			origin = self.sideLength/2.0,
			sliceRadians = 2*Math.PI/c.length,
			iRadius = o.innerDiameter/2.0,
			oRadius = o.outerDiameter/2.0,
			i;

		// Reset canvas
		ctx.clearRect(0,0,self.canvas.width, self.canvas.height);

		// Draw color slices
		var drawSlice = function(color, i, isHover) {
			var r = i*sliceRadians,
				path = new Path2D();
				
			path.moveTo(
				origin+iRadius*Math.cos(r),
				origin+iRadius*Math.sin(r)
			);
			path.lineTo(
				origin+oRadius*Math.cos(r),
				origin+oRadius*Math.sin(r)
			);
			path.arc(
				origin, origin, oRadius, r, r+sliceRadians, false
			);
			r += sliceRadians;
			path.lineTo(
				origin+iRadius*Math.cos(r),
				origin+iRadius*Math.sin(r)
			);
			path.arc(
				origin, origin, iRadius, r, r-sliceRadians, true
			);
			path.lineTo(
				origin+oRadius*Math.cos(r-sliceRadians),
				origin+oRadius*Math.sin(r-sliceRadians)
			);

			ctx.fillStyle = color;
			ctx.fill(path);
			
			ctx.strokeStyle = isHover? color : o.background;
			
			ctx.lineWidth = o.divider;
			ctx.stroke(path);
			
		};


		// Draw normal slices
		for(i = 0; i < c.length; ++i) {
			if(self.hoverColor !== i) {
				drawSlice(c[i], i, false);
			}
		}

		// Draw hover slice
		if(self.hoverColor >= 0) {
			drawSlice(c[self.hoverColor], self.hoverColor, true);
		}

		// Draw center
		var circle = new Path2D();

		circle.moveTo(origin, iRadius);
		circle.arc(origin, origin, iRadius + o.divider, 0, 2*Math.PI, false);

		ctx.fillStyle = (self.fieldColor.length === 7)? self.fieldColor : o.background;
		ctx.fill(circle);		
	},

	// Check point against a simple trapazoid around a slice (curves ignored)
	_pointInSlice: function(x, y, i) {
		var self = this,
			o = self.options,
			c = self.colors,
			sliceRadians = 2*Math.PI/c.length,
			origin = self.sideLength/2.0,
			r1 = sliceRadians*i,
			r2, piDeg, pRadius, theta;

		// point radius
		pRadius = Math.sqrt(Math.pow(origin - x, 2) + Math.pow(origin - y, 2)); //distance formula

		/**
		 * 1. farthest perpendicular edge to centerline
		 * 2. closest perpendicular edge to centerline
		 */
		if((o.outerDiameter/2.0 < pRadius) || (pRadius < o.innerDiameter/2.0*Math.cos(sliceRadians/2))) {
			return false;
		}

		r2 = r1 + sliceRadians;

		// adjust pt + theta to quadrant
		x -= origin;
		y -= origin;
		theta = Math.atan(y/x);

		if(x < 0) {
			theta += Math.PI;
		} else if(x >= 0 && y < 0) {
			theta += 2*Math.PI;
		}

		/**
		 * 1. radians to right edge
		 * 2. radians to left edge
		 */
		if(theta < r1 || r2 < theta) {
			return false;
		}

		// Inside all boundary checks
		return true;
	}

});





/**
 * Create examples
 */


var f = $('form.fb').formBuilder();

window.sf = f.filter('.example form').eq(0);
window.sfw = window.sf.data('formBuilderFormBuilder');

f.find('button[type="submit"]').submitButton({
	submit: function(ev, done) {
		$(this).closest('form').formBuilder('validate');
		done();
	}
});







/**
 * Submit Button example
 */
$('#submitButtonExample').submitButton({
	submit: function(ev, done) {
		setTimeout(function(){
			done();
		}, 1000);
	}
});




/**
 * Live Demo
 */
var events = $('#example-events');
var data = $('#example-data');
var eventNum = 1;
var logEvent = function(str) {
	events.val(events.val()+'\n['+(eventNum++)+']  '+str);
	events.scrollTop(events[0].scrollHeight);
};

events.val('[0]  Start');

var formExample = $('form#example:first').formBuilder({
	beforeset: function(ev) {
		logEvent('beforeset called on formBuilder');
	},
	afterset: function(ev) {
		logEvent('afterset called on formBuilder');
	}
});

logEvent('Initialized');

var saveForm = function(data, done) {
	// Save data to server (setTimeout is just used in the example to simulate the lag time, use $.ajax instead)
	setTimeout(function() {
		// If the server-side save was good, set it back to clean
		logEvent('server save complete');
		done();
	}, 2000);
	
	/* Example server call
	$.ajax({
		url: 'someserver.com',
		type: 'POST',
		data: data,
		success: function(result) {
			//handle your server result
			done();
		},
		error: function() {
			//connection error
			done();
		}
	});
	*/
};

formExample.find('button[type="submit"]').submitButton({
	color: '#FF0000',
	beforesubmit: function(ev) {
		// Runs any presubmission stuff
		logEvent('beforesubmit called');
		data.val('');
	},
	
	submit: function(ev, done) {
		logEvent('submit called');
		

		// Run validation
		if(!formExample.formBuilder('validate')) {
			// The form is invalid somewhere
			logEvent('has invalid');
			done();
			return;
		}

		logEvent('all valid');

		var currData = formExample.formBuilder('get');
		data.val(JSON.stringify(currData,null,2));

		saveForm(currData, done);
	},
	
	aftersubmit: function(ev) {
		// Run any post-submission stuff
		logEvent('aftersubmit called');
	}
});















/**
 * SettableSelect Handling
 */
var optionSetChanged = false;
var sOptionsOne = [
	{value:"true",	label:"Yes"},
	{value:"false",	label:"No"},
	{value:"5",		label:"option 1"},
	{value:"2",		label:"option 2"},
	{value:"3",		label:"option 3"},
	{value:"4",		label:"option 4"},
	{value:"5",		label:"option 5"},
	{value:"100",	label:"Some label"},
	{value:"AAA",	label:"123 Some St."},
	{value:"BBB",	label:"Some Business Name Inc."},
	{value:"Hodor",	label:"Bran"}
];

var sOptionsTwo = [
	{value:"some",	label:"Different Option"},
	{value:"value",	label:"Different Source"},
	{value:"here",	label:"Settable with function"}
];

var sts = $('input#settableSelect[data-type="select"]');
sts.inputField('getType').setOptions(sOptionsOne);
$('button[name="toggleSelect"]').click(function(){
	sts.inputField('getType')
		.setOptions(optionSetChanged? sOptionsOne : sOptionsTwo);

	optionSetChanged = !optionSetChanged;
});


$('.aClass').hide();







/**
 * testSubmitter setup
 */
$('#textSubmitterStandalone').textSubmitter();
$('#textSubmitterDefault').textSubmitter();

var messages = $('#textSubmitterSubmitBox .messages');
$('#textSubmitterSubmit').textSubmitter({
	width: messages.outerWidth() + 15,
	rows: 1,
	placeholder: 'Type a message!',
	ignoreEmptySubmit: true,
	submit: function(ev, data){
		setTimeout(function(){
			data.text = data.text.trim();
			if(data.text) {
				messages.append('<div class="message"><span class="submitTime">['+moment().format('HH:mm:ss')+']</span><span class="submitText">"'+data.text+'"</span></div>');
				messages.scrollTop(messages[0].scrollHeight);
				data.onComplete(true);
			} else {
				data.onComplete(false);
			}
		}, 200);
		
	}
});
$('#textSubmitterOptions').textSubmitter({
	width: '400px',
	placeholder: 'Some placeholder',
	sendInstruction: 'Some sendInstruction',
	rows: 2
});

$('.dateRange').dateRangePicker();

$('.dateTimeRange').dateTimeRangePicker();







/**
 * Drop Down Panel
 */

// Basic example
$('#ddpExampleBasic').dropDownPanel({
	target: $('#ddpBasicTarget0')
});

$('<div>A drop down panel is just a normal container</div>').dropDownPanel({
	target: $('#ddpBasicTarget1')
});


// InputField Example
var ddp = $('#ddpInputField');
var ddp2 = ddp.clone();

ddp.dropDownPanel({
	target: $('.ddpInputFieldTarget0')
});
ddp2.dropDownPanel({
	target: $('.ddpInputFieldTarget1'),
	targetInput: false
});

ddp.find('form').formBuilder();
ddp2.find('form').formBuilder();

