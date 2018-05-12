var socket;
var multiplayerOn;
var moving = false;
function multiplayer(){
	
	multiplayerOn = true
	
	console.log('multijugador comenzado')
    
    socket = io("https://gioserver.herokuapp.com",{transports:["websocket"]});
    
    socket.emit('id', "pcpruebas");
    
    socket.on('walking', function(msg){
        
        console.log('cambiando posicion');

		if (player.tileFrom[0] < msg[0] && moving){
			player.tileTo[0]+=1;
			player.timeMoved = gameTime;
			player.direction = directions.right;
			moving = false;
		}else if(player.tileFrom[0] > msg[0] && moving){
			player.tileTo[0]-=1
			player.timeMoved = gameTime;
			player.direction = directions.left;
			moving = false;}
		if (player.tileFrom[1] < msg[1] && moving){
			player.tileTo[1]+=1
			player.timeMoved = gameTime;
			player.direction = directions.down;
			moving = false;
		}else if(player.tileFrom[1] > msg[1] && moving){
			player.tileTo[1]-=1
			player.timeMoved = gameTime;
			player.direction = directions.up;
			moving = false;
		}
        
    })
    
}

function sendPosition(){
    
    socket.emit('position', 'posicion cambiada');
    
}