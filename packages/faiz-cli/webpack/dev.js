const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader-plugin')
const baseConfig = require('./base')

module.exports = function() {
  const devConfig = {
    mode: 'development',
    entry: './index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            compilerOptions: {
              module: 'es2015'
            },
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          loader: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {},
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      host: 'localhost',
      port: 3002,
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/index.html' }],
      },
      hot: true,
      open: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'examples/index.html',
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