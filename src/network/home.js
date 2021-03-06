import {request} from './request';

export function getHomeData(){
  return request({
    url:'/api/h8/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/api/h8/home/data',
    params:{
      type,
      page
    }
  })
}

