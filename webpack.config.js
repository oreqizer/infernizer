const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const Assets = require('assets-webpack-plugin');


const production = process.env.NODE_ENV === 'production';


const plugins = [
  new ExtractText('[name].[hash].css'),
  new Assets({
    path: 'dist',
    filename: 'assets.json',
    prettyPrint: !production,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({ NODE_ENV: production ? 'production' : 'dev' }),
  }),
];

if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
  }));
}

module.exports = {
  entry: {
    bundle: './src/client/index.ts',
    vendor: ['inferno', 'normalize.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].[hash].js',
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
      loader: ExtractText.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules',
      }),
    }],
  },
  plugins,
};
