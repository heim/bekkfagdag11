var cache = {
	alertWhenNewCache: function(){
		$(window.applicationCache ).bind("updateready", function(event) {
			window.applicationCache.swapCache();
			if(confirm("En nyere versjon av siden eksisterer, laste siden på nytt?")) {
				window.location.reload();
			}
		});
	},
	
	showCacheEvents: function(){
		$( window.applicationCache ).bind('checking downloading progress updateready cached noupdate error', function( event ){
			if(event.type == "progress") {
				$("#cacheprogress").append(event.type + ": "+ event.originalEvent.loaded +"/" + event.originalEvent.total  + "<br />");
			} else {	
				$("#eventlog").append(event.type + "<br />\n");
			}
		});
	}
}


var storage = {
	showLocalStorage: function(){
		for(k in window.localStorage) {
			$("#localstoragecontent").append(k + "<br />" + window.localStorage[k] + "<br />");      
		}
	}
}



var notes = {
	retrieve: function(){
		$.retrieveJSON("/notes.json", function(data) {
			$("#notes").html($("#note_template").tmpl(data));
		});
	},
	
	sendPending: function(){
		if (window.navigator.onLine) {
			var pendingNotes = $.parseJSON(localStorage["pendingNotes"]);
	    if (pendingNotes.length > 0) {
	    	var note = pendingNotes[0];
	      $.post("/notes", note.data, function(data) {
	     		var pendingNotes = $.parseJSON(localStorage["pendingNotes"]);
	        pendingNotes.shift();
	        localStorage["pendingNotes"] = JSON.stringify(pendingNotes)
	        setTimeout(notes.sendPending, 100);
	      });
			}
		}
	},
	
	initializePending: function(){
		if (!localStorage["pendingNotes"]) {
	    localStorage["pendingNotes"] = JSON.stringify([]);
	  }
	},
	
	overrideSubmit: function(){
		$("#new_note").submit(function(e) {
			e.preventDefault();
			var pendingNotes = $.parseJSON(localStorage["pendingNotes"]);
	    var note = {"data":$(this).serialize(), "note":{"note_text":$("#note_note_text").val()}};
			$("#note_template").tmpl(note).appendTo("#notes");
	    pendingNotes.push(note);
	    localStorage["pendingNotes"] = JSON.stringify(pendingNotes)
	    $("#note_note_text").val("");
	    notes.sendPending();

	  });
	}
}

$(function() {
  
	$('#cacheprogress').text('');
	$('#eventlog').text('');

	$("#networkstatus").text(window.navigator.onLine ? "Online" : "Offline");

	//cache.alertWhenNewCache();
	//cache.showCacheEvents();

	//storage.showLocalStorage();
	notes.retrieve();
	notes.initializePending();
	notes.overrideSubmit();
	notes.sendPending();
	
  $(window).bind("online", notes.sendPending);
	
	$(window).bind('online offline', function(e) {
		$("#networkstatus").text(window.navigator.onLine ? "Online" : "Offline");
	});
	
});




  
  
  
 
  

