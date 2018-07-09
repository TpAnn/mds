const app = getApp();
var time = require('../../utils/util.js');
const WxEmoji = require('../../WxEmojiView/WxEmojiView.js');
var getChatText = 'http://www.meidaoshuo.com/sp/index.php/Chat/getChatText';
var temTextArea;
//做时间限制
var timestamp = Date.parse(new Date());
var expiration = timestamp + 3000000;

Page({
  data: {
    conent: [],      // 聊天记录
    headerImg:'',
    flaghide:true,
    focus:true,
    sendouthide:true,
    content:'',
    listHide:true,
    datas:[],
    scrollTop: 100,
    text:'',
  },
  
  onLoad: function (e) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let userId = wx.getStorageSync('userId');//用户ID
    let headerT = wx.getStorageSync('headerT');//用户头像

    console.log(that.data.text);
   
    that.setData({
      headerImg:headerT.header
    });

    //表情包加载
    WxEmoji.bindThis(this);
    var id = e.id;//聊天列表用户ID 
    console.log(WxEmoji);
    //判断是否是美导
    if (headerT.types == 1 ){
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
        console.log(res.data);
        var conent = res.data.data;  
        
        wx.setStorageSync('textConent', conent);   

        that.setData({
          conent: conent
        });
      }
    })
  },
  //显示工能模块
  bindshow: function (e){
    var that = this;
      that.setData({
        flaghide: !that.data.flaghide
      });
  },

  bindTextAreaBlur: function (e) {
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
  // testBlur: function (e) {
  //   console.log(6666);
  //   var temObjs = {};
  //   var that = this;
  //   temObjs.showWxEmojiChooseView = 1;
  //   temObjs.textAreaText = e.detail.value;
  //   that.setData({
  //     WxEmojiObjs: temObjs
  //   });
  // },
  //得到input里面的内容
  inputBlur: function (e){
    console.log(66);
   var that  = this;
    this.setData({
      content: e.detail.value,
      sendouthide:false,
      flaghide: !that.data.flaghide
    })
  },

  //信息发送
  sendOut:function () {
    var that = this;
    let text = wx.getStorageSync('text');//发送的信息
    let cookie = wx.getStorageSync('cookieKey');
    let userId = wx.getStorageSync('userId');//用户ID
   
    wx.request({
      url:'http://www.meidaoshuo.com///sp/index.php/Home/Chat/pushChat/' , //仅为示例，并非真实的接口地址
      data: {
        chat_user_id: 2,//聊天的对象 
        news_text: text,//聊天的内容 f5f68f40ef594935e52d6645b3f397ab
        news_type: 0,//发送类型
        is_read: 0,//是否已读
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Cookie': cookie,
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 200){
          console.log(2000);
          wx.showLoading({
            title: '评价成功！',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          // wx.navigateTo({
          //   url:'pages/chatDetails/chatDetails',
          // });
        }
      }
    })
  },
  onShow:function(e){
    // console.log(e);
    // var that = this;
    // let userId = wx.getStorageSync('userId');//用户ID
    // var textConent = wx.getStorageSync('textConent');
    // for (var i = 0; i < textConent.length; i++) {
    //   if (textConent[i].user_id == userId) {
    //     console.log(textConent[i]);
    //     textConent[i].showType = 0;
    //     that.setData({
    //       conent: textConent,
    //     });
    //   } else {
    //     var left = textConent[i];
    //     textConent[i].showType = 1;
    //     that.setData({
    //       conent: textConent,
    //     });
    //   }
    // }
  },
  //评价
  bindEvaluation: function(){
    wx.navigateTo({
      url: '/pages/americanGuideEvaluation/americanGuideEvaluation',
        
      })
  },
  //预约
  makeAnAppointment: function(){
    wx.navigateTo({
      url: '/pages/makeAnAppointment/makeAnAppointment',
    })
  }

  


  
});