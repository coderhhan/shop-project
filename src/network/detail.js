import {request} from "./request";

export  function getDetail(iid) {
  return request({
    url:'/api/h8/detail',
    params:{
      iid
    }
  })

}

export  function getRecommend(){
  return request({
    url:'/api/h8/recommend'
  })
}
//es6写法 构造函数
export class Goods{
  constructor(itemInfo,columns,services) {
  this.title = itemInfo.title;
  this.desc = itemInfo.desc;
  this.newPrice = itemInfo.price;
  this.oldPrice = itemInfo.oldPrice;
  this.discount = itemInfo.discountDesc;
  this.columns = columns;
  this.services = services;
  this.realPrice = itemInfo.lowNowPrice;
  }

}

export class Shop{
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
    this.sells = shopInfo.cSells;
    this.logo = shopInfo.shopLogo;
  }

}

export class GoodsParam {
  constructor(info,rule) {
    this.infos = info.set;
    //判断是否存有图片
    this.image = info.image ? info.image[0] : '';
    this.sizes = rule.tables
  }
}


//评论区
export class CommentInfo{
  constructor(cRate,list) {
    this.commentCount = cRate;
    // this.content =list.content;
    // this.commentDate = list[0].created;
    // this.shopExplain = list[0].explain;
    // this.goodsStyle = list[0].style;
    // this.commentUserImage = list[0].user.avatar;
    // this.commentUserName = list[0].user.uname;
  }
}
