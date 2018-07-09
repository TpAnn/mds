Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    bankNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //监听input
  listenerNameval: function (e) {
    this.data.name = e.detail.value;
  },
  listenerBankNumval: function (e) {
    this.data.bankNum = e.detail.value;
  },
  //提交
  sendTap: function (e) {
    if (!this.data.name.length) {
      wx.showToast({
        title: '请输入持卡人姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.bankNum.length) {
      wx.showToast({
        title: '请输入银行卡卡号',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    // wx.request({
    //   url: getApp().globalData.localhost + '/sp/index.php/Home/My/addBankCardByCheckInfo/',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json',
    //     'Cookie': getApp().globalData.cookieKey
    //   },
    //   data: {
    //     realname: this.data.name,
    //     bank_card_number: this.data.bankNum,
    //   },
    //   success: res => {
    //     if (res.data.status == 200) {
          wx.navigateTo({
            url: '/pages/wallet/bindBankCard?bankNum=' + this.data.bankNum + 
                 '&name=' + this.data.name + 
                 '&type=' + "中信银行-借记卡-借记卡" //res.data.data.result.bankName
          })
    //     } else if (res.data.status == 401) {
    //       wx.showToast({
    //         title: '验证失败，请确认您的卡号与持卡人是否一致！',
    //         icon: 'none',
    //         duration: 2000
    //       });
    //     } else if (res.data.status == 403) {
          
    //     } else {
    //       wx.showToast({
    //         title: '服务器繁忙！',
    //         icon: 'none',
    //         duration: 2000
    //       });
    //     }
    //   },
    //   fail: res => {
    //     wx.showToast({
    //       title: '网络连接失败！',
    //       icon: 'none',
    //       duration: 2000
    //     });
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