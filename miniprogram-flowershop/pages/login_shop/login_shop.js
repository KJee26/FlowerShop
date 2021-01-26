// pages/login/login.js
import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
import Notify from "../../dist/notify/notify";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumber:"",
        password:"",
        token:""
    },
    getPhoneNumber:function(e){
        this.phoneNumber = e.detail
    },
    getPassword:function(e){
        this.password = e.detail
    },
    //获取用户信息并登陆
    async login(phoneNumber,password){
      const t = await request({url: "/users/shoplogin",data:{phoneNumber,password}});
      await wx.setStorageSync('token',t.token);
      this.setData({
        token:t.token
      })
    },
    getInfoAndLogin(e) {
      //使用正则表达式检验手机号
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      
        if(!this.phoneNumber){
          Notify({ 
            color: '#ad0000',
            background: '#ffe1e1',
            message: '账号不能为空',
            duration: 1000, });
        }
        else {

            if(this.phoneNumber!="admin"||this.password!="admin"){
              wx.showToast({
                title: '密码错误',
                icon:"none"
              })
            }else{
              //跳转
              //获取用户信息并存入本地
              const { userInfo } = e.detail;
              wx.setStorageSync('userInfo', userInfo);
              setTimeout(() => {
                  wx.showToast({
                    title: '登录成功',
                    icon: "success",
                  });
                  setTimeout(() => {
                    wx.hideToast();
                  }, 2000)
                }, 0);
              wx.switchTab({
                url: '../goods_list_shop/goods_list_shop',
              });
            } 
        }
    }
})