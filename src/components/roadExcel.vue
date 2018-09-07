<template>
  <div>
    <div class="container">
      <h3 align="center">{{result.data.name}}“三长制”详尽统计表
      </h3>
      <h4 align="right" height = "30px">
        <button @click="goBack">返回</button>
      </h4>
      <hr>
      <div class="container">
        <div class="bs-example" data-example-id="hoverable-table">
          <div id="app_commodity_list">
            <!-- 表格 开始 -->
            <button type="button" width="30" @click="export2Excel('tb_road')">打印</button>
            <table id="tb_road" class="table table-hover" align="center" border="1">
              <thead>
              <tr>
                <th>路线</th>
                <th>{{result.data.name}}</th>
                <th>长度(km)</th>
                <th>{{result.data.length}}</th>
                <th>段/岗数量</th>
                <th>{{result.data.sectionStationNum.split('-')[0] + '段' + result.data.sectionStationNum.split('-')[1] + '岗'}}</th>
              </tr>
              </thead>
              <thead>
              <tr>
                <th>名称</th>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
                <th>电台信道</th>
                <th>电台呼号</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="list in result.data.chief">
                <tr>
                  <th>路长</th>
                  <td>{{list.name}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{result.data.channel}}</td>
                  <td>{{result.data.callSign}}</td>
                </tr>
              </template>
              <template v-for="list in result.data.execChiefSubBureau">
                <tr>
                  <th>执行路长(分局)</th>
                  <td>{{list.name}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{result.data.channel}}</td>
                  <td>{{result.data.callSign}}</td>
                </tr>
              </template>
              <template v-for="list in result.data.execChiefTrans">
                <tr>
                  <th>执行路长(交管)</th>
                  <td>{{list.name}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{result.data.channel}}</td>
                  <td>{{result.data.callSign}}</td>
                </tr>
              </template>
              <template v-for="list in result.data.execChiefArmedPoli">
                <tr>
                  <th>执行路长(武警)</th>
                  <td>{{list.name}}</td>
                  <td>{{list.duty}}</td>
                  <td>{{list.mobile}}</td>
                  <td>{{result.data.channel}}</td>
                  <td>{{result.data.callSign}}</td>
                </tr>
              </template>
              </tbody>
            </table>
            <!-- 表格 结束 -->

            <!-- 表格 开始 -->
            <button type="button"  width="30" @click="export2Excel('tb_section')">打印</button>
            <table id="tb_section" class="table table-hover" align="center" border="1">
              <template v-for="section in result.data.Road_Section" v-if="section.enabled">
                <thead>

                <tr>
                  <th>路段-{{section.id}}</th>
                  <th>名称</th>
                  <th>姓名</th>
                  <th>职务</th>
                  <th>电话</th>
                  <th>电台通道</th>
                  <th>电台通道</th>
                </tr>
                </thead>
                <tbody>
                <!--段长-->
                <template v-for="chief in section.chief">
                  <tr>
                    <th>{{section.name}}</th>
                    <th>段长</th>
                    <td>{{chief.name}}</td>
                    <td>{{chief.duty}}</td>
                    <td>{{chief.mobile}}</td>
                    <td>{{section.channel}}</td>
                    <td>{{section.callSign}}</td>
                  </tr>
                </template>
                <!--执行段长(分局)-->
                <template v-for="bureau in section.execChiefSubBureau">
                  <tr>
                    <th>{{section.name}}</th>
                    <th>执行段长(分局)</th>
                    <td>{{bureau.name}}</td>
                    <td>{{bureau.duty}}</td>
                    <td>{{bureau.mobile}}</td>
                    <td>{{section.channel}}</td>
                    <td>{{section.callSign}}</td>
                  </tr>
                </template>
                <!--执行段长(交通)-->
                <template v-for="trans in section.execChiefTrans">
                  <tr>
                    <th>{{section.name}}</th>
                    <th>执行段长(交通)</th>
                    <td>{{trans.name}}</td>
                    <td>{{trans.duty}}</td>
                    <td>{{trans.mobile}}</td>
                    <td>{{section.channel}}</td>
                    <td>{{section.callSign}}</td>
                  </tr>
                </template>
                <!--执行段长(武警)-->
                <template v-for="armedPoli in section.execChiefArmedPoli">
                  <tr>
                    <th>{{section.name}}</th>
                    <th>执行段长(武警)</th>
                    <td>{{armedPoli.name}}</td>
                    <td>{{armedPoli.duty}}</td>
                    <td>{{armedPoli.mobile}}</td>
                    <td>{{section.channel}}</td>
                    <td>{{section.callSign}}</td>
                  </tr>
                </template>
                <tr>
                  <th>岗位</th>
                  <th>名称</th>
                  <th>姓名</th>
                  <th>职务</th>
                  <th>电话</th>
                  <th>电台通道</th>
                  <th>电台通道</th>
                </tr>
                <template v-for="station in section.Section_Station" v-if="station.enabled">

                  <!--岗长-->
                  <template v-for="chief in station.chief">
                    <tr>
                      <th>{{station.name}}</th>
                      <th>岗长(分局)</th>
                      <th>{{chief.name}}</th>
                      <th>{{chief.duty}}</th>
                      <th>{{chief.mobile}}</th>
                      <th>{{station.channel}}</th>
                      <th>{{station.callSign}}</th>
                    </tr>
                  </template>
                  <!--执行岗长 交通-->
                  <template v-for="trans in station.execChiefTrans">
                    <tr>
                      <th>{{station.name}}</th>
                      <th>执行岗长(交通)</th>
                      <th>{{trans.name}}</th>
                      <th>{{trans.duty}}</th>
                      <th>{{trans.mobile}}</th>
                      <th>{{station.channel}}</th>
                      <th>{{station.callSign}}</th>
                    </tr>
                  </template>
                </template>
                </tbody>

              </template>

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
      name: 'roadExcel',
      data () {
        return {
          backAll: '',
          result: {}
        }
      },
      methods: {
        init: function () {
          this.backAll = this.$route.query.backAll
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
        goBack: function () {
          let serviceId = localStorage.getItem('curServiceId')
          this.$router.push({
            path: '/roadlist',
            query: {
              serviceLineId: this.backAll ? 0:serviceId
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
        // pushTotal: function () {
        //   this.$router.push(
        //   {path: '/roadExcelTotal', query: {roadId: this.$route.query.roadId,backAll:this.backAll}}
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
