<template>
  <div>
    <div class="container">
      <h3 align="center">{{result.data.name}}
      </h3>
      <h4 align="right" height = "30px">
        <button @click="goBack">返回</button>
      </h4>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_commodity_list">
            <!-- 表格 开始 -->
            <button type="button" width="30" @click="export2Excel('tb_serviceline')">打印</button>
            <table id="tb_serviceline" class="table" align="center"  border="3">
              <thead>
              <tr>
                <th colspan="3" style="text-align: center">路线</th>
                <th>单位</th>
                <th>路长</th>
                <th >职务</th>
                <th>电话</th>
                <th style="text-align: center">电台呼号</th>
              </tr>
              </thead>
              <!--路表-->
              <tbody>
              <template v-for="list in result.data.road" v-if="list.enabled ">
                <template v-for="chief in list.chief" v-if="chief.enabled">
                  <tr>
                    <td colspan="3" align="center">{{list.name+'('+list.length+'公里, '+list.sectionStationNum.split('-')[0] + '段'+list.sectionStationNum.split('-')[1] + '岗)'}}</td>
                    <td>{{chief.districtName+'分局'}}</td>
                    <td>{{chief.name}}</td>
                    <td>{{chief.duty}}</td>
                    <td>{{chief.mobile}}</td>
                    <td align="center">{{list.callSign}}</td>
                  </tr>
                </template>
              </template>
              </tbody>
            <!-- 段落表-->
              <thead>
              <tr>
                <th colspan="3"  style="text-align: center">路段</th>
                <th>单位</th>
                <th>段长</th>
                <th >职务</th>
                <th>电话</th>
                <th style="text-align: center">电台呼号</th>
              </tr>
              </thead>
              <tbody>
                <template v-for="road in result.data.road" v-if="road.enabled">
                  <template v-for="section in road.Road_Section" v-if="section.enabled">
                    <template v-for="chief in section.chief" v-if="chief.enabled">
                      <tr>
                        <td colspan="3" align="center">{{section.name}}</td>
                        <td>{{chief.districtName+'分局'}}</td>
                        <td>{{chief.name}}</td>
                        <td>{{chief.duty}}</td>
                        <td>{{chief.mobile}}</td>
                        <td align="center">{{section.callSign}}</td>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
              <!--岗长-->
              <thead>
                <tr>
                  <th colspan="3"  style="text-align: center">岗位</th>
                  <th >单位</th>
                  <th >岗长</th>
                  <th >职务</th>
                  <th >电话</th>
                  <th style="text-align: center">电台呼号</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="road in result.data.road" v-if="road.enabled">
                  <template v-for="section in road.Road_Section" v-if="section.enabled">
                    <template v-for="station in section.Section_Station" v-if="station.enabled">
                      <template v-for="chief in station.chief" v-if="chief.enabled">
                        <tr>
                          <td colspan="3"  style="text-align: center">{{station.name}}</td>
                          <td>{{chief.districtName+'分局'}}</td>
                          <td>{{chief.name}}</td>
                          <td>{{chief.duty}}</td>
                          <td>{{chief.mobile}}</td>
                          <td align="center">{{station.callSign}}</td>
                        </tr>
                      </template>
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
    <!--<button style="margin-left: 50%" @click="pushDetail">上一页</button>-->
  </div>
</template>

<script>
  import config from '../config/config'
  export default {
    name: 'roadExcelTotal',
    data () {
      return {
        backAll: '',
        result: {}
      }
    },
    methods: {
      init: function () {
        this.backAll = this.$route.query.backAll
        let serviceLineId = this.$route.query.serviceLineId
        let url = config.ROOT_API_URL + 'server_line/excel'
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          async: false,  // 取消异步请求
          data: {
            userName: localStorage.getItem('userName'),
            serviceLineId: serviceLineId
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
      goBack: function () {
        this.$router.push('/serviceLineList')
      },
      export2Excel: function (tableId) {
        console.log('打印excel，tableId:' + 'table_print')
        require.ensure([], () => {
          const { export_table_to_excel } = require('../../vendor/vendor/Export2Excel')
          export_table_to_excel(tableId)
        })
      },
      // pushDetail: function () {
      //   this.$router.push(
      //     {path: '/roadExcel', query: {roadId: this.$route.query.roadId ,backAll:this.backAll}}
      //   )
      // }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
