const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@api': path.join(__dirname, 'src/api'),
        '@comp': path.join(__dirname, 'src/components'),
        '@common': path.join(__dirname, 'src/common'),
        '@store': path.join(__dirname, 'src/store'),
      }
    }
  },
};