<template>
  <div>
    <div class="container">
      <h3 align="center">路线管理
      </h3>
      <ul class="nav nav-pills">
        <li><router-link to="/addroad">+添加路线</router-link></li>
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
          <td>{{list.name}}</td>
          <td>{{list.startPoint}}</td>
          <td>{{list.endPoint}}</td>
          <td :id="list.id" @click="PushSection('', $event)"><a href="#">{{list.sectionNumber + '段' + list.stationNumber + '岗'}}</a> </td>
          <td>
              <button :value="list.id" type="button" @click="EditRoad('',$event)">
                  编辑
              </button>
              <button :value="list.id" type="button" @click="RoadFaculty('',$event)">
                  人员
              </button>
              <button :value="list.id" type="button" @click="RemoveRoad('',$event)">
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
  export default {
    name: 'RoadList',
    data () {
      return {
        count: 0,
        roadlist: []
      }
    },
    methods: {
      init: function () {
        var _this = this
        var url = 'http://127.0.0.1:8000/road/edit'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName')
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
        this.$router.push({path: '/submitroad', query: {roadId: idInt}})
      },
      RemoveRoad: function (msg, event) {
        let userName = localStorage.getItem('userName')
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        let url = 'http://127.0.0.1:8000/road/delete'
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
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
  th, td {
    text-align: center
  }
</style>
