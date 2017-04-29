if(window.location.href == "https://shop.exclucitylife.com/products.json") {
	setInterval(function() {
		$.ajax({
		  'url': 'https://shop.exclucitylife.com/products.json',
		  'dataType': 'json',
		  'success': function(data) {			  
			  var products = data.products.slice(0, 10);			  
			  $.each(products, function(i, product) {			
				console.log(product);				
				//916832-710 555088-007
			    if( (product.body_html && product.body_html.includes("555088-007"))
				  ) {
				  var option = "2";
				  $.each(product.options, function(i, x) {
					if(x.name.match(/size/i)) {
						option = x.position.toString();
						return false;
					}
				  });
				  var variant = product.variants[0].id;
				  $.each(product.variants, function(i, v) {
					 if(v["option" + option] == "8") {
						 variant = v.id;
						 return false;
					 }
				  });
				  $.ajax({
					  'url': 'https://shop.exclucitylife.com/cart/add.js',
					  'method': 'POST',
					  'data': 'id=' + variant + "&quantity=" + "1",
					  'complete': function(x) {
						  console.log(x);
						  if(x.status == 200) {
							window.location.assign('https://shop.exclucitylife.com/checkout');
						  }						  
					  }
				  })
				  return false;
				}				
			  })		  
		  }
		});
	}, 1000);	
	setInterval(function() {
		console.clear();
	}, 5000);	
}