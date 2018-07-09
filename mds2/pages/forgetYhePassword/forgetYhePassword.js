// pages/forgetYhePassword/forgetYhePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    next: "下一步",
    noCode:'',
    newpassword:'',
    password:'',
    date: '请选择日期',
    fun_id: 2,
    time: '点击获取验证码', //倒计时 
    currentTime: 60,
    userPhone:'',
    codeNo: '您输入的验证错误，请重新输入',//
    noction: '/images/noction.png',//
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    var userPhone = options.userPhone;//号码
    that.setData({
      userPhone: userPhone
    });
  },
  //验证码
  bindCode: function (e) {
    this.setData({
      noCode: e.detail.value
    })
  },
  //密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //确认密码
  newpassword: function (e) {
    this.setData({
      newpassword: e.detail.value
    })
  },
  
  //验证码请求
  getCode: function (options) {
    
    var that = this;
    var userPhone = that.data.userPhone;
    wx.request({
      url: 'http://www.meidaoshuo.com///sp/index.php/Home/User/sendSms/',
      data: {
        phone:userPhone
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.header['Set-Cookie']);
        if (res && res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);
        } 
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    var interval;
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  noPswdReturn: function(){
    console.log(66);
      wx.navigateTo({
        rul:'/pages/logs/logs'
      })
  },
  //忘记密码下一步
  noPswdNext: function (e) {
    let cookie = wx.getStorageSync('cookieKey');
    console.log(cookie);
    var that = this;
    var password = this.data.password;
    var newpassword = this.data.newpassword;
    var noCode = this.data.noCode;
    var userPhone = this.data.userPhone;
    //得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    if (newpassword == '') {
      that.setData({
        noction: '/images/noction.png',
        codeNo: '新密码不能为空',
      });
    } else if (password == '') {
      that.setData({
        noction: '../../images/noction.png',
        codeNo: '确认密码不能为空',
      });
    } else {
      //忘记密码请求
      wx.request({
        url: 'http://www.meidaoshuo.com///sp/index.php/Home/User/updatePassword/',
        data: {
          password: password,
          verificationPassword: newpassword,
          user_phone: userPhone,
          code: noCode,
        },
        method: "GET",
        header: {
          'content-type': 'application/json', // 默认值
          'Cookie': cookie,
        },
        success: function (res) {
          console.log(res.data.data);
          if (res.status == 200) {
            wx.showToast({
              title: '更改成功！',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              noPswd: true,
              resetting: false,
            });
          }
        }
      })
    }
  },
  //清除确认密码
  pswdCleart:function(){
    this.setData({
      newpassword:'',
    });
  },
  //清除确认密码
  newpswrdCleart: function () {
    this.setData({
      password: '',
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})