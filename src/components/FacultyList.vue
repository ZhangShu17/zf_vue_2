<template>
  <div>
    <div class="container">
      <h3 align="center">人员管理
      </h3>
      <ul class="nav nav-pills">
        <li @click="addFaculty"><a href="#">+添加人员</a></li>
      </ul>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_stu_score_list">
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center">
              <thead>
              <tr>
                <th>人员ID</th>
                <th>人员名称</th>
                <th>电话</th>
                <th>职位</th>
                <th>电台信道</th>
                <th>电台呼号</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in facultyList">
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
                    <button :value="list.id" type="button" style="background-color: red" @click="removeFaculty('',$event)">
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
      name: 'FacultyList',
      data () {
        return {
          count: 0,
          facultyList: []
        }
      },
      methods: {
        init: function () {
          var _this = this
          var url = config.ROOT_API_URL + 'faculty/edit'
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
              _this.count = response.data.listCount
              _this.facultyList = response.data.list
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        removeFaculty: function (msg, event) {
          var _this = this
          var url = config.ROOT_API_URL + 'faculty/delete'
          let el = event.currentTarget
          let idInt = parseInt(el.value)
          $.ajax({
            url: url,
            type: 'GET',
            data: {
              userName: localStorage.getItem('userName'),
              facultyId: idInt
            },
            async: false,
            success: function (response) {
              console.log(response)
              alert('删除成功')
              _this.init()
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        EditFaculty: function (msg, event) {
          let el = event.currentTarget
          let idInt = parseInt(el.value)
          console.log(idInt)
          this.$router.push({path: '/editFaculty', query: {type: 0, facultyId: idInt}})
        },
        addFaculty: function () {
          this.$router.push({path: '/addFaculty', query: {type: 0}})
        }
      },
      mounted () {
        this.init()
      }
    }
</script>

<style scoped>

</style>
