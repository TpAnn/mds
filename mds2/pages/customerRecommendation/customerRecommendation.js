var joinCartToUser = getApp().globalData.localhost + '/sp/index.php/Home/My/joinCartToUser';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '首页'
      },
      {
        text: '健康'
      },
      {
        text: '情感'
      },
      {
        text: '职场'
      },
      {
        text: '育儿'
      },
      {
        text: '纠纷'
      },
      {
        text: '青葱'
      },
      {
        text: '上课'
      },
      {
        text: '下课'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    conent: [],
    selectGoodsId: [],
    // conent:[
    //   {
    //     "imgUrl": '../../images/payment01.png',
    //     "conentTxt": '兰芝臻白净透水乳护肤套装',
    //     "effect": '护肤，洁面',
    //     "describe": '补水美白 淡斑 官方正品',
    //     "isSelect": false,
    //     "sold": 10,
    //     "price1": 598,
    //     "price2": 498,
    //     "img1": "../../images/cars.png",


    //   },{
    //   "imgUrl": '../../images/payment01.png',
    //   "conentTxt": '兰芝臻白净透水乳护肤套装',
    //   "effect": '护肤，洁面',
    //   "describe": '补水美白 淡斑 官方正品',
    //   "isSelect": false,
    //   "sold": 10,
    //   "price1": 598,
    //   "price2": 498,
    //   "img1": "../../images/cars.png",


    //   }, {
    //     "imgUrl": '../../images/payment01.png',
    //     "conentTxt": '兰芝臻白净透水乳护肤套装',
    //     "effect": '护肤，洁面',
    //     "describe": '补水美白 淡斑 官方正品',
    //     "sold": 10,
    //     "isSelect": false,
    //     "price1": 598,
    //     "price2": 498,
    //     "img1": "../../images/cars.png",
    //   }, {
    //     "imgUrl": '../../images/payment01.png',
    //     "conentTxt": '兰芝臻白净透水乳护肤套装',
    //     "effect": '护肤，洁面',
    //     "describe": '补水美白 淡斑 官方正品',
    //     "sold": 10,
    //     "price1": 598,
    //     "isSelect": false,
    //     "price2": 498,
    //     "img1": "../../images/cars.png",
    //   }
    // ],

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
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
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
        wx.navigateTo({
          url: '/pages/cart/cart'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('tempUrl')){
      this.getGoods(wx.getStorageSync('tempUrl'));
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