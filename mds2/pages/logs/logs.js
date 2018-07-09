// pages/logs/logs.js

var checkPassword =  'http://www.meidaoshuo.com/sp/index.php/User/checkPassword';//判断密码
var checkPhone = 'http://www.meidaoshuo.com/sp/index.php/User/checkPhone';//判断手机号
var register = 'http://www.meidaoshuo.com/sp/index.php/User/register';//注册

//存cookie
var uerData = wx.getStorageInfoSync('userDatas');
Page({
  /**
   * 页面的初始数据
   * 
   */
  data: {
    userPhone:'17688746802',
    loginTitle: "登录美导说商城",
    next: "下一步",
    returns: '返回',
    floag1:false,
    floag2:false,
    loginSuccess: '登录成功',
    resettingSuccess: '重置成功',
    firstTelTxt1: '135********',
    firstTelTxt: '首次使用该手机号码注册135******',
    loginFailure: '../../images/no.png',
    forgetPswd: '忘记密码',
    flag1: false,
    login:true,
    firstLogin:true,
    flagLoginSuccess: true,
    alertBox: true,
    noPswd:true,
    resetting:true,
    tel:'123',
    code:'123',
    acitve: '#8dba29',
    time: '点击获取验证码', //倒计时 
    currentTime: 60,
    newPswd:'',
    pswds:'',
    firstPswd1:'',
    firstPswd2:'',
    noCode:'',
    longitude: '',
    password:'',
    latitude: '',
    focus: true,
    focus1:true,
    focus2: true,
    Data:[],
    codeNo: '',//您输入的验证错误，请重新输入
    noction: '',///images/noction.png

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //我先得到经伟度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude1 = res.latitude;
        var longitude1 = res.longitude
        //  //负值到上面的data中
        that.setData({
          latitude: latitude1,
          longitude: longitude1
        });

      }
    })
  
  },
 
  //手机号码输入
  userNameInput:function(e){
      this.setData({
        userPhone: e.detail.value
      })
  },
