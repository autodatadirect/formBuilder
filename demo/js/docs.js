/**
 * Handles documentation page
 */

/* globals JSON:true, moment:true, CodeMirror:true */
'use strict';

//- Wrap each example in a form if not already in one
$('.example').each(function(){
	if(!$(this).parents('form').length && !$(this).parents('.code').length) {
		$(this).wrap('<form id="fb" action="#" style="display:none;" data-default-required="false">');
	}
});

//- Declaring test codes for data-type 'code'
var testCodes = [ 
	{"value":"submitted to form", "label":"Searched Item"},
	{"value":"true", "label":"Yes"},
	{"value":"false", "label":"No"},
	{"value":"5", "label":"option 1"},
	{"value":"2", "label":"option 2"},
	{"value":"3", "label":"option 3"},
	{"value":"4", "label":"option 4"},
	{"value":"5", "label":"option 5"},
	{"value":"100",  "label":"Some label"},
	{"value":"AAA",  "label":"123 Some St."},
	{"value":"BBB",  "label":"Some Business Name Inc."},
	{"value":"Hodor",  "label":"Bran"}
];

//- Adding simple regex types
$.extend($.formBuilder.inputField.types,{
	'swear': $.formBuilder.inputField.createRegexType(/^[\!@#\$%\&*]*$/, /[\!@#\$%\&*]/),
	'theLetterF': $.formBuilder.inputField.createRegexType(/^[fF]*$/, /[fF]/,{
			toUpper: false
		}),
	'luckySeven': $.formBuilder.inputField.createRegexType(/^[7]*$/, /[7]/,{},3)
});

//- Adding full custom types
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



var f = $('form#fb').formBuilder();
f.find('button[type="submit"]').submitButton({
	beforesubmit: function(ev) {
		console.log('before');
	},
	submit: function(ev, finish) {
		console.log('submit');

		var pForm = $(this).closest('form');

		pForm.formBuilder('validate');
		console.log('Form dirty? ' + pForm.formBuilder('isDirty'));
		console.log(pForm.formBuilder('conflicts'));
		//- console.log(f.formBuilder('get'));

		finish();
	},
	aftersubmit: function(ev) {
		console.log('after');
	}
	});

//- Example form
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

var saveForm = function(data, finish) {
	// Save data to server (setTimeout is just used in the example to simulate the lag time, use $.ajax instead)
	setTimeout(function(){
		// If the server-side save was good, set it back to clean
		logEvent('server save complete');
		finish();
	}, 2000);
	
	/* Example server call
	$.ajax({
		url: 'someserver.com',
		type: 'POST',
		data: data,
		success: function(result) {
			//handle your server result
			finish();
		},
		error: function() {
			//connection error
			finish();
		}
	});
	*/
};

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

formExample.find('button[type="submit"]').submitButton({
	color: '#FF0000',
	beforesubmit: function(ev) {
		// Runs any presubmission stuff
		logEvent('beforesubmit called');
		data.val('');
	},
	
	submit: function(ev, finish) {
		logEvent('submit called');
		

		// Run validation
		if(!formExample.formBuilder('validate')) {
			// The form is invalid somewhere
			logEvent('has invalid');
			finish();
			return;
		}

		logEvent('all valid');

		var currData = formExample.formBuilder('get');
		data.val(JSON.stringify(currData,null,2));

		saveForm(currData, finish);
	},
	
	aftersubmit: function(ev) {
		// Run any post-submission stuff
		logEvent('aftersubmit called');
	}
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


// Handle nav bar highlight
var navItems = $('.sideNav li');

var refreshNavBar = function(){
	var anchors = $('.anchor');

	navItems.removeClass('current');

	anchors.each(function(index, element){
		var e = $(element);
		var nextAnchor;

		if(index + 1 < anchors.length) {
			nextAnchor = $(anchors[index + 1]);
		}

		if(!nextAnchor || e.offset().top + (nextAnchor.offset().top - e.offset().top)*.9 > $(window).scrollTop()) {
			var navCurrent = navItems.filter('[name="'+e.attr('name')+'"]');

			navCurrent.addClass('current');

			if(navCurrent.parent().is('.navDepth-0')) {
				navCurrent.children('ul').children().eq(0).addClass('current');
			} else {
				navCurrent.parents('li').addClass('current');
			}
			
			return false;
		}	
	});

};
refreshNavBar();


$(window).on('scroll resize', function(){
	refreshNavBar();	
})
