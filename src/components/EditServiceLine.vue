<template>
  <div>
    <div class="container" id="add_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center" v-show="action==='Edit'">编辑勤务路线</h3>
          <h3 align="center" v-show="action==='Copy'">复制勤务路线</h3>
          <hr>
          <form class="form-horizontal">
            <!--勤务ID-->
            <div class="form-group" v-show="action === 'Edit'">
              <label for="id" class="col-sm-4 control-label">勤务ID</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="id" v-model="serviceLineId" disabled="disabled">
              </div>
            </div>
            <!--勤务路线名称-->
            <div class="form-group">
              <label for="name" class="col-sm-4 control-label">勤务名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="name" v-model="info.name">
              </div>
            </div>
            <!--勤务路线起点-->
            <div class="form-group">
              <label for="startPlace" class="col-sm-4 control-label">勤务起点</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="startPlace" v-model="info.startPlace">
              </div>
            </div>
            <!--勤务路线终点-->
            <div class="form-group">
              <label for="endPlace" class="col-sm-4 control-label">勤务终点</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="endPlace" v-model="info.endPlace">
              </div>
            </div>
            <!--勤务日期-->
            <div class="form-group">
              <label for="time" class="col-sm-4 control-label">勤务日期</label>
              <div class="col-sm-8">
                <input type="date" class="form-control" id="time" v-model="info.time">
              </div>
            </div>
            <!--勤务地区-->
            <div class="form-group">
              <label class="col-sm-4 control-label">勤务地区</label>
              <div>
                <template v-for="district in allDistricts">
                  <label v-if="currentDistrict.indexOf(parseInt(district.id))+1"><input :id="district.id" type="checkbox" checked="checked"/>{{district.name}}</label>
                  <label v-else><input :id="district.id" type="checkbox"/>{{district.name}}</label>
                </template>
              </div>
            </div>
            <!--备注1-->
            <div class="form-group">
              <label for="remark1" class="col-sm-4 control-label">备注1</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="remark1" v-model="info.remark1">
              </div>
            </div>
            <!--备注2-->
            <div class="form-group">
              <label for="remark2" class="col-sm-4 control-label">备注2</label>
              <div class="col-sm-8" >
                <input type="text" class="form-control" id="remark2" v-model="info.remark2">
              </div>
            </div>
            <!--备注3-->
            <div class="form-group">
              <label for="remark3" class="col-sm-4 control-label">备注3</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="remark3" v-model="info.remark3">
              </div>
            </div>
            <!--提交修改按钮-->
            <div class="form-group" v-show="action === 'Edit'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="ok">提交修改</button>
              </div>
            </div>
            <!--提交复制按钮-->
            <div class="form-group" v-show="action === 'Copy'">
              <div class="col-sm-offset-4 col-sm-8">
                <button type="button" class="btn btn-primary btn-block" @click="ok1">提交复制</button>
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
      name: 'EditServiceLine',
      data () {
        return {
          action: '',
          serviceLineId: '',
          allDistricts: [],
          info: {},
          currentDistrict: [],
          selectDistricts: []
        }
      },
      methods: {
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
        },
        getServiceInfo: function () {
          let url = config.ROOT_API_URL + 'server_line/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              serviceLineId: _this.serviceLineId
            },
            success: function (response) {
              console.log('请求单条路线')
              console.log(response)
              _this.info = response.data.list[0]
              _this.info.name = _this.info.name
              for (let i = 0; i < _this.info.district.length; i++) {
                _this.currentDistrict.push(parseInt(_this.info.district[i].id))
              }
              console.log('打印2')
              console.log(_this.currentDistrict)
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        ok: function () {
          this.selectDistricts = []
          for (let i = 0; i < this.allDistricts.length; i++) {
            let id = this.allDistricts[i].id.toString()
            let element = document.getElementById(id)
            if (element.checked) {
              if (!(this.selectDistricts.indexOf(id) + 1)) {
                this.selectDistricts.push(id)
              }
            }
          }
          let selectDistrictsStr = ''
          if (this.selectDistricts.length) {
            selectDistrictsStr = this.selectDistricts[0]
            for (let j = 1; j < this.selectDistricts.length; j++) {
              selectDistrictsStr = selectDistrictsStr + '-' + this.selectDistricts[j]
            }
          }
          console.log(selectDistrictsStr)
          console.log(this.selectDistricts)
          let url = config.ROOT_API_URL + 'server_line/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'PUT',
            data: {
              userName: localStorage.getItem('userName'),
              selectDistrictsStr: selectDistrictsStr,
              serviceLineId: _this.serviceLineId,
              name: _this.info.name,
              startPlace: _this.info.startPlace,
              endPlace: _this.info.endPlace,
              time: _this.info.time,
              remark1: _this.info.remark1,
              remark2: _this.info.remark2,
              remark3: _this.info.remark3
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
        ok1: function () {
          this.selectDistricts = []
          for (let i = 0; i < this.allDistricts.length; i++) {
            let id = this.allDistricts[i].id.toString()
            let element = document.getElementById(id)
            if (element.checked) {
              if (!(this.selectDistricts.indexOf(id) + 1)) {
                this.selectDistricts.push(id)
              }
            }
          }
          let selectDistrictsStr = ''
          if (this.selectDistricts.length) {
            selectDistrictsStr = this.selectDistricts[0]
            for (let j = 1; j < this.selectDistricts.length; j++) {
              selectDistrictsStr = selectDistrictsStr + '-' + this.selectDistricts[j]
            }
          }
          console.log(selectDistrictsStr)
          console.log(this.selectDistricts)
          let url = config.ROOT_API_URL + 'server_line/edit'
          let _this = this
          $.ajax({
            url: url,
            type: 'POST',
            data: {
              userName: localStorage.getItem('userName'),
              districtStr: selectDistrictsStr,
              serviceLineId: _this.serviceLineId,
              name: _this.info.name,
              startPlace: _this.info.startPlace,
              endPlace: _this.info.endPlace,
              time: _this.info.time,
              remark1: _this.info.remark1,
              remark2: _this.info.remark2,
              remark3: _this.info.remark3
            },
            success: function (response) {
              console.log(response)
              _this.$router.push('/serviceLineList')
            },
            error: function (err) {
              console.log(err)
            }
          })
        }
      },
      mounted () {
        this.serviceLineId = this.$route.query.serviceLineId
        this.action = this.$route.query.action
        this.initDistrict()
        this.getServiceInfo()
      }
    }
</script>

<style scoped>

</style>
