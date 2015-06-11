/**
 * Testing data-type "display"
 */

module.exports = function(app) {
	describe('"display"', function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.index)
				.execute(function(){
					type = 'display';
					tf = $('form#testForm');
					tf.append('<input type="text" data-type="'+type+'">');
					tf.formBuilder();
					field = tf.find('.input-field');
					ifw = field.find('input');

				}, done);
		});
		afterEach(function(){
			// close client
			this.client.end();
		});

		it("Field construction", function(done){
			this.client
				.execute(function(){
					return [
						{val: field.children('.field-items').children().length, equal: 2, because: "Checking number of field-items"},
						{val: field.find('.field-items .field-item.field-item-input input').data('type'), equal: type, because: "Checking correct type"},
						{val: ifw.data('type'), equal: type, because: "Checking correct type from widget"},
						{val: field.find('.field-items .field-item.field-item-input input').is(':visible'), equal: false, because: "Input box should be hidden"},
						{val: field.children('.field-items').children('.input-display').length, equal: 1, because: "Checking for the display"},
						{val: field.children('.field-items').children('.input-display').text(), equal: ifw.val(), because: "Checking the display value"},
					];
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		});
	});
};