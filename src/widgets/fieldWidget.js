import $ from 'jquery';

export default function test() {
	console.log('-----------invoking');
	$.widget('formBuilder.fieldWidget', {

		isDirty: function () {
			return false;
		},

		validate: function () {
			return true;
		},

		clearDirty: function () {
			
		},

		clear: function () {
			this.set();
		},

		flash: function () {
			
		},

		set: function () {
			
		},

		get: function () {
			return null;
		}
	});
}


/*
 * 
 */