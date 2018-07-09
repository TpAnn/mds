var getChatTemp = 'http://www.meidaoshuo.com/sp/index.php/Chat/getChatTemp';
//做时间限制
var timestamp = Date.parse(new Date());
var expiration = timestamp + 3000000;
//cookie


Page({

  data: {
    content:[ ],
    mnuberhide:true,
    righthide:true,

  },
  onLoad: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');//cookie
    let index_data = wx.getStorageInfoSync('index_data');
    let index_data_expiration = wx.getStorageInfoSync('index_data_expiration');
    let content = wx.getStorageSync('content');
    let userId = wx.getStorageSync('userId');//登录用户Id
    console.log(cookie);
    //获取所有聊天信息
    if (userId == '' || userId == 'null') {
        wx.navigateTo({
          url: '/pages/logs/logs'
        })
    } else {
      wx.request({
        url: getChatTemp,
        data: {
        },
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Cookie': cookie,
        },
        success: function (res) {
          console.log(res);
          var content = res.data.data;
          for(var i=0; i<content.length; i++){
            //判断如果unread_message 没有未读的信息 则未读信息不显示
            if (content[i].unread_message != 0){
              that.setData({
                mnuberhide: false,
                righthide: false,
              });
            }
          }
          that.setData({
            content: content,
          });
          }
      })
    }
  },
  //进入详情
  bindDateil: function (e) {
    var dataId = e.currentTarget.dataset.id;
    var headerT = {};
    headerT.header = e.currentTarget.dataset.index;
    headerT.types = e.currentTarget.dataset.type;
    wx.setStorageSync('headerT', headerT);

    wx.navigateTo({
      url: '/pages/chatDetails/chatDetails?id=' + dataId  ,
    })
  },
 //头部进详情
 bindDetails: function (e) {
  
    // wx.navigateTo({
    //   // url: '/pages/chatDetails/chatDetails',
    // })
 },
  

  // 提交事件
  submit_evaluate: function () {
    console.log('评价得分' + this.data.scores)
  },

  //点击左边,半颗星
  selectLeft: function (e) {
    var score = e.currentTarget.dataset.score
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0;
    }

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  },

  //点击右边,整颗星
  selectRight: function (e) {
    var score = e.currentTarget.dataset.score

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })
  }
})