//app.js
const WxEmoji = require('/WxEmojiView/WxEmojiView.js');
App({
  onLaunch: function () {

    if (wx.getStorageSync('userId')){
      let userId = wx.getStorageSync('userId');//登录用户Id
      console.log(userId);
      let userHpone = wx.getStorageSync('user_phone');//登录用户的号码
      let userNick = wx.getStorageSync('user_nick');//登录用户的昵称
      let userRealname = wx.getStorageSync('user_realname');//登录用户实名
      let cookie = wx.getStorageSync('cookieKey');
      let memberName = wx.getStorageSync('memberName');//会员名
      let headerPortraitUrl = wx.getStorageSync('headerPortraitUrl');//头像
      let text = wx.getStorageSync('text');//发送的信息
      let data = wx.getStorageSync('data');
      let mdID = wx.getStorageSync('mdID');//聊天美导ID
      let chatID= wx.getStorageSync('chatID');//聊天用户ID
      let headerT = wx.getStorageSync('headerT');
      let personalitySignature = wx.setStorageSync('personalitySignature');//美导个性
      let textConent = wx.setStorageSync('textConent');//返回的聊天信息
    }

    
    WxEmoji.init(":_/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "20": "20.gif",
      "21": "21.gif",
      "22": "22.gif",
      "23": "23.gif",
      "25": "24.gif",
      "26": "26.gif",
      "27": "27.gif",
      "28": "28.gif",
      "29": "29.gif",
      "30": "30.gif",
      "31": "31.gif",
      "32": "32.gif",
      "33": "33.gif",
      "35": "34.gif",
      "36": "36.gif",
      "37": "37.gif",
      "38": "38.gif",
      "99": "39.gif",
      "40": "40.gif",
      "41": "41.gif",
      "42": "42.gif",
      "43": "43.gif",
      "45": "44.gif",
      "46": "46.gif",
      "47": "47.gif",
      "48": "48.gif",
      "49": "49.gif",
      "50": "50.gif",
    });
    

    if (wx.getStorageSync('cookieKey')) {
      this.globalData.cookieKey = wx.getStorageSync('cookieKey');
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('登录成功！')
        }else{
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        console.log( res );
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogin: false,
    localhost: 'http://www.meidaoshuo.com',
    cookieKey: '',
  },
  
  
})
