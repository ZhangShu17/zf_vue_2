<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="sectionId">岗哨管理-路段【{{sectionName}}】
      </h3>
      <h3 align="center" v-else>岗哨管理
        <select class="col-md-1" v-if="!sectionId" style="font-size: 10px" v-model="filterType">
          <option value="0">全部</option>
          <option value="1">已关联段</option>
          <option value="2">未关联段</option>
        </select>
      </h3>
      <ul class="nav nav-pills">
        <li @click = 'jump2AddStation'><a href="#">+添加岗位</a></li>
        <hr v-show="sectionId">
        <li v-show="sectionId">添加已有岗哨：
          <select id="mySelect" v-model="selectStationId" style="width: 300px">
            <template v-for="item in stationIntoList">
              <option :value="item.id">[id={{item.id}}]{{item.name}}</option>
            </template>
          </select>
        </li>
        <button style="height: 20px" v-show="sectionId" @click="InsertIntoSection">ok</button>
        <button v-show="sectionId" @click="goBack" style="margin-left:600px;">返回</button>
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
                <th>所在区域</th>
                <th>坐标位置</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>关联勤务</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in stationList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.districtName}}</td>
                  <td>{{list.location}}</td>
                  <td>{{list.channel}}</td>
                  <td>{{list.callSign}}</td>
                  <td>{{list.relatedServiceLine}}</td>
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
    <my-pagination @paginatorPage="paginatorPage" :pages="pageCount"></my-pagination>
  </div>
</template>

<script>
  import config from '../config/config'
  const pagination = () => import('../components/pagination')
  export default {
    name: 'StationList',
    components: {
      'my-pagination': pagination
    },
    data () {
      return {
        type: '',
        count: 0,
        sectionId: 0,
        stationList: [],
        stationIntoList: [],
        selectStationId: '',
        cur_page: 1,
        pageCount: 0,
        sectionName: '',
        filterType: 2
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
        this.type = this.$route.query.type
        let _this = this
        let url = config.ROOT_API_URL + 'station/edit'
        if (this.$route.query.type !== 0) {
          this.sectionId = this.$route.query.sectionId
          window.localStorage.setItem('curSectionId',this.sectionId)
        }
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            sectionId: _this.sectionId,
            districtId: localStorage.getItem('districtId'),
            page: _this.cur_page,
            filterType: _this.filterType
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.stationList = response.data.list
            _this.sectionName = response.data.sectionName
            _this.pageCount = response.data.pageCount
          },
          error: function (err) {
            console.log(err)
            if(err.responseJSON[0] == 30002){
              localStorage.clear()
              _this.login_status = 0
              _this.$router.go(0)
            }
          }
        })
      },
      goBack: function () {
        let roadId = localStorage.getItem('curRoadId')
        this.$router.push({path: '/sectionlist', query: {type: 1, roadId: roadId}})
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
        let backAll =  this.sectionId ? false:true
        console.log('go to facultylis ,backAll')
        console.log(backAll)
        // 跳转信息：1 路线人员信息 2：路段人员信息 3：岗哨人员信息
        this.$router.push({
          path: '/facultyInfo',
          query: {
            stationId: idInt,
            type: 3,
            backAll: backAll
          }
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
      },
      paginatorPage: function (page) {
        console.log('父子組件傳參')
        console.log(page)
        this.cur_page = page
        this.init()
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
