/**
* inputField Widget
*
* This widget wraps the operation of a single field of a form
*
* Public Methods:
*   value(value)
*   validate()
*   flash()
*   setError()
*   clearError()
*   redraw()
*   status(statusName, bool)
*/

import $ from 'jquery';
import def from './inputField.def.js';
import createRegexType from '../util/regexInputFieldTypeCreator';

import './fieldWidget';
import './inputField.scss';

$.widget('formBuilder.inputField', def);

/*
 * InputField Types
 *
 * Stored in $.formBuilder.inputField.types
 *
 * The context (this) will get set to the context of the type object, use the ifw parameter to obtain access to the inputField widget
 *
 * setUp: add any events, elements, etc.
 *
 * tearDown: reverse whatever setUp did
 *
 * converter: used to convert data between "human" and transport formats (e.g. mm/dd/yyyy <-> yyyymmdd)
 *
 * validate: returns an error object on error or undefined on success
 * err: {
 *   message: '',
 *   code: '', // not used
 *   description: '' // not used
 * }
 *
 */
$.formBuilder.inputField.types = {};
$.formBuilder.inputField.createRegexType = createRegexType;

/* Basic Type Structure
$.formBuilder.inputField.types = {
	setUp: function(ifw) {},
	tearDown: function(ifw) {},
	converter: {
		toField: function(value, ifw) {
			return value;
		},
		fromField: function(value, ifw) {
			return value;
		}
	},
	validate: function(ifw) {
		return {
			message: 'invalid'
		};
	}
};
*/

