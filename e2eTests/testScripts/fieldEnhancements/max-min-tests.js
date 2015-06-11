/**
 * Testing the min-max
 */

module.exports = function(app) {
	describe("Max-Min Tests", function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index, done);
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Max Creation",function(done){
			this.client
				.execute(function(){
					var testForm = $('#testForm');

					testForm.append('<input type="text" data-type="text" data-max= "10">');
					testForm.formBuilder();

					return [
						{val: testForm.find('.input-field .field-items .field-item.field-item-input.first').length, equal: 1, because: 'Max has been created correctly'},
						{val: testForm.find('.input-field .field-items .field-item').children().eq(0).attr('data-max'), equal: '10', because: 'The number entered into data-max is correct'}
					
					];
				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				});  // End of function(err, ret)
		}); // End of max creation

		it("Min Creation",function(done){
			this.client
				.execute(function(){
					var testForm = $('#testForm');

					testForm.append('<input type="text" data-type="text" data-min= "10">');
					testForm.formBuilder();

					return [
						{val: testForm.find('.input-field .field-items .field-item.field-item-input.first').length, equal: 1, because: 'Min has been created correctly'},
						{val: testForm.find('.input-field .field-items .field-item').children().eq(0).attr('data-min'), equal: '10', because: 'The number entered into data-min is correct'}
					
					];
				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err, ret)
		}); // End of it "Min Creation"

	}); // End of describe
}; // End of module 
