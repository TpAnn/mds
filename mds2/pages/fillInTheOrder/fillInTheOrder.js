
var fillInTheOrder = 'http://www.meidaoshuo.com///sp/index.php/Home/HomeCarousel/fillInTheOrder';//填写订单接口
var createOrder = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/createOrder/'//创建订单接口
let cookie = wx.getStorageSync('cookieKey');
let carts = wx.getStorageSync('carts'); 
let trueConten = wx.getStorageSync('trueConten');
Page({
  data: {
    isAllSelect: false,
    // receiving_name: '',
    city: '',
    provinces:'',
    county:'',
    address_detail:'',
    contact_number: '',
    // 商品详情介绍
    carts: [],
    freight: '包邮',
    totalPrice: 0,//商品总价
    realpayment: 0,//商品实付
    member: '',
    redEnvelopesInfo: '',
    commodityPayment:'',
    totalMoney:'',
    flag:true,
    ra_id:'',
    latitude:'',
    longitude:'',

  },
  onLoad: function(e){
    var that = this;
    var conent = wx.getStorageSync('conent', conent);//订单中的商品信息数组
    console.log(conent);
    var datas = "";
    for (var i = 0; i < conent.length; i++ ){
     // var datas = trueConten[i] ;
      datas += conent[i] + "|" ;   
    }
    console.log(datas);
    var i = datas.length;
    console.log(i);
    datas = datas.substr(0, i - 1);
    console.log(datas);

    //获取径伟度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude
        });
      }
    })


    //填写订单接口   
    wx.request({
      url: fillInTheOrder ,
      data: { commodityInfoArray: datas},
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Cookie': cookie,
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        //商品信息
        var orderCommodityArray = res.data.data.orderCommodityArray
        console.log(orderCommodityArray);

        //地址的信息 
        var receiving_address = res.data.data.receiving_address;
        // var commodity_name = receiving_address.receiving_name;//地址人名
        var city = receiving_address.city;//省
        var provinces = receiving_address.provinces;//市
        var county = receiving_address.county; //区
        var address_detail = receiving_address.address_detail;//号
        var user_id = receiving_address.user_id;//用户id
        var ra_id = receiving_address.ra_id;
        var contact_number = receiving_address.contact_number;
      
        var redEnvelopesInfo = that.data.redEnvelopesInfo;
        var realpayment = that.data.realpayment;//
     
       
        //计算总价
        var totalPrice = 0;
        var member = 0 ;
        var totalMoney = 0;
        
       
        for (var i = 0; i < orderCommodityArray.length; i++){
          console.log(orderCommodityArray[i]);
          //商品总价
          console.log(orderCommodityArray[i].commodity_join_number);
          totalPrice += totalPrice + orderCommodityArray[i].selling_price * orderCommodityArray[i].quantity_number; 
          //如果红包是null先转为0
          if (orderCommodityArray[i].redEnvelopesInfo == null){
            orderCommodityArray[i].redEnvelopesInfo= 0 ; 
              redEnvelopesInfo = orderCommodityArray[i].redEnvelopesInfo;
          }else{
            redEnvelopesInfo = orderCommodityArray[i].redEnvelopesInfo;
          }
        
          //首先判断是否是会员如果是会员，则计算会员价格，如果不是，会员优惠是0   
          if (res.data.data.memberInfo != null && res.data.data.memberInfo != '') {
            var selling = orderCommodityArray[i].selling_price * orderCommodityArray[i].quantity_number;//所有商品的销售价总数 
            var membership = orderCommodityArray[i].membership_price * orderCommodityArray[i].commodity_join_number;//所有商品的会员价总数 
              member = selling - membership; //算法：所有商品的销售价总数 - 所有商品的销售价总数 = 优惠了多少的价格    
          } else {
               member = 0;
          }
          //商品实付
          var commodityPayment = totalPrice - member - redEnvelopesInfo;
          //判断如果大于99包邮，如果小于不包邮减去10元的运费
          if (totalPrice > 99) {
            totalMoney = commodityPayment;
          } else {
            totalMoney = commodityPayment - 10;
          }
        }
        that.setData({
          carts: orderCommodityArray,
          // receiving_name: receiving_name,
          city: city,
          provinces: provinces,
          county: county,
          address_detail: address_detail,
          contact_number: contact_number,
          totalPrice: totalPrice,//商品总价
          redEnvelopesInfo: redEnvelopesInfo,//红包额数
          member: member,//优惠价
          commodityPayment: commodityPayment,//商品实付
          totalMoney: totalMoney,//合计
          ra_id: ra_id,
        });

      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    })
  },
  //点击进入详情页
  bindxq: function () {
    wx.navigateTo({
      url: '/pages/addreAdministration/addreAdministration',

    })
  },
  
  // 去结算
  toBuy(e) {
  var that = this;
  var ra_id = that.data.ra_id;//收货地址ID
  //way_of_receiving 收货方式 0为默认物流1:店内自取
  //commodityInfoArray  订单中的商品信息数组
  var conent = wx.getStorageSync('conent', conent);//订单中的商品信息数组
  console.log(conent);
  var datas = "";

  for (var i = 0; i < conent.length; i++) {
    // var data = conent[i];
    datas = '"' + conent[i] + "|" + conent[1] + '"';
  }
  console.log(datas); 
      var that = this;
      var ra_id = that.data.ra_id;
      var longitude = that.data.longitude;
      var latitude = that.data.latitude;
      var trueConten = wx.getStorageSync('trueConten', trueConten);//订单中的商品信息数组
      console.log(trueConten);
      var datas = "";
      for (var i = 0; i < trueConten.length; i++) {
        var data = trueConten[i];
        datas = trueConten[0] + "|" + trueConten[1];
      }
      wx.request({
        url: createOrder,
        data: {
          ra_id: ra_id,
          way_of_receiving: 1,
          latitude: latitude,
          longitude: longitude,
          commodityInfoArray: datas,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Cookie': cookie,
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.status == 200){
             wx.navigateTo({
              url: '/pages/FillInTheOrder/FillInTheOrder',
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
   
  },
  //是否店内自取
  switchSelect: function (e) {
    
  }
});





