import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({
  data: {
    goodsName:"",
    unit:"",
    price:"",
    reserveNum:"",
    pic:"",
  },
  getGoodsName:function(e){
    this.setData({
      goodsName:e.detail
    })
  },
  getUnit:function(e){
    this.setData({
      unit:e.detail
    })
  },
  getPrice:function(e){
    this.setData({
      price:e.detail
    })
  },
  getReserveNum:function(e){
    this.setData({
      reserveNum:e.detail
    })
  },
  getPic:function(e){
    this.setData({
      pic:e.detail
    })
  },
  //获取添加请求
  async postGoodInfo(data){
    const postInfo =await request({
      url: '/goods/goods_add',
      data:JSON.stringify(data),
      method:"POST"
    })
    console.log(postInfo);
  },
  //绑定添加事件
  confirmAdd:function(){
    if(!this.data.goodsName||!this.data.unit||!this.data.price||!this.data.reserveNum||!this.data.pic){
      wx.showToast({ 
        title: '请补全商品信息',
        icon: 'none'
      });
    }else{
      this.postGoodInfo(this.data),
      //wx.showToast({ title: '添加成功' });
      setTimeout(() => {
        wx.showToast({
          title: '添加成功',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 2000)
      }, 0);
      wx.reLaunch({
        url: '../goods_list_shop/goods_list_shop',
      })
    }
  },   
})

