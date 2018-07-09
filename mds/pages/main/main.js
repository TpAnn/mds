// pages/main/main.js
var app = getApp();
var checkPhone = 'http://www.mds.com/sp/index.php/User/checkPhone';//请求手机号是否有注册过
var updateHeadPortrait =  'http://www.meidaoshuo.com///sp/index.php/Home/My/updateHeadPortrait/';//更换头像
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "用户名",
    log: "登录",
    register: "注册",
    navImg1: "../../images/main1.png",
    avImg2: "../../images/main2.png",
    navImg3: "../../images/main3.png",
    navImg4: "../../images/main4.png",
    navImg5: "../../images/main5.png",
    navImg1C: "../../images/main1C.png",
    navImg2C: "../../images/main2C.png",
    navImg3C: "../../images/main3C.png",
    navImg4C: "../../images/main4C.png",
    navImg5C: "../../images/main5C.png",
    mds: "美导说",
    payment: "待付款",
    deliverGoods: "待发货",
    collectGoods: "待收货",
    evaluate: "待评价",
    completed: "已完成",
    imgUrlflag1: true,
    imgUrlflag1C: false,
    imgUrlflag2: true,
    imgUrlflag2C: false,
    imgUrlflag3: true,
    imgUrlflag3C: false,
    imgUrlflag4: true,
    imgUrlflag4C: false,
    imgUrlflag5: true,
    imgUrlflag5C: false,
    telephone: "021-232529393-2",
    call: '呼叫',
    cancel: '取消',
    next: "下一步",
    returns: '返回',
    firstTelTxt: '首次使用该手机号码注册135******',
    codeNo: '您输入的验证错误，请重新输入',
    backgrouncFlag: false,
    password: '9',
    code: '9',
    headerURl: '',
    acitve: '#8dba29',
    time: '点击发送验证码', //倒计时 
    currentTime: 60,
    noction: '../../images/noction.png',
    imgLIst: [
      {
        url: '../../images/main1C.png',
        hoverUrl: '../../images/main1.png',
        payment: "待付款",
        select: 0
      },
      {
        url: '../../images/main2.png',
        hoverUrl: '../../images/main2C.png',
        payment: "待发货",
        select: 1
      },
      {
        url: '../../images/main3.png',
        hoverUrl: '../../images/main3C.png',
        payment: "待收货",
        select: 2
      },
      {
        url: '../../images/main4.png',
        hoverUrl: '../../images/main4C.png',
        payment: "待评价",
        select: 3
      },
      {
        url: '../../images/main5.png',
        hoverUrl: '../../images/main5C.png',
        payment: "已完成",
        select: 4
      }
    ],
    pageBackgroundColor: 'red',
    imgHoverIndex: 0,
    catalogSelect: 0,
    userPhone: '66',
    flag1: false,
    flag2: true,
    membership: '',
    user_phone: '',
    flag: '',
  },
  //更换头像
  bindReplacet: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
        wx.chooseImage({
          success: function (res) {
            var tempFilePaths = res.tempFilePaths
            wx.uploadFile({
              url: updateHeadPortrait, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': cookie,
              },
              formData: {
                'user': 'test'
              },
              success: function (res) {
                var person = res.data;
                var datas = JSON.parse(person);
                var headerUrl =  datas.data.user_head_portrait_url;
                console.log(headerUrl);
                wx.setStorageSync('headerPortraitUrl', headerUrl)
                that.setData({
                  headerURl: headerUrl
                });
              }
            })
          }
        })
    //   }
    // });
  },
  chooseThis(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      imgHoverIndex: e.currentTarget.dataset.index,
      catalogSelect: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '/pages/payment/payment'//跳转到侍付款页面
      })
    } else if (e.currentTarget.dataset.index == 1) {
      console.log(1);
    } else if (e.currentTarget.dataset.index == 3) {
      console.log(2);
    } else if (de.currentTarget.dataset.index == 4) {
      console.log(3);
    } 
  },

  //payment: data.currentTarget.dataset.select

  //点击发送验证码
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },

  //扫一扫
  bindQrCode: function(e) {
    if (this.isLogin()) {
      wx.scanCode({
        success: (res) => {
          if (res.errMsg == "scanCode:ok") {
            wx.setStorageSync('tempUrl', res.result);
            wx.navigateTo({
              url: '/pages/customerRecommendation/customerRecommendation'
            });
          } else {
            wx.showToast({
              title: '二维码识别失败！',
              icon: 'none',
              duration: 2000
            });
          }
        }
      })
    } else {
      return;
    }
  },

  //我的预约
  bindMyPromise: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/myPromise/myPromise'
    })
  }, 

  //会员管理
  bindVip: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/openAmember/openAmember'
    })
  }, 

  //完善信息
  bindMyInfo: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/myInfo/myInfo'
    })
  }, 

  //我的积分
  bindMyiIntegral: function() {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/myiIntegral/myiIntegral'
    })
  },

  //收藏的商品
  bindCollectionGoods: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/collectionGoods/collectionGoods'
    })
  },

  //联系我们
  bindContact:function(){
    wx.makePhoneCall({
      phoneNumber: '132465798'
    })
  },

  //登录注册
  bindLogin: function () {
    wx.navigateTo({
      url:'/pages/logs/logs',
    });
  },
  //我的钱包
  bindWallet: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/wallet/wallet',

    })
  },
  //我的学员
  bindMyCadets: function () {
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/myCadets/myCadets',
      
    })
  },
  //收藏美导
  bindMd: function (){
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/collectionMd/collectionMd',
    })
  },
  //登录美导说商城
  next3: function () {
    this.setData({
      backgrouncFlag: true,
      box5: true,
      box1: false,
      box3: false,
    });
  },
  bindPayment:function(){
    this.setData({
      imgUrlflag1:false,
      imgUrlflag1C:true
    });
  },
  bindPayment1: function () {
    this.setData({
      imgUrlflag1: true,
      imgUrlflag1C: false
    });
  },
  //我的收货地址
  bindAddre: function (){
    if (this.isLogin()) return;
    wx.navigateTo({
      url: '/pages/addressManagement/addressManagement'//跳转我的收货地址
    })
  },
 //推荐用户商品
  bindGoods: function() {
    if(this.isLogin())return;
    wx.navigateTo({
      url: '/pages/pickOfTheWeek/pickOfTheWeek',
    })
  },
  isLogin: () => {
    var isLogin = getApp().globalData.cookieKey = wx.getStorageSync('cookieKey');
    console.log(getApp().globalData.cookieKey, wx.getStorageSync('cookieKey'));
    if (!!isLogin.length) {
      wx.navigateTo({
        url: '/pages/logs/logs'
      })
    }else{
      return false;
    }
  },
  onLoad: function (e) {
    console.log(!!null)
    var that = this;
    let userId = wx.getStorageSync('userId');//登录用户Id
    let userHpone = wx.getStorageSync('user_phone');//登录用户的号码
    let userNick = wx.getStorageSync('user_nick');//登录用户的昵称
    let userRealname = wx.getStorageSync('user_realname');//登录用户实名
    let memberName = wx.getStorageSync('memberName');//用户会员名
    let headerPortraitUrl = wx.getStorageSync('headerPortraitUrl');//头像
    console.log(headerPortraitUrl);


    //如果头像是空的话就设置一个头像
    if (headerPortraitUrl == '' || headerPortraitUrl == null) {
      console.log(66);
      that.setData({
        username: userHpone,
        flag1: false,
        flag2: true,
        membership: memberName,
        headerURl: '/images/hair_c.png'
      });
    } else {
      console.log(888);
      that.setData({
        headerURl: headerPortraitUrl,
      });
    }
    if (userNick == '' && userRealname == '') {
      that.setData({
        username: userHpone,
        flag1: true,
        flag2: false,
        membership: memberName,
      });
    }
    //如果用户名不是空的话就直接赋值
    if (userRealname != '') {
      that.setData({
        username: userRealname,
        flag1: true,
        flag2: false,
        membership: memberName,
      });
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