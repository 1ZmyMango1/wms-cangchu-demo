// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     devServer: {
//       open: true,
//       port: 8888,
//       host: '127.0.0.1',
//       // 代理跨域的配置
//       proxy: {
//         // // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
//         '/api': {
//           target: 'http://www-wms-java.itheima.net', // 跨域请求的地址
//           // pathRewrite: { '^/api': 'http://www-wms-java.itheima.net' },
//           changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
//         }
//       }
//     }
//   }
// })

const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检查 // 写原生webpack的配置项
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: '127.0.0.1',
      // 代理跨域的配置
      proxy: {
        '/ips': {
          target: 'http://www-wms-java.itheima.net', // 我们要代理的地址
          changeOrigin: true
        },
        '/api': {
          target: 'http://www-wms-java.itheima.net', // 我们要代理的地址
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '#': path.join(__dirname, 'src/components')
      }
    }
  }
})
