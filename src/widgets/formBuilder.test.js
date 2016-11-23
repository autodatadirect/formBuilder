import  '../util/jsdomSetup';
import expect, {spyOn} from 'expect';
import def from './formBuilder.def.js';
import lolex from 'lolex';
import $ from 'jquery';

describe('The formBuilder Widget', function(){
	
	let form, widget, clock;

	const testInputs = [
		'<input name="" type="test"/>',
		'<input name="" type="test"/>',
		'<input name="" type="test"/>',
		'<input name="" type="test"/>'
	];

	let baseFormHtml = '<form>';
	for(let i = 0; i < testInputs.length; ++i){
		baseFormHtml += testInputs[i].replace('name=""', 'name="test'+i+'"');
	}
	baseFormHtml = '</form>';

	const setup = (htmlString = baseFormHtml) => {
		form = $(htmlString);
		widget = Object.create(def);
		widget.element = form;
		widget._create();
	};

	beforeEach(() => {
		clock = lolex.install();
		setup();
	});

	afterEach(() => {
		clock.uninstall();
	});

	it('to have working test setup', function(){
		expect(form).toExist();
		expect(form.length).toBe(1);
		expect(widget).toExist();
		expect(true).toExist();
	});

	it('with the default setup', function(){
			console.log('ClassName: ', form[0].className);
			expect(form.hasClass('formBuilder-widget')).toBe(true);
			expect(widget).toBeDefined();
		});

	describe('can be created', function(){
				
		
		

		/*
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
		});*/
	});

	/*
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

		it('and will not load "data-load-widget-as-field" if there is no name value', function(){
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
		
		it('including checkbox and radio inputs', function() {
			var form = $('<form></form>');
			var checkbox = $('<input type="checkbox"/>').appendTo(form);
			var radio1 = $('<input type="radio" name="testRadio"/>').appendTo(form);
			var radio2 = $('<input type="radio" name="testRadio"/>').appendTo(form);
			var fbw;

			form.formBuilder();
			fbw = form.data('formBuilderFormBuilder');

			expect(checkbox.is(':formBuilder-selectionField')).toBe(true);
			expect(radio1.is(':formBuilder-selectionField')).toBe(true);
			expect(radio2.is(':formBuilder-selectionField')).toBe(true); //not included in fieldWidgets

			expect(fbw.fieldsWidgets.length).toBe(2);
			expect(fbw.fieldsWidgets.filter(':formBuilder-selectionField').length).toBe(2);
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
		var form = $('<form></form>');
		var input = $('<input type="text"/>').appendTo(form);
		var fbw, ifw;

		form.formBuilder();
		fbw = form.data('formBuilderFormBuilder');
		ifw = input.data('formBuilderInputField');

		spyOn(ifw, 'isDirty');

		fbw._proxyCommandToWidget(input, false, 'isDirty'); 

		expect(ifw.isDirty).toHaveBeenCalled();
	});

	it('will throw an error if an incorrect call to the proxy command is made', function(){
		var form = $('<form></form>').formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var error = new Error('ERROR: widget field error NAME[badName] METHOD[isDirty]');
		var caught = false;

		try {
			fbw._proxyCommandToWidget($('<div data-load-widget-as-field="badName"></div>'), false, 'isDirty'); 
		}
		catch(err){
			caught = true;
			expect(err).toEqual(error);
		}

		expect(caught).toBe(true);
	});

	it('will not throw an error if an incorrect call to the proxy command is made and is ignored', function() {
		var form = $('<form></form>').formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var caught = false;

		try {
			fbw._proxyCommandToWidget($('<div></div>'), true, 'isDirty'); 
		}
		catch(err) {
			caught = true;
		}

		expect(caught).toBe(false);
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
		var element = $(document).find('.input-field');

		fbw.flashError(10);

		expect(element.is('.flash')).toBe(true);

		testContainer.empty();
	});

	it('can disable all of its fields', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disabled')).toBe(false);
		});

		fbw.disable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disabled')).toBe(true);
		});
	});
		
	it('can enable all its fields', function(){
		var form = $(baseFormHtml).formBuilder();
		var	fbw = form.data('formBuilderFormBuilder');
		var fields = fbw.getFields();

		fbw.disable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disabled')).toBe(true);
		});

		fbw.enable();

		fields.each(function(){
			expect($(this).inputField('hasStatus','disabled')).toBe(false);
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
		var form = $(baseFormHtml.replace('<form>','<form data-default-required>')).formBuilder();
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
		var arrayField = $('<div name="arrayFieldExampleSimple" data-load-widget-as-field="arrayField"><input type="text"/></div>').appendTo(form);
		var checkbox = $('<input type="checkbox"/>').appendTo(form);
		var radio1 = $('<input type="radio" name="testRadio"/>').appendTo(form);
		var radio2 = $('<input type="radio" name="testRadio"/>').appendTo(form);

		form.formBuilder();

		expect(form.is(':formBuilder-formBuilder')).toBe(true);
		expect(input.is(':formBuilder-inputField')).toBe(true);
		expect(arrayField.is(':formBuilder-arrayField')).toBe(true);
		expect(checkbox.is(':formBuilder-selectionField')).toBe(true);
		expect(radio1.is(':formBuilder-selectionField')).toBe(true);
		expect(radio2.is(':formBuilder-selectionField')).toBe(true);
		
		form.formBuilder('destroy');

		expect(form.is(':formBuilder-formBuilder')).toBe(false);
		expect(input.is(':formBuilder-inputField')).toBe(false);
		expect(arrayField.is(':formBuilder-arrayField')).toBe(false);
		expect(checkbox.is(':formBuilder-selectionField')).toBe(false);
		expect(radio1.is(':formBuilder-selectionField')).toBe(false);
		expect(radio2.is(':formBuilder-selectionField')).toBe(false);
	});
	
	it('should validate hidden fields by default', function() {
		var form = $('<form></form>');
		var input = $('<input type="text" style="display:none;" data-required/>').appendTo(form);
		form.formBuilder();
		expect(form.is(':formBuilder-formBuilder')).toBe(true);
		expect(input.is(':formBuilder-inputField')).toBe(true);
		expect(input.is(':visible')).toBe(false);
		expect(form.formBuilder('validate')).toBe(false);

	});

	it('can be configured to ignore hidden fields on validate', function() {
		var form = $('<form></form>');
		var input = $('<input type="text" style="display:none;" data-required/>').appendTo(form);
		form.formBuilder({
			ignoreHidden: true
		});
		expect(form.is(':formBuilder-formBuilder')).toBe(true);
		expect(input.is(':formBuilder-inputField')).toBe(true);
		expect(input.is(':visible')).toBe(false);
		expect(form.formBuilder('validate')).toBe(true);

	});

	it('can set partial data and then set different partial data and return only second set data', function(){
		var form = $('<form></form>');
		var input1 = $('<input name="first" type="text"/>').appendTo(form);
		var input2 = $('<input name="second" type="text"/>').appendTo(form);

		form.formBuilder().appendTo(testContainer);

		var	fbw = form.data('formBuilderFormBuilder');

		var data = {
			first: 'test'
		};

		var data2 = {
			second: 'test2'
		};

		fbw.set(data);

		expect(input1.val()).toBe('test');
		expect(input2.val()).toBe('');

		fbw.set(data2);

		expect(input1.val()).toBe('');
		expect(input2.val()).toBe('test2');

		testContainer.empty();
	});
 */
	
});
