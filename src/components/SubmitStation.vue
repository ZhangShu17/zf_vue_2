<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">岗位编辑</h3>
          <hr>
          <form class="form-horizontal">
            <!--岗位id-->
            <div class="form-group" v-show="action === 'Edit'">
              <label for="stationId" class="col-sm-4 control-label">岗位ID</label>
              <div class="col-sm-8">
                <input type="text" disabled="disabled" class="form-control" id="stationId" v-model="stationId">
              </div>
            </div>
            <!--岗位名称-->
            <div class="form-group">
              <label for="stationName" class="col-sm-4 control-label">岗位名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="stationName" v-model="stationName">
              </div>
            </div>
            <!--岗位位置-->
            <div class="form-group">
              <label for="stationLocation" class="col-sm-4 control-label">岗位位置</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="stationLocation" v-model="stationLocation">
              </div>
            </div>
            <!--备注1-->
            <div class="form-group">
              <label for="remark1" class="col-sm-4 control-label">备注1</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="remark1" v-model="remark1">
              </div>
            </div>
            <!--备注2-->
            <div class="form-group">
              <label for="remark2" class="col-sm-4 control-label">备注2</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="remark2" v-model="remark2">
              </div>
            </div>
            <!--备注3-->
            <div class="form-group">
              <label for="remark3" class="col-sm-4 control-label">备注3</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="remark3" v-model="remark3">
              </div>
            </div>
            <!--提交修改按钮-->
            <div class="form-group" v-show="action === 'Edit'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="EditStation">提交修改</button>
              </div>
            </div>
            <!--提交复制按钮-->
            <div class="form-group" v-show="action === 'Copy'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="CopyStation">提交复制</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import config from '../config/config'
    export default {
      name: 'SubmitStation',
      data () {
        return {
          type: '',
          stationId: '',
          sectionId: 0,
          stationName: '',
          stationLocation: '',
          remark1: '',
          remark2: '',
          remark3: '',
          action: ''
        }
      },
      methods: {
        EditStation: function () {
          let _this = this
          let url = config.ROOT_API_URL + 'station/edit'
          $.ajax({
            url: url,
            type: 'PUT',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              stationId: _this.stationId,
              name: _this.stationName,
              location: _this.stationLocation,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            success: function (response) {
              console.log('success')
              if (_this.type === 1) {
                _this.$router.push({path: '/stationList', query: {type: 1, sectionId: _this.sectionId}})
              } else {
                _this.$router.push({path: '/stationList', query: {type: 0}})
              }
            },
            error: function (error) {
              console.log(error)
            }
          })
        },
        CopyStation: function () {
          let _this = this
          let url = config.ROOT_API_URL + 'copy/station'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              stationId: _this.stationId,
              name: _this.stationName,
              location: _this.stationLocation,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            success: function (response) {
              console.log('success')
              if (_this.type === 1) {
                _this.$router.push({path: '/stationList', query: {type: 1, sectionId: _this.sectionId}})
              } else {
                _this.$router.push({path: '/stationList', query: {type: 0}})
              }
            },
            error: function (error) {
              console.log(error)
            }
          })
        },
        init: function () {
          this.type = this.$route.query.type
          this.sectionId = this.$route.query.sectionId
          this.stationId = this.$route.query.stationId
          this.action = this.$route.query.action
          console.log('初始化打印信息')
          console.log(this.type)
          console.log(this.sectionId)
          console.log(this.stationId)
          console.log(this.action)
          console.log('初始化打印信息  END')
          let _this = this
          let url = config.ROOT_API_URL + 'station/edit'
          console.log(this.stationId)
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              stationId: _this.stationId
            },
            async: false,
            success: function (response) {
              console.log(response)
              _this.stationId = response.data.list[0].id
              console.log('stationId:' + response.data.list[0].id)
              _this.stationName = response.data.list[0].name
              if (_this.action === 'Copy') {
                _this.stationName = response.data.list[0].name + '-copy'
              }
              _this.stationLocation = response.data.list[0].location
              _this.remark1 = response.data.list[0].remark1
              _this.remark2 = response.data.list[0].remark2
              _this.remark3 = response.data.list[0].remark3
            },
            error: function (err) {
              console.log(err)
            }
          })
        }
      },
      mounted: function () {
        this.init()
      }
    }
</script>

<style scoped>

</style>
