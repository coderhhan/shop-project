<template>

  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <p class="respone" v-if="commentInfo.explain !== undefined">{{commentInfo.explain}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created |showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>

</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    mounted() {
     this.get()
    },
    methods:{
      get(){
        const lengt =Object.keys(this.commentInfo).length
        console.log(lengt);
        console.log(this.commentInfo)
      }
    },
    filters:{
      showDate(value){
        //1将时间戳变成date对象
        const date = new Date(value*1000)
        //2讲date进行进化
        return formatDate (date,'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
 .comment-info{
   padding: 5px 12px;
   colot:#333;
   border-bottom: 5px solid rgba(0,0,0,.1);
 }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title {
    float:left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width:47px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
 .info-detail .info-other {
   font-size: 12px;
   color: #999;
   margin-top: 10px;
 }
  .info-other .date{
    margin-top: 8px;
  }
  .info-imgs{
    margin-top: 10px;
  }
  .info-imgs img{
    width:70px;
    height: 70px;
    margin-right:5px
  }
 .info-detail p.respone{
    font-size: 10px;

   text-indent:2em;
  }
</style>
