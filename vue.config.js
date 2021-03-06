module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? './'
  //   : '/',
  chainWebpack: config => {
    // 生产环境
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })
    config.set('externals',{
      vue:'Vue',
      echarts:'echarts',
      vant:'vant'
    })
    // 是否发布模式,是
    // config.plugin("html").tap(args => {
    //   args[0].isProd = true;
    //   return args;
    // });
    // 开发环境
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
    // 是否发布模式,是
    // config.plugin("html").tap(args => {
    //   args[0].isProd = false;
    //   return args;
    // });
    
  },
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    },
    // externals:{
    //   vue:'Vue',
    //   echarts:'echarts',
    //   vant:'vant'
    // }
  }

}
