/*
 * Testing the Data Default setting
*/

module.exports = function(app) {
	describe("Data Default Require Tests", function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					tf = $('form#testForm');
					tf.attr('data-default-required', true);

				}, done);
		}); // End of beforeEach
		afterEach(function(){
			// close client
			this.client.end();
		}); // End of afterEach

		it("Data Default Require Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" name="one" data-type="text" data-require="true">');
					tf.append('<input type="text" name="two" data-type="text">');
					tf.append('<input type="text" name="three" data-type="text" data-require="true">');
					tf.append('<input type="text" name="four" data-type="text">');
					tf.formBuilder();

					return [ 
						{val: tf.find('.input-field .field-items .field-item-input').length, equal: 4, because: 'Inputa have been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item-input').children().attr('data-default-required'), equal: true, because: 'Inputa have been created in the correct container'}
					]; 
							}, function(err, ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		
		}); // End of it "Data Default Require Tests"

			it("Submit Button Test, No Entry",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" name="one" data-type="text" data-require="true">');
					tf.append('<input type="text" name="two" data-type="text">');
					tf.append('<input type="text" name="three" data-type="text" data-require="true">');
					tf.append('<input type="text" name="four" data-type="text">');
					tf.append('<button type="submit">Save</button>');
					tf.formBuilder();
					tf.find('button[type="submit"]').submitButton({
						submit: function(ev, finish) {
							tf.formBuilder('validate');
							finish();
						}
					}); 
					
				}, null)
				.moveToObject('button[type="submit"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){// check valid
					checkValid = function(){
						if($('.error-overlay').length > 0)
							return !$('.error-overlay').is(':visible');
						else
							return true;
					};

					return checkValid();
				}, function(err, ret){
					expect(ret.value).toEqual(false);
					done();
				});
		
		}); // End of it "Submit Button Test, No Entry"

			it("Submit Button Test, With Correct Entry",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" name="one" data-type="text" data-require="true">');
					tf.append('<input type="text" name="two" data-type="text">');
					tf.append('<input type="text" name="three" data-type="text" data-require="true">');
					tf.append('<input type="text" name="four" data-type="text">');
					tf.append('<button type="submit">Save</button>');
					tf.formBuilder();
					tf.find('button[type="submit"]').submitButton({

						submit: function(ev, finish) {
							tf.formBuilder('validate');
							finish();
						}
					}); 
					field = tf.find('.input-field');
				}, null)

				// Type input 
				.moveToObject('input[name="one"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test1")
				.execute(function(){
					ifw = $('input');
				}, null)

				// Type input 
				.moveToObject('input[name="two"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test2")
				.execute(function(){
					ifw = $('input');
				}, null)

				// Type input 
				.moveToObject('input[name="three"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test3")
				.execute(function(){
					ifw = $('input');
				}, null)

				// Type input 
				.moveToObject('input[name="four"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test4")
				.execute(function(){
					ifw = $('input');
				}, null)

				// Press submit button 
				.moveToObject('button[type="submit"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){// check valid

					checkValid = function(){
						if(field.find('.error-overlay').length > 0)
							return !field.find('.error-overlay').is(':visible');
						else
							return true;
					};

					return checkValid();
				}, function(err, ret){
					expect(ret.value).toBeTruthy();
					done();
				});
		
		}); // End of it "Submit Button Test, With Correct Entry"

		it("Submit Button Test, With Incorrect Entry",function(done){
		this.client
			.execute(function(){
				tf.append('<input type="text" name="one" data-type="text" data-require="true">');
				tf.append('<input type="text" name="two" data-type="text">');
				tf.append('<input type="text" name="three" data-type="text" data-require="true">');
				tf.append('<input type="text" name="four" data-type="text">');
				tf.append('<button type="submit">Save</button>');
				tf.formBuilder();
				tf.find('button[type="submit"]').submitButton({

					submit: function(ev, finish) {
						tf.formBuilder('validate');
						finish();
					}
				}); 
				field = tf.find('.input-field');
			}, null)

			// Type input 
			.moveToObject('input[name="one"]')
			.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
			.keys("test1")
			.execute(function(){
				ifw = $('input');
			}, null)

			// Type input 
			.moveToObject('input[name="three"]')
			.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
			.keys("test2")
			.execute(function(){
				ifw = $('input');
			}, null)

			// Press submit button 
				.moveToObject('button[type="submit"]')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){// check valid

					checkValid = function(){
						if(field.find('.error-overlay').length > 0)
							return !field.find('.error-overlay').is(':visible');
						else
							return true;
					};

					return checkValid();
				}, function(err, ret){
					expect(ret.value).toBeFalsy();
					done();
				});
		
		}); // End of it "Submit Button Test, With Incorrect Entry"

	}); // End of decribe
 };// End of module 
