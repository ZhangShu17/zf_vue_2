<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">路段编辑</h3>
          <hr>
          <form class="form-horizontal">
            <!--路段id-->
            <div class="form-group" v-show="action === 'Edit'">
              <label for="sectionId" class="col-sm-4 control-label">路段ID</label>
              <div class="col-sm-8">
                <input type="text" disabled="disabled" class="form-control" id="sectionId" v-model="sectionId">
              </div>
            </div>
            <!--路段名称-->
            <div class="form-group">
              <label for="sectionName" class="col-sm-4 control-label">路段名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="sectionName" v-model="sectionName">
              </div>
            </div>
            <!--路段起点-->
            <div class="form-group">
              <label for="sectionStart" class="col-sm-4 control-label">路段起点</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="sectionStart" v-model="sectionStart">
              </div>
            </div>
            <!--路段终点-->
            <div class="form-group">
              <label for="sectionEnd" class="col-sm-4 control-label">路段终点</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="sectionEnd" v-model="sectionEnd">
              </div>
            </div>
            <!--起点坐标-->
            <div class="form-group">
              <label for="startPoint" class="col-sm-4 control-label">起点坐标</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="startPoint" v-model="startPoint">
              </div>
            </div>
            <!--终点坐标-->
            <div class="form-group">
              <label for="endPoint" class="col-sm-4 control-label">终点坐标</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="endPoint" v-model="endPoint">
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
            <!--提交按钮-->
            <div class="form-group" v-show="action === 'Edit'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="EditSection">提交修改</button>
              </div>
            </div>
            <!--提交复制-->
            <div class="form-group" v-show="action === 'Copy'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="CopySection">提交复制</button>
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
      name: 'editSection',
      data () {
        return {
          type: '',
          roadId: '',
          sectionId: '',
          sectionName: '',
          sectionStart: '',
          sectionEnd: '',
          startPoint: '',
          endPoint: '',
          remark1: '',
          remark2: '',
          remark3: '',
          action: ''
        }
      },
      methods: {
        init: function () {
          this.type = this.$route.query.type
          this.sectionId = this.$route.query.sectionId
          this.roadId = this.$route.query.roadId
          this.action = this.$route.query.action
          let url = config.ROOT_API_URL + 'section/single'
          let _this = this
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              sectionId: _this.sectionId
            },
            async: false,
            success: function (response) {
              console.log(response)
              _this.sectionName = response.data.name
              if (_this.action === 'Copy') {
                _this.sectionName = response.data.name + '-copy'
              }
              _this.sectionStart = response.data.startPlace
              _this.sectionEnd = response.data.endPlace
              _this.startPoint = response.data.startPoint
              _this.endPoint = response.data.endPoint
              _this.remark1 = response.data.remark1
              _this.remark2 = response.data.remark2
              _this.remark3 = response.data.remark3
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        EditSection: function () {
          let url = config.ROOT_API_URL + 'section/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'PUT',
            data: {
              userName: localStorage.getItem('userName'),
              sectionId: _this.sectionId,
              name: _this.sectionName,
              startPlace: _this.sectionStart,
              endPlace: _this.sectionEnd,
              startPoint: _this.startPoint,
              endPoint: _this.endPoint,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            async: false,
            success: function (response) {
              console.log('success')
              console.log(response)
              if (_this.type === 1) {
                _this.$router.push({path: '/sectionlist', query: {type: 1, roadId: _this.roadId}})
              } else {
                _this.$router.push({path: '/sectionlist', query: {type: 0}})
              }
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        CopySection: function () {
          let url = config.ROOT_API_URL + 'copy/section'
          let _this = this
          $.ajax({
            url: url,
            type: 'POST',
            data: {
              userName: localStorage.getItem('userName'),
              sectionId: _this.sectionId,
              name: _this.sectionName,
              startPlace: _this.sectionStart,
              endPlace: _this.sectionEnd,
              startPoint: _this.startPoint,
              endPoint: _this.endPoint,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            async: false,
            success: function (response) {
              console.log('success')
              console.log(response)
              if (_this.type === 1) {
                _this.$router.push({path: '/sectionlist', query: {type: 1, roadId: _this.roadId}})
              } else {
                _this.$router.push({path: '/sectionlist', query: {type: 0}})
              }
            },
            error: function (err) {
              console.log(err)
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
