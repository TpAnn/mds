var __this;
let __emojis = {};//保存定义了的小表情
var __emojiArray = [];
var __reg;//正则表达式配置

var ___text = "";//用于存储textarea值，上传保存需要用这个
var ___temTextArea;//用于纪录聚焦的textareare
var ___Objs;
var _url = 'http://www.meidaoshuo.com///sp/index.php/Home/Chat/pushChat';
//cookie
let cookie = wx.getStorageSync('cookieKey');


function init(reg, emojis) {
  __reg = reg;
  __emojis = emojis;
  __emojiArray = [];
  for (var key in __emojis) {
    __emojiArray.push(key);
  }
}

function bindThis(e) {
  __this = e;
  var temObjs = {};
  temObjs.showWxEmojiChooseView = 1;
  temObjs.textAreaText = ___text;
  temObjs.emojiArray = __emojiArray;
  ___Objs = temObjs;
  __this.setData({
    WxEmojiObjs: temObjs
  });
}

function buildTextObjs(e, str) {
  var temObjs = {};
  temObjs.WxEmojiTextArray = transEmojiStr(str);
  __this.setData({
    WxEmojiObjs: temObjs
  });
}

function buildTextAreaObjs(e, str) {
  var temObjs = {};
  temObjs.showWxEmojiChooseView = 1;
  // temObjs.textAreaText = "hello test! :00: :01: :02: _03_ /04 🍉";
  ___text = str;
  if (typeof (___text) === 'undefined') {
    ___text = "";

  }
  
  temObjs.WxEmojiTextArray = transEmojiStr(str);//进行赋值
  temObjs.textAreaText = ___text;
  temObjs.emojiArray = __emojiArray;
  ___Objs = temObjs;
  wx.setStorageSync('text', ___text);//发送的信息
  __this.setData({
    WxEmojiObjs: temObjs
  });

}

//解析表情包
function transEmojiStr(str) {
  // var eReg = new RegExp("["+__reg+' '+"]");
  var eReg = new RegExp("[" + __reg + "]");
  var array = str.split(eReg);
  var emojiObjs = [];
  for (var i = 0; i < array.length; i++) {
    var ele = array[i];
  

    var emojiObj = {};
    if (__emojis[ele]) {
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
     // let data = wx.getStorageSync('data');
      //赋值回到主健
      console.log(__emojis[ele]);
      emojiObj.text = __emojis[ele];
    
    } else {
      emojiObj.node = "text";
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);
    // console.log(emojiObj);
  }

  return emojiObjs;
}

function WxEmojiTextareaBlur(target, e) {
  console.log(666);
  __this = target;
  if (e.detail.value.length == 0) {
    return;
  }
  console.log(e.detail.value);
  buildTextAreaObjs(__this, e.detail.value);
}

function WxEmojiTextareaFocus(target, e) {
  __this = target;
}

function wxPreEmojiTap(target, e) {
  __this = target;
  var preText = e.target.dataset.text;
  if (preText.length == 0) {
    return;
  }

  // wx.request({
  //   url: _url, //仅为示例，并非真实的接口地址
  //   data: {
  //     chat_user_id: 2,//聊天的对象 
  //     news_text: '666666666',//聊天的内容 f5f68f40ef594935e52d6645b3f397ab
  //     news_type: 0,//发送类型
  //     is_read: 0,//是否已读
  //   },
  //   header: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     'Cookie': cookie,
  //   },
  //   method: 'POST',
  //   success: function (res) {
  //     console.log(res.data)
  //   }
  // })
  ___text = ___text + preText;
 
  ___Objs.textAreaText = ___text;
  console.log(___Objs);
  __this.setData({
    WxEmojiObjs: ___Objs
  });
  buildTextAreaObjs(__this, ___text);
}


module.exports = {
  init: init,
  bindThis: bindThis,
  text: ___text,
  transEmojiStr: transEmojiStr,
  buildTextObjs: buildTextObjs,
  buildTextAreaObjs, buildTextAreaObjs,
  WxEmojiTextareaFocus: WxEmojiTextareaFocus,
  WxEmojiTextareaBlur: WxEmojiTextareaBlur,
  wxPreEmojiTap: wxPreEmojiTap,

}