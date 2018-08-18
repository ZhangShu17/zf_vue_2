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
                <th>层级</th>
                <th>角色</th>
                <th>路/段/岗名称</th>
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
                  <td>{{list.levelName}}</td>
                  <td>{{list.roleName}}</td>
                  <td>{{list.mainName}}</td>
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
    <my-pagination></my-pagination>
  </div>
</template>

<script>
    import eventbus from '../assets/EventBus'
    import config from '../config/config'
    const pagination = () => import('../components/pagination')
    export default {
      name: 'FacultyList',
      components: {
        'my-pagination': pagination
      },
      data () {
        return {
          count: 0,
          facultyList: [],
          cur_page: 1
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
              districtId: localStorage.getItem('districtId'),
              page: _this.cur_page
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
