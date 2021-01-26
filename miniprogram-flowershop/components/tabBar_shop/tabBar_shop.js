Page({
  data: {
    active: 1,
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
       
        url: '/pages/goods_list_shop/goods_list_shop',
      })
    }
    if(e.detail==1){
      this.setData({
        active:1
      })
      wx.redirectTo({
      
        url: '/pages/order_shop/order_shop',
      })
    }
    if(e.detail==2){
      this.setData({
        active:2
      })
      wx.redirectTo({
     
        url: '/pages/user_shop/user_shop',
      })
    }
  },
});