<template>
  <div id="app">
      <keep-alive exclude="detail"> <router-view/></keep-alive>
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
    },
    created() {  //将vuex 缓存到sessionstorage里
      console.log('触发+created'+this.$store.state.cartList)
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  main-tab-ba {
    z-index: 9;
  }
</style>
