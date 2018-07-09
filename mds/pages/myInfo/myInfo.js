// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: true,
    age: '',
    name: '',
    nickName: '',
    signName: '',
    address: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageInfoSync('userDatas')){
      this.setData({
        sex: !!wx.getStorageInfoSync('userDatas').sex,
        age: !!wx.getStorageInfoSync('userDatas').age ? wx.getStorageInfoSync('userDatas').age: '',
        name: !!wx.getStorageInfoSync('userDatas').user_realname ? wx.getStorageInfoSync('userDatas').user_realname : '',
        nickName: !!wx.getStorageInfoSync('userDatas').user_nick ? wx.getStorageInfoSync('userDatas').age : '',
        signName: !!wx.getStorageInfoSync('userDatas').personalitySignatrue ? wx.getStorageInfoSync('userDatas').personalitySignatrue : '',
        address: !!wx.getStorageInfoSync('userDatas').user_address ? wx.getStorageInfoSync('userDatas').user_address : '',
      });
    }
  },

  //监听input
  listenerNameval: function (e) {
    this.data.name = e.detail.value;
  },
  listenerNickNameval: function (e) {
    this.data.nickName = e.detail.value;
  },
  listenerSignNameval: function (e) {
    this.data.signName = e.detail.value;
  },
  listenerAgeval: function (e) {
    this.data.age = e.detail.value;
  },

  bindRegionChange: function (e) {
    this.setData({
      address: e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2]
    })
  },

  selectSex: function(e) {
    this.setData({
      sex: !this.data.sex
    })
  },

  sendBtn: function(e) {
    wx.request({
      url: getApp().globalData.localhost + '/sp/index.php/Home/HomeCarousel/perfectInformationToUser',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookieKey
      },
      data: {
        user_realname: this.data.name,
        user_nick: this.data.nickName,
        personalitySignature: this.data.signName,
        age: this.data.age,
        sex: +this.data.sex,
        user_address: this.data.address
      },
      success: res => {
        if( res.data.status == 200){
          wx.navigateBack({
            delta: 1
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