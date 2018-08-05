<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="roadId">路段管理-路线【{{this.roadId}}】
      </h3>
      <h3 align="center" v-else>路段管理
      </h3>
      <ul class="nav nav-pills">
        <li @click="AddSection"><a href="#">+添加路段</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_commodity_list">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
      <thead>
        <tr>
          <th>路段ID</th>
          <th>路段名称</th>
          <th>起点坐标</th>
          <th>终点坐标</th>
          <th>岗哨信息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
      <template v-for="list in sectionList">
        <tr>
          <th>{{list.id}}</th>
          <td>{{list.name}}</td>
          <td>{{list.startPoint}}</td>
          <td>{{list.endPoint}}</td>
          <td :id="list.id" @click="jump2Station('', $event)"><a href="#">岗哨数量：{{list.stationNumber}}</a></td>
          <td>
              <button :value="list.id" type="button" @click="EditAdmin('',$event)">
                  编辑
              </button>
              <button :value="list.id" type="button" @click="SectionFaculty('',$event)">
                人员
              </button>
              <button :value="list.id" type="button" @click="RemoveSection('',$event)">
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
    name: 'sectionList',
    data () {
      return {
        type: '',
        roadId: 0,
        count: 0,
        sectionList: [],
        districtId: ''
      }
    },
    methods: {
      init: function () {
        this.type = this.$route.query.type
        if (this.type === 1) {
          this.roadId = this.$route.query.roadId
        }
        let _this = this
        var url = 'http://127.0.0.1:8000/section/edit'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            districtId: localStorage.getItem('districtId')
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.sectionList = response.data.list
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      EditAdmin: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        console.log(idInt)
        this.$router.push({path: '/editSection', query: {type: this.type, roadId: this.roadId, sectionId: idInt}})
      },
      RemoveSection: function (msg, event) {
        let el = event.currentTarget
        let sectionId = parseInt(el.value)
        console.log(sectionId)
        let url = 'http://127.0.0.1:8000/section/delete'
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          async: false,
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: sectionId
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
      AddSection: function () {
        this.$router.push({path: '/addSection', query: {type: this.type, roadId: this.roadId}})
      },
      SectionFaculty: function () {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        // 跳转信息：1 路线人员信息 2：路段人员信息 3：岗哨人员信息
        this.$router.push({path: '/facultyInfo', query: {sectionId: idInt, type: 2}})
      },
      jump2Station: function () {
        let el = event.currentTarget
        let idInt = parseInt(el.id)
        console.log('jump2StationList,sectioniId:' + idInt)
        this.$router.push({path: '/stationList', query: {type: 1, sectionId: idInt}})
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

