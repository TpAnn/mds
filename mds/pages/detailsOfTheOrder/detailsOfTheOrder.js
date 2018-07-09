// pages/detailsOfTheOrder/detailsOfTheOrder.js
var orderDetail =  'ttp://www.meidaoshuo.com///sp/index.php/Home/My/orderDetail'//订单详情查询
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyerPayment:'等买家付款',
    cancel:'取消订单',
    immediately:'立即付款',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx:wx.request({
       url: orderDetail,
       data: '',
       header: {
         'content-type': 'application/json',
         'Cookie': cookie,
       },
       method: 'GET',
       dataType: 'json',
       responseType: 'text',
       success: function(res) {
          console.log(res);
       },
       fail: function(res) {

       },
       complete: function(res) {},
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