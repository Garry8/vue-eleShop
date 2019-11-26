// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  },

  //配置跨域
  outputDir:'build',
  devServer:{
    //   port:5000,
      proxy:{
          '/apis':{
              target:'http://localhost:8080/',
              changeOrigin:true,
              pathRewrite:{
                  '^/apis':''
              }
          }
      }
  }
}
