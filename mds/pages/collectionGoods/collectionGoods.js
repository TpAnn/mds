var cartOperation = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/cartOperation';//购物车加减
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conent: [],
    longitude: '',
    latitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: res=> {
        this.data.latitude = res.latitude
        this.data.longitude = res.longitude
      }
    })
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/HomeCarousel/selectCollectionCommodity/',
      method: 'GET',
      data: {
        collection_type: 0,
      },
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        this.setData({
          conent: res.data.data.map((i)=>{
            return { cartShowFlag: i.commodity_join_number>0?true:false,...i}
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

  //减法
  bindReduce: function (e) {
    var that = this
    //得到Id
    var id = e.currentTarget.dataset.id;

    var index = e.currentTarget.dataset.index;

    //得到点击要改变的值
    var gs = this.data.conent[index].commodity_join_number;
    
    //我先得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;

    var conent = this.data.conent;

    // 最小值1
    if (gs < 2) {
        gs = 1;
        conent.forEach((i, k) => {
          if (index === k) {
            i.cartShowFlag = false;
          }
        });
    } else {
      gs--
    }

    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/HomeCarousel/cartOperation',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        commodity_id: id,
        function_state: 0,
        longitude: longitude,
        latitude: latitude
      },
      success: res => {
        //重新调用值
        this.setData({
          ["conent[" + index + "].commodity_join_number"]: gs,
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

  //加法
  bindAdd: function (e) {
    var that = this

    //得到Id
    var id = e.currentTarget.dataset.id;

    var index = e.currentTarget.dataset.index;

    //得到点击要改变的值
    var gs = this.data.conent[index].commodity_join_number;

    //得到经伟度
    var longitude = this.data.longitude;
    var latitude = this.data.latitude;

    //默认99件最多
    if (gs < 100) {
      gs++
    } else {
      wx.showToast({
        title: '限购99件！',
        icon: 'none',
        duration: 2000
      });
    }

    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/HomeCarousel/cartOperation',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        commodity_id: id,
        function_state: 1,
        longitude: longitude,
        latitude: latitude
      },
      success: res => {
        //重新调用值
        this.setData({
          ["conent[" + index + "].commodity_join_number"]: gs,
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

  //购物车
  bindHide: function (e) {
    var index = e.currentTarget.dataset.index,
      conent = this.data.conent;

    conent.forEach((i, k) => {
      if (index === k) {
        i.cartShowFlag = true;
      }
    });

    this.setData({
      conent: conent
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