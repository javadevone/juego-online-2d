function player(x, y) {
	this.area = new rectangle(x - 2, y - 2, dimensions.spriteWidth + 4,
		dimensions.spriteHeight + 4);
	this.speed = 3;
	
	this.limitTop = new rectangle(x + dimensions.spriteWidth / 3, y, dimensions.spriteWidth / 3, 1);
	this.limitBottom = new rectangle(x + dimensions.spriteWidth / 3, y + dimensions.spriteHeight - 1, dimensions.spriteWidth / 3, 1);
	this.limitLeft = new rectangle(x, y + dimensions.spriteHeight / 3, 1, dimensions.spriteHeight / 3);
	this.limitRight = new rectangle(x + dimensions.spriteWidth - 1, y + dimensions.spriteHeight / 3, 1, dimensions.spriteHeight / 3);
	
	//direcciones: 1 = arriba, 2 = derecha, 0 = abajo, 3 izquierda
	//animacion: 0 = quieto, 1 y 2 movimiento
	this.moving = false;
	this.direction = 0;
	this.animationPhase = 0;
	this.animationCounter = 0;
}

player.prototype.update = function(x, y) {
	this.area = new rectangle(x, y, dimensions.spriteWidth, dimensions.spriteHeight);
	
	this.limitTop = new rectangle(x + dimensions.spriteWidth / 3, y, dimensions.spriteWidth / 3, 1);
	this.limitBottom = new rectangle(x + dimensions.spriteWidth / 3, y + dimensions.spriteHeight - 1, dimensions.spriteWidth / 3, 1);
	this.limitLeft = new rectangle(x, y + dimensions.spriteHeight / 3, 1, dimensions.spriteHeight / 3);
	this.limitRight = new rectangle(x + dimensions.spriteWidth - 1, y + dimensions.spriteHeight / 3, 1, dimensions.spriteHeight / 3);
}

player.prototype.draw = function() {
	let directionPixel = dimensions.spriteWidth * this.direction; 
	
	
	if (this.animationCounter <= 15 || (this.animationCounter > 30 && this.animationCounter <= 45)) {
		this.animationPhase = 1;
	}
	if ((this.animationCounter > 15 && this.animationCounter <= 30 ) || this.animationCounter > 45) {
		this.animationPhase = 2;
	}
	
	let animationPixel = dimensions.spriteWidth * this.animationPhase;
	
	canvas.ctx.drawImage(canvas.image, directionPixel, animationPixel, 32, 32, mapManager.player.area.x, mapManager.player.area.y, 32, 32);
}