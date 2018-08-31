<template>
  <div >
    <div class="message warning">
      <div class="inset">
        <div class="login-head">
          <h1>警卫路线“三长制”信息录入系统</h1>
          <div class="alert-close"> </div>
        </div>
        <form>
          <li>
            <input  id="username" type="text" class="text" value="Username" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Username';}" ><a href="#" class=" icon user"></a>
          </li>
          <div class="clear"> </div>
          <li>
            <input id="password" type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"> <a href="#" class="icon lock"></a>
          </li>
          <div class="clear"> </div>
          <div class="submit">
            <input type="submit" @click="login" value="登陆" >
            <h4><a href="#" @click="forgetPwd">忘记密码</a></h4>
            <div class="clear">  </div>
          </div>

        </form>
      </div>
    </div>
    <div class="clear"> </div>
    <!--- footer --->
    <div class="footer">
      <p>Copyright &copy; 2018.</p>
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
        password: '',
        districtId: '',
        login_status: window.localStorage.getItem('login', '0')
      }
    },
    methods: {
      // 提交登陆
      login: function () {
        this.username = document.getElementById('username').value
        this.password = document.getElementById('password').value
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
              // background:url(../static/icons.png)  no-repeat 0px 0px;
              // document.querySelector('body').setAttribute('background','url(../static/icons.png)')
              console.log('login success')
              _this.$router.push({ path: '/serviceLineList' })
              _this.login_status = 1
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
        window.localStorage.setItem('districtList', '1')
        window.localStorage.setItem('login', '1')
      },
      forgetPwd: function () {
        alert('请联系警卫局获取账号信息！')
      },
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
        console.log('hshshhshshshsjjjj')
        console.log(disId)
        console.log('hshshhshshshsjjjj end')
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
        if (parseInt(disId) === 8) {
          return '西站区'
        }
        if (parseInt(disId) === 9) {
          return '顺义区'
        }
      }
    }

  }
</script>

<style scoped src = "../../static/style.css"/>
<style scoped>

</style>
