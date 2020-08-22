process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const ora = require('ora')
const webpack = require('webpack')
const getWebpackConfig = require('../webpack/dev')

const spinner = ora('Starting development server...')

function createDevServer (webpackConfig) {
  console.log('=== webpackConfig ===', webpackConfig)
  const compiler = webpack(webpackConfig)

  const DevServer = require('webpack-dev-server')
  const devServer = new DevServer(compiler, {
    host: 'localhost',
    port: 3002,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    hot: true,
    open: true,
  })

  return devServer
}

async function serve() {
  spinner.start()

  const webpackConfig = getWebpackConfig()
  const devServer = createDevServer(webpackConfig)

  console.log('=== devServer ===', devServer)

  // Ctrl + C 触发
  ;['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close()
      process.exit()
    })
  })

  return devServer.listen('3002', '0.0.0.0', err => {
    if (err) return console.log(err)
  })
}

module.exports = function(...args) {
  return serve().catch(err => {
    console.error(chalk.red(`serve error`, err))
    process.exit(1)
  })
}