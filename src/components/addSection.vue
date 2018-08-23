<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">添加路段</h3>
          <hr>
          <form class="form-horizontal">
            <!--区域-->
            <div class="form-group" v-show="!parseInt(userDistrictId) && !parseInt(type)">
              <label for="district" class="col-sm-4 control-label">区域</label>
              <div class="col-sm-8">
                <select class="form-control" id="district" v-model="districtId">
                  <template v-for="item in allDistricts">
                    <option :value="item.id">{{item.name}}</option>
                  </template>
                </select>
              </div>
            </div>
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
              <label for="xycoordinate" class="col-sm-4 control-label">路段坐标</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="xycoordinate" v-model="xycoordinate">
                <button @click="jump2map">地图</button>
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
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="AddSection">提交添加</button>
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
      name: 'addSection',
      data () {
        return {
          type: '',
          roadId: '',
          districtId: '',
          // sectionId: '',
          sectionName: '',
          sectionStart: '',
          sectionEnd: '',
          xycoordinate: '',
          remark1: '',
          remark2: '',
          remark3: '',
          channel: '1W',
          callSign: '',
          userDistrictId: '',
          allDistricts: []
        }
      },
      methods: {
        init: function () {
          this.type = this.$route.query.type
          // this.sectionId = this.$route.query.sectionId
          this.roadId = this.$route.query.roadId
          this.mapType = this.$route.query.mapType

          if (parseInt(this.mapType) === 4) {
            this.districtId = this.$route.query.districtId
            this.sectionName = this.$route.query.sectionName
            this.sectionStart = this.$route.query.sectionStart
            this.sectionEnd = this.$route.query.sectionEnd
            this.xycoordinate = this.$route.query.locationList
            this.remark1 = this.$route.query.remark1
            this.remark2 = this.$route.query.remark2
            this.remark3 = this.$route.query.remark3
            console.log('init,' + 'districtId:' + this.districtId + ',type:' + this.type + ',roadId:' + this.roadId + ',maptype:' + this.mapType + 'sectionName:' + this.sectionName)
          }
        },
        AddSection: function () {
          let url = config.ROOT_API_URL + 'section/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'POST',
            data: {
              userName: localStorage.getItem('userName'),
              roadId: _this.roadId,
              districtId: _this.districtId,
              name: _this.sectionName,
              startPlace: _this.sectionStart,
              endPlace: _this.sectionEnd,
              XYCOORDINATE: _this.xycoordinate,
              channel: _this.channel,
              callSign: _this.callSign,
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
        jump2map: function () {
          console.log('section jump2map')
          this.$router.push({
            path: '/mapOperate',
            query: {
              type: this.type,
              mapType: 4,
              sectionName: this.sectionName,
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
        },
        initDistrict: function () {
          let url = config.ROOT_API_URL + 'district/lists'
          let _this = this
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName')
            },
            success: function (response) {
              _this.allDistricts = response.districtList
            },
            error: function (err) {
              console.log(err)
            }
          })
        }
      },
      mounted () {
        this.districtId = window.localStorage.getItem('districtId')
        this.userDistrictId = window.localStorage.getItem('districtId')
        this.init()
        this.initDistrict()
      }
    }
</script>

<style scoped>

</style>
