/**
 * Handle code snippets
 */
/* globals CodeMirror:true */
'use strict';

$('code[data-mode]').each(function(){
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

	//- Un-escape special html chars
	snippet = snippet
				.replace(/&#39;/g, '\'')
				.replace(/&quot;/g, '\"')
				.replace(/&amp;/g, '&')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace('/&#35;/g', '#');

	// Fix attributes with no value becoming =""
	snippet = snippet.replace(/data\-((required)|(no\-sort)|(no\-filter)|(store\-utc)|(military)|(load\-hidden)|(ignore\-hidden)|(default\-required))=""/g, function(match) {
		return match.replace('=""','');
	});

	//- Add codemirror obj
	$(this).children().remove();
	$(this).empty(); 
	var cm = {
		value: snippet,
		mode: $(this).data('mode'),
		indentWithTabs: false,
		lineNumbers: true,
		theme: 'default',
		readOnly: true,
		tabSize: 3
	};
	if(cm.mode === 'html') {
		cm.mode = 'xml';
		cm.htmlMode = true;
	}
	if(cm.mode === 'shell') {
		cm.lineNumbers = false;
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

