Page({
  data: {

  },
  enterCustom:function(){
    wx.switchTab({
      url: '../goods_list/goods_list',
    })
  },
  enterShop:function(){
    // wx.switchTab({
    //   url: '../goods_list_shop/goods_list_shop',
    // })
    wx.navigateTo({
      url: '../login_shop/login_shop',
    })
  }

})