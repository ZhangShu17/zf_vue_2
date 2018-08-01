<template>
  <div>
    <div class="container" id="add_admin">
      <div class="row">
        <div class="col-md-6">
          <h3 align="center">添加岗位</h3>
          <hr>
          <form class="form-horizontal">
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'AddStation',
      data () {
        return {
          name: '',
          location: '',
          remark1: '',
          remark2: '',
          remark3: '',
          sectionId: ''
        }
      },
      methods: {
        AddStation: function () {
          let _this = this
          let url = 'http://127.0.0.1:8000/station/edit'
          console.log(_this.name)
          console.log(_this.sectionId)
          console.log(_this.location)
          $.ajax({
            url: url,
            type: 'POST',
            data: {
              userName: localStorage.getItem('userName'),
              name: _this.name,
              location: _this.location,
              sectionId: _this.sectionId,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            success: function (response) {
              console.log(response)
              if (_this.type === 1) {
                _this.$router.push({path: '/stationList', query: {type: 1, sectionId: _this.sectionId}})
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
      mounted: function () {
        this.type = this.$route.query.type
        this.sectionId = this.$route.query.sectionId
      }
    }
</script>

<style scoped>

</style>
