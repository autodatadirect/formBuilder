const webpack = require('webpack'),
	productionMode = process.argv.indexOf('-p') === -1;

module.exports = {
	entry: './src/entry.js',
	output: {
		path: __dirname + '/dist',
		filename: productionMode ? 'add-formbuilder.js' : 'add-formbuilder.min.js'
	},
	externals : {
		'jquery': 'jQuery',
		'jquery-ui': true,
		'moment': 'moment'
	},
	plugins: [
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(require('./package.json').version)
		})
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},{
				test: /\.(woff|png|jpg|gif|eot|ttf|svg)$/,
				loader: 'url'
			},{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};
