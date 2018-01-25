<template>
  <div>
  <div class="container" id="app_student_score">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center">易考研学员信息录入</h3>
        <hr>
        <form class="form-horizontal">
          <!--姓名-->
          <div class="form-group">
            <label for="Name" class="col-sm-4 control-label">姓名</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Name" placeholder="请输入姓名" v-model="name">
            </div>
          </div>
          <!--电话-->
          <div class="form-group">
            <label for="Tele" class="col-sm-4 control-label">电话</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Tele" placeholder="请输入电话" v-model="mobile">
            </div>
          </div>
          <!--邮箱-->
          <div class="form-group">
            <label for="Email" class="col-sm-4 control-label">邮箱</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="Email" placeholder="请输入邮箱" v-model="email">
            </div>
          </div>
          <!--QQ-->
          <div class="form-group">
            <label for="QQ" class="col-sm-4 control-label">QQ</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="QQ" placeholder="请输入QQ号" v-model="qq">
            </div>
          </div>
          <!--&lt;!&ndash;地区&ndash;&gt;-->
          <!--<div class="form-group">-->
            <!--<label for="District" class="col-sm-4 control-label">地区</label>-->
            <!--<div class="col-sm-8">-->
              <!--<select class="form-control" id="District" v-model="state_selected_id" @change="uni_state">-->
                <!--<template v-for="(state,index) in states">-->
                  <!--<option v-if="index === 0" v-bind:label="state.name" v-bind:value="state.id" selected="selected">{{state.name}}</option>-->
                  <!--<option v-else v-bind:label="state.name" v-bind:value="state.id">{{state.name}}</option>-->
                <!--</template>-->
              <!--</select>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;学校&ndash;&gt;-->
          <!--<div class="form-group">-->
            <!--<label for="University" class="col-sm-4 control-label">学校</label>-->
            <!--<div class="col-sm-8">-->
              <!--<select class="form-control" id="University" v-model="university">-->
                <!--<template v-for="(uni,index) in university_list">-->
                  <!--<option v-if="index === 0" selected="selected" v-bind:label="uni.name" v-bind:value="uni.id">{{uni.name}}</option>-->
                  <!--<option v-else v-bind:label="uni.name" v-bind:value="uni.id">{{uni.name}}</option>-->
                <!--</template>-->
              <!--</select>-->
            <!--</div>-->
          <!--</div>-->
          <!--学校-->
          <div class="form-group">
            <label for="School" class="col-sm-4 control-label">报考学校代码</label>
            <div class="col-sm-8">
              <input type="number" class="form-control" id="School" placeholder="请输入学校代码" v-model="university">
            </div>
          </div>
          <!--报考专业-->
          <div class="form-group">
            <label for="Major" class="col-sm-4 control-label">报考专业</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Major" placeholder="请输入专业名称" v-model="major">
            </div>
          </div>
          <!--英语-->
          <div class="form-group">
            <label for="English_score" class="col-sm-4 control-label">英语成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="English_score" placeholder="请输入英语成绩" v-model="english_score">
            </div>
          </div>
          <!--政治-->
          <div class="form-group">
            <label for="Political_score" class="col-sm-4 control-label">政治成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Political_score" placeholder="请输入政治成绩" v-model="political_score">
            </div>
          </div>
          <!--专业1成绩-->
          <div class="form-group">
            <label for="Major1_score" class="col-sm-4 control-label">专业一成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Major1_score" placeholder="请输入数学成绩" v-model="major1_score">
            </div>
          </div>
          <!--专业课-->
          <div class="form-group">
            <label for="Major2_score" class="col-sm-4 control-label">专业二成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Major2_score" placeholder="请输入专业课成绩" v-model="major2_score" required>
            </div>
          </div>
          <!--总分-->
          <div class="form-group">
            <label for="Amount_score" class="col-sm-4 control-label">考研总分</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Amount_score" placeholder="请输入总分" v-model="get_amount">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="submit_score">提交</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'SubmitScore',
    data () {
      return {
        name: '',
        mobile: '',
        email: '',
        // 删除school
        // school: '',
        major: '',
        qq: '',
        english_score: 0,
        political_score: 0,
        major1_score: 0,
        major2_score: 0,
        states: [],
        university_list: [],
        state_selected_id: '',
        university: '',
        state_selected: '',
        usertype: this.$route.query.usertype
      }
    },
    methods: {
      submit_score: function () {
        console.log(localStorage.getItem('userType'))
        let _this = this
        console.log(_this.username)
        console.log(_this.university)
        console.log(_this.usertype)
        var url = ''
        if (localStorage.getItem('userType') === 'admin') {
          url = 'https://test-yikaoyan-api.51easymaster.com/score/'
        } else if (localStorage.getItem('userType') === 'commonuser') {
          url = 'https://test-yikaoyan-api.51easymaster.com/score_common/submit/'
        } else {
          alert('未登录，无此权限')
          return
        }
        $.ajax({
          url: url,
          type: 'POST',
          async: false,
          data: {
            userId: localStorage.getItem('userId'),
            name: _this.name,
            mobile: _this.mobile,
            // 添加qq
            qq: _this.qq,
            email: _this.email,
            // 添加高校
            school: _this.university,
            major: _this.major,
            english_score: _this.english_score,
            political_score: _this.political_score,
            major1_score: _this.major1_score,
            major2_score: _this.major2_score,
            amount: _this.get_amount
          },
          success: function (response) {
            console.log('success')
            console.log(response)
            if (window.localStorage.getItem('userType') === 'commonuser') {
              if (response.retCode === -1) {
                alert('提交失败，' + response.data.error)
              } else {
                alert('提交成功！')
              }
            } else {
              alert('提交成功！')
              _this.$router.push({ name: 'ScoreList' })
            }
            // 跳转到清单
            // _this.$router.push({ name: 'ScoreList' })
          },
          error: function (err) {
            alert('提交失败！')
            console.log(err)
          }
        })
      }
      // uni_state: function () {
      //   let url = 'https://yikaoyan-api.51easymaster.com/admin/university/list/'
      //   let _this = this
      //   $.ajax({
      //     url: url,
      //     type: 'GET',
      //     data: {
      //       stateId: _this.state_selected_id
      //     },
      //     success: function (response) {
      //       console.log('我点击了地区了哦')
      //       _this.university_list = response.data.university
      //     },
      //     error: function (err) {
      //       console.log(err)
      //     }
      //   })
      // }
    },
    // mounted: function () {
    //   let url1 = 'https://yikaoyan-api.51easymaster.com/admin/state/'
    //   let _this = this
    //   $.ajax({
    //     url: url1,
    //     type: 'GET',
    //     success: function (response) {
    //       console.log(response)
    //       _this.states = response.data.states
    //     },
    //     error: function (err) {
    //       console.log(err)
    //     }
    //   })
    //   let url2 = 'https://yikaoyan-api.51easymaster.com/admin/university/list/?stateId=3&hasCourse=0'
    //   $.ajax({
    //     url: url2,
    //     type: 'GET',
    //     success: function (response) {
    //       console.log(response)
    //       _this.university_list = response.data.university
    //     },
    //     error: function (err) {
    //       console.log(err)
    //     }
    //   })
    // },
    computed: {
      get_amount: function () {
        return parseInt(this.english_score) + parseInt(this.political_score) +
          parseInt(this.major1_score) + parseInt(this.major2_score)
      }
    }
  }
</script>

<style scoped>

</style>
