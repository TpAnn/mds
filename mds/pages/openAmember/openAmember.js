var MD5 = require('../../utils/MD5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect:true,
    money: 9.9,
    curr: 0,
    showDialogFlag: true,
    showNumFlag: 0,
    hasVipFlag: false,
    info: null,
    nickName: '',
    level: ['白银会员开通','黄金会员开通','钻石会员开通']
  },
  //选中
  switchSelect: function (e) {
    this.setData({
      isSelect: !this.data.isSelect
    });
  },
  //开通会员 
  openMemberBtn: function(e) {
    let curr = e.currentTarget.dataset.index,
      price = e.currentTarget.dataset.price;

      if(this.data.curr == curr){
        return;
      }

      this.setData({
        curr: curr,
        money: price
      })
  },

  showDialog: function(e) {
    let num = e.currentTarget.dataset.num;

    this.setData({
      showNumFlag: num,
      showDialogFlag: false
    })
  },

  closeBtn: function(e) {
    this.setData({
      showDialogFlag: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/My/myIntegral/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        let nickName = wx.getStorageSync('userData').user_nick == '' ?
                      + 'tell:' 
                      + wx.getStorageSync('userData').user_phone.substr(0, 3)
                      +'****' 
                      + wx.getStorageSync('userData').user_phone.substr(8) :
                      wx.getStorageSync('userData').user_nick
        if (res.data.data.memberName == '资深买家') {
          this.setData({
            info: res.data.data,
            nickName: nickName
          })
        }else{
          this.setData({
            info: res.data.data,
            hasVipFlag: true,
            nickName: nickName
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  
  sendBtn: function(e) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/My/getOrderNumber/',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        consumption_type: 3,
      },
      success: res => {
        let id = res.data.data;

        if (res.data.status == 200) {

          let timeStamp = new Date().getTime().toString(); //时间戳
          let appid = 'wxb4397ddf2fdb7e2d';//appid
          let body = '美导说' + this.data.level[this.data.curr] ;//商户名  
          let mch_id = '1503745351';//商户号
          let nonce_str = this.nonceStrFnc(10, 32);  //10位随机码
          let notify_url = 'http://www.meidaoshuo.com/'; //回调地址  
          let spbill_create_ip = '47.106.110.255';//ip地址
          let total_fee = this.data.money*100; //支付金额,必须是整数并且单位是分
          let trade_type = "JSAPI"; //支付类型
          let key = 'FIOEvJjbSzt6zylt8D1PLerwj4yUXmEC'; //支付密钥
          let openid = getApp().globalData.openId; //openId
          let out_trade_no = id; //订单号
          let unifiedPayment =
              "appid=" + appid +
              "&body=" + body +
              "&mch_id=" + mch_id +
              "&nonce_str=" + nonce_str +
              "&notify_url=" + notify_url +
              "&openid=" + openid +
              "&out_trade_no=" + out_trade_no +
              "&spbill_create_ip=" + spbill_create_ip +
              "&total_fee=" + total_fee +
              "&trade_type=" + trade_type +
              "&key=" + key;
          let sign = MD5.md5(unifiedPayment).toUpperCase();

          let formData = "<xml>";
              formData += "<appid>" + appid + "</appid>";
              formData += "<body>" + body + "</body>";
              formData += "<mch_id>" + mch_id + "</mch_id>";
              formData += "<nonce_str>" + nonce_str + "</nonce_str>";
              formData += "<notify_url>" + notify_url + "</notify_url>";
              formData += "<openid>" + openid + "</openid>";
              formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"
              formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>";
              formData += "<total_fee>" + total_fee + "</total_fee>";
              formData += "<trade_type>" + trade_type + "</trade_type>";
              formData += "<sign>" + sign + "</sign>";
              formData += "</xml>";

          wx.request({
            url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            method: 'POST',
            data: formData,
            header: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            success: res => {
              
              let prepay_id = res.data.substr(res.data.indexOf('prepay_id') + 19, 36);
              let paySign = MD5.md5("appId=" + appid + 
                                    "&nonceStr=" + nonce_str +
                                    "&package=prepay_id=" +prepay_id + 
                                    "&signType=MD5&timeStamp=" +timeStamp + 
                                    "&key=" + key).toUpperCase();

              wx.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonce_str,
                'package': 'prepay_id=' + prepay_id,
                'signType': 'MD5',
                'paySign': paySign,
                'success': res => {

                  wx.request({
                    url: getApp().globalData.localhost + '/sp/index.php/Home/My/openUpMember/',
                    method: 'GET',
                    header: {
                      'content-type': 'application/json',
                      'Cookie': getApp().globalData.cookieKey
                    },
                    data: {
                      memberMonthCount: this.data.curr + 1,
                      cr_id: id,
                    },
                    success: res => {
                      if (res.data.status == 200) {
                        this.setData({
                          hasVipFlag: true
                        })
                        wx.showToast({
                          title: '开通白银会员成功！',
                          icon: 'none',
                          duration: 2000
                        });
                      } else if (res.data.status == 400) {
                        wx.showToast({
                          title: '白银会员已开通！',
                          icon: 'none',
                          duration: 2000
                        });
                      } else if (res.data.status == 401) {
                        wx.showToast({
                          title: '开通失败！',
                          icon: 'none',
                          duration: 2000
                        });
                      } else if (res.data.status == 403) {
                        wx.showToast({
                          title: '暂未登录！',
                          icon: 'none',
                          duration: 2000
                        });
                      } else {
                        wx.showToast({
                          title: '网络连接失败！',
                          icon: 'none',
                          duration: 2000
                        });
                      }
                    },
                    fail: res => {
                      wx.showToast({
                        title: '网络连接失败！',
                        icon: 'none',
                        duration: 2000
                      });
                    }
                  })
                },
                'fail': res => {
                  console.log("支付订单失败：");
                  console.log(res);
                }
              })
            },
            fail: res => {
              console.log("预支付生成订单失败：");
              console.log(res);
            }
          })

        } else if(res.data.status == 401) {
          wx.showToast({
            title: '服务器错误！',
            icon: 'none',
            duration: 2000
          });
        } else if (res.data.status == 403) {
          wx.showToast({
            title: '暂未登录！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '网络连接失败！',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })


  },

  nonceStrFnc: function (min, max) {
    var returnStr = "",
      range = (max ? Math.round(Math.random() * (max - min)) + min : min),
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (var i = 0; i < range; i++) {
      var index = Math.round(Math.random() * (arr.length - 1));
      returnStr += arr[index];
    }
    return returnStr;
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