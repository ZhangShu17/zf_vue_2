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
          <!--学校-->
          <div class="form-group">
            <label for="Uni" class="col-sm-4 control-label">学校</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Uni" placeholder="请输入学校" v-model="school">
            </div>
          </div>
          <!--专业-->
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
          <!--数学-->
          <div class="form-group">
            <label for="Math_score" class="col-sm-4 control-label">数学成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Math_score" placeholder="请输入数学成绩" v-model="math_score">
            </div>
          </div>
          <!--专业课-->
          <div class="form-group">
            <label for="Major_score" class="col-sm-4 control-label">专业成绩</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="Major_score" placeholder="请输入专业课成绩" v-model="major_score">
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
        school: '',
        major: '',
        english_score: '',
        political_score: '',
        math_score: '',
        major_score: ''
      }
    },
    methods: {
      submit_score: function () {
        let url = 'http://test-yikaoyan-api.51easymaster.com/score/'
        let _this = this
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userId: localStorage.getItem('userId'),
            name: _this.name,
            mobile: _this.mobile,
            email: _this.email,
            school: _this.school,
            major: _this.major,
            english_score: _this.english_score,
            political_score: _this.political_score,
            math_score: _this.math_score,
            major_score: _this.major_score,
            amount: _this.get_amount
          },
          success: function (response) {
            console.log(response)
            // 跳转到清单
            _this.$router.push({ name: 'ScoreList' })
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    },
    computed: {
      get_amount: function () {
        return parseInt(this.english_score) + parseInt(this.political_score) +
          parseInt(this.math_score) + parseInt(this.major_score)
      }
    }
  }
</script>

<style scoped>

</style>
