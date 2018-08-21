<template>
  <div>
  <div class="container" id="edit_admin">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center" v-show="action==='Edit'">道路编辑</h3>
        <h3 align="center" v-show="action==='Copy'">道路复制</h3>
        <hr>
        <form class="form-horizontal">
          <!--道路id-->
          <div class="form-group" v-show="action === 'Edit'">
            <label for="roadid" class="col-sm-4 control-label">道路ID</label>
            <div class="col-sm-8">
              <input type="text" disabled="disabled" class="form-control" id="roadid" v-model="roadId">
            </div>
          </div>
          <!--道路名称-->
          <div class="form-group">
            <label for="roadname" class="col-sm-4 control-label">道路名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="roadname" v-model="roadName">
            </div>
          </div>
          <!--道路长度-->
          <div class="form-group">
            <label for="length" class="col-sm-4 control-label">道路长度</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="length" v-model="length"  @change="CheckLength">
            </div>
          </div>
          <!--道路起点-->
          <div class="form-group">
            <label for="roadstart" class="col-sm-4 control-label">道路起点</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="roadstart" v-model="roadStart">
            </div>
          </div>
          <!--道路终点-->
          <div class="form-group">
            <label for="roadend" class="col-sm-4 control-label">道路终点</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="roadend" v-model="roadEnd">
            </div>
          </div>
          <!--电台信道-->
          <div class="form-group">
            <label for="channel" class="col-sm-4 control-label">电台信道</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="channel" v-model="channel">
            </div>
          </div>

          <!--电台呼号-->
          <div class="form-group">
            <label for="callSign" class="col-sm-4 control-label">电台呼号</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="callSign" v-model="callSign">
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
              <button type="button" class="btn btn-primary btn-block" @click="EditRoad">提交修改</button>
            </div>
          </div>
          <!--提交复制-->
          <div class="form-group" v-show="action === 'Copy'">
            <div class="col-sm-offset-4 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="CopyRoad">提交复制</button>
            </div>
          </div>
          <div class="form-group" >
            <div class="col-sm-offset-4 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="goBack">返  回</button>
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
    name: 'SubmitScore',
    data () {
      return {
        serviceLineId: '',
        roadId: '',
        roadName: '',
        length: '',
        roadStart: '',
        roadEnd: '',
        startPoint: '',
        endPoint: '',
        channel: '',
        callSign: '',
        remark1: '',
        remark2: '',
        remark3: '',
        action: ''
      }
    },
    methods: {
      EditRoad: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'road/edit'
        $.ajax({
          url: url,
          type: 'PUT',
          async: false,  // 取消异步请求
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            name: _this.roadName,
            length: _this.length,
            startPlace: _this.roadStart,
            endPlace: _this.roadEnd,
            channel: _this.channel,
            callSign: _this.callSign,
            remark1: _this.remark1,
            remark2: _this.remark2,
            remark3: _this.remark3
          },
          success: function (response) {
            console.log('success')
            _this.$router.push({path: '/roadlist', query: {serviceLineId: _this.serviceLineId}})
          },
          error: function (error) {
            console.log(error)
          }
        })
      },
      CopyRoad: function () {
        console.log(this.serviceLineId)
        let _this = this
        let url = config.ROOT_API_URL + 'copy/road'
        $.ajax({
          url: url,
          type: 'POST',
          async: false,  // 取消异步请求
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            name: _this.roadName,
            length: _this.length,
            startPlace: _this.roadStart,
            endPlace: _this.roadEnd,
            channel: _this.channel,
            callSign: _this.callSign,
            remark1: _this.remark1,
            remark2: _this.remark2,
            remark3: _this.remark3
          },
          success: function (response) {
            console.log('success')
            _this.$router.push({path: '/roadlist', query: {serviceLineId: _this.serviceLineId}})
          },
          error: function (error) {
            console.log(error)
          }
        })
      },
      CheckLength: function () {
        console.log('打印length')
        console.log(this.length)
        let reg = /^\d+(\.\d+)?$/
        console.log(reg.test(this.length))
        if (!reg.test(this.length)) {
          alert('输入不合法，长度应为整数或者小数，请重新输入')
        }
      },
      goBack: function () {
        this.$router.push({path: '/roadlist', query: {serviceLineId: this.serviceLineId}})
      }
    },
    mounted: function () {
      this.serviceLineId = this.$route.query.serviceLineId
      let roadId = this.$route.query.roadId
      this.action = this.$route.query.action
      let _this = this
      let url = config.ROOT_API_URL + 'road/single'
      console.log(roadId)
      $.ajax({
        url: url,
        type: 'GET',
        data: {
          userName: localStorage.getItem('userName'),
          roadId: roadId
        },
        async: false,
        success: function (response) {
          console.log(response)
          _this.roadId = response.data.id
          _this.roadName = response.data.name
          _this.roadName = response.data.name
          _this.length = response.data.length
          _this.roadStart = response.data.startPlace
          _this.roadEnd = response.data.endPlace
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
  }
</script>

<style scoped>

</style>
