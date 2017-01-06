const path = require('path');


module.exports = {
  entry: './src/client/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [{
      test: /tsx?$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'ts-loader',
      }],
    }],
  },
};
