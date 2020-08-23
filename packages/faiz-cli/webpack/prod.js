const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./base')

module.exports = function() {
  const prodConfig = {
    mode: 'production',
    entry: path.resolve(process.cwd(), './src/main.js'),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
        },
        {
          test: /\.css$/,
          loader: [
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   // options: {
            //   //   esModule: true,
            //   // }
            // },
            MiniCssExtractPlugin.loader,
            // require.resolve('vue-style-loader'),
            require.resolve('css-loader'),
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp|bmp)(\?.*)?$/,
          loader: require.resolve('url-loader'),
          options: {
            limit: 1024 * 4,
            esModule: false,
            name: 'static/img/[name].[contenthash:8].[ext]',
          }
        },
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
        },
      ],
    },
    resolve: {},
    output: {
      pathinfo: true,
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      path: path.resolve(process.cwd(), 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/chunk.[id].css'
      }),
    ],
  }

  return prodConfig
}