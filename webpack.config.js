const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const Assets = require('assets-webpack-plugin');


const prod = process.env.NODE_ENV === 'production';


const config = {
  entry: {
    bundle: './src/client/index.ts',
    vendor: ['inferno'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/[name].[hash].js',
  },
  module: {
    rules: [{
      test: /tsx?$/,
      use: ['babel-loader', 'ts-loader'],
    }, {
      test: /\.css$/,
      loader: ExtractText.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules',
      }),
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }],
  },
  plugins: [
    new Assets({
      path: 'dist',
      filename: 'assets.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: prod ? 'production' : 'dev' }),
    }),
  ],
};

if (prod) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    exclude: /vendor/,
  }));
}

module.exports = config;
