<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center" v-show="action==='Edit'">路段编辑</h3>
          <h3 align="center" v-show="action==='Copy'">路段复制</h3>
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
            <!--路段坐标-->
            <div class="form-group">
              <label for="xyCoordinate" class="col-sm-4 control-label">路段坐标</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="xyCoordinate" v-model="xyCoordinate">
                <button @click="jump2map">地图画线</button>
              </div>
            </div>

            <!--电台信道-->
            <div class="form-group">
              <label for="channel" class="col-sm-4 control-label">段长电台信道</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="channel" v-model="channel">
              </div>
            </div>

            <!--电台呼号-->
            <div class="form-group">
              <label for="callSign" class="col-sm-4 control-label">段长电台呼号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="callSign" v-model="callSign">
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
          mapType: '',
          roadId: '',
          sectionId: '',
          sectionName: '',
          sectionStart: '',
          sectionEnd: '',
          xyCoordinate: '',
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
          this.mapType = this.$route.query.mapType

          if (parseInt(this.mapType) === 6) {
            this.sectionName = this.$route.query.sectionName
            this.sectionStart = this.$route.query.sectionStart
            this.sectionEnd = this.$route.query.sectionEnd
            this.xyCoordinate = this.$route.query.locationList
            this.remark1 = this.$route.query.remark1
            this.remark2 = this.$route.query.remark2
            this.remark3 = this.$route.query.remark3
            console.log('init,' + 'districtId:' + this.districtId + ',type:' + this.type + ',roadId:' + this.roadId + ',maptype:' + this.mapType + 'sectionName:' + this.sectionName)
          } else {
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
                _this.sectionName = response.data.name
                _this.sectionStart = response.data.startPlace
                _this.sectionEnd = response.data.endPlace
                _this.xyCoordinate = response.data.xyCoordinate
                _this.channel = response.data.channel
                _this.callSign = response.data.callSign
                _this.remark1 = response.data.remark1
                _this.remark2 = response.data.remark2
                _this.remark3 = response.data.remark3
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
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
              XYCOORDINATE: _this.xyCoordinate,
              channel: _this.channel,
              callSign: _this.callSign,
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
              XYCOORDINATE: _this.xyCoordinate,
              channel: _this.channel,
              callSign: _this.callSign,
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
        jump2map: function () {
          console.log('section jump2map')
          this.$router.push({
            path: '/mapOperate',
            query: {
              type: this.type,
              mapType: 6,
              sectionName: this.sectionName,
              sectionId: this.sectionId,
              roadId: this.roadId,
              districtId: this.districtId,
              sectionStart: this.sectionStart,
              sectionEnd: this.sectionEnd,
              locationList: this.xycoordinate,
              remark1: this.remark1,
              remark2: this.remark2,
              remark3: this.remark3
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
