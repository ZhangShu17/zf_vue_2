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
                <th>学校</th>
                <th>专业</th>
                <th>英语成绩</th>
                <th>政治成绩</th>
                <th>数学成绩</th>
                <th>专业成绩</th>
                <th>考研总分</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in items">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.mobile }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.school }}</td>
                <td>{{ item.major }}</td>
                <td>{{ item.englishScore }}</td>
                <td>{{ item.politicalScore }}</td>
                <td>{{ item.mathScore }}</td>
                <td>{{ item.majorScore }}</td>
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
            // console.log(response)
            _this.items = response.results
            _this.pagination.total = response.count  // 总数
            if (response.next) {
              // 根据返回结果的下一页获取当前页码
              let nextPage = response.next.match(_this.pattern)[1]
              _this.pagination.current_page = nextPage - 1
            }
            // 计算最后一页的页码 last_page：total / per_page
            let resFull = _this.pagination.total / _this.pagination.per_page
            let resInt = parseInt(resFull)
            if (resFull < 1) {
              _this.pagination.last_page = 1
            } else if (resFull === 1) {
              _this.pagination.last_page = resFull
            } else {
              _this.pagination.last_page = resInt + 1
            }
          },
          error: function (err) {
            console.log(err)
          }
        })
      },

      handleDownload () {
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('vendor/Export2Excel')
          const tHeader = ['序号', '姓名', '电话', '邮箱', '学校', '专业', '英语成绩',
            '政治成绩', '数学成绩', '专业成绩', '考研总分']
          const filterVal = ['id', 'name', 'mobile', 'email', 'school', 'major', 'englishScore',
            'politicalScore', 'mathScore', 'majorScore', 'amount']
          // const list = [
          //   {id: 1, title: 2, author: 3, pageviews: 4, display_time: 5},
          //   {id: 6, title: 7, author: 8, pageviews: 9, display_time: 10},
          //   {id: 11, title: 12, author: 13, pageviews: 14, display_time: 15}
          // ]
          const data = this.formatJson(filterVal, this.items)
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
