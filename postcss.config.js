/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const modules = require('postcss-modules');

module.exports = {
  plugins: [
    autoprefixer,
    modules,
  ],
};
