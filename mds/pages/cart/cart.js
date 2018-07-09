var app = getApp();
var checkLogin = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/checkLogin';//判断是否已登录
var checkPassword = 'http://www.meidaoshuo.com/sp/index.php/User/checkPassword';
var cartCommodityDetail = 'http://www.meidaoshuo.com/sp/index.php/HomeCarousel/cartCommodityDetail'; //获取商品所有商品

//cookie

let memberName = wx.getStorageSync('memberName');//用户会员
let user_phone = wx.getStorageSync('user_phone');//用户电话
let user_nick = wx.getStorageSync('user_nick');//用户昵称
let user_realname = wx.getStorageSync('user_realname');//用户名字


let header = {};
Page({
  data: {
    isAllSelect: false,
    totalMoney: 0,
    realpayment: 0,//商品实付
    // 商品详情介绍
    carts: [],
    freight: '包邮',
    totalPrice: 0,//商品总价
    commodityPayment:0,//商品总价
    member:'',
    redEnvelopes:0,
    openmemberHide:false,
    memberpriceText:'',
    memberpriceHide:false,
    back:'xxx',
    backHide:false,
    PromotionHide:true,
    promotion:0,
    userId:'',
    cookie:'',
  },

  //页面加载
  onLoad : function (e){
      var that = this;
      let userId = wx.getStorageSync('userId');//用户Id
      let cookie = wx.getStorageSync('cookieKey');//headers.cookie
      if (userId == '' && userId == 'null'){
        wx.navigateTo({
            url: '/pages/logs/logs',
        }) 
      }else{
          //获取所有商品信息
          wx.request({
              url: cartCommodityDetail,
              data: {},
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': cookie,
              },
              success: function (res) { 
               
                //是否是会员
                var memberInfo = res.data.data.memberInfo;
                //商品数据
                var carts = res.data.data.commodityArray;
                console.log(carts);
                that.setData({
                  carts: carts,
                  userId: userId,
                  cookie: cookie
                });
                if (res.data.status == 403){
                  wx.navigateTo({
                    url: '/pages/logs/logs',
                  }) 
                }
                if (memberInfo != null){
                  that.setData({
                    memberpriceText: memberInfo,
                  });
                }else{
                  
                  that.setData({
                    freight:'满99包邮',
                    member:0,
                    
                  });
                }
              }
            })
        } 
  },
  
  //加法
  bindAdd: function (e){
    var that = this;
    //得到下标
    var index = e.currentTarget.dataset.index;
   //获取商品数据
    var carts = this.data.carts;
    var totalPrice = 0;//商品总价是
    var commodityPayment = 0;//商品实付
    var totalMoney = 0;//商品总价
    var member = 0; //会员优惠
    let num = carts[index].commodity_join_number;
    if(num < 99){
      num ++;
    }
    carts[index].commodity_join_number = num;
    if (this.data.carts[index].isSelect){
      for (var i = 0; i < carts.length; i++) {
        //价钱统计
        if (this.data.carts[i].isSelect) {
          //价钱*数量 =商品总价     
          totalPrice += totalPrice + this.data.carts[i].selling_price * this.data.carts[i].commodity_join_number;

          //会员优惠
          // //首先判断是否是会员如果是会员，则计算会员价格，如果不是，会员优惠是0   
          if (this.data.memberpriceText != null && this.data.memberpriceText != '') {
            var selling = carts[i].selling_price * carts[i].commodity_join_number;//所有商品的销售价总数 
            var membership = carts[i].membership_price * carts[i].commodity_join_number;//所有商品的会员价总数 
            member = selling - membership; //算法：所有商品的销售价总数 - 所有商品的销售价总数 = 优惠了多少的价格    
          } else {
            member = 0;
          }
          //商品实付
          var commodityPayment = totalPrice - member - this.data.promotion;

          //判断如果大于99包邮，如果小于不包邮减去10元的运费
          if (totalPrice > 99) {
            totalMoney = commodityPayment;

          } else {
            totalMoney = commodityPayment - 10;
          }

        }
      }
    } 
  
    this.setData({
      carts:carts,
      totalPrice: totalPrice,
      commodityPayment: commodityPayment,
      member: member,
      totalMoney: totalMoney
    }); 
  },

  //减法
  bindReduce: function (e) {
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var carts = this.data.carts;
    var totalPrice = 0;//商品总价是
    var commodityPayment = 0;//商品实付
    var totalMoney = 0;//商品总价
    var member = 0; //会员优惠
    let num = carts[index].commodity_join_number;
    if (num  > 0) {
      num--
    }
    //计算总金额
    carts[index].commodity_join_number = num;
    if (this.data.carts[index].isSelect) {
      for (var i = 0; i < carts.length; i++) {
        //价钱统计
        if (this.data.carts[i].isSelect) {
          //价钱*数量 =商品总价     
          totalPrice += totalPrice + this.data.carts[i].selling_price * this.data.carts[i].commodity_join_number;

          //会员优惠
          // //首先判断是否是会员如果是会员，则计算会员价格，如果不是，会员优惠是0   
          if (this.data.memberpriceText != null && this.data.memberpriceText != '') {
            var selling = carts[i].selling_price * carts[i].commodity_join_number;//所有商品的销售价总数 
            var membership = carts[i].membership_price * carts[i].commodity_join_number;//所有商品的会员价总数 
            member = selling - membership; //算法：所有商品的销售价总数 - 所有商品的销售价总数 = 优惠了多少的价格    
          } else {
            member = 0;
          }
          //商品实付
          var commodityPayment = totalPrice - member - this.data.promotion;

          //判断如果大于99包邮，如果小于不包邮减去10元的运费
          if (totalPrice > 99) {
            totalMoney = commodityPayment;

          } else {
            totalMoney = commodityPayment - 10;
          }

        }

      }
    } 
    this.setData({
       carts:carts,
      totalPrice: totalPrice,
      commodityPayment: commodityPayment,
      member: member,
      totalMoney: totalMoney
    });
  },


  switchSelect: function (e) {
    var Allprice = 0, i = 0;
    var carts = this.data.carts;//得到商品数据

    let id = e.target.dataset.id,
    index = parseInt(e.currentTarget.dataset.index);//当前的ID
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;  
    
    var totalPrice =0;//商品总价是
    var commodityPayment = 0;//商品实付
    var totalMoney = 0;//商品总价
    var member = 0; //会员优惠

    console.log(this.data.carts[index].isSelect);
    for(var i = 0; i<carts.length; i++){
      //价钱统计
      if (this.data.carts[i].isSelect) {
        //价钱*数量 =商品总价     
        totalPrice += totalPrice + this.data.carts[i].selling_price * this.data.carts[i].commodity_join_number;  
        
        //会员优惠
        // //首先判断是否是会员如果是会员，则计算会员价格，如果不是，会员优惠是0   
        if (this.data.memberpriceText != null && this.data.memberpriceText != '') {
          var selling = carts[i].selling_price * carts[i].commodity_join_number;//所有商品的销售价总数 
          var membership = carts[i].membership_price * carts[i].commodity_join_number;//所有商品的会员价总数 
          member = selling - membership; //算法：所有商品的销售价总数 - 所有商品的销售价总数 = 优惠了多少的价格    
        } else {
          member = 0;
        }
        //商品实付
        var commodityPayment = totalPrice - member - this.data.promotion;

        //判断如果大于99包邮，如果小于不包邮减去10元的运费
        if (totalPrice > 99) {
         totalMoney = commodityPayment;
        
        } else {
          totalMoney = commodityPayment - 10;
        }
       
      }
     
    }

   
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price;
    }
    if (Allprice == totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: this.data.isAllSelect,
      commodityPayment: commodityPayment,
      totalPrice: totalPrice,
      member: member,
      totalMoney: totalMoney,
    })
  },

  //勾选事件处理函数  
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0; 
    var totalPrice = 0;//商品总价是
    var commodityPayment = 0;//商品实付
    var totalMoney = 0;//商品总价
    var member = 0; //会员优惠

    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        totalPrice += totalPrice + this.data.carts[i].selling_price * this.data.carts[i].commodity_join_number;

        //会员优惠
        // //首先判断是否是会员如果是会员，则计算会员价格，如果不是，会员优惠是0   
        if (this.data.memberpriceText != null && this.data.memberpriceText != '') {
          var selling = carts[i].selling_price * carts[i].commodity_join_number;//所有商品的销售价总数 
          var membership = carts[i].membership_price * carts[i].commodity_join_number;//所有商品的会员价总数 
          member = selling - membership; //算法：所有商品的销售价总数 - 所有商品的销售价总数 = 优惠了多少的价格    
        } else {
          member = 0;
        }
        //商品实付
        var commodityPayment = totalPrice - member - this.data.promotion;

        //判断如果大于99包邮，如果小于不包邮减去10元的运费
        if (totalPrice > 99) {
          totalMoney = commodityPayment;

        } else {
          totalMoney = commodityPayment - 10;
        }
        
      }
     
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      totalPrice =0;
      totalMoney  = 0;
    }
  
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: totalMoney,
      totalPrice: totalPrice,
      commodityPayment:commodityPayment,
     

    })
  },
  // 去结算
  toBuy(e) {
    var that = this;
    var trueConten = [];
    var dat = '';
    var conent = [];
    for (var i = 0; i < that.data.carts.length; i++){
        if (!that.data.carts[i].isSelect) {
          console.log(that.data.isAllSelect);
          }else{  
              var ci_id = that.data.carts[i].ci_id;//商品id
              console.log(ci_id);
              var commodity_join_number = that.data.carts[i].commodity_join_number; //商品数量    
              dat = that.data.carts[i].ci_id + ","+that.data.carts[i].commodity_join_number +","+2; 
              trueConten[i] = dat ;
              conent = trueConten[i];
             
              wx.setStorageSync('trueConten', trueConten[i]);//把用户信息诸存
              wx.navigateTo({
                url: '/pages/FillInTheOrder/FillInTheOrder',
              });
          }
      }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    let userId = wx.getStorageSync('userId');//用户Id
    let cookie = wx.getStorageSync('cookieKey');//headers.cookie
    if (userId == '' && userId == 'null') {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    } else {
      //获取所有商品信息
      wx.request({
        url: cartCommodityDetail,
        data: {},
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Cookie': cookie,
        },
        success: function (res) {
          console.log(res);
          //是否是会员
          var memberInfo = res.data.data.memberInfo;
          //商品数据
          var carts = res.data.data.commodityArray;
          that.setData({
            carts: carts,
          });
          if (res.data.status == 403) {
            wx.navigateTo({
              url: '/pages/logs/logs',
            })
          }
          if (memberInfo != null) {
            that.setData({
              memberpriceText: memberInfo,
            });
          } else {

            that.setData({
              freight: '满99包邮',
              member: 0,

            });
          }
        }
      })
    } 
  }

});