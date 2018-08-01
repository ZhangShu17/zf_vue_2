<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="type===1">路线人员管理
      </h3>
      <h3 align="center" v-if="type===2">路段人员管理
      </h3>
      <h3 align="center" v-if="type===3">岗哨人员管理
      </h3>
      <ul class="nav nav-pills">
        <!--<li><router-link to="/addroad">路长+</router-link></li>-->
        <li @click="addFaculty(1, $event)"><a href="#">路长+</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="ChiefList">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>人员ID</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>职务</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in chiefList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.channel}}</td>
                  <td>{{list.callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(1,$event)">
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
    <!--分局-->
    <div class="container" v-if="type !== 3">
      <ul class="nav nav-pills">
        <li @click="addFaculty(2, $event)"><a href="#">执行路长(分局)+</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="execChiefSubBureauList">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>人员ID</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>职务</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in execChiefSubBureauList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.channel}}</td>
                  <td>{{list.callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(2,$event)">
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
    <!--交通-->
    <div class="container">
      <ul class="nav nav-pills">
        <li @click="addFaculty(3, $event)"><a href="#">执行路长(交通)+</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="execChiefTransList">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>人员ID</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>职务</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in execChiefTransList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.channel}}</td>
                  <td>{{list.callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(3,$event)">
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
    <!--武警-->
    <div class="container" v-if="type !== 3">
      <ul class="nav nav-pills">
        <li @click="addFaculty(4, $event)"><a href="#">执行路长(武警)+</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="execChiefArmedPoliList">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>人员ID</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>职务</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in execChiefArmedPoliList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.channel}}</td>
                  <td>{{list.callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(4,$event)">
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
      name: 'RoadSectionStationFaculty',
      data () {
        return {
          type: '',
          roadId: '',
          sectionId: '',
          stationId: '',
          chiefList: [],
          execChiefTransList: [],
          execChiefSubBureauList: [],
          execChiefArmedPoliList: []
        }
      },
      methods: {
        init: function () {
          this.type = this.$route.query.type
          console.log(this.type)
          // 路线人员信息
          if (this.type === 1) {
            this.roadId = this.$route.query.roadId
            let url = 'http://127.0.0.1:8000/road/faculty'
            let _this = this
            $.ajax({
              url: url,
              type: 'GET',
              data: {
                userName: localStorage.getItem('userName'),
                roadId: _this.roadId
              },
              async: false,
              success: function (response) {
                console.log(response)
                _this.chiefList = response.data.chief
                _this.execChiefSubBureauList = response.data.execChiefSubBureau
                _this.execChiefTransList = response.data.execChiefTrans
                _this.execChiefArmedPoliList = response.data.execChiefArmedPoli
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 2) {
            this.sectionId = this.$route.query.sectionId
            let url = 'http://127.0.0.1:8000/section/faculty'
            let _this = this
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
                _this.chiefList = response.data.chief
                _this.execChiefSubBureauList = response.data.execChiefSubBureau
                _this.execChiefTransList = response.data.execChiefTrans
                _this.execChiefArmedPoliList = response.data.execChiefArmedPoli
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 3) {
            this.stationId = this.$route.query.stationId
            let url = 'http://127.0.0.1:8000/station/faculty'
            let _this = this
            $.ajax({
              url: url,
              type: 'GET',
              data: {
                userName: localStorage.getItem('userName'),
                stationId: _this.stationId
              },
              async: false,
              success: function (response) {
                console.log(response)
                _this.chiefList = response.data.chief
                // _this.execChiefSubBureauList = response.data.execChiefSubBureau
                _this.execChiefTransList = response.data.execChiefTrans
                // _this.execChiefArmedPoliList = response.data.execChiefArmedPoli
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
        },
        RemoveFaculty: function (msg, event) {
          let el = event.currentTarget
          let idInt = parseInt(el.value)
          console.log(msg)
          console.log(idInt)
          if (this.type === 1) {
            let roadId = this.$route.query.roadId
            let url = 'http://127.0.0.1:8000/road/faculty/delete'
            let _this = this
            $.ajax({
              url: url,
              type: 'GET',
              data: {
                userName: localStorage.getItem('userName'),
                roadId: roadId,
                facultyId: idInt,
                facultyType: msg
              },
              async: false,
              success: function (response) {
                console.log(response)
                _this.init()
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 2) {
            let sectionId = this.$route.query.sectionId
            let url = 'http://127.0.0.1:8000/section/faculty/delete'
            let _this = this
            $.ajax({
              url: url,
              type: 'GET',
              data: {
                userName: localStorage.getItem('userName'),
                sectionId: sectionId,
                facultyId: idInt,
                facultyType: msg
              },
              async: false,
              success: function (response) {
                console.log(response)
                _this.init()
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 3) {
            let stationId = this.$route.query.stationId
            let url = 'http://127.0.0.1:8000/station/faculty/delete'
            let _this = this
            $.ajax({
              url: url,
              type: 'GET',
              data: {
                userName: localStorage.getItem('userName'),
                stationId: stationId,
                facultyId: idInt,
                facultyType: msg
              },
              async: false,
              success: function (response) {
                console.log(response)
                _this.init()
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
        },
        EditFaculty: function (msg, event) {
          let el = event.currentTarget
          let idInt = parseInt(el.value)
          console.log(idInt)
          if (this.type === 1) {
            this.$router.push({path: '/editFaculty', query: {type: this.type, roadId: this.roadId, facultyId: idInt}})
          }
          if (this.type === 2) {
            this.$router.push({path: '/editFaculty', query: {type: this.type, sectionId: this.sectionId, facultyId: idInt}})
          }
          if (this.type === 3) {
            this.$router.push({path: '/editFaculty', query: {type: this.type, stationId: this.stationId, facultyId: idInt}})
          }
        },
        addFaculty: function (msg, event) {
          if (this.type === 1) {
            this.$router.push({path: '/addFaculty', query: {type: this.type, roadId: this.roadId, chiefType: msg}})
          }
          if (this.type === 2) {
            this.$router.push({path: '/addFaculty', query: {type: this.type, sectionId: this.sectionId, chiefType: msg}})
          }
          if (this.type === 3) {
            this.$router.push({path: '/addFaculty', query: {type: this.type, stationId: this.stationId, chiefType: msg}})
          }
        }
      },
      mounted () {
        this.init()
      }
    }
</script>

<style scoped>

</style>
