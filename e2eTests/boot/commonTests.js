/**
 * Common tests to be generated easily
 */

module.exports = function(app) {

	app.tests = {
		validate: function(keys, result, client, input, outside) {
			var def = app.Q.defer();
			client
				.click('input')
				.keys(keys)
				.click('div#outside')
				.execute(function(){
					if($('.error-overlay').length > 0)
						return !$('.error-overlay').is(':visible');
					else
						return true;
				}, function(err,ret){
					expect(ret.value).toEqual(!!result);
					def.resolve();
				});
			return def.promise;
		},
	};
};