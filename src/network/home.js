import {request} from './request';

export function getHomeData(){
  return request({
    url:'/api/wh/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/api/wh/home/data',
    params:{
      type,
      page
    }
  })
}

