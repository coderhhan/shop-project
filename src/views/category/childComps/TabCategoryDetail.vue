<template>
  <div class="detail-container">
      <goods-list-item v-for="(item,index) in getCategoryDetailInfo" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GridView from "../../../components/common/gridview/GridView";
  import GoodsListItem from "../../../components/content/goods/GoodsListItem";
  export default {
    name: "TabCategoryDetail",
    components:{
      GridView,
      GoodsListItem,
    },
    props:{
      getCategoryDetailInfo:{
        type:Array,
        default() {
          return []
        }
      }
  }
  }
</script>

<style scoped>
.detail-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
