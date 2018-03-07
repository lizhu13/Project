//判断当前用户已登录则提示用户，并跳转到首页，否则显示注册登录页面
if( localStorage.getItem("token") ){
    $("body").html( localStorage.getItem("username") + "您已经登录成功了~请不要重复登录！" );

    setTimeout(function(){
        location.href = "index.html";
    },2000);
}


//登录验证
$("#enter").click(function(){
    //获取用户名和密码
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

    console.log(username,password);

    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "type":"POST",
        "dataType": "json",
        "data": {
            "status": "login",
            "username": username,
            "password": password
        },
        "success": function(response){
            console.log(response);

            //存储一条信息
//						localStorage.setItem("token",response.data.token);

            //当登录成功的时候
            if(response.code === 0){
                //把个人信息存入变量data
                var data = response.data;

                //遍历每一项，prop属性的简写是个变量
                for(prop in data ){

                    //存储到本地仓库，  （属性，数据[属性]）
                    localStorage.setItem(prop,data[prop]);

                }
                //成功后的提示
                alert(response.message);

                //判断有callback则跳转到指定callback页面，如果没有则跳转到首页
                var callbackURL = location.hash.substr(10);

                if( callbackURL ){
                    window.location.href = callbackURL;
                }else{
                    //跳转到首页
                    window.location.href = "index.html";
                }
            }
        }
    })

});