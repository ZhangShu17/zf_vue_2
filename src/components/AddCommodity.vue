<template>
  <div>
  <div class="container" id="add_commodity">
    <div class="row">
      <div class="col-md-6">
        <h3 align="center">馨雨商铺商品提交系统</h3>
        <hr>
        <form class="form-horizontal">
          <!--商品名称-->
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">商品名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="name" v-model="commodity_name">
            </div>
          </div>
          <!--商品类型-->
          <div class="form-group">
            <label for="type" class="col-sm-2 control-label">商品类型</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="type" v-model="commodity_type">
            </div>
          </div>
          <!--生产地区-->
          <div class="form-group">
            <label for="country" class="col-sm-2 control-label">生产地区</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="country" v-model="commodity_country">
            </div>
          </div>
          <!--销售价格-->
          <div class="form-group">
            <label for="price" class="col-sm-2 control-label">销售价格</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="price" v-model="commodity_price">
            </div>
          </div>
          <!--折扣价格-->
          <div class="form-group">
            <label for="discountprice" class="col-sm-2 control-label">折扣价格</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="discountprice" v-model="commodity_discount_price">
            </div>
          </div>
          <!--商品单位-->
          <div class="form-group">
            <label for="unit" class="col-sm-2 control-label">商品单位</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="unit" v-model="commodity_unit">
            </div>
          </div>
          <!--折扣状态-->
          <div class="form-group">
            <label for="discountstatus" class="col-sm-2 control-label">折扣状态</label>
            <div class="col-sm-10">
              <select class="form-control" id="discountstatus" v-model="commodity_discount_price_status">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <!--在线状态-->
          <div class="form-group">
            <label for="onsalestatus" class="col-sm-2 control-label">在线状态</label>
            <div class="col-sm-10">
              <select class="form-control" id="onsalestatus" v-model="commodity_sales_status">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div class="row">
         <!--商品简介-->
          <div class="form-group">
            <label for="comments" class="col-sm-2 control-label">商品简介</label>
            <div class="col-sm-10">
              <textarea id="comments" class="form-control" placeholder="限200字" rows="5" cols="30" v-model="commodity_comments"></textarea>
            </div>
          </div>
      <template v-for="i in 6">
        <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img data-src="holder.js/100%x200" alt="100%x200" :src="imageurl[i-1].url" data-holder-rendered="true" style="height: 200px; width: 100%; display: block;">
          <div class="caption">
            <input type="file" :id="i" @change="ChooseFile($event)">
          </div>
        </div>
      </div>
      </template>
    </div>
          <!--提交按钮-->
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-8">
              <button type="button" class="btn btn-primary btn-block" @click="submit">提交</button>
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
      name: 'add-commodity',
      data: function () {
        return {
          commodity_name: '',
          commodity_type: '',
          commodity_country: '',
          commodity_price: '',
          commodity_discount_price: '',
          commodity_discount_price_status: null,
          commodity_unit: '',
          commodity_sales_status: null,
          commodity_comments: '',
          imageid: null,
          file: [
            {file: null},
            {file: null},
            {file: null},
            {file: null},
            {file: null},
            {file: null}
          ],
          imageurl: [
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'},
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'},
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'},
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'},
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'},
            {url: 'http://p3b2k5uhp.bkt.clouddn.com/hzp.jpeg'}
          ]
        }
      },
      methods: {
        ChooseFile: function (event) {
          var id = parseInt(event.target.id)
          var file = event.target.files[0]
          var URL = window.URL || window.webkitURL
          var imageURL = URL.createObjectURL(file)
          this.imageurl[id - 1].url = imageURL
          this.file[id - 1].file = file
        },
        submit: function () {
          var _this = this
          var url1 = 'http://127.0.0.1:9091/v1/gxyws/AddCommodityUrl'
          var data = new FormData()
          data.append('file1', _this.file[0].file)
          data.append('file2', _this.file[1].file)
          data.append('file3', _this.file[2].file)
          data.append('file4', _this.file[3].file)
          data.append('file5', _this.file[4].file)
          data.append('file6', _this.file[5].file)
          $.ajax({
            url: url1,
            type: 'POST',
            async: false,  // 取消异步请求
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
              console.log('图片上传成功')
              console.log(response)
              _this.imageid = response.imageid
            },
            error: function (error) {
              console.log(error)
            }
          })
          var url2 = 'http://127.0.0.1:9091/v1/gxyws/AddCommodity'
          if (this.imageid !== null) {
            $.ajax({
              url: url2,
              type: 'POST',
              async: false,
              data: JSON.stringify({
                name: _this.commodity_name,
                type: _this.commodity_type,
                country: _this.commodity_country,
                price: _this.commodity_price,
                discountprice: _this.commodity_discount_price,
                discountpricestatus: parseInt(_this.commodity_discount_price_status),
                unit: _this.commodity_unit,
                salestatus: parseInt(_this.commodity_sales_status),
                comments: _this.commodity_comments,
                imageid: _this.imageid
              }),
              success: function (response) {
                console.log('商品添加成功')
                console.log(response)
                _this.$router.push('/commodityList')
              },
              error: function (error) {
                console.log(error)
              }
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
