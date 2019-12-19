<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center" >购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list />
<!--    底部汇总-->
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import CartButtomBar from "./childComps/CartButtomBar";
  import CartList from "./childComps/CartList";
  import NavBar from "components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartButtomBar
    },
    computed:{
      //两种语法
     //...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }

  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
