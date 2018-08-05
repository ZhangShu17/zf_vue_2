<template>
  <div>
    <div class="container">
      <h3 align="center">勤务路线管理
      </h3>
      <ul class="nav nav-pills">
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
                <th>勤务路线时间</th>
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
                  <td :id="list.id" @click="Jump2RoadList"><a href="#">路线数量：{{list.roadCount}}</a></td>
                  <td>
                    <button @click="EditServiceLine(list.id)" :value="list.id" type="button">
                      编辑
                    </button>
                    <button :value="list.id" type="button">
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
    // import bus from '../assets/EventBus'
    import config from '../config/config'
    export default {
      name: 'ServiceLine',
      data () {
        return {
          name: 0,
          serviceList: []
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
              serviceLineId: param
            }
          })
        }
      },
      mounted () {
        this.init()
      }
    }
</script>

<style scoped>

</style>
