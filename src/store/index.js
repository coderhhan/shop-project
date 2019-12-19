import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
        cartList:[]
      },
  mutations:{
        //mutations唯一的目的是修改state的状态
        //其中的每个方法尽可能完成的事件比较单一 一点
       addCounter(state,payload){
         payload.count++
       },
        addToCart(state,payload){
         payload.checked = false
         state.cartList.push(payload)
        }
  },
  actions:{
    addCart(context,payload){
   return new Promise((resolve, reject) => {
     let oldProduct =null;
     for (let item of context.state.cartList){
       if (item.iid===payload.iid){
         oldProduct = item;
       }
     }
     //第二种方法
     //let oldProduct = state.cartList.find(item =>item.iid === payload.iid)
     if (oldProduct){
       context.commit('addCounter',oldProduct)
       resolve('商品数量+1')

     }else {
       payload.count =1
       context.commit('addToCart',payload)
       resolve('加入购物车成功');
     }

     // console.log("这是vuex里");
   })
    }
  },
  getters
})


export default store
