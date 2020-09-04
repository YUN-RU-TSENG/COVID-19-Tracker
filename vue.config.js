module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/cv-19/' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  }
}
