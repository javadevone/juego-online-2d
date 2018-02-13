var loader = {
	loaders: [
		mapManager.loadMap("map1"),
		canvas.startCanvas(),
		keyboard.start(),
		mainLoop.loop(),
	],
	startGame: function() {
		loader.chainLoaders(loader.loaders.shift());
	},
	chainLoaders: function(loader) {
		if(loader) {
			loader(() => loader.chainLoaders(loaders.shift()));
		}
	},
	resizeMonitor: function() {
		window.addEventListener("resize", function(e){
			let width = window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth;
			let height = window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			loader.placeElementsInFlow();
		});
	},
	placeElementsInFlow: function() {
		let rect = document.getElementById("game-placer").getBoundingClientRect();
		document.getElementById("map").style.top = rect.y + "px";
		document.getElementById("map").style.left = rect.x + "px";
		document.getElementById("canvas").style.top = rect.y + "px";
		document.getElementById("canvas").style.left = rect.x + "px";
	}
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("surprise motherfucker");
	loader.placeElementsInFlow();
	loader.resizeMonitor();
	loader.startGame();
}, false);