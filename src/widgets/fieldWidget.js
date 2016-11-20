import $ from 'jquery';
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

	set: function (data) {
		
	},

	get: function () {
		return null;
	}
});