const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function fileName (ext) {
  return `[name].bundle.${ext}`
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './index.js'
    ]
  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    watchFiles: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'img', 'favicon.ico'), to: path.resolve(__dirname, 'dist') }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
