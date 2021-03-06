<script src="../../../store/index.js"></script>
<template>

    <van-swipe-cell>
<div class="list-item" @click.stop="toDetail">
  <div class="check-radio" @click.stop="showstatus">
    <van-checkbox v-model="isSelected"   checked-color="#ff8198"/>
  </div>
  <van-card
    @click="toDetail"
    :price="product.price"
    :desc="product.desc"
    :title="product.title"
    class="goods-card"
    :thumb="product.image"
  >

    <div slot="num">
      <div class="counter" >
        <button @click.stop="subBtn" >-</button>
        <input @click.stop='' @blur.stop="blurLose" style="" v-model="countNum"/>
        <button @click.stop="addBtn">+</button>
      </div>
    </div>
  </van-card>
</div>
  <van-button
    slot="right"
    square
    text="删除"
    color="red"
    type="danger"
    class="delete-button"
    @click="deleteGoods"
  />

    </van-swipe-cell>
    <!--<div class="item-selector" >-->
      <!--&lt;!&ndash;<check-buttom :isChecked="product.checked" @click.native="checkClick"/>&ndash;&gt;-->
      <!--<van-checkbox v-model="isSelected"  @click="showstatus" checked-color="#ff8198"></van-checkbox>-->
      <!--isSelected{{isSelected}}-->
    <!--</div>-->
    <!--<div class="item-img" >-->
      <!--<img :src="product.image" alt="">-->
    <!--</div>-->
    <!--<div class="item-info">-->
      <!--<div class="item-title">{{product.title}}</div>-->
      <!--<div class="item-desc">{{product.desc}}</div>-->
      <!--<div class="info-bottom">-->
        <!--<div class="item-price left">￥{{product.price}}</div>-->
        <!--<div class="item-count right">-->
          <!--<button @click="subBtn">-</button>-->
          <!--<input style="width: 20px;border: none" v-model="countNum"/>-->
          <!--<button @click="addBtn">+</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

</template>

<script>
  import CheckButtom from "components/content/checkButtom/CheckButtom";
  export default {
    name: "CartListItem",
    components:{
      CheckButtom
    },
    data(){
      return{
        checked:true,
        isDisabled:''
      }
    },
    props:{
      product:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    computed:{
      isSelected:{
        get(){
          return this.product.checked
        },
        set(){
          if (this.product.checked) {
            this.checked =true
          }else {
            this.checked =false
          }
        }
      },
      countNum:{
        get(){
          return this.product.count
        },
        set(){
        }
      }
    },
    methods:{
      checkClick(){
        return this.product.checked =! this.product.checked
      },
      showstatus () {  //是否被选中
        return this.product.checked =! this.product.checked
      },
      subBtn(){ //计数器- 往vuex减少count

        this.$store.commit('subOneByOne',this.product.iid)
      },
      addBtn(){   //计数器+ 往vuex增加count
        this.$store.commit('addOneByOne',this.product.iid)
      },
      // 删除商品
      deleteGoods() {
        this.$store.commit('deleteGoods',this.product.iid)
      },
      // input 输入框失去焦点
      blurLose (event) {
        console.log(event.target.value)
        const palypad ={
          iid: this.product.iid,
          replaceCount:event.target.value
        }
        this.$store.commit('replaceCount',palypad)
      },
      toDetail () {
        this.$router.push({
          path:`/detail/`+this.product.iid
        })
      }

    }
  }
</script>

<style scoped>
#shop-item{
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom:  1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
    text-overflow: ellipsis; /*显示省略符号来代表被修剪的文本。*/
  }
   .item-img {
     padding: 5px;
   }
   .item-img img {
     width: 80px;
     height: 100px;
     display: block;
     border-radius: 5px;
   }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    display: flex;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
 .info-bottom .item-price {
    color: orangered;
  }
  .item-count{
    display: flex;
  }
  button {
    height: 20px;
    width: 20px;
    text-align: center;
    border: none;

    background-color: white;
  }

input{
  border: none;
  border-right: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  text-align: center;
  width: 40px
}
.counter{
  display: flex;
  justify-content: center;
  border: 1px solid whitesmoke;
}
.goods-card {
  margin: 0;
  width: 80vm;
}
var-card {
  width: 80vm;
  border: none;
}
.van-card {
  background-color:white;
  border-radius: 2.5vw;
  padding: 4px;
  margin: 5px 0px ;
}
.delete-button {
  height: 100%;
}
.delete-button{
  height: 90px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}
  .list-item{
    display: flex;
  }
  .check-radio{
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-basis: 20px;
    align-items: center;
    justify-content: center;
  }

.van-card__content {
  width: 150px
;
}
.list-item {
  border: none;
  border-radius: 2.5vw;
  background-color:white ;
  margin: 5px;
}
</style>
