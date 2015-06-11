/*
 * Testing the prefix/suffix
*/

module.exports = function(app) {
	describe("Prefix/SuffixTests", function() {
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

		it("Prefix Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-prefix="prefix">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [ 
						{val: tf.find('.input-field .field-items .prefix-overlay').length, equal: 1, because: 'Prefix-overlay has been created in the correct container'},
						{val: tf.find('.input-field .field-items .prefix-overlay').css('display'), equal: 'none', because: 'Prefix-overlay\'s display has been set to \'none\''},
						{val: tf.find('.input-field .field-items .prefix-overlay').text(), equal: "prefix", because: 'Prefix-overlay contains the correct text'},
						{val: tf.find('.input-field .field-items .prefix-overlay').index(), equal: 0, because: 'Prefix is correctly placed at the front of the form field'},
						{val: tf.find('.input-field .field-items').children().eq(0).is('.prefix-overlay'), equal: true, because: 'Prefix is in fact an overlay'}
					];
					}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Prefix Describe"
		it("Suffix Creation",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-suffix="suffix">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');
					return [ 
						{val: tf.find('.input-field .field-items .suffix-overlay').length, equal: 1, because: 'Suffix-overlay has been created in the correct container'},
						{val: tf.find('.input-field .field-items .suffix-overlay').css('display'), equal: 'none', because:  'Suffix-overlay\'s display has been set to \'none\''},
						{val: tf.find('.input-field .field-items .suffix-overlay .shim').length, equal: 1, because: 'Suffix-overlay has a \'shim\' class'},
						{val: tf.find('.input-field .field-items .suffix-overlay .value').length, equal: 1, because: 'Suffix-overlay has a \'value\' class'},
						{val: tf.find('.input-field .field-items .suffix-overlay .value').text(), equal: "suffix", because: 'Suffix-overlay contains the correct text'},
						{val: tf.find('.input-field .field-items .suffix-overlay').index(), equal: 0, because: 'Suffix is correctly placed at the front of the form field (will move once user begins typing)'},
						{val: tf.find('.input-field .field-items').children().eq(0).is('.suffix-overlay'), equal: true, because: 'Suffix is in fact an overlay'}
					];

					}, function(err, ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Suffix Describe"

		it("Movement of Shim",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" data-suffix="suffix2">');
					tf.formBuilder();
				}, function(err,ret){

				})
				.moveToObject('input')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.keys("test")
				.execute(function(){
					ifw = $('input');
					return [
						{val: ifw.inputField('get'), equal: "test", because: "The text has been correctly entered"},
						{val: tf.find('.input-field .field-items .suffix-overlay').css("display"), equal: "block", because: "When text is entered the display for the suffix changes"},
						{val: tf.find('.input-field .field-items .suffix-overlay .shim').text(), equal: "test", because: "When text is entered the shim containts the correct text"}
					
					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				}); // End of function(err,ret)
		
		}); // End of it "Suffix Describe"
	}); // End of decribe
}; // End of module 
