const chalk = require('chalk')
const path = require('path')
const validateNpmPackageName = require('validate-npm-package-name')
const fs = require('fs-extra')
const inquirer = require('inquirer')

async function create(appName) {

  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, appName)

  // 检查 appName 是否合法
  const validateNameRes = validateNpmPackageName(appName)
  if (!validateNameRes.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${appName}"`))
    validateNameRes.errors && validateNameRes.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    validateNameRes.warnings && validateNameRes.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  // 同名文件夹已存在
  if (fs.existsSync(targetDir)) {
    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `Target directory ${chalk.cyan(targetDir)} already exists. \nDo you want to overwrite them?`
      }
    ])
    if (!ok) {
      return
    }
    console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
    await fs.remove(targetDir)
  }

  // 生成文件


}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.error(chalk.red(`create error`, err))
    process.exit(1)
  })
}