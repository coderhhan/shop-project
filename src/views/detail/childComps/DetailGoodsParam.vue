<template>
<div class="param-infos" v-if="Object.keys(detailParam).length !==0">
  <table v-for="(table,index) in detailParam.sizes" :key="index" class="param-sizes">
    <tr v-for="(tr,indey) in table" :key="indey">
      <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
    </tr>
  </table>
  <table class="param-info">
    <tr v-for="(info,index) in detailParam.infos" :key="index">
      <td class="param-info-key" >{{info.key}}</td>
      <td class="param-info-value">{{info.value}}</td>
    </tr>
  </table>
  <div class="info-img" v-if="detailParam.image.length !==0">
    <img :src="detailParam.image" alt="">
  </div>

</div>
</template>

<script>
  export default {
    name: "DetailGoodsParam",
    props:{
      detailParam:{
        type:Object,
        default (){
          return {}
           }
      }
    }
  }
</script>

<style scoped>
.param-infos {
  padding:20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;
}
  .param-infos table {
    width: 100%;
    border-collapse: collapse; /*//边框合并*/
    text-align: center;
  }
  .param-infos table tr{
    height: 42px;
  }
  .param-infos table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);

  }
  .param-info-key {
    width: 95px;

  }
  .param-info{
  border-top: 1px solid rgba(0,0,0,.1);

  }
  .param-info-value {
    color: #eb4868;
    text-align: left;
  }
  .info-img img{
    width: 100%;
  }
</style>
