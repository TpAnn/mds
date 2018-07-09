var confirmationOfRecommendation = getApp().globalData.localhost + '/sp/index.php/Home/My/confirmationOfRecommendation';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys:'扫一扫马上将商品加入购物车',
    productName:"产品名称",
    num:'数量',
    originalPrice:'原价',
    member:"会员价",
    conetnList:[],
    TotalPrice: 0,
    TotalMember: 0,
    qrCodeUrl: '',
  },

  //返回个人中心
  bindHide: function () {
    wx.switchTab({
        url: '/pages/main/main',
      })
  },

  getGoods: function (params) {
    wx.request({
      url: confirmationOfRecommendation,
      data: {
        commodityArrayString: params
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        res.data.data.forEach((i)=>{
          this.data.TotalPrice += parseFloat(i.selling_price);
          this.data.TotalMember += parseFloat(i.membership_price);
        });
        //去小数点
        this.data.conetnList = res.data.data;
        this.data.conetnList.map((i) => {
          i.selling_price = parseInt(i.selling_price);
          i.membership_price = parseInt(i.membership_price);
        });
        //保存信息
        // wx.setStorageSync('goodsInfo', JSON.stringify({ commodityArrayString: params, md_user_id: ''}));
        this.setData({
          conetnList: this.data.conetnList,
          qrCodeUrl: res.data.data[0].qrCodeImgUrl,
          TotalPrice: this.data.TotalPrice,
          TotalMember: this.data.TotalMember
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
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods(options.id);
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