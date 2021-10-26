(function(window,undefined){

	window.OCDLA = {};
	
	let config = {};
	
	let testDomains = ["ocdpartial-ocdla.cs217.force.com","membertest.ocdla.org","ocdla--ocdpartial--clickpdxorder.visualforce.com"];
	
	let prodDomains = ["ocdla.force.com","members.ocdla.org","ocdla--clickpdxorder.na159.visual.force.com"];
	
	
	let production = {
		storeCookieId: 'apex__00D6300000097I4EAI-fonteva-shopping-cart',
		// 		storeCookieId: 'apex__00Dj0000001okn9EAA-fonteva-shopping-cart', Production
		defaultCatalogId: 'a0lj0000000B7FTAA0', // A 'click' event is generated on this element (li > a.defaultCatalogId) so that this catalog is rendered by default; in the future store the user's active catalog in a cookie value so this can be persisted.
		publicationCatalog: 'a0lj0000000B7FTAA0',
		
		domain: 'members.ocdla.org',
		
		businessDomain: 'www.ocdla.org',
		
		useForms: true
	};
	
	
	let test = {
		storeCookieId: 'apex__00D6300000097I4EAI-fonteva-shopping-cart',
		// 		storeCookieId: 'apex__00Dj0000001okn9EAA-fonteva-shopping-cart', Production
		defaultCatalogId: 'a0lj0000000B7FTAA0', // A 'click' event is generated on this element (li > a.defaultCatalogId) so that this catalog is rendered by default; in the future store the user's active catalog in a cookie value so this can be persisted.
		publicationCatalog: 'a0lj0000000B7FTAA0',
		
		domain: 'membertest.ocdla.org',
		
		businessDomain: 'test.ocdla.org',
		
		useForms: true
	};

	
	// Set some alternate settings if on Test.
	if(testDomains.includes(window.location.hostname)) {
		config = test;
	} else if(prodDomains.includes(window.location.hostname)) {
		config = production;
	} else {
		console.log('WARNING: setting for hostname, '+window.location.hostname+', not found.');
	}
	
	OCDLA.domain = config.domain;
	
	OCDLA.addLibrary = function(ns,lib){
		this[ns] = lib;
	};
	
	OCDLA._get = function(name){
		return config[name]||null;
	};
	
	OCDLA._set = function(name,val){
		config[name] = val;
	};
	
	OCDLA.pageName = function(){
		return window.location.pathname;
	};



})(window,undefined);