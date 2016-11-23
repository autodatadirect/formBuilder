const baseConfig = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');

const config = {
	target: 'node',
	externals: [nodeExternals(), {
		'jquery': 'jQuery',
		'jquery-ui': true
	}],
	module: baseConfig.module
};

module.exports = config;