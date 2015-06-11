/**
 * Testing the placeholder
 */

module.exports = function(app) {
	describe("Placeholder Tests", function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					tf = $('form#testForm');
				}, done);
		}); // End of beforeEach
		afterEach(function(){
			// close client
			this.client.end();
		}); // End of afterEach

		it("Data-Placeholder Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-placeholder="placeholder">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [
						{val: tf.find('.input-field .field-items .field-item-input.first').length, equal: 1, because: 'Placeholder has been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').length, equal: 1, because: 'Input field has a \'placeholder\' class'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').eq(0).is('.placeholder'), equal: true, because: 'Placeholder is in fact a placeholder'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').text(), equal: "placeholder", because: 'Placeholder has correct text'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').eq(0).length, equal: 1, because: 'Placeholder is at the front of the form field'},
						{val: tf.find('.field-item.field-item-input').index(), equal: 0, because: 'Input form field is in the correct location (the same location as the placeholder'}
					];
				}, function(err, ret){
					app.batchExpect(ret.value); 
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Data-Placeholder Creation"

		it("Typing Test With Placeholder",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-placeholder="placeholder">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');

					ifw = tf.find('input');

					ifw.inputField('set', "test");	

					ifw.keydown();

					return [
						{val: ifw.inputField('get'), equal: "test", because: "The text has been correctly entered"},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').css("display"), equal: "none", because: "When text is entered the placeholder disappear"}
					];

				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Typing Test with Placeholder"

		it("Typing Test 2 with Placeholder", function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-placeholder="placeholder">');
					tf.formBuilder();
				}, function(err,ret){

				})
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test2")
				.execute(function(){
					ifw = $('input');
					return [
						{val: ifw.inputField('get'), equal: "test2", because: "The text has been correctly entered"},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').css("display"), equal: "none", because: "When text is entered the placeholder disappear"}
					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});

			}); // End of it Typing Test 2 

		it("Data-Empty Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-empty="empty">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');

					return [
						{val: tf.find('.input-field .field-items .field-item-input.first').length, equal: 1, because: 'Empty has been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').length, equal: 1, because: 'Input field has a \'placeholder\' (empty) class'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').eq(0).is('.placeholder'), equal: true, because: 'Placeholder (empty) is in fact a placeholder'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').text(), equal: "empty", because: 'Placeholder (empty) has correct text'},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').eq(0).length, equal: 1, because: 'Placeholder (empty) is at the front of the form field'},
						{val: tf.find('.field-item.field-item-input').index(), equal: 0, because: 'Input form field is in the correct location (the same location as the placeholder'}
					];

				}, function(err, ret){
					app.batchExpect(ret.value); 
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Data-Placeholder Creation"

		it("Typing Test With Empty",function(done){
			this.client
				.execute(function(){

					tf.append('<input type="text" data-type="text" data-empty="empty">');
					tf.formBuilder();				

					ifw = tf.find('input');

					ifw.inputField('set', "test3");	

					ifw.keydown();

					return [
						{val: ifw.inputField('get'), equal: "test3", because: "The text has been correctly entered"},
						{val: tf.find('.input-field .field-items .field-item-input.first .placeholder').css("display"), equal: "none", because: "When text is entered the empty-placeholder disappear"}
					];

				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Typing Test with Placeholder"
	}); // End of decribe
}; // End of module 
