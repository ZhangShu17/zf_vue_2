import Vue from 'vue'
import Router from 'vue-router'
import ScoreList from '@/components/ScoreList'
import SubmitScore from '@/components/SubmitScore'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/submitscore',
      name: 'SubmitScore',
      component: SubmitScore
    },
    {
      path: '/scorelist',
      name: 'ScoreList',
      component: ScoreList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
