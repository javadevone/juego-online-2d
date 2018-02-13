function rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

rectangle.prototype.intersects = function(rectangle) {
	return (
		this.x < rectangle.x + rectangle.width &&
		this.x + this.width > rectangle.x &&
		this.y < rectangle.y + rectangle.height &&
		this.height + this.y > rectangle.y) ? true : false;
}

