var canvas = {
	hTiles: 23,
	vTiles: 15,
	canvas: null,
	ctx: null,
	image: null,
	startCanvas: function() {
		canvas.canvas = document.getElementById('canvas');
		canvas.ctx = canvas.canvas.getContext('2d');
		canvas.image = new Image();
		canvas.image.src = "img/character.png";
		canvas.image.onload = function() {
			console.log(canvas.image.complete);
		};
	},
	drawRect: function(rect) {
		console.log("surprise");
		canvas.ctx.fillStyle = "#ff0000";
		canvas.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	}
};