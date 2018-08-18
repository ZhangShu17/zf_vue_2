<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">人员添加</h3>
          <hr>
          <form class="form-horizontal">

            <!--区域-->
            <div class="form-group" v-show="!parseInt(type) && !parseInt(userDistrictId)">
              <label for="district" class="col-sm-4 control-label">区域</label>
              <div class="col-sm-6">
                <select class="form-control" id="district" v-model="districtId" >
                  <template v-for="item in allDistricts">
                    <option :value="item.id">{{item.name}}</option>
                  </template>
                </select>
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
              <label for="mobile" class="col-sm-4 control-label">手机</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="mobile" v-model="mobile">
              </div>
            </div>
            <!--职务-->
            <div class="form-group">
              <label for="duty" class="col-sm-4 control-label">职务</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="duty" v-model="duty">
              </div>
            </div>

            <!--层级-->
            <div class="form-group">
              <label for="level" class="col-sm-4 control-label">层级</label>
              <div class="col-sm-6">
                <select class="form-control" id="level" v-model="level" @change="GetList">
                  <template>
                    <option value="1">路</option>
                    <option value="2">段</option>
                    <option value="3">岗</option>
                  </template>
                </select>
              </div>
            </div>

            <!--路-段-岗下拉框-->
            <div class="form-group" v-show="level">
              <label for="road_section_station" class="col-sm-4 control-label" v-if="parseInt(level)===1">路线</label>
              <label for="road_section_station" class="col-sm-4 control-label" v-if="parseInt(level)===2">路段</label>
              <label for="road_section_station" class="col-sm-4 control-label" v-if="parseInt(level)===3">岗哨</label>
              <div class="col-sm-6">
                <select class="form-control" id="road_section_station" v-model="road_section_station">
                  <template v-for="item in road_section_station_list">
                    <option :value="item.id">{{item.id}}-{{item.name}}</option>
                  </template>
                </select>
              </div>
            </div>

            <!--角色-->
            <div class="form-group">
              <label for="role" class="col-sm-4 control-label">角色</label>
              <div class="col-sm-6">
                <select class="form-control" id="role" v-model="role">
                  <template v-if="parseInt(level)===1">
                    <option value="1">路长</option>
                    <option value="2">执行路长(分局)</option>
                    <option value="3">执行路长(交管)</option>
                    <option value="4">执行路长(武警)</option>
                  </template>
                  <template v-if="parseInt(level)===2">
                    <option value="1">段长</option>
                    <option value="2">执行段长(分局)</option>
                    <option value="3">执行段长(交通)</option>
                    <option value="4">执行段长(武警)</option>
                  </template>
                  <template v-if="parseInt(level)===3">
                    <option value="1">岗长(分局)</option>
                    <option value="2">执行岗长(交通)</option>
                  </template>
                </select>
              </div>
            </div>

            <!--&lt;!&ndash;电台信道&ndash;&gt;-->
            <!--<div class="form-group">-->
              <!--<label for="channel" class="col-sm-4 control-label">电台信道</label>-->
              <!--<div class="col-sm-8">-->
                <!--<input type="text" class="form-control" id="channel" v-model="channel">-->
              <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;电台呼号&ndash;&gt;-->
            <!--<div class="form-group">-->
              <!--<label for="callSign" class="col-sm-4 control-label">电台呼号</label>-->
              <!--<div class="col-sm-8">-->
                <!--<input type="text" class="form-control" id="callSign" v-model="callSign">-->
              <!--</div>-->
            <!--</div>-->

            <!--提交按钮-->
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-6">
                <button type="button" class="btn btn-primary btn-block" @click="AddFaculty">提交添加</button>
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
    name: 'addFaculty',
    data () {
      return {
        districtId: localStorage.getItem('districtId'),
        type: '',
        roadId: '',
        sectionId: '',
        stationId: '',
        chiefType: '',
        name: '',
        mobile: '',
        duty: '',
        channel: '',
        userDistrictId: window.localStorage.getItem('districtId'),
        callSign: '',
        level: 0,
        role: '',
        road_section_station: '',
        road_section_station_list: [],
        allDistricts: []
      }
    },
    methods: {
      init: function () {
        console.log('添加人员初始化完成')
        this.type = this.$route.query.type
        this.chiefType = this.$route.query.chiefType
        console.log(this.type)
        console.log('打印ciefType')
        console.log(this.chiefType)
        console.log('打印ciefType  END')
        if (this.type === 1) {
          this.roadId = this.$route.query.roadId
          console.log(this.roadId)
        }
        if (this.type === 2) {
          this.sectionId = this.$route.query.sectionId
          console.log(this.sectionId)
        }
        if (this.type === 3) {
          this.stationId = this.$route.query.stationId
          console.log(this.stationId)
        }
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
      },
      AddFaculty: function () {
        console.log('~~~~~~~~~~~~~~~')
        console.log(this.chiefType)
        console.log('~~~~~end~~~~~~')
        let _this = this
        if (_this.type === 0) {
          let url = config.ROOT_API_URL + 'faculty/edit'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              districtId: _this.districtId,
              name: _this.name,
              mobile: _this.mobile,
              duty: _this.duty,
              channel: _this.channel,
              callSign: _this.callSign,
              level: _this.level,
              role: _this.role,
              road_section_station: _this.road_section_station
            },
            success: function (response) {
              console.log('success')
              _this.$router.push('/facultyList')
            },
            error: function (error) {
              console.log(error)
            }
          })
        }
        if (_this.type === 1) {
          let url = config.ROOT_API_URL + 'road/faculty'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              districtId: _this.districtId,
              roadId: _this.roadId,
              facultyType: _this.chiefType,
              name: _this.name,
              mobile: _this.mobile,
              duty: _this.duty,
              channel: _this.channel,
              callSign: _this.callSign
            },
            success: function (response) {
              console.log('success')
              _this.$router.push({path: '/facultyInfo', query: {type: _this.type, roadId: _this.roadId}})
            },
            error: function (error) {
              console.log(error)
            }
          })
        }
        if (_this.type === 2) {
          let url = config.ROOT_API_URL + 'section/faculty'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              sectionId: _this.sectionId,
              districtId: _this.districtId,
              facultyType: _this.chiefType,
              name: _this.name,
              mobile: _this.mobile,
              duty: _this.duty,
              channel: _this.channel,
              callSign: _this.callSign
            },
            success: function (response) {
              console.log('success')
              _this.$router.push({path: '/facultyInfo', query: {type: _this.type, sectionId: _this.sectionId}})
            },
            error: function (error) {
              console.log(error)
            }
          })
        }
        if (_this.type === 3) {
          let url = config.ROOT_API_URL + 'station/faculty'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,  // 取消异步请求
            data: {
              userName: localStorage.getItem('userName'),
              stationId: _this.stationId,
              districtId: _this.districtId,
              facultyType: _this.chiefType,
              name: _this.name,
              mobile: _this.mobile,
              duty: _this.duty,
              channel: _this.channel,
              callSign: _this.callSign
            },
            success: function (response) {
              console.log('success')
              _this.$router.push({path: '/facultyInfo', query: {type: _this.type, stationId: _this.stationId}})
            },
            error: function (error) {
              console.log(error)
            }
          })
        }
      },
      GetList: function () {
        console.log('12334')
        console.log(this.level)
        let url = ''
        if (parseInt(this.level) === 1) {
          console.log('i am 1')
          url = config.ROOT_API_URL + 'road/edit'
        }
        if (parseInt(this.level) === 2) {
          console.log('i am 2')
          url = config.ROOT_API_URL + 'section/edit'
        }
        if (parseInt(this.level) === 3) {
          console.log('i am 3')
          url = config.ROOT_API_URL + 'station/edit'
        }
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            districtId: _this.districtId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.road_section_station_list = response.data.list
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted () {
      console.log('挂载完成')
      this.initDistrict()
      this.init()
    }
  }
</script>

<style scoped>

</style>
