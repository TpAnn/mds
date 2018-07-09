Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrData:[],
  },
  // hasDefaultAddress: function (e) {
  //   this.setData({
  //     isAllSelect: !this.data.isAllSelect
  //   });
  // },
  settingDefaultAddr: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要切换默认地址吗？',
      success: function (res) {
        if (res.confirm) {
          var addrData = that.data.addrData;
          for (var i = 0; i < addrData.length; i++) {
            that.setData({
              ['addrData[' + i + '].defaultAddrFlag']: false,
            })
          }
          wx.request({
            url: getApp().globalData.localhost + '/sp/index.php/User/setUpShippingAddressToDefault',
            method: "GET",
            header: {
              'content-type': 'application/json',
              'Cookie': getApp().globalData.cookieKey
            },
            data:{
              ra_id: e.currentTarget.dataset.id
            },
            success: res => {
              that.setData({
                ['addrData[' + e.currentTarget.dataset.index + '].defaultAddrFlag']: true,
              })
            },
            fail: res => {
              wx.showToast({
                title: '网络连接失败！',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      }
    })
  },
  //编辑地址
  bindupdata: function (e) {
    wx.redirectTo({
      url: '/pages/updateAddr/updateAddr?ra_id=' + e.currentTarget.dataset.id,
    })
  },
 //新增地址
  bindNew: function (){
   wx.navigateTo({
     url: '/pages/newAddress/newAddress',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/User/selectAllShippingAddress',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if (res.data.status != 200){
          wx.showToast({
            title: '网络连接失败！',
            icon: 'none',
            duration: 2000
          });
          return;
        };
        this.setData({
          addrData: res.data.data.map((i) => {
            return {
              defaultAddrFlag: !!+i.address_state ? true : false,
              imgUrl: '/images/bj.png',
              ...i
            }
          })
        });
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