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

		if (player.tileFrom != msg && moving){
			
			player.tileTo[0]=msg[0];
			player.tileTo[1]=msg[1];
			player.timeMoved = gameTime;
			moving = false;
		}
        
    })
    
}

function addNewplayer(){
	
	
    
}