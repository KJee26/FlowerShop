// pages/user/user.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        //收藏数量
        collectNumber: 0,
        show1: false,
        show2: false,
        total_consumption:"",
        ranking:[],
    },
    login:function(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },
    onShow: function() {
        const userInfo = wx.getStorageSync('userInfo');
        const collect = wx.getStorageSync('collect') || [];
        this.setData({
            userInfo,
            collectNumber: collect.length
        })
        const token = wx.getStorageSync('token')  
        if (token) {
            this.getTotalConsumption(token);
            this.queryRanking();
        } 
    },
    showPopup1() {
        this.setData({ show1: true });
    },

    onClose1() {
        this.setData({ show1: false });
    },
    showPopup2() {
        this.setData({ show2: true });
    },

    onClose2() {
        this.setData({ show2: false });
    },
    async getTotalConsumption(token) {
        const res = await  request({url: "/orders/shop_sum",data:{token}});
        var s = res.sum;
        s=s.toFixed(2);
        this.setData({
          total_consumption:s
        })
    },
    async queryRanking() {
        const res = await  request({url: "/goods/ranking",data:{}});
        this.setData({
            ranking:res
        })
    },
    onChange(e) {
        if(e.detail==0){
          wx.switchTab({  url: '/pages/goods_list_shop/goods_list_shop',})
        }
        if(e.detail==1){
          wx.redirectTo({  url: '/pages/order_shop/order_shop',})
        }
        if(e.detail==2){
          wx.redirectTo({  url: '/pages/user_shop/user_shop',})
        }
      },
})
