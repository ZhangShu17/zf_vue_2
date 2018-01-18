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
            <tr v-for="li in list_view">
              <th scope="row">{{li.id}}</th>
              <td>{{ li.name }}</td>
              <td>{{ li.mobile }}</td>
              <td>{{ li.email }}</td>
              <td>{{ li.school }}</td>
              <td>{{ li.major }}</td>
              <td>{{ li.englishScore }}</td>
              <td>{{ li.politicalScore }}</td>
              <td>{{ li.mathScore }}</td>
              <td>{{ li.majorScore }}</td>
              <td>{{ li.amount }}</td>
            </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination" v-if="pages.length<=5">
              <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in pages" @click="change_page_view('',$event)">
                <a href="#">{{page.id}}</a>
              </li>

              <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li><a>当前第:{{page_activate}}/{{pages.length}}页</a></li>
            </ul>
            <ul class="pagination" v-else>
              <li @click="remove_1">
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li @click="change_page_view('',$event)"><a href="#">{{tag_1}}</a></li>
              <li @click="change_page_view('',$event)"><a href="#">{{tag_2}}</a></li>
              <li @click="change_page_view('',$event)"><a href="#">{{tag_3}}</a></li>
              <li @click="change_page_view('',$event)"><a href="#">{{tag_4}}</a></li>
              <li @click="change_page_view('',$event)"><a href="#">{{tag_5}}</a></li>
              <li @click="add_1">
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li><a>当前第{{page_activate}}/{{pages.length}}页</a></li>
            </ul>
          </nav>

        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreList',
    data () {
      return {
        list: [],
        list_view: [],
        pages: [],
        tag_1: 1,
        tag_2: 2,
        tag_3: 3,
        tag_4: 4,
        tag_5: 5,
        page_activate: 1
      }
    },
    methods: {
      init: function () {
        var _this = this
        let userId = localStorage.getItem('userId')
        let url = 'http://test-yikaoyan-api.51easymaster.com/score/?userId=' + userId
        $.ajax({
          url: url,
          type: 'GET',
          success: function (response) {
            _this.list = response.results
            var len = _this.list.length
            console.log('数据共' + len + '条')
            var int = parseInt(len / 15)
            var mod = (len % 15)
            if (mod > 0) {
              int += 1
            }
            for (var i = 1; i <= int; i++) {
              _this.pages.push({id: i})
            }
            // 页面显示的数据条数
            if (len <= 15) {
              for (var j = 1; j <= len; j++) {
                _this.list_view.push(_this.list[j - 1])
              }
            } else {
              for (var k = 1; k <= 15; k++) {
                _this.list_view.push(_this.list[k - 1])
              }
            }
            console.log('ccc')
            console.log(_this.list_view)
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      remove_1: function () {
        console.log('======>这里是remove')
        if (this.tag_1 > 1) {
          this.tag_1--
          this.tag_2--
          this.tag_3--
          this.tag_4--
          this.tag_5--
        }
      },

      add_1: function () {
        console.log('======>这里是add')
        if (this.tag_5 < this.pages.length) {
          this.tag_1++
          this.tag_2++
          this.tag_3++
          this.tag_4++
          this.tag_5++
        }
      },

      change_page_view: function (msg, event) {
        console.log('======>改变页面显示了哦')
        var el = event.currentTarget
        this.page_activate = el.innerText
        // 将数组元素清空
        // console.log("list_view的长度为"+this.list_view.length);
        this.list_view.splice(0, this.list_view.length)
        // console.log("list_view的长度为"+this.list_view.length);
        var remain = this.list.length - 15 * (this.page_activate - 1)
        if (remain <= 15) {
          // console.log("====剩下还不到15个哦！=====")
          for (var i = 1; i <= remain; i++) {
            this.list_view.push(this.list[15 * (this.page_activate - 1) + (i - 1)])
          }
        } else {
          // console.log("====剩下的超过了15个哦=====")
          for (var m = 1; m <= 15; m++) {
            this.list_view.push(this.list[15 * (this.page_activate - 1) + (m - 1)])
          }
        }
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
          const data = this.formatJson(filterVal, this.list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      // 参数过滤
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
  th, td {
    text-align: center
  }
</style>
