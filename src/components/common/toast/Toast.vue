<template>
  <div class="toast-content" v-show="isShow">
   <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props:{
    //   isShow:{
    //     type:Boolean,
    //     default:false
    //   },
    //   message:{
    //     type:String,
    //     default: ''
    //   }
    // }
    data(){
      return {
        isShow:false,
        message:''
      }
    },
    methods:{
      isShowToast(message='默认',duration=2000){
         this.isShow = true
         this.message = message
        setTimeout(()=>{
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
.toast-content{
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  position: fixed;
  z-index: 9999;
  color: #fff;
  padding: 8px 10px;
  background-color: rgba(0,0,0,.7);
  border-radius: 20px;
}
</style>
