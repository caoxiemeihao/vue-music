const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@api': path.join(__dirname, 'src/api'),
        '@base': path.join(__dirname, 'src/base'),
        '@comps': path.join(__dirname, 'src/components'),
        '@common': path.join(__dirname, 'src/common'),
        '@store': path.join(__dirname, 'src/store'),
      }
    }
  },
  devServer: {
    proxy: {
      '/api/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        bypass: function(req, res, proxyOptions) {
          req.headers = { // 指定qq音乐需要的请求头
            ...req.headers,
            referer: 'https://c.y.qq.com',
            host: 'https://c.y.qq.com',
          }
        },
        pathRewrite: { '/api/getDiscList': '' } // pathRewrite 来重写地址，将前缀 '/api/getDiscList' 转为 '/'。
      },
      '/api/lyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
        secure: false,
        changeOrigin: true,
        bypass: function(req, res, proxyOptions) {
          req.headers = {
            ...req.headers,
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com',
          }
        },
        pathRewrite: { '/api/lyric': '' }
      }
    }
  },
};