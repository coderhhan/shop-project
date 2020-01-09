import {request} from './request';

export function getHomeData(){
  return request({
    url:'/api/w1/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/api/w1/home/data',
    params:{
      type,
      page
    }
  })
}

