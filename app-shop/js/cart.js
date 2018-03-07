$(function () {
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
            getCartData();
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          }, 1000)
        }
      }
    }
  });

  // 功能: 购物车商品删除
  var btnArray = ['确认', '取消'];
  $('#product-items').on('slideleft', '.mui-table-view-cell', function (event) {
    var elem = this;
    mui.confirm('确认删除该条记录？', '商品删除', btnArray, function (e) {
      if (e.index == 0) {
        // elem.parentNode.removeChild(elem);
        console.log(elem.dataset.id);
        // console.log("确认删除");
        delCartData([elem.dataset.id]);
        // 重新手动调用一次 下拉刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading();
      } else {
        setTimeout(function () {
          console.log("取消删除");
          mui.swipeoutClose(elem);
        }, 0);
      }
    });
  });

  // 数量选择
  $("body").on("tap",'.mui-popup-text .size span',function(){
    $(".mui-popup-text .size span").removeClass("active");
    $(this).addClass("active");
  })

  // 改变数量输入框
  // $("body").on("tap",".mui-numbox-btn-minus",function(){
    
  // })

  $('#product-items').on('slideright', '.mui-table-view-cell', function (event) {
    var editBtn = $(this).find(".mui-btn-blue");
    // 1.尺码范围
    var productsize = editBtn.data("productsize");
    var productArr = productsize.split("-");
    // 2.商品刷量
    var productMax = editBtn.data("productnum");
    // console.log(productsize);
    // 2.尺码
    var size = editBtn.data("size");
    // console.log(size);
    // 3.数量
    var num = editBtn.data("num");
    // console.log(num);
    var data = {
      size: size,
      productsize: productArr,
      num: num,
      max: productMax
    };
    var editResult = template('edit-template', data);
    // console.log(editResult);
    var elem = this;
    mui.confirm(editResult, '编辑商品', btnArray, function (e) {
      // console.log(1);
      // mui(".mui-numbox").numbox()
      if (e.index == 0) {
        // 获取到编辑商品中的数据 提交商品的新数据
          // 1.获取 尺码
          var newSize = $(".mui-popup").find('.active').html();
          // console.log(newSize);
          // 2.获取数量
          var newNum = $(".mui-popup").find(".mui-numbox-input").val();
          // console.log(newNum);
          // 3.购物车id
          var newId = elem.dataset.id;
          // console.log(newId);

          updateCartData(newId,newSize,newNum);


      } else {
        setTimeout(function () {
          mui.swipeoutClose(elem);
        }, 0);
      }
    });
  });

})


// 获取数据
var getCartData = function () {
  $.ajax({
    type: 'GET',
    url: '/cart/queryCart',
    data: null,
    success: function (res) {
      console.log(res);
      var cartResult = template("cart-template", { rows: res });
      $("#product-items").html(cartResult);
    }
  })
}

// 删除一条数据从购物车
var delCartData = function (arr) {
  $.ajax({
    type: 'GET',
    url: '/cart/deleteCart',
    data: {
      id: arr
    },
    success: function (res) {
      console.log(res);
    }
  })
}


// 更新购物车数据
var updateCartData = function(id,size,num){
  $.ajax({
    type: 'POST',
    url: '/cart/updateCart',
    data: {
      id:id,
      size: size,
      num: num
    },
    success:function(res){
      // console.log(res);
      if(res.success == true) {
        mui('#refreshContainer').pullRefresh().pulldownLoading();
      }
    }
  })
}