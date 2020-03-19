<template>
  <div id="user-info">
    <div class="user-img">
      <van-icon name="user-o" size="60px" />
    </div>
    <div class="user-login left">
      <div class="login">登录/注册</div>
      <div class="phone" >暂无绑定手机号</div>
      <img class="phone-img" src="~assets/img/profile/phone.png" alt="">
    </div>
    <img class="arrow right" src="~assets/img/detail/back.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  .phone{
    font-size:13px;
  }
  #user-info{
    position: relative;
    height: 90px;
    background-color: var(--color-tint);
    margin-top:-5px;
    padding: 15px;
  }
  .user-img img {
    width: 60px;
    height: 60px;
    text-align: center;
}
  .user-img {
    background-color: #f6f6f6;
    border-radius: 50%;
    width: 60px;
  }
  .left{
    float: left;
  }
  .user-login{
    color:#f6f6f6;
    line-height:20px;
    top:-55px;
    left: 70px;
    position: relative;
    height: 60px;
    width: 200px;
  }
  .arrow{
    position:relative;
    top: -40px;
    width: 10px;
    transform:rotate(180deg);
  }
  .phone{
    position:relative;
    top: 2px;
    left: 15px;
  }
  .phone-img{
    position:relative;
    width: 20px;
    left: -5px;
    top: -15px;
  }
</style>

