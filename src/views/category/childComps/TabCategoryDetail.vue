<template>
  <grid-view>
      <goods-list-item v-for="(item,index) in getCategoryDetailInfo" :key="index" :goods-item="item"></goods-list-item>
  </grid-view>
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

</style>
