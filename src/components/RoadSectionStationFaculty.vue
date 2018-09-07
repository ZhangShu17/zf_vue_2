<template>
  <div>
    <div class="container">
      <h3 align="center" v-if="type===1">路线人员管理-路线【{{roadId}}】
      </h3>
      <h3 align="center" v-if="type===2">路段人员管理-路段【{{sectionId}}】
      </h3>
      <h3 align="center" v-if="type===3">岗哨人员管理-岗哨【{{stationId}}】
      </h3>
      <h5 align="right">
        <button @click="goBack">返回</button>
      </h5>
      <ul class="nav nav-pills">
        <!--<li><router-link to="/addroad">路长+</router-link></li>-->
        <div v-if="type===1">
          <li @click="addFaculty(1, $event)"><a href="#">路长+</a></li>
          <li>路长：
            <select v-model="selectedFacultyId_chief" style="width: 300px" @change="insertTo(1, $event)">
              <template v-for="item in chiefToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
        <div v-if="type===2">
          <li @click="addFaculty(1, $event)"><a href="#">段长+</a></li>
          <li>段长：
            <select v-model="selectedFacultyId_chief" style="width: 300px" @change="insertTo(1, $event)">
              <template v-for="item in chiefToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
        <div v-if="type===3">
          <li @click="addFaculty(1, $event)" v-if="type===3"><a href="#">岗长(分局)+</a></li>
          <li>岗长(分局)：
            <select v-model="selectedFacultyId_chief" style="width: 300px" @change="insertTo(1, $event)">
              <template v-for="item in chiefToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>

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
              <template v-for="list in chiefList" v-if="list.enabled">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{channel}}</td>
                  <td>{{callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(1,$event)">
                      移除
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
        <div v-if="type===1">
          <li @click="addFaculty(2, $event)" v-if="type===1"><a href="#">执行路长(分局)+</a></li>
          <li>执行路长(分局)：
            <select v-model="selectedFacultyId_bureau" style="width: 300px" @change="insertTo(2, $event)">
              <template v-for="item in bureauToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>

        <div v-if="type===2">
          <li @click="addFaculty(2, $event)" v-if="type===2"><a href="#">执行段长(分局)+</a></li>
          <li>执行段长(分局)：
            <select v-model="selectedFacultyId_bureau" style="width: 300px" @change="insertTo(2, $event)">
              <template v-for="item in bureauToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
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
              <template v-for="list in execChiefSubBureauList" v-if="list.enabled">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{channel}}</td>
                  <td>{{callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(2,$event)">
                      移除
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
        <div v-if="type===1">
          <li @click="addFaculty(3, $event)" v-if="type===1"><a href="#">执行路长(交管)+</a></li>
          <li>执行路长(交管)：
            <select v-model="selectedFacultyId_trans" style="width: 300px" @change="insertTo(3, $event)">
              <template v-for="item in transToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
        <div v-if="type===2">
          <li @click="addFaculty(3, $event)" v-if="type===2"><a href="#">执行段长(交通)+</a></li>
          <li>执行段长(交通)：
            <select v-model="selectedFacultyId_trans" style="width: 300px" @change="insertTo(3, $event)">
              <template v-for="item in transToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
        <div v-if="type===3">
          <li @click="addFaculty(3, $event)" v-if="type===3"><a href="#">执行岗长(交管)+</a></li>
          <li>执行岗长(交管)：
            <select v-model="selectedFacultyId_trans" style="width: 300px" @change="insertTo(3, $event)">
              <template v-for="item in transToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
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
              <template v-for="list in execChiefTransList" v-if="list.enabled">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{channel}}</td>
                  <td>{{callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(3,$event)">
                      移除
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
        <div v-if="type===1">
          <li @click="addFaculty(4, $event)"><a href="#">执行路长(武警)+</a></li>
          <li>执行路长(武警)：
            <select v-model="selectedFacultyId_poli" style="width: 300px" @change="insertTo(4, $event)">
              <template v-for="item in poliToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
        <div v-if="type===2">
          <li @click="addFaculty(4, $event)"><a href="#">执行段长(武警)+</a></li>、
          <li>执行段长(武警)：
            <select v-model="selectedFacultyId_poli" style="width: 300px" @change="insertTo(4, $event)">
              <template v-for="item in poliToBeList">
                <option :value="item.id">[id={{item.id}}]{{item.name}}-{{item.mobile}}</option>
              </template>
            </select>
          </li>
        </div>
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
              <template v-for="list in execChiefArmedPoliList" v-if="list.enabled">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{channel}}</td>
                  <td>{{callSign}}</td>
                  <td>
                    <button :value="list.id" type="button" @click="EditFaculty('',$event)">
                      编辑
                    </button>
                    <button :value="list.id" type="button" @click="RemoveFaculty(4,$event)">
                      移除
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
      name: 'RoadSectionStationFaculty',
      data () {
        return {
          type: '',
          roadId: '',
          sectionId: '',
          stationId: '',
          roadName: '',
          sectionName: '',
          stationName: '',
          chiefList: [],
          channel: '',
          callSign: '',
          execChiefTransList: [],
          execChiefSubBureauList: [],
          execChiefArmedPoliList: [],
          chiefToBeList: [],
          bureauToBeList: [],
          transToBeList: [],
          poliToBeList: [],
          selectedFacultyId_chief: '',
          selectedFacultyId_bureau: '',
          selectedFacultyId_trans: '',
          selectedFacultyId_poli: ''
        }
      },
      methods: {
        init: function () {
          this.type = this.$route.query.type
          console.log(this.type)
          // 路线人员信息
          if (this.type === 1) {
            this.roadId = this.$route.query.roadId
            let url = config.ROOT_API_URL + 'road/faculty'
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
                _this.channel = response.data.channel
                _this.callSign = response.data.callSign
                console.log('channel:')
                console.log(_this.channel)
                console.log('callSign')
                console.log(_this.callSign)
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
          // 路段人员信息
          if (this.type === 2) {
            this.sectionId = this.$route.query.sectionId
            let url = config.ROOT_API_URL + 'section/faculty'
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
                _this.channel = response.data.channel
                _this.callSign = response.data.callSign
                console.log('channel:')
                console.log(_this.channel)
                console.log('callSign')
                console.log(_this.callSign)
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
          // 岗哨人员信息
          if (this.type === 3) {
            this.stationId = this.$route.query.stationId
            let url = config.ROOT_API_URL + 'station/faculty'
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
                _this.channel = response.data.channel
                _this.callSign = response.data.callSign
                console.log('channel:')
                console.log(_this.channel)
                console.log('callSign')
                console.log(_this.callSign)
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
        goBack: function () {
          if(this.type ==1){
            let serviceId = localStorage.getItem('curServiceId')
            this.$router.push({
              path: '/roadlist',
              query: {
                serviceLineId: this.$route.query.backAll ? 0 : serviceId
              }
            })
          } else if(this.type == 2){
            let roadId = localStorage.getItem('curRoadId')
            this.$router.push({path: '/sectionlist',
              query: {
                type: this.$route.query.backAll ? 0 : 1,
                roadId: this.$route.query.backAll ? 0 : roadId
            }
            })
          } else if (this.type == 3){
            let sectionId = localStorage.getItem('curSectionId')
            this.$router.push({path: '/stationList',
              query: {
                type:  this.$route.query.backAll ? 0 : 1,
                sectionId: this.$route.query.backAll ? 0 : sectionId
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
            let url = config.ROOT_API_URL + 'road/faculty/delete'
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
                _this.facultyNotIn()
                if (msg === 1) {
                  _this.selectedFacultyId_chief = ''
                }
                if (msg === 2) {
                  _this.selectedFacultyId_bureau = ''
                }
                if (msg === 3) {
                  _this.selectedFacultyId_trans = ''
                }
                if (msg === 4) {
                  _this.selectedFacultyId_poli = ''
                }
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 2) {
            let sectionId = this.$route.query.sectionId
            let url = config.ROOT_API_URL + 'section/faculty/delete'
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
                _this.facultyNotIn()
                if (msg === 1) {
                  _this.selectedFacultyId_chief = ''
                }
                if (msg === 2) {
                  _this.selectedFacultyId_bureau = ''
                }
                if (msg === 3) {
                  _this.selectedFacultyId_trans = ''
                }
                if (msg === 4) {
                  _this.selectedFacultyId_poli = ''
                }
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          if (this.type === 3) {
            let stationId = this.$route.query.stationId
            let url = config.ROOT_API_URL + 'station/faculty/delete'
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
                _this.facultyNotIn()
                if (msg === 1) {
                  _this.selectedFacultyId_chief = ''
                }
                if (msg === 2) {
                  _this.selectedFacultyId_bureau = ''
                }
                if (msg === 3) {
                  _this.selectedFacultyId_trans = ''
                }
                if (msg === 4) {
                  _this.selectedFacultyId_poli = ''
                }
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
        },
        facultyNotIn: function () {
          this.type = this.$route.query.type
          console.log(this.type)
          // 路线人员信息
          if (this.type === 1) {
            this.roadId = this.$route.query.roadId
            let url = config.ROOT_API_URL + 'faculty/tobe_road'
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
                _this.chiefToBeList = response.data.chiefList
                _this.bureauToBeList = response.data.execChiefSubBureauList
                _this.transToBeList = response.data.execChiefTransList
                _this.poliToBeList = response.data.execChiefArmedPoliList
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          // 路段人员信息
          if (this.type === 2) {
            this.sectionId = this.$route.query.sectionId
            let url = config.ROOT_API_URL + 'faculty/tobe_section'
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
                _this.chiefToBeList = response.data.chiefList
                _this.bureauToBeList = response.data.execChiefSubBureauList
                _this.transToBeList = response.data.execChiefTransList
                _this.poliToBeList = response.data.execChiefArmedPoliList
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
          // 岗哨人员信息
          if (this.type === 3) {
            this.stationId = this.$route.query.stationId
            let url = config.ROOT_API_URL + 'faculty/tobe_station'
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
                _this.chiefToBeList = response.data.chiefList
                _this.transToBeList = response.data.execChiefTransList
              },
              error: function (err) {
                console.log(err)
              }
            })
          }
        },
        insertTo: function (facultyType, event) {
          let el = event.currentTarget
          let value = parseInt(el.value)
          console.log(value)
          console.log(facultyType)
          if (value) {
            if (this.type === 1) {
              let url = config.ROOT_API_URL + 'faculty/tobe_road'
              let _this = this
              $.ajax({
                url: url,
                type: 'POST',
                data: {
                  userName: window.localStorage.getItem('userName'),
                  roadId: _this.roadId,
                  facultyId: value,
                  facultyType: facultyType
                },
                async: false,
                success: function (response) {
                  console.log(response)
                  _this.init()
                  _this.facultyNotIn()
                  if (value === 1) {
                    _this.selectedFacultyId_chief = ''
                  }
                  if (value === 2) {
                    _this.selectedFacultyId_bureau = ''
                  }
                  if (value === 3) {
                    _this.selectedFacultyId_trans = ''
                  }
                  if (value === 4) {
                    _this.selectedFacultyId_poli = ''
                  }
                },
                error: function (err) {
                  console.log(err)
                }
              })
            }
            if (this.type === 2) {
              let url = config.ROOT_API_URL + 'faculty/tobe_section'
              let _this = this
              $.ajax({
                url: url,
                type: 'POST',
                data: {
                  userName: window.localStorage.getItem('userName'),
                  sectionId: _this.sectionId,
                  facultyId: value,
                  facultyType: facultyType
                },
                async: false,
                success: function (response) {
                  console.log(response)
                  _this.init()
                  _this.facultyNotIn()
                  if (value === 1) {
                    _this.selectedFacultyId_chief = ''
                  }
                  if (value === 2) {
                    _this.selectedFacultyId_bureau = ''
                  }
                  if (value === 3) {
                    _this.selectedFacultyId_trans = ''
                  }
                  if (value === 4) {
                    _this.selectedFacultyId_poli = ''
                  }
                },
                error: function (err) {
                  console.log(err)
                }
              })
            }
            if (this.type === 3) {
              let url = config.ROOT_API_URL + 'faculty/tobe_station'
              let _this = this
              $.ajax({
                url: url,
                type: 'POST',
                data: {
                  userName: window.localStorage.getItem('userName'),
                  stationId: _this.stationId,
                  facultyId: value,
                  facultyType: facultyType
                },
                async: false,
                success: function (response) {
                  console.log(response)
                  _this.init()
                  _this.facultyNotIn()
                  if (value === 1) {
                    _this.selectedFacultyId_chief = ''
                  }
                  if (value === 2) {
                    _this.selectedFacultyId_bureau = ''
                  }
                  if (value === 3) {
                    _this.selectedFacultyId_trans = ''
                  }
                  if (value === 4) {
                    _this.selectedFacultyId_poli = ''
                  }
                },
                error: function (err) {
                  console.log(err)
                }
              })
            }
          }
        }
      },
      mounted () {
        this.init()
        this.facultyNotIn()
      }
    }
</script>

<style scoped>

</style>
