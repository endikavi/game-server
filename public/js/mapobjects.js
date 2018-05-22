var objectTypes = {
	
	1 : {
		name : "Box",
		sprite : new Sprite(tileset,[{x:40,y:160,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	},
	2 : {
		name : "Broken Box",
		sprite : new Sprite(tileset,[{x:40,y:200,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.none,
		zIndex : 1
	},
	3 : {
		name : "Tree top",
		sprite : new Sprite(tileset,[{x:80,y:160,w:80,h:80}]),
		offset : [-20,-20],
		collision : objectCollision.solid,
		zIndex : 3
	},
    4 : {
		name : "Box pushable",
		sprite : new Sprite(tileset,[{x:40,y:160,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.push,
		zIndex : 1
	},
    5 : {
		name : "cartel",
		sprite : new Sprite(cartelTile,[{x:0,y:0,w:40,h:40}]),
		offset : [0,-10],
		collision : objectCollision.solid,
		zIndex : 1
	},
    6 : {
		name : "npc",
		sprite : new Sprite(charlieTileset,[{x:0,y:640,w:64,h:64}]),
		offset : [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	}
};

function MapObject(dat) {
    
	this.name	= dat.name || "object";
	this.info	= dat.info || false;
    this.talking= 0;
	this.x		= 0;
	this.y		= 0;
	this.type	= dat.nt || 0;
	this.offset	= [0,0];
	
}

MapObject.prototype.placeAt = function(nx, ny) {
	
	if(mapTileData.map[toIndex(this.x, this.y)].object==this){
			 
		mapTileData.map[toIndex(this.x, this.y)].object = null;
		
	}
	
	this.x = nx;
	this.y = ny;
		
	mapTileData.map[toIndex(nx, ny)].object = this;
	
};

MapObject.prototype.talk = function() {
	
if(this.info!=false && this.talking >= 0){
        
	if(this.info.length > this.talking){

		addControllsForInfo(this.name,this.info[this.talking]);   
		this.talking++ 

	}else{

		document.getElementById('msg-box').removeEventListener("touchstart",function() {keysDown[80] = true;});
		document.getElementById('msg-box').removeEventListener("touchend",function() {keysDown[80] = false;});
		addControlls();
		this.talking=0;
		currentSpeed=0;

		}
        
    }
	
};

MapObject.prototype.processMovement = function() {	
	
	if(this.offset[0] > 0 ) {this.offset[0]=(this.offset[0]-2.25)}
	if(this.offset[0] < 0 ) {this.offset[0]=(this.offset[0]+2.25)}
	if(this.offset[1] > 0 ) {this.offset[1]=(this.offset[1]-2.25)}
	if(this.offset[1] < 0 ) {this.offset[1]=(this.offset[1]+2.25)}
	
};

MapObject.prototype.objectCanMoveTo = function(x, y) {
    
	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
    
	if(typeof player.delayMove[tileTypes[mapTileData.map[toIndex(x,y)].type].floor]=='undefined') {
        
        hitSound.play();
        console.log('objeto contra Pared');
        return false; 
        
    }
    
	if(mapTileData.map[toIndex(x,y)].object!=null) {
        
		var o = mapTileData.map[toIndex(x,y)].object;
        
		if(objectTypes[o.type].collision==objectCollision.solid || objectTypes[o.type].collision==objectCollision.push || objectTypes[o.type].collision==objectCollision.none){
            
            hitSound.play();
            console.log('objeto contra Bloque inamovible');
			return false;
            
		}
		
		return false;
		
	}
	
	this.placeAt(x,y);
	return false;
};