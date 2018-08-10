<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="serviceLineId">路线管理-勤务路线【{{serviceLineId}}】
      </h3>
      <h3 align="center" v-else>路线管理
      </h3>
      <ul class="nav nav-pills">
        <li><router-link :to="{path: '/addroad', query: {serviceLineId: serviceLineId}}">+添加路线</router-link></li>
        <hr  v-show="serviceLineId">
        <li v-show="serviceLineId">添加已有路线：
          <select id="mySelect" v-model="selectRoadId" style="width: 300px">
            <template v-for="item in roadIntoList">
              <option :value="item.id">[id={{item.id}}]{{item.name}}</option>
            </template>
          </select>
        </li>
        <button style="height: 20px" v-show="serviceLineId" @click="InsertIntoServiceLine">ok</button>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_stu_score_list">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
      <thead>
        <tr>
          <th>路线ID</th>
          <th>路线名称</th>
          <th>路线长度</th>
          <th>起点坐标</th>
          <th>终点坐标</th>
          <th>段/岗信息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
      <template v-for="list in roadlist">
        <tr>
          <th>{{list.id}}</th>
          <td :id="list.id" @click="PushExcel('', $event)"><a href="#">{{list.name}}</a></td>
          <td>{{list.length}}</td>
          <td>{{list.startPoint}}</td>
          <td>{{list.endPoint}}</td>
          <td :id="list.id" @click="PushSection('', $event)"><a href="#">{{list.sectionNumber + '段' + list.stationNumber + '岗'}}</a> </td>
          <td>
              <button :value="list.id" type="button" @click="EditRoad('',$event)">
                  编辑
              </button>
              <button :value="list.id" type="button" @click="CopyRoad('',$event)">
                  复制
              </button>
              <button :value="list.id" type="button" @click="RoadFaculty('',$event)">
                  人员
              </button>
              <button :value="list.id" type="button" @click="RemoveRoadFromServiceLine('',$event)" v-show="serviceLineId">
                移除
              </button>
              <button :value="list.id" style="background-color: red" type="button" @click="RemoveRoad('',$event)">
                删除
              </button>
          </td>
      </tr>
      </template>
      </tbody>
    </table>
            <!-- 表格 结束 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config/config'
  export default {
    name: 'RoadList',
    data () {
      return {
        count: 0,
        roadlist: [],
        serviceLineId: 0,
        districtId: localStorage.getItem('districtId'),
        roadIntoList: [],
        selectRoadId: ''
      }
    },
    methods: {
      init: function () {
        this.serviceLineId = this.$route.query.serviceLineId
        console.log('打印serviceLineId')
        console.log(this.serviceLineId)
        let _this = this
        let url = config.ROOT_API_URL + 'road/edit'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            districtId: localStorage.getItem('districtId'),
            serviceLineId: _this.serviceLineId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.roadlist = response.data.list
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      RoadFaculty: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        // 跳转信息：1 路线人员信息 2：路段人员信息 3：岗哨人员信息
        this.$router.push({path: '/facultyInfo', query: {roadId: idInt, type: 1}})
      },
      EditRoad: function (msg, event) {
        var el = event.currentTarget
        var idInt = parseInt(el.value)
        console.log(idInt)
        this.$router.push({path: '/submitroad', query: {roadId: idInt, action: 'Edit', serviceLineId: this.serviceLineId}})
      },
      CopyRoad: function (msg, event) {
        var el = event.currentTarget
        var idInt = parseInt(el.value)
        console.log(idInt)
        this.$router.push({path: '/submitroad', query: {roadId: idInt, action: 'Copy', serviceLineId: this.serviceLineId}})
      },
      RemoveRoad: function (msg, event) {
        let userName = localStorage.getItem('userName')
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        let url = config.ROOT_API_URL + 'road/delete'
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          async: false,  // 取消异步请求
          data: {
            userName: userName,
            roadId: idInt
          },
          success: function (response) {
            console.log(response)
            _this.init()
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      AddAdmin: function () {
        this.$router.push('/addadmin')
      },
      PushSection: function () {
        var el = event.currentTarget
        var idInt = parseInt(el.id)
        console.log(idInt)
        console.log('push section')
        this.$router.push({path: '/sectionlist', query: {type: 1, roadId: idInt}})
      },
      PushExcel: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.id)
        console.log('跳转到excel')
        console.log(idInt)
        this.$router.push({path: '/roadExcel', query: {roadId: idInt}})
      },
      RoadNotInServiceLine: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'road/tobe_service_line'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            districtId: localStorage.getItem('districtId'),
            serviceLineId: _this.serviceLineId
          },
          async: false,
          success: function (response) {
            console.log('打印不属于此id的road')
            console.log(response)
            _this.roadIntoList = response.dataList
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      InsertIntoServiceLine: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'road/tobe_service_line'
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            serviceLineId: _this.serviceLineId,
            roadId: _this.selectRoadId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.init()
            _this.RoadNotInServiceLine()
            _this.selectRoadId = ''
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      RemoveRoadFromServiceLine: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        console.log(idInt)
        let _this = this
        let url = config.ROOT_API_URL + 'road/tobe_service_line'
        $.ajax({
          url: url,
          type: 'DELETE',
          data: {
            userName: localStorage.getItem('userName'),
            serviceLineId: _this.serviceLineId,
            roadId: idInt
          },
          async: false,
          success: function (response) {
            _this.init()
            _this.RoadNotInServiceLine()
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted () {
      this.init()
      if (this.serviceLineId) {
        this.RoadNotInServiceLine()
      }
    }
  }
</script>

<style scoped>
  th, td {
    text-align: center
  }
</style>
