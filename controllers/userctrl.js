const User = require('../models/user-schema');

//Añadir a la base de datos un nuevo usuario y su save

exports.addUserSavedata = (req, res) => {
    
    console.log('Intento de añadir usuario');
    const NewUser = new User();
    
    Object.assign(NewUser, req.body);
	NewUser.UserConf = JSON.parse(req.body.UserConf);
    
    NewUser.save()

        .then(user => {
            
            console.log('Añadido usuario:');
            console.log(user);
			res.send(user);
        
        })
        .catch(error => {
            
			console.log(error);
            console.log('Fallo al añadir usuario');
			res.send(false);
        
        })
	
}

//eliminar de la base de datos un usuario y su save

exports.deleteUserSavedata = (req, res) => {
	
	console.log('Intento de eliminar usuario');
	
	User.remove({ uid: req.params.id }, function (err) {
        
        if (err) return handleError(err);
        
        console.log('Usuario eliminado uid: ' + req.params.id);
        res.send(true);
        
	});
    
}

//Actualizar info de un usuario y su save

exports.updateUserSavedata = (req, res) => {
	
	console.log('Intento de actualizar partida');
    console.log(req.body);
    
	const Update = ({ UserConf: req.body.UserConf });

	User.update({ uid: req.body.uid }, Update, function (err) {
        
		if (err) return handleError(err);
        
        console.log('Actualizada partida');
        res.send(true);
        
	});
    
}

//Actualizar uid de un usuario y recuperar su save

exports.updateUserUid = (req, res) => {
	
	console.log('Intento de actualizar Uid');
    console.log(req.body);
	
	const Update = ({ uid: req.body.oldUid });

	User.update({ uid: req.body.uid }, Update, function (err) {
        
		if (err) return handleError(err);
        console.log('Actualizado uid');
        res.send(users);
        
	});
    
}

//Recuperar info de un usuario y su save

exports.getUserSavedata = (req, res) => {
	
    console.log('Intento de obtener partida guardada');
 	console.log(req.params.id);
    
	User.find({ uid: req.params.id }).lean().exec(function (err, users) {
        
		if (err) return console.error(err);
		console.log('SaveData obtenido');
		res.send(users);
        
	})
    
}