/**
 * Testing for the formBuilder.textSubmitter widget
 */
'use strict';
describe('A formBuilder.textSubmitter widget', function(){
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;
	var testContainer = window.formBuilderTesting.testContainer;

	describe('can be created', function(){
		var checkStructure = function(tsw) {
			var e = tsw.element;

			e = e.children(); //move to container
			expect(e.length).toBe(1);

			e = e.children(); //move down
			expect(e.length).toBe(2);
			expect(e.eq(0).is('.input-field-group')).toBe(true);
			expect(e.find('textarea[name="text-entry"]').is(':formBuilder-inputField')).toBe(true);

			expect(e.eq(1).is('.send-instruction.noselect')).toBe(true);
			expect(e.eq(1).text()).toBe(tsw.options.sendInstruction);
			expect(e.eq(1).css('visibility')).toBe('hidden');
		};


		it('with the default settings', function(){
			var textSubmitter = $('<div/>').textSubmitter();
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			expect(textSubmitter.is(':formBuilder-textSubmitter')).toBe(true);
			expect(tsw).toBeDefined();

			checkStructure(tsw);
		});

		it('with specified options', function(){
			var options = {
				width: '900px',
				placeholder: 'some placeholder',
				sendInstruction: 'some instruction',
				rows: 10
			};

			var textSubmitter = $('<div/>').textSubmitter(options);
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			expect(textSubmitter.is(':formBuilder-textSubmitter')).toBe(true);
			expect(tsw).toBeDefined();

			checkStructure(tsw);

			options.width = parseInt(options.width, 10);
			expect(tsw.textEntry.width()).toBe(options.width);
			expect(tsw.element.width()).toBe(options.width);
			expect(tsw.textEntry.data('formBuilderInputField').options.placeholder).toBe(options.placeholder);
			expect(tsw.textEntry.attr('rows')).toBe(options.rows.toString());
		});
	});

	describe('has a textarea inputField', function(){
		var textSubmitter = $('<div/>').textSubmitter();
		var tsw = textSubmitter.data('formBuilderTextSubmitter');

		it('whose value can be set', function(){
			spyOn(tsw.textEntry, 'inputField');
			tsw.set('some val');

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('set', 'some val');

		});

		it('whose value can be retrieved', function(){
			spyOn(tsw.textEntry, 'inputField');
			tsw.get();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('get');
		});

		it('whose value can be cleared', function(){
			spyOn(tsw.textEntry, 'inputField');
			tsw.clear();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('clear');
		});

		it('that can be disabled', function(){
			spyOn(tsw.textEntry, 'inputField');
			tsw.disable();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('disable');
		});

		it('that can be enabled', function(){
			spyOn(tsw.textEntry, 'inputField');
			tsw.enable();

			expect(tsw.textEntry.inputField).toHaveBeenCalled();
			expect(tsw.textEntry.inputField).toHaveBeenCalledWith('enable');
		});
	});

	describe('has a send instruction message', function(){
		it('which can be set with an option', function(){
			var instr = 'some instruction';
			var textSubmitter = $('<div/>').textSubmitter({
				sendInstruction: instr
			});
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			expect(tsw.sendInstruction.text().trim()).toBe(instr);
		});

		it('which can be set with a function', function(){
			var textSubmitter = $('<div/>').textSubmitter();
			var tsw = textSubmitter.data('formBuilderTextSubmitter');
			var instr = 'some instruction';

			expect(tsw.sendInstruction.text().trim()).not.toBe(instr);

			tsw.setInstruction(instr);
			expect(tsw.sendInstruction.text().trim()).toBe(instr);
		});

		it('which is visible only when focused', function(done){
			var textSubmitter = $('<div/>').textSubmitter().appendTo(testContainer);
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			expect(tsw.sendInstruction.css('visibility')).toBe('hidden');

			tsw.textEntry.focus();
			pause(triggerWaitTime)
			.then(function(){
				expect(tsw.sendInstruction.css('visibility')).toBe('visible');
				
				tsw.textEntry.blur();
			})
			.then(function(){
				expect(tsw.sendInstruction.css('visibility')).toBe('hidden');

				done();
			});
		});
		
	});

	describe('can be submitted', function(){		
		it('by pressing enter in the textEntry', function(done){
			var textSubmitter = $('<div/>').textSubmitter();
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			spyOn(tsw,'_submit');

			tsw.textEntry.trigger($.Event('keydown',{
				which: 13 //enter
			}));
			pause(triggerWaitTime)
			.then(function(){
				expect(tsw._submit).toHaveBeenCalled();

				done();
			});
		});

		it('and is disabled + triggers an event on submit', function(){
			var textSubmitter = $('<div/>').textSubmitter();
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			spyOn(tsw, 'disable');
			spyOn(tsw, '_trigger');

			tsw._submit();

			expect(tsw.disable).toHaveBeenCalled();
			expect(tsw._trigger).toHaveBeenCalled();
			expect(tsw._trigger.calls.mostRecent().args[0]).toBe('submit');
			expect(tsw._trigger.calls.mostRecent().args[1]).toBe(null);
			expect(tsw._trigger.calls.mostRecent().args[2].text).toBe(tsw.get());
			expect($.isFunction(tsw._trigger.calls.mostRecent().args[2].onComplete)).toBe(true);
		});

		it('and is cleared and enabled on submit callback', function(done){
			var f = {
				submit: function(ev, data){
					f.onComplete = data.onComplete;
				}
			};

			var textSubmitter = $('<div/>').textSubmitter({
				submit: function(ev, data){
					f.submit(ev,data);
				}
			});
			var tsw = textSubmitter.data('formBuilderTextSubmitter');


			spyOn(tsw, 'clear');
			spyOn(tsw, 'enable');
			spyOn(f, 'submit').and.callThrough();

			tsw._submit();
			pause(triggerWaitTime)
			.then(function(){
				expect(f.submit).toHaveBeenCalled();

				f.onComplete(false);
				expect(tsw.clear).not.toHaveBeenCalled();
				expect(tsw.enable).toHaveBeenCalled();
				tsw.enable.calls.reset();

				f.onComplete(true);
				expect(tsw.clear).toHaveBeenCalled();
				expect(tsw.enable).toHaveBeenCalled();
				done();
			});
		});

		it('and by default accepts empty input submissions', function(){
			var textSubmitter = $('<div/>').textSubmitter();
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			spyOn(tsw, '_trigger');

			expect(tsw.textEntry.is(':empty')).toBe(true);
			tsw._submit();
			expect(tsw._trigger).toHaveBeenCalled();
			expect(tsw._trigger.calls.mostRecent().args[0]).toBe('submit');
		});

		it('and can ignore empty input submissions', function(){
			var textSubmitter = $('<div/>').textSubmitter({
				ignoreEmptySubmit: true
			});
			var tsw = textSubmitter.data('formBuilderTextSubmitter');

			spyOn(tsw, '_trigger');

			expect(tsw.textEntry.is(':empty')).toBe(true);
			tsw._submit();
			expect(tsw._trigger).not.toHaveBeenCalled();
		});
	});


	it('can be destroyed', function(){
		var textSubmitter = $('<div/>').textSubmitter()
			.appendTo(testContainer); //make sure it is in the dom to test removal
		var tsw = textSubmitter.data('formBuilderTextSubmitter');
		var textEntry = tsw.textEntry;

		expect(tsw).toBeDefined();
		expect(textEntry.is(':formBuilder-inputField')).toBe(true);
		expect(textEntry.closest(document.documentElement).length).toBe(1); //in dom

		tsw.destroy();
		tsw = textSubmitter.data('formBuilder-arrayField');

		expect(tsw).toBeUndefined();
		expect(textEntry.is(':formBuilder-inputField')).toBe(false);
		expect(textEntry.closest(document.documentElement).length).toBe(0); //not in dom

		expect(textSubmitter.is(':empty')).toBe(true);

		testContainer.empty();
	});
});