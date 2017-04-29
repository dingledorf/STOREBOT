if(window.location.href == "https://shop.exclucitylife.com/products.json") {
	var clearId = setInterval(function() {
		console.clear();
	}, 5000);		
	
	var intervalId = setInterval(function() {
		$.ajax({
		  'url': 'https://shop.exclucitylife.com/products.json',
		  'dataType': 'json',
		  'success': function(data) {			  
			  var products = data.products.slice(0, 7);			  
			  $.each(products, function(i, product) {			
				console.log(product);				
				//916832-710 555088-007 881109-104 CP9366
			    if( (product.body_html && product.body_html.includes("CP9366"))
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
						  if(x.status == 429) {
							console.log("You're banned");							
						  }
						  if(x.status == 422) {
							console.log("Sold out");
						  }
						  clearInterval(clearId);
						  clearInterval(intervalId);
					  }
				  })
				  return false;
				}				
			  })		  
		  }
		});
	}, 2000);	
}