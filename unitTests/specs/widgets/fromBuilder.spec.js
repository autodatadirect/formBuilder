/**
 * Testing formBuilder
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('A formBuilder widget',function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

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
			expect(fbw.fieldsWidgets.length).toBe(0);
			expect(fbw.fields.filter('.form-builder-ignore *').length).toBe(0);
			expect(fbw.fields.filter('input[type="submit"]').length).toBe(0);
			expect(fbw.fields.filter(':formBuilder-inputField').length).toBe(3);
		});

		it('by checking any elements with attribute "data-load-widget-as-field"', function(){
			var form = $('<form></form>');
			var fbw;
			
			form.append('<div name="arrayFieldExampleSimple" data-load-widget-as-field="arrayField"><input type="text"/></div>');

			form.formBuilder();
			fbw = form.data('formBuilderFormBuilder');

			expect(fbw.fields.length).toBe(0);
			expect(fbw.fieldsWidgets.length).toBe(1);
			expect(fbw.fieldsWidgets.filter(':formBuilder-arrayField').length).toBe(1);
		});

		it('will not load "data-load-widget-as-field" if there is no name value', function(){
			var form = $('<form></form>');
			var error = new Error('data-load-widget-as-field must have name attribute');
			
			form.append('<div data-load-widget-as-field="arrayField"><input type="text"/></div>');

			try {
				form.formBuilder();
			}
			catch(err){
				expect(err).toEqual(error);
			}
		});
	
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

	it('can make a proxy command to a widget', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var input = $('<input type="text">').inputField();

		var spy = spyOn(fbw, '_proxyCommandToWidget').and.callThrough();

		fbw._proxyCommandToWidget(input, 'isDirty'); 

		expect(spy).toHaveBeenCalled();
	});

	it('will throw an error if an incorrect call to the proxy command is made', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var error = new Error('ERROR: widget field error NAME[inputField] METHOD[isDirty]');

		var spy = spyOn(fbw, '_proxyCommandToWidget').and.callThrough();

		try{
			fbw._proxyCommandToWidget($(this), 'isDirty'); 
		}
		catch(err){
			expect(err).toEqual(error);
		}
	});

	describe('can handle clean or dirty states', function() {
		it('and can check if a value is dirty', function(){
			var form = $('<form></form>');
			var input = $('<input type="text"/>').appendTo(form);
			var input2 = $('<input type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			expect(fbw.isDirty()).toBe(false);

			input.val('test');
			input.trigger('change');
			expect(fbw.isDirty()).toBe(true);

			fbw.clearDirty();
			expect(fbw.isDirty()).toBe(false);

			input2.val('sdfiu');
			input.trigger('change');
			expect(fbw.isDirty()).toBe(true);

		});
		
		it('and is able to clear its dirty status', function(){
			var form = $('<form></form>');
			var input = $('<input type="text"/>').appendTo(form);
			var input2 = $('<input type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			expect(fbw.isDirty()).toBe(false);

			input.val('test');
			input.trigger('change');
			expect(fbw.isDirty()).toBe(true);

			fbw.clearDirty();
			expect(fbw.isDirty()).toBe(false);

		});

	});

	it('can flash all fields with errors', function(){
		var form = $('<input type="text" />');
		var input = $('<input type="text" data-type="date"/>').appendTo(form);

		form.formBuilder().appendTo(testContainer);

		var	fbw = form.data('formBuilderFormBuilder');
		var element = $(document).find('.input-field.undefined');

		fbw.flashError(10);

		expect(element.is('.flash')).toBe(true);

		testContainer.empty();
	});

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
		it('by writing to it', function(){
			var form = $('<form></form>');
			var input = $('<input type="text"/>').appendTo(form);

			form.formBuilder().appendTo(testContainer);

			var	fbw = form.data('formBuilderFormBuilder');

			fbw._writeDataToDom('test');

			expect(input.val()).toBe('test');

			testContainer.empty();
		});

		it('by reading from it', function(){
			var form = $('<form></form>');
			var input = $('<input name="first" type="text"/>').appendTo(form);

			form.formBuilder().appendTo(testContainer);

			var	fbw = form.data('formBuilderFormBuilder');

			var data = {
				first: 'test'
			};

			fbw._writeDataToDom(data);

			var result = fbw._readDataFromDom();

			expect(result).toEqual(data);

			testContainer.empty();
		});
	});

	it('can set its data, and return the value of the input field', function(){
		var form = $('<form></form>');
		var input = $('<input name="first" type="text"/>').appendTo(form);

		form.formBuilder().appendTo(testContainer);

		var	fbw = form.data('formBuilderFormBuilder');

		var data = {
			first: 'test'
		};

		fbw.set(data);

		expect(input.val()).toBe('test');

		testContainer.empty();
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
		it('first checks if given data would overwrite dirty fields', function(){
			var form = $('<form></form>');
			var input = $('<input name="first" type="text"/>').appendTo(form);
			var input2 = $('<input name="second" type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			var data = {
				first: 'set',
				second: 'not set' 
			};

			var conflicts;

			fbw.set(data);

			conflicts = fbw.conflicts(data);
			expect(conflicts).toBeUndefined(); // Undefined because the field is not dirty
		});
		
		it('and return an array of conflicts', function(){
			var form = $('<form></form>');
			var input = $('<input name="first" type="text"/>').appendTo(form);
			var input2 = $('<input name="second" type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			var data = {
				first: 'set1',
				second: 'second' 
			};

			var data2 = {
				first: 'set3',
				second: 'second3' 
			};

			var result = [{
				key: 'first', 
				vOld: 'set2', 
				vNew: 'set3' 
			}];

			var conflicts;

			fbw.set(data);

			input.val('set2');
			input.trigger('change');

			conflicts = fbw.conflicts(data2);
			expect(conflicts).toBeDefined(); 
			expect(conflicts.length).toBe(1);
			expect(conflicts).toEqual(result);
		});
	});

	

	describe('can convert form data', function(){
		it('first will clone data object in order to not change original', function(){
			var form = $('<form></form>');
			var input = $('<input type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			var data = {
				first: 'one',
				second: 'two' 
			};

			var returned = fbw._convertFormData(data);

			expect(returned).toEqual(data);
		});

		it('will call the object\'s converter function', function(){
			var form = $('<form></form>');
			var input = $('<input type="text"/>').appendTo(form);

			form.formBuilder();

			var	fbw = form.data('formBuilderFormBuilder');

			var spy = spyOn(fbw.options.converter, 'toForm').and.callThrough();

			fbw._convertFormData('data');

			expect(spy).toHaveBeenCalled();
		});
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

	it('can destroy itself', function(){
		var form = $('<form></form>');
		var input = $('<input type="text"/>').appendTo(form);

		form.append('<div name="arrayFieldExampleSimple" data-load-widget-as-field="arrayField"><input type="text"/></div>');

		form.formBuilder();

		var	fbw = form.data('formBuilderFormBuilder');

		var spy_proxy = spyOn(fbw, '_proxyCommandToWidget').and.callThrough();

		fbw._destroy(); 

		expect(spy_proxy).toHaveBeenCalled();
	});


});