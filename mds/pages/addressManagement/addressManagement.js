Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/User/selectAllShippingAddress',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if (res.data.status == 200){
          wx.redirectTo({
            url: "../addreAdministration/addreAdministration",
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
    });

  },
  //新增收货地址
  bindNew: function () {
    console.log(1);
    wx.navigateTo({
      url: '/pages/newAddress/newAddress'//新增收货地址
    })
  },
 

  
})