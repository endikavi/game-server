var socket;
var multiplayerOn;
var moving = false;
var chats = {};
var players = {};
var rooms = {};
rooms.list ={};
chats.room = [];
chats.global = [];


function multiplayer(){
	
	multiplayerOn = true
	
	console.log('multijugador comenzado')
    
    socket = io("https://gioserver.herokuapp.com",{transports:["websocket"]});
    
    socket.emit('id', UserConf[1].multiplayerid);
    
    socket.on('walking', function(msg){
        
        console.log(msg[0]+' cambiando posicion a '+msg[1]);
        if(players[msg[0]].character == undefined){
            
            players[msg[0]] = {};
            console.log('creando avatar');
            players[msg[0]].character = new MapObject("coop",1);
            
        }
        players[msg[0]].character.placeAt(3, 3);
    })
	
	socket.on('playersList', function(msg){
        
        players.list = msg;
        console.log(msg);
        
    })
	
	socket.on('roomsList', function(msg){
        
        rooms.list = msg;
        console.log(msg);
        
    })
	
	socket.on('allGlobalChats', function(msg){
        
        chats.global = msg;
        console.log(msg);
        
    })
	
	socket.on('globalChat', function(msg){
        
		chats.global.push(msg);
		printGlobalChat(msg);
		
	})

	socket.on('allRoomChats', function(msg){
        
        chats.room = msg;
        console.log(msg);
        
    })
	
	socket.on('roomChat', function(msg){
        
        chats.room.push(msg);
		printRoomChat(msg);
		
	})
    
    socket.on('newRoom', function(msg){
        console.log('nueva sala creada');
        rooms.list[msg[0]] = msg[1]
        if(UserConf[1].roomid == undefined){
            printRoom(msg[0],msg[1]);
        }
	})
    
    socket.on('changeRoom', function(msg){
        console.log('sala cambiada');
        rooms.list[msg[0]] = msg[1]
        if(UserConf[1].roomid == undefined){
            printRoom(msg);
        }
	})
    
    socket.on('enterRoom', function(msg){
        
        console.log('nuevo miembro en la sala');
        
        if(UserConf[1].roomid != undefined){
            printYourRoom(msg);
        }
        
	})
    
    socket.on('startGame', function(msg){
        
        console.log('Comenzando coperativo');
        
        addGameCanvas();
        
	})
    
}

function printGlobalChat(msg){
	
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">'+msg[2]+':<div class="item-header"><p class="popup-text">'+msg[0]+' </p></div><div class="item-footer">'+msg[1]+'</div></div><div class="item-after">'+msg[3]+'</div></div></div></li>');
	
}

function printRoomChat(msg){
	
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">'+msg[2]+':<div class="item-header"><p class="popup-text">'+msg[0]+' </p></div><div class="item-footer">'+msg[1]+'</div></div><div class="item-after">'+msg[3]+'</div></div></div></li>');
	
}

function printRoom(id,msg){
	        
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">Sala '+ id +':<div class="item-header"><p class="popup-text">'+msg.chief+' </p></div><div class="item-footer">'+msg.people.length+'/4 </div></div><div class="item-after"><button type="button" class="button col button-round btn color-white"id="'+ id +'">Entrar</button></div></div></div></li>');
    
    $$('#' + id).on('click',function (e){
		
		console.log($$(this).attr('id'));
		enterRoom($$(this).attr('id'));
		
	})
	
}

function printYourRoom(msg){
    
    $$('#GCmessages').html('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">Sala '+UserConf[1].roomid+':<div class="item-header"><p class="popup-text">'+msg.chief+' </p></div><div class="item-footer">'+msg.people.length+'/4 </div></div><div class="item-after"><button type="button" class="button col button-round btn color-white"id="startMG">Empezar</button></div></div></div></li>');
    
    $$('#startMG').on('click',function (){
        
        socket.emit('startGame',true);
        
    })
	
}

function sendGlobalChat(){
	
	var timenow = new Date();
	
	time = timenow.getFullYear()+'-'+timenow.getMonth()+'-'+timenow.getDate()+' '+timenow.getHours()+':'+timenow.getMinutes();
	
	socket.emit('globalChat', [$$('#m').val(), UserConf[1].multiplayerid, UserConf[1].username, time]);
	
	$$('#m').val('');
    
}

function sendRoomChat(){
	
    var timenow = new Date();
	
	time = timenow.getFullYear()+'-'+timenow.getMonth()+'-'+timenow.getDate()+' '+timenow.getHours()+':'+timenow.getMinutes();
	
	socket.emit('roomChat', [$$('#m').val(), UserConf[1].multiplayerid, UserConf[1].username, time]);
	
	$$('#m').val('');
    
}

function enterRoom(msg){
	
	console.log(msg);
	
	UserConf[1].roomid = msg;
    
    socket.emit('enterRoom', [UserConf[1].roomid, UserConf[1].multiplayerid]);
    
	$$('#GCmessages').html('');
    $$('#multiInput').html('');
}

function createRoom(){
    
    UserConf[1].roomid = $$('#m').val();
	
    socket.emit('newRoom', [$$('#m').val(), UserConf[1].multiplayerid]);
	
    $$('#GCmessages').html('');
    $$('#multiInput').html('');
    
}

function exitRoom(){
	
	socket.emit('exitRoom', [UserConf[1].roomid, UserConf[1].multiplayerid, UserConf[1].username]);
    
}
    
function startMG(){
    
    
    
}