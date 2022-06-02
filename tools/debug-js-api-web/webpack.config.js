const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    publicPath: "/",
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
  },
  devServer: {
    historyApiFallback: true,
    port: 9000
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false
  }
};
