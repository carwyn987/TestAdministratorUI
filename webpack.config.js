const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    menuBar: './src/menuBar/menuBar.js',
    studentTest: './src/studentTest/studentTest.js',
    questionAdmin: './src/questionAdmin/questionAdmin.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/*/*.html', to: '.' },
      { from: 'src/*/*.css', to: '.' },
      { from: 'src/favicon.ico', to: '.' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'studentTest.html',
      template: 'src/studentTest/studentTest.html',
      chunks: ('studentTest'),
      excludeChunks: ['menuBar', 'questionAdmin'],
    }),
    new HtmlWebpackPlugin({
      filename: 'menuBar.html',
      template: 'src/menuBar/menuBar.html',
      chunks: ('menuBar'),
      excludeChunks: ['studentTest', 'questionAdmin'],
    }),
    new HtmlWebpackPlugin({
      filename: 'questionAdmin.html',
      template: 'src/questionAdmin/questionAdmin.html',
      chunks: ('questionAdmin'),
      excludeChunks: ['studentTest', 'menuBar'],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    index: 'menuBar.html',
  },
}
