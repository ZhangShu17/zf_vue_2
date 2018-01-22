<template>
  <div id="app">
    <div class="container">
      <ul class="nav nav-pills">
        <li v-if="getUserId()" role="presentation"><router-link to="/logout">退出登陆</router-link></li>
        <li v-else role="presentation"><router-link to="/login">登陆</router-link></li>
        <li role="presentation" class="active"><router-link to="/submitscore">录入成绩</router-link></li>
        <li role="presentation"><router-link to="/scorelist">成绩列表</router-link></li>
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
