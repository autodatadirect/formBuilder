import $ from 'jquery';
import '../widgets/inputField';

const types = $.formBuilder.inputField.types;

export function register (newTypes) {
	Object.assign(types, newTypes);
}

export function get () {
	return types;
}
