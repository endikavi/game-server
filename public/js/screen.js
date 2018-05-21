var seven = new Framework7();

var $$ = Dom7;

function addGameCanvas() {
    
	$$('#screen').html('<canvas id="layer0" width="800" height="450"></canvas><canvas id="layer1" width="800" height="450"></canvas><canvas id="layer2" width="800" height="450"></canvas><canvas id="layer3" width="800" height="450"></canvas><div id=controlls-box></div>');
    
	mapId = 0002;
	
    addControlls();
	renderGame();
	
    mapSound.play();
    menuSound.stop();
	$$('.container').attr('style','inline');
	
}

function mainMenu() {
    
	$$('#screen').html('<button class="button col button-round btn color-white btn-left" id="StartGame">&#9773  Empezar</button><button class="button col button-round btn color-white btn-left" id="ContinueGame">&#9773 Continuar</button><button class="button col button-round btn color-white" id="User">Usuario</button><img class="spin" src="img/whell.png" /><button class="button col button-round btn color-white" id="Menu">Menu</button><button class="button col button-round btn color-white btn-right" id="Retos">modo Reto &#9773</button><button class="button col button-round btn color-white btn-right" id="Multi">Multijugador &#9773</button><div class="card"></div>');
	$$('.container').attr('style','none');
    
    resetCanvas();
    mainMenuControlls();
    menuSound.play();
    mapSound.stop();
	
}

function newUserMenu() {
    
    $$('.card').html('<div class="card-header"><p class="popup-title">Bienvenido al juego</p></div><div class="card-content card-content-padding pop-up"><p class="popup-text">Para empezar a usar el multijugador y la funcion de datos en la nube da un nombre de usuario para identificarte,puedes activarlo o desactivarlo en ajustes mas adelante.</p> <hr><div class="item-inner"><div class="item-input-wrap"><div class="inputbox"><input type="text" class="inputname" placeholder="Nombre de usuario" value="'+ (UserConf[1].username || "") +'"><span class="input-clear-button resetinput"></span></div><hr></div></div></div><div id="gamescreen"><div class="block"><div class="row"><button class="button col" id="newUser">Listo</button><button class="button col" id="notUser">No me interesa</button></div></div></div>');
    
    $$('#notUser').on('click', function () {mainMenu();});
    $$('#newUser').on('click', function () {setNewUser();});
    
}

function setNewUser(){
    
    username = $$('.inputname').val();
    
    if (username == undefined || username == "" || username == null){
        
        alert("Por favor rellene el nombre de usuario.")
        
    }else{
        
        UserConf[1].username=username;
        UserConf[1].multiplayerid=username+device.uuid+(device.isVirtual ? 1 : 0);
        localStorage.setItem("savedata", JSON.stringify(UserConf));
        mainMenu();
    }
    
}

function addCard(title,text) {
    
	$$('.card').html('<div class="card-header"><p class="popup-title">' + title + '</p></div><div class="card-content card-content-padding pop-up"><p class="popup-text">' + text + '</p></div><div id="gamescreen"></div>');
    
    //$$('.card-header').on('click', function () {$$('.card').html('')})
    
}

function mainMenuControlls() {
    
	//document.removeEventListener("backbutton", mainMenu, false);   
	//document.addEventListener("backbutton", exitFromApp, false);

	$$("#StartGame").on("click",function () {

		startGameMenu();

	});

	$$('#Multi').on('click', function () {

		multiplayerMenu();

	})

	$$('#ContinueGame').on('click', function () {

		loadGameMenu();

	})

	$$('#User').on('click',  function () {

		userMenu();

	})

	$$('#Menu').on('click', function () {

		configMenu();

	})

	$$('#Retos').on('click', function () {

		retosMenu();

	})
    
}

function startGameMenu(){
	
	
	
}

function loadGameMenu(){
	
	
	
}

function multiplayerMenu(){
	
	addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap" id="multiInput"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
	
	for(var c = 0;c < chats.global.length;c++){
		
		printGlobalChat(chats.global[c])
		
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		sendGlobalChat();
        
    });
	
    $$('#seeR').on('click' , function(){
        
		seeRoomList();
        
    });
    $$('#seeRC').on('click' , function(){
        
		seeRoomChat();
        
    });
}

function configMenu(){
	
	multiplayer();
	
}

function seeRoomList(){
	
    addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap" id="multiInput"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
	console.log('pintando salas')
    console.log(rooms.list)
	for(var c = 0;c < Object.size(rooms.list);c++){
		
		printRoom(rooms.list[c])
		console.log('sala')
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		createRoom();
        
    });
	
    $$('#seeGC').on('click' , function(){
        
		multiplayerMenu();
        
    });
    $$('#seeRC').on('click' , function(){
        
		seeRoomChat();
        
    });
	
}

function seeRoomChat(){
	
    addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
	
	for(var c = 0;c < chats.room.length;c++){
		
		printRoomChat(chats.room[c])
		
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		sendRoomChat();
        
    });
	
    $$('#seeGC').on('click' , function(){
        
		multiplayerMenu();
        
    });
    $$('#seeR').on('click' , function(){
        
		seeRoomList();
        
    });
	
}

function userMenu(){
	
	$$('.card').html('<div class="card-header"><p class="popup-title">Bienvenido al juego</p></div><div class="card-content card-content-padding pop-up"><p class="popup-text">Para empezar a usar el multijugador y la funcion de datos en la nube da un nombre de usuario para identificarte,puedes activarlo o desactivarlo en ajustes mas adelante.</p> <hr><div class="item-inner"><div class="item-input-wrap"><div class="inputbox"><input type="text" class="inputname" placeholder="Nombre de usuario" value="'+ (UserConf[1].username || "") +'"><span class="input-clear-button resetinput"></span></div><hr></div></div></div><div id="gamescreen"><div class="block"><div class="row"><button class="button col" id="newUser">Listo</button><button class="button col" id="notUser">No me interesa</button></div></div></div>');
    
    $$('#notUser').on('click', function () {mainMenu();});
    $$('#newUser').on('click', function () {setNewUser();});
	
}

function retosMenu(){
	
	addCard('Retos','este es el menu de retos<hr><p class="segmented segmented-raised"><button class="button button-outline">Mapa 1</button><button class="button button-outline">Mapa 2</button><button class="button button-outline">Mapa 3</button><button class="button button-outline">Mapa 4</button></p><p class="segmented segmented-raised"><button class="button button-outline">Mapa 5</button><button class="button button-outline">Mapa 6</button><button class="button button-outline">Mapa 7</button><button class="button button-outline">Mapa 8</button></p>');
	
}

mainMenu();