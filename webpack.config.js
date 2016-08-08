var path = require('path')

module.exports = {
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      }
    ]
  }
}