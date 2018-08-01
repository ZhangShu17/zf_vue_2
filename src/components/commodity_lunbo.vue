<template>
  <div>
    <div id="container">
      <img :src="imgurllist[index]" style="height: 100%; width: 100%; display: block;">
      <!--<img src="http://p3b2k5uhp.bkt.clouddn.com/1517582652*141517294296_.pic.jpg" alt="2">-->
      <!--<img src="http://p3b2k5uhp.bkt.clouddn.com/1517582652*151517294298_.pic.jpg" alt="3">-->
      <!--<img src="http://p3b2k5uhp.bkt.clouddn.com/1517582653*161517294298_.pic.jpg" alt="4">-->
      <!--<img src="http://p3b2k5uhp.bkt.clouddn.com/1517582653*181517294300_.pic.jpg" alt="5">-->
      <!--<img src="http://p3b2k5uhp.bkt.clouddn.com/1517582653*211517294302_.pic.jpg" alt="6">-->
    </div>
    <div id="buttons">
      <span index="1" class="on"></span>
      <span index="2"></span>
      <span index="3"></span>
      <span index="4"></span>
      <span index="5"></span>
      <span index="6"></span>
    </div>
    <a id="prev" class="arrow" @click="PrevImage">&lt;</a>
    <a id="next" class="arrow" @click="NextImage">&gt;</a>
  </div>
</template>

<script>
    export default {
      name: 'CommodityLunBo',
      data () {
        return {
          imgurllist: [
            'http://p3b2k5uhp.bkt.clouddn.com/1517582651*131517294294_.pic.jpg',
            'http://p3b2k5uhp.bkt.clouddn.com/1517582652*141517294296_.pic.jpg',
            'http://p3b2k5uhp.bkt.clouddn.com/1517582653*161517294298_.pic.jpg',
            'http://p3b2k5uhp.bkt.clouddn.com/1517582653*161517294298_.pic.jpg',
            'http://p3b2k5uhp.bkt.clouddn.com/1517582653*181517294300_.pic.jpg',
            'http://p3b2k5uhp.bkt.clouddn.com/1517582653*211517294302_.pic.jpg'
          ],
          index: 0
        }
      },
      methods: {
        PrevImage: function () {
          console.log('prev')
          if (this.index === 0) {
            this.index = 5
          } else {
            this.index --
          }
          console.log(this.index)
        },
        NextImage: function () {
          if (this.index === 5) {
            this.index = 0
          } else {
            this.index++
          }
          console.log(this.index)
        }
      },
      mounted: function () {
        console.log(this.index)
      }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  body{
    padding: 20px;
  }
  #container{
    position: relative;
    width: 600px;
    height: 400px;
    border: 3px solid #4cae4c;
    overflow: hidden;
  }
  #list{
    position: absolute;
    z-index: 2;
    width: 4200px;
    height: 400px;
  }
  #list img{
    float: right;
    width: 300px;
    height: 200px;
  }
  #buttons{
    position: absolute;
    left: 300px;
    buttom: 20px;
    z-index: 2;
    height: 10px;
    width: 100px;
  }
  #buttons span{
    float: left;
    margin-right: 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #c9302c;
    border-radius: 50%;
    background: #ac2925;
    cursor: pointer;
  }
  #buttons .on{
    background: orangered;
  }
  #prev {
    left: 20px;
  }
  #next{
    right: 20px;
  }
  .arrow{
    position: absolute;
    top: 180px;
    z-index: 2;
    /*display: none;*/
    width: 40px;
    height: 40px;
    font-size: 36px;
    font-weight: bold;
    line-height: 39px;
    text-align: center;
    color: #fff;
    background-color: rgba(0,0,0,.3);
    cursor: pointer;
  }
  .arrow:hover{
    background-color: rgba(0,0,0,.7);
  }
  #container:hover .arrow{
    display: block;
  }

</style>
