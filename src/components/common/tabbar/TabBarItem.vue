<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive" >
    <slot name="item-icon" ></slot>
  </div>
  <div v-else>
    <slot name="item-icon-active"></slot>
  </div>
  <div :style="activeStyle">
    <slot name="item-text"></slot>
  </div>

</div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        /*isActive:true*/
      }
  },
    computed:{
      isActive(){
        /*indexof:      string.indexof(srting2) ==-1  如果srting中没有找到string2 就等于-1，       */
        return this.$route.path.indexOf(this.path) !==-1
      },
      activeStyle(){
        return this.isActive ?{ color: this.activeColor}:{}
/*
        a?b:c是什么意思
        这个是条件表达式,表示如果a为真,则表达式值为b,如果a为假,则表达式值为c/!**!/*/
      }
    },

    methods:{
      itemClick() {
        console.log()
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  .active{
    color: red;
  }
</style>
