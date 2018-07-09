var joinCartToUser = getApp().globalData.localhost + '/sp/index.php/Home/My/joinCartToUser';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [],
    conent: [],
    selectGoodsId: [],
  },
  switchSelect: function (e) {
    //得到当前id
    var index = e.currentTarget.dataset.childindex,
      id = e.currentTarget.dataset.id;
    this.data.conent[index].isSelect = !this.data.conent[index].isSelect //当它等于false时 则反
    if (this.data.conent[index].isSelect) {
      this.data.selectGoodsId.push(id);
    } else {
      this.data.selectGoodsId.splice(this.data.selectGoodsId.indexOf(id), 1);
    }
    //调用数组
    this.setData({
      conent: this.data.conent,
    });
  },
  getGoods: function (params) {
    wx.request({
      url: params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        res.data.data.forEach((i)=>{
          this.data.selectGoodsId.push(i.ci_id);
        })
        this.setData({
          conent: res.data.data.map((i) => {
            return { isSelect: true, ...i }
          }),
          selectGoodsId: this.data.selectGoodsId
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
  //把推荐商品加入购物车
  bindRecommend: function () {
    if (!this.data.selectGoodsId.length) {
      wx.showToast({
        title: '请选择一件商品！',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.request({
      url: joinCartToUser,
      data: {
        md_user_id: this.data.conent[0].md_user_id,
        commodityArrayString: this.data.selectGoodsId.toString()
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        if(res.data.status == 200){
          wx.switchTab({
            url: '../cart/cart'
          })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('tempUrl')){
      this.getGoods(wx.getStorageSync('tempUrl'));
      wx.clearStorageSync('tempUrl');
    }else{
      wx.navigateBack({
        delta: 1
      })
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