import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import '@common/stylus/index.styl'

// 去掉移动端点击 300ms 延迟
fastclick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('@common/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
