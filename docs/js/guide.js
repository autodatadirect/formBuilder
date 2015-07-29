/**
 * Handles documentation page
 */

/* globals JSON:true, moment:true, CodeMirror:true */
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
$.extend($.formBuilder.inputField.types,{
	'SSN': {
		setUp: function(ui) {
			var self = this,
				e = ui.element;

			//- Set the characters a user can enter
			e.inputFilter({
				pattern: /[0-9]/,
				max: 12
			});

			//- Replace the input with a formatted input
			e.on('blur keydown', function(){
				e.val(self.format(e.val()));
			});
		},
		converter: {
			toField: function(value, ui) {
				return this.format(value);
			},
			fromField: function(value, ui) {
				return this.format(value);
			}
		},
		validate: function(ui) {
			if(!this.format(ui.element.val()).match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{4}$/)) {
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
			if(text.length <= 4) {
				return text;
			} else if(text.length <= 6) {
				return text.substring(0,4) + '-' + text.substring(4);
			} else {
				return  text.substring(0,4) + '-' + text.substring(4,6) + '-' + text.substring(6);
			}
		}
	} 
});







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
 * Create examples
 */


// Wrap each example in a form if not already in one
$('.example').each(function(){
	if(!$(this).parents('form').length && 
	!$(this).parents('.code').length && 
	!$(this).children('form.fb').length) {
		$(this).wrap('<form class="fb" action="#" style="display:none;" data-default-required="false">');
	}
});

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
	setTimeout(function(){
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




// ================= DEMO DISPLAY CODE BELOW ===================

//- Handle code snippets
$('.code').each(function(){
	var i;

	//- get code snippet
	var snippet =  $(this).html().substring(1);
	
	//get initial spacing char amount
	var initialSpacing = 0;
	for(i = 0; i < snippet.length && (snippet[i].match(/[\s\t]/)); ++i) {
		++initialSpacing;
	}

	//removes initial spacing chars in line
	var removeSpacing = function(lineStart) {
		var stopIndex = lineStart;
		for(var i = lineStart; i < snippet.length && (stopIndex - lineStart) < initialSpacing && snippet[i].match(/\s/); ++i) {
			++stopIndex;
		}

		//- console.log('Blocked by "' + snippet[i] + '" and cut "' + snippet.substring(lineStart, stopIndex) + '"');

		snippet = snippet.substring(0,lineStart) + snippet.substring(stopIndex);
	};

	//remove for all lines
	removeSpacing(0);
	for(i = 0; i < snippet.length; ++i) {
		if(snippet[i].match(/[\n\r]/) && (i+1) < snippet.length) {
			removeSpacing(i+1);
		}
	}

	//- Fix special html chars
	snippet = snippet.replace(/&quot;/g, "'");
	snippet = snippet.replace(/&amp;/g, "&");

	//- Add codemirror obj
	$(this).empty(); 
	var cm = {
		value: snippet,
		mode: $(this).data('mode'),
		indentWithTabs: false,
		lineNumbers: true,
		theme: 'monokai',
		readOnly: true
	};
	if(cm.mode === 'html') {
		cm.mode = 'xml';
		cm.htmlMode = true;
	}
	var newCodeMirror = new CodeMirror(this, cm);


	//- Add toggle button
	$(this).prepend('<button class="codeToggle">Toggle Source</button>');
	$(this).prepend('<div class="codeTitle">'+($(this).data('title') || $(this).data('mode').toUpperCase())+'</div>');

	if($(this).data('hidden')) {
		$(this).find('.CodeMirror:first').hide();
	}
});

$('.codeToggle').click(function(ev){
	$(this).next().slideToggle(100);
});

