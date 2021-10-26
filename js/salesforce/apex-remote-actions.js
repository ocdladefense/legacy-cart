define([],function(){


	/**
	 * @setData,
	 *
	 * @description, sets the <data> property of the ClickpdxCartItem
	 *	object corresponding to <opportunityLineItemId.  Any previous value of <data>
	 *	is overwritten.
	 *
	 *	@param, opportunityLineItemId
	 *		The Id of the Opportunity Product record to update.
	 *
	 *	@param, data
	 *		The data, a serialized JSON string to be saved into the OpportunityLineItem.Data__c field.
	 */
	function setData(opportunityLineItemId,data){
		return new Promise(function(resolve,reject) {
			ClickpdxShoppingCart.updateCartItemData(opportunityLineItemId,data,function(result, event){
				console.log(result);
				console.log(event);
				if(event.status) {
					resolve(result);
				} else {
					reject(event)
				}
			}, 
			{escape: true});
		});
	}

	
	


	function addItem(pricebookEntryId){
		var cartId = Cookies.get('apex__shoppingCartId');
		var params = {
			oppLineItemId: null,
			clientId: null,
			pricebookEntryId: pricebookEntryId,
			quantity: 1,
			firstName: null,
			lastName: null,
			email: null,
			price: null,
			data: null
		};
	
		if(!cartId) throw new Error("Cart Id is not set.");
	
		return new Promise(function(resolve,reject) {
			ClickpdxShoppingCart.addToCart(cartId,params,function(result, event){
				console.log(result);
				console.log(event);
				if(event.status) {
					resolve(result);
				} else {
					reject(event)
				}
			}, 
			{escape: true});
		});
	}   


	function persist() {
		return new Promise(function(resolve,reject){
			ClickpdxShoppingCart.persistCartRemote(function(result, event){
				if (event.status) {
					resolve(result);
				} else {
					reject(event);
				}
			}, 
			{escape: true});
		});
	}



	function removeItem(lineId) {
		return new Promise(function(resolve,reject){
			ClickpdxShoppingCart.removeCartItem(lineId,function(result, event){
				if (event.status) {
					console.log(result);
					resolve(result);
				} else {
					alert('Oops!  There was an error.');
					console.log(event);
					reject(event);
				}
			}, 
			{escape: true});
		});
	}


	
	return {
		addItem: addItem,
		removeItem: removeItem,
		setData: setData,
		persist: persist
	};
	
});