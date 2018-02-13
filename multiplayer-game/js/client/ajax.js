var ajax = {
	loadFile: function(path, dataHandler) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			/*
			0 / UNSENT
			1 / OPENED
			2 / HEADERS_RECIEVED
			3 / LOADING
			4 / DONE
			*/
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status == 200) {
					dataHandler(JSON.parse(request.responseText));
				} else if (request.status == 400) {
					console.log("error");
				} else {
					console.log("resultado inesperado");
				}
			}
		};
		
		request.open("GET", path, true);
		request.send();
	}
}