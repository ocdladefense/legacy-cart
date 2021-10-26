/**
 * @module persist
 *
 * @description Save the cart.
 */
define(["all/modules/cart/js/salesforce/visualforce-actions",
"all/modules/cart/js/salesforce/apex-remote-actions"],function(vfActions,apexActions){

	var DEBUG = true;
	
	function log(m){
		DEBUG && console.log(m);
	}
		
	function isValidCartId(cartId){
		if(!cartId){
			return false;
		}
		return !(null == cartId || '' == cartId.trim());
	}
	
	function hideCartStatus(){
		$('div[id*="shoppingCartStatus"]').hide();
	}
	
	function saveCart(userAgent, cartId){
		if(!cartId){
			log("CartId is not set; about to get new CartId.");
		} else {
			log('Persisting cart... JS cartId is: '+cartId);
		}
		
		if(!isValidCartId(cartId)) {
			apexActions.persist().then(function(resp){
				log(resp);
				hideCartStatus();
				Cookies.set('apex__shoppingCartId', resp, { expires: 30 });
			});
		} else {
			persistCart(userAgent);
			hideCartStatus();
		}
	}


	return {
		doAction: saveCart
	};

});