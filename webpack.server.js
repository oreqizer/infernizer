/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');


module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    bundle: './src/server/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-/0-9]+$/,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
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
    }],
  },
  plugins: [
    new ExtractText('index.css'),
  ],
};