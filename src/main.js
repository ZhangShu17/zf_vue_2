// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import 'jquery'

Vue.config.productionTip = false
Vue.use(Vuex)

/* eslint-disable no-new */
// eslint-disable-next-line
/* eslint-disable */
// 创建根实例
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
