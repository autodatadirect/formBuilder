
import jquerySrc from '!!raw!jquery';
import jqueryUiSrc from '!!raw!jquery-ui-bundle';
const jsdom = require('jsdom');
global.document = jsdom.jsdom(`<!doctype html><head><script>${jquerySrc}</script><script>${jqueryUiSrc}</script></head><html><body></body></html>`);
global.window = document.defaultView;
//import 'jquery';


/*
global.window = require('jsdom').jsdom().createWindow();
const jQuery = require('jquery');
*/

