<template>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" id="tab-content-category">
        <div v-for="(item,index) in categoryData" class="item">
          <img :src="item.image" alt="">
          <div class="category-text">{{item.title}}</div>
        </div>
    </grid-view>
</template>

<script>
import GridView from "../../../components/common/gridview/GridView";
  export default {
    name: "TabContentCategory",
    components:{
      GridView
    },
    props:{
      categoryData:Array
    }
  }
</script>

<style scoped>
#tab-content-category {
  position: relative;
}
.item img {
    width: 50px;
  }
.item {
  text-align: center;
}
  .category-text{
    margin-top: 13px;
    font-size: 12px;
  }

</style>
