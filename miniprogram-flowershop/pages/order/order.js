import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import Dialog from '../../dist/dialog/dialog';
Page({
    data: {
        "orders": [],
        steps: [
            {text: '卖家接单',},
            {text: '卖家发货',},
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
       const token = wx.getStorageSync('token')
       //如果已经登录过
       if (token) {
        this.getOrderList(token);
       } 
    },
    async getOrderList(token) {
        const res = await  request({url: "/orders/userbytoken",data:{token}});
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
    async updateCustStatus(orderId,toCustStatus){
        const t = await request({url: "/orders/update_cust",data:{orderId,toCustStatus}});
      },
    btnPay:function(e){
        // setTimeout(() => {
        //     wx.showToast({
        //       title: '登录成功',
        //       icon: "success",
        //     });
        //     setTimeout(() => {
        //       wx.hideToast();
        //     }, 2000)
        //   }, 0);
        this.updateCustStatus(e.currentTarget.id,1);
        setTimeout(() => {
            wx.showToast({
                title: '支付成功',
                icon: "success",
            });
            setTimeout(() => {
                wx.hideToast();
            }, 2000)
            }, 0);
            wx.reLaunch({
            url: '../order/order',
            }) 
    },
    btnCancel:function(e){
        wx.showModal({
            title:"是否取消该订单？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateCustStatus(e.currentTarget.id,4)
                    setTimeout(() => {
                        wx.showToast({
                            title: '订单已取消',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.reLaunch({
                        url: '../order/order',
                        }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
        
    },
    btnReceive:function(e){
        wx.showModal({
            title:"是否确认收货？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateCustStatus(e.currentTarget.id,2)
                    setTimeout(() => {
                        wx.showToast({
                            title: '确认收货成功',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.reLaunch({
                            url: '../order/order',
                            }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    },
    btnComment:function(e){
        //this.updateCustStatus(e.currentTarget.id,3)
    
        wx.navigateTo({
          url: '../comment/comment?order_id='+e.currentTarget.id,
        })
    },
    onChange2(e) {
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
})
