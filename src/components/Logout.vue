<template>
  <div class="container">
    <div class="col-md-12">
      <hr>
      <h3>账户：{{username}}</h3>
      <h3>区域：{{district}}</h3>
     <button class="btn btn-danger" @click="logout">退出登陆</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'logout',
      data () {
        return {
          username: '',
          password: '',
          district: ''
        }
      },
      methods: {
        logout: function () {
          localStorage.clear()
          this.login_status = 0
          this.$router.go(0)
        }
      },
      mounted: function () {
        this.username = window.localStorage.getItem('userName')
        let disId = window.localStorage.getItem('districtId')
        if (parseInt(disId) === 0) {
          this.district = '警卫局'
        }
        if (parseInt(disId) === 1) {
          this.district = '天安门区'
        }
        if (parseInt(disId) === 2) {
          this.district = '东城区'
        }
        if (parseInt(disId) === 3) {
          this.district = '西城区'
        }
        if (parseInt(disId) === 4) {
          this.district = '朝阳区'
        }
        if (parseInt(disId) === 5) {
          this.district = '海淀区'
        }
        if (parseInt(disId) === 6) {
          this.district = '丰台区'
        }
        if (parseInt(disId) === 7) {
          this.district = '石景山区'
        }
        if (parseInt(disId) === 8) {
          this.district = '西站'
        }
        if (parseInt(disId) === 9) {
          this.district = '顺义区'
        }
        if (!window.localStorage.getItem('userName')) {
          this.$router.push({name: 'Login'})
        }
      }
    }
</script>

<style scoped>

</style>
