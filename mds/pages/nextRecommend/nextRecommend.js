var toUserRecommendCommodityToTwo = getApp().globalData.localhost + '/sp/index.php/My/toUserRecommendCommodityToTwo';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramsId: '',
    navData: [],
    currentTab: 0,
    conent:[],
    hasSingleElection: false,  //聊天推荐优惠卷
    hasRecommend: false, //聊天推荐商品
    uid: 0,
  },
  getGoods: function (params) {
    wx.request({
      url: toUserRecommendCommodityToTwo,
      data: {
        commodityArrayString: params
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        this.setData({
          conent: res.data.data
        });
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
 //确认给客户推荐
  bindRecommend: function () {
    if (this.data.hasSingleElection) {
      wx.request({
        url: getApp().globalData.localhost + '/sp/index.php/Home/My/sendRedEnvelopes/',
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'Cookie': getApp().globalData.cookieKey
        },
        data: {
          user_id: this.data.uid,
          commodity_id: this.data.paramsId
        },
        success: res => {
          if (res.data.status == 200) {
            wx.redirectTo({
              url: '/pages/chat/chat?flag=true' + '&uid=' + this.data.uid,
            })
          } else if (res.data.status == 401) {
            wx.showToast({
              title: '发送失败，请重试！',
              icon: 'none',
              duration: 2000
            });
          } else if (res.data.status == 402) {
            wx.showToast({
              title: '已经给该用户发送过优惠卷！',
              icon: 'none',
              duration: 2000
            });
          }else{
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
      })
      return;
    }
    if (this.data.hasRecommend) {
      wx.redirectTo({
        url: '/pages/chat/chat?recommend=' + this.data.paramsId + '&uid=' + this.data.uid,
      })
      return;
    }
    wx.redirectTo({
      url: '/pages/confirmOfRecommend/confirmOfRecommend?id=' + this.data.paramsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.uid = options.uid;
    this.getGoods(this.data.paramsId = options.id);
    if (!!options.flag){
      this.data.hasSingleElection = true;
    }
    if (!!options.recommend) {
      this.data.hasRecommend = true;
    }
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