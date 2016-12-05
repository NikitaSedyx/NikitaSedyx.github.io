'use strict';

const DEV_ENV = 'dev';
const PROD_ENV = 'prod';
const ENV = process.env.NODE_ENV || DEV_ENV;

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let extractCssTextPlugin = 'css!sass';
if (ENV == PROD_ENV) {
  extractCssTextPlugin = 'css?minimize!sass';
}

module.exports = {
		context: `${__dirname}/task3/src`,
		entry: {
		  index: './index',
			common: ['./js/constants/constants'],
      styles: './styles/main.sass'
		},
    output: {
      path: `${__dirname}/task3/dist/js`,
      publicPath: '/task3/dist/js/',
      filename: '[name].js',
      library: '[name]'
    },

    watch: ENV == DEV_ENV,
    watchOptions: {
    	aggregateTimeout: 100
    },

    module: {
    	loaders: [
    		{
	    		test: /\.js?$/,
          include: `${__dirname}/task3/src`,
	    		loader: 'babel-loader',
		      query: {
		        presets: ['es2015'],
            plugins: ['add-module-exports']
		      }
    		},
        {
          test: /\.pug?$/,
          include: `${__dirname}/task3/src`,
          loader: 'pug-loader'
        },
        {
          test: /\.sass?$/,
          include: `${__dirname}/task3/src`,
          loader: ExtractTextPlugin.extract('style' , extractCssTextPlugin)
        }
        // it can be file/url loader, but no static files
    	]
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(ENV)
      }),
      new webpack.optimize.CommonsChunkPlugin(
        {
          name: 'common'
        }
      ),
      new ExtractTextPlugin('../assets/styles/[name].css', {allChunks: true})
    ],

    devServer: {
      host: 'localhost',
      port: 8081,
      contentBase: `${__dirname}/task3`
    }
}

if (ENV == PROD_ENV) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			warnings: false,
			drop_console: true
		})
	);
} 
