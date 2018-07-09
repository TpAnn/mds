var app = getApp()
var indexCarouse = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCarouse'//轮播图片请求接口
var indexCategory ='http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCategory' //产品分类
var indexCommodity = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCommodity?headerId=';//首页面内容
var cartOperation = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/cartOperation';//购物车加减

Page({
  data: {
    currentTab: 0,
    danghao: "101541257741",
    count: 2,
    total: 489,
    cancel: "取消订单",
    remind: "提醒发货",
    flag1: true,
    flag2: false,
    flag3: false,
    flag4: false,
    flag5: false,
    password:'6',
    catalogSelect: true,
    receipt: "确认收货",
    lookLogistics: "查看物流",
    toBeEvaluated: "待评价",
    indicatorDots: true,
    autoplay: false,
    interval: 100,
    duration: 1000,
    gs: 1,
    conent: [],
    flang: 0,
    latitude:'',
    longitude:'',
  },
    imgUrls: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [ ],
    currentTab: 0,
    navScrollLeft: 0,
    
   
  
    
  switchNav: function (event) {
    var cur = event.currentTarget.dataset.current;//当前

    wx.request({
      url: indexCommodity + cur,
      data: {
        x: '',
        y: '',
        category_id: 1,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

        var nulls = res.data.promotion_price;
        var sbData = res.data;

        for (var i = 0; i < sbData.length; i++) {
          if (sbData[i] > 10) {

          } else {

          }
        }
        that.setData({
          conent: sbData
        })


      }
    })

    //每个tab选项宽度占1/5
    // var singleNavWidth = this.data.windowWidth / 5;
    // //tab选项居中                            
    // this.setData({
    //   navScrollLeft: (cur - 2) * singleNavWidth
    // })

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

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 页面加载
  onLoad: function (e) {
    var that = this;
    var conent = this.data.conent;  
    
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
        });
      }
    })
    for(var i =0 ; i<conent.lenght; i++){
        console.log('个数'+conent[i]);
    }
    
    var that = this;
    wx.request({
      url: indexCarouse, 
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var A1img= res.data;
        that.setData({
          imgUrls: A1img// 轮播图片
        })
      }
    })

    //产品分类
    wx.request({
      url: indexCategory, 
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var navData = res.data;
        that.setData({
          navData: navData// 导航nav
        })
        //首面产品
        wx.request({
          url: indexCommodity,
          data: {
            category_id: that.data.navData[0].cc_id,
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              conent: res.data.map((i) => {
                return { cartShowFlag: i.commodity_join_number > 0 ? true : false, ...i }
              })
            })
          }
        })
      }
    })
  },
  //下拉加载
  onReachBottom: function () {
  
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

  //购物车
  bindHide: function (e){ 
    var index = e.currentTarget.dataset.index,
        conent = this.data.conent;
    
    conent.forEach((i,k)=>{
      if (index===k){
        i.cartShowFlag = true;
      }
    });

    this.setData({
      conent: conent
    });
  },
  //减法
  bindReduce: function (e) 
  {
    var that = this

    //得到点击要改变的值
    var gs = this.data.conent[index].commodity_join_number;

    //得到Id
    var id = e.currentTarget.dataset.id;

    //我先得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;

    // 最小值1
    if (this.data.gs < 2) {
      var index = e.currentTarget.dataset.index,
        conent = this.data.conent;

       this.data.gs = 1;
       conent.forEach((i, k) => {
         if (index === k) {
           i.cartShowFlag = false;
         }
       });
       this.setData({
         conent: conent
       });
    }else{
      this.data.gs--
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

    //得到点击要改变的值
    var gs = this.data.conent[index].commodity_join_number;
    
    //得到Id
    var id = e.currentTarget.dataset.id;

    //得到经伟度
    var latitude = this.data.latitude;
    var latitude = this.data.latitude;
   
    //默认99件最多
    if (gs < 100) {
      this.data.gs ++ 
    }else{
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
 //详情
  bindDetails : function (e)　{
    var shopId = e.currentTarget.dataset.id;
    wx:wx.navigateTo({
      url: '/pages/mdsDetails/mdsDetails?shopId=' + shopId,
     
    })
  }





})