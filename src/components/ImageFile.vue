<template>
  <div>
    <input type="file" id="file" @change="CreateURL($event)">
    <img :src="src" width="200px" height="200px" id="img-change" @load="load($event)">
    <button id="btn">保存图片</button>
  </div>
</template>

<script>
    export default {
      name: 'imagefile',
      data: function () {
        return {
          src: 'http://orfg3zirg.bkt.clouddn.com/2017/06/14/test.png'
        }
      },
      methods: {
        CreateURL: function (event) {
          console.log('hello')
          console.log(event.target.files)
          console.log(event.target.value)
          var files = event.target.files
          var file = files[0]
          var URL = window.URL || window.webkitURL
          var imageURL = URL.createObjectURL(file)
          console.log(imageURL)
          this.src = imageURL
        },
        load: function (event) {
          console.log('图片加载')
          console.log(event.target.file)
        }
      }
    }
</script>

<style scoped>

</style>
