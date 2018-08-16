<template>
    <div>
      <h4  v-if="getUserId()">【{{getUserId()}}】【{{getDistrictId()}}】</h4>
      <div class="container">
        <ul class="nav nav-pills">
          <li id="logout" v-if="getUserId()" role="presentation"><router-link to="/logout">退出登陆</router-link></li>
          <li id="login" v-else role="presentation"><router-link to="/login">登陆</router-link></li>
          <li id="serviceLine" role="presentation" v-if="getUserId()"><router-link to="/serviceLineList">勤务路线管理</router-link></li>
          <li id="roadList" role="presentation" v-if="getUserId()"><router-link :to="{path: '/roadlist', query: {serviceLineId: 0}}">路线管理</router-link></li>
          <li id="sectionList" role="presentation" v-if="getUserId()"><router-link :to="{path:'/sectionlist',query: {type: 0}}">路段管理</router-link></li>
          <li id="stationList" role="presentation" v-if="getUserId()"><router-link :to="{path: '/stationList', query: {type: 0, sectionId: 0}}">岗哨管理</router-link></li>
          <li id="facultyList" role="presentation" v-if="getUserId()"><router-link to="/facultyList">人员管理</router-link></li>
        </ul>
         <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MainVue",
      mounted: function(){
        console.log('mainVue mounted')
      },
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
        },
        getDistrictId: function () {
          let disId = window.localStorage.getItem('districtId')
          if (parseInt(disId) === 0) {
            return '警卫营'
          }
          if (parseInt(disId) === 1) {
            return '天安门区'
          }
          if (parseInt(disId) === 2) {
            return '东城区'
          }
          if (parseInt(disId) === 3) {
            this.district = '西城区'
          }
          if (parseInt(disId) === 4) {
            return '朝阳区'
          }
          if (parseInt(disId) === 5) {
            return '海淀区'
          }
          if (parseInt(disId) === 6) {
            return '丰台区'
          }
          if (parseInt(disId) === 7) {
            return '石景山区'
          }
        }
      }
    }
</script>

<style scoped>

</style>
