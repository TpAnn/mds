// pages/wallet/bankCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWechatFlag: true,
    data: [],
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
        if( !!res.data.data ){
          let data = res.data.data.map((i) => {
            return {
              showBankCardFlag: false,
              bankCardName: i.bankName.split('-')[0],
              bankTailNum: i.bank_card_number.substr(-4),
              ...i
            }
          })
          if ( options.id > 0 ) {
            data.forEach((i,k) => {
              if (i.bc_id == options.id ) {
                data[k].showBankCardFlag = true;
                this.setData({
                  showWechatFlag: false
                })
              }
            })
          }
          this.setData({
            data: data
          })
        }else{
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
  //切换
  showFlag:function(e){
    // this.setData({
    //   showWechatFlag: !this.data.showWechatFlag,
    //   showBankCardFlag: !this.data.showBankCardFlag
    // });
    wx.redirectTo({
      url: '/pages/wallet/withdrawCash?id=' + e.currentTarget.dataset.id
    })
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