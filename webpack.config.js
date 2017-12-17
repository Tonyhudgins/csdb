const webpack = require('webpack');
const path = require('path');

// On build runs, this plugin will create an index.html file in the dist directory that
// adds css and bundle files into the index.html template defined below under 'plugins'
const HtmlWebpackPlugin = require('html-webpack-plugin');

// This plugin extracts modular css and outputs a bundled css file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// set up our path constants
const paths = {
  DIST: path.resolve(__dirname, './dist'),
  TEMPLATE: path.resolve(__dirname, './'),
  SRC: path.resolve(__dirname, './client'),
  IMG: path.resolve(__dirname, './client/assets/images')o
};

// Entry point for React app
const entry = {
  entry: [
    'babel-polyfill',

    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8085',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // entry point of our app
    path.join(paths.SRC, 'index.js')
  ]
};

// Output for bundle file
const output = {
  // target directory
  path: paths.DIST,

  // the output bundle
  filename: 'app.bundle.js',

  // necessary for HMR to know where to load the hot update chunks
  publicPath: '/',

};


module.exports = {
  entry,
  output,
  // set up our source map
  devtool: 'eval-source-map',

  // Configure the webpack-dev-server
  devServer: {
    // match the output path
    contentBase: paths.DIST,
    //enable HMR on the devServer
    hot: true,
    //match the output 'publicPath'
    publicPath: '/',
    // fallback to root for other urls
    historyApiFallback: true,

    inline: true,

    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  plugins: [
    new HtmlWebpackPlugin({
      // tack a hash on the end of filenames to enable cache busting
      hash: true,
      favicon: path.join(paths.IMG, 'cs-ico.ico'),
      // this is the template that the target is crafted from
      template: path.join(paths.TEMPLATE, 'index.html'),
      // drop script tags at the bottom of the body
      inject: true,
    }),
    // After webpack rebuilds bundle, webpack-dev-middleware thinks that nothing has changed
    // This is because the changed module representing css has been emptied out by extractTextPlugin
    // disable ExtractTextPlugin in development to let HMR hot load styles
    // disable will cause plugin to fallback to style-loader
    new ExtractTextPlugin({
      filename: 'style.bundle.css',
      allChunks: true,
      disable: process.env.NODE_ENV !== 'production',
    }),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // this prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()

  ],
  // configure loaders
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          // fallback to style-loader when css is not extracted
          // style-loader injects the css into the header wrapped in style tags
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
              name:'images/[hash]-[name].[ext]'
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  }
};    
          