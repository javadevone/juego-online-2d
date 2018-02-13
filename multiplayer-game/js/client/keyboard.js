var keyboard = {
	keys: new Array(),
	start: function() {
		document.onkeydown = keyboard.saveKey;
		document.onkeyup = keyboard.removeKey;
	},
	saveKey: function(e) {
		if(keyboard.keys.indexOf(e.key) == -1) {
			keyboard.keys.push(e.key);
		}
	},
	removeKey: function(e) {
		var index = keyboard.keys.indexOf(e.key);
		if(index != -1) {
			keyboard.keys.splice(index, 1);
		}
	},
	keyPressed: function(keyCode) {
		return (keyboard.keys.indexOf(keyCode) !== -1) ? true : false;
	}
};