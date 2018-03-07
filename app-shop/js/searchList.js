$(function () {
  // 功能一: 通过用户搜索对应的产品关键词 显示对应的产品
  // 1.获取到关键词(在搜索页跳转的时候 把关键词传过来) --两种方法: 切割字符串 使用URLSearchParams内置对象
  // 怎么把关键词传递到searchList页面: 办法一: location.href 带过来  办法二: 通过localStorage(我把localstory每次清空)
  // var url = location.search;
  // console.log(url);//?keywords=nike
  // 获取的是keywords=nike

  // 内置对象 获取url参数的内置对象
  // 1.实例化对象
  // 2.把location.search传入URLSearchParams()
  // 3.通过该对象的get(key) 获取值
  var url = new URLSearchParams(location.search);
  // 
  var keywords = url.get('keywords');
  // console.log(keywords);
  getSearchResultList(keywords);
  // 把keywords设置给搜索结果页中的输入框的value
  $(".sort-search").find('input').val(keywords);
  // 点击搜索按钮 把搜索结果显示到商品页面中(mui中绑定事件只能用on)
  $(".sort-search .search-btn").on("tap", function () {
    // console.log(1);
    // 获取商品列表页中的关键词 再次获取商品列表
    getSearchResultList($(".sort-search").find('input').val());
  })


  //功能二:  按照价格排序-- 我们只做了件事情 传参数
  // 把一个功能抽取成一个函数
  // 做到两点: 分清变的和不变的
  // 把变的抽取成参数(参数不要超过三个  超过三个参数就不再直接传参而是把参数封装在对象中)-- 编程范式--java编程范式
  // 把不变的封装在函数中
  // 0.声明一个开关变量
  var flagPrice = true;
  // 1.找到元素添加事件
  $(".sort li:eq(1)").on('tap', function () {
    // 清除li上所有的的名字为active的class
    $(".sort li").removeClass("active");
    // 给当前的li添加一个active的class
    $(this).addClass("active");
    // 2.判断是升序还是降序
    if (flagPrice == true) {
      // console.log(1);
      flagPrice = false;
      // 3.调用getSearchResultList方法 给传入price的升序和降序参数 排序
      getSearchResultList('', 2);
      // 先移除以前的class
      $(this).find("i").removeClass("fa-angle-up");
      // 然后添加现在的class
      $(this).find("i").addClass("fa-angle-down");
    } else {
      // console.log(2);
      flagPrice = true;
      // 3.调用getSearchResultList方法 给传入price的升序和降序参数 排序
      getSearchResultList('', 1);
      $(this).find("i").removeClass("fa-angle-down");
      $(this).find("i").addClass("fa-angle-up");
    }
  })

  // 功能三: 按照库存排序
  // 1.声明一个开关变量
  var flagNum = true;
  // 2.找到元素添加事件
  $(".sort li:eq(2)").on("tap", function () {
    $(".sort li").removeClass("active");
    // 给当前的li添加一个active的class
    $(this).addClass("active");
    // 3.判断是升序还是降序
    if (flagNum == true) {
      // 4.切换开关变量的值
      flagNum = false;
      // 5.调用获取搜索结果的方法获取结果( 如果传默认 也就是2  会发生双重排序,既有价格排序又有库存排序 )
      // 注意: 在看接口文档的时候 务必要看清 哪些是必须的 哪些可选
      //  如果你的参数是必须的 但是没传 会报 500错误(只要是500的错误 都会去找后台开发问)
      getSearchResultList('', null, 2);
      $(this).find("i").removeClass("fa-angle-up");
      // 然后添加现在的class
      $(this).find("i").addClass("fa-angle-down");
    } else {
      flagNum = true;
      getSearchResultList('', null, 1);
      // 6.变箭头方向 切换类名
      $(this).find("i").removeClass("fa-angle-down");
      $(this).find("i").addClass("fa-angle-up");
    }

  })






  // 功能四: 下拉刷新和上拉加载
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          console.log(1);
          // 结束下拉刷新
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        }
      },
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          console.log(2);  
          //注意：
          //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
          //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后

          //  如果是false  下拉一次会执行一次加载
          // this.endPullupToRefresh(false);
          // 如果是true     会显示 没有更多数据了  也就不会再次执行数据加载了
          this.endPullupToRefresh(true);

          // 在工作中  现在提倡 小而美(整个项目都是由各种插件组成的  如果某一个插件不行了 我可以随便换)   不是 大而全(可能框架选择不当 会出现 换技术栈的问题)
        }
      }
    }
  });

})
// 获取搜索结果的方法

/**
 * 
 * @param {String} proname 
 * @param {Number} price 
 * @param {Number} num 
 * @param {Number} page 
 * @param {Number} pagesize 
 */
var getSearchResultList = function (proname, price, num, page, pagesize) {
  $.ajax({
    method: 'GET',
    url: '/product/queryProduct',
    data: {
      // 代表第几页
      page: page || 1,
      // 代表一页有多少条数据
      pageSize: pagesize || 5,
      // 产品名称--搜索的关键词(搜索页输入的内容)
      proName: proname || '',
      // 按价格排序
      price: price || null,
      // 按销量排序(按库存)
      num: num || null
    },
    success: function (res) {
      // console.log(res);
      var searchResult = template("sr-template", res);
      $(".lt-sports-content").html(searchResult);
    }
  })
}


// 移动端开发
      // 面对的浏览器的种类比较多  更加难一点儿()  世界之窗--查内核--ie
// 类app开发或者微信开发
      // 类app开发 外面是套app壳  里面是html页面-- 只面对一种内核 -- chorme  
      // 微信开发： 类app开发一样

      // 总结 webview到底是什么？ 在app中放html的一个容器

      // swift  object-c  java