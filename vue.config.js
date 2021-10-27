const path = require('path');//引入path模块
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './',
  outputDir: 'AS-Editor-H5',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://firetest-player.laidui.vip/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('css', resolve('./src/assets/css'))
      .set('iconfont', resolve('./src/assets/iconfont'))
      .set('img', resolve('./src/assets/images'))
      .set('utils', resolve('./src/utils'))
  }
}
