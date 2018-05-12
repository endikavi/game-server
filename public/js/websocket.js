var socket;
var multiplayerOn;
function multiplayer(){
	
	multiplayerOn = true
	
	console.log('multijugador comenzado')
    
    socket = io("https://gioserver.herokuapp.com",{transports:["websocket"]});
    
    socket.emit('id', "pcpruebas");
    
    socket.on('walking', function(msg){
        
        console.log('cambiando posicion');
        
    })
    
}

function sendPosition(){
    
    socket.emit('position', 'posicion cambiada');
    
}