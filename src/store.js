import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var isLogin = true
if (!window.localStorage.getItem('userId')) {
  isLogin = false
}

// 需要维护的状态
const store = new Vuex.Store({
  state: {
    isLogin: isLogin
  },
  mutations: {
    LOGIN_STATE_CHANGED (state, loginState) {
      state.isLogin = loginState
    }
  }
})

export default new Vuex.Store({
  store
})
