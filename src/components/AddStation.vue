<template>
  <div>
    <div class="container" id="add_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">添加岗位</h3>
          <hr>
          <form class="form-horizontal">
            <!--区域-->
            <div class="form-group" v-show="!parseInt(userDistrictId) && !parseInt(type)">
              <label for="district" class="col-sm-4 control-label">区域</label>
              <div class="col-sm-8">
                <select class="form-control" id="district" v-model="districtId" >
                  <template v-for="item in allDistricts">
                    <option :value="item.id">{{item.name}}</option>
                  </template>
                </select>
              </div>
            </div>
            <!--岗位名称-->
            <div class="form-group">
              <label for="name" class="col-sm-4 control-label">岗位名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
            </div>
            <!--岗位坐标-->
            <div class="form-group">
              <label for="location" class="col-sm-4 control-label">岗位坐标</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="location" v-model="location">
                <button type="button" @click="jump2mapOperate">地图选点</button>
              </div>
            </div>
            <!--电台信道-->
            <div class="form-group">
              <label for="channel" class="col-sm-4 control-label">岗长电台信道</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="channel" v-model="channel">
              </div>
            </div>
            <!--电台呼号-->
            <div class="form-group">
              <label for="call_sign" class="col-sm-4 control-label">岗长电台呼号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="call_sign" v-model="call_sign">
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
                <button type="button" class="btn btn-primary btn-block" @click="AddStation">提交</button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="goBack">返回</button>
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
      name: 'AddStation',
      data () {
        return {
          name: '',
          type: '',
          mapType: '',
          location: '',
          channel: '1W',
          call_sign: '',
          remark1: '',
          remark2: '',
          remark3: '',
          sectionId: '',
          districtId: window.localStorage.getItem('districtId'),
          userDistrictId: window.localStorage.getItem('districtId'),
          allDistricts: []
        }
      },
      methods: {
        AddStation: function () {
          console.log('信道')
          console.log(this.call_sign)
          console.log('呼号')
          console.log(this.channel)
          if (!this.districtId) {
            alert('请选择地区')
          }else if(this.call_sign.trim() == '' || this.channel.trim() == ''){
            alert('请填入信道和呼号')
          } else {
            let _this = this
            let url = config.ROOT_API_URL + 'station/edit'
            console.log(window.localStorage.getItem('districtId'))
            console.log('type:'+this.type)
            $.ajax({
              url: url,
              type: 'POST',
              data: {
                districtId: _this.districtId,
                userName: localStorage.getItem('userName'),
                name: _this.name,
                location: _this.location,
                sectionId: _this.sectionId,
                channel: _this.channel,
                callSign: _this.call_sign,
                remark1: _this.remark1,
                remark2: _this.remark2,
                remark3: _this.remark3
              },
              success: function (response) {
                console.log(response)
                if (_this.type == 1) {
                  _this.$router.push({
                    path: '/stationList',
                    query: {
                      type: 1,
                      sectionId: _this.sectionId
                    }
                  })
                } else {
                  _this.$router.push({path: '/stationList', query: {type: 0}})
                }
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
        },
        goBack: function (){
          if (this.type == 1) {
            this.$router.push({
              path: '/stationList',
              query: {
                type: 1,
                sectionId: this.sectionId
              }
            })
          } else {
            this.$router.push({path: '/stationList', query: {type: 0}})
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
        jump2mapOperate: function () {
          console.log('jump2map,districtId:' + this.districtId + 'sectionId:' + this.sectionId)
          this.$router.push({
            path: '/mapOperate',
            query: {
              type: this.type,
              mapType: 3,
              name: this.name,
              districtId: this.districtId,
              location: this.location,
              remark1: this.remark1,
              remark2: this.remark2,
              remark3: this.remark3,
              sectionId: this.sectionId
            }
          })
        }
      },

      mounted: function () {
        this.type = this.$route.query.type
        this.mapType = this.$route.query.mapType
        this.sectionId = this.$route.query.sectionId
        console.log('打印type')
        console.log(this.type)
        if (parseInt(this.mapType) === 3) {
          this.districtId = this.$route.query.districtId
          this.name = this.$route.query.name
          this.location = this.$route.query.location
          this.remark1 = this.$route.query.remark1
          this.remark2 = this.$route.query.remark2
          this.remark3 = this.$route.query.remark3
        }
        this.initDistrict()

      }
    }
</script>

<style scoped>

</style>
