const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./base')

module.exports = function() {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: path.resolve(process.cwd(), './src/main.js'),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
        },
        // {
        //   test: /\.css$/,
        //   oneOf: [
        //     {
        //       loader: [
        //         {
        //           loader: require.resolve('vue-style-loader'),
        //           options: {
        //             sourceMap: true,
        //           }
        //         },
        //         {
        //           loader: require.resolve('css-loader'),
        //           options: {
        //             sourceMap: true,
        //             importLoaders: 2
        //           }
        //         }
        //       ],
        //       sideEffects: false,
        //     }
        //   ],
        // },
        {
          test: /\.css$/,
          loader: [
            require.resolve('vue-style-loader'),
            require.resolve('style-loader'),
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
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new VueLoaderPlugin(),
    ],
  }
  return devConfig
}