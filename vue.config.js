const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    proxy: {
      '/buyticket': { // 这个可以改 
         target: 'http://api.maoyan.com', // 这个根据请求的根路径修改
         changeOrigin: true,
         pathRewrite: {
          '^/buyticket': ''
         }, // 替换请求路径的字符串
         headers: {
          "Date": "Fri, 14 Oct 2022 06:25:02 GMT",
          "Authorization": "fa3111af9b7cdf9859520c103d102450",
          "Key": 76489142,
          'Referer': 'http://api.maoyan.com' // 配置这个 解决请求头不能传限制的特殊字符问题 
         }
         },
      '/iswu': { // 这个可以改 https://ad.maoyan.com/api/position/detail?positionIds=1042&clientType=android&channelId=80001&ci=1
        target: 'https://ad.maoyan.com', // 这个根据请求的根路径修改
        changeOrigin: true,
        pathRewrite: {
          '^/iswu': ''
        }
      },
      '/text': {
        target: 'https://api.maoyan.com', // 这个根据请求的根路径修改
        changeOrigin: true,
        pathRewrite: {
          '^/text': ''
        }
      },
      '/yanchu': {
        target: 'https://yanchu.maoyan.com', // 这个根据请求的根路径修改
        changeOrigin: true,
        pathRewrite: {
          '^/yanchu': ''
        }
      },
      '/abc': { // 这个可以改 
        target: 'http://api.maoyan.com', // 这个根据请求的根路径修改
        changeOrigin: true,
        pathRewrite: {
          '^/abc': ''
        }, // 替换请求路径的字符串
        headers: {
          "Date": "Fri, 30 Sep 2022 07:52:50 GMT",
          "Authorization": "1460c7924b95b953a909e3cbb83e6765",
          "Key": 61091948,
          'Referer': 'http://api.maoyan.com' // 配置这个 解决请求头不能传限制的特殊字符问题 
        }
      },
      '/movie': {
        // http://api.maoyan.com/mmcs/cinema/v1/select/cinemas.json
        target: 'http://api.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/movie': ''
        },
        headers: {
          "Date": "Mon, 10 Oct 2022 01:52:42 GMT",
          "Authorization": "cb195a046a497ee9b51f1411e3f0916d",
          "Key": 23454898,
          'Referer': 'http://api.maoyan.com' // 配置这个 解决请求头不能传限制的特殊字符问题 
        }
      }
    }
  }
})
