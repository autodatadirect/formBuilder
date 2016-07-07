'use strict';

module.exports = {
	entry: './src/entry.js',

	output: {
		path: 'dist',
		filename: 'bundle.js'
	},
	
	externals: {
		'json': 'JSON',
		'document': 'document',
		'window': 'window'
	},
	
	resolve: {
		alias: {
			
		}
	},

	devServer: {
		host: 'localhost',
		port: 9999,
		hot: true,
		inline: true,
		open: true
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.hbs$/, loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/js/handlebarHelpers'},
			{ test: /\.less$/, loaders: [ 'style', 'css', 'less' ]},
			{ test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ]},
			{ test: /\.(png|jpg|gif|eot|ttf|woff|svg|woff2)(\?.*)?$/, loader: 'url-loader?limit=5000&name=img/[name].[hash].[ext]' }
		]
	},

	plugins: [
		
	]
};
