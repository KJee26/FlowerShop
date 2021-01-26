import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({
    data: {
        //详情数据
        priceInput:"",
        reserveNumInput:"",
        goodInfo: {},
        //是否被保存
        isCollect: false,
    },
    GoodInfo: {},
    //获取详情数据
    async getGoodInfo(goods_id) {
        const goodInfo = await request({ url: "/goods/detail", data: { goods_id } });
        this.GoodInfo = goodInfo
            //获取收藏信息
        let collect = wx.getStorageSync("collect") || []; 
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        this.setData({
            goodInfo: { 
                goods_name: goodInfo.goods_name,
                price: goodInfo.price, 
                unit: goodInfo.unit,
                goods_introduce: goodInfo.goods_introduce,
                pic: goodInfo.pic,
                comment: goodInfo.comment,
                salesNum: goodInfo.sales_num,
                reserveNum: goodInfo.reserve_num
            },
            isCollect: index !== -1 ? true : false
        })

    },
    //删除请求
    async deleteReq(goods_id){
        const delInfo = await request({ url: "/goods/goods_delete", data:{goods_id }});
    },
    //绑定删除事件
    deleteGoods:function(){
        //定义是否删除对话框
        wx.showModal({
            title:"是否删除该商品？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    //用户点击确定
                    let status=this.deleteReq(this.GoodInfo.goods_id);
                    setTimeout(() => {
                        wx.showToast({
                          title: '删除成功',
                          icon: "success",
                        });
                        setTimeout(() => {
                          wx.hideToast();
                        }, 2000)
                      }, 0);
                      wx.reLaunch({
                      
                        url: '../goods_list_shop/goods_list_shop',
                      })
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    },
    setPriceInput:function(e){
        this.priceInput=e.detail
    },
    setReserveNum:function(e){
        this.reserveNumInput=e.detail
    },
    //更新请求
    async updateReq(goods_id,price,reserve_num){
        const delInfo = await request({url: "/goods/goods_update",data:{goods_id,price,reserve_num}});
    },
    //绑定更新事件
    updateGoods:function(){
        wx.showModal({
            title:"是否修改商品信息？",
            cancelColor: 'cancelColor',
            cancelText:"取消",
            confirmColor: 'confirmColor',
            success:(res)=>{
                if (res.confirm) {
                    //用户点击确定
                    if(!this.priceInput&&!this.reserveNumInput){
                        wx.showToast({
                            title: '无修改内容',
                            icon:"none",
                        });
                    }else{
                        if(!this.priceInput){
                            this.priceInput=this.GoodInfo.price
                        }
                        if(!this.reserveNumInput){
                            this.reserveNumInput=this.GoodInfo.reserve_num
                        }
                        let status=this.updateReq(this.GoodInfo.goods_id,this.priceInput,this.reserveNumInput);
                        setTimeout(() => {
                            wx.showToast({
                                title: '修改成功',
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
                } else if (res.cancel) {
                    //用户点击取消
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        let pages = getCurrentPages();
        let goods_id = pages[pages.length - 1].options.goods_id
        this.getGoodInfo(goods_id)
    }
})