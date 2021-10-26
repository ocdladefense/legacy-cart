define(["all/modules/cart/js/cart",
"all/modules/cart/js/salesforce/visualforce-actions"],function(cart,vfActions){

	var DEBUG = true;
	
	function log(m){
		DEBUG && console.log(m);
	}
	
	
	function removeItem(opportunityLineItemId) {
		var choice; 


		vfActions.removeItem(null, {opportunityLineItemId:opportunityLineItemId}).then(function(){
			window.location.reload(true);
		}).catch(function(error){
			alert('Woops!  There was an error trying to remove that item.');
		});

		return false;
	}


	return {
		doAction: removeItem
	};

});