'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const fs = require('fs');

// 一些资源文件地址的定义 - 区分了 生产环境 和 开发环境
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// 更优雅的 webpack loader 们的使用方式，内部支持了 stylus、less 等loader的配置，让使用更简单
// 非常值得学习
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      root: path.resolve(__dirname, '../static'),
      url: true,
      alias: {
        '@': path.resolve(__dirname, '../static')
      },
      import: false,
      modules: false,
      minimize: true,
      sourceMap: true,
      camelCase: false,
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      // loader = stylus/less/sass
      // loaderOptions = 我们自己做的一些其他配置
      // 这里的最底层都用了 css-loader，相当于我们自己不用重复写这些东西
      // 
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  
  //  style-loader 是每个 css-loader 都要读取的，学过 webpack 配置即可知道
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  // fs.writeFile(filename, data, [options], callback)
  // {flag: 'a'} 是追加参数
  fs.writeFile(path.resolve(__dirname, 'testOutput.txt'), JSON.stringify(output), {flag: 'a'}, (err) => {
    if (err) {
      console.log('写入出错', err);
    }
  });

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
