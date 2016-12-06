/**
 * submitButton Widget
 *
 * Status Classes:
 * submitting - when waiting for the onComplete callback
 * complete - set/unset with mark functions
 */

import $ from 'jquery';
import def from './submitButton.def.js';

$.widget('formBuilder.submitButton', def);

