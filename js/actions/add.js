define(["all/modules/cart/js/salesforce/visualforce-actions"],function(vfActions){

	var DEBUG = true;
	
	function log(m){
		DEBUG && console.log(m);
	}


	function buttonAction(pricebookEntryId, qty) {
		return vfActions.addItem(pricebookEntryId,qty);
	}
	
	return {
		doAction: buttonAction
	};


});