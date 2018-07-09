// pages/nextRecommend/nextRecommend.js
var toUserRecommendCommodityToOne = 'http://www.meidaoshuo.com/sp/index.php/My/toUserRecommendCommodityToOne';
//做时间限制
var timestamp = Date.parse(new Date());
var expiration = timestamp + 3000000;
//cookie
let cookie = wx.getStorageSync('cookieKey');
let index_data = wx.getStorageInfoSync('index_data');
let index_data_expiration = wx.getStorageInfoSync('index_data_expiration');
let header = {};
let newData = wx.getStorageSync('newData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
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
    conent: [
      {
        "imgUrl": '../../images/payment01.png',
        "conentTxt": '兰芝臻白净透水乳护肤套装',
        "effect": '护肤，洁面',
        "describe": '补水美白 淡斑 官方正品',
        "isSelect": false,
        "sold": 10,
        "price1": 598,
        "price2": 498,
        "img1": "../../images/cars.png",


      }, {
        "imgUrl": '../../images/payment01.png',
        "conentTxt": '兰芝臻白净透水乳护肤套装',
        "effect": '护肤，洁面',
        "describe": '补水美白 淡斑 官方正品',
        "isSelect": false,
        "sold": 10,
        "price1": 598,
        "price2": 498,
        "img1": "../../images/cars.png",


      }, {
        "imgUrl": '../../images/payment01.png',
        "conentTxt": '兰芝臻白净透水乳护肤套装',
        "effect": '护肤，洁面',
        "describe": '补水美白 淡斑 官方正品',
        "sold": 10,
        "isSelect": false,
        "price1": 598,
        "price2": 498,
        "img1": "../../images/cars.png",
      }, {
        "imgUrl": '../../images/payment01.png',
        "conentTxt": '兰芝臻白净透水乳护肤套装',
        "effect": '护肤，洁面',
        "describe": '补水美白 淡斑 官方正品',
        "sold": 10,
        "price1": 598,
        "isSelect": false,
        "price2": 498,
        "img1": "../../images/cars.png",
      }
    ],

  },
  switchSelect: function (e) {
    //得到当前id
    var index = e.currentTarget.dataset.id
    this.data.conent[index].isSelect = !this.data.conent[index].isSelect //当它等于false时 则反
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
  //下一步
  bindNext: function () {
    wx.navigateTo({
      url: '/pages/nextRecommend/nextRecommend',

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (cookie) {
      header.Cookie = cookie;
    }
    if (index_data == '' || index_data == 'null') {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    } else {
      //获取所有商品信息
      console.log(header);
      wx.request({
        url: toUserRecommendCommodityToOne, //
        data: {
          category_id: 2
        },
        method: "GET",
        header: header,
        success: function (res) {
          console.log(res)
        }
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