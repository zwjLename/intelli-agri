const CracoLessPlugin = require('craco-less');

module.exports = {
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