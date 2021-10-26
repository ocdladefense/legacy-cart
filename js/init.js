/**
 * 
 *
 */
var mods = [
	"require",
	"libs",
	"all/modules/cart/js/cart",
	"all/modules/cart/js/ui",
	"all/modules/cart/js/actions/refresh",
	"all/modules/cart/js/actions/persist"];


globalScripts(mods,function(require,libs,cart,cartUi,refreshAction,persistAction){


		var event = libs.getModule("event");
		// var modal = libs.getModule("modal");
		event.domReady(function(){
			modal.attach();
		});
		
		window.vfCartActionFunctionComplete = function(action,request,event,data,response){
			if(["refresh","persist"].indexOf(action) != -1){
				cart.refreshCartComplete(response);
			} else if(action == "remove"){
				cart.addToCartComplete(response,request,event,data);
			} else if(action == "convertCart") {
				cart.convertCartComplete(response,request,event,data);
			} else {
				cart.addToCartComplete(response,request,event,data);
			}
			
			return false;
		}
		/**
		 * @description - 
		 *  Setup the action when customers click on "Add to cart."  This is the main callback to be executed when the addToCart() <actionFunction> method has returned.  The callback handles successes and errors.
		 * 	 + Also make sure any add-to-cart buttons are clickable.
		 *	
		 *	@edited - 2019-04-18
		 *
		 *	@author - José Bernal
		 */
	 
		var defaultComplete = function(response,request,event,data){
				// make default cart messages disappear
				console.log(response);

				$('div[id*="shoppingCartStatus"]').addClass('fade-out');
				setTimeout(function(){$('div[id*="shoppingCartStatus"]').css({display:'none'}).removeClass('fade-out');},2000);
		};
	

	
		cart.onComplete(defaultComplete);
		cart.onComplete(refreshAction.doAction);
		cart.onRefreshCart(refreshAction.doAction);
	
	
		event.domReady(function(){
			var userAgent = navigator.userAgent || 'Unknown';
			var cartId = Cookies.get('apex__shoppingCartId');
			persistAction.doAction(userAgent,cartId);
		});

		/**
			*
			if(error && errorType != "ClickpdxShoppingCart.ClickpdxShoppingCartInvalidFormException") {
				jQuery('.product-option-wrapper .loading').removeClass('loading');             	   
				var msg = "<p style='font-weight:bold;'>There was an error adding this item to your Cart:</p>"+message;
	
				modal.html(msg);
				modal.show();
		
			*/
		
		
		/**
			* @method, A4J.AJAX.onError
			*
			* @see also:
		https://docs.jboss.org/richfaces/latest_4_X/Component_Reference/en-US/html/chap-Component_Reference-Common_Ajax_attributes.html#sect-Component_Reference-Events_and_JavaScript_interactions-onerror
		// https://access.redhat.com/documentation/en-US/Red_Hat_JBoss_Portal/5.1/html/Reference_Guide/sect-Reference_Guide-Developing_Portlets_with_the_Bridge-Custom_Ajax_Error_Handling.html
			*
			*/
		event.domReady(function(){
			A4J.AJAX.onError = function(req,status,message){
				console.log(req);
				// console.log(status);
				// console.log(message);
				// var domresponse = req.getResponseText();
				req.status = status;
				cart.addToCartComplete({errors:true,message:req.getError()},req);//,event,data);
				return false;
			
			
				// Default error handling text in A4J.AJAX.XmlHTTPRequest.prototype._onerror 
				// here for posterity
				/*
					if(status!=599 && req.getResponseText() && !req.options.ignoreasyncerrors){
						A4J.AJAX.replacePage(req);
					}
				*/
			};
		});
	
	
	

	});