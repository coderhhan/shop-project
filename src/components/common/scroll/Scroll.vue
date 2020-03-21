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
        default() {
          return 0;
        }
      },
      pullUpLoad:{
        type:Boolean,
        default() {
          return false;
        }
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
      // 开启点击事件,默认是false
          click:true,
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
          probeType: this.probeType,
       // 是否开启监听滚动到底部事件
          pullUpLoad:this.pullUpLoad

      })
      //2监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position)=>{
          this.$emit('scrollPosition',position)
          // console.log(position);
          this.scroll.refresh()
        })
      }

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
        console.log('---')
      },
      getScrollY(){
        return this.scroll.y? this.scroll.y:0
      },
      scrollToElement(el, time) {
        this.scroll.scrollToElement(el, time);
      }
    }
  }
</script>

<style scoped>

</style>
