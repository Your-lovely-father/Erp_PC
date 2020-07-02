module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './': '/',
  // outputDir: 'dist',
  outputDir: process.env.outputDir,
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: () => {},
  configureWebpack: () => {},
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('postcss-pxtorem')({
  //           rootValue: 75, // 换算的基数
  //           propList: ['*'],
  //         }),
  //       ]
  //     }
  //   }
  // },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASEURL,
        ws: true,
        secure:false,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

}
