<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control @tabClick='tabClick'
                 :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 class="tabControl"
                 v-show="isTabFixed"/>
     <scroll class="content" ref="scroll"
             :probe-type="3"
             :pull-up-load="true"
             @pullingUp="loadMore"
             @scrollPosition="contentScroll">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
       <recommend-view :recommends="recommends"/>
       <feature-view/>
       <tab-control @tabClick='tabClick'
                    :titles="['流行','新款','精选']"
                    ref="tabControl2" />
       <goods-list :goods="showGoods"/>

     </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  //default 所以要用大括号{}
  import {getHomeData,getHomeGoods} from "network/home";
  import {itemListenerMixin,BackToTopMixin} from "common/mixin";
 import {debounce} from "common/utils.js";


  // import HomeSwiper from "./chilComps/HomeSwiper";
  // import backTop from "../../components/content/backTop/backTop";
  import GoodsList from "components/content/goods/GoodsList";
  import NavBar from "components/common/navbar/NavBar";
  import tabControl from "components/content/tabControl/tabControl";
  import Scroll from "../../components/common/scroll/Scroll";
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
//   import {Swiper,SwiperItem} from 'components/common/swiper'
  import HomeSwiper from "./chilComps/HomeSwiper";
  import RecommendView from "./chilComps/RecommendView";
  import FeatureView from "./chilComps/FeatureView";
  import {BACK_TOP_POSITION} from "../../common/const";

  export default {
    name: "Home",
    components: {
      RecommendView,
      FeatureView,
      HomeSwiper,

      NavBar,
      tabControl,
      GoodsList,
      Scroll,
      // backTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},

        },
        currentType:'pop',
        // isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    mixins:[itemListenerMixin,BackToTopMixin],
    //生命周期
    created() {
      //1请求多个数据
      this.getHomeDataFn()
      //2请求商品的数据
      this.getHomeGoodsFn('pop')
      this.getHomeGoodsFn('new')
      this.getHomeGoodsFn('sell')

    },
    mounted() {
      // //防抖函数部分
      //     const refresh = debounce(this.$refs.scroll.refresh,300)
      // //3监听图片加载完毕 bus事件总线在mian。js中注册组件
      // this.$bus.$on('homeItemImageLoad',()=>{
      //   refresh()
      // })


    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      // console.log('destroyed');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('ItemImageLoad',this.itemImgListener)
    },
    methods:{
      /**
       * 事件监听相关方法
       */

      //防抖函数
      //   if语句不加中括号
      //   if(true) console.log('a')
      //        console.log('b')
      //    输出a b
      //
      //    if(false) console.log('a')
      //    console.log('b')
      //    输出b
      //
      //     if(false) console.log('a')
      // //    console.log('b')
      //       console.log('d')
      //       console.log('f')
        //  输出b d f 除了第一条其他都执行

      // debounce (func,delay){
      //   let timer =null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer= setTimeout(()=>{
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },

      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0,300)
      // },
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position){
        //1.怕那段BackTop是否显示
        this.isShow = (-position.y) >BACK_TOP_POSITION
        //2.决定tabcontrol是否吸顶（position：fixed）
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      // contentScroll(position){
      //   //1.怕那段BackTop是否显示
      //   this.isShow = (-position.y) >1000
      //   //2.决定tabcontrol是否吸顶（position：fixed）
      //   this.isTabFixed=(-position.y)>this.tabOffsetTop
      // },
      loadMore(){

          this.getHomeGoodsFn(this.currentType)
          //重新计算异步加载后的页面高度
        this.$refs.scroll.refresh()
      },
      swiperImageLoad(){
        //获取tabctrol的offsettop
        //所有的组件都有一个属性$el 用于获取组件元素的
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求方法
       */
      getHomeDataFn(){
        getHomeData().then(res =>{
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          this.keywords = res.data.keywords.list;
          this.dKeywords = res.data.dKeyword.list;
        })
      },
      getHomeGoodsFn(type){
        const page= this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{

          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1;
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh; /*视图百分百*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9;
}

  .content{
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /*.content{*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/

  /*}*/
</style>
