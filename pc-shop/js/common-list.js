//实现页面分类列表导航功能
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
    for(var i=0;i<response.data.length;i++){
        $("#goodsListUl").append('<li><a href="list.html?cat_id=' +response.data[i].cat_id+ '">' +response.data[i].cat_name+ '</a></li>');
    }
});