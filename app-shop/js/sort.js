// 1.请求一级分类列表
// 1.1 当页面进入的时候要请求一级分类 发起ajax请求（记住要看接口文档）
$(function () {
  getFirstCategoryData();

  // 点击一级分类的某一个li 让当前li变红色 其他li不变色
  // 步骤:
  // 1.绑定事件  怎么绑定事件
  // $("li").on("click",function(){
  //   console.log(1);
  // })

  $("ul").on("click", 'li', function () {
    // console.log(1);
    // 2.清除li上的所有的active类名
    $("li").removeClass("active");
    // 3.给当前的li添加active类名
    $(this).addClass("active");
    // 4.获取当前元素的子元素a标签上的data-id值  node.dataset.自定义的名字 相当于 data("自定义的名字")
    var id = $(this).find('a').data('id');
    // console.log(id);
    // 5.把id传递给二级分类的方法
    getSecondCategoryData(id);
  })

  // 右侧回弹
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

})

// 请求一级分类的方法
var getFirstCategoryData = function () {
  $.ajax({
    url: '/category/queryTopCategory',
    method: 'GET',
    beforeSend:function(){
      $(".loading").show();
    },
    success: function (res) {
      // 
      // console.log(Array.isArray(res));
      // 1.2 json--直接变成对象
      // console.log(res);
      // 1.3 使用模板引擎(先写模板) 绑定模板  把绑定好的数据添加到页面上
      // res要求必须是对象
      var firstResult = template('first-template', res);
      // console.log(firstResult);
      $(".first-category").html(firstResult);

      // 获取rows中第0个元素的id  因为当页面载入 一级分类就会被加载
      //  同时 第一个一级分类已经被选中  因此 二级分类也要对应加载
        var id = res.rows[0].id;
        // console.log(id);
        getSecondCategoryData(id);
    },
    complete:function(){
      $(".loading").hide();
    }
  })
}


// 2.请求二级分类列表
// 2.1 声明一个方法
var getSecondCategoryData = function (id) {
  // 2.2 发起ajax请求(查询 参数)
  $.ajax({
    method: 'GET',
    url: '/category/querySecondCategory',
    data: {
      id:id
    },
    success: function (res) {
      // 2.3 接受数据
      console.log(res);
      // 2.4 写模板
      // 2.5 套模板
      var secondResult = template("second-template",res);
      // 2.6 把绑定好的数据添加到页面中
      // console.log(secondResult);
      $(".second-category").html(secondResult);
    }
  })

}
