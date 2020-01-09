<template>
    <div class="grid-view" ref="gridView">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "GridView",
    props:{
      //子元素间距
      itemSpace:{
        type:Number,
        default:8
      },
      //行高
      lineSpace:{
        type:Number,
        default:8
      },
      //一行多少个，列
      cols:{
        type:Number,
        default:2
      },
      //子元素的左右margin值
      vMargin:{
        type:Number,
        default:8
      },
      //子元素的上下margin值
      hMargin:{
        type:Number,
        default:8
      }
    },
    mounted() {
      setTimeout(()=>{
        this.autoLayout()
      },20)
    },
    updated() {
      this.autoLayout()
    },
    methods:{
      autoLayout (){
        let items = this.$refs.gridView
        let itemsArray = items.children
        let itemWidth = (items.clientWidth-2*this.vMargin-(this.cols-1)*this.itemSpace)/this.cols
        items.style.padding=`${this.vMargin}px ${this.hMargin}px`
        console.log(itemsArray)
        console.log(itemWidth)
        console.log(items.clientWidth)
        for(let i = 0;i<itemsArray.length;i++){
         let divItem= itemsArray[i]
            divItem.style.width=itemWidth + 'px'
          console.log(divItem+"这是第"+i)
          if ((i+1)% this.cols !==0){
            divItem.style.marginRight = this.itemSpace + 'px'
          }
          if ( i>= this.cols){

            divItem.style.marginTop = this.lineSpace + 'px'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .grid-view {
    display: flex;
    flex-wrap: wrap;
  }
</style>
