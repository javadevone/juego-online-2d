var mapManager = {
	currentMap: null,
	loadingMap: false,
	imageLoaded: false,
	player: new player(226, 352),
	loadMap: function(mapName) {
		mapManager.loadingMap = true;
		let mapPath = "maps/" + mapName + ".json.tmx";
		let imagePath = "maps/" + mapName + ".png";
		document.getElementById("map").src = imagePath;
		document.getElementById("map").onload = function() {
			mapManager.imageLoaded = true;
			console.log("imagen cargada");
		};
		ajax.loadFile(mapPath, mapManager.startMap);
	},
	startMap: function(JSONObject) {
		mapManager.currentMap = new map(JSONObject);
		mapManager.loadingMap = false;
	}
};