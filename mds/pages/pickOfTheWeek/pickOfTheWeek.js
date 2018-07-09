
var toUserRecommendCommodityToOne = getApp().globalData.localhost+'/sp/index.php/My/toUserRecommendCommodityToOne';
var category = getApp().globalData.localhost + '/sp/index.php/HomeCarousel/indexCategory';

Page({
  data: {
    navData: [],
    currentTab: 0,
    conent: [],
    selectGoodsId:[],
    hasSingleElection: false,  //聊天推荐优惠卷
    hasRecommend: false, //聊天推荐商品
    btnContent: '下一步',
    uid: 0,
  },
  switchSelect: function (e) {
    //得到当前id
    var index = e.currentTarget.dataset.childindex,
      id = e.currentTarget.dataset.id,
      currentTab = this.data.currentTab;
    this.data.conent[currentTab][index].isSelect = !this.data.conent[currentTab][index].isSelect //当它等于false时 则反
    if (this.data.conent[currentTab][index].isSelect){
      this.data.selectGoodsId.push(id);
    }else{
      this.data.selectGoodsId.splice(this.data.selectGoodsId.indexOf(id),1);
    }
    //调用数组
    this.setData({
      conent: this.data.conent,
    });
  },
  switchNav(e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //下一步
  bindNext: function () {
    if (!this.data.selectGoodsId.length){
      wx.showToast({
        title: '请选择一件商品！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.hasSingleElection && this.data.selectGoodsId.length > 1) {
      wx.showToast({
        title: '只能选择一件商品生成优惠卷！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.hasSingleElection){
      wx.navigateTo({
        url: '/pages/nextRecommend/nextRecommend?flag=true&id=' 
              + this.data.selectGoodsId.toString() 
              + "&uid=" 
              + this.data.uid,
      })
      return;
    }
    if (this.data.hasRecommend) {
      wx.navigateTo({
        url: '/pages/nextRecommend/nextRecommend?recommend=true&id='
              + this.data.selectGoodsId.toString()
              + "&uid="
              + this.data.uid,
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/nextRecommend/nextRecommend?id='+this.data.selectGoodsId.toString(),
    })
  },
  getNavData: function(){
    wx.request({
      url: category,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        this.setData({
          navData: res.data
        });
        for(var i=0;i<this.data.navData.length;i++){
          setTimeout((i)=>{
            this.getGoods(this.data.navData[i].cc_id);
          },i*1000,i)
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
  getGoods: function(params){
    wx.request({
      url: toUserRecommendCommodityToOne,
      data: {
        category_id: params>0 ? params: 1
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': getApp().globalData.cookieKey
      },
      success: res => {
        this.data.conent.push(res.data.data.commodityArray.map((i) => {
          return { isSelect: false, ...i }
        }));
        this.setData({
          conent: this.data.conent
        });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData();
    this.data.uid = options.uid;
    if(!!options.flag){
      this.data.btnContent = '生成商品优惠卷';
      this.data.hasSingleElection = true;
      this.setData({
        btnContent: this.data.btnContent,
      });
    }
    if (!!options.recommend) {
      this.data.btnContent = '生成商品推荐地址';
      this.data.hasRecommend = true;
      this.setData({
        btnContent: this.data.btnContent,
      });
    }
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