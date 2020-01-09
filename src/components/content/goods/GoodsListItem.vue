<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="showGoodsImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
</div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showGoodsImage() {
        if (this.goodsItem.image){
          return this.goodsItem.image
        }else if (this.goodsItem.img){
          return this.goodsItem.img
        }else if (this.goodsItem.show.img){
          return this.goodsItem.show.img
        }
      }
    }
    ,
    methods:{
      imageLoad(){
        this.$bus.$emit('ItemImageLoad')
        // 等于-1没找到 不等于-说明 找到了
        // if (this.$route.path.indexOf('/home') !== -1) {
        //   console.log(this.$route.path.indexOf('/home')   +'首页刷新')
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if (this.$route.path.indexOf('/detail') !== -1){
        //   console.log(this.$route.path.indexOf('/detail')+'详情页刷新')
        //   this.$bus.$emit('detailItemImageLoad')
        // }

      },
      goodsItemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      },

    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;

  }
  .goods-item img {
    width: 100%;
    border-radius:5px;

  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
.goods-info .collect::before{
  content:'';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.png") 0 0/14px 14px;
}
</style>
