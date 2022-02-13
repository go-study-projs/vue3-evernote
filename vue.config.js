const webpack = require('webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
// const AutoStyle = require('unplugin-element-plus/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

/**
 * vue/cli serve 下 NODE_ENV 环境变量默认是 development
 * vue/cli build NODE_ENV 是 production
 * 具体参考： https://cli.vuejs.org/zh/guide/mode-and-env.html
 */

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: '/',
  devServer: {
    // https://cli.vuejs.org/zh/config/#devserver
  },
  assetsDir: 'static',
  css: {
    requireModuleExtension: true
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // config axios baseURL
        // __BASE_URL__: JSON.stringify('https://note-server.hunger-valley.com')
        __BASE_URL__: JSON.stringify('http://localhost:8080')
        // __BASE_URL__: JSON.stringify('/')
      }),
      AutoImport({
        resolvers:[ElementPlusResolver()]
      }),
      Components({
        resolvers:[ElementPlusResolver()]
      })
    ]
  }
}
