// pages/myiIntegral/myiIntegralDetailed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: 0,
    data: [],
    integral: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(1);
  },
  getData: function(params) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/selectIntegralConsumptionDetail/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        state: params
      },
      success: res => {
        if(res.data.data.length == 0){
          this.data.data.push({});
        }else{
          var tempKeys = Object.keys(res.data.data);
          tempKeys.forEach((i, k) => {
            if (k == 0) {
              this.data.data.push({
                date: "本月",
                data: res.data.data[tempKeys[k]]
              });
            } else {
              this.data.data.push({
                date: tempKeys[k],
                data: res.data.data[tempKeys[k]]
              });
            }
          })
        }
        this.setData({
          data: this.data.data,
          integral: this.data.data[0].data[0].total_integral > 0 ? this.data.data[0].data[0].total_integral : 0
        })
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
  navBtn: function(e) {
    var index = e.currentTarget.dataset.index;
    if (index == this.data.showFlag){
      return;
    }
    if(this.data.data.length<2){
      this.getData(2);
    }
    this.setData({
      showFlag: index
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