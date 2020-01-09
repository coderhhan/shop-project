<template>
<div >
    <div>
      <nav-bar class="profile-nav-bar"><div  slot="center">个人中心</div></nav-bar>
      <user-info></user-info>
    </div>
  <div class="user-number">
    <div class="item" >
      <span>0.00</span>元
      <div>我的余额</div>
    </div>
    <div class="item center-item">
      <span>0</span>个
      <div>我的优惠</div>
    </div>
    <div  class="item">
      <span>0</span>分
      <div>我的积分</div>
    </div>
  </div>
  <div class="order-list">
  <list-info :listData="orderList"></list-info>
  </div>
  <div class="service-list">
     <list-info :listData="serviceList"></list-info>
  </div>
</div>
</template>

<script>
  import ListInfo from "./childComps/ListInfo";
  import NavBar from "../../components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  export default {
    name: "Profile",
    components:{
      UserInfo,
      NavBar,
      ListInfo

    },
    data: function () {
      return {
        orderList: [
          {icon: './img/mymsg.png', iconColor: '#ff8198', info: '我的消息'},
          {icon: './img/sode.png', iconColor: '#fc7b53', info: '积分商城'},
          {icon: './img/card.png', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: './img/sode.png', iconColor: '#ff8198', info: '我的购物车'},
          {icon: './img/mymsg.png', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
  }
</script>

<style scoped>
  .profile-nav-bar{
    border-bottom: 1px solid rgba(0,0,0,.5);
    background-color:var(--color-tint);
    color: var(--color-background);
    font-weight: bold;
  }
  .user-number{
    top: -49px;
    height: 80px;
    width: 100%;
    display: flex;
    position: relative;

  }
  .user-number .item{
    text-align: center;
    float:right;
    flex: 1;
    padding: 18px;
  }
  .item div{
    margin-top: 5px;
  }
  .item span{
    font-weight:bold;
    display: inline-block;
    font-size: 24px;
    color: var(--color-high-text);
  }
  .item{
    font-size: 13px;
  }
  .center-item{
    border-right: 1px solid rgba(0,0,0,.1);
    border-left: 1px solid rgba(0,0,0,.1);
  }
  .list-info img{
    width: 20px;
  }
  .order-list{
    position: relative;
    top: -50px;
    padding: 0 20px;
    border-top: 10px solid rgba(0,0,0,.05);
    border-bottom: 10px solid rgba(0,0,0,.05);
  }
  .service-list{
    position: relative;
    top: -50px;
    padding: 0 20px;
  }
</style>
