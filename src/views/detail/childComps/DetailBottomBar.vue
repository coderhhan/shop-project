<template>
  <div class="bottom-bar">
    <div class="bar-item  bar-left">
      <div >
        <img src="~assets/img/detail/service.png" alt="">
        <span class="text">客服</span>
      </div>
      <div>
        <img src="~assets/img/detail/shop.png" alt="">
        <span class="text" >店铺</span>
      </div>
      <div>
        <img src="~assets/img/detail/test.png" alt="">
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item  bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "DetailBottomBar",
    components:{

    },
    methods:{
      addCart(){
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
.bottom-bar {
  background-color: #f6f6f6;
  position: fixed;
   height: 58px;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
  .bar-item div{
    flex: 1;
  }
  .bar-left  .text{
    font-size: 13px;
  }
  .bar-left img {
    display: block;
    width: 24px;
    height: 24px;
    margin: 10px auto 0px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart{
    color: #333;
    background-color: #ffe817;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>
