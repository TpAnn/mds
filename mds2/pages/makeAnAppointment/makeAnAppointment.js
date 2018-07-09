//获取应用实例
const app = getApp()
var availableTimeForInquiringStores = 'http://www.meidaoshuo.com///sp/index.php/Home/My/availableTimeForInquiringStores';//得到预约时间
var makeAnAppointmentStore = 'http://www.meidaoshuo.com///sp/index.php/Home/My/makeAnAppointmentStore/';//预约
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    c: '2016-11-08',//2016-11-08
    times: '12:00',
    objectArray: ['中国', '英国', '美国'],
    index: 0,
    dIndex:0,
    selectId:0,
  },
  onLoad: function () {
    let now = new Date();
    let years = now.getFullYear();
    let months = now.getMonth() + 1;
    let days = now.getDay() + 1;

    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    wx.request({
      url: availableTimeForInquiringStores,
      data: '',
      header: {
        'content-type': 'application/json',
        'Cookie': cookie
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var conent = res.data.data.availableDate;

        var arr = [];
        for (var i in conent) {
          var dateList = conent[i].split("-");
          arr = dateList;

        }
       
        for (var j in arr) {
          console.log(arr[i]);
          that.setData({
            year: arr[0],
            month: arr[1],
            day:arr[2]
          });

        }
      },
      fail: function (res) { },
      complete: function (res) { },
    }) 
    var year = that.data.year;
    var month = that.data.month;
    var day = that.data.day;

    console.log(days);
    if (days < 5){
      console.log(66);
      that.setData({
        isTodayWeek: true,
        todayIndex: 5
      });
    }
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: days
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
      
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    var that = this;
    var data ;
    //全部时间的月份都是按0~11基准，显示月份才+1
    // let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    // let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    // data = year + "-" + month;
    // console.log(data);
    // this.setData({
    //   year: year,
    //   month: (month + 1),
    //   dates: data
      
    // })
    var year = that.data.year;
    var month = that.data.month;
    console.log(month);
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
   //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击城市组件确定事件  
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //点击日期事件
  active: function(e){
    var that = this;
    let now = new Date();
    let days = now.getDay() + 1;//当前天
    var id = e.currentTarget.dataset.id;
    if (id < days) {
      console.log('已经不可以选择！');
    } else {
      that.setData({
        selectId: id,
        dIndex: id,
      });
        
    }
  },
  //确认预约
  confirmation: function(){
    console.log(111);
    var that = this;
    let now = new Date();//年月日
    let days = now.getDay() + 1;//当前天
    var id = that.data.selectId;//选中的天
    var year = that.data.year;//年
    var month = that.data.month;//月
    //判断如果小10的 在前面加一个0 如果没有正常
    if (id > 10){
      var date = year + "-" + month + "-" + id;
    }else{
      var date = year + "-" + month + "-0" + id;
    }
    
    //判断时间在当前之后才可以预约
    if (id < days) {
      wx.showToast({
        title: '预约已满！',
        icon: 'success',
        duration: 1000
      })
    } else {
      let cookie = wx.getStorageSync('cookieKey');
      console.log(cookie);
      wx.request({
        url: makeAnAppointmentStore,
        data: {
          timeString: date
        },
        header: {
          'content-type': 'application/json',
          'Cookie': cookie,
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.status == 200){
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })
          }
         
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }

})
