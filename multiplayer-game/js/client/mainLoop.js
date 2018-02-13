var mainLoop = {
	id: null,
	lastTimeStamp: 0,
	ups: 0,
	fps: 0,
	loop: function(timeStamp) {
		mainLoop.id = window.requestAnimationFrame(mainLoop.loop);
		mainLoop.update(timeStamp);
		mainLoop.draw();
		
		if(timeStamp - mainLoop.lastTimeStamp > 999) {
			mainLoop.lastTimeStamp = timeStamp;
			console.log("updates: " + mainLoop.ups + " | FPS: " + mainLoop.fps);
			mainLoop.ups = 0;
			mainLoop.fps = 0;
		}
	},
	stop: function() {
	
	},
	update: function(timeStamp) {	
		mainLoop.ups++;
		
		if(mapManager.currentMap == null ||
			mapManager.currentMap == "null" ||
			mapManager.currentMap.transits.length == 0) {
			return;
		}

		for (var i = 0; i < mapManager.currentMap.transits.length; i++) {
			if(mapManager.currentMap.transits[i].area.intersects(mapManager.player.area)) {
				if (!mapManager.loadingMap) {
					mapManager.player.area.x = mapManager.currentMap.transits[i].destX;
					mapManager.player.area.y = mapManager.currentMap.transits[i].destY;
					mapManager.loadMap(mapManager.currentMap.transits[i].mapName);
				}		
			}
		}	
		
		if (mapManager.currentMap.shop != null && mapManager.currentMap.shop != 'null') {					
			if (mapManager.player.area.intersects(mapManager.currentMap.shop)) {
				if (!popup.active) {
					popup.generatePopUp(30, 30, "Pulsa " + keyboardBindings.openShop + " para abrir la tienda");
				}
				
			} else if (popup.active) {
				if (!mapManager.player.area.intersects(mapManager.currentMap.shop)) {
						popup.destroyPopUp();		
				}
			}
		}
		
		//comprobar colision solo al pulsar tecla
		//implementar broad, middle & narrow
		//broad = separar mapa en rejilla***
		//middle = comparar circulo vs circulo *pendiente
		//narrow = comparar rect vs rect
		//comprobar primero colisión área, luego las otras 4 direccionales (broad && narrow)	
		
		mainLoop.checkStaticCollisions();
	},
	draw: function(timeStamp) {	
		if(mapManager.currentMap == null) {
			return;
		}
		canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
		mapManager.player.draw();
		mainLoop.fps++;
	},
	checkStaticCollisions: function() {
		let moveUp = false;
		let moveDown = false;
		let moveLeft = false;
		let moveRight = false;
		
		if (keyboard.keyPressed(keyboardBindings.up)) {
			moveUp = true;
		}	
		if (keyboard.keyPressed(keyboardBindings.down)) {
			moveDown = true;
		}		
		if (keyboard.keyPressed(keyboardBindings.left)) {
			moveLeft = true;
		}	
		if (keyboard.keyPressed(keyboardBindings.right)) {
			moveRight = true;
		}	
		
		if(moveUp && (!moveLeft || !moveRight)) {
			mapManager.player.direction = 1;
			mapManager.player.moving = true;
		}
		if(moveDown && (!moveLeft || !moveRight)) {
			mapManager.player.direction = 0;
			mapManager.player.moving = true;
		}
		if(moveLeft) {
			mapManager.player.direction = 3;
			mapManager.player.moving = true;
		}
		if(moveRight) {
			mapManager.player.direction = 2;
			mapManager.player.moving = true;
		}
		
		if(!moveUp && !moveDown && !moveLeft && !moveRight) {
			mapManager.player.animationCounter = 0;
			mapManager.player.moving = false;
			return;
		} else {
			if(mapManager.player.animationCounter > 60) {
				mapManager.player.animationCounter = 0;
			} else {
				mapManager.player.animationCounter ++;
			}
		}
		
		console.log(mapManager.player.animationCounter);
		
		
		
		let possibleCollisions = [];
		let player = mapManager.player;
		let currentMap = mapManager.currentMap;
		
		if(player.area.intersects(currentMap.NWArea)) {
			for (var i = 0; i < currentMap.gridNW.length; i++) {
				possibleCollisions.push(currentMap.gridNW[i]);
			}			
		}
		
		if(player.area.intersects(currentMap.NArea)) {
			for (var i = 0; i < currentMap.gridN.length; i++) {
				possibleCollisions.push(currentMap.gridN[i]);
			}			
		}
		
		if(player.area.intersects(currentMap.NEArea)) {
			for (var i = 0; i < currentMap.gridNE.length; i++) {
				possibleCollisions.push(currentMap.gridNE[i]);
			}			
		}
		
		if(player.area.intersects(currentMap.SWArea)) {
			for (var i = 0; i < currentMap.gridSW.length; i++) {
				possibleCollisions.push(currentMap.gridSW[i]);
			}			
		}
		
		if(player.area.intersects(currentMap.SArea)) {
			for (var i = 0; i < currentMap.gridS.length; i++) {
				possibleCollisions.push(currentMap.gridS[i]);
			}			
		}
		
		if(player.area.intersects(currentMap.SEArea)) {
			for (var i = 0; i < currentMap.gridSE.length; i++) {
				possibleCollisions.push(currentMap.gridSE[i]);
			}			
		}
		
		if(possibleCollisions.length == 0) {
			return;
		}
		
		let colTop = false;
		let colBottom = false;
		let colLeft = false;
		let colRight = false;
		
		for (var i = 0; i < possibleCollisions.length; i++) {
			let currentRect = possibleCollisions[i];
			
			if(keyboard.keyPressed(keyboardBindings.showBug)) {
				console.log(player.area);
				console.log(currentRect);
			}
			
			if(player.area.intersects(currentRect)) {
				if (!colTop && player.limitTop.intersects(currentRect)) {
					colTop = true;
				}
				
				if (!colBottom && player.limitBottom.intersects(currentRect)) {
					colBottom = true;
				}
				
				if (!colLeft && player.limitLeft.intersects(currentRect)) {
					colLeft = true;
				}
				
				if (!colRight && player.limitRight.intersects(currentRect)) {
					colRight = true;
				}
			}		
		}
		
		var tempX = mapManager.player.area.x;
		var tempY = mapManager.player.area.y;
		
		if(!colTop && moveUp) {
			tempY -= mapManager.player.speed;
		}
		if(!colBottom && moveDown) {
			tempY += mapManager.player.speed;
		}
		if(!colLeft && moveLeft) {
			tempX -= mapManager.player.speed;
		}
		if(!colRight && moveRight) {
			tempX += mapManager.player.speed;
		}
		
		mapManager.player.update(tempX, tempY);
	}
};