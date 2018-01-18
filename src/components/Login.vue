<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-lg-offset-4">
        <!-- 登录表单 开始 -->
        <h1>Admin Login</h1>
        <hr>
        <form>
          <p id='error' style="color: red"></p>
          <div class="form-group">
            <label for="mobile">手机号</label>
            <input type="text" class="form-control" id="mobile" name="mobile" required v-model="mobile">
          </div>

          <div class="form-group">
            <label for="verifyCode">短信验证码</label>
            <div class="row">
            <div class="col-md-7">
            <input  id="verifyCode" type="text" class="form-control" v-model="verifyCode" required>
            </div>
              <div class="col-md-5">
                <span v-if="flag">
            <button type="button" class="btn btn-info btn-block verify-code" @click="getVerifyCode">{{ title }}</button>
                  </span>
                <span v-else>
                  <button type="button" class="btn btn-info btn-block verify-code">{{ title }}</button>
                </span>
              </div>
          </div>
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
  // ajax 前置请求头设置
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
    }
  })

  export default {
    name: 'login',
    data () {
      return {
        flag: true,
        mobile: '',
        verifyCode: '',
        title: '获取验证码',
        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ // 匹配手机号码
      }
    },
    methods: {
      // 获取验证码
      getVerifyCode: function () {
        let btn = document.getElementsByClassName('verify-code')[0]
        // 解除事件绑定
        this.flag = false
        btn.classList.add('disabled')
        let wait = 60
        let _this = this
        // 验证合法手机号：请求验证码、倒计时
        if (_this.mobile.match(_this.pattern)) {
          // 发送请求
          let url = 'https://test-yikaoyan-api.51easymaster.com/admin/admin/login/?mobile=' + _this.mobile
          $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
              console.log(response)
            },
            error: function (error) {
              alert('err')
              console.log(error)
            }
          })
          // 倒计时
          let timer = setInterval(function () {
            wait--
            if (wait !== 0) {
              _this.title = wait + 's后重发'
            } else {
              btn.classList.remove('disabled')
              _this.flag = true
              _this.title = '获取验证码'
              clearInterval(timer)
            }
          }, 1000)
        } else {
          alert('请输入有效的手机号！')
        }
      },
      // 提交登陆
      loginPost: function () {
        let _this = this
        let url = 'https://test-yikaoyan-api.51easymaster.com/admin/admin/login/?mobile=' + this.mobile
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            mobile: _this.mobile,
            verifyCode: _this.verifyCode
          },
          success: function (result) {
            // 登陆成功，储存用户信息，跳转
            // alert(result.data.token)
            _this.saveInfo(result)
            _this.$router.push({ name: 'SubmitScore' })
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
        window.localStorage.setItem('userId', result.data.adminId)
        window.localStorage.setItem('userName', result.data.username)
        window.localStorage.setItem('userAccout', result.data.mobile)
        window.localStorage.setItem('userType', 'admin')
        window.localStorage.setItem('tokenExpire', new Date().getTime() + result.data.expire * 1000)
      }
    }

  }
</script>

<style scoped>

</style>
