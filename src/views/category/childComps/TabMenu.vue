<template>
  <Scroll id="tab-scroll">
    <div class="menu-list" >
      <div class="menu-item"
        v-for="(item,index) in categories"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)"
        :key="index">
      {{item.title}}
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
      categories:Array
    },
    data (){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('selectIndex',index)
      }
    }
  }
</script>

<style scoped>
  #tab-scroll {
    display: inline-block;
    background-color: #f6f6f6f6;
    color: #666666;
    top: 44px;
    bottom: 49px;
    position: relative;
    /*height:calc(524- 475 44px - 49px);*/
    height:475px;
    width: 30%;
  }

  .menu-item{
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .menu-item.active {
    border-left:solid 3px var(--color-tint);
    color: var(--color-tint);
    background-color: #ffffff;
    font-weight: 700;
  }
</style>
