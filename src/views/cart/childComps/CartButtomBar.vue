<template>
<div class="buttom-bar">
  <div class="check-all">
    <check-buttom
      class="check-buttom"
      :is-checked="isSelectedAll"
      @click.native="checkClick"
    />
    <span>全选</span>
  </div>
  <div class="total-price">
    总价：{{totalPrice}}
  </div>
  <div class="select-count" @click="calculated">
   去计算：({{selectCount}})
  </div>
</div>
</template>

<script>
  import CheckButtom from "../../../components/content/checkButtom/CheckButtom";
  import {mapGetters} from "vuex"
  export default {
    name: "CartButtomBar",
    components:{
      CheckButtom
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList.filter(product => product.checked).reduce((previousValue,product)=>{
          return previousValue + product.price*product.count
        },0).toFixed(2)
      },
      selectCount(){
        return this.cartList.filter(product => product.checked).length
      },
      isSelectedAll(){

        if (this.cartList.length ===0 ){return false}
        return !this.cartList.find(product => !product.checked)
      }
    },

    methods:{
      checkClick(){
        console.log(this.$store.getters)
        if (this.isSelectedAll){
          return this.cartList.forEach(product =>product.checked = false)
        }else{
          return this.cartList.forEach(product =>product.checked = true)
        }

      },
      calculated(){

        if (this.$store.getters.cartList.filter(product => product.checked).length === 0)
          this.$toast.isShowToast('请选择商品',1000)
      }
    }
  }
</script>

<style scoped>
  .buttom-bar{

    height: 40px;
    background-color: #eee;
    line-height: 40px;
    display: flex;

  }
  .check-all{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:80px;
  }
  .check-buttom{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 8px;

  }
  .total-price{
    margin-left: 20px;
    flex: 1;
  }
  .select-count{
    width: 90px;
    background-color: red;
    text-align: center;
  }
</style>
