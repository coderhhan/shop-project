<template>
  <div id="category" ref="aaaa">
    <div class="category-nav-bar">
      <nav-bar>
        <div slot="center">商品分类</div>
      </nav-bar>
    </div>
    <div class="tab-menu-content">
          <tab-menu
          :categories="categories"
          @selectIndex="selectItem"
          @click.native="toggle"
          ></tab-menu>
          <scroll id="tab-content" @scrollPosition="contentScroll" ref="scroll"  :probe-type="3">
              <tab-content-category :categoryData="categoryData"></tab-content-category>
              <tab-control :titles="['综合', '新品', '销量']"  @tabClick="tabClick"></tab-control>
              <tab-category-detail :getCategoryDetailInfo="getCategoryDetailInfo"></tab-category-detail>
          </scroll>
          <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>

  </div>

</template>

<script>
  import backTop from "../../components/content/backTop/backTop";
  import TabCategoryDetail from "./childComps/TabCategoryDetail";
  import tabControl from "../../components/content/tabControl/tabControl";
  import GridView from "../../components/common/gridview/GridView";
  import TabContentCategory from "./childComps/TabContentCategory";
  import Scroll from "components/common/scroll/Scroll";
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import {getSubcategory,getCategory,getCategoryDetail} from "../../network/category";
  import {BACK_TOP_POSITION} from "../../common/const";
  import {itemListenerMixin,BackToTopMixin} from "common/mixin";
  export default {
    name: "Profile",
    data(){
      return{
          categories:[],
          categoryData:[],
          currentType:'pop',
          currentIndex: 0,
          getCategoryDetailInfo:[],
          isShow:false,
          toggles:[]
      }
    },
    mixins:[itemListenerMixin,BackToTopMixin],
    components:{
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      GridView,
      tabControl,
      TabCategoryDetail,
      backTop

    },
    computed:{
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created(){
      this._getCategory()
      // this.getSubcategoryInfo()

    },
    methods:{
      toggle(){

      },
      contentScroll(position) {
        this.isShow = (-position.y) > BACK_TOP_POSITION
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,300)
      },
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this._getCategoryDetail(this.currentType)
      },
      _getCategory(){
        getCategory().then(res=>{
          this.categories=res.data.category.list
          this._getSubcategory(0) //获取第一个分类
        })
      },
      _getSubcategory(index){
        const maintKey = this.categories[index].maitKey
        getSubcategory(maintKey).then(res=>{
          this.categoryData = res.data.list
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type){
        console.log(this.categories)
        console.log(this.currentIndex)
        const miniWallkey=this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res=>{
          this.getCategoryDetailInfo = res
          // console.log(this.getCategoryDetailInfo)
        })
      },
      selectItem(index){
        this. _getSubcategory(index)
        this.toggles.push(index)
        console.log(this.toggles)
      }
    }
  }
</script>

<style scoped>
.category-nav-bar {
  background-color:var(--color-tint);
  color: var(--color-background);
  font-weight: bold;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
  #category{
    height: 100vh;
  }
.tab-menu-content{
  position: relative;
  width: 100%;
  height:100vh;
}
#tab-content {
  position: relative;
  top: 44px;
  display: block;
  float: right;
  width: 70%;
  bottom: 49px;
  height:475px;
}
  .tab-content-scroll{
    height:475px;
  }
</style>
