const path = require('path')

module.exports = {
  entry: path.resolve('src/Root.js'),
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}