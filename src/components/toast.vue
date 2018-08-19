<template>
  <div class="wrap">{{parentMessage}}</div>
</template>

<script>
    export default {
      name: 'toast',
      props: ['parentMessage']
    }
</script>

<style scoped>
  .wrap{
    position: fixed;
    left: 90%;
    top:5%;
    background: #5bc0de;
    padding: 30px;
    border-radius: 5px;
    transform: translate(-10%,-10%);
    color: #101010;
  }
</style>
