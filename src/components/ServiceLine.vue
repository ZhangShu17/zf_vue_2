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
                <th>勤务路线ID</th>
                <th>勤务路线名称</th>
                <th>勤务时间</th>
                <th>勤务起点</th>
                <th>勤务终点</th>
                <th>道路信息</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in serviceList">
                <tr>
                  <th>{{list.id}}</th>
                  <td>{{list.name}}</td>
                  <td>{{list.time}}</td>
                  <td>{{list.startPlace}}</td>
                  <td>{{list.endPlace}}</td>
                  <td :id="list.id" @click="Jump2RoadList"><a href="#">路线数量：{{list.roadCount}}</a></td>
                  <td>
                    <button @click="EditServiceLine(list.id)" :value="list.id" type="button">
                      编辑
                    </button>
                    <button @click="CopyServiceLine(list.id)" :value="list.id" type="button">
                      复制
                    </button>
                    <button @click="Delete(list.id)" :value="list.id" type="button" style="background-color: red">
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
    <my-pagination></my-pagination>
  </div>
</template>

<script>
    import eventbus from '../assets/EventBus'
    import config from '../config/config'
    const pagination = () => import('../components/pagination')
    export default {
      name: 'ServiceLine',
      components: {
        'my-pagination': pagination
      },
      data () {
        return {
          name: 0,
          serviceList: [],
          districtId: localStorage.getItem('districtId')
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
              districtId: localStorage.getItem('districtId')
            },
            async: false,
            success: function (response) {
              console.log(response)
              _this.serviceList = response.data
              console.log('data:' + _this.serviceList[0].id)
              console.log('data:' + _this.serviceList[0].name)
              console.log('data:' + _this.serviceList[0].time)
              console.log('data:' + _this.serviceList[0].roadCount)
            },
            error: function (err) {
              console.log(err)
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
        }
      },
      mounted () {
        this.init()
        let _this = this
        eventbus.$on('paginatorPage', function (msg) {
          console.log('监听事件打印')
          console.log(msg)
          _this.cur_page = msg
          _this.init()
        })
      }
    }
</script>

<style scoped>

</style>
