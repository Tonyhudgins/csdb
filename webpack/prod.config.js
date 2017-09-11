const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = [
  'babel-polyfill',
  './client/index.js',
];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: 'bundle.js',
};

const plugins = [
  //  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('style.css'),
];

const cssLoader = [
  { loader: 'style-loader' },
  { loader: 'css-loader', options: { minimize: true, localIdentName: `[path][name]---[local]` } },

//  { loader: 'resolve-url-loader' },
  /*
   { loader: 'postcss-loader' },
   { loader: 'sass-loader' },
   */
];

module.exports = { entry, output, plugins,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules|server)/,
        use: ['babel-loader'],
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: cssLoader,
      },
      {
        test: /.(eot|svg|otf|ttf|woff|woff2)/,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
};
