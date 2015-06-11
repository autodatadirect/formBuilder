/*
 * Testing the pre/post input
*/

module.exports = function(app) {
	describe("Pre/post Input tests", function() {
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

		it("PreInput Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-preinput="preinput">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [ 
						{val: tf.find('.input-field .field-items .field-item.addon').length, equal: 1, because: 'Addon has been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item.addon').attr('data-weight'), equal: '-1', because: 'Addon\'s weight is correct (-1)'},
						{val: tf.find('.input-field .field-items .field-item.addon').text(), equal: "preinput", because: 'Text is correct'},
						{val: tf.find('.input-field .field-items .field-item.addon').index(), equal: 0, because: 'Addon is correctly placed to the left of input '},
						{val: tf.find('.input-field .field-items').children().eq(0).is('.addon'), equal: true, because: 'Preinput is in fact an addon'}
					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Preinput Creation"


		it("PostInput Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-postinput="postinput">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [ 
						{val: tf.find('.input-field .field-items .field-item.addon').length, equal: 1, because: 'Addon has been created in the correct container'},
						{val: tf.find('.input-field .field-items .field-item.addon').attr('data-weight'), equal: '1', because: 'Addon\'s weight is correct (1)'},
						{val: tf.find('.input-field .field-items .field-item.addon').text(), equal: "postinput", because: 'Text is correct'},
						{val: tf.find('.input-field .field-items .field-item.addon').index(), equal: 1, because: 'Addon is correctly placed to the right of input '},
						{val: tf.find('.input-field .field-items').children().eq(1).is('.addon'), equal: true, because: 'Postinput is in fact an addon'}
					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "PostInput creation"

	}); // End of decribe
}; // End of module 
