function map(JSONObject) {
	this.transits = [];
	this.shop = null;
	
	this.NWArea = new rectangle(0, 0, 245, 240);
	this.NArea = new rectangle(245, 0, 245, 240);
	this.NEArea = new rectangle(490, 0, 246, 240);
	this.SWArea = new rectangle(0, 240, 245, 240);
	this.SArea = new rectangle(245, 240, 245, 240);
	this.SEArea = new rectangle(490, 240, 246, 240);	
	
	this.gridNW = [];
	this.gridN = [];
	this.gridNE = [];
	this.gridSW = [];
	this.gridS = [];
	this.gridSE = [];	
	
	console.log(JSONObject);
	console.log(JSONObject.layers);
	for (var i = 0; i < JSONObject.layers.length; i++) {
		let type = JSONObject.layers[i].type;
		let name = JSONObject.layers[i].name;
		if(type == "objectgroup") {
			if(name.search("transit") != -1) {
				let mapData = name.split("/");
				let mapName = mapData[1];
				let destX = parseInt(mapData[2]);
				let destY = parseInt(mapData[3]);
				let object = JSONObject.layers[i].objects[0];
				let x = object.x;
				let y = object.y;
				let width = object.width;
				let height = object.height;
				this.transits.push(new transit(mapName, destX, destY, x, y, width, height));
			} else if (name == "collisions") {			
				let rectangles = JSONObject.layers[i].objects;
				let collisions = [];
				for (var c = 0; c < rectangles.length; c++) {
					let tiledRect = rectangles[c];
					let currentRect = new rectangle(
						parseInt(tiledRect.x), parseInt(tiledRect.y),
						parseInt(tiledRect.width), parseInt(tiledRect.height));
					
					collisions.push(currentRect);
				}
				for (var c = 0; c < collisions.length; c++) {
					let currentRect = collisions[c];
					if(currentRect.intersects(this.NWArea)) {
						this.gridNW.push(currentRect);
					}
					if(currentRect.intersects(this.NArea)) {
						this.gridN.push(currentRect);
					}
					if(currentRect.intersects(this.NEArea)) {
						this.gridNE.push(currentRect);
					}
					if(currentRect.intersects(this.SWArea)) {
						this.gridSW.push(currentRect);
					}
					if(currentRect.intersects(this.SArea)) {
						this.gridS.push(currentRect);
					}
					if(currentRect.intersects(this.SEArea)) {
						this.gridSE.push(currentRect);
					}
				}
			} else if (name == "shop") {
				let shopObject = JSONObject.layers[i].objects[0];
				this.shop = new rectangle(
					parseInt(shopObject.x), parseInt(shopObject.y), parseInt(shopObject.width), parseInt(shopObject.height)
				);
			}
		}	
	}
}