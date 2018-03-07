$(function () {
  // 功能一: 下拉刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
          setTimeout(function () {
            // console.log(1);
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          }, 1000)
        }
      }
    }
  });



  // 功能二: 渲染商品详情页
  // 1.获取产品id
  //  1.1 实例化urlSearchParams对象的同时把location.search传进去
  var url = new URLSearchParams(location.search);
  //  1.2 使用该对象的get(key)方法获取到产品id
  var id = url.get('id');
  // 2.把产品id传给getDetailData
  getDetailData(id);

  // 功能三: 商品尺码选择
    // 1.获取元素 给元素添加事件
    $(".mui-scroll").on("tap",'.size span',function(){
      // 2.删除所有类名 
      $(".mui-scroll .size span").removeClass('active');
    // 3.给当前点击的元素添加类名
      $(this).addClass('active');
      // 4.去css中设置active的样式
    })

  // 功能四: 商品数量获取
    // var num =   mui(Selector).numbox().getValue()

  // 功能五: 加入购物车
    // 1.选择到元素添加点击事件
    $(".lt-footer a,.add-cart").on('tap',function(){
      // console.log(1);
    // 2.获取加入购物车所需要的参数
    var size= $('.mui-scroll .size span.active').html();
    // console.log(size);
    var num =  mui(".mui-numbox").numbox().getValue();
    // console.log(num);
    // 3.判断参数是否全部传入
    // 4.调用addCart方法 发起ajax请求
    // 5.跳转到登录
    addCart(id,num,size);
    })

})



// 声明一个获取商品详情的方法
var getDetailData = function (id) {
  $.ajax({
    method: 'GET',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (res) {
      // console.log(res);
      var detailResult = template("detail-template", res);
      $(".mui-scroll").html(detailResult);

      // 尺寸部分渲染
      // 1.获取到尺寸的数据
      var size = res.size;
      // console.log(size);
      // 2.处理尺寸数据
      var arr = size.split('-');
      // console.log(arr);
      // 3.把尺寸数据变成对象
      var data = {
        startNum: arr[0],
        endNum: arr[1]
      }
      // 4.利用template方法渲染尺寸数据
      var sizeResult = template('size-template', data);
      // console.log(sizeResult);
      // 5.把数据添加到size这个div中
      $(".size").html(sizeResult);


      // 初始化轮播图
      // 轮播图
      // 1.在做静态页面的时候 初始化在入口函数内
      // 2.但是当我们用ajax请求 动态渲染轮播图的时候 就需要
      //   在ajax请求完成并把页面渲染出来之后再去初始化轮播图才可以
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 原因和轮播图一样 数字输入框也需要手动初始化
      mui(".mui-numbox").numbox();
    }
  })
}

// 声明一个加入购物车的方法
var addCart = function (productid,num,size) {
  $.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
      productId: productid,
      num:num,
      size: size
    },
    beforeSend:function(){
      console.log(productid);
      // 1.判断productid是否传入
      if(!productid) {
        mui.toast("找不到该产品!!");
        // 阻止ajax提交
        return false;
      }

      // 2.判断size 尺码是否传入
      if(!size){
        mui.toast("请选择尺码!!");
        return false;
      }

      // 3.判断数量是否传入
      if(!num){
        mui.toast("请选择数量!!");
        return false;
      }
    },
    success:function(res){
      // console.log(res);
      // 判断状态码 然后跳转到登陆页
      // 400 在http协议中的浏览器的状态码中是有意义的
      // 400这个码在开发中很少用 
      // 500 502  server error
      // 10001 自己定义的
      // console.log(location.href);


      // 在这里 400 代表用户未登录  所以跳转到登录页进行登录
      if(res.error == 400) {
        location.href = "../user/login.html?returnUrl="+location.href;
      }

      // 如果用户已经登录 那么就跳转到购物车页面
      if(res.success == true) {
        location.href = "../cart.html";
      }

    }
  })
}