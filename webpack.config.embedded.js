module.exports = {
	entry: './src/entry.js',
	output: {
		path: __dirname + '/dist',
		filename: 'add-formbuilder.embedded.js'
	},
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
