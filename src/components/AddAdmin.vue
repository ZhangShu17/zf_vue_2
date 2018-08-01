<template>
    <div>
  <div class="container" id="add_admin">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center">添加路线</h3>
        <hr>
        <form class="form-horizontal">
          <!--区域-->
          <div class="form-group">
            <label for="district" class="col-sm-4 control-label">路线区域</label>
            <div class="col-sm-8">
              <select class="form-control" id="district" v-model="district">
                <option value="1">东城区</option>
                <option value="2">西城区</option>
                <option value="3">海淀区</option>
                <option value="4">朝阳区</option>
                <option value="5">丰台区</option>
                <option value="6">门头沟区</option>
                <option value="7">石景山区</option>
                <option value="8">房山区</option>
                <option value="9">通州区</option>
                <option value="10">顺义区</option>
                <option value="11">昌平区</option>
                <option value="12">大兴区</option>
                <option value="13">怀柔区</option>
                <option value="14">平谷区</option>
                <option value="15">延庆区</option>
                <option value="16">密云区</option>
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
          <!--起点坐标-->
          <div class="startPoint">
            <label for="startPoint" class="col-sm-4 control-label">起点坐标</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="startPoint" v-model="startPoint">
            </div>
          </div>
          <!--终点坐标-->
          <div class="form-group">
            <label for="endPoint" class="col-sm-4 control-label">终点坐标</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="endPoint" v-model="endPoint">
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
    export default {
      name: 'add-admin',
      data () {
        return {
          district: '',
          name: '',
          startPlace: '',
          endPlace: '',
          startPoint: '',
          endPoint: '',
          remark1: '',
          remark2: '',
          remark3: ''
        }
      },
      methods: {
        AddRoad: function () {
          let _this = this
          let url = 'http://127.0.0.1:8000/road/edit'
          $.ajax({
            url: url,
            type: 'POST',
            data: {
              userName: localStorage.getItem('userName'),
              districtId: _this.district,
              name: _this.name,
              startPlace: _this.startPlace,
              endPlace: _this.endPlace,
              startPoint: _this.startPoint,
              endPoint: _this.endPoint,
              remark1: _this.remark1,
              remark2: _this.remark2,
              remark3: _this.remark3
            },
            success: function (response) {
              console.log(response)
              _this.$router.push('/roadlist')
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
