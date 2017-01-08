const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const Assets = require('assets-webpack-plugin');


const production = process.env.NODE_ENV === 'production';


const plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: production,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'dev'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),
  new ExtractText({ filename: '[name].[hash].css', allChunks: true }),
  new Assets({
    path: 'dist',
    filename: 'assets.json',
    prettyPrint: !production,
  }),
];

const babelOptions = {
  presets: [['es2015', { modules: false, loose: true }], 'stage-3'],
  plugins: ['inferno'],
};

if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    negate_iife: false,  // <- for `v8LazyParse()`
    comparisons: true,
    conditionals: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    unused: true,
  }));

  babelOptions.plugins.push('babili');
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
        options: babelOptions,
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /\.css$/,
      loader: ExtractText.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader?modules', 'postcss-loader'],
      }),
    }],
  },
  plugins,
};
