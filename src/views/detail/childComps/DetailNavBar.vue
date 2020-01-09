<template>
  <nav-bar>
    <div slot="left" class="backbtn" @click="backClick">
      <img src="~assets/img/detail/back.png" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           :key="index"
           class="title-item"
           :class="{active:index === currentIndex}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Toast from "../../../components/common/toast/Toast";
  export default {
    name: "DetailNavBar",
    components:{NavBar,Toast},
    data(){
      return{
        titles:['商品','参数','评价','推荐'],
        currentIndex:0,

      }
    },
    props:{
      isExist:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      itemClick(index){
        if (!this.isExist && index ===2){

            const msg='暂无评论'
            this.$toast.isShowToast(msg,2000)

        }else{
          console.log(index)
          this.currentIndex = index
          this.$emit('titleClick',index)
        }
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 12px;
}
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .backbtn img{
   margin-top: 15px;
    width: 20px;

  }

</style>
