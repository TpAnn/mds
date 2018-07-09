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

    wx.navigateTo({
      url: '/pages/wallet/bindBankCard'
    })

    //提交
    wx.request({
      url: '',
      data: {
        tel: phone,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data.code;

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