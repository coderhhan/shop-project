import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
Vue.use(Vuex)
import {getSubcategory,getCategoryDetail} from "../network/category";

const store = new Vuex.Store({
  state:{
        cartList:[],
        categoryContent:{},
        getCategoryDetailInfo:{},
        isLoading: true
      },
  mutations:{
       setLoading (state, bol) {
        state.isLoading = bol;
      },
        //mutations唯一的目的是修改state的状态
        //其中的每个方法尽可能完成的事件比较单一 一点
       async _getSubcategory (state,payload) {
         // const res = await getSubcategory(payload)
         // state.categoryContent[res.key] = res.data.list
         if ( state.categoryContent[payload] == undefined) {
           const res = await getSubcategory(payload)
           console.log(res);
           state.categoryContent[res.key] = res.data.list
         }
    },
         async _getCategoryDetailInfo (state,payload) {
    //
         const res1 = await getCategoryDetail(payload.miniWallkey,'pop')
         const res2 = await getCategoryDetail(payload.miniWallkey,'new')
         const res3 = await getCategoryDetail(payload.miniWallkey,'sell')
         state.getCategoryDetailInfo[payload.miniWallkey]=[res1,res2,res3]
           console.log( state.getCategoryDetailInfo)
    },
    //      //   console.log( state.getCategoryDetailInfo)
    //     //  // const res3 = await getCategoryDetail(payload.miniWallkey,'sell')
    //     //  // const res = await getCategoryDetail(payload.miniWallkey,payload.currentType)
    //     //  // const res = await getCategoryDetail(payload.miniWallkey,payload.currentType)
    //     //  if (state.getCategoryDetailInfo[payload.miniWallkey]['pop'].length ===0 ) {
    //     //    const res = await getCategoryDetail(payload.miniWallkey,'pop')
    //     //    state.getCategoryDetailInfo[payload.miniWallkey]['pop'] = res
    //     //  }
    //     //  if (state.getCategoryDetailInfo[payload.miniWallkey]['new'].length ===0 ) {
    //     //    const res2 = await getCategoryDetail(payload.miniWallkey,'new')
    //     //    state.getCategoryDetailInfo[payload.miniWallkey]['new'] = res2
    //     //  }
    //     //  if (state.getCategoryDetailInfo[payload.miniWallkey]['sell'].length ===0 ) {
    //     //    const res3 = await getCategoryDetail(payload.miniWallkey,'sell')
    //     //    state.getCategoryDetailInfo[payload.miniWallkey]['sell'] = res3
    //     //  }
    //     //
    //     // if (state.getCategoryDetailInfo[payload.miniWallkey].length === 3) {
    //     //   console.log(state.getCategoryDetailInfo)
    //     // }
    //     // console.log(payload)
    //     // console.log(res)
    // },
// this._getCategoryDetail()
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
