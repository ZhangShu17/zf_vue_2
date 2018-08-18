<template>
  <div>
    <div class="container" id="edit_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">人员添加</h3>
          <hr>
          <form class="form-horizontal">
            <!--区域-->
            <div class="form-group" v-show="!parseInt(userDistrictId)">
              <label for="district" class="col-sm-4 control-label">路线区域</label>
              <div class="col-sm-8">
                <select class="form-control" id="district" v-model="districtId">
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
        type: '',
        roadId: '',
        sectionId: '',
        stationId: '',
        chiefType: '',
        name: '',
        mobile: '',
        duty: '',
        channel: '',
        callSign: '',
        districtId: '',
        userDistrictId: window.localStorage.getItem('districtId'),
        allDistricts:[]
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
              callSign: _this.callSign
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
              districtId: localStorage.getItem('districtId'),
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
              districtId: localStorage.getItem('districtId'),
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
              districtId: localStorage.getItem('districtId'),
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
