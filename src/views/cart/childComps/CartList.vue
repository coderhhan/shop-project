<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
<!--  <li v-for="(item,index) in cartList"> {{item}}</li>-->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
  </scroll>

</div>
</template>

<script>

  import CartListItem from "./CartListItem";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem,

    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()

    },
    methods:{
      checkAll(){

      }
    }
  }
</script>

<style scoped>

  .cart-list{

    height: calc(100% - 44px - 49px - 40px);
  }
.content{
  height: 100%;
  overflow: hidden;
  background-color: #F2F2F2;
}

</style>
