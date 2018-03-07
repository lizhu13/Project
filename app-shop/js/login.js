$(function () {
  // 功能一: 异步登录

  // 1.获取按钮添加事件
  $(".login-btn").on("tap", function () {
    // 获取序列化好的表单信息
    var formData = $('#form').serialize();
    // console.log(formData);
    // console.log(1);
    // 2.发起ajax请求
    $.ajax({
      type: 'POST',
      url: '/user/login',
      // 序列化表单  username  password
      // 就是把form中表单中的数据变成 key=value&key=value的形式
      // 而这个形式正是http要求传给后台的数据格式
      // data: {
      //   username: 取用户输入的用户名
      //   password: 取用户输入的密码
      // },
      data: formData,
      // 3.判断一下参数是否填写
      beforeSend: function () { 
        if($("[name='username']").val() == '') {
          mui.toast("请输入用户名");
          return false;
        }

        // : 伪类选择器的标志
        // :: 伪元素选择器的标志
        // [] 属性选择器的标志
        // 选中含有href属性且值为javascript的a标签
        // a[href="javascript"] {
        // }

        if($("[name='password']").val() == '') {
          mui.toast("密码不能为空");
          return false;
        }
      },
      // 4.回跳到别的页面
      success: function (res) { 
        if(res.error == 403) {
          mui.toast(res.message);
        }

        if(res.success == true) {
         
          var url = new URLSearchParams(location.search);
          // console.log(url);
          // 下面的字符串叫做url
          // http://localhost:3000/mobile/user/login.html?returnUrl=http://localhost:3000/mobile/user/index.html
          // url中问号及问号后面的叫search
          // url中问号后面的SearchParams 叫搜索参数
          var returnURL = url.get("returnUrl");
          // console.log(returnURL);
          if(!returnURL) {
            // 如果回跳地址参数 我就跳到个人中心
            location.href = '../center.html';
          }else {
            // 如果有地址参数  那么就跳到地址参数那个地址
            location.href = returnURL;
          }
        }
      }
    })
  })



})