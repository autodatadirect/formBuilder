/**
 * Testing selects
 */

module.exports = function(app) {
	describe('Select Dropdown', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.select)
				.execute(function(){
					type = 'select';
					tf = $('form#testForm');
					tf.formBuilder();
					
					field = tf.find('.input-field-group').children('.input-field'); //outer field
					ifw = field.find('input');

					dd = tf.find('.dropdown-panel');						//dropdown
					dds = dd.children().eq(0);								//select container
					ddOptions = dds.children('.options');					//options container
					ddSearch = dds.children('.search');						//search input container
					ddField = ddSearch.find('.input-field');				//search input field
					ddw = ddField.find('input');							//search input field widget instance

					totalOptions = 12;
					

				}, done);
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Field construction - base", function(done){
			this.client
				.execute(function(){
					return [
						// Basic input
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						
						// Button creation
						{val: field.find('.field-items').children().eq(0).children().length, equal: 4, because: 'Checking number of field-items for regular input'},
						
						{val: field.find('.field-items').children().eq(0).children().eq(0).is('input'), equal: true, because: 'The first regular field item should be the input field'},
						{val: field.find('.field-items').children().eq(0).children().eq(1).is('span.tms-icon.tms-icon-sort-up'), equal: true, because: 'The second regular field item should be the up icon'},
						{val: field.find('.field-items').children().eq(0).children().eq(2).is('span.tms-icon.tms-icon-sort-down'), equal: true, because: 'The third regular field item should be the down icon'},
						{val: field.find('.field-items').children().eq(0).children().eq(3).is('.shim'), equal: true, because: 'The last regular field item should be the shim'},
						
						{val: field.find('.field-items').children().eq(0).children().eq(0).css('opacity'), equal: '0', because: 'The first regular field item should not be visible, bit still there'},
						{val: field.find('.field-items').children().eq(0).children().eq(1).is(':visible'), equal: false, because: 'The sort up icon should not be visible'},
						{val: field.find('.field-items').children().eq(0).children().eq(2).is(':visible'), equal: true, because: 'The sort down icon should be visible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});
	
		it("Field construction - dropdown", function(done){
			this.client
				.execute(function(){
					return [
						// Dropdown structure
						{val: field.find('.field-items .dropdown-panel').length, equal: 1, because: "Checking for hidden dropdown panel"},
						{val: dd.is(':visible'), equal: false, because: 'The dropdown should be hidden at the start'},
						{val: dds.children().length, equal: 2, because: 'The dropdown should only have 2 children'},
						{val: dds.children().eq(0).is('.search'), equal: true, because: 'The dropdown should first have a search div'},
						{val: dds.children().eq(1).is('.options'), equal: true, because: 'The dropdown should second have an options div'},
						
						// Dropdown search structure
						{val: ddSearch.children().eq(0).is('.input-field'), equal: true, because: 'The dropdown search should have an input field'},
						{val: ddField.children('.field-items').children().length, equal: 1, because: 'Checking number of field-items for dropdown search input'},
						{val: ddField.find('.field-item').children().eq(0).is('input'), equal: true, because: 'The first search field item should be the input field'},
						{val: ddField.find('.field-item').children().eq(1).is('span.tms-icon.tms-icon-search'), equal: true, because: 'The second search field item should be the icon'},

						// Dropdown options structure
						{val: ddOptions.find('.option').length, equal: totalOptions, because: 'Checking amount of select options, defined by the html'},		
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});


		it("Checking toField & fromField converters", function(done){
			this.client
				.execute(function(newVal){
					var initial = ifw.inputField('get');
					ifw.inputField('set', newVal);
					return [
						{val: initial, equal: 'AAA', because: "Checking starting option value"},
						{val: ifw.inputField('get'), equal: newVal, because: "Checking new set option value"}
					];
				}, 'Hodor', function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Dropdown toggling with mouseclick", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return [
						{val: field.find('.field-items').children().eq(0).children().eq(1).is(':visible'), equal: true, because: 'The sort up icon should now be visible'},
						{val: field.find('.field-items').children().eq(0).children().eq(2).is(':visible'), equal: false, because: 'The sort down icon should now not be visible'},
						{val: dd.is(':visible'), equal: true, because: 'The dropdown should now be visible'},
						// {val: ddField.find('input').is(':focus'), equal: true, because: 'The dropdown search input should be focused'},
						// {val: ddField.is('.focus'), equal: true, because: 'The dropdown field should be marked as focused'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
				})
				.moveToObject('div#outside')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click()
				.pause(1000)
				.execute(function(){
					return [
						{val: field.find('.field-items').children().eq(0).children().eq(1).is(':visible'), equal: false, because: 'The sort up icon should now not be visible'},
						{val: field.find('.field-items').children().eq(0).children().eq(2).is(':visible'), equal: true, because: 'The sort down icon should now be visible'},
						{val: dd.is(':visible'), equal: false, because: 'The dropdown should now not be visible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Type a search in dropdown - partial", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('.dropdown-panel input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('s')
				.pause(1000) //wait for dropdown
				.execute(function(){
					var matches = 5;
					return [
						{val: ddOptions.find('.option').not('.filtered').length, equal: matches, because: 'Checking number of visible options'},
						{val: ddOptions.find('.option').not('.filtered').filter(':visible').length, equal: matches, because: 'Checking that the options are actually visible'},
						{val: ddOptions.find('.option').filter('.filtered').length, equal: (totalOptions - matches), because: 'Checking number of filtered out options'},
						{val: ddOptions.find('.option').filter('.filtered').not(':visible').length, equal: (totalOptions - matches), because: 'Checking if filtered out options are invisible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Type a search in dropdown - more partial", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject('.dropdown-panel input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys('se')
				.pause(1000) //wait for dropdown
				.execute(function(){
					var matches = 1;
					return [
						{val: ddOptions.find('.option').not('.filtered').length, equal: matches, because: 'Checking number of visible options'},
						{val: ddOptions.find('.option').not('.filtered').filter(':visible').length, equal: matches, because: 'Checking that the options are actually visible'},
						{val: ddOptions.find('.option').filter('.filtered').length, equal: (totalOptions - matches), because: 'Checking number of filtered out options'},
						{val: ddOptions.find('.option').filter('.filtered').not(':visible').length, equal: (totalOptions - matches), because: 'Checking if filtered out options are invisible'},
						{val: ddOptions.find('.option').not('.filtered').filter(':visible').text(), equal: 'Searched Item', because: 'Checking correct option match'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Type a search in dropdown - incorrect", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click()
				.moveToObject('.dropdown-panel input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.pause(500)
				.keys('seq')
				.pause(1000) //wait for dropdown
				.execute(function(){
					var matches = 0;
					return [
						{val: ddOptions.find('.option').not('.filtered').length, equal: matches, because: 'Checking number of visible options'},
						{val: ddOptions.find('.option').not('.filtered').filter(':visible').length, equal: matches, because: 'Checking that the options are actually visible'},
						{val: ddOptions.find('.option').filter('.filtered').length, equal: (totalOptions - matches), because: 'Checking number of filtered out options'},
						{val: ddOptions.find('.option').filter('.filtered').not(':visible').length, equal: (totalOptions - matches), because: 'Checking if filtered out options are invisible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});


		it("Option hover - Initial", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject("div.option")
				.execute(function(){
					return [
						{val: ddOptions.find('.option').filter('.selected').length, equal: 1, because: 'Checking for a single option in hover state'},
						{val: ddOptions.find('.option').filter('.selected').text(), equal: '123 Some St.', because: 'Checking text of option in hover state'},
						{val: ddOptions.find('.option').not('.selected').length, equal: (totalOptions - 1), because: 'Checking the other options for a non-hover state'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});

		});

		it("Option hover - Different Option", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject("div.option")
				.moveTo(null,0,25) // go down an option
				.execute(function(){
					return [
						{val: ddOptions.find('.option').filter('.selected').length, equal: 1, because: 'Checking for a single option in hover state'},
						{val: ddOptions.find('.option').filter('.selected').text(), equal: 'Bran', because: 'Checking text of option in hover state'},
						{val: ddOptions.find('.option').not('.selected').length, equal: (totalOptions - 1), because: 'Checking the other options for a non-hover state'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		

		it("Option selection", function(done){
			this.client
				.moveToObject('div.shim')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.moveToObject("div.option")
				.moveTo(null,0,25) // go down an option
				// .pause(100, done)
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				// // .pause(500)
				.execute(function(){
					return [
						{val: ifw.inputField('get'), equal: 'Hodor', because: 'The selected option should be changed'},
						{val: field.find('.field-items').children().eq(0).children().eq(1).is(':visible'), equal: false, because: 'The sort up icon should now not be visible'},
						{val: field.find('.field-items').children().eq(0).children().eq(2).is(':visible'), equal: true, because: 'The sort down icon should now be visible'},
						{val: dd.is(':visible'), equal: false, because: 'The dropdown should now not be visible'},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});
		

	});
};