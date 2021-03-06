import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
//引入vant
import { Icon,SubmitBar,Checkbox,Row,Sku,Button,Notify,Toast,Field,SwipeCell,Cell,Card,GoodsAction,GoodsActionIcon,
GoodsActionButton,Swipe,SwipeItem,Lazyload,Sticky,TreeSelect,Image} from "vant";
import 'vant/lib/icon/local.css';


//echarts
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
function resize() {

  var docEl = document.documentElement,
    cliWidth = docEl.getBoundingClientRect().width,
    designWidth = 37.5,
    rem = cliWidth / designWidth;
  docEl.style.fontSize = rem + 'px'
}
if (_isMobile()) {
  window.addEventListener('resize', resize, false)
  document.addEventListener('DOMContentLoaded', resize, false)
}



Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus= new Vue()
//安装插件
// Vue.use(toast) //自定义组件
//vant
Vue.use(Image)
Vue.use(TreeSelect)
Vue.use(Sticky)
Vue.use(GoodsActionButton)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(Card)
Vue.use(Cell)
Vue.use(SwipeCell)
Vue.use(Field)
Vue.use(Icon)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Sku)
Vue.use(Button)
Vue.use(Notify);
Vue.use(Toast);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

Toast.setDefaultOptions({ duration: 800 });
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/loading.gif')
})
//解决移动端300ms延迟问题
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
