function appInit(){
	
	userdata=localStorage.getItem('savedata');
    userdata=JSON.parse(userdata);
    
    if( userdata != null){
        
        UserConf = userdata;
		mainMenu();
        
    }else{
        
        TakeMobileInfo();
        localStorage.setItem("savedata", JSON.stringify(UserConf));
        newUserMenu();
        
    }
	
}

function TakeMobileInfo() {
    
    UserConf[1].mobileid = "pc"+Date.now()
    
    UserConf[1].mobileinfo = {}
        /*
        Fabricante:     device.manufacturer,
        Cordova:        device.cordova,
        Modelo:         device.model,
        Plataforma:     device.platform,
        Version:        device.version,
        Emulacion:      device.isVirtual,
        Serial:         device.serial,
        
    }*/
    
}

function vibrate() {
    
	console.log(navigator.vibrate(2000));
    
}

var UserConf = [
    
        {
        
            controllsR: 0,
            controllsL: 0,
            music: 0,
            vibrate: 0,
            performance: 0,
            online: 0,
            
            
        },
                
        {
            
            username: "pc"+Date.now(),
            multiplayerid: "pc"+Date.now(),
            mobileid: "pc"+Date.now(),
            mobileinfo: undefined
        
        },
        
        {
            lvl: 1,
            name:undefined,
            inventory:"",
            actualmap: 0001,
            actualpositionx: 3,
            actualpositiony: 3
        
        }
    
    ];