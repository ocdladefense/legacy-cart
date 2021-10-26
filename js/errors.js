
(function(){

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this; 

    // Create a reference to this
    var _ = new Object();

    var isNode = false;



	var fn = {
		
		showError: function(resp){
			console.log(resp);
			var title, content;
			var modal = new Modal();
			if(resp.errorType == "ClickpdxPermissionError") {
				title = "<h2>Login Required</h2>";
			} else title = "<h2>Error</h2>";
			modal.html(title + "<p>"+resp.message+"</p>");
			modal.show();
		},
		
		handleEvent: function(e){
			this.showError(e.detail);
		}
			
	};


	document.addEventListener("CartError",fn,true);

	// Export the Underscore object for **CommonJS**, with backwards-compatibility
	// for the old `require()` API. If we're not in CommonJS, add `_` to the
	// global object.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = fn;
		// root._ = _;
		isNode = true;
	} else {
		define([],function(){ return fn; })
	}

})();