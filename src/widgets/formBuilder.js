/**
* formBuilder Widget
*
* TODO: handle submission, bind to buttons somehow, and on-submit event
*
* TODO: maintain a model, take in the model, link to the fields and make is
* accessible by a getter model linker? listen to changes
*
* TODO: can you call _init() a second type with more options? is that how you
* call _setOption from outside?
*/
import $ from 'jquery';
import def from './formBuilder.def.js';
import './inputField';
import './selectionField';

$.widget('formBuilder.formBuilder', def);
