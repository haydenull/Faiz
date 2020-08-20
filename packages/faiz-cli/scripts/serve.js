process.env.NODE_ENV = 'development'

const ora = require('ora')
const webpack = require('webpack')
const getWebpackConfig = require('../webpack/dev')

const spinner = ora('Starting development server...')

function createDevServer (webpackConfig) {
  const compiler = webpack(webpackConfig)

  const DevServer = require('webpack-dev-server')
  const devServer = new DevServer(compiler)

  return devServer
}

async function serve() {
  spinner.start()

  const devServer = createDevServer(getWebpackConfig())

  return devServer.listen(port, '0.0.0.0', err => {
    if (err) return console.log(err)
  })
}

module.exports = function(...args) {
  return serve().catch(err => {
    console.error(chalk.red(`serve error`, err))
    process.exit(1)
  })
}