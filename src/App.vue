<template >
  <div id="app">
    <div v-if="!login_status">
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

    <div v-if="login_status">
      <div class="container" style="width: 1000px ;margin-left: 80px">
        <ul class="nav nav-pills">
          <li id="logout" role="presentation"><router-link to="/logout">账号信息</router-link></li>
          <li id="serviceLine" role="presentation" v-if="getUserId()"><router-link to="/serviceLineList">勤务管理</router-link></li>
          <li id="roadList" role="presentation" v-if="getUserId()"><router-link :to="{path: '/roadlist', query: {serviceLineId: 0}}">路线管理</router-link></li>
          <li id="sectionList" role="presentation" v-if="getUserId()"><router-link :to="{path:'/sectionlist',query: {type: 0}}">路段管理</router-link></li>
          <li id="stationList" role="presentation" v-if="getUserId()"><router-link :to="{path: '/stationList', query: {type: 0, sectionId: 0}}">岗哨管理</router-link></li>
          <li id="facultyList" role="presentation" v-if="getUserId()"><router-link to="/facultyList">人员管理</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import config from './config/config'
  export default {
    name: 'app',
    data () {
      return {
        username: '',
        password: '',
        refresh: true,
        districtId: '',
        login_status: window.localStorage.getItem('login', '0')
      }
    },
    methods: {

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
    },
    mounted: function () {
      console.log('app mounted,login state:' + window.localStorage.getItem('login', '0'))
    }
  }
  $(document).ready(function () {
    this.login_status = window.localStorage.getItem('login', 0)
    window.localStorage.setItem('refresh', '1')
    $('.nav-pills').on('click', 'li', function () {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })
  })
</script>

<style scoped src = "../static/style.css"/>
<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
