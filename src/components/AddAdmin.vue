<template>
    <div>
  <div class="container" id="add_admin">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center">添加路线</h3>
        <hr>
        <form class="form-horizontal">
          <!--区域-->
          <div class="form-group" v-show="!parseInt(userDistrictId)">
            <label for="district" class="col-sm-4 control-label">区域</label>
            <div class="col-sm-8">
              <select class="form-control" id="district" v-model="district">
                <template v-for="item in allDistricts">
                  <option :value="item.id">{{item.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <!--路线名称-->
          <div class="form-group">
            <label for="name" class="col-sm-4 control-label">路线名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="name" v-model="name">
            </div>
          </div>
          <!--路线长度-->
          <div class="form-group">
            <label for="length" class="col-sm-4 control-label">路线长度</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" placeholder="请输入小数，例如4.0" id="length" v-model="length" >
            </div>
          </div>
          <!--起点-->
          <div class="form-group">
            <label for="startPlace" class="col-sm-4 control-label">路线起点</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="startPlace" v-model="startPlace">
            </div>
          </div>
          <!--终点-->
          <div class="form-group">
            <label for="endPlace" class="col-sm-4 control-label">路线终点</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="endPlace" v-model="endPlace">
            </div>
          </div>
          <!--备注1-->
          <div class="form-group">
            <label for="remark1" class="col-sm-4 control-label">备注1</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="remark1" v-model="remark1">
            </div>
          </div>
          <!--备注2-->
          <div class="form-group">
            <label for="remark2" class="col-sm-4 control-label">备注2</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="remark2" v-model="remark2">
            </div>
          </div>
          <!--备注3-->
          <div class="form-group">
            <label for="remark3" class="col-sm-4 control-label">备注3</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="remark3" v-model="remark3">
            </div>
          </div>
          <!--提交按钮-->
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="AddRoad">提交</button>
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
      name: 'add-admin',
      data () {
        return {
          serviceLineId: '',
          district: '',
          name: '',
          length: '',
          startPlace: '',
          endPlace: '',
          startPoint: '',
          endPoint: '',
          remark1: '',
          remark2: '',
          remark3: '',
          userDistrictId: '',
          allDistricts: []
        }
      },
      methods: {
        AddRoad: function () {
          if (!this.length) {
            alert('请输入路线长度')
          } else {
            let _this = this
            let url = config.ROOT_API_URL + 'road/edit'
            $.ajax({
              url: url,
              type: 'POST',
              data: {
                userName: localStorage.getItem('userName'),
                serviceLineId: _this.serviceLineId,
                districtId: _this.district,
                name: _this.name,
                length: _this.length,
                startPlace: _this.startPlace,
                endPlace: _this.endPlace,
                remark1: _this.remark1,
                remark2: _this.remark2,
                remark3: _this.remark3
              },
              success: function (response) {
                console.log(response)
                _this.$router.push({path: '/roadlist',
                  query: {
                    serviceLineId: _this.serviceLineId
                  }})
              },
              error: function (err) {
                console.log(err)
              }
            })
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
        CheckLength: function () {
          console.log('打印length')
          console.log(this.length)
          let reg = /^\d+(\.\d+)?$/
          console.log(reg.test(this.length))
          if (!reg.test(this.length)) {
            alert('输入不合法，请重新输入')
            this.length = ''
          }
        }
      },
      mounted () {
        this.serviceLineId = this.$route.query.serviceLineId
        this.district = window.localStorage.getItem('districtId')
        this.userDistrictId = window.localStorage.getItem('districtId')
        this.initDistrict()
      }
    }
</script>

<style scoped>

</style>
