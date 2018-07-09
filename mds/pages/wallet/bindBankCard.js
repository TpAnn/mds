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
    name: '',
    bankType: '',
    bankNum: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.name,
      bankNum: options.bankNum,
      bankType: options.type
    });
  },
  //获取验证码
  getCodeTap: function(e) {
    var that = this,
        n = 59;

    if (!this.data.tell.length) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }

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

    //请求验证码
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/User/sendSms/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        phone: this.data.tell
      },
      success: res => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '验证码已发送！',
            icon: 'none',
            duration: 2000
          });
        } else if (res.data.status == 400) {
          wx.showToast({
            title: '手机号码有误！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '服务器繁忙！',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    });
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

    //提交
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/addBankCard/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        realname: this.data.name,
        bankName: this.data.bankType,
        phone_umber: this.data.tell,
        bank_card_number: this.data.bankNum,
        code: this.data.code,
      },
      success: res => {
        if (res.data.status == 200) {
          this.setData({
            bindFlag: true
          })
          setTimeout(() => {
            this.setData({
              bindFlag: false
            })
            wx.redirectTo({
              url: '/pages/wallet/bankCard'
            })
          }, 2000);
        } else if (res.data.status == 401) {
          wx.showToast({
            title: '提交失败，请重试！',
            icon: 'none',
            duration: 2000
          });
        } else if (res.data.status == 404) {
          wx.showToast({
            title: '手机验证码不正确！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '服务器繁忙！',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
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