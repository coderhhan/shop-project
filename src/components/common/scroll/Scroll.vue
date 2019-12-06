<template>
<div class="wrapper" ref="aaaa">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll:null,

      }
    },
    mounted() {
      //1创建bscroll对象
      this.scroll = new BScroll(this.$refs.aaaa,{
        click:true,
          probeType: this.probeType,
          pullUpLoad:this.pullUpLoad

      })
      //2监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scrollPosition',position)
        // console.log(position);
        this.scroll.refresh()
      })
      //3监听上拉事件,判断true
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
      // this.scroll.on('pullingUp',()=>{
      //   this.$emit('pullingUp')
      //  /* setTimeout(()=>{
      //     this.scroll.finishPullUp()
      //   },1000)*/
      //
      // })
    },
    methods:{
      scrollTo(x,y,time){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll? this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>
