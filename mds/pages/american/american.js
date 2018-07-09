var App = getApp();
var selectAllStartCategory = 'http://www.meidaoshuo.com/sp/index.php/User/selectAllStartCategory'//美导分类
var americanAll = 'http://www.meidaoshuo.com/sp/index.php/User/selectMdByCategory/user_category_id/2'//美导所有内容
Page({
       data: {
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        titleConent:[],
        conent:[],
        latitude:'',
        longitude: '',  
      },
      //页面加载
      onLoad: function (e){       
        var that = this ;       
      
        //我先得到经伟度
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var latitude1 = res.latitude;
            var longitude1 = res.longitude
            console.log("latitude1:" + latitude1 +"  longitude1 "+ longitude1);

            //  //负值到上面的data中
            that.setData({
              latitude: latitude1,
              longitude: longitude1
            });

          }
        })
        //美导title
        wx.request({
          url:  selectAllStartCategory,
          data: {},
          method: "GET",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res);
            var titleConent = res.data.data;
            that.setData({
              titleConent: titleConent
            });
          }
        });
        
        //美导内容
        wx.request({
          url: americanAll,
          data: {
            latitude:this.data.latitude,
            longitude: this. data.longitude
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            
            var conent = res.data.data;
            
            that.setData({
              conent: conent,
            });
          }
        })        
      },
       //滑动切换
       swiperTab: function (e) {
         var that = this;
         console.log(e.detail.current);
         that.setData({
           currentTab: e.detail.current
         });
       },
       //点击切换
       clickTab: function (e) {
         console.log(this.data.currentTab);
         var that = this;
         if (this.data.currentTab === e.target.dataset.select) {
           return false;
         } else {
           that.setData({
             currentTab: e.target.dataset.current
           })
         }
       },
       //进入详情
       bindDetails: function (e) {
         var mdId = e.currentTarget.dataset.id;
         console.log(mdId);
         wx.navigateTo({
           url: '/pages/americanDetails/americanDetails?id=' + mdId,
            
          })
       },

 });