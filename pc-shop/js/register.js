//用户名验证是否重复
$('input[name="username"]').blur(function(){
    var username = $('input[name="username"]').val();
//				console.log(username);

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data": {
            "status": "check",
            "username": username
        },
        "success": function(response){
//						console.log(response);

            if(response.code === 0){
                //成功
                $(".success").show();
                $(".error").hide();
            }else{
                $(".error").show();
                $(".success").hide();
            }
        }
    });
});


//注册的验证
$("#reg").click(function(){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

//				console.log(username,password);

    if(password.length < 6 || password.length > 20){
        alert("密码长度应该是6-20位之间");
        return;
    }

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data": {
            "status": "register",
            "username": username,
            "password": password
        },
        "success": function(response){
            console.log(response);

            if(response.code === 0){
                alert("注册成功！~");
                window.location.href = "login.html";
            }
        }
    });
});