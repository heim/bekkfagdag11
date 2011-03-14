// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$('#cacheprogress').text('');
$('#eventlog').text('');

$( window.applicationCache ).bind('checking downloading progress updateready cached noupdate', function( event ){
	if(event.type == "progress") {
		$("#cacheprogress").append(event.type + ": "+ (event.originalEvent.loaded / event.originalEvent.total * 100)  + "%<br />");
	} else {	
		$("#eventlog").append(event.type + "<br />\n");
	}
});

$( window.applicationCache ).bind("updateready", function(event) {
	window.applicationCache.swapCache();
	if(confirm("En nyere versjon av siden eksisterer, laste siden på nytt?")) {
		window.location.reload();
	}
});