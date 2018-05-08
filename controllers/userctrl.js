const User = require('../models/user-schema');

//Añadir a la base de datos un nuevo usuario y su save

exports.addUserSavedata = (req, res) => {
    
    console.log('Intento de añadir usuario');
    console.log(req.body);

    const NewUser = new User();
    Object.assign(NewUser, req.body);
    NewUser.save()

        .then(user => {
            res.send(user);
            console.log('Añadido usuario:');
            console.log(user);
        })
        .catch(error => {
            res.send('Fallo al añadir usuario');
            console.log('Fallo al añadir usuario');
        })
}

//eliminar de la base de datos un usuario y su save

exports.deleteUserSavedata = (req, res) => {
	User.remove({
		uid: req.body.uid
	}, function (err) {
		if (err) return handleError(err);
	});
	console.log('Usuario eliminado uid: ' + req.body.uid);
	res.send('Usuario eliminado uid: ' + req.body.uid);
}

//Actualizar info de un usuario y su save

exports.updateUserSavedata = (req, res) => {
	const Update = ({
		UserConf: req.body.UserConf,
	});

	User.update({
		Email: req.body.Email
	}, Update, function (err) {
		if (err) return handleError(err);
	});

	console.log('Usuario actualizado');

	res.send('Usuario actualizado')
}

//Recuperar info de un usuario y su save

exports.getUserSavedata = (req, res) => {
    
    console.log(req.params.id);
    
	User.find({
		uid: req.params.id
	}).lean().exec(function (err, users) {
		if (err) return console.error(err);
		console.log('Busqueda de usuarios realizada,resultados obtenidos ' + users.length + ' usuarios');
		res.send('{"users":' + JSON.stringify(users) + '}');
	})
}