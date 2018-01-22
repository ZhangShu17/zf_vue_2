<template>
  <div class="container">
    <div class="col-md-3">
      <hr>
     <button class="btn btn-danger" @click="logout">退出登陆</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'logout',
      methods: {
        logout: function () {
          localStorage.clear()
          this.$router.push({name: 'Login'})
        }
      },
      mounted: function () {
        if (!window.localStorage.getItem('userName')) {
          this.$router.push({name: 'Login'})
        }
      }
    }
</script>

<style scoped>

</style>
