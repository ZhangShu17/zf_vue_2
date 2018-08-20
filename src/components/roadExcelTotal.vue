<template>
  <div>
    <div class="container">
      <h3 align="center">{{result.data.name}}“三长制”统计表
      </h3>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_commodity_list">
            <!-- 表格 开始 -->
            <button type="button" width="30" @click="export2Excel('tb_road')">打印</button>
            <table id="tb_road" class="table" align="center" border="3">
              <thead>
              <tr>
                <th>路线</th>
                <th>{{result.data.name}}</th>
                <th>长度(km)</th>
                <th>{{result.data.length}}</th>
                <th>段/岗数量</th>
                <th>{{result.data.sectionStationNum.split('-')[0] + '岗' + result.data.sectionStationNum.split('-')[1] + '哨'}}</th>
              </tr>
              </thead>
              <thead>
              <tr>
                <th colspan="2" style="text-">名称</th>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
                <th>电台呼号</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in result.data.chief">
                <tr>
                  <th colspan="2" align="center">路长</th>
                  <td>{{list.name}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{list.callSign}}</td>
                </tr>
              </template>
              </tbody>
            <!-- 段落表-->
              <thead>
              <tr>
                <th>名称</th>
                <th>路段</th>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
                <th>电台呼号</th>
              </tr>
              </thead>
              <tbody>
                <template v-for="section in result.data.Road_Section">
                  <template v-for = "chief in section.chief">
                  <tr>
                    <th>段长</th>
                    <th>{{section.name}}</th>
                    <td>{{chief.name}}</td>
                    <td>{{chief.duty}}</td>
                    <td>{{chief.mobile}}</td>
                    <td>{{chief.callSign}}</td>
                  </tr>
                  </template>
                </template>
              </tbody>
              <thead>
              <tr>
                <th>名称</th>
                <th>岗位</th>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
                <th>电台呼号</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="section in result.data.Road_Section">
                <template v-for="station in section.Section_Station">
                  <template v-for="chief in station.chief">
                  <tr>
                    <th>岗长</th>
                    <th>{{station.name}}</th>
                    <td>{{chief.name}}</td>
                    <td>{{chief.duty}}</td>
                    <td>{{chief.mobile}}</td>
                    <td>{{chief.callSign}}</td>
                  </tr>
                  </template>
                </template>
              </template>
              </tbody>
            <!-- 表格 结束 -->
            </table>
          </div>
        </div>
      </div>
    </div>
    <button style="margin-left: 50%" @click="pushDetail">上一页</button>
  </div>
</template>

<script>
  import config from '../config/config'
  export default {
    name: 'roadExcelTotal',
    data () {
      return {
        result: {}
      }
    },
    methods: {
      init: function () {
        let roadId = this.$route.query.roadId
        let url = config.ROOT_API_URL + 'road/excel/info'
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          async: false,  // 取消异步请求
          data: {
            userName: localStorage.getItem('userName'),
            roadId: roadId
          },
          success: function (response) {
            console.log('excel成功')
            console.log(response)
            _this.result = response
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      export2Excel: function (tableId) {
        console.log('打印excel，tableId:' + 'table_print')
        require.ensure([], () => {
          const { export_table_to_excel } = require('../../vendor/vendor/Export2Excel')
          export_table_to_excel(tableId)
        })
      },
      pushDetail: function () {
        this.$router.push(
          {path: '/roadExcel', query: {roadId: this.$route.query.roadId}}
        )
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
