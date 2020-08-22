const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./base')

module.exports = function() {
  const devConfig = {
    mode: 'development',
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
            require.resolve('vue-style-loader'),
            require.resolve('css-loader')
          ],
        },
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
        },
      ],
    },
    resolve: {},
    output: {
      filename: 'index.min.js',
      path: path.resolve(process.cwd(), './dist'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.jsbridgeBuildType': JSON.stringify(process.env.jsbridgeBuildType),
      }),
    ],
  }
  return devConfig
}