var socket;
var multiplayerOn;
function multiplayer(){
	
	multiplayerOn = true
	
	console.log('multijugador comenzado')
    
    socket = io("https://gioserver.herokuapp.com",{transports:["websocket"]});
    
    socket.emit('id', "pcpruebas");
    
    socket.on('walking', function(msg){
        
        console.log('cambiando posicion');
		if (player.tileFrom != msg){player.placeAt(msg[0], msg[1]);}
		
        
    })
    
}

function sendPosition(){
    
    socket.emit('position', 'posicion cambiada');
    
}