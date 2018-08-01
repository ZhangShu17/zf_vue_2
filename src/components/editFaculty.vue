<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">人员编辑</h3>
          <hr>
          <form class="form-horizontal">
            <!--id-->
            <div class="form-group">
              <label for="id" class="col-sm-4 control-label">人员ID</label>
              <div class="col-sm-8">
                <input type="text" disabled="disabled" class="form-control" id="id" v-model="facultyId">
              </div>
            </div>
            <!--姓名-->
            <div class="form-group">
              <label for="name" class="col-sm-4 control-label">姓名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
            </div>
            <!--手机-->
            <div class="form-group">
              <label for="mobile" class="col-sm-4 control-label">手机号</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="mobile" v-model="mobile">
              </div>
            </div>
            <!--职务-->
            <div class="form-group">
              <label for="duty" class="col-sm-4 control-label">职务</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="duty" v-model="duty">
              </div>
            </div>
            <!--电台信道-->
            <div class="form-group">
              <label for="channel" class="col-sm-4 control-label">电台信道</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="channel" v-model="channel">
              </div>
            </div>
            <!--电台呼号-->
            <div class="form-group">
              <label for="callSign" class="col-sm-4 control-label">电台呼号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="callSign" v-model="callSign">
              </div>
            </div>

            <!--提交按钮-->
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="EditFaculty">提交修改</button>
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
      name: 'editFaculty',
      data () {
        return {
          type: '',
          facultyId: '',
          roadId: '',
          sectionId: '',
          stationId: '',
          name: '',
          mobile: '',
          duty: '',
          channel: '',
          callSign: ''
        }
      },
      methods: {
        init: function () {
          this.type = this.$route.query.type
          this.facultyId = this.$route.query.facultyId
          if (this.type === 1) {
            this.roadId = this.$route.query.roadId
          }
          if (this.type === 2) {
            this.sectionId = this.$route.query.sectionId
          }
          if (this.type === 3) {
            this.stationId = this.$route.query.stationId
          }
          let url = 'http://127.0.0.1:8000/faculty/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              facultyId: _this.facultyId
            },
            async: false,
            success: function (response) {
              console.log('人员编辑初始化成功')
              console.log(response)
              _this.name = response.data.name
              _this.mobile = response.data.mobile
              _this.duty = response.data.duty
              _this.channel = response.data.channel
              _this.callSign = response.data.callSign
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        EditFaculty: function () {
          let _this = this
          let url = 'http://127.0.0.1:8000/faculty/edit'
          $.ajax({
            url: url,
            type: 'PUT',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              facultyId: _this.facultyId,
              name: _this.name,
              mobile: _this.mobile,
              duty: _this.duty,
              channel: _this.channel,
              callSign: _this.callSign
            },
            success: function (response) {
              console.log('success')
              if (_this.type === 0) {
                _this.$router.push('/facultyList')
              }
              if (_this.type === 1) {
                _this.$router.push({path: '/facultyInfo', query: {type: _this.type, roadId: _this.roadId}})
              }
              if (_this.type === 2) {
                _this.$router.push({path: '/facultyInfo', query: {type: _this.type, sectionId: _this.sectionId}})
              }
              if (_this.type === 3) {
                _this.$router.push({path: '/facultyInfo', query: {type: _this.type, stationId: _this.stationId}})
              }
            },
            error: function (error) {
              console.log(error)
            }
          })
        }
      },
      mounted () {
        this.init()
      }
    }
</script>

<style scoped>

</style>
