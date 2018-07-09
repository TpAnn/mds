//省市区数据
var cityData = require('../../utils/citydata.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    raId: 0,
    userId: 0,
    tell: '',
    adressDetail:'',
    hasRevise: false,
    provinces: [],
    citys: [],
    areas: [],
    value: [0, 0, 0],
    citysData: cityData.citysData,
    name: '',
    userTel: '',
    userName: '',
    addressDetail: '',
  },

  //监听收货人输入框
  listenerUserNameval: function (e) {
    this.data.userName = e.detail.value;
  },
  //监听收货人手机号码输入框
  listenerTellval: function (e) {
    this.data.userTel = e.detail.value;
  },
  //监听收货人详细输入框
  listenerAdrDetailval: function (e) {
    this.data.addressDetail = e.detail.value;
  },

  bindDelBtn:function (){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗？',
      success: function (res) {
        console.log('del1');
        if (res.confirm) {
          console.log('del2');
          wx.request({
            url: getApp().globalData.localhost + '/sp/index.php/User/deleteAddress',
            data: {
              ra_id: that.data.raId,
              user_id: that.data.userId
            },
            header: {
              'content-type': 'application/json',
              'Cookie': getApp().globalData.cookieKey
            },
            success: res => {
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 2000
              });
              wx.redirectTo({
                url: '../addreAdministration/addreAdministration',
              })
            },
            fail: res => {
              wx.showToast({
                title: '删除失败！',
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      }
    })
  },
  bindSendBtn: function(){
    var that = this;
    var userName = this.data.userName; //姓名
    var tel = this.data.userTel;//电话
    var addressDetail = this.data.addressDetail;//详细地址
    var adress = this.data.name.split('-'); //地址
    
    if (!userName.length) {
      wx.showToast({
        title: '请输入收货人的姓名',
        icon: 'none',
        duration: 2000,
      })
      return;
    }

    if (!tel.length) {
      wx.showToast({
        title: '请输入收货人的手机号码',
        icon: 'none',
        duration: 2000,
      })
      return;
    }

    if (!addressDetail.length) {
      wx.showToast({
        title: '请输入收货人的详细地址',
        icon: 'none',
        duration: 2000,
      })
      return;
    }

    if (userName.length>10) {
      wx.showToast({
        title: '您输入的姓名过长！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
      wx.showToast({
        title: '您输入的手机号码格式不正确！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.request({
      url: getApp().globalData.localhost+'/sp/index.php/User/editorShippingAddress',
      method: 'POST',
      data: {
        ra_id: that.data.raId,
        receiving_name: userName,
        contact_number: tel,
        provinces: adress[0],
        city: adress[1],
        county: adress[2],
        address_detail: addressDetail
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000
        });
        wx.redirectTo({
          url: '../addreAdministration/addreAdministration',
        })
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
  initData: function () {
    var provinces = [];
    var citys = [];
    var areas = [];

    this.data.citysData.forEach(function (province, i) {
      provinces.push(province.name);
      if (i === 0) {
        citys.push(province.citys[i].name);
        areas = province.citys[i].areas;
      }
    });

    this.setData({
      provinces: provinces,
      citys: citys,
      areas: areas
    });
  },
  bindChange: function (e) {
    var citysData = this.data.citysData;
    var value = this.data.value;
    var current_value = e.detail.value;
    var citys = [];

    var provinceObj = {};
    var cityObj = {};

    provinceObj = citysData[current_value[0]];

    if (value[0] !== current_value[0]) {
      // 滑动省份
      provinceObj.citys.forEach(function (v) {
        citys.push(v.name);
      });
      this.setData({
        citys: citys
      });

      cityObj = provinceObj.citys[0];
      this.setData({
        areas: cityObj.areas,
        value: [current_value[0], 0, 0]
      });

    } else if (value[0] === current_value[0] && value[1] !== current_value[1]) {
      // 滑动城市
      if (current_value[1] >= provinceObj.citys.length) {
        // 数据不存在 跳过
        return;
      }
      cityObj = provinceObj.citys[current_value[1]];
      this.setData({
        areas: cityObj.areas,
        value: [current_value[0], current_value[1], 0]
      });
    } else {
      // 滑动区县
      cityObj = provinceObj.citys[current_value[1]];
      this.setData({
        value: current_value
      });
    }
    this.setData({
      name: provinceObj.name + '-' + cityObj.name + '-' + cityObj.areas[this.data.value[2]]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.userId = wx.getStorageSync('userDatas').user_id;

    this.data.raId = options.ra_id;

    this.initData();

    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/User/queryAddressByRaId',
      data: {
        ra_id: this.data.raId,
        user_id: this.data.userId
      },
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        var data = res.data.data;
        this.data.value[0] = this.data.provinces.indexOf(data.provinces);
        this.data.citysData[this.data.value[0]].citys.forEach((i,k)=>{
          if (i.name == data.city){
            this.data.value[1] = k;
          }
        });
        this.data.citysData[this.data.value[0]].citys[this.data.value[1]].areas.forEach((i, k) => {
          if (i == data.county) {
            this.data.value[2] = k;
          }
        });
        this.setData({
          citys: this.data.citysData[this.data.value[0]].citys[this.data.value[1]],
          areas: this.data.citysData[this.data.value[0]].citys[this.data.value[1]].areas,
          value: this.data.value,
          name: data.provinces+"-"+data.city+"-"+data.county,
          userName: data.receiving_name,
          userTel: data.contact_number,
          addressDetail: data.address_detail
        });
        console.log(res.data);
        console.log(this.data);
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