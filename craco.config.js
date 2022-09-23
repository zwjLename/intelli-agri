const CracoLessPlugin = require('craco-less');

module.exports = {
  // 前端解决跨域：配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://111.229.163.181:8009',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0cf2e7',
              '@text-color': '#0cf2e7' // 主文本色
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};