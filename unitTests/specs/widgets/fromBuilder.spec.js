/**
 * Testing formBuilder
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('A formBuilder widget',function(){
	var testContainer = window.formBuilderTesting.testContainer;

	var testInputs = [
		'<input name="" type="test"/>',
		'<input name="" type="test"/>',
		'<input name="" type="test"/>',
		'<input name="" type="test"/>'
	];

	var baseFormHtml = '<form>';
	for(var i = 0; i < testInputs.length; ++i){
		baseFormHtml += testInputs[i].replace('name=""', 'name="test'+i+'"');
	}

	baseFormHtml += '</form>';


	describe('can be created', function(){
		it('with the default setup', function(){
			var form = $('<form></form>');
			var fbw;

			form.formBuilder();
			fbw = form.data('formBuilderFormBuilder');

			expect(form.is(':formBuilder-formBuilder')).toBe(true);
			expect(fbw).toBeDefined();
		});

		it('with passed options', function(){
			var form = $('<form></form>');
			var fbw;
			var options = {
				converter: {
					fromForm: function(data) {
						return data + 'asdas';
					},
					toForm: function(data) {
						return data + 'dasd';
					}
				},
				ignoreHidden: true
			};

			form.formBuilder(options);
			fbw = form.data('formBuilderFormBuilder');

			expect(form.is(':formBuilder-formBuilder')).toBe(true);
			expect(fbw).toBeDefined();
			expect(util.equals(fbw.options.converter, options.converter)).toBe(true);
			expect(fbw.options.ignoreHidden).toBe(options.ignoreHidden);
		});
	});

	describe('can scan for new fields', function(){
		it('by checking regular elements', function(){
			var form = $('<form></form>');
			var fbw;

			form.append('<input type="text"/>');
			form.append('<div class="form-builder-ignore"><input type="text"/></div>'); //ignored
			form.append('<select></select>');
			form.append('<textarea></textarea>');
			form.append('<input type="submit"></input>'); //ignored

			form.formBuilder();
			fbw = form.data('formBuilderFormBuilder');

			expect(fbw.fields.length).toBe(3);
			expect(fbw.fields.filter('.form-builder-ignore *').length).toBe(0);
			expect(fbw.fields.filter('input[type="submit"]').length).toBe(0);
			expect(fbw.fields.filter(':formBuilder-inputField').length).toBe(3);
		});

		it('by checking any elements with attribute "data-load-widget-as-field"');
	
	});

	it('can get its fields', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();
		
		expect(fields.length).toBeGreaterThan(0);
		expect(fields.filter(':formBuilder-inputField').length).toBe(fields.length);

		for(var i = 0; i < fields.length; ++i) {
			expect(fields[i]).toBe(fbw.fields[i]);
		}
	});

	it('can make a proxy command to a widget');

	describe('can handle clean or dirty states', function() {
		it('and can check if a value is dirty');
		
		it('and is able to clear its dirty status');

		// it('and is able to flash its dirty element');

	});

	it('can flash all fields with errors');

	it('can disable all of its fields', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disable')).toBe(false);
		});

		fbw.disable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disable')).toBe(true);
		});
	});
		
	it('can enable all its fields', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		fbw.disable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disable')).toBe(true);
		});

		fbw.enable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disable')).toBe(false);
		});
	});

	describe('can modify the DOM', function(){

		it('by writing to it');

		it('be reading from it');
	});

	it('can get its data', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		//check them
		expect(util.equals(fbw.get(),{
			test0: '',
			test1: '',
			test2: '',
			test3: ''
		})).toBe(true);

		//change them
		fields.each(function(){
			$(this).inputField('set','some value ' + $(this).attr('name'));
		});

		//check them
		expect(util.equals(fbw.get(),{
			test0: 'some value test0',
			test1: 'some value test1',
			test2: 'some value test2',
			test3: 'some value test3'
		})).toBe(true);

	});

	it('can clear its data', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		//change them
		fields.each(function(){
			$(this).inputField('set','some value ' + $(this).attr('name'));
		});

		//check them
		expect(util.equals(fbw.get(),{
			test0: 'some value test0',
			test1: 'some value test1',
			test2: 'some value test2',
			test3: 'some value test3'
		})).toBe(true);

		// clear them
		fbw.clear();

		// check them
		expect(util.equals(fbw.get(),{
			test0: '',
			test1: '',
			test2: '',
			test3: ''
		})).toBe(true);
	});
	
	describe('can handle conflicts', function(){
		it('first checks if given data would overwrite dirty fields');
		
		it('and return an array of conflicts');

		it('or returning false if there are no conflicts');
	});

	

	describe('can convert form data', function(){

		it('first will clone data object in order to not change original');

		it('will call the object\'s converter function');
	});

	it('can run validate on each field', function(){
		// Must be visible
		var form = $(baseFormHtml).appendTo(testContainer).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		// Make one required
		$(fields[0]).inputField('status','require', true);

		expect(form.find('.error-overlay').length).toBe(0); // no errors yet

		fbw.validate();

		expect(form.find('.error-overlay').length).toBe(1); // error from the required one

		$(fields[0]).inputField('set','some value');
		fbw.validate();

		expect(form.find('.error-overlay').filter(':visible').length).toBe(0); // no more visible errors

		testContainer.empty();
	});

	it('can have a default require status for its fields', function(){
		var form = $(baseFormHtml.replace('<form>','<form data-default-required="true">')).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		fbw.disable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','require')).toBe(true);
		});
	});

	it('can destroy itself');


});