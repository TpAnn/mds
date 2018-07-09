Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCodeText: '获取验证码',
    getCodeFlag: false,
    tell: '',
    code: '',
    bindFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isLogin = getApp().globalData.header;
    if (!isLogin.length) {
      wx.redirectTo({
        url: '../logs/logs'
      })
      return;
    }
  },
  //获取验证码
  getCodeTap: function(e) {
    var that = this,
        n = 59;

    if (this.data.getCodeFlag)return;

    var time = setInterval(function () {
      var str =  n + 's后重新获取';
      that.setData({
        getCodeText: str,
           getCodeFlag: true,
      })
      if (n <= 0) {
        that.setData({
          getCodeFlag: false,
          getCodeText: '重新获取'
        })
        clearInterval(time);
      }
      n--;
    }, 1000);

    //提交
    // wx.request({
    //   url: '',
    //   data: {
    //     tel: phone,
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     var result = res.data.code;
        
    //   }
    // });
  },
  //监听input
  listenerTellval: function(e) {
    this.data.tell = e.detail.value;
  },
  listenerCodeval: function (e) {
    this.data.code = e.detail.value;
  },
  //提交
  sendTap: function(e) {
    if (!this.data.tell.length){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.code.length) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.tell)) {
      wx.showToast({
        title: '您输入的手机号码格式不正确！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    this.setData({
      bindFlag: true
    })

    setTimeout(() => {
      this.setData({
        bindFlag: false
      })
      // wx.navigateTo({
      //   url: ''
      // })
    }, 2000);

    //提交
    // wx.request({
    //   url: '',
    //   data: {
    //     tel: phone,
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     var result = res.data.code;

    //   }
    // });
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