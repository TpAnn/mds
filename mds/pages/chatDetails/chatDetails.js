var time = require('../../utils/util.js');
var WxEmoji = require('../../WxEmojiView/WxEmojiView.js');
var getChatText = 'http://www.meidaoshuo.com/sp/index.php/Chat/getChatText';
var confirmationOfRecommendation = 'http://www.meidaoshuo.com/sp/index.php/Home/My/confirmationOfRecommendation';

var temTextArea;
//做时间限制
var timestamp = Date.parse(new Date());
var expiration = timestamp + 3000000;
Page({
  data: {
    conent: [],      // 聊天记录
    headerImg:'',
    flaghide: false,
    focus:true,
    sendouthide:true,
    content:'',
    listHide:false,
    datas:[],
    scrollTop: 100,
    uid: 0,
  },
  
  onLoad: function (e) {
    var that = this;
    this.data.uid = e.id;
    let cookie = wx.getStorageSync('cookieKey');
    let userId = wx.getStorageSync('userId');//用户ID


    //表情包加载
    WxEmoji.bindThis(this);
    var id = e.id;//聊天列表用户ID 
    // var headeImg  = e.headerImg ;//用户头像
    var types = e.types;//是否是美导

    // console.log(headeImg);
   
    //判断是否是美导
    if (types == 1 ){
       that.setData({
         listHide: false,
       });
    }
    //获取所有聊天信息
    wx.request({
      url: getChatText,
      data: {
        chat_user_id: id
      },
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': cookie,
      },
      success: function (res) {
        console.log(res);
       var conent = res.data.data;
       var data = [];
       for (var i = 0; i < conent.length; i++ ){
           if (conent[i].user_id == userId) {
              conent[i].showType = 0 ;
              that.setData({
                conent: conent,
              });
           } else {
             console.log(res);
             var left = conent[i];
             conent[i].showType = 1 ;
             that.setData({
               conent: conent,
             });
           }  
        }
       wx.setStorageSync('data', conent);
       console.log(that.data.conent);
        
      }

    })

    //判断是否有优惠卷发送
    if (!!e.flag) {
      
    }

    //判断是否有推荐商品url发送
    if (!!e.recommend) {
      wx.request({
        url: confirmationOfRecommendation,
        data: {
          commodityArrayString: e.recommend
        },
        method: "GET",
        header: {
          'content-type': 'application/json',
          'Cookie': getApp().globalData.cookieKey
        },
        success: res => {
          //需要发送的url地址
          //res.data.data[0].qrCodeImgUrl
        },
        fail: res => {
          wx.showToast({
            title: '网络连接失败！',
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
  },

  //显示工能模块
  bindshow: function (e){
    var that = this;
    that.setData({
      flaghide: !that.data.flaghide
    });
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  WxEmojiTextareaFocus: function (e) {
    var that = this;
    WxEmoji.WxEmojiTextareaFocus(that, e);

  },
  WxEmojiTextareaBlur: function (e) {
    var that = this;
    WxEmoji.WxEmojiTextareaBlur(that, e);
  },
  wxPreEmojiTap: function (e) {
    var that = this;
    WxEmoji.wxPreEmojiTap(that, e);
  },
  testBlur: function (e) {
    var temObjs = {};
    var that = this;
    temObjs.showWxEmojiChooseView = 1;
    temObjs.textAreaText = e.detail.value;
    console.log(temObjs);
    that.setData({
      WxEmojiObjs: temObjs
    });
  },
  //得到input里面的内容
  inputBlur: function (e){
   var that  = this;
    this.setData({
      content: e.detail.value,
      sendouthide:false,
      flaghide: !that.data.flaghide

    })
  },

  sendOut:function () {
    let text = wx.getStorageSync('text');//发送的信息
    let cookie = wx.getStorageSync('cookieKey');
    console.log('我来了');
    let that = this;
    wx.request({
      url:'http://www.meidaoshuo.com///sp/index.php/Home/Chat/pushChat/' , //仅为示例，并非真实的接口地址
      data: {
        chat_user_id: 2,//聊天的对象 
        news_text: '1',//聊天的内容 f5f68f40ef594935e52d6645b3f397ab
        news_type: 0,//发送类型
        is_read: 0,//是否已读
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Cookie': cookie,
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          conent: that.data.conent.concat(that.data.conent[0])
        }) 
      }
    })
  },

  //点击了推荐按钮
  recommendBtn: function(e) {
    wx.redirectTo({
      url: '/pages/pickOfTheWeek/pickOfTheWeek?recommend=true&uid=' + this.data.uid,
    })
  },

  //点击了红包按钮
  redPacketBtn: function (e) {
    wx.redirectTo({
      url: '/pages/pickOfTheWeek/pickOfTheWeek?flag=true&uid=' + this.data.uid,
    })
  },

});