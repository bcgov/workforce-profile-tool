/**
 * This file patches Nivo such that the recent updates to React Spring do not break tooltips.
 */

const fs = require('fs')
const path = require('path')

const packagesToPatch = [
  'animated',
  'core',
  'konva',
  'native',
  'shared',
  'three',
  'web',
  'zdog',
]

packagesToPatch.forEach(patchPackage)

function patchPackage(package) {
  const packageJsonPath = path.join(
    'node_modules',
    '@react-spring',
    package,
    'package.json'
  )
  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8')
  const modifiedPackageJson = packageJson.replace('"sideEffects": false,', '')
  fs.writeFileSync(packageJsonPath, modifiedPackageJson, {
    encoding: 'utf-8',
  })
}
