<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  //default 所以要用大括号{}
import { getHomeData } from "network/home";

// import HomeSwiper from "./chilComps/HomeSwiper";

// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
//   import {Swiper,SwiperItem} from 'components/common/swiper'
  import HomeSwiper from "./chilComps/HomeSwiper";
  import NavBar from "components/common/navbar/NavBar";
  import RecommendView from "./chilComps/RecommendView";
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      NavBar,
      RecommendView

    },
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    //生命周期
    created() {
      //1请求多个数据
      getHomeData().then(res =>{
        console.log(res);
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        this.keywords = res.data.keywords.list;
        this.dKeywords = res.data.dKeyword.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

}
</style>
