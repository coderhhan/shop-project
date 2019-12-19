import {debounce} from "./utils";
import {BACK_TOP_POSITION} from "./const";
import backTop from "components/content/backTop/backTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    // //防抖函数部分
      this.refresh = debounce(this.$refs.scroll.refresh,300)
     this.itemImgListener =  ()=>{
       this.refresh()
     } // //3监听图片加载完毕 bus事件总线在mian。js中注册组件
     this.$bus.$on('ItemImageLoad',this.itemImgListener)
    console.log('混入的内容')
  }
}

export const BackToTopMixin = {
  components:{
    backTop
  },
  data(){
    return{
      isShow:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    },

  }

}