//密码输入
  blurPassword: function (e) {
    this.setData({
      password: e.detail.value,
      codeNo: '',//您输入的验证错误，请重新输入
      noction: '',///images/noction.png
    })
  },
  //聚焦
  paswdFocus:function(){
    this.setData({
      
      codeNo: '',//您输入的验证错误，请重新输入
      noction: '',///images/noction.png
    })
  },

  //首页密码1
  firstPswd1: function (e){
   
    this.setData({
      firstPswd1: e.detail.value
    })
  },

  //首页密码2
  firstPswd2: function (e) {
    this.setData({
      firstPswd2: e.detail.value
    })
  },

  //忘记密码1
  noPswd1: function (){
    this.setData({
      noPswd1: e.detail.value
    });
  },
  //验证码
  bindCode: function (e) {
    this.setData({
      noCode: e.detail.value
    })
  },

  //忘记密码2
  noPswd1: function () {
    this.setData({
      noPswd1: e.detail.value
    });
  },
  //清除手机号
  cleart: function(){
    this.setData({
      userPhone: ""
    })  
  },
  //清除登录密码
  pswdcleart:function(){
    this.setData({
      password:'',
    });
  },
  //清除密码
  firstPswd1Cleart: function () {
    this.setData({
      firstPswd1: ""
    })
  },
  //清除确认密码
  firstPswd2Cleart: function () {
    this.setData({
      firstPswd2: ""
    })
  },
  //验证码请求
  getCode: function (options) {
    var that = this;
    var userPhone = that.data.userPhone;
    wx: wx.request({
      url: 'http://www.meidaoshuo.com///sp/index.php/Home/User/sendSms/',
      data: {
        phone: userPhone
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
    var interval;
    var currentTime = that.data.currentTime;
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


  //登录美导说商城下一步1
  next: function (e) {
  
    var that = this;
    //得到电话号码
    var userPhone = this.data.userPhone;
    that.setData({
      tel:userPhone,
    });
    //得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    if (userPhone == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }  else if (userPhone < 11){
      wx.showModal({
        title: '提示',
        content: '请输入正确手机号码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
    
      wx.request({
        url: checkPhone,
        data: {
          user_phone: userPhone,
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var status = res.data.satus;
          if (res.data.status == 200) {
            //手机号存在
            that.setData({
              login: false,
              flag1: true,
            });
          }
          if (res.data.status == 400) {
            //手机号不存在
            that.setData({
              firstLogin: false,
              flag1: true,
            });
          }
        }
      })
    }
  },
  //登录的下一步
  bindLoginNext: function () {
    var that = this;
    that.setData({
      noPswd: true,
      login: false,
    });
    var strkong = /^[0-9a-zA-Z]{0,25}$/g;
    var firstCode = this.data.firstCode;//验证码
    var userPhone = this.data.userPhone;//电话号码
    var password = this.data.password //密码
    //得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;

   
    if (password == '') {
      that.setData({
        codeNo: '您输入的验证错误，请重新输入',//
        noction: '/images/noction.png',//
      });
      // wx.showModal({
      //   title: '提示',
      //   content: '密码不能为空',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      
    } else if (strkong.test(password)){
        wx.request({
          url: checkPassword,
          data: {
            user_phone: userPhone,
            password: password
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            //cookie.header里面的数据存缓存
            console.log(res.header['Set-Cookie']);
            if (res && res.header && res.header['Set-Cookie']) {
              wx.setStorageSync('cookieKey', res.header['Set-Cookie']);  
            } 
            console.log(res);
            wx.setStorageSync('memberName', res.data.data.memberName);
            wx.setStorageSync('user_phone', res.data.data.user_phone);
            wx.setStorageSync('user_nick', res.data.data.user_nick);
            wx.setStorageSync('user_realname', res.data.data.user_realname);
            wx.setStorageSync('userId', res.data.data.user_id);
            wx.setStorageSync('memberName', res.data.data.memberName);
            wx.setStorageSync('headerPortraitUrl', res.data.data.user_head_portrait_url);
            wx.setStorageSync('types', res.data.data.user_type);//
            wx.setStorageSync('personalitySignature', res.data.data.personalitySignature);//美导个性
            
            if (res.data.status == 200) {
              console.log(66);
              getApp().globalData.header = res.header['Set-Cookie'];
              that.setData({
                login: true,
                flagLoginSuccess: false,
              });
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/main/main',
                });
              }, 2500) //延迟时间 这里是2秒半  
            } else if (res.data.status == 403){
            
              wx.showModal({
                title: '提示',
                content: '密码不正确',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
      })
    }
  },

  //首次登录的下一步
  firstLoginNext　:function(){
    var that = this;
    var firstPswd1 = this.data.firstPswd1;//得到密码
    var firstPswd2 = this.data.firstPswd2;//得到密码
    var userPhone = this.data.userPhone;//得到手机号码
    var noCode = this.data.noCode;//得到验证码

    that.setData({
      tel: userPhone,
    });
    //得到经伟度
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var strkong = /^[0-9a-zA-Z]{0,25}$/g;
    console.log(userPhone); //判断密码是否为空
    if (firstPswd1 == '')
    {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (firstPswd2 > 6 ){
      wx.showModal({
        title: '提示',
        content: '密码有误',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (firstPswd2 == '') {
      wx.showModal({
        title: '提示',
        content: '确认密码不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (firstPswd1 != firstPswd2){
       wx.showModal({
        title: '提示',
        content: '密码两次不一次',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else if (strkong.test(firstPswd1)){
      wx.request({
        url: register,
        data: {
          user_phone: userPhone,
          latitude: latitude,
          longitude: longitude,
          password: firstPswd1,
          verificationPassword: firstPswd2
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data.data);
          wx.setStorageSync('storage', res.data)
          if (res.data.status == 200) {
            getApp().globalData.header = res.header['Set-Cookie'];
            that.setData({
              firstLogin: true,
              flagLoginSuccess: false,
            });
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/main/main',
              });
            }, 2500) //延迟时间 这里是2秒半  
          }
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie']);  //cookie.header里面的数据
          }   
          
        },
        
      })
      
    }
    
  },
  
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  //忘记密码
  forgetThepswd: function () {
    var userPhone = this.data.userPhone;//电话号码 
    wx.navigateTo({
      url: '/pages/forgetYhePassword/forgetYhePassword?userPhone=' + userPhone,
    })
  },

  //忘记密码下一步
  noPswdNext: function(e){
      var that = this;
      var newPswd = this.data.newPswd;
      var pswds = this.data.pswds;
      var noCode = this.data.noCode;
      var userPhone = this.data.userPhone;
      //得到经伟度
      var latitude = this.data.latitude;
      var longitude = this.data.longitude;
      if (newPswd == ''){
        this.setData({
          noction: '../../images/noction.png',
          codeNo: '新密码不能为空',
        });
      }else if(pswds == ''){
        this.setData({
          noction: '../../images/noction.png',
          codeNo: '确认密码不能为空',
        });
      }else {
        //忘记密码请求
         wx.request({
          url: 'http://www.mds.com/sp/index.php/User/register',
          data: {
            user_phone: userPhone,
            latitude: latitude,
            longitude: longitude,
            password: newPswd,
            verificationPassword: pswds,
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.data);
            if (res.statusCode == 200){ 
              that.setData({
                noPswd: true,
                resetting: false,
              });
            }     
          }
        })              
      }
  },
  
  //点击发送验证码倒计时
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

})