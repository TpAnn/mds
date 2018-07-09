// pages/redPacket/redPacket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    sum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/myRedEnvelopes',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        res.data.data.forEach((i)=>{
          if (i.state==0){
            this.data.sum++;
          }
        });
        this.setData({
          sum: this.data.sum,
          data: res.data.data.map((i)=>{
            return {
              tell: wx.getStorageSync('userDatas').user_phone,
              ...i
            }
          })
        })
      },
      fail: () => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  useBtn:function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mdsDetails/mdsDetails?shopId='+id,
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