var theMods = [
	"all/modules/cart/js/cart",
	"all/modules/cart/js/actions/add",
	"all/modules/cart/js/actions/remove",
	"all/modules/forms/form-manager"
];



define(theMods,function(cart,addAction,removeAction,FormManager){


	
	var DEBUG = false;
	
	function log(m){
		DEBUG && console.log(m);
	}

	// Can set/get the cart's add handler
	console.log("Setting add to cart handler.");



	var cartActions = {
	
		remove: 	function(lineId) {
			var choice, promise;
			
			choice = confirm('Really remove this product from your cart?');

			if(choice){
				promise = removeAction.doAction(lineId);
			}
			
			return promise;
		},
		
		add: 	function(entryId) {
			log("Will add ot cart...");
			var qtySelector = ".product-option-add-to-cart-"+entryId+" input";
			var qty = $(qtySelector).size() > 0 ? $(qtySelector).val() : "1.0"; 
			
			return addAction.doAction(entryId,qty);
		},
		
		// Cb should be determined based on the currently executing add-to-cart pricebookEntryId
		forms: function(manager,entryId,cb) {
			// m.setHandler(getUpdateFunc(item.opportunityLineItemId));
			console.log(manager);
		
			modal = modal || new Modal();		

			if(OCDLA._get("useForms") && manager.hasForms()) {
				console.log(manager.loaded());
				manager.loaded().then(function(){
					var first = manager.getFirst();
					modal.append(first.render());
					modal.setHandler(first.getHandler());
					modal.addActions(first.buttons());
					modal.show();
				});
			}
		},
		
		error: function(resp) {
			modal.html("<h2>OCDLA Cart Error</h2><p>"+resp.message+"</p>");
			modal.show();
		}
		
	};


	var handleEvent = function(e) {

		var availableActions = ["remove","add-to-cart"];
		var target = e.target;
		var parent = target.parentNode;
		var action = (target.dataset && target.dataset.action) || null;
		var $buttonSelector;
		var promise;
		var lineId, entryId; // lineId = OpportunityLineItem
		
		
		if(null == action) return false;
		
		
		if(availableActions.indexOf(action) == -1){
			return false;
		}
		
		
		
		// REMOVE A PRODUCT
		if(target.getAttribute("class") == "remove-opportunity-line-item") {
			e.preventDefault();
			lineId = target.dataset.opportunityLineItemId;
			promise = cartActions.remove(lineId);
			
			return false;
		}


		// ADD A PRODUCT
		entryId = target.dataset.pricebookEntryId;
		$buttonSelector = $("#add-to-cart-button-wrapper-"+entryId);

		if("add-to-cart" == action ) {
		
			$buttonSelector.addClass('loading');
			promise = cartActions.add(entryId);
		}
		
		
		if(!promise) return false;
		log(promise);
		
		promise.then(function(resp){
			$buttonSelector.removeClass('loading');
			return resp;
		})
		.catch(function(resp) {
			$buttonSelector.removeClass('loading');
			
			if(resp.errorType == "ClickpdxShoppingCartInvalidFormException"){
				var manager = FormManager.newFromCartResponse(resp);
				cartActions.forms(manager, entryId);	
				return false;	
			}

			
			cartActions.error(resp);
		});
		
		return false;
	};


	cart.setAddToCartHandler(handleEvent);

	window.removeCart = function(){
		document.removeEventListener("click",handleEvent,true);
	};












	
	
	function hideCartStatus(){
		$('div[id*="shoppingCartStatus"]').hide();
	};
			
	var showCartStatus = function(){
		$('div[id*="shoppingCartStatus"]').show();
	};

	function cartUiSuccess(pricebookEntryId){
		$('#add-to-cart-button-'+pricebookEntryId).addClass('cart-item-added');
		$('#add-to-cart-button-wrapper-'+pricebookEntryId).removeClass('loading');
		$('#add-to-cart-button-'+pricebookEntryId).text('Item Added');
	}

	function cartUIReset(pricebookEntryId){
		$('#add-to-cart-button-wrapper-'+pricebookEntryId).removeClass('loading');
	}


},function(err){
	console.log(err);
});