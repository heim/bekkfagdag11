var cache = {
	showCacheEvents: function(){
		$(window.applicationCache).bind(
			'checking downloading progress updateready cached noupdate error', 
			function(event) {
				$("#eventlog").append(event.type + "<br />");
			});
	}
}


$(function() {
	cache.showCacheEvents();
});



  
  
  
 
  

