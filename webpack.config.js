const path = require('path');


module.exports = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [
      { test: /tsx?$/, use: ['babel-loader', 'ts-loader'] },
    ],
  },
};
