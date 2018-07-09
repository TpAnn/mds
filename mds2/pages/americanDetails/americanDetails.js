var time = require('../../utils/util.js');
var app = getApp();
var selectMdDetail = 'http://www.meidaoshuo.com/sp/index.php/User/selectMdDetail?id=';
Page({
  data: {
    imgUrls: [],
    evaluatArray:[],
    evaluatArrayNumberArray:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    realname:'',
    mdname:'',
    personalitySignature:'',
    category_name:'',
    categoryState:'',
    americanImg1:'',
    americanImg2:'',
    americanImg3:'',
    shopContnetnum: '',
    testFlag:[false],
    banner1:'',
    banner2: '',
    banner3: '',
  },
  
  onLoad: function(options){
    var that = this;
    var id = options.id;
    wx.request({
      url: selectMdDetail + 2,
      data: {},
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        //美导级别
        var realname = res.data.data.user_realname; 
        //美导昵称
        var mdname = res.data.data.user_nick;
        //美导寄语
        var personalitySignature = res.data.data.personalitySignature;
        //美导评分
        var category_name = res.data.data.category_name;
        //
        var category_state = res.data.data.category_state;
      

        //商品图片
        var imgUrls= [];
        imgUrls[0] = res.data.data.shop_img_url1;
        imgUrls[1] = res.data.data.shop_img_url2;
        imgUrls[2] = res.data.data.shop_img_url3;
        imgUrls[3] = res.data.data.shop_img_url4;
        imgUrls[4] = res.data.data.shop_img_url5;

        //商品内容数量
        var shopContnetnum = res.data.data.shop_accommodate_num;
        
        //评论内容
        var evaluatArray = res.data.data.evaluatArray;
     
        //评论状态
        var evaluatArrayNumberArray = res.data.data.evaluatArrayNumberArray;
          evaluatArrayNumberArray =evaluatArrayNumberArray.reverse();//从大到小排序
          

      
        var tiems = res.data.data.login_time;

        //循环转时间戳
        for (var i = 0; i < evaluatArray.length; i++){
          var tiemData = time.formatTime(evaluatArray[i].evaluate_time, 'Y/M/D');//时间戳 
          evaluatArray[i].evaluate_time = tiemData;
        }


        var starsUrls = ['../../images/star.png','../../images/noStar.png'];
        for (var l = 5; l < starsUrls.length; l++){
          console.log(starsUrls[i])
        }



        that.setData({
          realname: realname,
          mdname: mdname,
          imgUrls: imgUrls,//图片
          category_name: category_name,
          personalitySignature: personalitySignature,
          category_name: category_name,
          categoryState: category_state,
          shopContnetnum: shopContnetnum,
          evaluatArray: evaluatArray,
          evaluatArrayNumberArray: evaluatArrayNumberArray, 
        });
      }
    });
  }
});