// pages/user/user.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        userInfo: {},
        //收藏数量
        collectNumber: 0,
        show: false,
        total_consumption:"",
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
        } 
    
    },
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
    },
    async getTotalConsumption(token) {
        const res = await  request({url: "/orders/sumbytoken",data:{token}});
        var s = res.sum;
        s=s.toFixed(2);
        this.setData({
          total_consumption:s
        })
    },
    onChange(e) {
        // event.detail 的值为当前选中项的索引
        // this.setData({ 
        //   active: e.detail 
        // });
        if(e.detail==0){
        
          wx.switchTab({
            url: '/pages/goods_list/goods_list',
          })
        }
        if(e.detail==1){
       
          wx.switchTab({
            url: '/pages/cart/cart',
          })
        }
        if(e.detail==2){
        
          wx.switchTab({
            url: '/pages/order/order',
          })
        }
        if(e.detail==3){
         
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      },
      async addressChoose() {
        try {
            const scope = await getSetting()
            if (scope === false) {
                await openSetting();
            }
            let address = await chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
            wx.setStorageSync('address', address)
        } catch (err) {
            console.log(err);
        }
    },
})
