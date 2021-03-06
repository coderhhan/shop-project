import { request } from "./request";


export function getCategory() {
  return request({
    url: '/api/h8/category'
  })
}

//subcategory 子类别的意思  http://123.207.32.32:8000/api/w1/category
export function getSubcategory(maitKey) {
      return request({
        url:'/api/h8/subcategory',
        params:{
          maitKey
        }
      })
}
export function getCategoryDetail(miniWallkey,type) {
      return request({
        url:'/api/h8/subcategory/detail',
        params: {
          miniWallkey,
          type
        }
      })
}
