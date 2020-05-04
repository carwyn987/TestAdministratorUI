const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/index.html', to: '.' },
      { from: 'src/styling.css', to: '.' },
      { from: 'src/favicon.ico', to: '.' },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
}
