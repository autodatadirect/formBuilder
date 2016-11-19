module.exports = {
	entry: './src/entry.js',
	output: {
		path: __dirname,
		filename: 'dist/add-formbuilder.js'
	},
	externals : {
		'jquery': true,
		'jquery-ui': true
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},{
				test: /\.(woff|png|jpg|gif|eot|ttf|woff|svg)$/,
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