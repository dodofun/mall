/* eslint-disable import/no-commonjs */
import path from 'path'
import pkgData from '../package.json'
import {printFiglet} from './figlet'

// 配置参数信息
const constants = {
  APP_OWNERID: 1,
  APP_ID: {
    WEAPP: 'wxefcb10dd67c03b07',
    WEB: 'wxefcb10dd67c03b07',
    SWAN: '',
    TT: '',
    ALIPAY: '',
    RN: '',
  },
  APP_NAME: pkgData.name,
  OPEN_CUSTOM_INTERCEPTOR: false,
  ASSETS_IMAGE_HOST: 'https://assets.yiduohoulang.com',
  ASSETS_HOST: 'https://assets.yiduohoulang.com',
  CUSTOMER_SERVICE: '18513971114',
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
    '@/action': path.resolve(__dirname, '..', 'src/action'),
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
          limit: 10, // 设定转换尺寸上限
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
  printFiglet()
  return res
}
