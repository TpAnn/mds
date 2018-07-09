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
//
function buildTextAreaObjs(e, str) {//str是内容 这是一个进行赋值的一个方法
  wx.setStorageSync('text', str);
  var temObjs = {};
  temObjs.showWxEmojiChooseView = 1;
  // temObjs.textAreaText = "hello test! :00: :01: :02: _03_ /04 🍉";
  ___text = str;
  if (typeof (___text) === 'undefined') {
    ___text = "";

  }


  //将内容赋值到temObjs的对象里
  temObjs.WxEmojiTextArray = transEmojiStr(str);
  temObjs.textAreaText = ___text;
  temObjs.emojiArray = __emojiArray;
  ___Objs = temObjs;
  __this.setData({
    WxEmojiObjs: temObjs
  });

}
 
//进行了正则比配
function transEmojiStr(str) {
  console.log(str);
  
  var eReg = new RegExp("[" + __reg + "]");
  var array = str.split(eReg);
  // console.log(array);//把字符转成了数据格式

  var emojiObjs = [];

  for (var i = 0; i < array.length; i++) {//循环这个数据里的元素
    var ele = array[i];

    // console.log(__emojis);//这是一个对象
    var emojiObj = {};
    if (__emojis[ele]) {//把得到的内容放到一个对象里面
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
      emojiObj.text = __emojis[ele];
    } else {
      emojiObj.node = "text";
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);

  }

  return emojiObjs;
}


//点到textarear框之后得到内容 
function WxEmojiTextareaBlur(target, e) {
  __this = target;
  if (e.detail.value.length == 0) {
    return;
  }
  let textConent = wx.setStorageSync('textConent');//返回的聊天信息
  console.log(textConent);//返回的聊天信息;
  buildTextAreaObjs(__this, textConent);
  console.log(e.detail.value);
  
}

function WxEmojiTextareaFocus(target, e) {//获取焦点事件
  __this = target;
  console.log(target);
  

}

//将内容进行赋值到表情解析后的方法
function wxPreEmojiTap(target, e) {//
  __this = target;
  var preText = e.target.dataset.text;
  // console.log(preText);
  if (preText.length == 0) {
    return;
  }
  ___text = ___text + preText;
  ___Objs.textAreaText = ___text;

  __this.setData({
    WxEmojiObjs: ___Objs
  });
  buildTextAreaObjs(__this, ___text);

}


module.exports = {
  init: init,
  bindThis: bindThis,
  text: ___text,
  transEmojiStr: transEmojiStr, //存诸textear的内容还进行正则比配
  buildTextObjs: buildTextObjs,
  buildTextAreaObjs, buildTextAreaObjs, //将内容进行赋值到表情解析后的方法
  WxEmojiTextareaFocus: WxEmojiTextareaFocus,//获取焦点事件
  WxEmojiTextareaBlur: WxEmojiTextareaBlur,//失焦触发事件
  wxPreEmojiTap: wxPreEmojiTap,

}