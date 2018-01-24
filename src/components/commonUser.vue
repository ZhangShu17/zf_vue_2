<template>
<div class="container">
    <div class="row">
      <div class="col-md-4 col-lg-offset-4">
        <!-- 登录表单 开始 -->
        <h1>普通用户登录</h1>
        <p>管理员在此
          <router-link :to="{name:'Login'}">
            <a>登录</a>
          </router-link>
        </p>
        <hr>
        <form>
          <p id='error' style="color: red"></p>
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" id="username" name="username" required v-model="username">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" id="password" name="password" required v-model="password">
          </div>
          <p>
            <button class="btn btn-primary btn-block" @click="submit">
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
    export default {
      name: 'commonUser',
      data () {
        return {
          username: '',
          password: ''
        }
      },
      methods: {
        submit: function () {
          let _this = this
          console.log('普通用户登录')
          console.log(_this.username)
          let url = 'https://test-yikaoyan-api.51easymaster.com/score_common/login/'
          console.log('普通用户准备登录')
          $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: {
              username: _this.username,
              password: _this.password
            },
            success: function (response) {
              console.log(response)
              if (response.retCode === 0) {
                console.log('用户名及密码正确')
                window.localStorage.setItem('userName', response.data.userInfo.username)
                _this.$router.push({name: 'SubmitScore', query: {usertype: 'commonuser'}})
                console.log('普通用户登录成功')
              } else {
                alert('用户名或密码错误')
              }
            },
            err: function (err) {
              console.log(err)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
