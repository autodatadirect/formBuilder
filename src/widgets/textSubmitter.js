/**
 * formBuilder.textSubmitter widget
 *
 * You can type text then hit enter to trigger a submit event with the data and a callback.
 * Once submitted, the textbox is cleared and ready for new input.
 *
 * A send instruction message appears when focused
 */

import $ from 'jquery';
import def from './textSubmitter.def.js';

$.widget('formBuilder.textSubmitter', def);
