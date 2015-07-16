/**
 * formBuilder.arrayField widget unit tests
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('A formBuilder.arrayField widget', function(){
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var testContainer = window.formBuilderTesting.testContainer;

	// Setup test html
	var testCode = {};
	testCode.name = 'testArrayField';
	testCode.container = '<div name="'+testCode.name+'" data-load-widget-as-field="arrayField"></div>';
	testCode.inputUtext = '<input data-type="utext" type="text">';
	testCode.inputInt = '<input type="text" data-type="integer">';
	testCode.inputEmail = '<input type="text" data-type="email">';
	// testCode.widgetContainer = '<div name="'+testCode.name+'" data-load-widget-as-field="arrayField" data-sub-widgetName="TODO"></div>'
	

	describe('can be created', function(){
		var checkStructure = function(e) {
			expect(e.length).toBe(1);
			expect(e.is('.array-field'));

			e = e.children();
			expect(e.length).toBe(2);
			
			expect(e.eq(0).is('.items')).toBe(true);
			expect(e.eq(0).children().length).toBe(1);
			expect(e.eq(0).children().is('.items-content.ui-sortable')).toBe(true);

			e = e.eq(1);
			expect(e.is('.input-field')).toBe(true);

			e = e.children();
			expect(e.length).toBe(1);
			expect(e.is('.field-items'));

			e = e.children();
			expect(e.length).toBe(2);
			expect(e.eq(0).is('.first.field-item.addon.clickable.array-field-add')).toBe(true);
			expect(e.eq(0).children().length).toBe(1);
			expect(e.eq(0).children().is('a[href="#"]')).toBe(true);
			expect(e.eq(1).is('.field-item.array-field-add-message')).toBe(true);
			expect(e.eq(1).text()).toBe('');
		};


		it('using input field items', function(){
			var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
			var afw = arrayField.data('formBuilder-arrayField');
			var e;

			expect(arrayField.is(':formBuilder-arrayField'));
			expect(afw).toBeDefined();

			checkStructure(arrayField.children());
		});

		it('using sub widgets');


		it('in a formBuilder form', function(){
			var form = $('<form></form>');
			var arrayField = $(testCode.container).append(testCode.inputUtext).appendTo(form);
			var afw;

			form.formBuilder();
			afw = arrayField.data('formBuilderArrayField');


			expect(form.is(':formBuilder-formBuilder')).toBe(true);
			expect(arrayField.is(':formBuilder-arrayField')).toBe(true);
			expect(afw).toBeDefined();

			checkStructure(arrayField.children());
		});

		it('in a formBuilder form with a label', function(){
			var form = $('<form></form>');
			var arrayField = $('<div name="'+testCode.name+'" data-load-widget-as-field="arrayField" data-label="some label"></div>')
				.append(testCode.inputUtext).appendTo(form);
			var afw;

			form.formBuilder();
			afw = arrayField.data('formBuilderArrayField');


			expect(form.is(':formBuilder-formBuilder')).toBe(true);
			expect(arrayField.is(':formBuilder-arrayField')).toBe(true);
			expect(afw).toBeDefined();

			checkStructure(arrayField.children());

			expect(arrayField.siblings('label').length).toBe(1);
			expect(arrayField.siblings('label').text()).toBe('some label');
			expect(arrayField.parent().is('.input-field')).toBe(true);
			expect(arrayField.parent().parent().is('.input-field-group'));
		});

		
	});
	
	describe('has an arrayField id', function(){
		it('that it can get', function(){
			var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
			var afw = arrayField.data('formBuilder-arrayField');

			expect(afw.id).toBe(afw.getId());
		});

		it('with a unique arrayField id', function(){
			var arrayField = [
				$(testCode.container).append(testCode.inputUtext).arrayField(),
				$(testCode.container).append(testCode.inputUtext).arrayField(),
				$(testCode.container).append(testCode.inputUtext).arrayField()
			];
			
			var id = [
				arrayField[0].arrayField('getId'),
				arrayField[1].arrayField('getId'),
				arrayField[2].arrayField('getId')
			];

			expect(id[0]).not.toBe(id[1]);
			expect(id[0]).not.toBe(id[2]);
			expect(id[1]).not.toBe(id[2]);
		});
	});


	describe('has a clickable addon for', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		afw.addItem();
		afw.addItem();
		afw.addItem();

		it('adding new field items at the bottom and can be prevented', function(done){
			var addButton = arrayField.find('.array-field-add');
			var addMessage = arrayField.find('.array-field-add-message');
			var shouldPreventDefault = false;
			var beforeAdd = function(ev){
				if(shouldPreventDefault){
					ev.preventDefault();
				}
			};

			arrayField.on('arrayfieldbeforeaddnewitem', beforeAdd);

			spyOn(afw,'addItem');
			spyOn(afw,'_handleAddButtonClick').and.callThrough();

			addButton.click();
			pause(triggerWaitTime)
			.then(function(){
				expect(afw._handleAddButtonClick).toHaveBeenCalled();
				expect(afw.addItem).toHaveBeenCalled();
				afw._handleAddButtonClick.calls.reset();
				afw.addItem.calls.reset();

				addMessage.click();
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(afw._handleAddButtonClick).toHaveBeenCalled();
				expect(afw.addItem).toHaveBeenCalled();
				afw._handleAddButtonClick.calls.reset();
				afw.addItem.calls.reset();

				shouldPreventDefault = true;

				addButton.on('click', function(ev){
					ev.preventDefault();
				});
				addButton.click();
				return pause(triggerWaitTime);
			})
			.then(function(){
				expect(afw._handleAddButtonClick).toHaveBeenCalled();
				expect(afw.addItem).not.toHaveBeenCalled();

				arrayField.off('arrayfieldbeforeaddnewitem', beforeAdd);

				done();
			});

		});

		it('removing on each field', function(done){
			var inputs = afw.getFieldInstances();

			//picking an item and its button
			var item = inputs[0].closest('.array-field-item');
			var deleteButton = item.find('.array-field-delete');

			spyOn(afw, '_trigger');

			expect(inputs.length).toBe(3); //no other tests actually adds/deletes
			expect(inputs[0].is(':formBuilder-inputField')).toBe(true);
			expect(item.closest('.array-field').length).toBe(1); //exists

			deleteButton.click();
			pause(triggerWaitTime)
			.then(function(){
				expect(inputs[0].is(':formBuilder-inputField')).toBe(false);
				expect(item.closest('.array-field').length).toBe(0); //no longer exists
				expect(afw.getFieldInstances().length).toBe(2);

				done();
			});


		});
		
		it('rearranging on each field');
	});


	it('can have a message next to the add field button', function(){
		var arrayField = $('<div name="'+testCode.name+'" data-load-widget-as-field="arrayField" data-addmessage="some message"></div>')
				.append(testCode.inputUtext).arrayField();

		expect(arrayField.find('.array-field-add-message').text()).toBe('some message');
	});

	it('can get its subField', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		expect(afw.subFieldMarkup()).toBe(afw.subField);
		expect(afw.subField.trim()).toBe(testCode.inputUtext);
	});

	describe('can draw', function(){
		var checkMarkupItemStructure = function(itemView) {
			var e, e2; //temp pointers

			expect(itemView.is('.input-field-group.array-field-item')).toBe(true);

			e = itemView.children();
			expect(e.length).toBe(3);
			expect(e.eq(0).is('.input-field')).toBe(true);
			expect(e.eq(0).children().length).toBe(1);
			expect(e.eq(0).children().is('.field-items')).toBe(true);

			e2 = e.eq(0).children().children();
			expect(e2.length).toBe(1);
			expect(e2.is('.first.field-item.addon.clickable.sort-handle')).toBe(true);
			expect(e2.text()).toBe('::');

			expect(e.eq(1).is('span.sub-field')).toBe(true);

			expect(e.eq(2).is('.input-field')).toBe(true);
			
			e = e.eq(2).children();
			expect(e.length).toBe(1);
			expect(e.is('.field-items')).toBe(true);

			e = e.children();
			expect(e.length).toBe(1);
			expect(e.is('span.field-item.addon.clickable.arra-field-delete'));
			expect(e.children().is('span.fb-icon.fb-icon-remove[title="'+util.lang.remove+'"]'));
		};

		it('an internal markup item', function(){
			var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
			var afw = arrayField.data('formBuilder-arrayField');
			var itemView = $(afw._arrayFieldItemTemplate);
			var subField, input;

			spyOn(afw, '_trigger');

			expect(itemView.find('.sub-field').html().trim()).toBe('');
 
			afw._drawInternalMarkupItem('',itemView);

			expect(afw._trigger).toHaveBeenCalled();
			expect(afw._trigger.calls.mostRecent().args[0]).toBe('beforeadd');
			
			subField = itemView.find('.sub-field');
			expect(subField.html().trim()).not.toBe('');
			expect(subField.children().length).toBe(1);
			expect(subField.children().is('.input-field')).toBe(true);

			input = itemView.find('input');
			expect(input.is(':formBuilder-inputField')).toBe(true);
			expect(input.inputField('isEmpty')).toBe(true);
			expect(input.is('.array-field-input-'+afw.id)).toBe(true);

			checkMarkupItemStructure(itemView);
		});

		it('an internal markup item and set its initial value', function(){
			var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
			var afw = arrayField.data('formBuilder-arrayField');
			var itemView = $(afw._arrayFieldItemTemplate);
			var val = 'SOME VAL';
			var subField, input;

			spyOn(afw, '_trigger');

			expect(itemView.find('.sub-field').html().trim()).toBe('');
 
			afw._drawInternalMarkupItem(val,itemView);

			expect(afw._trigger).toHaveBeenCalled();
			expect(afw._trigger.calls.mostRecent().args[0]).toBe('beforeadd');
			
			subField = itemView.find('.sub-field');
			expect(subField.html().trim()).not.toBe('');
			expect(subField.children().length).toBe(1);
			expect(subField.children().is('.input-field')).toBe(true);

			input = itemView.find('input');
			expect(input.is(':formBuilder-inputField')).toBe(true);
			expect(input.inputField('isEmpty')).toBe(false);
			expect(input.inputField('get')).toBe(val);
			expect(input.is('.array-field-input-'+afw.id)).toBe(true);

			checkMarkupItemStructure(itemView);
		});

		it('a widget item');

		it('a widget item and set its value');

		it('a field item as an inputField', function(){
			var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
			var afw = arrayField.data('formBuilder-arrayField');
			var itemView;

			spyOn(afw, '_drawInternalMarkupItem');
			spyOn(afw, '_drawWidgetItem');

			itemView = afw.drawItem();

			expect(afw._drawWidgetItem).not.toHaveBeenCalled();
			expect(afw._drawInternalMarkupItem).toHaveBeenCalled();
			expect(itemView.is('.input-field-group.array-field-item')).toBe(true);
		});

		xit('a field item as a sub widget');
	});


	it('can add a field item to its array', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		expect(afw.itemsContent.is(':empty')).toBe(true);

		afw.addItem();

		expect(afw.itemsContent.is(':empty')).toBe(false);
		expect(afw.itemsContent.children().length).toBe(1);

		afw.addItem();
		afw.addItem();
		afw.addItem();

		expect(afw.itemsContent.children().length).toBe(4);

		afw.itemsContent.children().each(function(i, item){
			expect($(item).is('.input-field-group.array-field-item')).toBe(true);
			expect($(item).find('.sub-field input').is('.array-field-input-'+afw.id+':formBuilder-inputField')).toBe(true);
		});
		
	});

	it('can add a field item to its array at a specified index and value', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var items;
		expect(afw.itemsContent.is(':empty')).toBe(true);

		afw.addItem(undefined, 'O');	//to bottom
		afw.addItem(undefined, 'K');	//to bottom
		afw.addItem(1, 'R');			//to index 1
		afw.addItem(0, 'W');			//to index 0
		afw.addItem(-1, 'S');			//to bottom
		afw.addItem(-123);				//to bottom

		// result order => 'W','O','R','K','S',''

		items = afw.itemsContent.children();

		expect(items.length).toBe(6);

		expect(items.eq(0).find('.sub-field input').inputField('get')).toBe('W');
		expect(items.eq(1).find('.sub-field input').inputField('get')).toBe('O');
		expect(items.eq(2).find('.sub-field input').inputField('get')).toBe('R');
		expect(items.eq(3).find('.sub-field input').inputField('get')).toBe('K');
		expect(items.eq(4).find('.sub-field input').inputField('get')).toBe('S');
		expect(items.eq(5).find('.sub-field input').inputField('get')).toBe('');
	});

	it('can remove all of the field items in its array',function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		expect(afw.itemsContent.is(':empty')).toBe(true);

		afw.addItem();
		afw.addItem();
		afw.addItem();
		afw.addItem();

		expect(afw.itemsContent.children().length).toBe(4);

		afw._empty();

		expect(afw.itemsContent.is(':empty')).toBe(true);
	});

	it('has sortable field items', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		expect(afw.itemsContent.is(':ui-sortable')).toBe(true);
	});




	it('get the instances of all the field items in its array', function(){
		var arrayField = $(testCode.container).append(testCode.inputInt).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var fields, sum = 0;

		afw.addItem(undefined, 1);
		afw.addItem(undefined, 2);
		afw.addItem(undefined, 3);
		afw.addItem(undefined, 4);

		expect(afw.itemsContent.children().length).toBe(4);

		fields = afw.getFieldInstances();

		expect(fields.length).toBe(4);

		$.each(fields, function(i, field){ 
			expect(field.is(':formBuilder-inputField')).toBe(true);
			sum += parseInt(field.inputField('get'), 10);
		});

		expect(sum).toBe(10);
	});

	it('can get an array with the values of all the field items in its array', function(){
		var arrayField = $(testCode.container).append(testCode.inputInt).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var data, sum = 0;

		afw.addItem(undefined, 1);
		afw.addItem(undefined, 2);
		afw.addItem(undefined, 3);
		afw.addItem(undefined, 4);

		expect(afw.itemsContent.children().length).toBe(4);

		data = afw.get();

		expect(data.length).toBe(4);

		$.each(data, function(i, val){ 
			sum += parseInt(val, 10);
		});

		expect(sum).toBe(10);
	});

	it('can set the values of all the field items in its array', function(){
		var arrayField = $(testCode.container).append(testCode.inputInt).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var setData, getData, sum = 0;

		spyOn(afw, '_empty');

		setData = ['1','2','3','4'];

		expect(afw.itemsContent.is(':empty')).toBe(true);

		afw.set(setData);
		expect(afw._empty).toHaveBeenCalled();
		expect(afw.itemsContent.children().length).toBe(4);


		// Get it back to make sure it was all there
		getData = afw.get();
		expect(getData.length).toBe(4);

		$.each(getData, function(i, val){ 
			sum += parseInt(val, 10);
		});

		expect(sum).toBe(10);
	});

	it('can validate itself and all its field items', function(){
		var arrayField = $(testCode.container).append(testCode.inputEmail).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var data = [
			'good@mail.com',
			'great@site.com',
			'another@google.com'
		];
		var testInput;

		afw.set(data);

		// Should all be valid
		expect(afw.validate()).toBe(true);

		// Make one invalid
		testInput = afw.itemsContent
			.children('.array-field-item').eq(0)
			.find('input.array-field-input-' + afw.id);
		
		testInput.val('veryInvalidEmail');
		expect(afw.validate()).toBe(false);

		// Correct it
		testInput.val('better@email.com');
		expect(afw.validate()).toBe(true);

	});

	// Not sure how to actually test this
	it('can flash itself and all the field items in its array');

	it('can clear the values of itself and all the field items in its array', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		afw.set(['A', 'B']);
		expect(afw.get().length).toBe(2);
		afw.clear();
		expect(afw.get().length).toBe(0);
	});

	it('can get its current dirty state', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		afw.dirty = false;
		expect(afw.isDirty()).toBe(false);
		afw.dirty = true;
		expect(afw.isDirty()).toBe(true);
	});

	it('can check its dirty state', function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');

		// Starts out clean after a set
		afw.set(['A','B']);

		spyOn(afw.element,'trigger');

		afw._checkDirty();
		expect(afw.isDirty()).toBe(false);
		expect(afw.element.trigger).toHaveBeenCalled();
		expect(afw.element.trigger).toHaveBeenCalledWith('clean');
		afw.element.trigger.calls.reset();

		// Change a val to make it dirty
		afw.getFieldInstances()[0].val('C');
		
		afw._checkDirty();
		expect(afw.isDirty()).toBe(true);
		expect(afw.element.trigger).toHaveBeenCalled();
		expect(afw.element.trigger).toHaveBeenCalledWith('dirty');
	});

	it('updates its dirty/clean state on dirty/clean events from any of the field items in the array', function(done){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var inputs;

		// Starts out clean after a set
		afw.set(['A','B']);
		inputs = afw.getFieldInstances();

		spyOn(afw,'_checkDirty');

		// Starts out clean, does not trigger clean state because it doesnt change		
		inputs[0].trigger('clean');
		pause(triggerWaitTime)
		.then(function(){
			expect(afw._checkDirty).not.toHaveBeenCalled(); // no change

			inputs[0].trigger('dirty');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(afw._checkDirty).toHaveBeenCalled(); // has changed
			afw._checkDirty.calls.reset();

			afw.dirty = true;
			inputs[0].trigger('dirty');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(afw._checkDirty).not.toHaveBeenCalled(); // no change

			inputs[0].trigger('clean');
			return pause(triggerWaitTime);
		})
		.then(function(){
			expect(afw._checkDirty).toHaveBeenCalled(); // has changed

			done();
		});
	});

	it('can clear the dirty state of itself and all the field items in its array',function(){
		var arrayField = $(testCode.container).append(testCode.inputUtext).arrayField();
		var afw = arrayField.data('formBuilder-arrayField');
		var inputs;

		afw.set(['A','B']);
		
		inputs = afw.getFieldInstances();

		expect(inputs.length).toBe(2);
		expect(inputs[0].inputField('isDirty')).toBe(false);
		expect(afw.isDirty()).toBe(false);

		inputs[0].val('C');
		inputs[0].inputField('checkDirty');

		expect(inputs[0].inputField('isDirty')).toBe(true);
		expect(afw.isDirty()).toBe(true);

		afw.clearDirty();

		expect(inputs[0].inputField('isDirty')).toBe(false);
		expect(afw.isDirty()).toBe(false);
	});


	it('can be destroyed', function(){
		var arrayField = $(testCode.container)
			.append(testCode.inputUtext)
			.arrayField()
			.appendTo(testContainer); //make sure it is in the dom to test removal
		var afw = arrayField.data('formBuilder-arrayField');
		var inputs;

		afw.set(['A','B']);

		inputs = afw.getFieldInstances();

		expect(afw).toBeDefined();
		$.each(inputs, function(i, input){
			expect(input.is(':formBuilder-inputField')).toBe(true);
			expect(input.closest(document.documentElement).length).toBe(1); //in dom
		});

		afw.destroy();
		afw = arrayField.data('formBuilder-arrayField');

		expect(afw).toBeUndefined();
		$.each(inputs, function(i, input){
			expect(input.is(':formBuilder-inputField')).toBe(false);
			expect(input.closest(document.documentElement).length).toBe(0); //not in dom
		});

		expect(arrayField.html().trim()).toBe(testCode.inputUtext);

		testContainer.empty();
	});

});