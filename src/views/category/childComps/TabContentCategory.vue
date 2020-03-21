<template>
    <div class="tab-content-category" >
      <div v-for="(item,index) in this.categoryData " class="item" :key="index">
        <img :src="item.image" alt="" @load="imageLoad">
        <div class="category-text">{{item.title}}</div>
      </div>
    </div>
</template>

<script>
import GridView from "../../../components/common/gridview/GridView";
// import { getSubcategory } from  "../../../network/category.js"
import {mapState} from "vuex"
  export default {
    name: "TabContentCategory",
    components:{
      GridView
    },
    data(){
      return {
        isLoad:false,
        defaultIndex:0,
      }
    },
    props:{
      categoryData:{
        type:Array,
        default(){
          return []
        }
      },
      maitKey:{
        type:String,
        default() {
          return '';
        }
      }
    },
    computed:{
      ...mapState({
        categoryContent:'categoryContent',
      }),
    },
    methods:{
      imageLoad(){

        // if (!this.isLoad)
        // {
          console.log('图片完成')
          this.$emit('categoriesImageLoad')
          this.isLoad = true
        // }
      }
    }
  }
</script>

<style scoped>
#tab-content-category {
  position: relative;
}
.tab-content-category {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;

}
.item img {
    width: 50px;
  }
.item {
  padding: 5px;
  flex-basis: 33.2%;
  text-align: center;
}
  .category-text{
    font-size: 12px;
  }

</style>
