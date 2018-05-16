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
    
    $$('.card-header').on('click', function () {$$('.card').html('')})
    
}

function mainMenuControlls() {
    
document.removeEventListener("backbutton", mainMenu, false);   
document.addEventListener("backbutton", exitFromApp, false);
    
$$("#StartGame").on("click",function () {
    
    addGameCanvas();
                                                      
});
    
$$('#Multi').on('click', function () {addCard('multijugador','este es el menu del multi')})

$$('#ContinueGame').on('click', function () {addCard('Continuar','este es el menu para elegir partida guardada')})
    
$$('#User').on('click',  newUserMenu)

$$('#Menu').on('click', function () {configMenu})

$$('#Retos').on('click', function () {addCard('Retos','este es el menu de retos<hr><p class="segmented segmented-raised"><button class="button button-outline">Mapa 1</button><button class="button button-outline">Mapa 2</button><button class="button button-outline">Mapa 3</button><button class="button button-outline">Mapa 4</button></p><p class="segmented segmented-raised"><button class="button button-outline">Mapa 5</button><button class="button button-outline">Mapa 6</button><button class="button button-outline">Mapa 7</button><button class="button button-outline">Mapa 8</button></p>')})
    
}

function resetUserMenu (){
    
    addCard('Login','<button  id="Register" class="button button-outline button-register" type="buttom" >Registrarte</button> <button id="Login" class="button button-outline button-register-google" type="buttom">Ya tengo cuenta</button>')
    
    $$('#Register').on('click', registerMenu)
    $$('#Login').on('click', loginMenu)
    
}

function registerMenu (){
    
    addCard('Login','<button class="button button-outline" id="Reset" type="buttom">Volver</button><div class="item-input-wrap"><input type="text" name="e" class="dropdown-item " id="Email" placeholder="Email address" required pattern="^[^@]+@[^@]+\.[^@]{2,3}$" minlength="8" maxlength="40" required  required><span class="input-clear-button"></span></div><div class="item-input-wrap"><input type="text" name="u" class="dropdown-item " id="Username"  placeholder="Username" pattern="[A-z0-9À-ž]{3,15}$" minlength="3" maxlength="15" ><span class="input-clear-button"></span></div><div class="item-input-wrap"><input type="password" name="p" class="dropdown-item " id="Password"  placeholder="Password" required pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}" minlength="8" maxlength="40" required> <button id="Login" class="button button-outline button-register-google" type="buttom">Entrar</button>')
    
    $$('#Reset').on('click', resetUserMenu)
    $$('#Login').on('click', logIn)
    
}

function loginMenu (){
    
    addCard('Login','<button class="button button-outline" id="Reset" type="buttom">Volver</button><div class="item-input-wrap"><input type="text" name="e" class="dropdown-item " id="Email" placeholder="Email address" required pattern="^[^@]+@[^@]+\.[^@]{2,3}$" minlength="8" maxlength="40" required  required></div><div class="item-input-wrap"><input type="text" name="u" class="dropdown-item " id="Username"  placeholder="Username" pattern="[A-z0-9À-ž]{3,15}$" minlength="3" maxlength="15" ></div><div class="item-input-wrap"><input type="password" name="p" class="dropdown-item " id="Password"  placeholder="Password" required pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}" minlength="8" maxlength="40" required> <button id="Login" class="button button-outline button-register-google" type="buttom">Entrar</button>')
    
    $$('#Reset').on('click', resetUserMenu)
    $$('#Login').on('click', signIn)
    
}


mainMenu();


