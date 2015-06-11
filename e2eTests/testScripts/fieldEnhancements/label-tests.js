/**
 * Testing the label
 */

module.exports = function(app) {
	describe("Data-Label Tests", function() {
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

		it("Data-Label Creation",function(done){
			this.client
				.execute(function(){
					var testForm = $('#testForm');

					testForm.append('<input type="text" data-type="text" data-label="label">');
					testForm.formBuilder();

					return [
						{val: testForm.find('.input-field').children('label').length, equal: 1, because: 'Label has been created in the correct container'},
						{val: testForm.find('.input-field').children('label').text(), equal: "label", because: 'Label has correct text'},
						{val: testForm.find('.input-field').children().eq(0).is('label'), equal: true, because: 'Label is in correct location'},
					];
				}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		}); // End of it "Data-Label Creation"
		
	}); // End of decribe
}; // End of module 