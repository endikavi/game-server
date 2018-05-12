var socket;

function multiplayer(){
    
    socket = io("https://gserver.herokuapp.com:8080");
    
    socket.emit('id', "1");
    
    socket.on('position', function(msg){
        
        console.log('cambiando posicion');
        
    })
    
}

function sendPosition(){
    
    socket.emit('position', 'posicion cambiada');
    
}