<template>
  <div>
    <div class="container">
      <h3 align="center">易考研学员考研成绩统计</h3>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_stu_score_list">
            <!-- 导出excel 开始 -->
            <button class="btn btn-info" @click="handleDownload">导出为excel</button>
            <!-- 导出excel 结束 -->
            <!-- 表格 开始 -->
            <table class="table table-hover" align="center" id="datatable">
              <thead>
              <tr>
                <th>No.</th>
                <th>姓名</th>
                <th>电话</th>
                <th>邮箱</th>
                <th>QQ</th>
                <th>学校</th>
                <th>专业</th>
                <th>英语成绩</th>
                <th>政治成绩</th>
                <th>专业1成绩</th>
                <th>专业2成绩</th>
                <th>考研总分</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in items">
                <th scope="row">{{ item.id}}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.mobile }}</td>
                <td>{{ item.email }}</td>
                <td>{{item.qq}}</td>
                <td v-if="item.school">{{ item.school.name }}</td>
                <td v-else></td>
                <td>{{ item.major }}</td>
                <td>{{ item.englishScore }}</td>
                <td>{{ item.politicalScore }}</td>
                <td>{{ item.major1_score }}</td>
                <td>{{ item.major2_score }}</td>
                <td>{{ item.amount }}</td>
              </tr>
              </tbody>
            </table>
            <!-- 表格 结束 -->
            <!-- 分页 开始 -->
            <pagination :pagination="pagination" :callback="init" :options="paginationOptions"></pagination>
            <!-- 分页 结束 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from 'vue-bootstrap-pagination'
  export default {
    name: 'ScoreList',
    data () {
      return {
        items: [],
        pagination: {
          total: 0,
          per_page: 10,  // 每页的数量
          current_page: 1,
          last_page: 1  // 最后一页的页码
          // from: 1,
          // to: 10
        },
        paginationOptions: {
          offset: 4,
          previousText: '上一页',
          nextText: '下一页',
          alwaysShowPrevNext: true
        },
        pattern: /page=(\d+)&/
      }
    },
    methods: {
      init: function () {
        if (window.localStorage.getItem('userType') !== 'admin') {
          alert('无访问权限')
          return
        }
        var _this = this
        let userId = localStorage.getItem('userId')
        let url = 'https://test-yikaoyan-api.51easymaster.com/score/'
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userId: userId,
            pageSize: _this.pagination.per_page,
            page: _this.pagination.current_page
          },
          success: function (response) {
            console.log(response)
            _this.items = response.results
            console.log(_this.items)
            _this.pagination.total = response.count  // 总数
            if (response.next) {
              // 根据返回结果的下一页获取当前页码
              let nextPage = response.next.match(_this.pattern)[1]
              _this.pagination.current_page = nextPage - 1
            }
            // 计算最后一页的页码 last_page：total / per_page
            let resFull = _this.pagination.total / _this.pagination.per_page
            let mod = _this.pagination.total % _this.pagination.per_page
            let resInt = parseInt(resFull)
            if (_this.pagination.total === 0) {
              _this.pagination.last_page = 1
            } else {
              if (mod > 0) {
                _this.pagination.last_page = resInt + 1
              } else {
                _this.pagination.last_page = resInt
              }
            }
          },
          error: function (err) {
            console.log(err)
            alert('访问错误')
          }
        })
      },

      handleDownload () {
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('vendor/Export2Excel')
          const tHeader = ['序号', '姓名', '电话', '邮箱', 'QQ', '学校', '专业', '英语成绩',
            '政治成绩', '专业1成绩', '专业2成绩', '考研总分']
          const filterVal = ['id', 'name', 'mobile', 'email', 'qq', 'school', 'major', 'englishScore',
            'politicalScore', 'major1_score', 'major2_score', 'amount']
          const listStr = JSON.stringify(this.items)
          const list = JSON.parse(listStr)
          for (var i = 0; i < list.length; i++) {
            if (list[i].school) {
              list[i].school = list[i].school.name
            } else {
              list[i].school = '/'
            }
          }
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '学生考研信息excel')
        })
      },
      // 参数过滤
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    mounted () {
      this.init()
    },
    components: {
      pagination
    }
  }
</script>

<style scoped>
  th, td {
    text-align: center
  }
</style>
