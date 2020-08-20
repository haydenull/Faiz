const baseConfig = require('./base')

module.exports = function() {
  const devConfig = {
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
}