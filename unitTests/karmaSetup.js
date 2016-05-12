/**
 * Sets up the karma page to look like the testRunner.html
 */

'use strict';


(function(){
	var cssFiles, body, i;

	cssFiles = [
		'/base/lib/Aristo-jQuery-UI-Theme/css/Aristo/Aristo.css',
		'/base/node_modules/normalize.css/normalize.css',
		'/base/build/css/formBuilder.css',
		'/base/node_modules/timepicker/jquery.timepicker.css',
		'/base/node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css'
	];

	body = $('body');

	// Include all css files
	for(i = 0; i < cssFiles.length; ++i) {
		body.append('<link rel="stylesheet" href="'+cssFiles[i]+'"/>');
	}


	// testRunner.html specific stuff
	body.append('<style>'+
		'html, body {'+
		'	height: 100%;'+
		'	width: 100%;'+
		'}'+
		'.test-container {'+
		'	padding: 2em;'+
		'	height: 300px;'+
		'}'+
		'</style>');
	body.append('<div class="test-container"></div>');


	window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
})();
