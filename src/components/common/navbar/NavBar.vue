<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

  export default {
    name: "NavBar"
  }
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  text-align: center;
  width: 100%;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100,100,100,.3);
}
  .left,.right {
    width: 60px;

  }
  .center{
    flex: 1; /*其他有设置，没有设置的会是剩余的长度*/


  }
</style>
