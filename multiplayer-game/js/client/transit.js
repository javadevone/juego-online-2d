function transit(mapName, destX, destY, x, y, width, height) {
	this.mapName = mapName;
	this.destX = destX;
	this.destY = destY;
	this.area = new rectangle(x, y, width, height);
}