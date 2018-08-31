<template>
  <div>
    <div class="container">
      <h3 align="center">勤务管理
      </h3>
      <ul class="nav nav-pills" v-if="!parseInt(districtId)">
        <li @click="AddServerLine"><a href="#">+添加勤务路线</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_commodity_list">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>勤务ID</th>
                <th>勤务名称</th>
                <th>勤务时间</th>
                <th>勤务起点</th>
                <th>勤务终点</th>
                <th>道路信息</th>
                <th>操作</th>
                <th v-show="!parseInt(districtId)">提交情況</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(list,index) in serviceList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.time}}</td>
                  <td>{{list.startPlace}}</td>
                  <td>{{list.endPlace}}</td>
                  <td :id="list.id" @click="Jump2RoadList"><a href="#">路线数量：{{list.roadCount}}</a></td>
                  <td>
                    <button @click="EditServiceLine(list.id)" :value="list.id" type="button"  v-show="!parseInt(districtId)">
                      编辑
                    </button>
                    <button @click="CopyServiceLine(list.id)" :value="list.id" type="button"  v-show="!parseInt(districtId)">
                      复制
                    </button>
                    <button @click="Delete(list.id)" :value="list.id" type="button" style="background-color: red" v-show="!parseInt(districtId)">
                      删除
                    </button>
                    <button @click="SubmitServiceLine(list.id, list.roadCount)" :value="list.id" type="button" v-show="parseInt(districtId)">
                      提交
                    </button>
                  </td>
                  <td v-show="!parseInt(districtId)">
                    <template v-for="dist in result[index]">
                      <label style="background-color: #90EE90" v-if="dist.bollen">[{{dist.name}}]</label>
                      <label style="background-color: 	#FFB6C1	" v-else>[{{dist.name}}]</label>
                    </template>
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
    <toast :parentMessage="parentMessage" v-show="parseInt(districtId) && showType"></toast>
  </div>
</template>

<script>
    import config from '../config/config'
    import toast from '../components/toast'
    const pagination = () => import('../components/pagination')
    export default {
      name: 'ServiceLine',
      components: {
        'my-pagination': pagination,
        'toast': toast
      },
      data () {
        return {
          name: 0,
          serviceList: [],
          districtId: localStorage.getItem('districtId'),
          result: [],
          parentMessage: '',
          showType: false,
          page: 1,
          pageCount: 0
        }
      },
      methods: {
        init: function () {
          let _this = this
          let url = config.ROOT_API_URL + 'server_line/edit'
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              districtId: localStorage.getItem('districtId'),
              page: _this.page
            },
            async: false,
            success: function (response) {
              console.log(response)
              _this.serviceList = response.data.list
              _this.pageCount = response.data.pageCount
            },
            error: function (err) {
              console.log(err)
              if(err.responseJSON[0] == 30002){
                localStorage.clear()
                _this.login_status = 0
                _this.$router.go(0)
              }
              // console.log(err.responseJSON[0] == 30002)
            }
          })
        },
        Jump2RoadList: function () {
          let el = event.currentTarget
          let idInt = parseInt(el.id)
          console.log(idInt)
          this.$router.push({
            path: '/roadlist',
            query: {
              serviceLineId: idInt
            }
          })
        },
        AddServerLine: function () {
          let directId = localStorage.getItem('directId')
          this.$router.push({path: '/addServiceLine', query: {direct_id: directId}})
        },
        EditServiceLine: function (param) {
          console.log(param)
          this.$router.push({
            path: '/editServiceLine',
            query: {
              serviceLineId: param,
              action: 'Edit'
            }
          })
        },
        CopyServiceLine: function (param) {
          console.log(param)
          this.$router.push({
            path: '/editServiceLine',
            query: {
              serviceLineId: param,
              action: 'Copy'
            }
          })
        },
        Delete: function (serviceLineId) {
          console.log(serviceLineId)
          let _this = this
          let url = config.ROOT_API_URL + 'server_line/edit'
          $.ajax({
            url: url,
            type: 'DELETE',
            data: {
              userName: localStorage.getItem('userName'),
              serviceLineId: serviceLineId
            },
            async: false,
            success: function (response) {
              _this.init()
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        SubmitServiceLine: function (id, count) {
          if (!parseInt(count)) {
            let _this = this
            _this.parentMessage = '错误：尚未添加路线!'
            setTimeout(function () {
              _this.showType = true
            }, 1000)
            setTimeout(function () {
              _this.showType = false
            }, 3000)
          } else {
            let _this = this
            let url = config.ROOT_API_URL + 'server_line/submit'
            $.ajax({
              url: url,
              type: 'POST',
              data: {
                userName: localStorage.getItem('userName'),
                serviceLineId: id,
                districtId: _this.districtId
              },
              async: false,
              success: function (response) {
                _this.parentMessage = '提交成功!'
                setTimeout(function () {
                  _this.showType = true
                }, 1000)
                setTimeout(function () {
                  _this.showType = false
                }, 3000)
              },
              error: function (err) {
                _this.parentMessage = '提交失敗!'
                console.log(err)
                _this.showType = true
                setTimeout(function () {
                  _this.showType = false
                }, 3000)
              }
            })
          }
        },
        isInArray: function (array, value) {
          for (let i = 0; i < array.length; i++) {
            if (value.toString() === array[i]) {
              return 1
            }
          }
          return 0
        },
        HandleSubmitDistrict: function (serviceList) {
          this.result = []
          for (let i = 0; i < serviceList.length; i++) {
            let disList = serviceList[i].submitDistrict.split('-')
            let result1 = []
            for (let j = 0; j < serviceList[i].district.length; j++) {
              let param = {}
              let name = serviceList[i].district[j].name
              let districtId = serviceList[i].district[j].id
              let bollen = this.isInArray(disList, districtId)
              param.name = name
              param.districtId = districtId
              param.bollen = bollen
              result1.push(param)
            }
            this.result.push(result1)
          }
        },
        paginatorPage: function (page) {
          console.log('父子組件傳參')
          console.log(page)
          this.page = page
          this.init()
          this.HandleSubmitDistrict(this.serviceList)
        }
      },
      mounted () {
        this.init()
        this.HandleSubmitDistrict(this.serviceList)
        console.log('打印處理結果')
        console.log(this.result)
      }
    }
</script>

<style scoped>

</style>
