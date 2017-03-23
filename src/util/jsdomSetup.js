if(!global.document){
	const jsdom = require('jsdom');
	global.document = jsdom.jsdom('<!doctype html><head></head><html><body></body></html>');
	global.window = document.defaultView;
	global.self = global.window;
	global.VERSION = 'testing';
}
