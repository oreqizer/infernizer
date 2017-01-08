/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    bundle: './src/client/index.ts',
    vendor: ['inferno', 'normalize.css'],
  },
  output: {
    path: path.resolve(__dirname, '.tmp/static'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [{
      test: /tsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }], 'stage-3'],
          plugins: ['inferno'],
        },
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader?modules', 'postcss-loader'],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      exclude: /vendor/,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev'),
    }),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: '.tmp/static/',
    proxy: {
      '*': 'http://localhost:3000',
    },
  },
};
