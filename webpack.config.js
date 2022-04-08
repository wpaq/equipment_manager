const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: {
    main: './frontend/main.js',
    custom: './frontend/custom.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
 },
  devtool: 'source-map'
};