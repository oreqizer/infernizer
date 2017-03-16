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
    bundle: './src/server/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-/0-9]+$/,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
    }, {
      test: /\.s?css$/,
      use: ExtractText.extract({
        use: [{
          loader: 'css-loader',
          options: { modules: true },
        }, 'postcss-loader', 'sass-loader'],
      }),
    }],
  },
  plugins: [
    new ExtractText({ filename: 'index.css', allChunks: true }),
  ],
};
