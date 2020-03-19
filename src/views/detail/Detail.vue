<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" :isExist="isExist" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :data="[topImages, goods, shop, detailInfo, detailParam, commentInfo, recommendInfo]">
          <detail-swiper :topImages="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop="shop"/>
          <detail-goods-info ref="goodsInfo" :detailInfo="detailInfo" @ImageLoad="ImageLoad"/>
          <detail-goods-param ref="goodsParam" :detailParam="detailParam" />
          <detail-comment-info ref="commentInfo" :commentInfo="commentInfo" />
           <goods-list ref="recommendInfo" :goods="recommendInfo" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>

    <detail-bottom-bar class="detail-bottom" @addCart="addCart" :goodsInfo="goods" :topImages="topImages"/>

    <toast/>
  </div>
</template>

<script>
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParam from "./childComps/DetailGoodsParam";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";



  import Scroll from "components/common/scroll/Scroll";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import Toast from "components/common/toast/Toast";

  import {itemListenerMixin,BackToTopMixin} from "common/mixin";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import {debounce} from "../../common/utils";
  import {BACK_TOP_POSITION} from "../../common/const";
  import {mapActions} from "vuex"
  // import {ShopInfo} from "../../network/detail";
  export default {
    name: "detail",
    components:{
      DetailNavBar,
      DetailBottomBar,
      DetailSwiper,
      Scroll,
      Toast,

      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParam,
      DetailCommentInfo,
      GoodsList
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        detailParam:{},
        detailComment:{},
        commentInfo:{},
        recommendInfo:[],
        themeTopY:[],
        getThemeTopY:null,
        moveToThemeTop:null,
        currentIndex:0,
        isExist:true
        // isShowToast:false,
        // message:''
      }
    },
    mixins:[itemListenerMixin,BackToTopMixin],
    mounted() {
      // //防抖函数部分
      // const refresh = debounce(this.$refs.scroll.refresh,300)
      // //3监听图片加载完毕 bus事件总线在mian.js中注册组件
      // this.$bus.$on('detailItemImageLoad',()=>{
      //   refresh()
      //
      // })
      // this.$nextTick(()=>{
      //
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.goodsParam.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop);
      //   console.log(this.themeTopY)
      //
      //
      // })


    },
    created() {
      //1.保存存入的iid
      this.iid = this.$route.params.iid
      //获取iid的数据
      getDetail(this.iid).then(res=>{
        // console.log(res);
        // console.log(res.result.itemInfo.topImages);
        const data=res.result;
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        console.log( this.goods)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(data.shopInfo)

        //获取商品的详细数据
        this.detailInfo = data.detailInfo;
        // console.log(data.detailInfo);

        //获取参数数据
        this.detailParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        console.log(this.detailParam)

        //获取评论区数据
        if (data.rate.list){
          this.commentInfo = data.rate.list[0]
          this.name= this.commentInfo.user.uname
        }else{

          this.isExist = false
          console.log(data.rate.list+'评论区数据'+this.isExist)
        }

        this.getThemeTopY = debounce (()=>{
          this.themeTopY = []
          this.themeTopY.push(0);
          this.themeTopY.push(this.$refs.goodsParam.$el.offsetTop);
          this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop);
          this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop);
          this.themeTopY.push(Number.MAX_VALUE);
          console.log(this.themeTopY)
        },100)

        console.log(this.getThemeTopY)

      })
      getRecommend().then(res=>{
        this.recommendInfo = res.data.list
        // console.log(this.recommendInfo);
        // console.log(res.data);

      })


      },

    methods:{
      ...mapActions({
        add:'addCart'
      }),
      //监听加入购物车
      addCart(data){
        //获取商品的信息
        const product={}
        product.image =this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.count =0;
        product.selectedNum = parseInt(data)
        //将商品添加到购物车里 -vuex

        // this.$store.dispatch('addCart',product).then(res =>{
        //   console.log(res);
        // })

        this.add(product).then(res=>{
          // console.log(this.isShowToast+'add里的isshowtoast');
          // console.log(this.message = res)
         //  this.isShowToast = true;
         //  this.message =res;
         // setTimeout(()=>{
         //   this.isShowToast = false
         //   this.message=''
         // },1500);
          this.$toast.success(res);
          // this.$toast.isShowToast(res,2000)
        //
        })
      },
      ImageLoad(){
        this.refresh();
        this.getThemeTopY()

      },
      titleClick(index){

        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500)

      },

      contentScroll(position) {
        this.isShow = (-position.y) >BACK_TOP_POSITION
        const positionY = -position.y
        //0 1 2 3
        let length = this.themeTopY.length
        for (let i =0; i<length-1;i++){
          if (this.currentIndex !==i){
          if (positionY >=this.themeTopY[i] && positionY < this.themeTopY[i+1]){
            console.log(i);
            this.currentIndex =i
            this.$refs.nav.currentIndex = i

          }
          // console.log(positionY);
          // console.log(this.themeTopY[i])
        }}
        // if (positionY >= this.themeTopY[3]) {
        //   console.log('3')
        //   this.$refs.nav.currentIndex = 3
        // } else if (positionY >= this.themeTopY[2]) {
        //   console.log('2')
        //   this.$refs.nav.currentIndex = 2
        // } else if (positionY >= this.themeTopY[1]) {
        //   console.log('1')
        //   this.$refs.nav.currentIndex = 1
        //   console.log(this.$refs.nav.currentIndex + 'sad');
        // } else if (positionY >= this.themeTopY[0]) {
        //   console.log('0')
        //   this.$refs.nav.currentIndex = 0
        // }
        // for (let i in this.themeTopY) {
        //   if (positionY >= this.themeTopY[i]) {
        //     console.log(i)
        //   } else if (positionY >= this.themeTopY[i]) {
        //     console.log(i)
        //   } else if (positionY >= this.themeTopY[i]) {
        //     console.log(i)
        //   } else if (positionY >= this.themeTopY[i]) {
        //     console.log(i)
        //   }
        // }
      }
    },
    destroyed() {
      this.$bus.$off('ItemImageLoad',this.itemImgListener)
    }


  }
</script>

<style scoped>

  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: fixed;
    z-index: 9;
    background-color: #fff;
    right: 0;
    left: 0;
    top: 0;
  }
  .content {
  top:44px;
  position: relative;
  background-color: #fff;
  height: calc(100% - 44px - 58px);
}


</style>
