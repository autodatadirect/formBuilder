const baseConfig = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');

const config = {
	target: 'node',
	resolve: {
		alias: {
			jquery: 'jQuery'
		}
	},
	externals: [nodeExternals()],
	module: baseConfig.module
};

module.exports = config;