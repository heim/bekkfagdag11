var cache = {
	showCacheEvents: function(){
		$(window.applicationCache).bind(
			'checking downloading progress updateready cached noupdate error', 
			function(event) {
				$("#eventlog").append(event.type + "<br />");
			});
	},
	
	alertWhenNewCache: function(){
		$(window.applicationCache ).bind("updateready", function(event) {
			window.applicationCache.swapCache();
			if(confirm("En nyere versjon av siden eksisterer, laste siden på nytt?")) {
				window.location.reload();
			}
		});
	}
}


$(function() {
	cache.showCacheEvents();
	cache.alertWhenNewCache();
});



  
  
  
 
  

