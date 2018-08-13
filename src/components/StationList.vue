<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="sectionId">岗哨管理-路段【{{sectionId}}】
      </h3>
      <h3 align="center" v-else>岗哨管理
      </h3>
      <ul class="nav nav-pills">
        <li @click = 'jump2AddStation'><a href="#">+添加岗位</a></li>
        <hr v-show="sectionId">
        <li v-show="sectionId">添加已有路线：
          <select id="mySelect" v-model="selectStationId" style="width: 300px">
            <template v-for="item in stationIntoList">
              <option :value="item.id">[id={{item.id}}]{{item.name}}</option>
            </template>
          </select>
        </li>
        <button style="height: 20px" v-show="sectionId" @click="InsertIntoSection">ok</button>
      </ul>

      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_stu_score_list">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>岗位ID</th>
                <th>岗位名称</th>
                <th>坐标位置</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in stationList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.location}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditStation('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="CopyStation('',$event)">
                      复制
                    </button>
                    <button :value="list.id" type="button" @click="StationFaculty('',$event)">
                      人员
                    </button>
                    <button :value="list.id" type="button" @click="RemoveStationFromSection('',$event)" v-show="sectionId">
                      移除
                    </button>
                    <button :value="list.id" type="button" style="background-color: red" @click="RemoveStation('',$event)">
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
    name: 'StationList',
    data () {
      return {
        type: '',
        count: 0,
        sectionId: 0,
        stationList: [],
        stationIntoList: [],
        selectStationId: ''
      }
    },
    methods: {
      init: function () {
        this.type = this.$route.query.type
        let _this = this
        let url = config.ROOT_API_URL + 'station/edit'
        if (this.$route.query.type !== 0) {
          this.sectionId = this.$route.query.sectionId
        }
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: _this.sectionId,
            districtId: localStorage.getItem('districtId')
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.stationList = response.data.list
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      jump2AddStation: function () {
        this.$router.push({
          path: '/addStation',
          query: {
            sectionId: this.$route.query.sectionId,
            type: this.$route.query.type
          }
        })
      },
      StationFaculty: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        // 跳转信息：1 路线人员信息 2：路段人员信息 3：岗哨人员信息
        this.$router.push({
          path: '/facultyInfo',
          query: {
            stationId: idInt,
            type: 3}
        })
      },
      EditStation: function (msg, event) {
        var el = event.currentTarget
        var idInt = parseInt(el.value)
        console.log('编辑岗哨打印')
        console.log(idInt)
        console.log('编辑岗哨打印 END')
        this.$router.push({
          path: '/submitStation',
          query: {stationId: idInt,
            action: 'Edit',
            type: this.type,
            sectionId: this.sectionId}
        })
      },
      CopyStation: function (msg, event) {
        var el = event.currentTarget
        var idInt = parseInt(el.value)
        console.log('复制岗哨打印')
        console.log(idInt)
        console.log('复制岗哨打印 END')
        this.$router.push({
          path: '/submitStation',
          query: {stationId: idInt,
            action: 'Copy',
            type: this.type,
            sectionId: this.sectionId}
        })
      },
      RemoveStation: function (msg, event) {
        let userName = localStorage.getItem('userName')
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        let url = config.ROOT_API_URL + 'station/edit'
        let _this = this
        $.ajax({
          url: url,
          type: 'DELETE',
          async: false,  // 取消异步请求
          data: {
            userName: userName,
            stationId: idInt
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
      StationNotInSection: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'station/tobe_section'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: _this.sectionId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.stationIntoList = response.dataList
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      InsertIntoSection: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'station/tobe_section'
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: _this.sectionId,
            stationId: _this.selectStationId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.init()
            _this.StationNotInSection()
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      RemoveStationFromSection: function (msg, event) {
        var el = event.currentTarget
        var idInt = parseInt(el.value)
        console.log(idInt)
        let _this = this
        let url = config.ROOT_API_URL + 'station/tobe_section'
        $.ajax({
          url: url,
          type: 'DELETE',
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: _this.sectionId,
            stationId: idInt
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.init()
            _this.StationNotInSection()
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted () {
      this.init()
      if (this.sectionId) {
        this.StationNotInSection()
      }
    }
  }
</script>

<style scoped>

</style>
