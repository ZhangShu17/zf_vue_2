<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-lg-offset-4">
        <!-- 登录表单 开始 -->
        <h1>管理员登录</h1>
        <hr>
        <form>
          <p id='error' style="color: red"></p>
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" id="username" name="username" required v-model="username">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="text" class="form-control" id="password" name="password" required v-model="password">
          </div>

          <p>
            <button class="btn btn-primary btn-block" @click="loginPost">
              登录
            </button>
          </p>
        </form>
        <!-- 登录表单 结束 -->
      </div>
    </div>
  </div>

</template>

<script>
  import config from '../config/config'
  // ajax 前置请求头设置token
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
    }
  })
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      // 提交登陆
      loginPost: function () {
        console.log(this.username)
        console.log(this.password)
        let _this = this
        let url = config.ROOT_API_URL + 'faculty/login'
        $.ajax({
          url: url,
          type: 'POST',
          async: false,
          data: {
            userName: _this.username,
            password: _this.password
          },
          success: function (result) {
            // 登陆成功，储存用户信息，跳转
            console.log(result)
            if (result.retCode === 0) {
              _this.$router.push({ path: '/serviceLineList' })
              _this.saveInfo(result)
            } else {
              alert(result.reason)
            }
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      // 保存登陆信息至localstorage
      saveInfo: function (result) {
        console.log(result)
        window.localStorage.setItem('token', result.data.token)
        window.localStorage.setItem('userName', result.data.userName)
        window.localStorage.setItem('districtId', result.data.districtId)
        window.localStorage.setItem('districtList', result.data.districtList)
      }
    }

  }
</script>

<style scoped>

</style>
