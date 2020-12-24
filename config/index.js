/* eslint-disable import/no-commonjs */
import path from 'path'
import pkgData from '../package.json'

const constants = {
  APP_NAME: pkgData.name,
  OPEN_CUSTOM_INTERCEPTOR: false,
}
const config = {
  projectName: pkgData.name,
  date: '2020-12-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    _APP_CONSTANTS: constants,
    _PKG_DATA: pkgData,
  },
  alias: {
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/mock': path.resolve(__dirname, '..', 'src/mock'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  plugins: [],
  framework: 'react',
  mini: {
    minifyXML: {
      collapseWhitespace: true,
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          // autoprefixer 配置项
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    devServer: {
      port: 10086,
    },
    router: {
      mode: 'browser', // hash 或者 browser
      basename: '',
      customRoutes: {},
    },
  },
}

module.exports = function (merge) {
  let res
  if (process.env.NODE_ENV === 'development') {
    res = merge({}, config, require('./dev'))
  } else {
    res = merge({}, config, require('./prod'))
  }

  // 配置常量解析
  Object.keys(res.defineConstants).map((key) => {
    res.defineConstants[key] = JSON.stringify(res.defineConstants[key])
  })

  return res
}
