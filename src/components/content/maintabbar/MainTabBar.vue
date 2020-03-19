<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <van-icon slot="item-icon" size="30px" name="wap-home" />
      <van-icon slot="item-icon-active" color="var(--color-tint)" size="30px"  name="wap-home" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <van-icon slot="item-icon" name="apps-o" size="30px"/>
      <van-icon slot="item-icon-active" color="var(--color-tint)" name="apps-o" size="30px"/>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <van-icon slot="item-icon" name="shopping-cart" size="30px"/>
      <van-icon slot="item-icon-active" color="var(--color-tint)"  size="30px" name="shopping-cart" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <van-icon slot="item-icon" name="manager" size="30px"/>
      <van-icon slot="item-icon-active" color="var(--color-tint)"  size="30px" name="manager" />
      <div slot="item-text">我的</div>
    </tab-bar-item>


  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem';
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
.van-icon {
  margin-top: 3px;
  vertical-align: middle;

}
.van-icon :active{
  color:var(--color-tint);
}

</style>
