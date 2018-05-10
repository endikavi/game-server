const User = require('../models/user-schema');

//Añadir a la base de datos un nuevo usuario y su save

exports.addUserSavedata = (req, res) => {
    
    console.log('Intento de añadir usuario');
	console.log(req.body.UserConf);
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
			res.send('Fallo al añadir usuario');
        })
	
}

//eliminar de la base de datos un usuario y su save

exports.deleteUserSavedata = (req, res) => {
	
	console.log('Intento de eliminar usuario');
    console.log(req.params.id);
	
	User.remove({
		uid: req.params.id
	}, function (err) {
		if (err) return handleError(err);
	});
	console.log('Usuario eliminado uid: ' + req.params.id);
	res.send('Usuario eliminado uid: ' + req.params.id);
}

//Actualizar info de un usuario y su save

exports.updateUserSavedata = (req, res) => {
	
	console.log('Intento de actualizar partida');
    console.log(req.body);
	/*const Update = ({
		UserConf: req.body.UserConf,
	});

	User.update({
		Email: req.body.Email
	}, Update, function (err) {
		if (err) return handleError(err);
	});

	console.log('Usuario actualizado');

	res.send('Usuario actualizado')*/
	res.send('');
}

exports.updateUserUid = (req, res) => {
	
	console.log('Intento de actualizar Uid');
    console.log(req.body);
	
	/*const Update = ({
		UserConf: req.body.UserConf,
	});

	User.update({
		Email: req.body.Email
	}, Update, function (err) {
		if (err) return handleError(err);
	});

	console.log('Usuario actualizado');

	res.send('Usuario actualizado')*/
	res.send('');
}

//Recuperar info de un usuario y su save

exports.getUserSavedata = (req, res) => {
	
    console.log('Intento de obtener partida guardada');
 	console.log(req.params.id);
    /*
	User.find({
		uid: req.params.id
	}).lean().exec(function (err, users) {
		if (err) return console.error(err);
		console.log('Busqueda de usuarios realizada,resultados obtenidos ' + users.length + ' usuarios');
		res.send('{"users":' + JSON.stringify(users) + '}');
	})*/
	res.send('');
}