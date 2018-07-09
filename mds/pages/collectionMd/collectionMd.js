// pages/Collectionmd/Collectionmd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycadets: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/HomeCarousel/selectCollectionCommodity/',
      method: 'GET',
      data: {
        collection_type: 1,
        // collection_id: 0
      },
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if (res.data.status != 200){
          wx.navigateBack({
            delta: 1
          })
        }
        this.data.mycadets = res.data.data.map((i)=>{
          return { good_rate: (Math.random()*4+96).toFixed(2),...i }
        });
        this.setData({
          mycadets: this.data.mycadets
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

  urlToAmerican: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/americanDetails/americanDetails?id=' + id,
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