//判断当前用户是否已经登录，如果已经登录显示用户名，否则显示登录注册的a标签
if( localStorage.getItem("token") ){
    $(".login").html("用户名是：" + localStorage.getItem("username") + "<button id='clear'>取消登录</button>")
}

$("#clear").click(function(){
    localStorage.clear();  //清除所有数据了！
    $(".login").html('<a href="register.html">注册</a><a href="login.html">登录</a>');
});
