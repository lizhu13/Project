$(function () {
  // 功能一: 刚进入搜索中心 显示历史记录列表
  showHistoryList();
  // 功能二: 点击搜索 添加历史记录
  // 1.点击按钮的时候 把输入框中的值获取到
  $(".search-btn").click(function () {
    // if($(".search-box input").val() == '') {
    //   return;
    // }
    // console.log(1);
    // 2.调用setHistoryData方法来设置历史记录
    setHistoryData($(".search-box input").val())
    
  // 功能五: 点击搜索跳转到搜索结果页 location.href
  // ./searchList.html?keywords=nike  表单提交的时候  不写method  默认是get ?后面可能是username=shangsan&password=123456
  // 只要你见到地址栏上有参数的话  他一定是get方式提交吗？ 是
      location.href = "./searchList.html?keywords="+$(".search-box input").val();

      $(".search-box input").val("");
  })

  // 功能三: 点击清空历史记录 清空历史记录
  $(".clear").click(function(){
    clearHistoryData();
    showHistoryList();
  })

  // 功能四: 点击历史记录列表中的某一条上的删除按钮 删除一条数据
  $(".history").on("click",'.history-list i',function(){
    // 先要获取到这条数据的文字
    var font = $(this).prev("span").html();
    // 把文字传给delHistoryData方法
    // console.log(font);
    delHistoryData(font);
    // 用showHistoryList重新显示列表
    showHistoryList();
  })

 
  // 功能六: 点击历史记录的文字 跳转到搜索结果页面 location.href
  $(".history").on("click",'.history-list span',function(){
    // 先要获取到这条数据的文字
    var font = $(this).html();
    // 把文字传给delHistoryData方法
    location.href = "./searchList.html?keywords="+font;
  })

})

  // var historyData = JSON.parse(window.localStorage.getItem("ltHistory") || '[]');
// 1.历史记录的获取
var getHistoryData = function () {
  // 1.1 我们想要的是什么-- 数组
  // 1.2 localStorage中存的是什么 --字符串 键值对  json(数组字符串   对象字符串   '["a","b"]'  '{"rows":["a","b"],["c","d"]}'   )    
  // 1.3 我们如何获取locaStorage中的数据 window.localStorage.getItem(key)
  // 1.4 localStorage中存的是json 我们要的是数组或对象 那如何实现转换呢？--JSON.parse(json)--js数组或对象
  return JSON.parse(window.localStorage.getItem("ltHistory") || '[]');
}
// console.log(getHistoryData());
// 2.历史记录的设置
var setHistoryData = function (value) {
  if(value == "") {
    return false;
  }
  // 2.0 先去获取历史记录
  // 2.1 如何进行localStorage的设置--window.localStorage.setItem("ltHistory",value);
  // 2.2 我们需要什么参数才能设置--value
  // 2.3 如何去除掉已经在历史记录中的数据(去重)--
  var historyData = getHistoryData(); // 数组
  // console.log(historyData);
  // 判断setHistoryData方法传入的参数中的数据是否和histroyData中数据有重复的
  $.each(historyData, function (i, item) {

    if (item == value) {
      // console.log(i,item);
      historyData.splice(i, 1);
    }
    //   // 把添加好的数据的数组重新转换为json 添加到localStorage中去
  })
  historyData.push(value);
  window.localStorage.setItem("ltHistory", JSON.stringify(historyData));
}
// setHistoryData('C');
// 3.历史记录的删除--删除的是一个还是一堆
var delHistoryData = function (value) {
  // 3.0 你们认为删除是用的什么方法 localStorage.removeItem("ltHiStory");  clear();
  // 3.1 获取历史记录
  var historyData = getHistoryData(); //数组
  // 3.2 判断你要删除的是不是在历史记录中有 如果有 切掉
  $.each(historyData, function (i, item) {
    if (item == value) {
      historyData.splice(i, 1);
    }
  })
  // 3.3 切好的数据重新存到localStorage中去
  window.localStorage.setItem('ltHistory', JSON.stringify(historyData));
}

// delHistoryData("C");

// 4.清空历史记录
var clearHistoryData = function () {
  // 4.1 我们要用的方法是--window.localStorage.removeItem()
  window.localStorage.removeItem('ltHistory');
}

// 5.历史记录列表的显示
var showHistoryList = function () {
  // 1.获取历史记录数据--数组
  var historyData = getHistoryData();
  // 2.模板引擎要求传的数据必须是对象 
  var data = {
    // history: ["a","b","c"]  history[0]
    history: historyData
  }
  // 3.写模板
  // 4.绑定模板
  var historyResult = template("history-template", data);
  // 5.输出到页面上
  $(".history").html(historyResult);
}



// var data = {
//   name: ["aa","bb","cc"]
// }

// 我叫<%a%>  他是<%b%>  还有<%c%>   ---str

// 正则表达式

// 1.,.<%a%>  <%b%>
// 2. a  b

// str.replace(a,name[0])
