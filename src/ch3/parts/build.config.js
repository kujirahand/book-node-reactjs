const path = require('path')
const basedir = __dirname

module.exports = {
  entry: {
    'text': path.join(basedir, 'src/text.js'),
    'cbox': path.join(basedir, 'src/cbox.js'),
    'textarea': path.join(basedir, 'src/textarea.js'),
    'radio': path.join(basedir, 'src/radio.js'),
    'select': path.join(basedir, 'src/select.js')
  },
  output: {
    path: path.join(basedir, 'out'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader:'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
}
