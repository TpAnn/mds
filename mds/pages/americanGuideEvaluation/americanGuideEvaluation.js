// pages/evaluate/evaluate.js
var evaluateMd = 'http://www.meidaoshuo.com///sp/index.php/Home/Chat/evaluateMd/';//评价内容接口
var uploadImg ='http://www.meidaoshuo.com///sp/index.php/Home/My/uploadImg/';//图片上传
var uploadimgs = require('../../utils/uploadimg.js');

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avaluateImg1: "",
    titleTxt: "韩后茶蕊嫩白液",
    content: "110ml",
    imgs: [],
    upImg: '../../images/car.png',
    avaluateImg1: "../../images/hair.png",
    evaluate_contant: [
      {
        'text':'专业程度', 
        'ev1': '',

      },
      {
        'text':'服务态度',
        'ev1': '',
      }
    ],
   
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/noStar.png',
    selectedSrc: '../../images/star.png',
    halfSrc: '../../images/star.png',
    score: 0,
    scores: [0, 0, 0],
    upImg: '../../images/upimg.png',
    productImg2: '../../images/payment01.png',
    productImg1: '../../images/payment02.png',
    service_attitude:'',
    professional_degree:'',
    chatText:'',
    dIndex:0,
    pics:[],
    imgSr:'',
  },
  

  //点击左边,半颗星
  selectLeft: function (e) {
    var score = e.currentTarget.dataset.score
   
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = s;
      console.log(score);
    }

    this.data.scores[e.currentTarget.dataset.idx] = score;
      for(var i = 0; i < this.data.scores.length; i++) {
        
        console.log(this.data.scores[i]);
        if (this.data.scores[0] == 1){
            this.setData({
              ev1:'非常差',
            });
        } else if (this.data.scores[0] == 2){
          this.setData({
            ev1: '差',
          });
        } else if (this.data.scores[0] == 3){
            this.setData({
              ev1: '一般',
            });
        } else if (this.data.scores[0] == 4) {
          this.setData({
            ev1: '好',
          });
        } else if (this.data.scores[0] == 5) {
          this.setData({
            ev1: '非常好',
          });
        }
      this.setData({
        scores: this.data.scores,
        score: score,
        service_attitude: this.data.scores[0],//专业程度
        professional_degree: this.data.scores[1],//服务态度

      })
    }

  },
  onLoad: function(){
    var that = this;
    let types = wx.getStorageSync('types');//是否是美导
    let userNick = wx.getStorageSync('user_nick');//登录用户的昵称
    let headerPortraitUrl = wx.getStorageSync('headerPortraitUrl');//头像
    let personalitySignature = wx.setStorageSync('personalitySignature');//美导个性
    if (types == 1){
      that.setData({
        titleTxt: userNick,
        personalitySignature:personalitySignature,
        productImg1:headerPortraitUrl,
      });
    }
    

  },

  //点击右边,整颗星
  selectRight: function (e) {
    
    var score = e.currentTarget.dataset.score
    this.data.scores[e.currentTarget.dataset.idx] = score;
     for(var i=0; i<this.data.scores.length; i++){
      this.setData({
        scores: this.data.scores,
        score: score,
        service_attitude: this.data.scores[0],//专业程度
        professional_degree: this.data.scores[1],//服务态度

      })
     }
  },
  //图片上传
  upImg: function () {
    var that = this,
      pics = this.data.pics;
  
    let cookie = wx.getStorageSync('cookieKey');
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认6
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res);
        that.data.imgs.push(res.tempFilePaths);
        var imgsrc = res.tempFiles[0].path;
   
        pics = pics.concat(imgsrc);   
        if (that.data.imgs.length <= 6){
          that.setData({
            pics: pics,
            imgs: that.data.imgs
          }); 
        }else{
          console.log('图片不能超过六张！');
        }

       
      
      },
      fail: function () {
        console.log('fail');
      },
      complete: function () {
       console.log('complete');
      }
    })     
  },

  //点击删除
  deleImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  //
  bindTextAreaBlur: function (e) {
    var that = this;
    that.setData({
      chatText: e.detail.value,
    });
  },

  //确认发布
  bindConfirmation: function(e){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let mdID = wx.getStorageSync('mdID');//聊天美导ID
    let chatID = wx.getStorageSync('chatID');//聊天用户ID
    var service_attitude = that.data.service_attitude;//专业程度星星
    var professional_degree = that.data.professional_degree;//服务态度的星星
    var chatText = that.data.chatText;//聊天内容
    console.log(chatText);
    var imgs = that.data.imgs;//评价图片的数据 
    var pics = that.data.pics;//评价图片文件路径的数据
    var imgData = [];
    
    if (service_attitude == '' || service_attitude == 0) {
        wx.showLoading({
          title: '请选择专业程度!',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
    } else if (professional_degree == '' || professional_degree == 0) {
          wx.showLoading({
            title: '请选择服务态度!',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
    } else if (chatText == '') {
          wx.showLoading({
            title: '评价内容不能为空!',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
    } else {
        if (pics.length <= 6) {
          for (var i = 0; i < pics.length; i++) {
            console.log(pics[i]);
            wx.uploadFile({
              url: 'http://www.meidaoshuo.com///sp/index.php/Home/My/uploadImg/', //仅为示例，非真实的接口地址
              filePath: pics[i],
              name: 'file',
              header: {
                'content-type': 'multipart/form-data',
                "cookie": cookie,
              },
              formData: {
                'user': 'test'
              },
              success: function (res) {
                var data = res.data;
                imgData.push(data.slice(1,-1));
                // console.log(imgData);
                that.setData({
                  imgSr: imgData,
                });
                
              }
            })

          }
        } else {
          wx.showLoading({
            title: '不能超过六张图片！!',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000);
      }
      console.log(that.data.imgSr);
      //向后台传数据
      wx.request({
        url: evaluateMd,
        data: {
          american_guide_id: mdID,
          service_attitude: service_attitude,
          professional_degree: professional_degree,
          evaluate_user_id: 2,
          evaluate_content: chatText,
          files: imgs,
          // evaluate_img_url1:
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Cookie': cookie,
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
        },
        fail: function (res) { },
        complete: function (res) { },
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