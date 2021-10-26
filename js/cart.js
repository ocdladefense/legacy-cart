define([],function(){
			
			// List of functions to be executed after a product is added to the cart.
	var cartComplete = [];
			
	var cartRefresh = [];
	
	var cartConvert = [];
			
	var addToCartHandler;
			
	var removedHandler = false;
			
			
	var onComplete = function(f){
		cartComplete.push(f);
	};
	
	var removeHandler = function(cb){
		for(var i = 0; i<cartComplete.length; i++){
			if(cb == cartComplete[i]) {
				return cartComplete.splice(i,1);
			}
		}
		
		return false;
	};
			
			
	var onRefreshCart = function(f){
		cartRefresh.push(f);
	};
	
	
	
	var onConvertCartComplete = function(f){
		cartConvert.push(f);
	};
			

	var getCallbacks = function(action){
		
	};

			
	var addToCartComplete = function(responseData,request,event,data){
		responseData = responseData!=null&&responseData!=''?responseData:{};
		for(var i=0;i<cartComplete.length;i++){
				cartComplete[i](responseData,request,event,data); 
		}
		
		return false;
	};
			
	var refreshCartComplete = function(responseData,request,event,data){
			try {
					responseData = responseData!=null&&responseData!=''?responseData:{};
					for(var i=0;i<cartRefresh.length;i++){
						cartRefresh[i](responseData,request,event,data); 
					}
			} catch(e){
				console.log(e);
			}
			return false;
	};
	
	var convertCartComplete = function(responseData,request,event,data){
			try {
					responseData = responseData!=null&&responseData!=''?responseData:{};
					for(var i=0;i<cartConvert.length;i++){
							cartConvert[i](responseData,request,event,data); 
					}
			} catch(e){
				console.log(e);
			}
			return false;
	};
			

			
	var cart = {
		onComplete: onComplete,
		onRefreshCart: onRefreshCart,
		addToCartComplete: addToCartComplete,
		onConvertCartComplete: onConvertCartComplete,
		refreshCartComplete: refreshCartComplete,
		convertCartComplete: convertCartComplete,
		removeHandler: removeHandler,
		setAddToCartHandler: function(cb) {
			var previous = addToCartHandler;
			window.theHandler = addToCartHandler = cb;
			!removedHandler && document.addEventListener("click",addToCartHandler,true);
			return previous;
		},
		getAddToCartHandler: function(){
			return addToCartHandler;
		},
		removeAddToCartHandler: function(){
			removedHandler = true;
			document.removeEventListener("click",addToCartHandler,true);
		}
	};
	
	return cart;
});