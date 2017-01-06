const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');


const PRODUCTION = process.env.NODE_ENV === 'production';


const config = {
  entry: {
    bundle: './src/client/index.ts',
    vendor: ['inferno', 'inferno-redux', 'redux'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [{
      test: /tsx?$/,
      use: ['babel-loader', 'ts-loader'],
    }],
  },
  plugins: [
    new AssetsPlugin({ path: 'dist', filename: 'assets.json' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: PRODUCTION ? 'production' : 'dev' }),
    }),
  ],
};

if (PRODUCTION) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
