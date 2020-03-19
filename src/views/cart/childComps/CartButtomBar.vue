<template>
<div class="buttom-bar">
  <!--<div class="check-all">-->
    <!--<check-buttom-->
      <!--class="check-buttom"-->
      <!--:is-checked="isSelectedAll"-->
      <!--@click.native="checkClick"-->
    <!--/>-->
    <!--<span>全选</span>-->
  <!--</div>-->
  <!--<div class="total-price">-->
    <!--总价：{{totalPrice}}-->
  <!--</div>-->
  <!--<div class="select-count" @click="calculated">-->
   <!--去计算：({{selectCount}})-->
  <!--</div>-->
  <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="calculated">
  <!--&gt;-->
    <van-checkbox
      v-model="isSelectedAll"
      @click="checkClick"
      checked-color="#ff8198"
    >全选</van-checkbox>
    <!--<span slot="tip">-->
    <!--你的收货地址不支持同城送, <span>修改地址</span>-->
  <!--</span>-->
  </van-submit-bar>
</div>
</template>

<script>
  import CheckButtom from "../../../components/content/checkButtom/CheckButtom";
  import {mapGetters} from "vuex"
  export default {
    name: "CartButtomBar",
    data() {
      return {
        checked: false
      };
    },
    components:{
      CheckButtom
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList.filter(product => product.checked).reduce((previousValue,product)=>{
          return previousValue + product.price*product.count
        },0)*100
      },
      selectCount(){
        return this.cartList.filter(product => product.checked).length
      },
      isSelectedAll:{
        get(){
          if (this.cartList.length ===0 ){return false}else {
            return  !this.cartList.find(product => !product.checked)
          }
        },
        set(value){
          if (value) {
            this.checked = true

          }else {
            this.checked = false
          }

        }
      }
    },

    methods:{
      checkClick(){
        // console.log(this.cartList.length)
        if (this.isSelectedAll){
          return this.cartList.forEach(product =>product.checked = false)
        }else{
          return this.cartList.forEach(product =>product.checked = true)
        }

      },
      calculated(){
        if (this.$store.getters.cartList.filter(product => product.checked).length === 0){
          this.$toast.fail('请选择商品')
        } else {
          this.$toast.fail('暂未开启此功能')
        }
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
  .van-submit-bar{
    margin-bottom: 49px;
    box-shadow:0 -1px 1px  rgba(100,100,100,.1) ;
  }


</style>
