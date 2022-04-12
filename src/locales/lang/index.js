
// 多文件合并成对象
var moduleEn = {};
const requireComponent = require.context('./en', false, /\.js$/)
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    Object.assign(moduleEn, componentConfig.default);
})

// 多文件合并成数组
/* const moduleFiles = require.context('./en', false, /\.json$/)
const moduleEn = moduleFiles.keys().map(obj => {
    console.log('obj',obj)
  return moduleFiles(obj)
}, {}) */


var moduleCn = {};
const moduleFiles = require.context('./en', false, /\.js$/)
moduleFiles.keys().forEach(fileName => {
    const componentConfig = moduleFiles(fileName)
    Object.assign(moduleCn, componentConfig.default);
})

export let enLocale = moduleEn
export let usLocal = moduleCn