import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import '@common/stylus/index.styl'

// 去掉移动端点击 300ms 延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
