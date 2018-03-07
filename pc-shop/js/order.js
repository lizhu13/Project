var oOrder = document.querySelector('#order');
var oGoods = document.querySelector(".order-goods");
myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {token: localStorage.token}, function(err, responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    var data = json.data;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        //遍历商品列表，拼装HTML
        var goodsHTML = '';
        //一件商品的总价
        //console.log(obj.goods_list);
        for (var j = 0; j < obj.goods_list.length; j++) {
            var goods = obj.goods_list[j];
            goodsHTML += `<div>
          <img src="${goods.goods_thumb}">	
          <p class="shop-name">${goods.goods_name}</p>
          <p>单价：${goods.goods_price}元</p>
          <p>数量：${goods.goods_number}</p>
          <p>小计：${goods.goods_price * goods.goods_number}元</p>
        </div>`;
        }
        //每一个订单
        //console.log(oOrder.innerHTML);
        oOrder.innerHTML += `<li>
                        <div class="title">
                        	<p>订单号:${parseInt(Math.random()*100000000)}${obj.order_id}</p>
                        	<p>收货人：${obj.consignee}</p> 
                        	<p>总价:${obj.total_prices}</p>
                        	<span data-id="${obj.order_id}" class="cancel-order">取消订单</span>
                        </div>
                        <div class="order-goods">
                            ${goodsHTML}
                        </div>
                      </li> `;
    }
});


$("#cancel-order").click(function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className === 'cancel-order') {
        if (!confirm('确认要取消订单吗?')) {
            return;
        }
        var order_id = target.dataset.id;
        myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
            var json = JSON.parse(responseText);
            if (json.code === 0) {
                alert('订单取消成功');
            }
        });
    }
});