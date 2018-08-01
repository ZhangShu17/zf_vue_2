<template>
    <div>
  <div class="container" id="edit_commodity">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center">馨雨商铺商品管理系统</h3>
        <hr>
        <form class="form-horizontal">
          <!--商品编号-->
          <div class="form-group">
            <label for="commodityID" class="col-sm-4 control-label">商品编号</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" disabled="disabled" id="commodityID" v-model="commodityID">
            </div>
          </div>
          <!--商品名称-->
          <div class="form-group">
            <label for="commodityName" class="col-sm-4 control-label">商品名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="commodityName" disabled="disabled" v-model="commodityName">
            </div>
          </div>
          <!--商品类型-->
          <div class="form-group">
            <label for="commodityType" class="col-sm-4 control-label">商品类型</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="commodityType" disabled="disabled" v-model="commodityType">
            </div>
          </div>
          <!--生产地区-->
          <div class="form-group">
            <label for="commodityCountry" class="col-sm-4 control-label">生产地区</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="commodityCountry" disabled="disabled" v-model="commodityCountry">
            </div>
          </div>
          <!--销售价格-->
          <div class="form-group">
            <label for="price" class="col-sm-4 control-label">销售价格</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="price" v-model="price">
            </div>
          </div>
          <!--折扣价格-->
          <div class="form-group">
            <label for="discountprice" class="col-sm-4 control-label">折扣价格</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="discountprice" v-model="discountprice">
            </div>
          </div>
          <!--在线状态-->
          <div class="form-group">
            <label for="salestatus" class="col-sm-4 control-label">在线状态</label>
            <div class="col-sm-8">
              <select class="form-control" id="salestatus" v-model="salestatus">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <!--折扣状态-->
          <div class="form-group">
            <label for="discountstatus" class="col-sm-4 control-label">折扣状态</label>
            <div class="col-sm-8">
              <select class="form-control" id="discountstatus" v-model="discountstatus">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <!--创建时间-->
          <div class="form-group">
            <label for="createTime" class="col-sm-4 control-label">创建时间</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="createTime" disabled="disabled" v-model="createTime">
            </div>
          </div>
          <!--商品评价-->
          <div class="form-group">
            <label for="comments" class="col-sm-4 control-label">商品评价</label>
            <div class="col-sm-8">
              <textarea type="text" class="form-control" id="comments" rows="5" cols="30" v-model="comments"></textarea>
            </div>
          </div>
          <!--提交按钮-->
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="EditCommodity">提交</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: 'editcommodity',
      data () {
        return {
          commodityID: null,
          commodityName: '',
          commodityType: '',
          commodityCountry: '',
          price: '',
          discountprice: '',
          salestatus: null,
          discountstatus: null,
          createTime: '',
          comments: ''
        }
      },
      methods: {
        EditCommodity: function () {
          var _this = this
          var url = 'http://127.0.0.1:9091/v1/gxyws/editCommodity'
          $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: JSON.stringify({
              commodityid: parseInt(_this.commodityID),
              price: _this.price,
              discountprice: _this.discountprice,
              salesstatus: parseInt(_this.salestatus),
              discountstatus: parseInt(_this.discountstatus),
              comments: _this.comments
            }),
            success: function (response) {
              console.log(response)
              _this.$router.push('/commodityList')
            },
            error: function (err) {
              console.log(err)
            }
          })
        }
      },
      mounted () {
        this.commodityID = window.localStorage.getItem('editcommodity_id')
        this.commodityName = window.localStorage.getItem('editcommodity_name')
        this.commodityType = window.localStorage.getItem('editcommodity_type')
        this.commodityCountry = window.localStorage.getItem('editcommodity_country')
        this.price = window.localStorage.getItem('editcommodity_price')
        this.discountprice = window.localStorage.getItem('editcommodity_discountprice')
        this.salestatus = window.localStorage.getItem('editcommodity_salestatus')
        this.discountstatus = window.localStorage.getItem('editcommodity_discountpricestatus')
        this.createTime = window.localStorage.getItem('editcommodity_createtime')
        this.comments = window.localStorage.getItem('editcommodity_comments')
      }
    }
</script>

<style scoped>

</style>
