import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import Dialog from '../../dist/dialog/dialog';
Page({
    data: {
        rate : [],
        goods_list: []
    },
    onShow: function(options) {
        let pages = getCurrentPages();
        let order_id = pages[pages.length - 1].options.order_id
        this.getGoodsList(order_id);
    },
    async getGoodsList(order_id) {
        const res = await  request({url: "/orders/goodsListByOrderId",data:{order_id}});
        this.setData({
            goods_list:res
        })
    },
    async comment(list) {
        const token = wx.getStorageSync('token')  
        const res = await  request({url: "/goods/comment",method:"POST",data:{list,token}});
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
                        wx.switchTab({
                        url: '../order/order',
                        }) 
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
        
    },
    //输入评价信息
    onChange:function(e){
      for(let i =0;i<this.data.goods_list.length;i++){
          if(e.currentTarget.id==this.data.goods_list[i].goods_name){
            this.data.goods_list[i].comment=e.detail;
          }
      }
    },
    async updateCustStatus(orderId,toCustStatus){
        const t = await request({url: "/orders/update_cust",data:{orderId,toCustStatus}});
    },
    //提交评价信息
    btnCommit:function(e){
        let pages = getCurrentPages();
        let order_id = pages[pages.length - 1].options.order_id
        wx.showModal({
            title:"是否提交评价？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    this.updateCustStatus(order_id,3)
                    this.comment(this.data.goods_list);
                    setTimeout(() => {
                        wx.showToast({
                            title: '评价已提交',
                            icon: "success",
                        });
                        setTimeout(() => {
                            wx.hideToast();
                        }, 2000)
                        }, 0);
                        wx.switchTab({
                        url: '../order/order',
                        })
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    }
})