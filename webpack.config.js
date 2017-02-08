'use strict';

const DEV_ENV = 'dev';
const PROD_ENV = 'prod';
const ENV = process.env.NODE_ENV || DEV_ENV;

const webpack = require('webpack');

module.exports = {
		context: `${__dirname}/task7/src`,
		entry: {
		  index: './index'
		},
    output: {
      path: `${__dirname}/task7/dist`,
      publicPath: '/task7/dist',
      filename: '[name].js'
    },

    watch: ENV == DEV_ENV,
    watchOptions: {
    	aggregateTimeout: 100
    },

    module: {
    	loaders: [
    		{
	    		test: /\.js?$/,
          include: [`${__dirname}/task7/src`, `${__dirname}/task7/index.spec.js`],
	    		loader: 'babel-loader',
		      query: {
		        presets: ['es2015'],
            plugins: ['add-module-exports']
		      }
    		}
    	]
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(ENV)
      })
    ],
}

if (ENV == PROD_ENV) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			warnings: false,
			drop_console: true
		})
	);
} 
