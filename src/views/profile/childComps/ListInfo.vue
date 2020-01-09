<template>
  <div class="list-info-content">
        <div v-for="(item,index) in listData" :key="index" class="item">
            <span class="icon">
                <img :src="item.icon" alt="">
           </span>
          <div class="info">{{item.info}}</div>
        </div>
  </div>
</template>

<script>
  export default {
    name: "ListInfo",
    props:{
      listData:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style scoped>

  .icon img {
    width: 18px;
    height: 18px;
  }
  .icon {
    position: relative;
    top: 10px;
  }
  .info{
    position: relative;
    top: -10px;
    left: 20px;
  }
  .item{
    border-bottom: 1px solid rgba(0,0,0,.05);
  }
</style>
