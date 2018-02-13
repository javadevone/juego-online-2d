var popup = {
	active: false,
	generatePopUp: function(x, y, message) {
		if(!popup.active) {			
			document.getElementById("popup").style.width = 500 + "px";
			document.getElementById("popup").style.left = dimensions.width / 2 - 500 / 2 + "px";
			document.getElementById("popup").style.top = y + "px";
			document.getElementById("popup").style.textAlign = "center";
			
			
			document.getElementById("popup").style.visibility = "visible";
			document.getElementById("popup").innerHTML = message;
			popup.active = true;
		}		
	},
	destroyPopUp: function() {
		if (popup.active) {
			document.getElementById("popup").style.visibility = "hidden";
			document.getElementById("popup").innerHTML = "";
			popup.active = false;
		}
	}
};