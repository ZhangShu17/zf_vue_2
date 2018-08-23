<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="serviceLineId">路线管理-勤务路线【{{serviceLineName}}】
      </h3>
      <h3 align="center" v-else>路线管理
        <select class="col-md-1" v-if="!serviceLineId" style="font-size: 10px" v-model="filterType">
          <option value="0">全部</option>
          <option value="1">已关联</option>
          <option value="2">未关联</option>
        </select>
      </h3>
      <ul class="nav nav-pills">
        <li><router-link :to="{path: '/addroad', query: {serviceLineId: serviceLineId}}">+添加路线</router-link></li>
        <hr  v-show="serviceLineId">
        <li v-show="serviceLineId">添加已有路线：
          <select id="mySelect" v-model="selectRoadId" style="width: 300px">
            <template v-for="item in roadIntoList">
              <option :value="item.id">[{{item.id}}]{{item.name}}</option>
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
          <th>路线起点</th>
          <th>路线终点</th>
          <th>电台信道</th>
          <th>电台呼号</th>
          <th>段/岗信息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
      <template v-for="list in roadlist">
        <tr>
          <th>
            <button v-show="serviceLineId" @click="RankRoad(list.id, 1)">↑</button>
            <button v-show="serviceLineId" @click="RankRoad(list.id, 2)">↓</button>
            {{list.id}}</th>
          <td :id="list.id" @click="PushExcel('', $event)"><a href="#">{{list.name}}</a></td>
          <td>{{list.length}}</td>
          <td>{{list.startPlace}}</td>
          <td>{{list.endPlace}}</td>
          <td>{{list.channel}}</td>
          <td>{{list.callSign}}</td>
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
    <my-pagination @paginatorPage="paginatorPage" :pages="pageCount"></my-pagination>
    <toast :parentMessage="parentMessage" v-show="showType"></toast>
  </div>
</template>

<script>
  import config from '../config/config'
  import toast from '../components/toast'
  const pagination = () => import('../components/pagination')
  export default {
    name: 'RoadList',
    components: {
      'my-pagination': pagination,
      'toast': toast
    },
    data () {
      return {
        count: 0,
        roadlist: [],
        serviceLineId: 0,
        districtId: localStorage.getItem('districtId'),
        roadIntoList: [],
        selectRoadId: '',
        serviceLineName: '',
        page: 1,
        pageCount: 0,
        parentMessage: '',
        showType: false,
        filterType: 0
      }
    },
    watch: {
      filterType: function (curValue, oldValue) {
        console.log('watch')
        this.filterType = curValue
        this.init()
        console.log('watch end')
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
            filterType: _this.filterType,
            serviceLineId: _this.serviceLineId,
            page: _this.page
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.roadlist = response.data.list
            _this.serviceLineName = response.data.serviceLineName
            _this.pageCount = response.data.pageCount
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
      },
      paginatorPage: function (page) {
        console.log('父子組件傳參')
        console.log(page)
        this.page = page
        this.init()
      },
      RankRoad: function (roadId, rank) {
        console.log(roadId, rank)
        let _this = this
        let url = config.ROOT_API_URL + 'road/rank'
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: roadId,
            serviceLineId: _this.serviceLineId,
            rank: rank
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.parentMessage = 'success|成功'
            setTimeout(function () {
              _this.showType = true
            }, 500)
            setTimeout(function () {
              _this.showType = false
            }, 3000)
            _this.init()
          },
          error: function (err) {
            _this.parentMessage = err.responseJSON.retCode + ':' + err.responseJSON.retMsg
            setTimeout(function () {
              _this.showType = true
            }, 500)
            setTimeout(function () {
              _this.showType = false
            }, 3000)
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
