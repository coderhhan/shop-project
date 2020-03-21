import  Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () =>import('views/detail/Detail')
const Map = () =>import('views/profile/map/Map')

//插件安装
Vue.use(VueRouter)

//创建路由对象
const routes=[
  {
    path:'/',
    redirect:'/home'

  },
  {
    path:'/home',
    component:Home
  }
  ,
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
  {
    path:'/map',
    component:Map
  }

]
const router =new VueRouter({
  routes,
  mode:'history'
})

export  default  router
