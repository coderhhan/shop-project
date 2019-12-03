<template>
  <div id="app">

    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar";
  import NavBar from "./components/common/navbar/NavBar";
  export default {
    name: 'App',
    components:{
      MainTabBar,
      NavBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";

</style>
