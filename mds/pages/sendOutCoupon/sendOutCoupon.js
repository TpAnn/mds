var sendRedEnvelopes = 'http://www.meidaoshuo.com///sp/index.php/Home/My/sendRedEnvelopes'//发送优惠券
let cookie = wx.getStorageSync('cookieKey');
var app = getApp()
Page({
  data: {
    currentTab: 0,
    danghao: "101541257741",
    count: 2,
    total: 489,
    cancel: "取消订单",
    remind: "提醒发货",
    immediately: "立即付款",
    pendingPayment: "待付款",
    pendingDelivery: "待发货",
    GoodsTobeReceived: "待收货",
    receipt: "确认收货",
    lookLogistics: "查看物流",
    toBeEvaluated: "待评价",
    completed: "已完成",

    navList: [
      {
        selectTxt: '待付款',
        select: 0
      }, {
        selectTxt: '待发货',
        select: 1
      }, {
        selectTxt: '待收货',
        select: 2
      }, {
        selectTxt: '待评价',
        select: 3
      }, {
        selectTxt: '已完成',
        select: 4
      }
    ],
    conentList: [
      {
        "imgUrl": '',
        "conentTxt": '兰芝臻白净透水乳护肤套装',
        "price": '489',
        "medol": '套装',
        "numbers": 'X1',
        "payUrl1": "../../images/payment01.png"


      }, {
        "imgUrl": '',
        "conentTxt": '韩后茶蕊嫩白液',
        "price": '296',
        "medol": '110ml',
        "numbers": 'X1',
        "payUrl1": "../../images/payment02.png"
      }
    ],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let cookie = wx.getStorageSync('cookieKey');
    let userId = wx.getStorageSync('userId');
    var id = options.id;
    wx: wx.request({
      url: sendRedEnvelopes,
      data: {
        user_id: userId,
        commodity_id:11,
      },
      header: {
        'content-type': 'application/json',
        'Cookie': cookie,

      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })




  },
  //查看物流
  bindLook: function () 　{
    wx.navigateTo({
      url: "/pages/lookLogistics/lookLogistics",
    })
  },
  //立即付款 当他失败的时候跳转的链接
  bindImmdeiately: function () {
    wx.navigateTo({
      url: "/pages/immediatePayment/immediatePayment",
    })
  },
  //评价
  bindevaluate: function () {
    wx.navigateTo({
      url: "/pages/evaluate/evaluate",
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });


  },
  //点击切换
  clickTab: function (e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.select) {
      return false;
    } else {

      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //进详情
  bindDetails: function () {
    console.log();
    wx.navigateTo({
      //url: '/pages/detailsOfTheOrder/detailsOfTheOrder',
    })
  },



})