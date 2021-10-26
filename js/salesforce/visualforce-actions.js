define(["all/modules/cart/js/cart"],function(cart){

	/**
	 * @function addItem Adds a Product to the customer's cart.
	 *
	 * @param {Id} pricebookEntryId Related Id for the Product to be added.
	 * @param {integer} quantity How many of the Product to add to the cart.
	 */
	function addItem(pricebookEntryId,quantity,data){
		return new Promise(function(resolve,reject){
			var fn = function cb(response,request,event,data){
				if(response.errors){
					reject(response);
					cart.removeHandler(cb);
				} else {
					resolve(response);
					cart.removeHandler(cb);
				}
			};
			cart.onComplete(fn);
			
			if(!data) {
				addToCart(pricebookEntryId,quantity);
			} else {
				addDataToCart(pricebookEntryId,quantity,data);
			}
		});
	}
	
	
	/**
	 * @function addDonation Adds a Donation Product to the customer's cart.
	 *
	 * @param {Id} pricebookEntryId Related Id for the Product to be added.
	 * @param {Decimal} price The donation amount.
	 */
	function addDonation(pricebookEntryId,price){
		var clientId, firstName, lastName, email, quantity;
		quantity = 1.0;
		clientId = null;
		firstName = null;
		lastName = null;
		email = null;
		
		return new Promise(function(resolve,reject){
			var fn = function cb(response,request,event,data){
				if(response.errors){
					reject(response);
					cart.removeHandler(cb);
				} else {
					resolve(response);
					cart.removeHandler(cb);
				}
			};
			cart.onComplete(fn);
			addToCart(pricebookEntryId,quantity,clientId,firstName,lastName,email,price);
		});
	}
	

	
	function updateItem(clientId,params,data){
		var opportunityLineItemId = params.opportunityLineItemId;
    var pricebookEntryId = params.pricebookEntryId;
    var quantity = params.quantity;
    var contactId = params.contactId;
    var firstName = params.firstName;
    var lastName = params.lastName;
    var email = params.email;
    var license = params.license;
    // data = data || '{}';// workaround while form callback is being finalized.

		return new Promise(function(resolve,reject){
			var fn = function cb(response,request,event,data){

				if(500 == request.status){
					// request.abort();
					reject({errors:true, message: request.getError()});
					cart.removeHandler(cb);
				} else if(response.errors){
				
					reject(response);
					cart.removeHandler(cb);
				} else {

					resolve(response);
					cart.removeHandler(cb);
				}
			};
			
			cart.onComplete(fn);
			updateCartItem(clientId,opportunityLineItemId,pricebookEntryId,quantity,contactId,firstName,lastName,email,license,data);
		});
	}
	
	
	


	function removeItem(clientId,params){

		var opportunityLineItemId = params.opportunityLineItemId;

		return new Promise(function(resolve,reject){
			var fn = function cb(response,request,event,data){
				console.log(response);
				console.log(request);
				console.log(event);
				// console.log(data);
				if(response.errors){
					cart.removeHandler(cb);
					reject(event);
				} else {
					cart.removeHandler(cb);
					resolve(response);
				}
			};
			cart.onComplete(fn);
			removeFromCart(opportunityLineItemId,clientId);
		});
	}	





	
	return {
		addItem: addItem,
		addDonation: addDonation,
		updateItem: updateItem,
		removeItem: removeItem
	};
	
});