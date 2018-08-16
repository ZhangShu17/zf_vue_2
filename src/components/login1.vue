<template>

  <div class="message warning">
    <div class="inset">
      <div class="login-head">
        <h1>Login Form</h1>
        <div class="alert-close"> </div>
      </div>
      <form>
        <li>
          <input type="text" class="text" value="Username" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Username';}"><a href="#" class=" icon user"></a>
        </li>
        <div class="clear"> </div>
        <li>
          <input type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"> <a href="#" class="icon lock"></a>
        </li>
        <div class="clear"> </div>
        <div class="submit">
          <input type="submit" onclick="myFunction()" value="Sign in" >
          <h4><a href="#">Lost your Password ?</a></h4>
          <div class="clear">  </div>
        </div>

      </form>
    </div>
  </div>
  <div class="clear"> </div>
  <!--- footer --->
  <div class="footer">
    <p>Copyright &copy; 2014.</p>
  </div>
</template>

<script>
  import style from '/static/style.css'

    export default {
      name: 'login1'
    }
</script>

<style scoped>

</style>
