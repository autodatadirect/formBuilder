/*
 * Testing the Tooltip
*/

module.exports = function(app) {
	describe("Tooltip Tests", function() {
		beforeEach(function(done){
			// Setup client
			this.client = app.webdriver.remote(app.clientSetup)
				.init()
				.url(app.urls.tooltip)
				.execute(function(){
					tf = $('form#testForm');
					tf.formBuilder();
				}, done);
		}); // End of beforeEach
		afterEach(function(){
			// close client
			this.client.end();
		}); // End of afterEach

		it("Tooltip Creation",function(done){
			this.client
				.execute(function(){
					return [ 
						{val: tf.find('.input-field .field-items').children('.field-item.addon.clickable').text(), equal: '?', because: 'Tooltip has the correct default text'},
						{val: tf.find('.tooltip').length, equal: 1, because: 'Tooltip exists'},
						{val: $('.tooltip.tooltip-wrapper').length, equal: 1, because: 'Tooltip has a tooltip-wrapper'},
						{val: $('.tooltip.tooltip-wrapper').is(':visible'), equal: false, because: 'Tooltip is not visible when not yet clicked'},
						{val: $('.tooltip.tooltip-wrapper .tooltip-title').text(), equal: "Tooltip Example", because: 'Tooltip has correct title text'},
						{val: $('.tooltip.tooltip-wrapper .tooltip.form-input-tooltip').children().length, equal: 4, because: 'Tooltip has correct amount of text'},
						{val: $('.tooltip.tooltip-wrapper .tooltip.form-input-tooltip').children().eq(0).text(), equal: "This is a tooltip", because: 'Tooltip has correct text'},
						{val: $('.tooltip.tooltip-wrapper .tooltip.form-input-tooltip').children().eq(1).text(), equal: "Paragraph One", because: 'Tooltip has correct text'},
						{val: $('.tooltip.tooltip-wrapper .tooltip.form-input-tooltip').children().eq(2).text(), equal: "Paragraph Two", because: 'Tooltip has correct text'},
						{val: $('.tooltip.tooltip-wrapper .tooltip.form-input-tooltip').children().eq(3).text(), equal: "Some link somewhere cool", because: 'Tooltip has correct text'},
					];
				}, function(err, ret){
					app.printError(err);
					app.batchExpect(ret.value);	
					expect(ret.value).toBeTruthy();
					done();
				});
		
		}); // End of it "Tooltip Creation"

		it("Tooltip After Click",function(done){
			this.client
				.execute(function(){
					tf.append('<input type="text" data-type="text" class="tooltip">');
					tf.formBuilder();
				}, function(err,ret){

				})
				.moveToObject('.tooltip')
				.buttonDown(app.Buttons.LEFT).buttonUp(app.Buttons.LEFT) //click
				.execute(function(){
					return [
						{val: tf.find('.input-field .field-items').children('.field-item.addon.clickable.open').length, equal: 1, because: 'Tooltip class changes to open after being clicked'},
						{val: $('.tooltip.tooltip-wrapper').is(':visible'), equal: true, because: 'Tooltip is visible once clicked'},

					]; 
				}, function(err,ret){
					app.batchExpect(ret.value);
					done();
				});
		
		}); // End of it "Tooltip After Click"
	}); // End of decribe
 };// End of module 
