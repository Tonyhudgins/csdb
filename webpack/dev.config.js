const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?noInfo=false',
  './client/index.js',
];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: 'bundle.js',
};

const devtool = 'inline-source-map';

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
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

// These are for testing
// make sure that the following files are labeled as "external",
// which means they will be ignored during bundling
const externals = {
  cheerio: 'window',
  'react/addons': 'react',
  'react/lib/ExecutionEnvironment' : 'react',
  'react/lib/ReactContext': 'react',
};

module.exports = { entry, output, devtool, plugins, externals,
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
