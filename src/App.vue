<template>
  <div id="app">
    <div class="container">
      <ul class="nav nav-pills">
        <li id="logout" v-if="getUserId()" role="presentation"><router-link to="/logout">退出登陆</router-link></li>
        <li id="login" v-else role="presentation"><router-link to="/login">登陆</router-link></li>
        <li id="serviceLine" role="presentation"><router-link to="/serviceLineList">勤务路线管理</router-link></li>
        <li id="roadList" role="presentation"><router-link :to="{path: '/roadlist', query: {serviceLineId: 0}}">路线管理</router-link></li>
        <li id="sectionList" role="presentation"><router-link :to="{path:'/sectionlist',query: {type: 0}}">路段管理</router-link></li>
        <li id="stationList" role="presentation"><router-link :to="{path: '/stationList', query: {type: 0, sectionId: 0}}">岗哨管理</router-link></li>
        <li id="facultyList" role="presentation"><router-link to="/facultyList">人员管理</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      getUserId: function () {
        console.log('检查退出登录')
        let userName = localStorage.getItem('userName')
        if (userName) {
          console.log('存在')
        } else {
          console.log('不存在')
        }
        return localStorage.getItem('userName')
      }
    }
  }
  $(document).ready(function () {
    $('.nav-pills').on('click', 'li', function () {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })
  })
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
