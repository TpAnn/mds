// pages/myiIntegral/myiIntegral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signDialogFlag: true,
    info: null,
    signIntegral: 0,
    arrowFlag: false,
    scrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/myIntegral/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        this.setData({
          info: res.data.data
        })
      },
      fail: res=> {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  signBtn: function(e) {
    if (this.data.info.signInState == 400){
      return;
    }
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/signIn',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if(res.data.data.state == 200) {
          this.setData({
            signDialogFlag: false,
            signIntegral: res.data.data.integralCount
          })
        } else if (res.data.data.state == 400) {
          wx.showToast({
            title: '您当天已经签到过了',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '签到失败！',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '签到失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  closeBtn: function(e) {
    this.setData({
      signDialogFlag: true
    })
  },
  shareBtn:function(e) {

  },
  signShareBtn: function(e) {

  },
  integralBtn: function(e) {
    wx.showModal({
      title: '提示',
      content: '您确认要兑换吗？',
      success: res=> {
        if (res.confirm) {
          var integral = e.currentTarget.dataset.integral;
          if (this.data.info.total_integral >= integral) {
            wx.request({
              url: getApp().globalData.localhost + '/sp/index.php/Home/My/exchangeMember',
              method: 'GET',
              header: {
                'content-type': 'application/json',
                'Cookie': getApp().globalData.cookieKey
              },
              success: res => {
                console.log(this)
                if (res.data.data.state == 200) {
                  wx.showToast({
                    title: '兑换成功',
                    icon: 'none',
                    duration: 2000
                  });
                } else if (res.data.data.state == 402) {
                  wx.showToast({
                    title: '开通会员的级别不能低于现有的级别',
                    icon: 'none',
                    duration: 2000
                  });
                }else {
                  wx.showToast({
                    title: '兑换失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
              },
              fail: res => {
                wx.showToast({
                  title: '签到失败！',
                  icon: 'none',
                  duration: 2000
                });
              }
            })
          } else {
            wx.showToast({
              title: '兑换失败，您的积分不足！',
              icon: 'none',
              duration: 2000
            });
          }
        } else if (res.cancel) {
          
        }
      }
    })
  },
  //滚动条滚到顶部或左边的时候触发
  upper: function (e) {
    this.setData({
      arrowFlag: false
    })
  },

  //滚动条滚到底部或右边的时候触发
  lower: function (e) {
    this.setData({
      arrowFlag: true
    })
  },

  arrowLeftBtn: function (e) { 
    this.setData({
      scrollLeft: this.data.scrollLeft - 221
    })
  },

  arrowRightBtn: function(e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 221
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
    // var that = this;
    // return {
    //   title: that.data.common.act_name,
    //   desc: that.data.common.introduction,
    //   path: '/pages/xiangqing/xiangqing?id=' + that.data.id,
    //   success: function (res) {
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  }
})