var socket;

function multiplayer(){
	
	console.log('multijugador comenzado')
    
    socket = io("https://gioserver.herokuapp.com",{transports:["websocket"]});
    
    socket.emit('id', "1");
    
    socket.on('position', function(msg){
        
        console.log('cambiando posicion');
        
    })
    
}

function sendPosition(){
    
    socket.emit('position', 'posicion cambiada');
    
}