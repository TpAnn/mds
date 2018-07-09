// pages/wallet/withdrawCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorFlag: false,
    money: '',
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/allBankCard/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if (!!res.data.data) {
          let data = res.data.data.map((i) => {
            return {
              bankCardName: i.bankName.split('-')[0],
              bankTailNum: i.bank_card_number.substr(-4),
              ...i
            }
          })
          if ( options.id > 0 ) {
            data.forEach((i) => {
              if (i.bc_id == options.id) {
                this.setData({
                  data: [i]
                })
              }
            })
          }else{
            this.setData({
              data: []
            })
          }
        } else {
          return;
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  switchBtn: function(e) {
    wx.redirectTo({
      url: '/pages/wallet/bankCard?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //清空输入框
  clearContent: function(e){
    this.setData({
      errorFlag: false,
      money: ''
    })
  },
  //监听数据
  listenerMoneyval: function(e) {
    if (e.detail.value.substr(e.detail.value.indexOf('.') + 1).length > 2) {
      this.setData({
        money: Math.round(e.detail.value * 100) / 100
      })
    }else{
      this.setData({
        money: e.detail.value
      })
    }
    if (parseFloat(e.detail.value)>0) {
      this.setData({
        errorFlag: false,
      })
    } else {
      this.setData({
        money: ''
      })
    }
  },
  //提现
  sendTap: function(e) {
    var that = this;
    if (!this.data.money>0){
      wx.showToast({
        title: '请输入提取金额',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (+this.data.money > 10 ) {
      wx.showToast({
        title: '提取金额超限',
        icon: 'none',
        duration: 2000
      });
      that.setData({
        errorFlag: true
      })
      return;
    }
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
    //     wx.showToast({
    //       title: '提取成功！',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //   }
    // });
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