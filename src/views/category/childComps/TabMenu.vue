<template>
  <Scroll id="tab-scroll">
    <div class="menu-list" >
      <div v-for="(item,index) in categories">
        <div class="menu-item"
             :class="currentIndex === index ? 'active' : ''"
             @click="itemClick(item,index)"
             :key="index">
          {{item.title}}
        </div>
      </div>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components:{
      Scroll
    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data (){
      return{
        currentIndex:0,
      }
    },
    methods:{
      itemClick(item,index){
        const obj ={
          maitKey: item.maitKey,
          index
        }
        console.log(obj);
        this.currentIndex = index
       // var maitkey = this.categories[index].maitKey
        this.$emit('selectItem',obj)
      }
    }
  }
</script>

<style scoped>
  #tab-scroll {
    background-color: #f6f6f6f6;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .menu-list {

    background-color: #f6f6f6f6;
    /*color: #666666;*/

    /*height:calc(524- 475 44px - 49px);*/
  }

  .menu-item{
    width: 100px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
  }
  .menu-item.active {
    border-left:solid 3px var(--color-tint);
    color: var(--color-tint);
    background-color: #ffffff;
    font-weight: 700;
  }
</style>
