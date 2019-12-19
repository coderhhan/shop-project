<template>
  <div class="check-img" :class="{check:isChecked}" >
    <img src="~assets/img/cart/checkbuttom.png" alt="" >
  </div>
</template>

<script>
  export default {
    name: "CheckButtom",
      props:{
        isChecked:{
          type:Boolean,
          default:false
        }
      },
    methods:{

    }

  }
</script>

<style scoped>
.check-img img{
  width: 20px;

}
.check-img{
  border: 1px solid #999999;

  border-radius: 50%;
}
.check {
  background-color: red;
  border: 1px solid red;
  border-radius: 50%;
}
</style>
