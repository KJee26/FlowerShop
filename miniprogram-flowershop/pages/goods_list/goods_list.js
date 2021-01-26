import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        name: '商品列表',
        //商品列表数据
        goodList: [],
    },
    //获取商品列表参数
    goodParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    //总页数
    maxPagenum: 1,
    //Tabs切换
    tabsItemChange(e) {
        const id = e.detail.id;
        const Tabs = this.data.Tabs;
        Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            Tabs 
        })
    },
    //获取商品列表数据
    async getGoodsList() { 
        
        const goodList = await request({ url: "/goods/goods_list"});
        this.maxPagenum = Math.ceil(goodList.total / this.goodParams.pagesize)
        this.setData({
            goodList: [...this.data.goodList, ...goodList.goods]
        })
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.goodParams.cid = options.cid || '';
        this.goodParams.query = options.query || '';
        this.getGoodsList()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.goodParams.pagenum = 1,
            this.data.goodList = []
        this.getGoodsList()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.goodParams.pagenum >= this.maxPagenum) {
            //wx.showToast({ title: '已展示所有商品' });
        } else {
            this.goodParams.pagenum++;
            this.getGoodsList()
        }
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
})