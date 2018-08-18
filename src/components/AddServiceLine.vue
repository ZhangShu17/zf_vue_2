<template>
  <div>
    <div class="container" id="add_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">添加勤务路线</h3>
          <hr>
          <form class="form-horizontal">
            <!--勤务路线名称-->
            <div class="form-group">
              <label for="name" class="col-sm-4 control-label">勤务名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
            </div>
            <!--勤务路线起点-->
            <div class="form-group">
              <label for="startPlace" class="col-sm-4 control-label">勤务起点</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="startPlace" v-model="startPlace">
              </div>
            </div>
            <!--勤务路线终点-->
            <div class="form-group">
              <label for="endPlace" class="col-sm-4 control-label">勤务终点</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="endPlace" v-model="endPlace">
              </div>
            </div>
            <!--勤务日期-->
            <div class="form-group">
              <label for="time" class="col-sm-4 control-label">勤务日期</label>
              <div class="col-sm-8">
                <input type="date" class="form-control" id="time" v-model="time">
              </div>
            </div>
            <!--勤务地区-->
            <div class="form-group">
              <label class="col-sm-4 control-label">勤务地区</label>
              <div>
                <template v-for="district in allDistricts">
                <label><input type="checkbox" class="col-sm-2" v-model="chosedDistrictIds" :value="district.id"/>{{district.name}}</label>
                </template>
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
              <div class="col-sm-8" >
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
              <div class="col-sm-offset-4 col-sm-4">
                <button type="button" class="btn btn-primary btn-block" @click="AddServiceLine">提交</button>
              </div>
              <div class="col-sm-offset-4 col-sm-4" >
                <button type="button" class="btn btn-primary btn-block" @click="">返回</button>
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
    name: 'AddServiceLine',
    data () {
      return {
        name: '',
        serviceLineId: '',
        type: '',
        startPlace: '',
        endPlace: '',
        time: '',
        allDistricts: '',
        chosedDistricts: '',
        chosedDistrictIds: [],
        remark1: '',
        remark2: '',
        remark3: ''
      }
    },
    methods: {
      AddServiceLine: function () {
        console.log(this.chosedDistrictIds)
        let _this = this
        let url = config.ROOT_API_URL + 'server_line/edit'
        let strDistrictIds = ''
        for (let i = 0; i < _this.chosedDistrictIds.length; i++) {
          if (i !== _this.chosedDistrictIds.length - 1) {
            strDistrictIds += _this.chosedDistrictIds[i] + '-'
          } else {
            strDistrictIds += _this.chosedDistrictIds[i]
          }
        }
        console.log(strDistrictIds)
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            name: _this.name,
            time: _this.time,
            startPlace: _this.startPlace,
            endPlace: _this.endPlace,
            districtStr: strDistrictIds,
            remark1: _this.remark1,
            remark2: _this.remark2,
            remark3: _this.remark3
          },
          success: function (response) {
            console.log(response)
            _this.$router.push('/serviceLineList')
          },
          error: function (err) {
            console.log(err)
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
            console.log(_this.allDistricts)
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted: function () {
      this.initDistrict()
      console.log('AddServiceLIne' + 'mounted')
      this.type = this.$route.query.type
      console.log('serverLineId:' + this.$route.query.serverLineId)
      // type - 0 新增 type -1 修改
      if (this.type === 1) {
        // 通过servieLineId 获取具体信息
        let serviceLineId = this.$route.query.serverLineId
        let _this = this
        $.ajax({
          url: config.ROOT_API_URL + 'server_line/edit',
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            server_line_id: serviceLineId
          },
          success: function (response) {
            _this.serviceLineId = response.data[0].id
            _this.name = response.data[0].name
            _this.startPlace = response.data[0].startPlace
            _this.endPlace = response.data[0].endPlace
            _this.time = response.data[0].time
            _this.chosedDistricts = response.data[0].district
            for (let i = 0; i < _this.chosedDistricts.length; i++) {
              _this.chosedDistrictIds[i] = _this.chosedDistricts[i].id
            }
            _this.remark1 = response.data[0].remark1
            _this.remark2 = response.data[0].remark2
            _this.remark3 = response.data[0].remark3
          },
          error: function (err) {
            console.log(err)
          }

        })
      }
    }
  }
</script>

<style scoped>

</style>
