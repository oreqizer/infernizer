const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const Assets = require('assets-webpack-plugin');


const production = process.env.NODE_ENV === 'production';

const webPlugins = [
  new ExtractText('styles.[hash].css'),
  new webpack.LoaderOptionsPlugin({
    debug: !production,
  }),
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
  webPlugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  webPlugins.push(new webpack.SourceMapDevToolPlugin({
    exclude: /vendor/,
  }));
}


const web = {
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
  plugins: webPlugins,
};

const node = {
  target: 'node',
  entry: {
    bundle: './src/server/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].node.js',
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
      use: 'css-loader?modules',
    }],
  },
};

module.exports = [web, node];
