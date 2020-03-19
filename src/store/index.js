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
          deleteGoods(state,payload){
            state.cartList = state.cartList.filter(n=>{
              return n.iid != payload
            })
          },
         replaceCount(state,payload){
           const [obj] =state.cartList.filter(n=>{
             return n.iid == payload.iid
           })
           obj.count = payload.replaceCount
         },
          addOneByOne(state,payload){
          const [addObj] =state.cartList.filter(n=>{
            return n.iid == payload
          })
            addObj.count ++
          },
          subOneByOne(state,payload){
            const [subObj] =state.cartList.filter(n=>{
              return n.iid == payload
            })

            if (subObj.count <= 1 ) {
              subObj.count = 1
            } else  {
              subObj.count --
            }
          },
         addCounter(state,payload){
         payload.count += payload.selectedNum
       },
        addToCart(state,payload){
         payload.checked = true
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
       // oldProduct.count += payload.selectedNum
       context.commit('addCounter',oldProduct)
       resolve('商品数量+'+oldProduct.selectedNum)

     }else {
       payload.count = payload.selectedNum
       context.commit('addToCart',payload)
       resolve('加入购物车成功 + '+payload.selectedNum);
     }

     // console.log("这是vuex里");
   })
    }
  },
  getters
})


export default store
