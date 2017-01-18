const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    `${require.resolve('webpack-dev-server/client')}?/`,
    require.resolve('webpack/hot/dev-server'),
    require.resolve('promise/lib/es6-extensions'),
    require.resolve('whatwg-fetch'),
    path.resolve(`${__dirname}/../src/index.jsx`),
  ],
  output: {
    path: path.resolve(`${__dirname}/../build`),
    filename: 'static/js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', ''],
  },
  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\/$/,
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(`${__dirname}/../src`),
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  postcss() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 2 versions',
        ],
      }),
    ];
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(`${__dirname}/../public/index.html`),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
};
