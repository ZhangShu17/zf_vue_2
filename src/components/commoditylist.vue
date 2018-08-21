<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="roadId">路段管理-路线【{{this.roadName}}】
      </h3>
      <h3 align="center" v-else>路段管理
      </h3>
      <ul class="nav nav-pills">
        <li @click="AddSection"><a href="#">+添加路段</a></li>
        <hr  v-show="roadId">
        <li v-show="roadId">添加已有路段：
          <select id="mySelect" v-model="selectSectionId" style="width: 300px">
            <template v-for="item in sectionIntoList">
              <option :value="item.id">[{{item.id}}]{{item.name}}({{item.startPlace}}-{{item.endPlace}})</option>
            </template>
          </select>
        </li>
        <button style="height: 20px" v-show="roadId" @click="InsertIntoRoad">ok</button>
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
          <th>路段起点</th>
          <th>路段终点</th>
          <th>电台信道</th>
          <th>电台呼号</th>
          <th>岗哨信息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
      <template v-for="list in sectionList">
        <tr>
          <th>
            <button v-show="type" @click="RankSection(list.id, 1)">↑</button>
            <button v-show="type" @click="RankSection(list.id, 2)">↓</button>
            {{list.id}}
          </th>
          <td>{{list.name}}</td>
          <td>{{list.startPlace}}</td>
          <td>{{list.endPlace}}</td>
          <td>{{list.channel}}</td>
          <td>{{list.callSign}}</td>
          <td :id="list.id" @click="jump2Station('', $event)"><a href="#">岗哨数量：{{list.stationNumber}}</a></td>
          <td>
              <button :value="list.id" type="button" @click="EditAdmin('',$event)">
                编辑
              </button>
              <button :value="list.id" type="button" @click="CopyAdmin('',$event)">
                复制
              </button>
              <button :value="list.id" type="button" @click="SectionFaculty('',$event)">
                人员
              </button>
              <button :value="list.id" type="button" @click="RemoveSectionFromRoad('',$event)" v-show="roadId">
                移除
              </button>
              <button :value="list.id" type="button" style="background-color: red" @click="RemoveSection('',$event)">
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
  import toast from '../components/toast'
  import config from '../config/config'
  const pagination = () => import('../components/pagination')
  export default {
    name: 'sectionList',
    components: {
      'my-pagination': pagination,
      'toast': toast
    },
    data () {
      return {
        type: '',
        roadId: 0,
        count: 0,
        sectionList: [],
        districtId: '',
        selectSectionId: '',
        sectionIntoList: [],
        roadName: '',
        page: 1,
        pageCount: 0,
        parentMessage: '',
        showType: false
      }
    },
    methods: {
      init: function () {
        this.type = this.$route.query.type
        if (this.type === 1) {
          this.roadId = this.$route.query.roadId
        }
        let _this = this
        var url = config.ROOT_API_URL + 'section/edit'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            districtId: localStorage.getItem('districtId'),
            page: _this.page
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.count = response.data.listCount
            _this.sectionList = response.data.list
            _this.roadName = response.data.roadName
            _this.pageCount = response.data.pageCount
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
        this.$router.push({
          path: '/editSection',
          query: {
            type: this.type,
            roadId: this.roadId,
            sectionId: idInt,
            action: 'Edit'
          }
        })
      },
      CopyAdmin: function (msg, event) {
        let el = event.currentTarget
        let idInt = parseInt(el.value)
        console.log(idInt)
        this.$router.push({
          path: '/editSection',
          query: {
            type: this.type,
            roadId: this.roadId,
            sectionId: idInt,
            action: 'Copy'
          }
        })
      },
      RemoveSection: function (msg, event) {
        let el = event.currentTarget
        let sectionId = parseInt(el.value)
        console.log(sectionId)
        let url = config.ROOT_API_URL + 'section/delete'
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
      },
      InsertIntoRoad: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'section/tobe_road'
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            sectionId: _this.selectSectionId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.selectSectionId = ''
            _this.init()
            _this.SectionNotInRoad()
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      RemoveSectionFromRoad: function (msg, event) {
        console.log('移除')
        let el = event.currentTarget
        let sectionId = parseInt(el.value)
        let _this = this
        let url = config.ROOT_API_URL + 'section/tobe_road'
        $.ajax({
          url: url,
          type: 'DELETE',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            sectionId: sectionId
          },
          async: false,
          success: function (response) {
            console.log(response)
            _this.init()
            _this.SectionNotInRoad()
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      SectionNotInRoad: function () {
        let _this = this
        let url = config.ROOT_API_URL + 'section/tobe_road'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId
          },
          async: false,
          success: function (response) {
            console.log('打印不属于此id的section')
            console.log(response)
            _this.sectionIntoList = response.dataList
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
      RankSection: function (sectionId, rank) {
        console.log(sectionId, rank)
        let _this = this
        let url = config.ROOT_API_URL + 'section/rank'
        $.ajax({
          url: url,
          type: 'POST',
          data: {
            userName: localStorage.getItem('userName'),
            roadId: _this.roadId,
            sectionId: sectionId,
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
      if (this.roadId) {
        this.SectionNotInRoad()
      }
    }
  }
</script>

<style scoped>
  th, td {
    text-align: center
  }
</style>

