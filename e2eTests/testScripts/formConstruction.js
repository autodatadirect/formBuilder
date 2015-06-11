/**
 * Testing the testing setup with formbuilder
 */

module.exports = function(app) {
	describe("Form Construction", function(done) {
		beforeEach(function(done){
			// Setup client
			app.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index, done);
		});
		afterEach(function(done){
			// close client
			app.client.end();
			done();
		});

		it("Construction of a single inputField and group from one input tag", function(done){
			app.client
				.execute(function(){
					window.tf = $('#testForm');

					tf.append('<input type="text" data-type="text">');					
					tf.formBuilder();
					
					// There should be one field group for the single input tag.					
					return tf.children('.input-field-group').length;
					// return 1;
				}, function(err,ret){
					expect(ret.value).toEqual(1);
				})

				.execute(function(){
					// There should be one input-field in the group.
					return window.tf.children('.input-field-group').children('.input-field').length;
				}, function(err,ret){				
					expect(ret.value).toEqual(1);
					done();
				});

		});

		it("Construction of a multiple inputFields and groups from multiple input tags", function(done){
			app.client
				.execute(function(){
					tf = $('#testForm');

					tf.append('<input type="text" data-type="text">');
					tf.append('<input type="text" data-type="text">');
					tf.append('<input type="text" data-type="text">');
					
					tf.formBuilder();

					return [
						{val: tf.children('.input-field-group').length, equal: 3, because: "There should now be 3 field groups."},
						{val: tf.children('.input-field-group').children('.input-field').index(), equal: 0, because: "Each input-field should be the first thing in each group"},
						{val: tf.children('.input-field-group').children('.input-field').siblings().length, equal: 0, because: "Each input-field should be the only thing in each group"}
					];

				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});

		it("Grouping together inputFields with input field groups", function(done){
			app.client
				.execute(function(){
					var tf = $('#testForm');
					var ifg = $('<div class="input-field-group">').appendTo(tf);

					ifg.append('<input type="text" data-type="text">');
					ifg.append('<input type="text" data-type="text">');
					ifg.append('<input type="text" data-type="text">');
					
					tf.formBuilder();

					return [
						{val: tf.find('.input-field-group').length, equal: 1, because: "There should now be one field group"},
						{val: ifg.children('.input-field').length, equal: 3, because: "There should be 3 inputFields in the single input field group"}
					];

				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});


		it("Checking default inputField dom structure", function(done){
			app.client
				.execute(function(){
					tf = $('#testForm');
					input = '<input type="text" data-type="text">';
					tf.append(input);
					
					tf.formBuilder();
					
					fis = tf.find('.field-items');
					fi = tf.find('.field-item');

					return [
						{val: fis.length, equal: 1, because: "There should be one field-items container"},
						{val: fis.parent('.input-field').length, equal: 1, because: "The items should be inside the input-field container"},
						{val: fis.siblings().length, equal: 0, because: "There should not be any other base containers by default"},
						{val: fis.children().eq(0).is('.first'), equal: true, because: "The first field item should be marked"},
						
						{val: fi.length, equal: 1, because: "There should be only one field-item by default"},
						{val: fi.parent(fis).length, equal: 1, because: "The item should be in it's container"},
						{val: fi.siblings().length, equal: 0, because: "There should not be anything else in the field-items container"},
						{val: fi.is('.field-item-input'), equal: true, because: "The default item should be an input field"},
						{val: fi.html(), equal: input, because: "The original input tag should be in the field-item-input."}
					];
				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				});
		});
		
		it("Checking input-field state flags", function(done){
			app.client
				.execute(function(){
					var ret = [];
					var tf = $('#testForm');
					tf.append('<input type="text" data-type="text">');
					
					tf.formBuilder();
					field = tf.find('.input-field');
					
					field.trigger('mouseover');
					ret.push({val: field.is('.hover'), equal: true, because: "Checking hover state"});

					field.find('input').focus();
					ret.push({val: field.is('.focus'), equal: true, because: "Checking focus state"});

					return ret;
				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				});
		});
		
	});
};