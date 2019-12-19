import Toast from "./Toast";
const object={}

object.install = function (Vue) {
 // console.log('插件封装方式')
  //1.创建构造器
  const toastConstrustor = Vue.extend(Toast)
  //2new的方式 根据构造器创建一个 组件对象
  const toast = new toastConstrustor()
  //3将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.$toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //添加到原型中
  Vue.prototype.$toast = toast;
}
export default object
