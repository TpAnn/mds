var selectOrder = 'http://www.meidaoshuo.com///sp/index.php/Home/My/selectOrder';//根据状态查询订单详情
var cencelOrder = 'http://www.meidaoshuo.com///sp/index.php/Home/HomeCarousel/cencelOrder/';//取消订单
var get_sn = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    currentTab: 0,
    danghao:"",
    count:2,
    total:489,
    cancel:"取消订单",
    remind:"提醒发货",
    immediately:"立即付款",
    pendingPayment:"待付款",
    pendingDelivery:"待发货",
    GoodsTobeReceived:"待收货",
    receipt:"确认收货",
    lookLogistics:"查看物流",
    toBeEvaluated:"待评价",
    completed:"已完成",
    conentList: [],
    order_id:0,
    navList: [
      {
        selectTxt:'待付款',
        select:0
      },{
        selectTxt: '待发货',
        select: 1
      }, {
        selectTxt: '待收货',
        select: 2
      }, {
        selectTxt: '待评价',
        select: 3
      }, {
        selectTxt: '已完成',
        select: 4
      }
    ],
   
  },
 
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    let memberName = wx.getStorageSync('memberName');//会员名
    var id = options.id;//当前页面ID
    let cookie = wx.getStorageSync('cookieKey');//cookie
    //生成随机的订单号
    function pad2(n) { return n < 10 ? '0' + n : n }
    function generateTimeReqestNumber() {
        var date = new Date();
        return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes());
    }
    var rand = Math.floor(Math.random() * 900) + 100;
    var order_id = generateTimeReqestNumber() + rand + id;
    console.log(order_id);
   that.setData({
     currentTab: id,
     danghao: order_id,
   });
   //请求订单内容
   wx.request({
     url: selectOrder,
     data: {
        order_state: id
     },
     header: {
       'content-type': 'application/json',
       'Cookie': cookie,
     },
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
     success: function(res) {
       var conentList = res.data.data;
       var count = 0;//商品条数
       var totalPrice = 0;//商品总价是
       var totalMoney = 0;//商品总价
       var order_id  = 0;//商品ID

       if (conentList != null && conentList != ''){
            var orderCommodityArray = [];
            console.log(conentList);
            for (var i = 0; i < conentList.length; i++) {
              conentList[i].orderCommodityArray;
              orderCommodityArray.push(conentList[i].orderCommodityArray);
            }
            for (var k = 0; k < orderCommodityArray.length; k++) {
                count = orderCommodityArray[k].length;
                for (var j = 0; j < orderCommodityArray[k].length; j++ ){

                      //判断是否是会员 如果是会员的话 按价计算合计
                      if (memberName != '' && memberName != null) 
                      {
                            totalPrice += orderCommodityArray[k][j].membership_price * orderCommodityArray[k][j].quantity_number;//会员优惠价 
                      }else{
                            totalPrice += orderCommodityArray[k][j].selling_price * orderCommodityArray[k][j].quantity_number;//普通总价
                      }  
                      order_id = orderCommodityArray[k][j].order_id;
                      //判断如果大于99包邮，如果小于不包邮减去10元的运费 合计
                      if (totalPrice > 99) 
                      {
                          totalMoney = totalPrice;
                      } else {
                          totalMoney = totalPrice - 10;
                      }
                }
              //重新赋值    
              that.setData({
                conentList: orderCommodityArray[k],
                count: count,
                totalMoney: totalMoney,
                order_id: order_id
                
              });
         } 
       }else{
            console.log('没有内容');
            that.setData({
              conentList: []
            });
       }

      
     },
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  //取消订单
  cancellationOfOrder: function (e){
      let cookie = wx.getStorageSync('cookieKey');
      var that = this;
      var order_id =that.data.order_id;
      wx.request({
        url: cencelOrder,
        data: {
          order_id: order_id,
        },
        header: {
          'content-type': 'application/json',
          'Cookie': cookie,
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
            if(res.data.status == 200){
                that.setData({
                  conentList: []
                });
              };
        },
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  //查看物流
  bindLook: function()　{
      wx.navigateTo({
        url: "/pages/lookLogistics/lookLogistics",
      })
  },
  //立即付款 当他失败的时候跳转的链接
  bindImmdeiately: function () {
      wx.navigateTo({
        url: "/pages/immediatePayment/immediatePayment",
      })
  },
  //评价
  bindevaluate:function(){
      wx.navigateTo({
        url: "/pages/evaluate/evaluate",
      })
  },
  //滑动切换
  swiperTab: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current
      });
  },
  //点击切换
  clickTab: function (e) {
    let cookie = wx.getStorageSync('cookieKey');
    var that = this; 
    if (this.data.currentTab === e.target.dataset.select) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      var current = e.target.dataset.current;
      wx.request({
        url: selectOrder,
        data: {
          order_state: current
        },
        header: {
          'content-type': 'application/json',
          'Cookie': cookie,
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          var conentList = res.data.data;
          var orderCommodityArray = [];
          if (conentList != null && conentList != '') 
          {
              for (var i = 0; i < conentList.length; i++) {
                conentList[i].orderCommodityArray;
                orderCommodityArray.push(conentList[i].orderCommodityArray);
              }
              for (var k = 0; k < orderCommodityArray.length; k++) {
                that.setData({
                  conentList: orderCommodityArray[k]
                });
              }
          }else{
            console.log('没有内容');
            that.setData({
              conentList: []
            });
          }

        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  //进详情
  bindDetails: function (){
    wx.navigateTo({
      //url: '/pages/detailsOfTheOrder/detailsOfTheOrder',
    })
  },
})