import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        "orders": [],
        steps: [
            {text: '卖家接单',},
            {text: '卖家发货',},
            {text: '配送中',},
            {text: '配送完成',},
          ],
    },
    onShow(options) {
        //判断是否登陆
        /*
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            });
            return;
        }

        let pages = getCurrentPages();
        let { type } = pages[pages.length - 1].options;
        this.getOrderList(type)
        */
       
        this.getOrderList();
       
    },
    async getOrderList() {
        const res = await  request({url: "/orders/all"});
        this.setData({
            orders:res
        })
    },
    //获取订单方法
    //async getOrderList(type) {
        // const res = await request({ url: '/my/orders/all' }, { data: type })
        // this.setData({
        //     orders: res.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        // })
        //const res = await request({ url: '/my/orders/all' }, { data: type })
        // let orders = this.data.orders;
        // let newOrders = orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        // this.setData({
        //     orders: newOrders
        // })
    //},
    //切换Tab栏
    tabsItemChange(e) {
        const id = e.detail.id;
        const Tabs = this.data.Tabs;
        Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            Tabs
        })
    },
    async updateShopStatus(orderId,toShopStatus){
        const t = await request({url: "/orders/update_shop",data:{orderId,toShopStatus}});
    },
    btnReceive:function(e){
        wx.showModal({
            title:"是否确认接单？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateShopStatus(e.currentTarget.id,1)
                    setTimeout(() => {
                        wx.showToast({
                            title: '已确认接单',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.reLaunch({
                            url: '../order_shop/order_shop',
                        }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    },
    btnDeliver:function(e){
        wx.showModal({
            title:"是否确认发货？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateShopStatus(e.currentTarget.id,2)
                    setTimeout(() => {
                        wx.showToast({
                            title: '已确认发货',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.reLaunch({
                            url: '../order_shop/order_shop',
                        }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
        
    },
    btnComplete:function(e){
        wx.showModal({
            title:"是否确认配送完成？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateShopStatus(e.currentTarget.id,3)
                    setTimeout(() => {
                        wx.showToast({
                            title: '配送完成',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.reLaunch({
                            url: '../order_shop/order_shop',
                        }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    },
    onChange2(e) {
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