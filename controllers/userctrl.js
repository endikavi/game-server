const User = require('../models/user-schema');

//Añadir a la base de datos un nuevo usuario y su save

exports.addUserSavedata = (req, res) => {
    
    console.log('Intento de añadir usuario');
    console.log(req.body);
    /*
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
    */
}

//eliminar de la base de datos un usuario y su save

exports.deleteUserSavedata = (req, res) => {
	User.remove({
		_id: req.params._id
	}, function (err) {
		if (err) return handleError(err);
	});
	console.log('Usuario eliminado ID: ' + req.params._id);
	res.send('Usuario eliminado ID: ' + req.params._id);
}

//Actualizar info de un usuario y su save

exports.updateUserSavedata = (req, res) => {
	const Update = ({
		dni: req.body.dni,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	});

	User.update({
		_id: req.params._id
	}, Update, function (err) {
		if (err) return handleError(err);
	});

	console.log('Usuario actualizado');

	res.send('Usuario actualizado')
}

//Recuperar info de un usuario y su save

exports.getUserSavedata = (req, res) => {
	User.find({
		Email: req.params.Email
	}).lean().exec(function (err, users) {
		if (err) return console.error(err);
		console.log('Busqueda de usuarios realizada,resultados obtenidos ' + users.length + ' usuarios');
		res.send('{"users":' + JSON.stringify(users) + '}');
	})
}