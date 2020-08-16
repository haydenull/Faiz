const chalk = require('chalk')
const ejs = require('ejs')
const fs = require('fs-extra')
const path = require('path')
const debug = require('debug')('faiz:cli-generate')
const { logWithSpinner, stopSpinner } = require('../util/spinner')
const writeFileTree = require('../util/writeFileTree')

/**
 * Render template files into the virtual files tree object.
 *
 * @param {string | object | FileMiddleware} source -
 *   Can be one of:
 *   - relative path to a directory;
 *   - Object hash of { sourceTemplate: targetFile } mappings;
 *   - a custom file middleware function.
 * @param {object} [additionalData] - additional data available to templates.
 * @param {object} [ejsOptions] - options for ejs.
 *
 * 渲染 ejs 模板
 */
async function render(source, additionalData = {}, ejsOptions = {}) {
  const baseDir = path.resolve(__dirname, '../')  // path/node_modules/faiz-cli
  source = path.resolve(baseDir, source) // path/node_modules/faiz-cli/templates/vue
  let files = {}

  const globby = require('globby')
  const _files = await globby(['**/*'], { cwd: source })

  debug('template files', _files)

  for (const rawPath of _files) {
    // 下划线开头的文件转为.   _gitignore -> .gitignore
    const targetPath = rawPath.split('/').map(fileName => {
      fileName = fileName.replace(/^(_)(\w)(\w*)/, (match, p1, p2, p3) => {
        if (p2 === '_') return p2 + p3
        return '.' + p2 + p3
      })
      return fileName
    }).join('/')

    const sourcePath = path.resolve(source, rawPath) // path/node_modules/faiz-cli/templates/vue/src/App.vue
    const fileContent = renderFile(sourcePath, additionalData, ejsOptions)
    if (fileContent.trim()) {
      files[targetPath] = fileContent
    }
  }

  return files
}

/**
 * @fileName 模板文件路径   path/node_modules/@vue/cli-service/generator/template/_gitignore
 * @data  数据 options rootOptions plugins additionalData
 * @ejsOptions ejs 配置  ejsOptions = {}
 *
 * 渲染文件
 */
function renderFile(fileName, data = {}, ejsOptions = {}) {
  const template = fs.readFileSync(fileName, 'utf-8')
  return ejs.render(template, data, ejsOptions)
}

module.exports = async function(appName, dest) {
  console.log('before creating......')

  logWithSpinner(`✨`, `Creating project in ${chalk.yellow(dest)}.`)

  // 生成 package.json
  const pkg = {
    name: appName,
    version: '0.1.0',
    private: true,
    devDependencies: {},
  }
  await writeFileTree(dest, {
    'package.json': JSON.stringify(pkg, null, 2),
  })

  const files = await render('./templates/vue', {
    options: { appName } // ejs data
  })
  debug('files', Object.keys(files))
  await writeFileTree(dest, files)


  stopSpinner()
  console.log(`🎉  Successfully created project ${chalk.yellow(appName)}.`)

}