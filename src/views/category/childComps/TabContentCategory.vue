<template>
  <div>
    <!--<grid-view :cols="3" :lineSpace="15" :v-margin="20" id="tab-content-category">-->
        <!--<div v-for="(item,index) in categoryData" class="item" :key="index">-->
          <!--<img :src="item.image" alt="">-->
          <!--<div class="category-text">{{item.title}}</div>-->
        <!--</div>-->
    <!--</grid-view>-->
    <div class="tab-content-category">
      <div v-for="(item,index) in categoryData" class="item" :key="index">
        <img :src="item.image" alt="" @load="imageLoad">
        <div class="category-text">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import GridView from "../../../components/common/gridview/GridView";
  export default {
    name: "TabContentCategory",
    components:{
      GridView
    },
    data(){
      return {
        isLoad:false
      }
    },
    props:{
      categoryData:Array
    },
    methods:{
      imageLoad(){
        if (!this.isLoad)
        {this.$emit('categoriesImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
#tab-content-category {
  position: relative;
}
.tab-content-category {
  padding-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
  justify-content: space-evenly;
}
.item img {
    width: 50px;
  }
.item {
  flex-basis: 30%;
  text-align: center;
}
  .category-text{
    margin-top: 13px;
    font-size: 12px;
  }

</style>
