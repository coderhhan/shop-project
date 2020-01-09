<template>
    <div class="grid-view"  ref="gridView">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "GridView",
    props:{
      cols:{  //列
        type:Number,
        default:2
      },
      hMargin:{   //左右
        type:Number,
        default:8
      },
      vMargin:{   //上下
        type:Number,
        default:8
      },
      itemSpace:{ //间距
        type:Number,
        default:8
      },
      lineSpace:{ //行高
        type:Number,
        default:8
      }
    },
    mounted (){
      setTimeout(this._autoLayout, 20)
    },
    updated: function () {
      this._autoLayout()
    },
    methods:{
    _autoLayout() {
        let gridEl = this.$refs.gridView
        let children = gridEl.children;
      // console.log(gridEl)
      // console.log(children)

      //set  padding of gridEl
      gridEl.style.padding =`${this.vMargin}px ${this.hMargin}px`

      //computed width fo item     clientWidth = content+padding   cols 列 相当于一行摆几个item
      // console.log(gridEl.clientWidth);
     let itemWidth = (gridEl.clientWidth -2*this.hMargin-(this.cols-1)*this.itemSpace)/this.cols
      // a%b  a除以b取余数  如 4除5取4  5除以4取1
      for(let i=0;i<children.length;i++ ){
       let item = children[i]
        item.style.width = itemWidth +'px'
        if ((i+1)%this.cols !==0){
          item.style.marginRight = this.itemSpace +'px'
        }
        if (i >= this.cols){
          item.style.marginTop = this.lineSpace + 'px'
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
