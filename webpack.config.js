const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = [
'babel-polyfill',
'./client/index.js',
'webpack/hot/dev-server',
//'webpack-dev-server/client?http://localhost:8080/',
//'webpack-hot-middleware/client?http://localhost:8080/',
];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: 'bundle.js',
};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  //  new webpack.NamedModulesPlugin(),
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
/*
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    './client/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [HtmlWebpackPlugin],
};
*/
