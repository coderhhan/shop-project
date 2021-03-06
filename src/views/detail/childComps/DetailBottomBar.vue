<template>
  <div class="bottom-bar">
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" size="400" text="店铺" />
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="star" :text="isActive?'已收藏':'收藏'" :color="isActive?'#ff5000':''"  @click="iconClick"/>
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="buyNow" text="立即购买" />
    </van-goods-action>

    <van-sku
      ref="skuRef"
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="sku.goodsId"
      :quota="quota"
      :quota-used="alreadyBuy"
      :hide-stock="sku.hide_stock"
      :initial-sku="initialSku"
      :message-config="messageConfig"
    >
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ sku.list[0].price }}</span>
        </div>
      </template>

      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button
            square
            size="large"
            type="danger"
            @click="ddCartbyDialog"
          >
            确定
          </van-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <!--<van-button-->
            <!--square-->
            <!--size="large"-->
            <!--type="danger"-->
            <!--@click="buyNow"-->
          <!--&gt;-->
            <!--立即购买-->
          <!--</van-button>-->
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "DetailBottomBar",
    components:{

    },

    data() {
      return {
        initialSku:{
          // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
          // 值：skuValueId（规格值 id）
          s1: '30349',
          s2: '1215',
          // 初始选中数量
          selectedNum: 1,
          // 初始选中的商品属性
          // 键：属性id
          // 值：属性值id列表
          selectedProp: {
            30349: []
          }
        },
        isActive:false,
        show: false,
        quota:10,        //限购数，0 表示不限购
        quotaUsed:0,
        sku: {
          goodsId: '946755',
          // 数据结构见下方文档
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '红色', // skuValueName：规格值名称
                  imgUrl: '', // 规格类目图片，只有第一个规格类目可以定义图片
                  previewImgUrl: '', // 用于预览显示的规格类目图片
                },
                {
                  id: '1215',
                  name: '蓝色',
                  imgUrl: '',
                  previewImgUrl: '',
                }
              ],
              k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            },
            {
              k: '尺寸',
              k_id: '2',
              v: [
                {
                  id: '1193',
                  name: 'S'
                },
                {
                  id: '1194',
                  name: 'M'
                },
                {
                  id: '1195',
                  name: 'L'
                }
              ],
              k_s: 's2',
              count: 2
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259,
              price: 120, //价格
              discount: 122,
              s1: '1215',
              s2: '1193',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 20, //库存
              goods_id: 946755
            },
            {
              id: 2260,
              price: 110,
              discount: 112,
              s1: '1215',
              s2: '1194',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 2, //库存
              goods_id: 946755
            },
            {
              id: 2257,
              price: 130,
              discount: 132,
              s1: '30349',
              s2: '1193',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 40, //库存
              goods_id: 946755
            },
            {
              id: 2258,
              price: 100,
              discount: 100,
              s1: '30349',
              s2: '1194',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 50, //库存
              goods_id: 946755
            },
            {
              id: 2259,
              price: 100,
              discount: 95,
              s1: '30349',
              s2: '1195',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 99, //库存
              goods_id: 946755
            }
          ],
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '留言', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: '1', // 是否必填 '1' 表示必填
              placeholder: '' // 可选值，占位文本
            }
          ],
          hide_stock: false // 是否隐藏剩余库存
        },
        goods: {
          // 数据结构见下方文档
          // 默认商品 sku 缩略图
          picture: ''
        },
        messageConfig: {
          // 数据结构见下方文档
          // uploadImg: () => {
          //   return new Promise((resolve) => {
          //     setTimeout(() => resolve('http://s11.mogucdn.com/mlcdn/c45406/180811_1k5hfa6d803575df3lkb6j67l5j3c_640x960.jpg_320x999.jpg'), 1000);
          //   });
          // },
          // 最大上传体积 (MB)
          uploadMaxSize: 3,
          // placeholder 配置
          placeholderMap: {
            text: '留下想跟店家说的话',
            tel: 'xxx',
          },
          // 初始留言信息
          // 键：留言 name
          // 值：留言内容
          initialMessages: {
            留言: '输入留言信息'
          }
        }
      }
    },
    props:{
      goodsInfo:{
        type:Object,
        default(){
          return {}
        }
        },
       topImages:{
          type:Array,
          default(){
            return []
       }

        }},
    computed:{
      ...mapGetters(['cartList']),
      alreadyBuy :{
        get () {
          if (this.cartList.length == 0) {
            return 0
          } else {
            for (let i in this.cartList) {
              if (this.cartList[i].iid === this.$route.params.iid) {
                return this.cartList[i].count
              }
            }
          }

        //     if (this.cartList[0].iid === this.$route.params.iid) {
        //       return this.cartList[0].count
        //   }
        }

      }
    },
    methods:{
      addCart(){
        this.show = true
        console.log(this.topImages);
        this.sku.tree[0].v[0].imgUrl = this.topImages[0]
        this.sku.tree[0].v[1].imgUrl = this.topImages[1]
        this.sku.tree[0].v[0].previewImgUrl = this.topImages[0]
        this.sku.tree[0].v[1].previewImgUrl = this.topImages[1]
        if (this.topImages.length <= 2) {
          this.goods.picture = this.topImages[1]
        } else {
          this.goods.picture = this.topImages[3]
        }
        this.sku.list.forEach(n=>{
          n.price = this.goodsInfo.realPrice
        })

        // this.$emit('addCart')
        // console.log(this.$route.params.iid)
      },
      buyNow() {
        this.$notify('支付功能暂未开启')
      },
      ddCartbyDialog () {
        console.log(this.$refs.skuRef.getSkuData().selectedNum);
        this.show = false
        this.$emit('addCart',this.$refs.skuRef.getSkuData().selectedNum)
      },
      iconClick () {
        this.isActive = ! this.isActive
      }
    }
  }
</script>

<style scoped>
.bottom-bar {
  background-color: #f6f6f6;
  position: fixed;
   height: 58px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}
.bar-item {
  display: flex;
}
  .bar-item div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 10px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bar-right .van-sku-actions{
    padding: 5px;

  }
  .icon-style  {
  margin:7px  5px 5px 5px;

  }
  /*.icon-style van-icon :active{*/
    /*color:var(--color-tint)*/
  /*}*/
  .van-icon{

  }
.icon-style div {
  font-size: 0;
  text-align: center;
}

.van-goods-action-icon {
  font-size: 14px;
}
</style>
