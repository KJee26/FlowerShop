Page({
  data: {
    active: 0,
  },
  onChange(e) {
    // event.detail 的值为当前选中项的索引
    // this.setData({ 
    //   active: e.detail 
    // });
    if(e.detail==0){
      this.setData({
        active:0
      })
      wx.switchTab({
        url: '/pages/goods_list/goods_list',
      })
    }
    if(e.detail==1){
      this.setData({
        active:1
      })
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    }
    if(e.detail==2){
      this.setData({
        active:2
      })
      wx.switchTab({
        url: '/pages/order/order',
      })
    }
    if(e.detail==3){
      this.setData({
        active:3
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
  },
});