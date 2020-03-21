<template>
  <div id="category" ref="aaaa">
      <nav-bar class="category-nav-bar">
        <div slot="center" >商品分类</div>
      </nav-bar>
         <tab-menu :categories="categories" @selectItem="selectItem" />
          <scroll id="tab-content"  ref="scroll" @scrollPosition="contentScroll" :probe-type="3">
              <!--<tab-control :titles="titleList"-->
                         <!--ref="tabControl1"-->
                         <!--class="tabControl"-->
                         <!--v-show="isTabFixed"-->
                         <!--@tabClick="tabClick" />-->
              <tab-content-category :categoryData="categoryData[currentIndex]" @categoriesImageLoad="categoriesImageLoad"></tab-content-category>

            <tab-control :titles="titleList" v-show="!isTabFixed" @tabClick="tabClick" ref="tabControl2"/>
              <goods-list :goods="this.getCategoryDetailInfo">
              </goods-list>
          </scroll>
          <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>

</template>

<script>
  import GoodsList from "../../components/content/goods/GoodsList";
  import backTop from "../../components/content/backTop/backTop";
  import tabControl from "../../components/content/tabControl/tabControl";
  import GridView from "../../components/common/gridview/GridView";
  import TabContentCategory from "./childComps/TabContentCategory";
  import Scroll from "components/common/scroll/Scroll";
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import {getSubcategory,getCategory,getCategoryDetail} from "../../network/category";
  import {BACK_TOP_POSITION} from "../../common/const";
  import {itemListenerMixin,BackToTopMixin} from "common/mixin";
  import {mapMutations} from 'vuex'
  import {mapState} from "vuex"
  export default {
    name: "Profile",
    data(){
      return{
        //tab内容
        titleList:['综合', '新品', '销量'],
        menuIndex:0,
        //分类数据 tabmenu
        categories:[],
        //分类图标
        categoryData:{},
        //分类商品数据
        getCategoryDetailInfo:[],
        // 存储key
        keyList: [],
        /// back to top 返回顶部
        tabOffsetTop:0,
        isShow:false,
        //tab 索引值
        currentIndex: 0,
        //tab悬停
        isTabFixed:false,

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
      backTop,
      GoodsList

    },
    computed:{
      // ...mapState({
      //   getCategoryDetailInfo:'getCategoryDetailInfo',
      // })
    },
    created(){
      this._getCategory()
    },
    deactivated() {
      // 每次离开恢复loading加载
      this.$store.commit("setLoading", true);
    },
    methods:{
      // ...mapMutations({
      //   Sub: '_getSubcategory',Info:'_getCategoryDetailInfo' }
      //   // 映射 this.add() 为 this.$store.commit('increment')
      // ),
      categoriesImageLoad(){
        // console.log('图片加载了')
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      contentScroll(position){
        //1.怕那段BackTop是否显示
        this.isShow = (-position.y) >BACK_TOP_POSITION
        //2.决定tabcontrol是否吸顶（position：fixed）
        // console.log(this.tabOffsetTop+'tab');
        // console.log(-position.y+'scroll')
        this.isTabFixed=((-position.y)>this.tabOffsetTop)
        console.log(this.isTabFixed)
      },
      selectItem({ maitKey, index }) {
        // console.log( this.tabOffsetTop)
        if (index !== this.currentIndex) {
          this.$refs.scroll.scrollTo(0,0,300)
        }
        this.currentIndex = index;
        // 每次切换分类初始化tabControl的下标
        // this.$refs.tabControl2.curIndex = 0;
        // 请求对应的推荐列表
        this._getCategoryDetail(this.categories[this.currentIndex].miniWallkey, "pop");
        // 如果keyList中存在maitKey证明数据已经请求过了
        if (this.keyList.includes(maitKey)) return this.$store.commit("setLoading", false);
        this.$store.commit("setLoading", true);
        // 如果不存在请求数据并且存储key
        this.keyList[index] = maitKey;
        this._getSubcategory(this.categories[this.currentIndex].maitKey, index);
      },
      // categoriesImageLoad(){
      //   // console.log('触发')
      //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // },
      // contentScroll(position) {
      //   this.isShow = (-position.y) > BACK_TOP_POSITION
      //   this.isTabFixed=(-position.y)>this.tabOffsetTop
      // },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,300)
      },
      tabClick(index){
        this.$store.commit("setLoading", true);
        const typeList = ["pop", "new", "sell"];
        // 切换类型数据
        this._getCategoryDetail(this.categories[this.currentIndex].miniWallkey, typeList[index]);
        // switch (index) {
        //   case 0:
        //     this.currentType = 'pop'
        //     this.currentIndex = 0
        //     break
        //   case 1:
        //     this.currentType = 'new'
        //     this.currentIndex = 1
        //     break
        //   case 2:
        //     this.currentType = 'sell'
        //     this.currentIndex = 2
        //     break
        // }
        // this.$refs.tabControl1.currentIndex = index
        // this.$refs.tabControl2.currentIndex = index
        // this.currentType =  index
        // console.log(this.currentType)
      },
      //获取tabmenu 数据
      _getCategory(){
        getCategory().then(res => {
          // console.log(res.data.category.list);
          this.categories = res.data.category.list;
          this.$nextTick(() => {
            this._getSubcategory(this.categories[0].maitKey, 0);
            this._getCategoryDetail(this.categories[0].miniWallkey, "pop");
            // 初始化push第一个key进去
            this.keyList.push(this.categories[0].maitKey);
          });
        });
      },
      // 分类数据
     async _getSubcategory(key,index){
         const res = await getSubcategory(key)
       this.categoryData[index] = res.data.list;
          // if (!this.categoryData[res.key]) {
          //   this.categoryData[res.key] = res.data.list
          //   console.log(this.categoryData)
          // }
          // this._getCategoryDetail()
      },
      //商品数据
      async _getCategoryDetail(key, type) {
        const res = await getCategoryDetail(key, type)
          this.getCategoryDetailInfo = res;
      },
      // selectItem1(index){
      //   if (index !== this.menuIndex) {
      //     this.$refs.scroll.scrollTo(0,0,300)
      //   }
      //   this.menuIndex = index
      //   this.maitKey = this.categories[index].maitKey
      //   this.miniWallkey = this.categories[index].miniWallkey
      //
      //   this.Sub(this.maitKey)
      //   this.Info({miniWallkey:this.miniWallkey,currentType:this.currentType})
      //   console.log(this.miniWallkey)
      //   // getSubcategory(key.maitKey).then(res=>{
      //   //   this.categoryData  = res.data.list
        // })
      // }
    }
  }
</script>

<style scoped>
  .tabControl{
  }
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

#tab-content {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
  background-color: white;
}

</style>
