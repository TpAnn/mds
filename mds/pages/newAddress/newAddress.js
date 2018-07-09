
//获取应用实例

var cityData = require('../../utils/citydata.js');

Page({
  data: {
    citysData: cityData.citysData,
    provinces: [],
    citys: [],
    areas: [],
    value: [0, 0, 0],
    name: '',
    userTel:'',
    userName:'',
    addressDetail:'',
    defaultAddrFlag: false,
  },

  listenerSwitch: function(e){
    this.data.defaultAddrFlag = !this.data.defaultAddrFlag;
  },
  //监听收货人输入框
  listenerUserNameval:function(e){
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

  //保存地址
  bindPreservation: function (e){
    var userName = this.data.userName; //姓名
    var tel = this.data.userTel;//电话
    var addressDetail = this.data.addressDetail;//详细地址
    var adress = this.data.name.length ? this.data.name.split('-') : ['北京市','北京市','东城区']; //地址

    if ( !userName.length ) {
      wx.showToast({
        title: '请输入收货人的姓名',
        icon: 'none',
        duration : 2000,
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

    if (userName.length > 10) {
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
      url: getApp().globalData.localhost+'/sp/index.php/User/addShippingAddress',
      method: 'POST',
      data: {
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
          title: '添加成功',
          icon: 'none',
          duration: 2000
        });
        wx.redirectTo({
          url: '/pages/addreAdministration/addreAdministration',
        })
      },
      fail: () => {
        wx.showToast({
          title: '网络连接失败！',
          icon: 'none',
          duration: 2000
        });
      }
    })

  },

  // 页面初始化事件
  onLoad: function () {
    this.initData();
  }
});
