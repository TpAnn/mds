var app = getApp();
var cookie = wx.getStorageSync('cookie');
var indexCommodityDetail =  'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCommodityDetail';//商品详情
var cartOperation = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/cartOperation'//加入购物车
var collectionCommodity = 'http://www.meidaoshuo.com///sp/index.php/Home/HomeCarousel/collectionCommodity';//收藏商品
Page({
  data: {
    imgUrls: [], 
    latitude: '',
    longitude: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: [],
    skinInfo:[],
    shopName:'',
    company_monologue:'',
    selling_price:'',
    membership_price:'',
    quantity_sold:'',
    shopId:'',
    effectInfo:[], 
  },
  onLoad: function (options) {
    var that = this;
    var shopId = options.shopId; //商品id
    wx.request({
      url: indexCommodityDetail, //仅为示例，并非真实的接口地址
      data: {
        commodity_id: shopId,
      },
      methd:'GET',
      header: {
        'content-type': 'application/json' // 默认值

      },
      success: function (res) {
        console.log(res);
        var content = res.data.data;

        var name = res.data.data.commodity_name;//商品名
        var effectInfo = res.data.data.effectInfo;//商品工效
        var skinInfo = res.data.data.skinInfo;//工效

        var company_monologue = res.data.data.company_monologue//商品描述
        var selling_price = res.data.data.selling_price;//销售价
        var membership_price = res.data.data.membership_price;//会员价
        var quantity_sold = res.data.data.quantity_sold + 1000;//已售价
        var company_spec = res.data.data.company_spec;//规格

        //轮播图片来一波
        var imgUrls = [];
        imgUrls[0] = res.data.data.company_img_url1;
        imgUrls[1] = res.data.data.company_img_url1;
        imgUrls[2] = res.data.data.company_img_url1;
        imgUrls[3] = res.data.data.company_img_url1;
        imgUrls[4] = res.data.data.company_img_url1;

        console.log(imgUrls);

        that.setData({
          imgUrls: imgUrls,
          shopName: name,
          effectInfo: effectInfo,
          skinInfo: skinInfo,
          company_monologue: company_monologue,
          selling_price: selling_price,
          membership_price: membership_price,
          quantity_sold: quantity_sold,
          company_spec: company_spec,
          shopId: shopId,
          company_monologue: company_monologue,


        });
      }
    })
  
  },
  //加入购物车
  joinCarts: function(e){
    
    var that = this;
    var id = that.data.shopId;//商品ID
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude);
        that.setData({
          latitude: latitude,
          longitude: longitude,
        });
        
        wx.request({
          url: cartOperation,
          data: {
            commodity_id:id,
            function_state:1,
            latitude: latitude,
            longitude: longitude,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            if (res.data.status == 200){
                wx.showToast({
                  title: '成功加入购物车',
                  icon: 'success',
                  duration: 2000
                })
              }
          },
          fail: function (res) {

          },
          complete: function (res) {

          },
        })
      }
    })
  },
  //收藏美导
  joinCollection: function (e){
    var that = this;
    console.log(cookie);
     var id = that.data.shopId;//商品ID
      wx.request({
        url: collectionCommodity ,
        data: {
          collection_type:0,
          collection_id: id,
        },
        header: {
          'content-type': 'application/json', // 默认值
           'Cookie': cookie,
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          if (res.data.status == 200){
            wx.showToast({
              title: '成功收藏商品',
              icon: 'success',
              duration: 2000
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  onShareAppMessage: function (res) {
    var id = this.data.shopId;//商品ID
    return {
      title: '自定义转发标题',
      path: 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCommodityDetail?commodity_id=' + id,
      imageUrl:'',
      success (e) {
        wx.showShareMenu({
          withShareTicket:true
        });
      }
    }
  },
  //复制链接
  default: function (e) {
    var that  = this;
    var id = that.data.shopId;//商品ID
    console.log(66);
      return {
        title: '自定义转发标题',
        path: 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCommodityDetail?commodity_id=' + id,
        imageUrl: '',
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          });
        }
      }
    // wx.setClipboardData({
    //   data: 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/indexCommodityDetail?commodity_id='+id,
    //   success: function (res) {
    //     wx.getClipboardData({
    //       success: function (res) {
    //         console.log(res.data) // data
    //       }
    //     })
    //   }
    // })
  },
 
})  