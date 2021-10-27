import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 依赖挂载
import './utils/relyMount'



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
