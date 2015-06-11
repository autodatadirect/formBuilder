/*
 * Testing the Data Default setting
*/

module.exports = function(app) {
	describe("Data Require Tests", function() {
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

		it("Data Require Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-require="true">');
					tf.formBuilder();
					
					return [ 
						{val: tf.find('.input-field .field-items .field-item-input').length, equal: 1, because: 'Input has been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item-input.first').children().attr('data-require'), equal: 'true', because: 'Data-require status has been set to true'}
					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Data Require Creation"

		it("Submit Button Test, No Entry",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-require="true">');
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

		it("Submit Button Test, With Entry",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-require="true">');
					tf.append('<button type="submit">Save</button>');
					tf.formBuilder();
					tf.find('button[type="submit"]').submitButton({

						submit: function(ev, finish) {
							tf.formBuilder('validate');
							finish();
						}
					}); 
					field = tf.find('.input-field');
				}, function(err,ret){app.printError(err);})

				// Type input 
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test")
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
		
		}); // End of it "Submit Button Test, With Entry"
	}); // End of decribe
 };// End of module 
