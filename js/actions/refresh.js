/**
 * @module refresh
 *
 * @description Show the customer if their cart is empty or how many items
 *   are in it.
 */
define([],function(){

	var DEBUG = true;
	
	function log(m){
		DEBUG && console.log(m);
	}
	
	
	var refreshCartFunc = function(cartData){
		if(cartData.errors) return;
		var count, pluralSingular, text;

		count = cartData.countItems;

		if(count > 1) pluralSingular = 'items';
		else pluralSingular = 'item';
	
		text = count > 0 ? (count + ' ' + pluralSingular) : 'empty';
		 $('#user-cart .countItems').html(text);
	};
	





	var defaultConvertCartFunc = function(cartData){
		 $('#user-cart .countItems').html('empty'); 
	};

	return {
		doAction: refreshCartFunc
	};

});